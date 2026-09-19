// Number of Islands — Graph / Grid / DFS / BFS — MEDIUM
export const sampleNumberOfIslandsProblem = {
  title: "Number of Islands",
  description:
    "Given an m x n 2D binary grid which represents a map of '1's (land) and '0's (water), return the number of islands. An island is surrounded by water and is formed by connecting adjacent lands horizontally or vertically. You may assume all four edges of the grid are all surrounded by water.",
  difficulty: "MEDIUM",
  tags: ["Graph", "Grid", "Depth-First Search", "Breadth-First Search"],
  constraints:
    "1 <= m, n <= 300\ngrid[i][j] is '0' or '1'.",
  hints:
    "Whenever you encounter an unvisited land cell ('1'), run a depth-first or breadth-first search from it to mark its entire island as visited, and increment the island count.",
  editorial:
    "Scan every cell of the grid. Each time an unvisited '1' is found, increment the island counter and flood-fill the whole connected component by exploring its four directional neighbors. Because every island is visited exactly once, the count at the end equals the number of islands. This runs in O(m * n) time and O(m * n) space in the worst case.",
  testCases: [
    { input: "4 5\n11000\n11000\n00100\n00011", output: "3" },
    { input: "1 1\n0", output: "0" },
    { input: "3 3\n111\n010\n111", output: "1" },
  ],
  examples: {
    JAVASCRIPT: {
      input:
        'grid = [["1","1","0","0","0"],["1","1","0","0","0"],["0","0","1","0","0"],["0","0","0","1","1"]]',
      output: "3",
      explanation:
        "The 4x5 grid has three islands: the '1' block in the top-left, the single '1' near the middle, and the two adjacent '1's in the bottom-right.",
    },
    PYTHON: {
      input:
        'grid = [["1","1","0","0","0"],["1","1","0","0","0"],["0","0","1","0","0"],["0","0","0","1","1"]]',
      output: "3",
      explanation:
        "The 4x5 grid has three islands: the '1' block in the top-left, the single '1' near the middle, and the two adjacent '1's in the bottom-right.",
    },
    JAVA: {
      input:
        'grid = [["1","1","0","0","0"],["1","1","0","0","0"],["0","0","1","0","0"],["0","0","0","1","1"]]',
      output: "3",
      explanation:
        "The 4x5 grid has three islands: the '1' block in the top-left, the single '1' near the middle, and the two adjacent '1's in the bottom-right.",
    },
    CPP: {
      input:
        'grid = [["1","1","0","0","0"],["1","1","0","0","0"],["0","0","1","0","0"],["0","0","0","1","1"]]',
      output: "3",
      explanation:
        "The 4x5 grid has three islands: the '1' block in the top-left, the single '1' near the middle, and the two adjacent '1's in the bottom-right.",
    },
    RUST: {
      input:
        'grid = [["1","1","0","0","0"],["1","1","0","0","0"],["0","0","1","0","0"],["0","0","0","1","1"]]',
      output: "3",
      explanation:
        "The 4x5 grid has three islands: the '1' block in the top-left, the single '1' near the middle, and the two adjacent '1's in the bottom-right.",
    },
    TYPESCRIPT: {
      input:
        'grid = [["1","1","0","0","0"],["1","1","0","0","0"],["0","0","1","0","0"],["0","0","0","1","1"]]',
      output: "3",
      explanation:
        "The 4x5 grid has three islands: the '1' block in the top-left, the single '1' near the middle, and the two adjacent '1's in the bottom-right.",
    },
  },
  codeSnippets: {
    JAVASCRIPT: `/**
 * @param {string[]} grid
 * @return {number}
 */
function numIslands(grid) {
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
  const [m, n] = lines[0].trim().split(/\\s+/).map(Number);
  const grid = lines.slice(1, 1 + m);
  const result = numIslands(grid);
  console.log(result);
});`,
    PYTHON: `from typing import List

class Solution:
    def numIslands(self, grid: List[List[str]]) -> int:
        # Write your code here
        pass

# Input parsing
if __name__ == "__main__":
    import sys
    lines = sys.stdin.read().splitlines()
    m, n = map(int, lines[0].split())
    grid = lines[1:1 + m]
    sol = Solution()
    result = sol.numIslands(grid)
    print(result)`,
    JAVA: `import java.util.*;

public class Main {
    public static int numIslands(char[][] grid) {
        // Write your code here
        return 0;
    }

    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        String[] dims = sc.nextLine().trim().split("\\\\s+");
        int m = Integer.parseInt(dims[0]);
        int n = Integer.parseInt(dims[1]);
        char[][] grid = new char[m][n];
        for (int i = 0; i < m; i++) {
            grid[i] = sc.nextLine().toCharArray();
        }

        int result = numIslands(grid);
        System.out.println(result);
    }
}`,
    CPP: `#include <iostream>
#include <vector>
#include <string>
#include <queue>
using namespace std;

int numIslands(vector<string>& grid) {
    // Write your code here
    return 0;
}

int main() {
    int m, n;
    cin >> m >> n;
    vector<string> grid(m);
    for (int i = 0; i < m; i++) {
        cin >> grid[i];
    }

    int result = numIslands(grid);
    cout << result << endl;
    return 0;
}`,
    RUST: `use std::io;

fn num_islands(grid: Vec<Vec<char>>) -> i32 {
    // Write your code here
    0
}

fn main() {
    let mut line = String::new();
    io::stdin().read_line(&mut line).expect("Failed to read line");
    let dims: Vec<usize> = line
        .trim()
        .split_whitespace()
        .map(|s| s.parse().unwrap())
        .collect();
    let m = dims[0];
    let n = dims[1];

    let mut grid: Vec<Vec<char>> = Vec::new();
    for _ in 0..m {
        let mut row = String::new();
        io::stdin().read_line(&mut row).expect("Failed to read line");
        grid.push(row.trim().chars().collect());
    }

    let result = num_islands(grid);
    println!("{}", result);
}`,
    TYPESCRIPT: `// @ts-nocheck
function numIslands(grid: string[]): number {
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
  const [m, n] = lines[0].trim().split(/\\s+/).map(Number);
  const grid = lines.slice(1, 1 + m);
  const result = numIslands(grid);
  console.log(result);
});`,
  },
  referenceSolutions: {
    JAVASCRIPT: `/**
 * @param {string[]} grid
 * @return {number}
 */
function numIslands(grid) {
  const m = grid.length;
  const n = m > 0 ? grid[0].length : 0;
  const visited = Array.from({ length: m }, () => new Array(n).fill(false));
  let count = 0;

  for (let r = 0; r < m; r++) {
    for (let c = 0; c < n; c++) {
      if (grid[r][c] === '1' && !visited[r][c]) {
        count++;
        const stack = [[r, c]];
        visited[r][c] = true;
        while (stack.length > 0) {
          const [cr, cc] = stack.pop();
          const neighbors = [
            [cr + 1, cc], [cr - 1, cc], [cr, cc + 1], [cr, cc - 1]
          ];
          for (const [nr, nc] of neighbors) {
            if (
              nr >= 0 && nr < m && nc >= 0 && nc < n &&
              grid[nr][nc] === '1' && !visited[nr][nc]
            ) {
              visited[nr][nc] = true;
              stack.push([nr, nc]);
            }
          }
        }
      }
    }
  }
  return count;
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
  const [m, n] = lines[0].trim().split(/\\s+/).map(Number);
  const grid = lines.slice(1, 1 + m);
  const result = numIslands(grid);
  console.log(result);
});`,
    PYTHON: `from typing import List

class Solution:
    def numIslands(self, grid: List[List[str]]) -> int:
        m = len(grid)
        n = len(grid[0]) if m > 0 else 0
        visited = [[False] * n for _ in range(m)]
        count = 0

        for r in range(m):
            for c in range(n):
                if grid[r][c] == '1' and not visited[r][c]:
                    count += 1
                    stack = [(r, c)]
                    visited[r][c] = True
                    while stack:
                        cr, cc = stack.pop()
                        for nr, nc in ((cr + 1, cc), (cr - 1, cc), (cr, cc + 1), (cr, cc - 1)):
                            if (
                                0 <= nr < m and 0 <= nc < n
                                and grid[nr][nc] == '1'
                                and not visited[nr][nc]
                            ):
                                visited[nr][nc] = True
                                stack.append((nr, nc))
        return count

# Input parsing
if __name__ == "__main__":
    import sys
    lines = sys.stdin.read().splitlines()
    m, n = map(int, lines[0].split())
    grid = lines[1:1 + m]
    sol = Solution()
    result = sol.numIslands(grid)
    print(result)`,
    JAVA: `import java.util.Scanner;
import java.util.ArrayDeque;

public class Main {
    public static int numIslands(char[][] grid) {
        int m = grid.length;
        int n = m > 0 ? grid[0].length : 0;
        int count = 0;
        int[] dr = { 1, -1, 0, 0 };
        int[] dc = { 0, 0, 1, -1 };

        for (int r = 0; r < m; r++) {
            for (int c = 0; c < n; c++) {
                if (grid[r][c] == '1') {
                    count++;
                    ArrayDeque<int[]> stack = new ArrayDeque<>();
                    stack.push(new int[] { r, c });
                    grid[r][c] = '0';
                    while (!stack.isEmpty()) {
                        int[] cell = stack.pop();
                        for (int k = 0; k < 4; k++) {
                            int nr = cell[0] + dr[k];
                            int nc = cell[1] + dc[k];
                            if (nr >= 0 && nr < m && nc >= 0 && nc < n && grid[nr][nc] == '1') {
                                grid[nr][nc] = '0';
                                stack.push(new int[] { nr, nc });
                            }
                        }
                    }
                }
            }
        }
        return count;
    }

    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        String[] dims = sc.nextLine().trim().split("\\\\s+");
        int m = Integer.parseInt(dims[0]);
        int n = Integer.parseInt(dims[1]);
        char[][] grid = new char[m][n];
        for (int i = 0; i < m; i++) {
            grid[i] = sc.nextLine().toCharArray();
        }

        int result = numIslands(grid);
        System.out.println(result);
    }
}`,
    CPP: `#include <iostream>
#include <vector>
#include <string>
#include <queue>
using namespace std;

int numIslands(vector<string>& grid) {
    int m = (int)grid.size();
    int n = m > 0 ? (int)grid[0].size() : 0;
    int count = 0;
    int dr[4] = { 1, -1, 0, 0 };
    int dc[4] = { 0, 0, 1, -1 };

    for (int r = 0; r < m; r++) {
        for (int c = 0; c < n; c++) {
            if (grid[r][c] == '1') {
                count++;
                vector<int> stack;
                stack.push_back(r * n + c);
                grid[r][c] = '0';
                while (!stack.empty()) {
                    int idx = stack.back();
                    stack.pop_back();
                    int cr = idx / n;
                    int cc = idx % n;
                    for (int k = 0; k < 4; k++) {
                        int nr = cr + dr[k];
                        int nc = cc + dc[k];
                        if (nr >= 0 && nr < m && nc >= 0 && nc < n && grid[nr][nc] == '1') {
                            grid[nr][nc] = '0';
                            stack.push_back(nr * n + nc);
                        }
                    }
                }
            }
        }
    }
    return count;
}

int main() {
    int m, n;
    cin >> m >> n;
    vector<string> grid(m);
    for (int i = 0; i < m; i++) {
        cin >> grid[i];
    }

    int result = numIslands(grid);
    cout << result << endl;
    return 0;
}`,
    RUST: `use std::io;

fn num_islands(grid: Vec<Vec<char>>) -> i32 {
    let mut grid = grid;
    let m = grid.len();
    if m == 0 {
        return 0;
    }
    let n = grid[0].len();
    let mut count = 0;

    for r in 0..m {
        for c in 0..n {
            if grid[r][c] == '1' {
                count += 1;
                let mut stack: Vec<(usize, usize)> = vec![(r, c)];
                grid[r][c] = '0';
                while let Some((cr, cc)) = stack.pop() {
                    if cr > 0 && grid[cr - 1][cc] == '1' {
                        grid[cr - 1][cc] = '0';
                        stack.push((cr - 1, cc));
                    }
                    if cr + 1 < m && grid[cr + 1][cc] == '1' {
                        grid[cr + 1][cc] = '0';
                        stack.push((cr + 1, cc));
                    }
                    if cc > 0 && grid[cr][cc - 1] == '1' {
                        grid[cr][cc - 1] = '0';
                        stack.push((cr, cc - 1));
                    }
                    if cc + 1 < n && grid[cr][cc + 1] == '1' {
                        grid[cr][cc + 1] = '0';
                        stack.push((cr, cc + 1));
                    }
                }
            }
        }
    }
    count
}

fn main() {
    let mut line = String::new();
    io::stdin().read_line(&mut line).expect("Failed to read line");
    let dims: Vec<usize> = line
        .trim()
        .split_whitespace()
        .map(|s| s.parse().unwrap())
        .collect();
    let m = dims[0];
    let n = dims[1];

    let mut grid: Vec<Vec<char>> = Vec::new();
    for _ in 0..m {
        let mut row = String::new();
        io::stdin().read_line(&mut row).expect("Failed to read line");
        grid.push(row.trim().chars().collect());
    }

    let result = num_islands(grid);
    println!("{}", result);
}`,
    TYPESCRIPT: `// @ts-nocheck
function numIslands(grid: string[]): number {
  const m = grid.length;
  const n = m > 0 ? grid[0].length : 0;
  const visited: boolean[][] = Array.from({ length: m }, () => new Array(n).fill(false));
  let count = 0;

  for (let r = 0; r < m; r++) {
    for (let c = 0; c < n; c++) {
      if (grid[r][c] === '1' && !visited[r][c]) {
        count++;
        const stack: Array<[number, number]> = [[r, c]];
        visited[r][c] = true;
        while (stack.length > 0) {
          const [cr, cc] = stack.pop()!;
          const neighbors: Array<[number, number]> = [
            [cr + 1, cc], [cr - 1, cc], [cr, cc + 1], [cr, cc - 1]
          ];
          for (const [nr, nc] of neighbors) {
            if (
              nr >= 0 && nr < m && nc >= 0 && nc < n &&
              grid[nr][nc] === '1' && !visited[nr][nc]
            ) {
              visited[nr][nc] = true;
              stack.push([nr, nc]);
            }
          }
        }
      }
    }
  }
  return count;
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
  const [m, n] = lines[0].trim().split(/\\s+/).map(Number);
  const grid = lines.slice(1, 1 + m);
  const result = numIslands(grid);
  console.log(result);
});`,
  },
};