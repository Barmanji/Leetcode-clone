"use client";
import { Card, CardContent } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ProblemsHeader } from "./problems-header";
import { useProblemFilters } from "../hooks/use-problem-filter";
import { ProblemsFilters } from "./problem-filters";
import { usePagination } from "../hooks/use-pagination";
import { ProblemRow } from "./problem-row";
import { ProblemsEmpty } from "./problem-empty";
import { ProblemsPagination } from "./problems-pagination";
import CreatePlaylistModal from "@/modules/playlists/components/create-playlist";
import { usePlaylistActions } from "@/modules/playlists/hooks/use-playlist-action";
import AddToPlaylistModal from "@/modules/playlists/components/add-to-playlist";
import type { Problem, UserData } from "@/modules/types/problem";

interface ProblemsTableProps {
  problems: Problem[];
  user: UserData | null;
}

const ProblemsTable = ({ problems = [], user }: ProblemsTableProps) => {
  const filters = useProblemFilters(problems);
  const pagination = usePagination(filters.filteredProblems);
  const playlist = usePlaylistActions();

  const handleSearchChange = (value: string) => {
    filters.setSearch(value);
    pagination.resetPage();
  };

  const handleDifficultyChange = (value: string) => {
    filters.setDifficulty(value);
    pagination.resetPage();
  };

  const handleTagChange = (value: string) => {
    filters.setSelectedTag(value);
    pagination.resetPage();
  };

  return (
    <div className="w-full max-w-7xl mx-auto space-y-8 p-6">
      <ProblemsHeader onCreatePlaylist={playlist.openCreateModal} />

      <ProblemsFilters
        search={filters.search}
        onSearchChange={handleSearchChange}
        difficulty={filters.difficulty}
        onDifficultyChange={handleDifficultyChange}
        selectedTag={filters.selectedTag}
        onTagChange={handleTagChange}
        allTags={filters.allTags}
      />

      <Card>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[100px]">Solved</TableHead>
                <TableHead>Title</TableHead>
                <TableHead>Tags</TableHead>
                <TableHead className="w-[120px]">Difficulty</TableHead>
                <TableHead className="w-[200px]">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {pagination.paginatedItems.length > 0 ? (
                pagination.paginatedItems.map((problem) => (
                  <ProblemRow
                    key={problem.id}
                    problem={problem}
                    user={user}
                    onDelete={() => {}}
                    onSave={playlist.openAddToPlaylist}
                  />
                ))
              ) : (
                <ProblemsEmpty />
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {pagination.showPagination && (
        <ProblemsPagination
          currentPage={pagination.currentPage}
          totalPages={pagination.totalPages}
          displayRange={pagination.displayRange}
          canGoPrevious={pagination.canGoPrevious}
          canGoNext={pagination.canGoNext}
          onPrevious={pagination.goToPreviousPage}
          onNext={pagination.goToNextPage}
        />
      )}

      <CreatePlaylistModal
        isOpen={playlist.isCreateModalOpen}
        onClose={playlist.closeCreateModal}
        onSubmit={playlist.handleCreatePlaylist}
      />

      <AddToPlaylistModal
        isOpen={playlist.isAddToPlaylistModalOpen}
        onClose={playlist.closeAddToPlaylistModal}
        onSubmit={playlist.handleAddToPlaylist}
        problemId={playlist.selectedProblemId}
      />
    </div>
  );
};

export default ProblemsTable;
