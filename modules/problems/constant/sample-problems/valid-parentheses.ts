// Valid Parentheses — String / Stack — EASY
export const sampleValidParenthesesProblem = {
  title: "Valid Parentheses",
  description:
    "Given a string s containing just the characters '(', ')', '{', '}', '[' and ']', determine if the input string is valid. An input string is valid if open brackets are closed by the same type of brackets in the correct order, and every close bracket has a corresponding open bracket of the same type. Output lowercase \"true\" if the string is valid, otherwise \"false\".",
  difficulty: "EASY",
  tags: ["String", "Stack"],
  constraints: "1 <= s.length <= 10^4\ns consists of parentheses only '()[]{}'.",
  hints:
    "Use a stack: push every opening bracket, and when you see a closing bracket check that it matches the bracket on top of the stack.",
  editorial:
    "Scan the string once with a stack. Push every opening bracket onto the stack; for each closing bracket, verify it matches the top of the stack and pop it. If the stack is empty when a closing bracket arrives, or the top does not match, the string is invalid. The string is valid only if every bracket pairs correctly and the stack is empty at the end, giving O(n) time and O(n) space.",
  testCases: [
    { input: "()", output: "true" },
    { input: "()[]{}", output: "true" },
    { input: "(]", output: "false" },
    { input: "([)]", output: "false" },
    { input: "{[]}", output: "true" },
  ],
  examples: {
    JAVASCRIPT: {
      input: 's = "()[]{}"',
      output: "true",
      explanation:
        "Every closing bracket matches the most recent opening bracket of the same type.",
    },
    PYTHON: {
      input: 's = "()[]{}"',
      output: "true",
      explanation:
        "Every closing bracket matches the most recent opening bracket of the same type.",
    },
    JAVA: {
      input: 's = "()[]{}"',
      output: "true",
      explanation:
        "Every closing bracket matches the most recent opening bracket of the same type.",
    },
    CPP: {
      input: 's = "()[]{}"',
      output: "true",
      explanation:
        "Every closing bracket matches the most recent opening bracket of the same type.",
    },
    RUST: {
      input: 's = "()[]{}"',
      output: "true",
      explanation:
        "Every closing bracket matches the most recent opening bracket of the same type.",
    },
    TYPESCRIPT: {
      input: 's = "()[]{}"',
      output: "true",
      explanation:
        "Every closing bracket matches the most recent opening bracket of the same type.",
    },
  },
  codeSnippets: {
    JAVASCRIPT: `/**
 * @param {string} s
 * @return {boolean}
 */
function isValid(s) {
  // Write your code here
}

// Input parsing
const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  terminal: false
});

rl.on('line', (line) => {
  const result = isValid(line);
  console.log(result ? "true" : "false");
  rl.close();
});`,
    PYTHON: `class Solution:
    def isValid(self, s: str) -> bool:
        # Write your code here
        pass

# Input parsing
if __name__ == "__main__":
    import sys
    s = sys.stdin.readline().strip()
    sol = Solution()
    result = sol.isValid(s)
    print(str(result).lower())`,
    JAVA: `import java.util.*;

public class Main {
    public static boolean isValid(String s) {
        // Write your code here
        return false;
    }

    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        String s = sc.nextLine();

        boolean result = isValid(s);
        System.out.println(result ? "true" : "false");
    }
}`,
    CPP: `#include <iostream>
#include <string>
#include <stack>
using namespace std;

bool isValid(string s) {
    // Write your code here
    return false;
}

int main() {
    string s;
    getline(cin, s);

    bool result = isValid(s);
    cout << (result ? "true" : "false") << endl;

    return 0;
}`,
    RUST: `use std::io;

fn is_valid(s: &str) -> bool {
    // Write your code here
    false
}

fn main() {
    let mut input = String::new();
    io::stdin().read_line(&mut input).expect("Failed to read line");
    let s = input.trim_end_matches('\\n').trim_end_matches('\\r');

    let result = is_valid(s);
    println!("{}", result);
}`,
    TYPESCRIPT: `// @ts-nocheck
function isValid(s: string): boolean {
  // Write your code here
  return false;
}

// Input parsing
const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  terminal: false
});

rl.on('line', (line: string) => {
  const result = isValid(line);
  console.log(result ? "true" : "false");
  rl.close();
});`,
  },
  referenceSolutions: {
    JAVASCRIPT: `/**
 * @param {string} s
 * @return {boolean}
 */
function isValid(s) {
  const stack = [];
  const map = { ')': '(', ']': '[', '}': '{' };
  for (const ch of s) {
    if (ch === '(' || ch === '[' || ch === '{') {
      stack.push(ch);
    } else {
      if (stack.length === 0 || stack.pop() !== map[ch]) {
        return false;
      }
    }
  }
  return stack.length === 0;
}

// Input parsing
const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  terminal: false
});

rl.on('line', (line) => {
  const result = isValid(line);
  console.log(result ? "true" : "false");
  rl.close();
});`,
    PYTHON: `class Solution:
    def isValid(self, s: str) -> bool:
        stack = []
        mapping = {")": "(", "]": "[", "}": "{"}
        for ch in s:
            if ch in mapping:
                if not stack or stack.pop() != mapping[ch]:
                    return False
            else:
                stack.append(ch)
        return not stack

# Input parsing
if __name__ == "__main__":
    import sys
    s = sys.stdin.readline().strip()
    sol = Solution()
    result = sol.isValid(s)
    print(str(result).lower())`,
    JAVA: `import java.util.Scanner;
import java.util.Stack;

public class Main {
    public static boolean isValid(String s) {
        Stack<Character> stack = new Stack<>();
        for (int i = 0; i < s.length(); i++) {
            char c = s.charAt(i);
            if (c == '(' || c == '[' || c == '{') {
                stack.push(c);
            } else {
                if (stack.isEmpty()) {
                    return false;
                }
                char top = stack.pop();
                if ((c == ')' && top != '(') ||
                    (c == ']' && top != '[') ||
                    (c == '}' && top != '{')) {
                    return false;
                }
            }
        }
        return stack.isEmpty();
    }

    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        String s = sc.nextLine();

        boolean result = isValid(s);
        System.out.println(result ? "true" : "false");
    }
}`,
    CPP: `#include <iostream>
#include <string>
#include <stack>
using namespace std;

bool isValid(string s) {
    stack<char> st;
    for (char c : s) {
        if (c == '(' || c == '[' || c == '{') {
            st.push(c);
        } else {
            if (st.empty()) {
                return false;
            }
            char top = st.top();
            st.pop();
            if ((c == ')' && top != '(') ||
                (c == ']' && top != '[') ||
                (c == '}' && top != '{')) {
                return false;
            }
        }
    }
    return st.empty();
}

int main() {
    string s;
    getline(cin, s);

    bool result = isValid(s);
    cout << (result ? "true" : "false") << endl;

    return 0;
}`,
    RUST: `use std::io;

fn is_valid(s: &str) -> bool {
    let mut stack: Vec<char> = Vec::new();
    for c in s.chars() {
        match c {
            '(' | '[' | '{' => stack.push(c),
            ')' => {
                if stack.pop() != Some('(') {
                    return false;
                }
            }
            ']' => {
                if stack.pop() != Some('[') {
                    return false;
                }
            }
            '}' => {
                if stack.pop() != Some('{') {
                    return false;
                }
            }
            _ => return false,
        }
    }
    stack.is_empty()
}

fn main() {
    let mut input = String::new();
    io::stdin().read_line(&mut input).expect("Failed to read line");
    let s = input.trim_end_matches('\\n').trim_end_matches('\\r');

    let result = is_valid(s);
    println!("{}", result);
}`,
    TYPESCRIPT: `// @ts-nocheck
function isValid(s: string): boolean {
  const stack: string[] = [];
  const map: { [key: string]: string } = { ')': '(', ']': '[', '}': '{' };
  for (const ch of s) {
    if (ch === '(' || ch === '[' || ch === '{') {
      stack.push(ch);
    } else {
      if (stack.length === 0 || stack.pop() !== map[ch]) {
        return false;
      }
    }
  }
  return stack.length === 0;
}

// Input parsing
const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  terminal: false
});

rl.on('line', (line: string) => {
  const result = isValid(line);
  console.log(result ? "true" : "false");
  rl.close();
});`,
  },
};