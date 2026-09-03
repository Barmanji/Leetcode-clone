import { useEffect, useState } from "react";
import { getAllSubmissionByCurrentUserForProblem } from "../actions";

export function useSubmissionHistory(id: string) {
  const [submissionHistory, setSubmissionHistory] = useState([]);

  const fetchSubmissionHistory = async () => {
    try {
      const response = await getAllSubmissionByCurrentUserForProblem(id);
      if (response.success) {
        setSubmissionHistory((response as any).data);
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
