/* eslint-disable no-console */
/**
 * Verifies every sample problem's reference solutions against Judge0.
 * Usage: JUDGE0_URL=<base url> npx tsx scripts/verify-samples.ts
 */
import axios from "axios";
import { SAMPLE_PROBLEMS } from "../modules/problems/constant/sample-problem";

const JUDGE0_BASE_URL = process.env.JUDGE0_URL || "http://localhost:2358";

const LANGUAGE_IDS: Record<string, number> = {
  PYTHON: 71,
  JAVASCRIPT: 63,
  JAVA: 62,
  CPP: 54,
  TYPESCRIPT: 74,
  RUST: 73,
};

interface Verdict {
  problem: string;
  language: string;
  testCase: number;
  input: string;
  expected: string;
  got: string;
  statusId: number;
  statusDesc: string;
  ok: boolean;
}

async function runOne(
  prob: { title: string; testCases: { input: string; output: string }[] },
  language: string,
  solutionCode: string,
): Promise<Verdict[]> {
  const languageId = LANGUAGE_IDS[language];
  if (!languageId) return [];

  const submissions = prob.testCases.map((tc) => ({
    source_code: solutionCode,
    language_id: languageId,
    stdin: tc.input,
    expected_output: tc.output,
    base64_encoded: false,
    wait: false,
  }));

  const { data } = await axios.post(
    `${JUDGE0_BASE_URL}/submissions/batch?base64_encoded=false`,
    { submissions },
  );

  const tokens: string[] = data.map((d: { token: string }) => d.token);

  // poll until all done
  let results: { status: { id: number; description: string }; stdout: string | null; stderr: string | null; compile_output: string | null }[] = [];
  for (;;) {
    const res = await axios.get(`${JUDGE0_BASE_URL}/submissions/batch?tokens=${tokens.join(",")}&base64_encoded=false&fields=status,stdout,stderr,compile_output`);
    results = res.data.submissions;
    if (results.every((r) => r.status.id !== 1 && r.status.id !== 2)) break;
    await new Promise((r) => setTimeout(r, 1000));
  }

  return results.map((r, i) => {
    const tc = prob.testCases[i];
    const expectedTrim = (tc.output || "").trim();
    const gotTrim = (r.stdout || "").trim();
    const ok = r.status.id === 3 && gotTrim === expectedTrim;
    return {
      problem: prob.title,
      language,
      testCase: i + 1,
      input: tc.input,
      expected: tc.output,
      got: r.stdout ?? `(null) stderr=${(r.stderr || "").slice(0, 200)} compile=${(r.compile_output || "").slice(0, 200)}`,
      statusId: r.status.id,
      statusDesc: r.status.description,
      ok,
    };
  });
}

async function main() {
  let failures: Verdict[] = [];
  let total = 0;
  let passed = 0;

  for (const [key, prob] of Object.entries(SAMPLE_PROBLEMS)) {
    for (const [language, solution] of Object.entries((prob as any).referenceSolutions)) {
      // eslint-disable-next-line no-await-in-loop
      const verdicts = await runOne(prob as any, language, solution as string);
      for (const v of verdicts) {
        total++;
        if (v.ok) passed++;
        else failures.push(v);
      }
    }
    console.log(`✔ checked ${key} (${Object.keys((prob as any).referenceSolutions).length} langs)`);
  }

  console.log(`\nTotal: ${total} | Passed: ${passed} | Failed: ${failures.length}`);
  if (failures.length) {
    console.log("\n=== FAILURES ===");
    for (const f of failures) {
      console.log(
        `✘ ${f.problem} [${f.language}] TC#${f.testCase} status=${f.statusId}(${f.statusDesc})\n` +
          `  input:    ${JSON.stringify(f.input)}\n` +
          `  expected: ${JSON.stringify(f.expected)}\n` +
          `  got:      ${JSON.stringify(f.got)}`,
      );
    }
    process.exit(1);
  }
}

main().catch((e) => {
  console.error("Fatal error:", e.message);
  process.exit(1);
});