"use client";
import { FileText, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CardHeader, CardTitle } from "@/components/ui/card";
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
          <SampleTypeToggle
            sampleType={sampleType}
            setSampleType={setSampleType}
          />
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
    </CardHeader>
  );
}

function SampleTypeToggle({ sampleType, setSampleType }: { sampleType: string; setSampleType: (type: string) => void }) {
  return (
    <div className="flex border rounded-md">
      <Button
        type="button"
        variant={sampleType === "DP" ? "default" : "outline"}
        size="sm"
        className="rounded-r-none cursor-pointer"
        onClick={() => setSampleType("DP")}
      >
        DP Problem
      </Button>
      <Button
        type="button"
        variant={sampleType === "string" ? "default" : "outline"}
        size="sm"
        className="rounded-l-none cursor-pointer"
        onClick={() => setSampleType("string")}
      >
        String Problem
      </Button>
    </div>
  );
}
