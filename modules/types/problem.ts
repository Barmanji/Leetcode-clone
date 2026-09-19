import type { Difficulty } from "@/lib/generated/prisma/enums";

export interface ProblemExample {
  input: string;
  output: string;
  explanation?: string;
}

export interface TestCase {
  input: string;
  output: string;
}

export interface Problem {
  id: string;
  title: string;
  description: string;
  difficulty: Difficulty;
  tags: string[];
  examples: Record<string, ProblemExample>;
  constraints: string;
  hints: string | null;
  editorial: string | null;
  testCases: TestCase[];
  codeSnippets: Record<string, string>;
  referenceSolutions: Record<string, string>;
  createdAt: Date;
  updatedAt: Date;
  userId: string;
  solvedBy?: { id: string; userId: string; problemId: string; createdAt: Date }[];
}

export interface Submission {
  id: string;
  userId: string;
  problemId: string;
  sourceCode: string;
  language: string;
  stdin: string | null;
  stdout: string | null;
  stderr: string | null;
  compileOutput: string | null;
  status: string;
  memory: string | null;
  time: string | null;
  createdAt: Date;
  testCases?: TestCaseResult[];
  problem?: Problem;
}

export interface TestCaseResult {
  id: string;
  submissionId: string;
  testCase: number;
  passed: boolean;
  stdout: string | null;
  expected: string;
  stderr: string | null;
  compileOutput: string | null;
  status: string;
  memory: string | null;
  time: string | null;
  createdAt: Date;
}

export interface PlaylistProblem {
  id: string;
  playlistId: string;
  problemId: string;
  createdAt: Date;
  problem: Problem;
}

export interface Playlist {
  id: string;
  name: string;
  description: string | null;
  createdAt: Date;
  updatedAt: Date;
  userId: string;
  problems?: PlaylistProblem[];
}

export interface ProblemSolved {
  id: string;
  userId: string;
  problemId: string;
  createdAt: Date;
}

export interface UserData {
  id: string;
  clerkId: string;
  firstName: string | null;
  lastName: string | null;
  email: string;
  imageUrl: string | null;
  role: string;
  createdAt: Date;
  updatedAt: Date;
  submissions: Submission[];
  solvedProblems: ProblemSolved[];
  playlists: Playlist[];
}
