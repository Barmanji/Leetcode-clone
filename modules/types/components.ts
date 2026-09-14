import type { UseFormReturn, FieldError } from "react-hook-form";
import type { z } from "zod";
import type { problemSchema } from "@/modules/problems/schema";
import type { Problem, Submission, TestCase, TestCaseResult, UserData, Playlist, ProblemSolved } from "./problem";
import type { ExecutionResponse } from "./actions";

export type ProblemFormData = z.infer<typeof problemSchema>;

export interface CodeEditorPanelProps {
  code: string;
  onCodeChange: (code: string) => void;
  selectedLanguage: string;
  onLanguageChange: (language: string) => void;
  onRun: () => void;
  onSubmit: () => void;
  isRunning: boolean;
  isSubmitting: boolean;
}

export interface TestCasesPanelProps {
  testCases: TestCase[];
}

export interface TestCaseItemProps {
  testCase: TestCase;
  index: number;
}

export interface ExecutionResultsProps {
  executionResponse: ExecutionResponse;
}

export interface TestCaseTableProps {
  testCases: TestCaseResult[];
}

export interface SubmissionDetailsProps {
  submission: Submission;
}

export interface SubmissionHistoryProps {
  submissions?: Submission[];
}

export interface ProblemDescriptionProps {
  problem: Problem;
  selectedLanguage: string;
}

export interface ExampleSectionProps {
  example: { input: string; output: string; explanation?: string };
  index: number;
}

export interface ConstraintsSectionProps {
  constraints: string;
}

export interface ProblemHeaderProps {
  problem: Problem | null;
}

export interface ProblemTabsProps {
  problem: Problem;
  submissionHistory: Submission[];
}

export interface ProblemsTableProps {
  problems: Problem[];
  user: UserData | null;
}

export interface ProblemsFiltersProps {
  search: string;
  onSearchChange: (value: string) => void;
  difficulty: string;
  onDifficultyChange: (value: string) => void;
  selectedTag: string;
  onTagChange: (value: string) => void;
  allTags: string[];
}

export interface ProblemsPaginationProps {
  currentPage: number;
  totalPages: number;
  displayRange: { start: number; end: number; total: number };
  canGoPrevious: boolean;
  canGoNext: boolean;
  onPrevious: () => void;
  onNext: () => void;
}

export interface ProblemsHeaderProps {
  onCreatePlaylist: () => void;
}

export interface CreatePlaylistModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: { name: string; description?: string }) => Promise<boolean>;
}

export interface AddToPlaylistModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (problemId: string, playlistId: string) => Promise<boolean>;
  problemId: string | null;
}

export interface FormHeaderProps {
  sampleType: string;
  setSampleType: (type: string) => void;
  onLoadSample: () => void;
}

export interface BasicInfoSectionProps {
  form: UseFormReturn<ProblemFormData>;
}

export interface TagsSectionProps {
  form: UseFormReturn<ProblemFormData>;
  tagsArray: {
    fields: { id: string }[];
    append: (value: string) => void;
    remove: (index: number) => void;
  };
}

export interface TestCasesSectionProps {
  form: UseFormReturn<ProblemFormData>;
  testCasesArray: {
    fields: { id: string }[];
    append: (value: { input: string; output: string }) => void;
    remove: (index: number) => void;
  };
}

export interface LanguageSectionProps {
  form: UseFormReturn<ProblemFormData>;
}

export interface AdditionalInfoSectionProps {
  form: UseFormReturn<ProblemFormData>;
}

export interface CodeEditorFormProps {
  value: string;
  onChange: (value: string) => void;
  language?: string;
}

export interface UserInfoCardProps {
  userData: UserData | null;
}

export interface ProfileStatsProps {
  submissions: { status: string }[];
  solvedCount: number;
  playlistCount: number;
}

export interface SolvedProblemsProps {
  solvedProblems: ProblemSolved[];
}

export interface PlaylistsSectionProps {
  playlists: Playlist[];
}
