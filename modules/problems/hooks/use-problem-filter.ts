import { useState, useMemo } from "react";
import type { Problem } from "@/modules/types/problem";

export function useProblemFilters(problems: Problem[] = []) {
  const [search, setSearch] = useState("");
  const [difficulty, setDifficulty] = useState("ALL");
  const [selectedTag, setSelectedTag] = useState("ALL");

  const allTags = useMemo(() => {
    const tagsSet = new Set<string>();
    problems.forEach((p) => p.tags?.forEach((t) => tagsSet.add(t)));
    return Array.from(tagsSet);
  }, [problems]);

  const filteredProblems = useMemo(() => {
    return problems
      .filter((problem) =>
        problem.title.toLowerCase().includes(search.toLowerCase())
      )
      .filter((problem) =>
        difficulty === "ALL" ? true : problem.difficulty === difficulty
      )
      .filter((problem) =>
        selectedTag === "ALL" ? true : problem.tags?.includes(selectedTag)
      );
  }, [problems, search, difficulty, selectedTag]);

  return {
    search,
    difficulty,
    selectedTag,
    allTags,
    setSearch,
    setDifficulty,
    setSelectedTag,
    filteredProblems,
  };
}
