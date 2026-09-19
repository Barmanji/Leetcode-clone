// Edit Distance — String / Dynamic Programming — HARD
export const sampleEditDistanceProblem = {
  title: "Edit Distance",
  description:
    "Given two strings word1 and word2, return the minimum number of operations required to convert word1 to word2. You have the following three operations permitted on a word: insert a character, delete a character, or replace a character.",
  difficulty: "HARD",
  tags: ["String", "Dynamic Programming"],
  constraints:
    "0 <= word1.length, word2.length <= 500\nword1 and word2 consist of lowercase English letters.",
  hints:
    "Use a DP table where dp[i][j] is the minimum number of operations to convert the first i characters of word1 into the first j characters of word2.",
  editorial:
    "Let dp[i][j] be the minimum number of operations needed to convert word1[0..i) into word2[0..j). If the current characters match, dp[i][j] equals dp[i-1][j-1]; otherwise it is 1 plus the minimum of the insert, delete, and replace cases. Fill the table bottom-up and return dp[word1.length][word2.length]. This runs in O(m * n) time and O(m * n) space.",
  testCases: [
    { input: "horse\nros", output: "3" },
    { input: "intention\nexecution", output: "5" },
    { input: "abc\nabc", output: "0" },
    { input: "a\nb", output: "1" },
  ],
  examples: {
    JAVASCRIPT: {
      input: 'word1 = "horse", word2 = "ros"',
      output: "3",
      explanation:
        'horse -> rorse (replace "h" with "r") -> rose (remove "r") -> ros (remove "e").',
    },
    PYTHON: {
      input: 'word1 = "horse", word2 = "ros"',
      output: "3",
      explanation:
        'horse -> rorse (replace "h" with "r") -> rose (remove "r") -> ros (remove "e").',
    },
    JAVA: {
      input: 'word1 = "horse", word2 = "ros"',
      output: "3",
      explanation:
        'horse -> rorse (replace "h" with "r") -> rose (remove "r") -> ros (remove "e").',
    },
    CPP: {
      input: 'word1 = "horse", word2 = "ros"',
      output: "3",
      explanation:
        'horse -> rorse (replace "h" with "r") -> rose (remove "r") -> ros (remove "e").',
    },
    RUST: {
      input: 'word1 = "horse", word2 = "ros"',
      output: "3",
      explanation:
        'horse -> rorse (replace "h" with "r") -> rose (remove "r") -> ros (remove "e").',
    },
    TYPESCRIPT: {
      input: 'word1 = "horse", word2 = "ros"',
      output: "3",
      explanation:
        'horse -> rorse (replace "h" with "r") -> rose (remove "r") -> ros (remove "e").',
    },
  },
  codeSnippets: {
    JAVASCRIPT: `/**
 * @param {string} word1
 * @param {string} word2
 * @return {number}
 */
function minDistance(word1, word2) {
  // Write your code here
}

// Input parsing
const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  terminal: false
});

const lines = [];
rl.on('line', (line) => lines.push(line));
rl.on('close', () => {
  const word1 = lines[0] || '';
  const word2 = lines[1] || '';
  const result = minDistance(word1, word2);
  console.log(result);
});`,
    PYTHON: `class Solution:
    def minDistance(self, word1: str, word2: str) -> int:
        # Write your code here
        pass

# Input parsing
if __name__ == "__main__":
    import sys
    lines = sys.stdin.read().splitlines()
    word1 = lines[0] if lines else ""
    word2 = lines[1] if len(lines) > 1 else ""
    sol = Solution()
    result = sol.minDistance(word1, word2)
    print(result)`,
    JAVA: `import java.util.*;

public class Main {
    public static int minDistance(String word1, String word2) {
        // Write your code here
        return 0;
    }

    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        String word1 = sc.hasNextLine() ? sc.nextLine() : "";
        String word2 = sc.hasNextLine() ? sc.nextLine() : "";

        int result = minDistance(word1, word2);
        System.out.println(result);
    }
}`,
    CPP: `#include <iostream>
#include <string>
#include <vector>
#include <algorithm>
using namespace std;

int minDistance(string word1, string word2) {
    // Write your code here
    return 0;
}

int main() {
    string word1, word2;
    getline(cin, word1);
    getline(cin, word2);

    int result = minDistance(word1, word2);
    cout << result << endl;
    return 0;
}`,
    RUST: `use std::io;

fn min_distance(word1: String, word2: String) -> i32 {
    // Write your code here
    0
}

fn main() {
    let mut word1 = String::new();
    io::stdin().read_line(&mut word1).expect("Failed to read line");
    let word1 = word1.trim_end_matches('\\n').trim_end_matches('\\r').to_string();

    let mut word2 = String::new();
    io::stdin().read_line(&mut word2).expect("Failed to read line");
    let word2 = word2.trim_end_matches('\\n').trim_end_matches('\\r').to_string();

    let result = min_distance(word1, word2);
    println!("{}", result);
}`,
    TYPESCRIPT: `// @ts-nocheck
function minDistance(word1: string, word2: string): number {
  // Write your code here
  return 0;
}

// Input parsing
const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  terminal: false
});

const lines: string[] = [];
rl.on('line', (line: string) => lines.push(line));
rl.on('close', () => {
  const word1 = lines[0] || '';
  const word2 = lines[1] || '';
  const result = minDistance(word1, word2);
  console.log(result);
});`,
  },
  referenceSolutions: {
    JAVASCRIPT: `/**
 * @param {string} word1
 * @param {string} word2
 * @return {number}
 */
function minDistance(word1, word2) {
  const m = word1.length;
  const n = word2.length;
  const dp = Array.from({ length: m + 1 }, () => new Array(n + 1).fill(0));
  for (let i = 0; i <= m; i++) dp[i][0] = i;
  for (let j = 0; j <= n; j++) dp[0][j] = j;
  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      if (word1[i - 1] === word2[j - 1]) {
        dp[i][j] = dp[i - 1][j - 1];
      } else {
        dp[i][j] = 1 + Math.min(dp[i - 1][j], dp[i][j - 1], dp[i - 1][j - 1]);
      }
    }
  }
  return dp[m][n];
}

// Input parsing
const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  terminal: false
});

const lines = [];
rl.on('line', (line) => lines.push(line));
rl.on('close', () => {
  const word1 = lines[0] || '';
  const word2 = lines[1] || '';
  const result = minDistance(word1, word2);
  console.log(result);
});`,
    PYTHON: `class Solution:
    def minDistance(self, word1: str, word2: str) -> int:
        m, n = len(word1), len(word2)
        dp = [[0] * (n + 1) for _ in range(m + 1)]
        for i in range(m + 1):
            dp[i][0] = i
        for j in range(n + 1):
            dp[0][j] = j
        for i in range(1, m + 1):
            for j in range(1, n + 1):
                if word1[i - 1] == word2[j - 1]:
                    dp[i][j] = dp[i - 1][j - 1]
                else:
                    dp[i][j] = 1 + min(dp[i - 1][j], dp[i][j - 1], dp[i - 1][j - 1])
        return dp[m][n]

# Input parsing
if __name__ == "__main__":
    import sys
    lines = sys.stdin.read().splitlines()
    word1 = lines[0] if lines else ""
    word2 = lines[1] if len(lines) > 1 else ""
    sol = Solution()
    result = sol.minDistance(word1, word2)
    print(result)`,
    JAVA: `import java.util.Scanner;

public class Main {
    public static int minDistance(String word1, String word2) {
        int m = word1.length();
        int n = word2.length();
        int[][] dp = new int[m + 1][n + 1];
        for (int i = 0; i <= m; i++) dp[i][0] = i;
        for (int j = 0; j <= n; j++) dp[0][j] = j;
        for (int i = 1; i <= m; i++) {
            for (int j = 1; j <= n; j++) {
                if (word1.charAt(i - 1) == word2.charAt(j - 1)) {
                    dp[i][j] = dp[i - 1][j - 1];
                } else {
                    dp[i][j] = 1 + Math.min(dp[i - 1][j], Math.min(dp[i][j - 1], dp[i - 1][j - 1]));
                }
            }
        }
        return dp[m][n];
    }

    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        String word1 = sc.hasNextLine() ? sc.nextLine() : "";
        String word2 = sc.hasNextLine() ? sc.nextLine() : "";

        int result = minDistance(word1, word2);
        System.out.println(result);
    }
}`,
    CPP: `#include <iostream>
#include <string>
#include <vector>
#include <algorithm>
using namespace std;

int minDistance(string word1, string word2) {
    int m = (int)word1.size();
    int n = (int)word2.size();
    vector<vector<int>> dp(m + 1, vector<int>(n + 1, 0));
    for (int i = 0; i <= m; i++) dp[i][0] = i;
    for (int j = 0; j <= n; j++) dp[0][j] = j;
    for (int i = 1; i <= m; i++) {
        for (int j = 1; j <= n; j++) {
            if (word1[i - 1] == word2[j - 1]) {
                dp[i][j] = dp[i - 1][j - 1];
            } else {
                dp[i][j] = 1 + min(dp[i - 1][j], min(dp[i][j - 1], dp[i - 1][j - 1]));
            }
        }
    }
    return dp[m][n];
}

int main() {
    string word1, word2;
    getline(cin, word1);
    getline(cin, word2);

    int result = minDistance(word1, word2);
    cout << result << endl;
    return 0;
}`,
    RUST: `use std::io;

fn min_distance(word1: String, word2: String) -> i32 {
    let w1: Vec<char> = word1.chars().collect();
    let w2: Vec<char> = word2.chars().collect();
    let m = w1.len();
    let n = w2.len();
    let mut dp = vec![vec![0; n + 1]; m + 1];
    for i in 0..=m {
        dp[i][0] = i as i32;
    }
    for j in 0..=n {
        dp[0][j] = j as i32;
    }
    for i in 1..=m {
        for j in 1..=n {
            if w1[i - 1] == w2[j - 1] {
                dp[i][j] = dp[i - 1][j - 1];
            } else {
                dp[i][j] = 1 + dp[i - 1][j].min(dp[i][j - 1]).min(dp[i - 1][j - 1]);
            }
        }
    }
    dp[m][n]
}

fn main() {
    let mut word1 = String::new();
    io::stdin().read_line(&mut word1).expect("Failed to read line");
    let word1 = word1.trim_end_matches('\\n').trim_end_matches('\\r').to_string();

    let mut word2 = String::new();
    io::stdin().read_line(&mut word2).expect("Failed to read line");
    let word2 = word2.trim_end_matches('\\n').trim_end_matches('\\r').to_string();

    let result = min_distance(word1, word2);
    println!("{}", result);
}`,
    TYPESCRIPT: `// @ts-nocheck
function minDistance(word1: string, word2: string): number {
  const m = word1.length;
  const n = word2.length;
  const dp: number[][] = Array.from({ length: m + 1 }, () => new Array(n + 1).fill(0));
  for (let i = 0; i <= m; i++) dp[i][0] = i;
  for (let j = 0; j <= n; j++) dp[0][j] = j;
  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      if (word1[i - 1] === word2[j - 1]) {
        dp[i][j] = dp[i - 1][j - 1];
      } else {
        dp[i][j] = 1 + Math.min(dp[i - 1][j], dp[i][j - 1], dp[i - 1][j - 1]);
      }
    }
  }
  return dp[m][n];
}

// Input parsing
const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  terminal: false
});

const lines: string[] = [];
rl.on('line', (line: string) => lines.push(line));
rl.on('close', () => {
  const word1 = lines[0] || '';
  const word2 = lines[1] || '';
  const result = minDistance(word1, word2);
  console.log(result);
});`,
  },
};