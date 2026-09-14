"use client";

import { Search, Filter } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { DIFFICULTIES } from "../constant";
import type { ProblemsFiltersProps } from "@/modules/types/components";

export function ProblemsFilters({
  search,
  onSearchChange,
  difficulty,
  onDifficultyChange,
  selectedTag,
  onTagChange,
  allTags = [],
}: ProblemsFiltersProps) {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center gap-2">
          <Filter className="h-5 w-5" />
          <h3 className="text-lg font-medium">Filters</h3>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col lg:flex-row gap-4">
          <div className="flex-1">
            <SearchInput value={search} onChange={onSearchChange} />
          </div>
          <div className="flex flex-col sm:flex-row gap-4">
            <DifficultySelect
              value={difficulty}
              onChange={onDifficultyChange}
            />
            <TagSelect
              value={selectedTag}
              onChange={onTagChange}
              tags={allTags}
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

function SearchInput({ value, onChange }: { value: string; onChange: (v: string) => void }) {
  return (
    <div className="relative">
      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
      <Input
        placeholder="Search by title..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="pl-10"
      />
    </div>
  );
}

function DifficultySelect({ value, onChange }: { value: string; onChange: (v: string) => void }) {
  return (
    <Select value={value} onValueChange={onChange}>
      <SelectTrigger className="w-[180px] cursor-pointer">
        <SelectValue placeholder="Select difficulty" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="ALL" className="cursor-pointer">All Difficulties</SelectItem>
        {DIFFICULTIES.map((diff) => (
          <SelectItem key={diff} value={diff} className="cursor-pointer">
            {diff.charAt(0).toUpperCase() + diff.slice(1).toLowerCase()}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}

function TagSelect({ value, onChange, tags }: { value: string; onChange: (v: string) => void; tags: string[] }) {
  return (
    <Select value={value} onValueChange={onChange}>
      <SelectTrigger className="w-[180px] cursor-pointer">
        <SelectValue placeholder="Select tag" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="ALL" className="cursor-pointer">All Tags</SelectItem>
        {tags.map((tag) => (
          <SelectItem key={tag} value={tag} className="cursor-pointer">
            {tag}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
