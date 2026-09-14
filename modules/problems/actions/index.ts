"use server";

import { prisma } from "@/lib/db";
import {
  getLanguageName,
  pollBatchResults,
  submitBatch,
} from "@/lib/judge0";
import { getCurrentUserData } from "@/modules/auth/actions";
import type {
  ActionResult,
  DetailedRunResult,
  DetailedSubmitResult,
  Judge0Result,
  RunCodeResponse,
  SubmitCodeResponse,
} from "@/modules/types/actions";
import type { Problem, Submission } from "@/modules/types/problem";

export const getAllProblems = async (): Promise<ActionResult<Problem[]>> => {
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
      data: problems as unknown as Problem[],
    };
  } catch (error) {
    console.error("Error fetching problems:", error);
    return {
      success: false,
      error: "Failed to fetch problems",
    };
  }
};

export const getProblemById = async (id: string): Promise<ActionResult<Problem>> => {
  try {
    const problem = await prisma.problem.findUnique({
      where: {
        id,
      },
    });

    return {
      success: true,
      data: problem as unknown as Problem,
    };
  } catch (error) {
    console.error("Error fetching problem:", error);
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
    base64_encoded: false as const,
    wait: false as const,
  }));

  const submitResponse = await submitBatch(submissions);

  const tokens = submitResponse.map(
    (res) => res.token,
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
  expected_outputs: string[],
): Promise<RunCodeResponse | { success: false; error: string }> => {
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

    const detailedResults: DetailedRunResult[] = results.map(
      (result: Judge0Result, i: number) => {
        const stdout = result.stdout?.trim() || null;
        const expected = expected_outputs[i]?.trim() || "";
        const passed = stdout === expected;

        return {
          testCase: i + 1,
          passed,
          stdout,
          expected,
          stderr: result.stderr || null,
          compileOutput: result.compile_output || null,
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

    return {
      success: true,
      results: detailedResults,
    };
  } catch (error) {
    console.error("Error running code:", error);

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
): Promise<SubmitCodeResponse | { success: false; error: string }> => {
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

    const detailedResults: DetailedSubmitResult[] = results.map(
      (
        result: Judge0Result,
        i: number,
      ) => {
        const stdout = result.stdout?.trim() || null;
        const expected = expected_outputs[i]?.trim() || "";

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
          compileOutput: result.compile_output || null,
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
          (result) => result.compileOutput,
        )
          ? JSON.stringify(
              detailedResults.map(
                (result) => result.compileOutput,
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
        compileOutput: result.compileOutput,
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
      submission: submissionWithTestCases as unknown as SubmitCodeResponse["submission"],
    };
  } catch (error) {
    console.error("Error submitting code:", error);

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
): Promise<ActionResult<Submission[]>> => {
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
      data: submissions as unknown as Submission[],
    };
  } catch (error) {
    console.error(
      "Error fetching submissions:",
      error,
    );

    return {
      success: false,
      error: "Failed to fetch submissions",
    };
  }
};
