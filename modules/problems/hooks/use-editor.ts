"use client";
import { getJudge0languageId } from "@/lib/judge0";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { submitCode, runCode } from "../actions";
import type { Problem } from "@/modules/types/problem";
import type { ExecutionResponse } from "@/modules/types/actions";

export type ResultTab = "testcases" | "result";

export function useEditor(
  problem: Problem | null,
  initialLanguage = "JAVASCRIPT",
  onSubmissionSuccess?: () => void,
) {
  const [selectedLanguage, setSelectedLanguage] = useState(initialLanguage);
  const [code, setCode] = useState("");
  const [isRunning, setIsRunning] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [executionResponse, setExecutionResponse] =
    useState<ExecutionResponse>(null);
  const [activeResultTab, setActiveResultTab] =
    useState<ResultTab>("testcases");

  useEffect(() => {
    if (problem?.codeSnippets?.[selectedLanguage]) {
      setCode(problem.codeSnippets[selectedLanguage]);
    }
  }, [selectedLanguage, problem]);

  const handleRun = async () => {
    try {
      setIsRunning(true);
      setActiveResultTab("result");

      const languageId = getJudge0languageId(selectedLanguage);
      const stdin = problem!.testCases.map((tc) => tc.input);
      const expected_outputs = problem!.testCases.map((tc) => tc.output);

      const res = await runCode(code, languageId, stdin, expected_outputs);
      setExecutionResponse(res);
      if (res.success) {
        toast.success("Code executed successfully");
      }
    } catch (error) {
      console.error("Error executing code", error);
      toast.error("Error executing code");
    } finally {
      setIsRunning(false);
    }
  };

  const handleSubmit = async () => {
    if (!problem) return;

    try {
      setIsSubmitting(true);
      setActiveResultTab("result");

      const languageId = getJudge0languageId(selectedLanguage);
      const stdin = problem.testCases.map((tc) => tc.input);
      const expected_outputs = problem.testCases.map((tc) => tc.output);

      const res = await submitCode(
        code,
        languageId,
        stdin,
        expected_outputs,
        problem.id,
      );
      setExecutionResponse(res);

      if (res.success) {
        toast.success("Code submitted successfully");
        onSubmissionSuccess?.();
      }
    } catch (error) {
      console.error("Error executing code", error);
      toast.error("Error executing code");
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
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
  };
}
