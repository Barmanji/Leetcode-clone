import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, XCircle } from "lucide-react";

interface TestCaseRow {
  id?: string;
  passed: boolean;
  memory?: string | null;
  time?: string | null;
  stdout?: string | null;
  expected?: string | null;
}

interface TestCaseTableProps {
  testCases: TestCaseRow[];
}

export const TestCaseTable = ({ testCases }: TestCaseTableProps) => {
  return (
    <div className="w-full rounded-lg border">
      <Table>
        <TableCaption>Test Case Results</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[80px]">Case</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Memory</TableHead>
            <TableHead>Time</TableHead>
            <TableHead>Output</TableHead>
            <TableHead>Expected</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {testCases.map((testCase, index) => (
            <TableRow key={testCase.id || index}>
              <TableCell className="font-medium text-xs">{index + 1}</TableCell>
              <TableCell>
                <div className="flex items-center gap-1.5">
                  {testCase.passed ? (
                    <Badge className="bg-green-500/10 text-green-500 hover:bg-green-500/20 text-xs">
                      <CheckCircle className="mr-1 h-3 w-3" />
                      Passed
                    </Badge>
                  ) : (
                    <Badge className="bg-red-500/10 text-red-500 hover:bg-red-500/20 text-xs">
                      <XCircle className="mr-1 h-3 w-3" />
                      Failed
                    </Badge>
                  )}
                </div>
              </TableCell>
              <TableCell className="text-xs">{testCase.memory || "N/A"}</TableCell>
              <TableCell className="text-xs">{testCase.time || "N/A"}</TableCell>
              <TableCell className="max-w-[180px] truncate font-mono text-xs">
                {testCase.stdout || "N/A"}
              </TableCell>
              <TableCell className="max-w-[180px] truncate font-mono text-xs">
                {testCase.expected || "N/A"}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};
