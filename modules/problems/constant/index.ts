// for problem form that user will see
export const DIFFICULTIES = ["EASY", "MEDIUM", "HARD"];
export const ITEMS_PER_PAGE = 8;

export const DEFAULT_FILTERS = {
  search: "",
  difficulty: "ALL",
  tag: "ALL",
};

export const DIFFICULTY_COLORS = {
  EASY:   "bg-green-800 text-green-100 hover:bg-green-600",
  MEDIUM: "bg-amber-600 text-amber-100 hover:bg-amber-500",
  HARD:   "bg-red-800 text-red-100 hover:bg-red-600",
};

// helper to get diffcolor
export const getDifficultyColor = (difficulty: string | undefined) => {
  if (!difficulty) return "";
  return DIFFICULTY_COLORS[difficulty as keyof typeof DIFFICULTY_COLORS] || "";
};

export const LANGUAGE_OPTIONS = [
  { value: 'JAVASCRIPT', label: 'JavaScript' },
  { value: 'PYTHON', label: 'Python' },
  { value: 'JAVA', label: 'Java' },
  { value: 'CPP', label: 'C++' },
  { value: 'RUST', label: 'Rust' },
  { value: 'TYPESCRIPT', label: 'TypeScript' },
];


export const getEditorLanguage = (language:string) => {
  return language.toLowerCase();
};

export const EDITOR_OPTIONS = {
  minimap: { enabled: false },
  fontSize: 16,
  lineNumbers: "on" as const,
  roundedSelection: false,
  scrollBeyondLastLine: false,
  automaticLayout: true,
  tabSize: 2,
  wordWrap: "on" as const,
};

