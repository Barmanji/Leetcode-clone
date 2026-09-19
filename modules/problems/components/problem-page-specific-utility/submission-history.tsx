"use client";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  CheckCircle2,
  XCircle,
  Clock,
  Cpu,
  Code,
  Calendar,
  ChevronDown,
  ChevronRight,
  Copy,
  Check,
  ExternalLink,
  ListChecks,
} from "lucide-react";
import { useTheme } from "next-themes";
import { Editor } from "@monaco-editor/react";
import { getEditorLanguage } from "@/modules/problems/constant";
import { Button } from "@/components/ui/button";
import type { Submission } from "@/modules/types/problem";

interface SubmissionHistoryProps {
  submissions?: Submission[];
}

const READ_ONLY_EDITOR_OPTIONS = {
  minimap: { enabled: false },
  fontSize: 14,
  lineNumbers: "on" as const,
  roundedSelection: false,
  scrollBeyondLastLine: false,
  automaticLayout: true,
  tabSize: 2,
  wordWrap: "on" as const,
  readOnly: true as const,
  domReadOnly: true as const,
};

export const SubmissionHistory = ({
  submissions = [],
}: SubmissionHistoryProps) => {
  const { theme } = useTheme();
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  if (!submissions.length) {
    return (
      <Card className="w-full">
        <CardHeader>
          <CardTitle>Submission History</CardTitle>
          <CardDescription>No submissions yet</CardDescription>
        </CardHeader>
      </Card>
    );
  }

  const formatMemory = (memory: string) => {
    if (!memory) return "N/A";
    try {
      const memoryArray: string[] = JSON.parse(memory);
      if (!memoryArray.length) return "0.00 KB";

      const memoryInKB = memoryArray.map((item) => {
        const numericValue = parseFloat(item);
        if (isNaN(numericValue)) return 0;

        const upperItem = item.toUpperCase();
        if (upperItem.includes("GB")) return numericValue * 1024 * 1024;
        if (upperItem.includes("MB")) return numericValue * 1024;
        return numericValue;
      });

      const totalMemoryKB = memoryInKB.reduce((a, b) => a + b, 0);
      let avgMemory = totalMemoryKB / memoryArray.length;

      let unit = "KB";

      if (avgMemory >= 1024 * 1024) {
        avgMemory = avgMemory / (1024 * 1024);
        unit = "GB";
      } else if (avgMemory >= 1024) {
        avgMemory = avgMemory / 1024;
        unit = "MB";
      }

      return `${avgMemory.toFixed(2)} ${unit}`;
    } catch {
      return "N/A";
    }
  };

  const formatTime = (time: string) => {
    if (!time) return "N/A";
    try {
      const timeArray: string[] = JSON.parse(time);
      const avgTime =
        timeArray
          .map((t: string) => parseFloat(t.replace(" s", "")))
          .reduce((a: number, b: number) => a + b, 0) / timeArray.length;
      return `${avgTime.toFixed(3)} s`;
    } catch {
      return "N/A";
    }
  };

  const formatDate = (dateString: string | Date) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const toggleExpand = (id: string) => {
    setExpandedId((current) => (current === id ? null : id));
  };

  const handleCopy = async (id: string, code: string) => {
    try {
      await navigator.clipboard.writeText(code);
      setCopiedId(id);
      setTimeout(() => setCopiedId(null), 2000);
    } catch {
      // clipboard unavailable — ignore
    }
  };

  const passedCount = (submission: Submission) =>
    submission.testCases?.filter((tc) => tc.passed).length ?? 0;

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Submission History</CardTitle>
        <CardDescription>
          Your previous submissions for this problem
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[600px] pr-4">
          <div className="space-y-3">
            {submissions.map((submission) => {
              const isExpanded = expandedId === submission.id;
              const isCopied = copiedId === submission.id;
              const totalTests = submission.testCases?.length ?? 0;

              return (
                <Card
                  key={submission.id}
                  className="bg-muted/50 overflow-hidden"
                >
                  <button
                    type="button"
                    onClick={() => toggleExpand(submission.id)}
                    aria-expanded={isExpanded}
                    className="w-full text-left cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-lg"
                  >
                    <CardContent className="pt-4 pb-4">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-2">
                          {isExpanded ? (
                            <ChevronDown className="h-4 w-4 text-muted-foreground" />
                          ) : (
                            <ChevronRight className="h-4 w-4 text-muted-foreground" />
                          )}
                          {submission.status === "Accepted" ? (
                            <Badge className="bg-green-500/10 text-green-500 hover:bg-green-500/20">
                              <CheckCircle2 className="mr-1 h-3 w-3" />
                              Accepted
                            </Badge>
                          ) : (
                            <Badge className="bg-red-500/10 text-red-500 hover:bg-red-500/20">
                              <XCircle className="mr-1 h-3 w-3" />
                              Failed
                            </Badge>
                          )}
                          {totalTests > 0 && (
                            <Badge
                              variant="outline"
                              className="text-muted-foreground"
                            >
                              <ListChecks className="mr-1 h-3 w-3" />
                              {passedCount(submission)}/{totalTests} passed
                            </Badge>
                          )}
                        </div>
                        <div className="flex items-center gap-3">
                          {submission.problem && (
                            <a
                              href={`/problem/${submission.problem.id}`}
                              onClick={(e) => e.stopPropagation()}
                              className="flex items-center gap-1 text-sm font-medium text-primary hover:underline"
                            >
                              {submission.problem.title}
                              <ExternalLink className="h-3 w-3" />
                            </a>
                          )}
                          <div className="flex items-center gap-1 text-sm text-muted-foreground">
                            <Calendar className="h-3 w-3" />
                            {formatDate(submission.createdAt)}
                          </div>
                        </div>
                      </div>

                      <div className="grid grid-cols-3 gap-4">
                        <div className="flex items-center gap-2">
                          <Code className="h-4 w-4 text-muted-foreground" />
                          <div>
                            <p className="text-xs font-medium text-muted-foreground">
                              Language
                            </p>
                            <p className="text-sm font-medium">
                              {submission.language}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Cpu className="h-4 w-4 text-muted-foreground" />
                          <div>
                            <p className="text-xs font-medium text-muted-foreground">
                              Memory
                            </p>
                            <p className="text-sm font-medium">
                              {formatMemory(submission.memory || "")}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Clock className="h-4 w-4 text-muted-foreground" />
                          <div>
                            <p className="text-xs font-medium text-muted-foreground">
                              Time
                            </p>
                            <p className="text-sm font-medium">
                              {formatTime(submission.time || "")}
                            </p>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </button>

                  {isExpanded && (
                    <div className="px-6 pb-5 pt-1 border-t">
                      <div className="flex items-center justify-between mb-3 pt-3">
                        <p className="text-sm font-semibold flex items-center gap-2">
                          <Code className="h-4 w-4 text-muted-foreground" />
                          Saved Solution ({submission.language})
                        </p>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleCopy(submission.id, submission.sourceCode)}
                          className="cursor-pointer"
                        >
                          {isCopied ? (
                            <>
                              <Check className="h-3.5 w-3.5 mr-1" />
                              Copied
                            </>
                          ) : (
                            <>
                              <Copy className="h-3.5 w-3.5 mr-1" />
                              Copy
                            </>
                          )}
                        </Button>
                      </div>

                      <div className="border rounded-lg overflow-hidden h-[320px]">
                        <Editor
                          height="100%"
                          language={getEditorLanguage(submission.language)}
                          value={submission.sourceCode}
                          theme={theme === "dark" ? "vs-dark" : "light"}
                          options={READ_ONLY_EDITOR_OPTIONS}
                        />
                      </div>

                      {totalTests > 0 && (
                        <div className="mt-4">
                          <p className="text-sm font-semibold mb-2">
                            Test Case Results ({passedCount(submission)}/{totalTests})
                          </p>
                          <div className="space-y-2">
                            {submission.testCases?.map((tc) => (
                              <div
                                key={tc.id}
                                className="rounded-lg border bg-background/60 p-3"
                              >
                                <div className="flex items-center justify-between mb-2">
                                  <span className="text-xs font-medium text-muted-foreground">
                                    Test Case #{tc.testCase}
                                  </span>
                                  {tc.passed ? (
                                    <Badge className="bg-green-500/10 text-green-500 hover:bg-green-500/20">
                                      <CheckCircle2 className="mr-1 h-3 w-3" />
                                      Passed
                                    </Badge>
                                  ) : (
                                    <Badge className="bg-red-500/10 text-red-500 hover:bg-red-500/20">
                                      <XCircle className="mr-1 h-3 w-3" />
                                      Failed
                                    </Badge>
                                  )}
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-xs">
                                  <div>
                                    <p className="text-muted-foreground mb-1">Output</p>
                                    <pre className="rounded bg-muted p-2 overflow-x-auto whitespace-pre-wrap break-words">
                                      {tc.stdout || "(empty)"}
                                    </pre>
                                  </div>
                                  <div>
                                    <p className="text-muted-foreground mb-1">Expected</p>
                                    <pre className="rounded bg-muted p-2 overflow-x-auto whitespace-pre-wrap break-words">
                                      {tc.expected ?? "(empty)"}
                                    </pre>
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </Card>
              );
            })}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
};