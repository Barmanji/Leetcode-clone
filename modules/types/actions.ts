import type { Problem, Submission, TestCaseResult } from "./problem";

export interface ActionSuccess<T> {
  success: true;
  data: T;
}

export interface ActionError {
  success: false;
  error: string;
}

export type ActionResult<T> = ActionSuccess<T> | ActionError;

export interface Judge0SubmissionResponse {
  token: string;
}

export interface Judge0Status {
  id: number;
  description: string;
}

export interface Judge0Result {
  stdout: string | null;
  stderr: string | null;
  compile_output: string | null;
  status: Judge0Status;
  memory: number | null;
  time: number | null;
  token: string;
}

export interface Judge0BatchSubmission {
  source_code: string;
  language_id: number;
  stdin: string;
  expected_output?: string;
  base64_encoded: boolean;
  wait: boolean;
}

export interface DetailedRunResult {
  testCase: number;
  passed: boolean;
  stdout: string | null;
  expected: string;
  stderr: string | null;
  compileOutput: string | null;
  status: string;
  memory: string | undefined;
  time: string | undefined;
}

export interface DetailedSubmitResult {
  testCase: number;
  passed: boolean;
  stdout: string | null;
  expected: string;
  stderr: string | null;
  compileOutput: string | null;
  status: string;
  memory: string | undefined;
  time: string | undefined;
}

export interface RunCodeResponse {
  success: true;
  results: DetailedRunResult[];
}

export interface SubmitCodeResponse {
  success: true;
  submission: Submission & { testCases: TestCaseResult[] };
}

export type ExecutionResponse = RunCodeResponse | SubmitCodeResponse | { success: false; error: string } | null;

export interface CreateProblemRequest {
  title: string;
  description: string;
  difficulty: string;
  tags: string[];
  examples: Record<string, { input: string; output: string; explanation?: string }>;
  constraints: string;
  testCases: { input: string; output: string }[];
  codeSnippets: Record<string, string>;
  referenceSolutions: Record<string, string>;
}

export interface UserInfo {
  id: string;
  clerkId: string;
  firstName: string | null;
  lastName: string | null;
  email: string;
  imageUrl: string | null;
  role: string;
}
