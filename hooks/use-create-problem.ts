"use client";

import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { defaultFormValues, problemSchema } from "@/modules/problems/schema";
import { SAMPLE_PROBLEMS, SAMPLE_PROBLEM_OPTIONS } from "@/modules/problems/constant/sample-problem";
import { z } from "zod";

type ProblemFormData = z.infer<typeof problemSchema>;

export function useCreateProblem() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [sampleType, setSampleType] = useState(
    SAMPLE_PROBLEM_OPTIONS[0].key,
  );

  const form = useForm<ProblemFormData>({
    resolver: zodResolver(problemSchema),
    defaultValues: defaultFormValues as ProblemFormData,
  });

  const testCasesArray = useFieldArray({
    control: form.control,
    name: "testCases",
  });

  // tags is a string[] field - useFieldArray needs special handling
  const tagsArray = useFieldArray({
    control: form.control,
    name: "tags" as "testCases",
  });

  const onSubmit = async (values: ProblemFormData) => {
    try {
      setIsLoading(true);
      const response = await fetch("/api/create-problem", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });

      const data = await response.json();

      if (data.success) {
        toast.success("Problem created successfully");
        router.push("/problems");
      }
    } catch (error) {
      console.error("Error creating problem:", error);
      toast.error((error as Error).message || "Failed to create problem");
    } finally {
      setIsLoading(false);
    }
  };

  const loadSampleData = () => {
    const sampleData =
      SAMPLE_PROBLEMS[sampleType as keyof typeof SAMPLE_PROBLEMS];
    // Replace tags by resetting form with sample data
    form.reset(sampleData as unknown as ProblemFormData);
    // Re-apply field arrays
    testCasesArray.replace(sampleData.testCases);
    tagsArray.replace(sampleData.tags as unknown as { input: string; output: string }[]);
  };

  return {
    form,
    testCasesArray,
    tagsArray: {
      fields: tagsArray.fields,
      append: (value: string) => (tagsArray.append as (v: unknown) => void)(value),
      remove: tagsArray.remove,
    },
    isLoading,
    sampleType,
    setSampleType,
    onSubmit: form.handleSubmit(onSubmit),
    loadSampleData,
  };
}
