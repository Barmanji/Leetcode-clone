// Course Schedule — Graph / Topological Sort — MEDIUM
export const sampleCourseScheduleProblem = {
  title: "Course Schedule",
  description:
    "There are a total of numCourses courses you have to take, labeled from 0 to numCourses - 1. You are given an array prerequisites where prerequisites[i] = [a, b] indicates that you must take course b first if you want to take course a. Return true if you can finish all courses, otherwise return false.",
  difficulty: "MEDIUM",
  tags: ["Graph", "Topological Sort", "Depth-First Search", "Breadth-First Search"],
  constraints:
    "1 <= numCourses <= 2000\n0 <= numEdges <= 5000",
  hints:
    "Model courses as nodes of a directed graph where an edge b -> a means course b is a prerequisite of course a. A valid schedule exists if and only if the graph has no cycle.",
  editorial:
    "Build a directed graph where an edge b -> a means course b must be taken before course a, and compute the indegree of every course. Run Kahn's algorithm by repeatedly removing courses whose indegree has dropped to zero. If the number of processed courses equals numCourses, a topological order exists and all courses can be finished; otherwise a cycle prevents completing all courses.",
  testCases: [
    { input: "2 1\n1 0", output: "true" },
    { input: "2 2\n1 0\n0 1", output: "false" },
    { input: "4 3\n1 0\n2 1\n3 2", output: "true" },
    { input: "3 3\n0 1\n1 2\n2 0", output: "false" },
  ],
  examples: {
    JAVASCRIPT: {
      input: "numCourses = 2, prerequisites = [[1,0]]",
      output: "true",
      explanation:
        "To take course 1 you must first finish course 0, so it is possible to finish both courses.",
    },
    PYTHON: {
      input: "numCourses = 2, prerequisites = [[1,0]]",
      output: "true",
      explanation:
        "To take course 1 you must first finish course 0, so it is possible to finish both courses.",
    },
    JAVA: {
      input: "numCourses = 2, prerequisites = [[1,0]]",
      output: "true",
      explanation:
        "To take course 1 you must first finish course 0, so it is possible to finish both courses.",
    },
    CPP: {
      input: "numCourses = 2, prerequisites = [[1,0]]",
      output: "true",
      explanation:
        "To take course 1 you must first finish course 0, so it is possible to finish both courses.",
    },
    RUST: {
      input: "numCourses = 2, prerequisites = [[1,0]]",
      output: "true",
      explanation:
        "To take course 1 you must first finish course 0, so it is possible to finish both courses.",
    },
    TYPESCRIPT: {
      input: "numCourses = 2, prerequisites = [[1,0]]",
      output: "true",
      explanation:
        "To take course 1 you must first finish course 0, so it is possible to finish both courses.",
    },
  },
  codeSnippets: {
    JAVASCRIPT: `/**
 * @param {number} numCourses
 * @param {number[][]} prerequisites
 * @return {boolean}
 */
function canFinish(numCourses, prerequisites) {
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
  const [numCourses, numEdges] = lines[0].trim().split(/\\s+/).map(Number);
  const prerequisites = [];
  for (let i = 1; i <= numEdges && i < lines.length; i++) {
    const [a, b] = lines[i].trim().split(/\\s+/).map(Number);
    prerequisites.push([a, b]);
  }
  const result = canFinish(numCourses, prerequisites);
  console.log(result ? "true" : "false");
});`,
    PYTHON: `from typing import List
from collections import deque

class Solution:
    def canFinish(self, numCourses: int, prerequisites: List[List[int]]) -> bool:
        # Write your code here
        pass

# Input parsing
if __name__ == "__main__":
    import sys
    lines = sys.stdin.read().splitlines()
    numCourses, numEdges = map(int, lines[0].split())
    prerequisites = []
    for i in range(1, 1 + numEdges):
        a, b = map(int, lines[i].split())
        prerequisites.append([a, b])
    sol = Solution()
    result = sol.canFinish(numCourses, prerequisites)
    print(str(result).lower())`,
    JAVA: `import java.util.*;

public class Main {
    public static boolean canFinish(int numCourses, int[][] prerequisites) {
        // Write your code here
        return false;
    }

    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        String[] first = sc.nextLine().trim().split("\\\\s+");
        int numCourses = Integer.parseInt(first[0]);
        int numEdges = Integer.parseInt(first[1]);
        int[][] prerequisites = new int[numEdges][2];
        for (int i = 0; i < numEdges; i++) {
            String[] parts = sc.nextLine().trim().split("\\\\s+");
            prerequisites[i][0] = Integer.parseInt(parts[0]);
            prerequisites[i][1] = Integer.parseInt(parts[1]);
        }

        boolean result = canFinish(numCourses, prerequisites);
        System.out.println(result ? "true" : "false");
    }
}`,
    CPP: `#include <iostream>
#include <vector>
#include <queue>
using namespace std;

bool canFinish(int numCourses, vector<vector<int>>& prerequisites) {
    // Write your code here
    return false;
}

int main() {
    int numCourses, numEdges;
    cin >> numCourses >> numEdges;
    vector<vector<int>> prerequisites(numEdges, vector<int>(2));
    for (int i = 0; i < numEdges; i++) {
        cin >> prerequisites[i][0] >> prerequisites[i][1];
    }

    bool result = canFinish(numCourses, prerequisites);
    cout << (result ? "true" : "false") << endl;
    return 0;
}`,
    RUST: `use std::io;
use std::collections::VecDeque;

fn can_finish(num_courses: usize, prerequisites: Vec<Vec<usize>>) -> bool {
    // Write your code here
    false
}

fn main() {
    let mut line = String::new();
    io::stdin().read_line(&mut line).expect("Failed to read line");
    let first: Vec<usize> = line
        .trim()
        .split_whitespace()
        .map(|s| s.parse().unwrap())
        .collect();
    let num_courses = first[0];
    let num_edges = first[1];

    let mut prerequisites: Vec<Vec<usize>> = Vec::new();
    for _ in 0..num_edges {
        let mut edge = String::new();
        io::stdin().read_line(&mut edge).expect("Failed to read line");
        let e: Vec<usize> = edge
            .trim()
            .split_whitespace()
            .map(|s| s.parse().unwrap())
            .collect();
        prerequisites.push(e);
    }

    let result = can_finish(num_courses, prerequisites);
    println!("{}", result);
}`,
    TYPESCRIPT: `// @ts-nocheck
function canFinish(numCourses: number, prerequisites: number[][]): boolean {
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

const lines: string[] = [];
rl.on('line', (line: string) => lines.push(line));
rl.on('close', () => {
  const [numCourses, numEdges] = lines[0].trim().split(/\\s+/).map(Number);
  const prerequisites: number[][] = [];
  for (let i = 1; i <= numEdges && i < lines.length; i++) {
    const [a, b] = lines[i].trim().split(/\\s+/).map(Number);
    prerequisites.push([a, b]);
  }
  const result = canFinish(numCourses, prerequisites);
  console.log(result ? "true" : "false");
});`,
  },
  referenceSolutions: {
    JAVASCRIPT: `/**
 * @param {number} numCourses
 * @param {number[][]} prerequisites
 * @return {boolean}
 */
function canFinish(numCourses, prerequisites) {
  const graph = Array.from({ length: numCourses }, () => []);
  const indegree = new Array(numCourses).fill(0);
  for (const [a, b] of prerequisites) {
    graph[b].push(a);
    indegree[a]++;
  }

  const queue = [];
  for (let i = 0; i < numCourses; i++) {
    if (indegree[i] === 0) queue.push(i);
  }

  let processed = 0;
  while (queue.length > 0) {
    const course = queue.shift();
    processed++;
    for (const next of graph[course]) {
      indegree[next]--;
      if (indegree[next] === 0) queue.push(next);
    }
  }
  return processed === numCourses;
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
  const [numCourses, numEdges] = lines[0].trim().split(/\\s+/).map(Number);
  const prerequisites = [];
  for (let i = 1; i <= numEdges && i < lines.length; i++) {
    const [a, b] = lines[i].trim().split(/\\s+/).map(Number);
    prerequisites.push([a, b]);
  }
  const result = canFinish(numCourses, prerequisites);
  console.log(result ? "true" : "false");
});`,
    PYTHON: `from typing import List
from collections import deque

class Solution:
    def canFinish(self, numCourses: int, prerequisites: List[List[int]]) -> bool:
        graph = [[] for _ in range(numCourses)]
        indegree = [0] * numCourses
        for a, b in prerequisites:
            graph[b].append(a)
            indegree[a] += 1

        queue = deque([i for i in range(numCourses) if indegree[i] == 0])
        processed = 0
        while queue:
            course = queue.popleft()
            processed += 1
            for nxt in graph[course]:
                indegree[nxt] -= 1
                if indegree[nxt] == 0:
                    queue.append(nxt)
        return processed == numCourses

# Input parsing
if __name__ == "__main__":
    import sys
    lines = sys.stdin.read().splitlines()
    numCourses, numEdges = map(int, lines[0].split())
    prerequisites = []
    for i in range(1, 1 + numEdges):
        a, b = map(int, lines[i].split())
        prerequisites.append([a, b])
    sol = Solution()
    result = sol.canFinish(numCourses, prerequisites)
    print(str(result).lower())`,
    JAVA: `import java.util.*;

public class Main {
    public static boolean canFinish(int numCourses, int[][] prerequisites) {
        List<List<Integer>> graph = new ArrayList<>();
        for (int i = 0; i < numCourses; i++) graph.add(new ArrayList<>());
        int[] indegree = new int[numCourses];
        for (int[] p : prerequisites) {
            int a = p[0];
            int b = p[1];
            graph.get(b).add(a);
            indegree[a]++;
        }

        Queue<Integer> queue = new ArrayDeque<>();
        for (int i = 0; i < numCourses; i++) {
            if (indegree[i] == 0) queue.offer(i);
        }

        int processed = 0;
        while (!queue.isEmpty()) {
            int course = queue.poll();
            processed++;
            for (int next : graph.get(course)) {
                indegree[next]--;
                if (indegree[next] == 0) queue.offer(next);
            }
        }
        return processed == numCourses;
    }

    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        String[] first = sc.nextLine().trim().split("\\\\s+");
        int numCourses = Integer.parseInt(first[0]);
        int numEdges = Integer.parseInt(first[1]);
        int[][] prerequisites = new int[numEdges][2];
        for (int i = 0; i < numEdges; i++) {
            String[] parts = sc.nextLine().trim().split("\\\\s+");
            prerequisites[i][0] = Integer.parseInt(parts[0]);
            prerequisites[i][1] = Integer.parseInt(parts[1]);
        }

        boolean result = canFinish(numCourses, prerequisites);
        System.out.println(result ? "true" : "false");
    }
}`,
    CPP: `#include <iostream>
#include <vector>
#include <queue>
using namespace std;

bool canFinish(int numCourses, vector<vector<int>>& prerequisites) {
    vector<vector<int>> graph(numCourses);
    vector<int> indegree(numCourses, 0);
    for (int i = 0; i < (int)prerequisites.size(); i++) {
        int a = prerequisites[i][0];
        int b = prerequisites[i][1];
        graph[b].push_back(a);
        indegree[a]++;
    }

    queue<int> q;
    for (int i = 0; i < numCourses; i++) {
        if (indegree[i] == 0) q.push(i);
    }

    int processed = 0;
    while (!q.empty()) {
        int course = q.front();
        q.pop();
        processed++;
        for (int next : graph[course]) {
            indegree[next]--;
            if (indegree[next] == 0) q.push(next);
        }
    }
    return processed == numCourses;
}

int main() {
    int numCourses, numEdges;
    cin >> numCourses >> numEdges;
    vector<vector<int>> prerequisites(numEdges, vector<int>(2));
    for (int i = 0; i < numEdges; i++) {
        cin >> prerequisites[i][0] >> prerequisites[i][1];
    }

    bool result = canFinish(numCourses, prerequisites);
    cout << (result ? "true" : "false") << endl;
    return 0;
}`,
    RUST: `use std::io;
use std::collections::VecDeque;

fn can_finish(num_courses: usize, prerequisites: Vec<Vec<usize>>) -> bool {
    let mut graph: Vec<Vec<usize>> = vec![Vec::new(); num_courses];
    let mut indegree = vec![0usize; num_courses];
    for edge in prerequisites {
        let a = edge[0];
        let b = edge[1];
        graph[b].push(a);
        indegree[a] += 1;
    }

    let mut queue: VecDeque<usize> = VecDeque::new();
    for i in 0..num_courses {
        if indegree[i] == 0 {
            queue.push_back(i);
        }
    }

    let mut processed = 0;
    while let Some(course) = queue.pop_front() {
        processed += 1;
        for &next in &graph[course] {
            indegree[next] -= 1;
            if indegree[next] == 0 {
                queue.push_back(next);
            }
        }
    }
    processed == num_courses
}

fn main() {
    let mut line = String::new();
    io::stdin().read_line(&mut line).expect("Failed to read line");
    let first: Vec<usize> = line
        .trim()
        .split_whitespace()
        .map(|s| s.parse().unwrap())
        .collect();
    let num_courses = first[0];
    let num_edges = first[1];

    let mut prerequisites: Vec<Vec<usize>> = Vec::new();
    for _ in 0..num_edges {
        let mut edge = String::new();
        io::stdin().read_line(&mut edge).expect("Failed to read line");
        let e: Vec<usize> = edge
            .trim()
            .split_whitespace()
            .map(|s| s.parse().unwrap())
            .collect();
        prerequisites.push(e);
    }

    let result = can_finish(num_courses, prerequisites);
    println!("{}", result);
}`,
    TYPESCRIPT: `// @ts-nocheck
function canFinish(numCourses: number, prerequisites: number[][]): boolean {
  const graph: number[][] = Array.from({ length: numCourses }, () => []);
  const indegree: number[] = new Array(numCourses).fill(0);
  for (const [a, b] of prerequisites) {
    graph[b].push(a);
    indegree[a]++;
  }

  const queue: number[] = [];
  for (let i = 0; i < numCourses; i++) {
    if (indegree[i] === 0) queue.push(i);
  }

  let processed = 0;
  while (queue.length > 0) {
    const course = queue.shift()!;
    processed++;
    for (const next of graph[course]) {
      indegree[next]--;
      if (indegree[next] === 0) queue.push(next);
    }
  }
  return processed === numCourses;
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
  const [numCourses, numEdges] = lines[0].trim().split(/\\s+/).map(Number);
  const prerequisites: number[][] = [];
  for (let i = 1; i <= numEdges && i < lines.length; i++) {
    const [a, b] = lines[i].trim().split(/\\s+/).map(Number);
    prerequisites.push([a, b]);
  }
  const result = canFinish(numCourses, prerequisites);
  console.log(result ? "true" : "false");
});`,
  },
};