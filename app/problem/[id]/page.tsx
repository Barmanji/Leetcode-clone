"use client";
import React from "react";
import { useParams } from "next/navigation";
import { useProblem } from "@/modules/problems/hooks/use-problem";
import { Spinner } from "@/components/ui/spinner";
import { ProblemHeaderForProblemPage } from "@/modules/problems/components/problem-header-forProblemPage";
import { ProblemTabs } from "@/modules/problems/components/problem-tabs";
import { useEditor } from "@/modules/problems/hooks/use-editor";
import CodeEditorPanel from "@/modules/problems/components/problem-page-specific-utility/code-editor-panel";
import { ResultPanel } from "@/modules/problems/components/problem-page-specific-utility/result-panel";
import { useSubmissionHistory } from "@/modules/problems/hooks/use-submission-history";
import {
  ResizablePanelGroup,
  ResizablePanel,
  ResizableHandle,
} from "@/components/ui/resizable";

const ProblemIdPage = () => {
  const params = useParams<{ id: string }>();

  const { problem, isLoading } = useProblem(params.id);
  const { submissionHistory, refetch: refetchSubmissionHistory } =
    useSubmissionHistory(params.id);
  const {
    selectedLanguage,
    setSelectedLanguage,
    code,
    setCode,
    isRunning,
    isSubmitting,
    executionResponse,
    activeResultTab,
    setActiveResultTab,
    handleRun,
    handleSubmit,
  } = useEditor(problem, "JAVASCRIPT", refetchSubmissionHistory);

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center h-[calc(100vh-80px)]">
        <Spinner />
      </div>
    );
  }

  if (!problem) {
    return (
      <div className="flex flex-col items-center justify-center h-[calc(100vh-80px)]">
        <p className="text-muted-foreground">Problem not found.</p>
      </div>
    );
  }

  return (
    <div className="h-[calc(100vh-10px)] flex flex-col bg-background overflow-hidden">
      <div className="w-full px-4 pt-2 pb-1 flex-1 flex flex-col overflow-hidden">
        <ProblemHeaderForProblemPage problem={problem} />

        <ResizablePanelGroup
          orientation="horizontal"
          className="flex-1 rounded-lg border mt-2 overflow-hidden min-h-0"
        >
          {/* LEFT PANEL - Description (independent scroll) */}
          <ResizablePanel defaultSize={35} minSize={25}>
            <div className="h-full overflow-y-auto">
              <ProblemTabs
                problem={problem}
                submissionHistory={submissionHistory}
              />
            </div>
          </ResizablePanel>

          <ResizableHandle withHandle />

          {/* RIGHT PANEL - Code Editor + Result Tabs */}
          <ResizablePanel defaultSize={65} minSize={35}>
            <ResizablePanelGroup orientation="vertical">
              {/* Code Editor - smaller, ~30% */}
              <ResizablePanel defaultSize={260} minSize={150}>
                <div className="h-full overflow-hidden p-1">
                  <CodeEditorPanel
                    code={code}
                    onCodeChange={setCode}
                    selectedLanguage={selectedLanguage}
                    onLanguageChange={setSelectedLanguage}
                    onRun={handleRun}
                    onSubmit={handleSubmit}
                    isRunning={isRunning}
                    isSubmitting={isSubmitting}
                  />
                </div>
              </ResizablePanel>

              <ResizableHandle withHandle />

              {/* Result Tabs - ~70%, independent scroll */}
              <ResizablePanel defaultSize={70} minSize={20}>
                <div className="h-full overflow-hidden p-1">
                  <ResultPanel
                    testCases={problem.testCases}
                    executionResponse={executionResponse}
                    activeTab={activeResultTab}
                    onTabChange={setActiveResultTab}
                  />
                </div>
              </ResizablePanel>
            </ResizablePanelGroup>
          </ResizablePanel>
        </ResizablePanelGroup>
      </div>
    </div>
  );
};

export default ProblemIdPage;
