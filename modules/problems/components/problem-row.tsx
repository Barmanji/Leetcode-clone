"use client";

import Link from "next/link";
import { Bookmark, PencilIcon, TrashIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { TableCell, TableRow } from "@/components/ui/table";
import { getDifficultyColor } from "../constant";
import type { Problem, UserData } from "@/modules/types/problem";

type OnAction = (problemId: string) => void;

interface ProblemRowProps {
  problem: Problem;
  user?: UserData | null;
  onDelete: OnAction;
  onSave: OnAction;
}

export function ProblemRow({
  problem,
  user,
  onDelete,
  onSave,
}: ProblemRowProps) {
  const isSolved = (problem.solvedBy?.length ?? 0) > 0;

  return (
    <TableRow>
      <TableCell>
        <SolvedCheckbox checked={isSolved} />
      </TableCell>
      <TableCell className="font-medium">
        <ProblemTitle id={problem.id} title={problem.title} />
      </TableCell>
      <TableCell>
        <TagsList tags={problem.tags} />
      </TableCell>
      <TableCell>
        <DifficultyBadge difficulty={problem.difficulty} />
      </TableCell>
      <TableCell>
        <ActionButtons
          problemId={problem.id}
          isAdmin={user?.role === "ADMIN"}
          onDelete={onDelete}
          onSave={onSave}
        />
      </TableCell>
    </TableRow>
  );
}

function SolvedCheckbox({ checked }: { checked: boolean }) {
  return (
    <Checkbox
      checked={checked}
      disabled
      className="disabled:opacity-100 data-[state=checked]:bg-green-600 data-[state=checked]:border-green-600 dark:data-[state=checked]:bg-green-600"
    />
  );
}

function ProblemTitle({ id, title }: { id: string; title: string }) {
  return (
    <Link
      href={`/problem/${id}`}
      className="text-primary hover:underline transition-colors cursor-pointer"
    >
      {title}
    </Link>
  );
}

function TagsList({ tags = [] }: { tags?: string[] }) {
  return (
    <div className="flex flex-wrap gap-1">
      {tags.map((tag, idx) => (
        <Badge
          key={idx}
          variant="outline"
          className="text-xs bg-orange-700 text-orange-100 border-orange-400 hover:bg-orange-900"
        >
          {tag}
        </Badge>
      ))}
    </div>
  );
}

function DifficultyBadge({
  difficulty,
}: {
  difficulty?: "EASY" | "MEDIUM" | "HARD";
}) {
  return (
    <Badge
      className={`${getDifficultyColor(difficulty ?? "EASY")} border-0 font-medium`}
    >
      {difficulty}
    </Badge>
  );
}

function ActionButtons({
  problemId,
  isAdmin,
  onDelete,
  onSave,
}: {
  problemId: string;
  isAdmin: boolean;
  onDelete: OnAction;
  onSave: OnAction;
}) {
  return (
    <div className="flex items-center gap-2">
      {isAdmin && (
        <>
          <Button
            variant="destructive"
            size="sm"
            onClick={() => onDelete(problemId)}
            className="cursor-pointer"
          >
            <TrashIcon className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="sm"
            disabled
            className="cursor-pointer"
          >
            <PencilIcon className="h-4 w-4" />
          </Button>
        </>
      )}
      <Button
        variant="outline"
        size="sm"
        onClick={() => onSave(problemId)}
        className="gap-2 cursor-pointer"
      >
        <Bookmark className="h-4 w-4" />
        <span className="hidden sm:inline">Save</span>
      </Button>
    </div>
  );
}
