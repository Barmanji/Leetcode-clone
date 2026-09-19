import { currentUserRole, getCurrentUserData } from "@/modules/auth/actions";
import { NextRequest, NextResponse } from "next/server";
import { UserRole } from "@/lib/generated/prisma/enums";
import {
  getJudge0languageId,
  pollBatchResults,
  submitBatch,
} from "@/lib/judge0";
import type { Judge0Result } from "@/modules/types/actions";

import { prisma } from "@/lib/db";


export async function POST(request: NextRequest) {
  try {
    const userRole = await currentUserRole();
    const user = await getCurrentUserData();

    if (!user || !("id" in user)) {
      return NextResponse.json({ error: "User not found or Missing ID" });
    }

    if (userRole !== UserRole.ADMIN) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const {
      title,
      description,
      difficulty,
      tags,
      examples,
      constraints,
      hints,
      editorial,
      testCases,
      codeSnippets,
      referenceSolutions,
    } = await request.json();

    if (
      !title ||
      !description ||
      !difficulty ||
      !testCases ||
      !codeSnippets ||
      !referenceSolutions
    ) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 },
      );
    }

    if (!Array.isArray(testCases) || testCases.length === 0) {
      return NextResponse.json(
        { error: "At least one test case is required" },
        { status: 400 },
      );
    }

    for (const [language, solutionCode] of Object.entries(referenceSolutions)) {
      const languageId = getJudge0languageId(language);

      if (!languageId) {
        return NextResponse.json(
          { error: `Unsupported language: ${language}` },
          { status: 400 },
        );
      }

      const submissions = testCases.map(({ input, output }: { input: string; output: string }) => ({
        source_code: solutionCode as string,
        language_id: languageId,
        stdin: input,
        expected_output: output,
        base64_encoded: false as const,
        wait: false as const,
      }));

      let submissionResults;
      let results: Judge0Result[];
      try {
        submissionResults = await submitBatch(submissions);
        const tokens = submissionResults.map((res) => res.token);
        results = await pollBatchResults(tokens);
      } catch (judge0Error) {
        console.error("Judge0 error:", judge0Error);
        return NextResponse.json(
          { error: "Judge0 is unreachable or failed to process submissions" },
          { status: 502 },
        );
      }

      for (let i = 0; i < results.length; i++) {
        const result = results[i];

        if (result.status.id !== 3) {
          return NextResponse.json(
            {
              error: `Validation failed for ${language}`,
              testCase: {
                input: submissions[i].stdin,
                expectedOutput: submissions[i].expected_output,
                actualOutput: result.stdout,
                error: result.stderr || result.compile_output,
              },
              details: result,
            },
            { status: 400 },
          );
        }
      }
    }

    let newProblem;
    try {
      newProblem = await prisma.problem.create({
        data: {
          title,
          description,
          difficulty,
          tags,
          examples,
          constraints,
          hints,
          editorial,
          testCases,
          codeSnippets,
          referenceSolutions,
          userId: user.id,
        },
      });
    } catch (dbError) {
      console.error("Database error:", dbError);
      return NextResponse.json(
        { error: "Failed to save problem to database" },
        { status: 500 },
      );
    }

    return NextResponse.json(
      {
        success: true,
        message: "Problem Created Successfully",
        data: newProblem,
      },
      { status: 201 },
    );
  } catch (error) {
    console.error("Unexpected error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
