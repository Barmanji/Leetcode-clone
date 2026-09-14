import axios from "axios";
import type { Judge0BatchSubmission, Judge0Result, Judge0SubmissionResponse } from "@/modules/types/actions";

const JUDGE0_BASE_URL = process.env.JUDGE0_URL || "http://localhost:2358";

export function getJudge0languageId(language: string): number {
  const languageMap: Record<string, number> = {
    PYTHON: 71,
    JAVASCRIPT: 63,
    JAVA: 62,
    CPP: 54,
    TYPESCRIPT: 74,
    RUST: 73,
  };

  return languageMap[language.toUpperCase()];
}

export function getLanguageName(languageId: number) {
  const LANGUAGE_NAMES: Record<number, string> = {
    74: "TypeScript",
    63: "JavaScript",
    71: "Python",
    62: "Java",
    54: "Cpp",
    73: "Rust",
  };
  return LANGUAGE_NAMES[languageId] || "Unknown";
}

export async function submitBatch(submissions: Judge0BatchSubmission[]): Promise<Judge0SubmissionResponse[]> {
  const options = {
    method: "POST",
    url: `${JUDGE0_BASE_URL}/submissions/batch`,
    params: {
      base64_encoded: "false",
    },
    headers: {
      "Content-Type": "application/json",
    },
    data: {
      submissions: submissions,
    },
  };

  const { data } = await axios.request(options);

  return data;
}

export async function pollBatchResults(tokens: string[]): Promise<Judge0Result[]> {
  while (true) {
    const options = {
      method: "GET",
      url: `${JUDGE0_BASE_URL}/submissions/batch`,
      params: {
        tokens: tokens.join(","),
        base64_encoded: "false",
        fields: "*",
      },
      headers: {
        "Content-Type": "application/json",
      },
    };

    const { data } = await axios.request(options);

    const results: Judge0Result[] = data.submissions;

    const isAllDone = results.every(
      (r) => r.status.id !== 1 && r.status.id !== 2,
    );

    if (isAllDone) return results;

    await sleep(1000);
  }
}

export const sleep = (ms: number) =>
  new Promise((resolve) => setTimeout(resolve, ms));
