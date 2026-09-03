import axios from "axios";

const JUDGE0_BASE_URL = process.env.JUDGE0_URL || "http://localhost:2358";
export function getJudge0languageId(language: string): number | undefined {
  const languageMap = {
    // rather than hitting DB just for id we made a map which we are just hitting rn.
    PYTHON: 71,
    JAVASCRIPT: 63,
    JAVA: 62,
    CPP: 54,
    TYPESCRIPT: 74,
    RUST: 73,
  };

  return languageMap[language.toUpperCase() as keyof typeof languageMap];
}

export function getLanguageName(languageId: number) {
  const LANGUAGE_NAMES = {
    74: "TypeScript",
    63: "JavaScript",
    71: "Python",
    62: "Java",
    105: "Cpp",
    73: "Rust",
  };
  return LANGUAGE_NAMES[languageId as keyof typeof LANGUAGE_NAMES] || "Unknown";
}

export async function submitBatch(submissions: any) {
  // copy as it is from judge0 docs, we are just hitting the endpoint with our submissions array
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

export async function pollBatchResults(tokens: string[]) {
  // polling
  while (true) {
    const options = {
      // get submission by tokens, copy from docs (rapid API)
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

    const results = data.submissions; // contains submission arr (look below for example)

    const isAllDone = results.every(
      // the logic is in docs, status_id after 3 means something is wrong with code. (there are 14 status code in docs)
      (r: any) => r.status.id !== 1 && r.status.id !== 2,
    );

    if (isAllDone) return results;

    await sleep(1000);
  }
}
// basic utlitiy function to sleep for a given number of milliseconds
export const sleep = (ms: number) =>
  new Promise((resolve) => setTimeout(resolve, ms));

// NOTE: From docs
// {
//   "submissions": [
//     {
//       "language_id": 46,
//       "stdout": "hello from Bash\n",
//       "status_id": 3,
//       "stderr": null,
//       "token": "db54881d-bcf5-4c7b-a2e3-d33fe7e25de7"
//     },
//     {
//       "language_id": 71,
//       "stdout": "hello from Python\n",
//       "status_id": 3,
//       "stderr": null,
//       "token": "ecc52a9b-ea80-4a00-ad50-4ab6cc3bb2a1"
//     },
//     {
//       "language_id": 72,
//       "stdout": "hello from Ruby\n",
//       "status_id": 3,
//       "stderr": null,
//       "token": "1b35ec3b-5776-48ef-b646-d5522bdeb2cc"
//     }
//   ]
// }
