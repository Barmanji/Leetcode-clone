import { useEffect, useState } from "react";
import { getProblemById } from "../actions";
import type { Problem } from "@/modules/types/problem";

export function useProblem(id: string) {
  const [problem, setProblem] = useState<Problem | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchProblem = async () => {
      try {
        setIsLoading(true);
        const problemData = await getProblemById(id);

        if (problemData.success) {
          setProblem(problemData.data as Problem);
        }
      } catch (error) {
        console.error("Error fetching problem:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProblem();
  }, [id]);

  return { problem, isLoading };
}
