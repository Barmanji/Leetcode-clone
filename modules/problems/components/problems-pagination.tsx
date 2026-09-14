"use client";

import { Button } from "@/components/ui/button";
import type { ProblemsPaginationProps } from "@/modules/types/components";

export function ProblemsPagination({
  currentPage,
  totalPages,
  displayRange,
  canGoPrevious,
  canGoNext,
  onPrevious,
  onNext,
}: ProblemsPaginationProps) {
  return (
    <div className="flex items-center justify-between">
      <p className="text-sm text-muted-foreground">
        Showing {displayRange.start} to {displayRange.end} of{" "}
        {displayRange.total} problems
      </p>

      <div className="flex items-center gap-2">
        <Button
          variant="outline"
          size="sm"
          disabled={!canGoPrevious}
          onClick={onPrevious}
          className="cursor-pointer"
        >
          Previous
        </Button>

        <span className="text-sm font-medium">
          Page {currentPage} of {totalPages}
        </span>

        <Button
          variant="outline"
          size="sm"
          disabled={!canGoNext}
          onClick={onNext}
          className="cursor-pointer"
        >
          Next
        </Button>
      </div>
    </div>
  );
}
