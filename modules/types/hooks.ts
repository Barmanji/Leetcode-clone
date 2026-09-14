import type { Problem, Submission } from "./problem";
import type { ExecutionResponse } from "./actions";

export interface UseEditorReturn {
  selectedLanguage: string;
  setSelectedLanguage: (lang: string) => void;
  code: string;
  setCode: (code: string) => void;
  isRunning: boolean;
  isSubmitting: boolean;
  executionResponse: ExecutionResponse;
  handleRun: () => Promise<void>;
  handleSubmit: () => Promise<void>;
}

export interface UseProblemReturn {
  problem: Problem | null;
  isLoading: boolean;
}

export interface UseSubmissionHistoryReturn {
  submissionHistory: Submission[];
  refetch: () => Promise<void>;
}

export interface UsePaginationReturn<T> {
  currentPage: number;
  totalPages: number;
  paginatedItems: T[];
  displayRange: { start: number; end: number; total: number };
  goToNextPage: () => void;
  goToPreviousPage: () => void;
  goToPage: (page: number) => void;
  resetPage: () => void;
  canGoNext: boolean;
  canGoPrevious: boolean;
  showPagination: boolean;
}

export interface FilterProblem {
  title: string;
  difficulty?: string;
  tags?: string[];
}

export interface UseProblemFiltersReturn {
  search: string;
  difficulty: string;
  selectedTag: string;
  allTags: string[];
  setSearch: (search: string) => void;
  setDifficulty: (difficulty: string) => void;
  setSelectedTag: (tag: string) => void;
  filteredProblems: FilterProblem[];
}

export interface UsePlaylistActionsReturn {
  isCreateModalOpen: boolean;
  openCreateModal: () => void;
  closeCreateModal: () => void;
  handleCreatePlaylist: (data: { name: string; description?: string }) => Promise<boolean>;
  isAddToPlaylistModalOpen: boolean;
  selectedProblemId: string | null;
  openAddToPlaylist: (problemId: string) => void;
  closeAddToPlaylistModal: () => void;
  handleAddToPlaylist: (problemId: string, playlistId: string) => Promise<boolean>;
}
