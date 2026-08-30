import {z} from "zod";

export const problemSchema = z.object({

  title: z.string().min(3, "Title must be at least 3 characters"),
  description: z.string().min(10, "Description must be at least 10 characters"),
  difficulty: z.enum(["EASY", "MEDIUM", "HARD"]).optional(),
  tags: z.array(z.string()).min(1, "At least one tag is required"),
  constraints: z.string().min(1, "Constraints are required"),
  hints: z.string().optional(),
  editorial: z.string().optional(),

  testCases: z
    .array(
      z.object({
        input: z.string().min(1, "Input is required"),
        output: z.string().min(1, "Input is required"),
      }),
    )
    .min(1, "At leat one test case is required"),
  examples: z.object({
    JAVASCRIPT: z.object({
      input: z.string().min(1, "Input is required"),
      output: z.string().min(1, "Output is required"),
      explanation: z.string().optional(),
    }),
    PYTHON: z.object({
      input: z.string().min(1, "Input is required"),
      output: z.string().min(1, "Output is required"),
      explanation: z.string().optional(),
    }),
    JAVA: z.object({
      input: z.string().min(1, "Input is required"),
      output: z.string().min(1, "Output is required"),
      explanation: z.string().optional(),
    }),
    CPP: z.object({
      input: z.string().min(1, "Input is required"),
      output: z.string().min(1, "Output is required"),
      explanation: z.string().optional(),
    }),
    RUST: z.object({
      input: z.string().min(1, "Input is required"),
      output: z.string().min(1, "Output is required"),
      explanation: z.string().optional(),
    }),
    TYPESCRIPT: z.object({
      input: z.string().min(1, "Input is required"),
      output: z.string().min(1, "Output is required"),
      explanation: z.string().optional(),
    }),
  }),

  // Boilerplate code snippets for each language
  codeSnippets: z.object({
    JAVASCRIPT: z.string().min(1, "Javascript code snippet is required"),
    PYTHON: z.string().min(1, "Python code snippet is required"),
    JAVA: z.string().min(1, "Java solution is required"),
    CPP: z.string().min(1, "C++ solution is required"),
    RUST: z.string().min(1, "Rust solution is required"),
    TYPESCRIPT: z.string().min(1, "Typescript solution is required"),
  }),
  // Judge0 will take refrence solutions for each language to run the test cases against
  referenceSolutions: z.object({
    JAVASCRIPT: z.string().min(1, "Javascript code snippet is required"),
    PYTHON: z.string().min(1, "Python code snippet is required"),
    JAVA: z.string().min(1, "Java solution is required"),
    CPP: z.string().min(1, "C++ solution is required"),
    RUST: z.string().min(1, "Rust solution is required"),
    TYPESCRIPT: z.string().min(1, "Typescript solution is required"),
  }),
});


export const defaultFormValues = {
  title: "",
  description: "",
  difficulty: undefined,
  constraints: "",
  hints: "",
  editorial: "",
  testCases: [{ input: "", output: "" }],
  tags: [""],
  examples: {
    JAVASCRIPT: { input: "", output: "", explanation: "" },
    PYTHON: { input: "", output: "", explanation: "" },
    JAVA: { input: "", output: "", explanation: "" },
    CPP: { input: "", output: "", explanation: "" },
    RUST: { input: "", output: "", explanation: "" },
    TYPESCRIPT: { input: "", output: "", explanation: "" },
  },
  codeSnippets: {
    JAVASCRIPT: "function solution() {\n  // Write your code here\n}",
    PYTHON: "def solution():\n    # Write your code here\n    pass",
    JAVA: "public class Solution {\n    public static void main(String[] args) {\n        // Write your code here\n    }\n}",
    CPP: "#include <iostream>\n\nvoid solution() {\n    // Write your code here\n}\n\nint main() {\n    solution();\n    return 0;\n}",
    RUST: "fn solution() {\n    // Write your code here\n}\n\nfn main() {\n    solution();\n}",
    TYPESCRIPT: "function solution(): void {\n    // Write your code here\n}\n\nsolution();",
  },
  referenceSolutions: {
    JAVASCRIPT: "// Add your reference solution here",
    PYTHON: "# Add your reference solution here",
    JAVA: "// Add your reference solution here",
    CPP: "// Add your reference solution here",
    RUST: "// Add your reference solution here",
    TYPESCRIPT: "// Add your reference solution here",
  },
};

export const LANGUAGES = ["JAVASCRIPT", "PYTHON", "JAVA", "CPP", "RUST", "TYPESCRIPT"] as const;

// default calss names for difficulty options
export const DIFFICULTY_OPTIONS = [
  { value: "EASY", label: "Easy", className: "bg-green-100 text-green-800" },
  {
    value: "MEDIUM",
    label: "Medium",
    className: "bg-amber-100 text-amber-800",
  },
  { value: "HARD", label: "Hard", className: "bg-red-100 text-red-800" },
];

