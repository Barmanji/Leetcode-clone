"use client";

import { useState } from "react";
import { List, Calendar, FileText, ChevronDown, ChevronRight, CheckCircle } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import type { Playlist } from "@/modules/types/problem";

interface PlaylistListProps {
  playlists: Playlist[];
}

const difficultyColor: Record<string, string> = {
  EASY: "text-green-500 bg-green-500/10",
  MEDIUM: "text-yellow-500 bg-yellow-500/10",
  HARD: "text-red-500 bg-red-500/10",
};

export function PlaylistList({ playlists }: PlaylistListProps) {
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const formatDate = (dateString: Date) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <List className="w-7 h-7 text-blue-500" />
          <h1 className="text-3xl font-bold">My Playlists</h1>
          <Badge variant="secondary" className="text-sm">
            {playlists.length}
          </Badge>
        </div>
      </div>

      {playlists.length === 0 ? (
        <Card>
          <CardContent className="py-16">
            <div className="text-center">
              <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
                <List className="w-8 h-8 text-muted-foreground" />
              </div>
              <h3 className="text-lg font-medium mb-2">No Playlists Yet</h3>
              <p className="text-muted-foreground max-w-md mx-auto">
                Create your first playlist to organize problems by topic,
                difficulty, or any way you like.
              </p>
            </div>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-4">
          {playlists.map((playlist) => {
            const isExpanded = expandedId === playlist.id;
            const problems = playlist.problems || [];

            return (
              <Card
                key={playlist.id}
                className="hover:shadow-md transition-all duration-200 bg-blue-50 dark:bg-blue-950/50"
              >
                <CardContent className="p-0">
                  {/* Playlist header - clickable */}
                  <button
                    onClick={() => setExpandedId(isExpanded ? null : playlist.id)}
                    className="w-full p-6 text-left cursor-pointer hover:bg-blue-100/50 dark:hover:bg-blue-900/30 transition-colors rounded-t-lg"
                  >
                    <div className="flex items-start gap-3">
                      <div className="bg-blue-100 dark:bg-blue-900 rounded-full p-3 shrink-0">
                        <FileText className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <h3 className="font-bold text-lg truncate">
                            {playlist.name}
                          </h3>
                          <Badge variant="secondary" className="text-xs shrink-0">
                            {problems.length} problem{problems.length !== 1 && "s"}
                          </Badge>
                        </div>
                        {playlist.description && (
                          <p className="text-sm text-muted-foreground mt-1 line-clamp-2">
                            {playlist.description}
                          </p>
                        )}
                        <div className="flex items-center gap-3 mt-2 text-xs text-muted-foreground">
                          <div className="flex items-center gap-1">
                            <Calendar className="w-3 h-3" />
                            <span>Created {formatDate(playlist.createdAt)}</span>
                          </div>
                        </div>
                      </div>
                      <div className="shrink-0 mt-1">
                        {isExpanded ? (
                          <ChevronDown className="w-5 h-5 text-muted-foreground" />
                        ) : (
                          <ChevronRight className="w-5 h-5 text-muted-foreground" />
                        )}
                      </div>
                    </div>
                  </button>

                  {/* Expanded problems list */}
                  {isExpanded && (
                    <div className="border-t px-6 pb-6 pt-4 space-y-2">
                      {problems.length === 0 ? (
                        <p className="text-sm text-muted-foreground text-center py-4">
                          No problems in this playlist yet.
                        </p>
                      ) : (
                        problems.map((pip) => (
                          <Link
                            key={pip.id}
                            href={`/problem/${pip.problem.id}`}
                            className="flex items-center justify-between p-3 rounded-lg bg-background hover:bg-muted transition-colors group"
                          >
                            <div className="flex items-center gap-3 min-w-0">
                              <CheckCircle className="w-4 h-4 text-muted-foreground group-hover:text-green-500 transition-colors shrink-0" />
                              <span className="text-sm font-medium truncate">
                                {pip.problem.title}
                              </span>
                            </div>
                            <div className="flex items-center gap-2 shrink-0">
                              <span
                                className={`text-xs font-medium px-2 py-0.5 rounded-full ${
                                  difficultyColor[pip.problem.difficulty] || ""
                                }`}
                              >
                                {pip.problem.difficulty}
                              </span>
                            </div>
                          </Link>
                        ))
                      )}
                    </div>
                  )}
                </CardContent>
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
}
