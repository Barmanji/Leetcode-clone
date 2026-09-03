"use server";

import { prisma } from "@/lib/db";
import {
  getLanguageName,
  pollBatchResults,
  submitBatch,
} from "@/lib/judge0";
import { getCurrentUserData } from "@/modules/auth/actions";

export const getAllProblems = async () => {
  try {
    const problems = await prisma.problem.findMany({
      include: {
        solvedBy: true,
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
    return {
      success: false,
      error: "Failed to fetch problems",
    };
  }
};

export const getProblemById = async (id: string) => {
  try {
    const problem = await prisma.problem.findUnique({
      where: {
        id,
      },
    });

    return {
      success: true,
      data: problem,
    };
  } catch (error) {
    console.error("❌ Error fetching problem:", error);
    return {
      success: false,
      error: "Failed to fetch problem",
    };
  }
};

/* -------------------------------------------------------------------------- */
/*                         Shared Judge0 Execution                            */
/* -------------------------------------------------------------------------- */

const executeTestCases = async (
  source_code: string,
  language_id: number,
  stdin: string[],
) => {
  const submissions = stdin.map((input) => ({
    source_code,
    language_id,
    stdin: input,
    base64_encoded: false,
    wait: false,
  }));

  const submitResponse = await submitBatch(submissions);

  const tokens = submitResponse.map(
    (res: { token: string }) => res.token,
  );

  const results = await pollBatchResults(tokens);

  return results;
};

/* -------------------------------------------------------------------------- */
/*                                    RUN                                     */
/* -------------------------------------------------------------------------- */

export const runCode = async (
  source_code: string,
  language_id: number,
  stdin: string[],
) => {
  try {
    const user = await getCurrentUserData();

    if (!user || !("id" in user)) {
      return {
        success: false,
        error: "User not authenticated",
      };
    }

    if (!Array.isArray(stdin) || stdin.length === 0) {
      return {
        success: false,
        error: "Invalid Test Cases",
      };
    }

    const results = await executeTestCases(
      source_code,
      language_id,
      stdin,
    );

    const detailedResults = results.map((result, i) => ({
      testCase: i + 1,
      stdout: result.stdout?.trim() || null,
      stderr: result.stderr || null,
      compileOutput: result.compile_output || null,
      status: result.status.description,
      memory: result.memory
        ? `${result.memory} KB`
        : undefined,
      time: result.time
        ? `${result.time} s`
        : undefined,
    }));

    return {
      success: true,
      results: detailedResults,
    };
  } catch (error) {
    console.error("❌ Error running code:", error);

    return {
      success: false,
      error: "Failed to execute code",
    };
  }
};
/* -------------------------------------------------------------------------- */
/*                                   SUBMIT                                   */
/* -------------------------------------------------------------------------- */

export const submitCode = async (
  source_code: string,
  language_id: number,
  stdin: string[],
  expected_outputs: string[],
  problemId: string,
) => {
  try {
    const user = await getCurrentUserData();

    if (!user || !("id" in user)) {
      return {
        success: false,
        error: "User not authenticated",
      };
    }

    if (
      !Array.isArray(stdin) ||
      stdin.length === 0 ||
      !Array.isArray(expected_outputs) ||
      expected_outputs.length !== stdin.length
    ) {
      return {
        success: false,
        error: "Invalid Test Cases",
      };
    }

    const results = await executeTestCases(
      source_code,
      language_id,
      stdin,
    );

    let allPassed = true;

    const detailedResults = results.map(
      (
        result: {
          stdout?: string;
          stderr?: string;
          compile_output?: string;
          status: {
            description: string;
          };
          memory?: number;
          time?: number;
        },
        i: number,
      ) => {
        const stdout = result.stdout?.trim() || null;
        const expected = expected_outputs[i]?.trim();

        const passed = stdout === expected;

        if (!passed) {
          allPassed = false;
        }

        return {
          testCase: i + 1,
          passed,
          stdout,
          expected,
          stderr: result.stderr || null,
          compile_output: result.compile_output || null,
          status: result.status.description,
          memory: result.memory
            ? `${result.memory} KB`
            : undefined,
          time: result.time
            ? `${result.time} s`
            : undefined,
        };
      },
    );

    /* --------------------------- Create Submission -------------------------- */

    const submission = await prisma.submission.create({
      data: {
        userId: user.id,
        problemId,
        sourceCode: source_code,
        language: getLanguageName(language_id),

        stdin: stdin.join("\n"),

        stdout: JSON.stringify(
          detailedResults.map((result) => result.stdout),
        ),

        stderr: detailedResults.some(
          (result) => result.stderr,
        )
          ? JSON.stringify(
              detailedResults.map(
                (result) => result.stderr,
              ),
            )
          : null,

        compileOutput: detailedResults.some(
          (result) => result.compile_output,
        )
          ? JSON.stringify(
              detailedResults.map(
                (result) => result.compile_output,
              ),
            )
          : null,

        status: allPassed
          ? "Accepted"
          : "Wrong Answer",

        memory: detailedResults.some(
          (result) => result.memory,
        )
          ? JSON.stringify(
              detailedResults.map(
                (result) => result.memory,
              ),
            )
          : null,

        time: detailedResults.some(
          (result) => result.time,
        )
          ? JSON.stringify(
              detailedResults.map(
                (result) => result.time,
              ),
            )
          : null,
      },
    });

    /* ---------------------------- Mark Problem ------------------------------- */

    if (allPassed) {
      await prisma.problemSolved.upsert({
        where: {
          userId_problemId: {
            userId: user.id,
            problemId,
          },
        },
        update: {},
        create: {
          userId: user.id,
          problemId,
        },
      });
    }

    /* -------------------------- Test Case Results --------------------------- */

    const testCaseResults = detailedResults.map(
      (result) => ({
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
      }),
    );

    await prisma.testCaseResult.createMany({
      data: testCaseResults,
    });

    /* ---------------------- Return Complete Submission ---------------------- */

    const submissionWithTestCases =
      await prisma.submission.findUnique({
        where: {
          id: submission.id,
        },
        include: {
          testCases: true,
        },
      });

    return {
      success: true,
      submission: submissionWithTestCases,
    };
  } catch (error) {
    console.error("❌ Error submitting code:", error);

    return {
      success: false,
      error: "Failed to submit code",
    };
  }
};

/* -------------------------------------------------------------------------- */
/*                             Submission History                             */
/* -------------------------------------------------------------------------- */

export const getAllSubmissionByCurrentUserForProblem = async (
  problemId: string,
) => {
  try {
    const user = await getCurrentUserData();

    const submissions = await prisma.submission.findMany({
      where: {
        problemId,
        userId:
          user && "id" in user
            ? user.id
            : undefined,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return {
      success: true,
      data: submissions,
    };
  } catch (error) {
    console.error(
      "❌ Error fetching submissions:",
      error,
    );

    return {
      success: false,
      error: "Failed to fetch submissions",
    };
  }
};
