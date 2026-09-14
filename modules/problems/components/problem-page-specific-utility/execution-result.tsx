"use client";

import { SubmissionDetails } from "./submission-details";
import { TestCaseTable } from "./testcase-table";
import type { ExecutionResponse } from "@/modules/types/actions";

export function ExecutionResults({ executionResponse }: { executionResponse: ExecutionResponse }) {
  if (!executionResponse || !executionResponse.success) {
    return null;
  }

  // RUN response
  if ("results" in executionResponse) {
    return (
      <div className="space-y-4">
        <TestCaseTable testCases={executionResponse.results.map(r => ({
          id: String(r.testCase),
          passed: true,
          memory: r.memory,
          time: r.time,
          stdout: r.stdout,
          expected: r.stdout ?? undefined,
        }))} />
      </div>
    );
  }

  // SUBMIT response
  if ("submission" in executionResponse) {
    return (
      <div className="space-y-4">
        <SubmissionDetails submission={executionResponse.submission} />
        <TestCaseTable testCases={executionResponse.submission.testCases} />
      </div>
    );
  }

  return null;
}
