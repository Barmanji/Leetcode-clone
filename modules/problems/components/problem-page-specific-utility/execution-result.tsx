"use client";

import { SubmissionDetails } from "./submission-details";
import { TestCaseTable } from "./testcase-table";

export function ExecutionResults({ executionResponse }: any) {
  if (!executionResponse?.success) {
    return null;
  }

  // RUN response
  if (executionResponse.results) {
    return (
      <div className="space-y-4 mt-4">
        <TestCaseTable testCases={executionResponse.results} />
      </div>
    );
  }

  // SUBMIT response
  if (executionResponse.submission) {
    return (
      <div className="space-y-4 mt-4">
        <SubmissionDetails
          submission={executionResponse.submission}
        />

        <TestCaseTable
          testCases={executionResponse.submission.testCases}
        />
      </div>
    );
  }

  return null;
}
