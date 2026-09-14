"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Trophy, FileText, Lightbulb, ScrollText } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { SubmissionHistory } from "./problem-page-specific-utility/submission-history";
import { ExampleSection } from "./problem-page-specific-utility/example-section";
import { ConstraintsSection } from "./problem-page-specific-utility/constraint-section";
import type { Problem, Submission } from "@/modules/types/problem";

interface ProblemTabsProps {
  problem: Problem;
  submissionHistory: Submission[];
}

export const ProblemTabs = ({ problem, submissionHistory }: ProblemTabsProps) => {
  return (
    <Tabs defaultValue="description" className="w-full h-full flex flex-col">
      <TabsList className="grid w-full grid-cols-4">
        <TabsTrigger value="description" className="flex items-center gap-2 cursor-pointer">
          <ScrollText className="h-4 w-4" />
          Description
        </TabsTrigger>
        <TabsTrigger value="submissions" className="flex items-center gap-2 cursor-pointer">
          <Trophy className="h-4 w-4" />
          Submissions
        </TabsTrigger>
        <TabsTrigger value="editorial" className="flex items-center gap-2 cursor-pointer">
          <FileText className="h-4 w-4" />
          Editorial
        </TabsTrigger>
        <TabsTrigger value="hints" className="flex items-center gap-2 cursor-pointer">
          <Lightbulb className="h-4 w-4" />
          Hints
        </TabsTrigger>
      </TabsList>

      <TabsContent value="description" className="flex-1 overflow-hidden mt-0">
        <ScrollArea className="h-full">
          <div className="p-4 space-y-6">
            <p className="text-foreground leading-relaxed whitespace-pre-wrap">
              {problem.description}
            </p>
            {Object.values(problem.examples).map((example, index) => (
              <ExampleSection key={index} example={example} index={index} />
            ))}
            <ConstraintsSection constraints={problem.constraints} />
          </div>
        </ScrollArea>
      </TabsContent>

      <TabsContent value="submissions" className="flex-1 overflow-hidden mt-0">
        <ScrollArea className="h-full">
          <div className="p-4">
            <SubmissionHistory submissions={submissionHistory} />
          </div>
        </ScrollArea>
      </TabsContent>

      <TabsContent value="editorial" className="flex-1 overflow-hidden mt-0">
        <ScrollArea className="h-full">
          <div className="p-4">
            <p className="text-foreground leading-relaxed whitespace-pre-wrap">
              {problem.editorial || "Editorial not available yet."}
            </p>
          </div>
        </ScrollArea>
      </TabsContent>

      <TabsContent value="hints" className="flex-1 overflow-hidden mt-0">
        <ScrollArea className="h-full">
          <div className="p-4">
            <p className="text-foreground leading-relaxed whitespace-pre-wrap">
              {problem.hints || "No hints available for this problem."}
            </p>
          </div>
        </ScrollArea>
      </TabsContent>
    </Tabs>
  );
};
