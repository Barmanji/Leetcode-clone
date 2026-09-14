"use client";

import { ExampleSection } from "./problem-page-specific-utility/example-section";
import { ConstraintsSection } from "./problem-page-specific-utility/constraint-section";
import type { Problem } from "@/modules/types/problem";

interface ProblemDescriptionProps {
  problem: Problem;
}

export function ProblemDescription({ problem }: ProblemDescriptionProps) {
  return (
    <div className="space-y-6">
      <p className="text-foreground leading-relaxed whitespace-pre-wrap">
        {problem.description}
      </p>
      {Object.values(problem.examples).map((example, index) => (
        <ExampleSection key={index} example={example} index={index} />
      ))}
      <ConstraintsSection constraints={problem.constraints} />
    </div>
  );
}
