"use server";
import { prisma } from "@/lib/db";
import { UserRole } from "@/lib/generated/prisma/enums";
import { getLanguageName, pollBatchResults, submitBatch } from "@/lib/judge0";
import { getCurrentUserData } from "@/modules/auth/actions";
import { currentUser } from "@clerk/nextjs/server";
import { success } from "zod";

export const getAllProblems = async () => {
  try {
    const user = await getCurrentUserData();

    const problems = await prisma.problem.findMany({
      include:{
        solvedBy:true
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return {
      success: true,
      data: problems,
    };
  } catch (error) {
    console.error("❌ Error fetching problems:", error);
    return { success: false, error: "Failed to fetch problems" };
  }
};

export const getProblemById = async (id: string) => {
  try {
    const problem = await prisma.problem.findUnique({
      where: {
        id: id,
      },
    });

    return {
      success: true,
      data: problem,
    };
  } catch (error) {
    console.error("❌ Error fetching problem:", error);
    return { success: false, error: "Failed to fetch problem" };
  }
};

// TODO:1.1 Implement "RUN" functionality using Judge0 API (HINT: Just some change in this block only)
export const executeCode = async (
  source_code: string,
  language_id: number,
  stdin: string[],
  expected_outputs: string[],
  id: string,
) => {
  const user = await getCurrentUserData();

  if (!user || !("id" in user)) {
    return { success: false, error: "User not authenticated" };
  }

  if (
    !Array.isArray(stdin) ||
    stdin.length === 0 ||
    !Array.isArray(expected_outputs) ||
    expected_outputs.length !== stdin.length
  ) {
    return { success: false, error: "Invalid Test Cases" };
  }

  const submissions = stdin.map((input) => ({
    source_code,
    language_id,
    stdin: input,
    base64_encoded: false,
    wait: false,
  }));

  const submitResponse = await submitBatch(submissions);

  const tokens = submitResponse.map((res: { token: string }) => res.token);

  const results = await pollBatchResults(tokens);

  let allPassed = true;

  const detailedResults = results.map((result: { stdout?: string; stderr?: string; compile_output?: string; status: { description: string }; memory?: number; time?: number }, i: number) => {
    const stdout = result.stdout?.trim() || null; // from docs
    const expected_output = expected_outputs[i]?.trim();
    const passed = stdout === expected_output;

    if (!passed) allPassed = false;

    return {
      testCase: i + 1,
      passed,
      stdout,
      expected: expected_output,
      stderr: result.stderr || null,
      compile_output: result.compile_output || null,
      status: result.status.description,
      memory: result.memory ? `${result.memory} KB` : undefined,
      time: result.time ? `${result.time} s` : undefined,
    };
  });

  const submission = await prisma.submission.create({
    data: {
      userId: user.id,
      problemId: id,
      sourceCode: source_code,
      language: getLanguageName(language_id),
      stdin: stdin.join("\n"),
      stdout: JSON.stringify(detailedResults.map((r: { stdout: string | null }) => r.stdout)),
      stderr: detailedResults.some((r: { stderr: string | null }) => r.stderr)
        ? JSON.stringify(detailedResults.map((r: { stderr: string | null }) => r.stderr))
        : null,
      compileOutput: detailedResults.some((r: { compile_output: string | null }) => r.compile_output)
        ? JSON.stringify(detailedResults.map((r: { compile_output: string | null }) => r.compile_output))
        : null,
      status: allPassed ? "Accepted" : "Wrong Answer",
      memory: detailedResults.some((r: { memory: string | undefined }) => r.memory)
        ? JSON.stringify(detailedResults.map((r: { memory: string | undefined }) => r.memory))
        : null,
      time: detailedResults.some((r: { time: string | undefined }) => r.time)
        ? JSON.stringify(detailedResults.map((r: { time: string | undefined }) => r.time))
        : null,
    },
  });

  if (allPassed) {
    await prisma.problemSolved.upsert({
      where: {
        userId_problemId: { userId: user.id, problemId: id },
      },

      update: {},
      create: {
        userId: user.id,
        problemId: id,
      },
    });
  }

  const testCaseResults = detailedResults.map((result: { testCase: number; passed: boolean; stdout: string | null; expected: string | undefined; stderr: string | null; compile_output: string | null; status: string; memory: string | undefined; time: string | undefined }) => ({
    submissionId: submission.id,
    testCase: result.testCase,
    passed: result.passed,
    stdout: result.stdout,
    expected: result.expected,
    stderr: result.stderr,
    compileOutput: result.compile_output,
    status: result.status,
    memory: result.memory,
    time: result.time,
  }));

  await prisma.testCaseResult.createMany({ data: testCaseResults });

  const submissionWithTestCases = await prisma.submission.findUnique({
    where: { id: submission.id },
    include: {
      testCases: true,
    },
  });

  return {
    success: true,
    submission: submissionWithTestCases,
  };
};

export const getAllSubmissionByCurrentUserForProblem = async (
  problemId: string,
) => {
  const user = await getCurrentUserData();

  const submissions = await prisma.submission.findMany({
    where: {
      problemId: problemId,
      userId: user && "id" in user ? user.id : undefined,
    },
  });

  return {
    success: true,
    data: submissions,
  };
};

