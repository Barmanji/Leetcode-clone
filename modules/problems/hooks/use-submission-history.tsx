import { useEffect, useState } from "react";
import { getAllSubmissionByCurrentUserForProblem } from "../actions";
import type { Submission } from "@/modules/types/problem";

export function useSubmissionHistory(id: string) {
  const [submissionHistory, setSubmissionHistory] = useState<Submission[]>([]);

  const fetchSubmissionHistory = async () => {
    try {
      const response = await getAllSubmissionByCurrentUserForProblem(id);
      if (response.success) {
        setSubmissionHistory(response.data as Submission[]);
      }
    } catch (error) {
      console.error("Error fetching submission history:", error);
    }
  };

  useEffect(() => {
    fetchSubmissionHistory();
  }, [id]);

  return {
    submissionHistory,
    refetch: fetchSubmissionHistory,
  };
}
