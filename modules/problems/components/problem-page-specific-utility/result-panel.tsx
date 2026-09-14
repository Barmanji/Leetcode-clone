"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { FileCode2, PlayCircle } from "lucide-react";
import { TestCaseTable } from "./testcase-table";
import { SubmissionDetails } from "./submission-details";
import type { TestCase } from "@/modules/types/problem";
import type { ExecutionResponse } from "@/modules/types/actions";

interface ResultPanelProps {
  testCases: TestCase[];
  executionResponse: ExecutionResponse;
  activeTab: "testcases" | "result";
  onTabChange: (tab: "testcases" | "result") => void;
}

export function ResultPanel({
  testCases,
  executionResponse,
  activeTab,
  onTabChange,
}: ResultPanelProps) {
  return (
    <Tabs
      value={activeTab}
      onValueChange={(v) => onTabChange(v as "testcases" | "result")}
      className="h-full flex flex-col"
    >
      <TabsList className="grid w-full grid-cols-2 h-9 shrink-0">
        <TabsTrigger value="testcases" className="flex items-center gap-1.5 text-xs cursor-pointer">
          <FileCode2 className="h-3.5 w-3.5" />
          Testcases
        </TabsTrigger>
        <TabsTrigger value="result" className="flex items-center gap-1.5 text-xs cursor-pointer">
          <PlayCircle className="h-3.5 w-3.5" />
          Result
        </TabsTrigger>
      </TabsList>

      <TabsContent value="testcases" className="flex-1 overflow-hidden mt-0">
        <ScrollArea className="h-full">
          <div className="p-3 space-y-3">
            {testCases.map((tc, i) => (
              <div key={i} className="border rounded-lg p-3 space-y-2">
                <div className="text-xs font-medium text-muted-foreground">
                  Case {i + 1}
                </div>
                <div className="space-y-1 text-sm">
                  <div>
                    <span className="text-muted-foreground text-xs">Input: </span>
                    <code className="bg-muted px-1.5 py-0.5 rounded text-xs font-mono">
                      {tc.input}
                    </code>
                  </div>
                  <div>
                    <span className="text-muted-foreground text-xs">Expected: </span>
                    <code className="bg-muted px-1.5 py-0.5 rounded text-xs font-mono">
                      {tc.output}
                    </code>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
      </TabsContent>

      <TabsContent value="result" className="flex-1 overflow-hidden mt-0">
        <ScrollArea className="h-full">
          <div className="p-3">
            {!executionResponse || !executionResponse.success ? (
              <div className="flex flex-col items-center justify-center h-32 text-muted-foreground text-sm">
                Run or submit your code to see results here.
              </div>
            ) : "results" in executionResponse ? (
              <TestCaseTable testCases={executionResponse.results} />
            ) : "submission" in executionResponse ? (
              <div className="space-y-3">
                <SubmissionDetails submission={executionResponse.submission} />
                <TestCaseTable testCases={executionResponse.submission.testCases} />
              </div>
            ) : null}
          </div>
        </ScrollArea>
      </TabsContent>
    </Tabs>
  );
}
