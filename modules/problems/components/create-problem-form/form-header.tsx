"use client";
import { FileText, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CardHeader, CardTitle } from "@/components/ui/card";
import { SAMPLE_PROBLEM_OPTIONS } from "@/modules/problems/constant/sample-problem";
import type { FormHeaderProps } from "@/modules/types/components";

export function FormHeader({ sampleType, setSampleType, onLoadSample }: FormHeaderProps) {
  return (
    <CardHeader className="pb-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <CardTitle className="text-3xl flex items-center gap-3">
          <FileText className="w-8 h-8 text-amber-600" />
          Create Problem
        </CardTitle>

        <div className="flex flex-col md:flex-row gap-3">
          <Button
            type="button"
            variant="secondary"
            size="sm"
            onClick={onLoadSample}
            className="gap-2 cursor-pointer"
          >
            <Download className="w-4 h-4" />
            Load Sample
          </Button>
        </div>
      </div>

      <div className="mt-4">
        <p className="text-sm text-muted-foreground mb-2">
          Pick a sample problem and click &ldquo;Load Sample&rdquo;:
        </p>
        <div className="flex flex-wrap gap-2">
          {SAMPLE_PROBLEM_OPTIONS.map((option) => (
            <Button
              key={option.key}
              type="button"
              variant={sampleType === option.key ? "default" : "outline"}
              size="sm"
              className="cursor-pointer"
              onClick={() => setSampleType(option.key)}
            >
              {option.label}
            </Button>
          ))}
        </div>
      </div>
    </CardHeader>
  );
}