"use client";

// create problem hook - ADMIN
import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { defaultFormValues, problemSchema } from "@/modules/problems/schema";
import { SAMPLE_PROBLEMS } from "@/modules/problems/constant/sample-problem";
import { z } from "zod";

type ProblemFormData = z.infer<typeof problemSchema>;

export function useCreateProblem() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [sampleType, setSampleType] = useState("DP");

  // useForm props from react-hook-form with zod resolver and default values
  const form = useForm<ProblemFormData>({
    resolver: zodResolver(problemSchema),
    defaultValues: defaultFormValues as ProblemFormData,
  });

  const testCasesArray = useFieldArray({
    control: form.control,
    name: "testCases" as const,
  });

  // READ:
  const tagsArray = useFieldArray({
    control: form.control,
    name: "tags" as any,
  }) as any;

  const onSubmit = async (values: ProblemFormData) => {
    try {
      setIsLoading(true);
      const response = await fetch("/api/create-problem", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });

      const data = await response.json();

      console.log(data);
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
    tagsArray.replace(sampleData.tags);
    testCasesArray.replace(sampleData.testCases);

    form.reset(sampleData as any);
  };

  return {
    form,
    testCasesArray,
    tagsArray,
    isLoading,
    sampleType,
    setSampleType,
    onSubmit: form.handleSubmit(onSubmit),
    loadSampleData,
  };
}
