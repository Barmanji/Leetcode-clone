// Longest Substring Without Repeating Characters — String / Sliding Window / Hash Map — MEDIUM
export const sampleLongestSubstringWithoutRepeatingCharactersProblem = {
  title: "Longest Substring Without Repeating Characters",
  description:
    "Given a string s, find the length of the longest substring without repeating characters. A substring is a contiguous sequence of characters within the string. Return the length of the longest such substring as a single integer.",
  difficulty: "MEDIUM",
  tags: ["String", "Sliding Window", "Hash Map"],
  constraints:
    "0 <= s.length <= 5 * 10^4\ns consists of English letters, digits, symbols and spaces.",
  hints:
    "Use a sliding window: keep expanding the window to the right, and whenever you see a duplicate character, shrink the window from the left until there are no repeats.",
  editorial:
    "Maintain two pointers (left and right) that delimit a window with no duplicate characters, backed by a hash set of the characters inside the window. When a duplicate is encountered, advance the left pointer and remove characters from the set until the window is valid again, then update the maximum window length. This is O(n) time and O(min(n, alphabet size)) space.",
  testCases: [
    { input: "abcabcbb", output: "3" },
    { input: "bbbbb", output: "1" },
    { input: "pwwkew", output: "3" },
    { input: "au", output: "2" },
    { input: "aab", output: "2" },
  ],
  examples: {
    JAVASCRIPT: {
      input: 's = "abcabcbb"',
      output: "3",
      explanation: 'The answer is "abc", with the length of 3.',
    },
    PYTHON: {
      input: 's = "abcabcbb"',
      output: "3",
      explanation: 'The answer is "abc", with the length of 3.',
    },
    JAVA: {
      input: 's = "abcabcbb"',
      output: "3",
      explanation: 'The answer is "abc", with the length of 3.',
    },
    CPP: {
      input: 's = "abcabcbb"',
      output: "3",
      explanation: 'The answer is "abc", with the length of 3.',
    },
    RUST: {
      input: 's = "abcabcbb"',
      output: "3",
      explanation: 'The answer is "abc", with the length of 3.',
    },
    TYPESCRIPT: {
      input: 's = "abcabcbb"',
      output: "3",
      explanation: 'The answer is "abc", with the length of 3.',
    },
  },
  codeSnippets: {
    JAVASCRIPT: `/**
 * @param {string} s
 * @return {number}
 */
function lengthOfLongestSubstring(s) {
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
  const result = lengthOfLongestSubstring(line);
  console.log(result);
  rl.close();
});`,
    PYTHON: `from typing import List

class Solution:
    def lengthOfLongestSubstring(self, s: str) -> int:
        # Write your code here
        pass

# Input parsing
if __name__ == "__main__":
    import sys
    s = sys.stdin.readline().rstrip('\\n')
    sol = Solution()
    result = sol.lengthOfLongestSubstring(s)
    print(result)`,
    JAVA: `import java.util.*;

public class Main {
    public static int lengthOfLongestSubstring(String s) {
        // Write your code here
        return 0;
    }

    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        String s = sc.nextLine();

        int result = lengthOfLongestSubstring(s);
        System.out.println(result);
    }
}`,
    CPP: `#include <iostream>
#include <string>
#include <unordered_set>
#include <unordered_map>
#include <algorithm>
using namespace std;

int lengthOfLongestSubstring(string s) {
    // Write your code here
    return 0;
}

int main() {
    string s;
    getline(cin, s);

    int result = lengthOfLongestSubstring(s);
    cout << result << endl;
    return 0;
}`,
    RUST: `use std::io;
use std::collections::HashSet;

fn length_of_longest_substring(s: &str) -> i32 {
    // Write your code here
    0
}

fn main() {
    let mut input = String::new();
    io::stdin().read_line(&mut input).expect("Failed to read line");
    let s = input.trim_end_matches('\\n').trim_end_matches('\\r');

    let result = length_of_longest_substring(s);
    println!("{}", result);
}`,
    TYPESCRIPT: `// @ts-nocheck
function lengthOfLongestSubstring(s: string): number {
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

rl.on('line', (line: string) => {
  const result = lengthOfLongestSubstring(line);
  console.log(result);
  rl.close();
});`,
  },
  referenceSolutions: {
    JAVASCRIPT: `/**
 * @param {string} s
 * @return {number}
 */
function lengthOfLongestSubstring(s) {
  const seen = new Set();
  let left = 0;
  let maxLen = 0;
  for (let right = 0; right < s.length; right++) {
    while (seen.has(s[right])) {
      seen.delete(s[left]);
      left++;
    }
    seen.add(s[right]);
    maxLen = Math.max(maxLen, right - left + 1);
  }
  return maxLen;
}

// Input parsing
const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  terminal: false
});

rl.on('line', (line) => {
  const result = lengthOfLongestSubstring(line);
  console.log(result);
  rl.close();
});`,
    PYTHON: `from typing import List

class Solution:
    def lengthOfLongestSubstring(self, s: str) -> int:
        seen = set()
        left = 0
        max_len = 0
        for right, ch in enumerate(s):
            while ch in seen:
                seen.remove(s[left])
                left += 1
            seen.add(ch)
            max_len = max(max_len, right - left + 1)
        return max_len

# Input parsing
if __name__ == "__main__":
    import sys
    s = sys.stdin.readline().rstrip('\\n')
    sol = Solution()
    result = sol.lengthOfLongestSubstring(s)
    print(result)`,
    JAVA: `import java.util.HashSet;
import java.util.Scanner;

public class Main {
    public static int lengthOfLongestSubstring(String s) {
        HashSet<Character> seen = new HashSet<>();
        int left = 0, maxLen = 0;
        for (int right = 0; right < s.length(); right++) {
            char c = s.charAt(right);
            while (seen.contains(c)) {
                seen.remove(s.charAt(left));
                left++;
            }
            seen.add(c);
            maxLen = Math.max(maxLen, right - left + 1);
        }
        return maxLen;
    }

    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        String s = sc.nextLine();

        int result = lengthOfLongestSubstring(s);
        System.out.println(result);
    }
}`,
    CPP: `#include <iostream>
#include <string>
#include <unordered_set>
#include <unordered_map>
#include <algorithm>
using namespace std;

int lengthOfLongestSubstring(string s) {
    unordered_set<char> seen;
    int left = 0, maxLen = 0;
    for (int right = 0; right < (int)s.size(); right++) {
        char c = s[right];
        while (seen.count(c)) {
            seen.erase(s[left]);
            left++;
        }
        seen.insert(c);
        maxLen = max(maxLen, right - left + 1);
    }
    return maxLen;
}

int main() {
    string s;
    getline(cin, s);

    int result = lengthOfLongestSubstring(s);
    cout << result << endl;
    return 0;
}`,
    RUST: `use std::io;
use std::collections::HashSet;

fn length_of_longest_substring(s: &str) -> i32 {
    let chars: Vec<char> = s.chars().collect();
    let mut seen = HashSet::new();
    let mut left = 0usize;
    let mut max_len = 0i32;
    for right in 0..chars.len() {
        while seen.contains(&chars[right]) {
            seen.remove(&chars[left]);
            left += 1;
        }
        seen.insert(chars[right]);
        let len = (right - left + 1) as i32;
        if len > max_len {
            max_len = len;
        }
    }
    max_len
}

fn main() {
    let mut input = String::new();
    io::stdin().read_line(&mut input).expect("Failed to read line");
    let s = input.trim_end_matches('\\n').trim_end_matches('\\r');

    let result = length_of_longest_substring(s);
    println!("{}", result);
}`,
    TYPESCRIPT: `// @ts-nocheck
function lengthOfLongestSubstring(s: string): number {
  const seen = new Set<string>();
  let left = 0;
  let maxLen = 0;
  for (let right = 0; right < s.length; right++) {
    while (seen.has(s[right])) {
      seen.delete(s[left]);
      left++;
    }
    seen.add(s[right]);
    maxLen = Math.max(maxLen, right - left + 1);
  }
  return maxLen;
}

// Input parsing
const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  terminal: false
});

rl.on('line', (line: string) => {
  const result = lengthOfLongestSubstring(line);
  console.log(result);
  rl.close();
});`,
  },
};