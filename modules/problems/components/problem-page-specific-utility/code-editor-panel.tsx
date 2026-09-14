import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Code, Send } from "lucide-react";
import { useTheme } from "next-themes";
import {
  EDITOR_OPTIONS,
  getEditorLanguage,
  LANGUAGE_OPTIONS,
} from "../../constant";
import { Editor } from "@monaco-editor/react";
import { Button } from "@/components/ui/button";
import type { OnMount } from "@monaco-editor/react";
import type { CodeEditorPanelProps } from "@/modules/types/components";

const CodeEditorPanel = ({
  code,
  onCodeChange,
  selectedLanguage,
  onLanguageChange,
  onRun,
  onSubmit,
  isRunning,
  isSubmitting,
}: CodeEditorPanelProps) => {
  const { theme } = useTheme();

  const isProcessing = isRunning || isSubmitting;

  const handleEditorMount: OnMount = (editor, monaco) => {
    // editor is ready
  };

  return (
    <Card className="h-full flex flex-col">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <Code className="size-5" />
            Code Editor
          </CardTitle>
          <Select value={selectedLanguage} onValueChange={onLanguageChange}>
            <SelectTrigger className="w-32 cursor-pointer">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {LANGUAGE_OPTIONS.map((lang) => (
                <SelectItem key={lang.value} value={lang.value} className="cursor-pointer">
                  {lang.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </CardHeader>

      <CardContent className="flex-1 flex flex-col min-h-0">
        <div className="border rounded-lg overflow-hidden flex-1 min-h-0">
          <Editor
            height="100%"
            language={getEditorLanguage(selectedLanguage)}
            value={code}
            onChange={(value: string | undefined) => onCodeChange(value || "")}
            theme={theme === "dark" ? "vs-dark" : "light"}
            onMount={handleEditorMount}
            options={EDITOR_OPTIONS}
          />
        </div>

        <div className="flex gap-3 mt-3">
          <div className={isProcessing ? "cursor-not-allowed" : ""}>
            <Button
              onClick={onRun}
              disabled={isProcessing}
              variant={"outline"}
              className="flex items-center gap-2 cursor-pointer disabled:pointer-events-none disabled:opacity-50 disabled:transition-none disabled:bg-background disabled:text-foreground disabled:border-input"
            >
              {isRunning ? "Running..." : "Run"}
            </Button>
          </div>

          <div className={isProcessing ? "cursor-not-allowed" : ""}>
            <Button
              variant={"default"}
              onClick={onSubmit}
              disabled={isProcessing}
              className="flex items-center gap-2 cursor-pointer disabled:pointer-events-none disabled:opacity-50 disabled:transition-none disabled:bg-primary disabled:text-primary-foreground"
            >
              <Send className="h-4 w-4" />
              {isSubmitting ? "Submitting..." : "Submit"}
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default CodeEditorPanel;
