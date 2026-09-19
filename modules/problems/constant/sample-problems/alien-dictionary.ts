// Alien Dictionary — Graph / Topological Sort / String — HARD
export const sampleAlienDictionaryProblem = {
  title: "Alien Dictionary",
  description:
    "There is a new alien language that uses the lowercase English letters. Given a sorted list of words from the alien dictionary, return a string of the unique letters in the new alien language in a valid order, or an empty string if no valid ordering exists. The order of letters is derived by comparing adjacent words in the list.",
  difficulty: "HARD",
  tags: ["Graph", "Topological Sort", "String"],
  constraints:
    "1 <= n <= 100\n1 <= word.length <= 100\nWords contain only lowercase English letters.",
  hints:
    "Compare each pair of adjacent words to derive pairwise character order constraints, then run a topological sort over all distinct characters. If a cycle exists, or a word is a prefix of a later word and longer, no valid ordering exists.",
  editorial:
    "For every adjacent pair of words, find the first position where they differ; the character in the earlier word must come before the character in the later word, giving a directed edge. If a word is a proper prefix of the word that follows it being shorter, the ordering is impossible. Build the character graph, then run Kahn's algorithm: if the number of emitted characters equals the number of unique characters, the concatenation is a valid answer; otherwise a cycle exists and the answer is an empty string.",
  testCases: [
    { input: "5\nwrt\nwrf\ner\nett\nrftt", output: "wertf" },
    { input: "3\nz\nx\nz", output: "" },
    { input: "2\nz\nx", output: "zx" },
  ],
  examples: {
    JAVASCRIPT: {
      input: 'words = ["wrt","wrf","er","ett","rftt"]',
      output: '"wertf"',
      explanation:
        'Comparing adjacent words yields the constraints t -> f, w -> e, r -> t, and e -> r, from which "wertf" is a valid ordering.',
    },
    PYTHON: {
      input: 'words = ["wrt","wrf","er","ett","rftt"]',
      output: '"wertf"',
      explanation:
        'Comparing adjacent words yields the constraints t -> f, w -> e, r -> t, and e -> r, from which "wertf" is a valid ordering.',
    },
    JAVA: {
      input: 'words = ["wrt","wrf","er","ett","rftt"]',
      output: '"wertf"',
      explanation:
        'Comparing adjacent words yields the constraints t -> f, w -> e, r -> t, and e -> r, from which "wertf" is a valid ordering.',
    },
    CPP: {
      input: 'words = ["wrt","wrf","er","ett","rftt"]',
      output: '"wertf"',
      explanation:
        'Comparing adjacent words yields the constraints t -> f, w -> e, r -> t, and e -> r, from which "wertf" is a valid ordering.',
    },
    RUST: {
      input: 'words = ["wrt","wrf","er","ett","rftt"]',
      output: '"wertf"',
      explanation:
        'Comparing adjacent words yields the constraints t -> f, w -> e, r -> t, and e -> r, from which "wertf" is a valid ordering.',
    },
    TYPESCRIPT: {
      input: 'words = ["wrt","wrf","er","ett","rftt"]',
      output: '"wertf"',
      explanation:
        'Comparing adjacent words yields the constraints t -> f, w -> e, r -> t, and e -> r, from which "wertf" is a valid ordering.',
    },
  },
  codeSnippets: {
    JAVASCRIPT: `/**
 * @param {string[]} words
 * @return {string}
 */
function alienOrder(words) {
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
  const n = Number(lines[0].trim());
  const words = lines.slice(1, 1 + n);
  const result = alienOrder(words);
  console.log(result);
});`,
    PYTHON: `from typing import List
from collections import deque

class Solution:
    def alienOrder(self, words: List[str]) -> str:
        # Write your code here
        pass

# Input parsing
if __name__ == "__main__":
    import sys
    lines = sys.stdin.read().splitlines()
    n = int(lines[0].strip())
    words = lines[1:1 + n]
    sol = Solution()
    result = sol.alienOrder(words)
    print(result)`,
    JAVA: `import java.util.*;

public class Main {
    public static String alienOrder(String[] words) {
        // Write your code here
        return "";
    }

    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int n = Integer.parseInt(sc.nextLine().trim());
        String[] words = new String[n];
        for (int i = 0; i < n; i++) {
            words[i] = sc.nextLine();
        }

        String result = alienOrder(words);
        System.out.println(result);
    }
}`,
    CPP: `#include <iostream>
#include <string>
#include <vector>
#include <unordered_map>
#include <unordered_set>
#include <queue>
#include <algorithm>
using namespace std;

string alienOrder(vector<string>& words) {
    // Write your code here
    return "";
}

int main() {
    int n;
    cin >> n;
    vector<string> words(n);
    for (int i = 0; i < n; i++) {
        cin >> words[i];
    }

    string result = alienOrder(words);
    cout << result << endl;
    return 0;
}`,
    RUST: `use std::io;
use std::collections::HashMap;
use std::collections::HashSet;
use std::collections::VecDeque;

fn alien_order(words: Vec<String>) -> String {
    // Write your code here
    String::new()
}

fn main() {
    let mut line = String::new();
    io::stdin().read_line(&mut line).expect("Failed to read line");
    let n: usize = line.trim().parse().unwrap();

    let mut words: Vec<String> = Vec::new();
    for _ in 0..n {
        let mut word = String::new();
        io::stdin().read_line(&mut word).expect("Failed to read line");
        words.push(word.trim().to_string());
    }

    let result = alien_order(words);
    println!("{}", result);
}`,
    TYPESCRIPT: `// @ts-nocheck
function alienOrder(words: string[]): string {
  // Write your code here
  return "";
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
  const n = Number(lines[0].trim());
  const words = lines.slice(1, 1 + n);
  const result = alienOrder(words);
  console.log(result);
});`,
  },
  referenceSolutions: {
    JAVASCRIPT: `/**
 * @param {string[]} words
 * @return {string}
 */
function alienOrder(words) {
  const graph = {};
  const indegree = {};
  for (const word of words) {
    for (const c of word) {
      if (!(c in graph)) {
        graph[c] = new Set();
        indegree[c] = 0;
      }
    }
  }

  for (let i = 0; i < words.length - 1; i++) {
    const w1 = words[i];
    const w2 = words[i + 1];
    if (w1.length > w2.length && w1.startsWith(w2)) {
      return "";
    }
    const len = Math.min(w1.length, w2.length);
    for (let k = 0; k < len; k++) {
      if (w1[k] !== w2[k]) {
        if (!graph[w1[k]].has(w2[k])) {
          graph[w1[k]].add(w2[k]);
          indegree[w2[k]]++;
        }
        break;
      }
    }
  }

  const queue = [];
  for (const c in indegree) {
    if (indegree[c] === 0) queue.push(c);
  }

  let result = "";
  while (queue.length > 0) {
    const c = queue.shift();
    result += c;
    for (const nxt of graph[c]) {
      indegree[nxt]--;
      if (indegree[nxt] === 0) queue.push(nxt);
    }
  }
  return result.length === Object.keys(graph).length ? result : "";
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
  const n = Number(lines[0].trim());
  const words = lines.slice(1, 1 + n);
  const result = alienOrder(words);
  console.log(result);
});`,
    PYTHON: `from typing import List
from collections import deque

class Solution:
    def alienOrder(self, words: List[str]) -> str:
        graph = {c: set() for word in words for c in word}
        indegree = {c: 0 for c in graph}

        for i in range(len(words) - 1):
            w1, w2 = words[i], words[i + 1]
            if len(w1) > len(w2) and w1[:len(w2)] == w2:
                return ""
            for c1, c2 in zip(w1, w2):
                if c1 != c2:
                    if c2 not in graph[c1]:
                        graph[c1].add(c2)
                        indegree[c2] += 1
                    break

        queue = deque([c for c in graph if indegree[c] == 0])
        result = []
        while queue:
            c = queue.popleft()
            result.append(c)
            for nxt in graph[c]:
                indegree[nxt] -= 1
                if indegree[nxt] == 0:
                    queue.append(nxt)

        if len(result) != len(graph):
            return ""
        return "".join(result)

# Input parsing
if __name__ == "__main__":
    import sys
    lines = sys.stdin.read().splitlines()
    n = int(lines[0].strip())
    words = lines[1:1 + n]
    sol = Solution()
    result = sol.alienOrder(words)
    print(result)`,
    JAVA: `import java.util.*;

public class Main {
    public static String alienOrder(String[] words) {
        HashMap<Character, HashSet<Character>> graph = new HashMap<>();
        HashMap<Character, Integer> indegree = new HashMap<>();
        for (String word : words) {
            for (char c : word.toCharArray()) {
                graph.putIfAbsent(c, new HashSet<>());
                indegree.putIfAbsent(c, 0);
            }
        }

        for (int i = 0; i < words.length - 1; i++) {
            String w1 = words[i];
            String w2 = words[i + 1];
            if (w1.length() > w2.length() && w1.startsWith(w2)) {
                return "";
            }
            int len = Math.min(w1.length(), w2.length());
            for (int k = 0; k < len; k++) {
                if (w1.charAt(k) != w2.charAt(k)) {
                    HashSet<Character> nexts = graph.get(w1.charAt(k));
                    if (!nexts.contains(w2.charAt(k))) {
                        nexts.add(w2.charAt(k));
                        indegree.put(w2.charAt(k), indegree.get(w2.charAt(k)) + 1);
                    }
                    break;
                }
            }
        }

        Queue<Character> queue = new ArrayDeque<>();
        for (char c : indegree.keySet()) {
            if (indegree.get(c) == 0) queue.offer(c);
        }

        StringBuilder sb = new StringBuilder();
        while (!queue.isEmpty()) {
            char c = queue.poll();
            sb.append(c);
            for (char nxt : graph.get(c)) {
                indegree.put(nxt, indegree.get(nxt) - 1);
                if (indegree.get(nxt) == 0) queue.offer(nxt);
            }
        }

        if (sb.length() != graph.size()) return "";
        return sb.toString();
    }

    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int n = Integer.parseInt(sc.nextLine().trim());
        String[] words = new String[n];
        for (int i = 0; i < n; i++) {
            words[i] = sc.nextLine();
        }

        String result = alienOrder(words);
        System.out.println(result);
    }
}`,
    CPP: `#include <iostream>
#include <string>
#include <vector>
#include <unordered_map>
#include <unordered_set>
#include <queue>
#include <algorithm>
using namespace std;

string alienOrder(vector<string>& words) {
    unordered_map<char, unordered_set<char>> graph;
    unordered_map<char, int> indegree;
    for (const string& w : words) {
        for (char c : w) {
            if (graph.find(c) == graph.end()) graph[c] = unordered_set<char>();
            if (indegree.find(c) == indegree.end()) indegree[c] = 0;
        }
    }

    for (int i = 0; i < (int)words.size() - 1; i++) {
        const string& w1 = words[i];
        const string& w2 = words[i + 1];
        if (w1.size() > w2.size() && w1.compare(0, w2.size(), w2) == 0) {
            return "";
        }
        int len = min((int)w1.size(), (int)w2.size());
        for (int k = 0; k < len; k++) {
            if (w1[k] != w2[k]) {
                if (graph[w1[k]].find(w2[k]) == graph[w1[k]].end()) {
                    graph[w1[k]].insert(w2[k]);
                    indegree[w2[k]]++;
                }
                break;
            }
        }
    }

    queue<char> q;
    for (const auto& p : indegree) {
        if (p.second == 0) q.push(p.first);
    }

    string result;
    while (!q.empty()) {
        char c = q.front();
        q.pop();
        result += c;
        for (char nxt : graph[c]) {
            indegree[nxt]--;
            if (indegree[nxt] == 0) q.push(nxt);
        }
    }

    if (result.size() != graph.size()) return "";
    return result;
}

int main() {
    int n;
    cin >> n;
    vector<string> words(n);
    for (int i = 0; i < n; i++) {
        cin >> words[i];
    }

    string result = alienOrder(words);
    cout << result << endl;
    return 0;
}`,
    RUST: `use std::io;
use std::collections::{HashMap, HashSet, VecDeque};

fn alien_order(words: Vec<String>) -> String {
    let mut graph: HashMap<char, HashSet<char>> = HashMap::new();
    let mut indegree: HashMap<char, usize> = HashMap::new();
    for word in &words {
        for c in word.chars() {
            graph.entry(c).or_insert_with(HashSet::new);
            indegree.entry(c).or_insert(0);
        }
    }

    for i in 0..words.len() - 1 {
        let w1: Vec<char> = words[i].chars().collect();
        let w2: Vec<char> = words[i + 1].chars().collect();
        if w1.len() > w2.len() && w1[..w2.len()] == w2[..] {
            return String::new();
        }
        let len = w1.len().min(w2.len());
        for k in 0..len {
            if w1[k] != w2[k] {
                if !graph.get(&w1[k]).unwrap().contains(&w2[k]) {
                    graph.get_mut(&w1[k]).unwrap().insert(w2[k]);
                    *indegree.get_mut(&w2[k]).unwrap() += 1;
                }
                break;
            }
        }
    }

    let mut queue: VecDeque<char> = VecDeque::new();
    for (&c, &d) in indegree.iter() {
        if d == 0 {
            queue.push_back(c);
        }
    }

    let mut result = String::new();
    while let Some(c) = queue.pop_front() {
        result.push(c);
        let nexts: Vec<char> = graph.get(&c).unwrap().iter().cloned().collect();
        for nxt in nexts {
            let d = indegree.get_mut(&nxt).unwrap();
            *d -= 1;
            if *d == 0 {
                queue.push_back(nxt);
            }
        }
    }

    if result.len() != graph.len() {
        return String::new();
    }
    result
}

fn main() {
    let mut line = String::new();
    io::stdin().read_line(&mut line).expect("Failed to read line");
    let n: usize = line.trim().parse().unwrap();

    let mut words: Vec<String> = Vec::new();
    for _ in 0..n {
        let mut word = String::new();
        io::stdin().read_line(&mut word).expect("Failed to read line");
        words.push(word.trim().to_string());
    }

    let result = alien_order(words);
    println!("{}", result);
}`,
    TYPESCRIPT: `// @ts-nocheck
function alienOrder(words: string[]): string {
  const graph: Record<string, Set<string>> = {};
  const indegree: Record<string, number> = {};
  for (const word of words) {
    for (const c of word) {
      if (!(c in graph)) {
        graph[c] = new Set();
        indegree[c] = 0;
      }
    }
  }

  for (let i = 0; i < words.length - 1; i++) {
    const w1 = words[i];
    const w2 = words[i + 1];
    if (w1.length > w2.length && w1.startsWith(w2)) {
      return "";
    }
    const len = Math.min(w1.length, w2.length);
    for (let k = 0; k < len; k++) {
      if (w1[k] !== w2[k]) {
        if (!graph[w1[k]].has(w2[k])) {
          graph[w1[k]].add(w2[k]);
          indegree[w2[k]]++;
        }
        break;
      }
    }
  }

  const queue: string[] = [];
  for (const c in indegree) {
    if (indegree[c] === 0) queue.push(c);
  }

  let result = "";
  while (queue.length > 0) {
    const c = queue.shift()!;
    result += c;
    for (const nxt of Array.from(graph[c])) {
      indegree[nxt]--;
      if (indegree[nxt] === 0) queue.push(nxt);
    }
  }
  return result.length === Object.keys(graph).length ? result : "";
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
  const n = Number(lines[0].trim());
  const words = lines.slice(1, 1 + n);
  const result = alienOrder(words);
  console.log(result);
});`,
  },
};