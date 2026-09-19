// Maximum Depth of Binary Tree — Tree / Depth-First Search / Breadth-First Search — EASY
export const sampleMaximumDepthOfBinaryTreeProblem = {
  title: "Maximum Depth of Binary Tree",
  description:
    "Given the root of a binary tree, return its maximum depth. The maximum depth is the number of nodes along the longest path from the root node down to the farthest leaf node.",
  difficulty: "EASY",
  tags: ["Tree", "Depth-First Search", "Breadth-First Search"],
  constraints:
    "0 <= node count <= 10^4\n-100 <= Node.val <= 100",
  hints:
    "The depth of a node is 1 plus the maximum depth of its children, treating null nodes as depth 0. Solve it recursively from the root.",
  editorial:
    "The maximum depth of an empty tree is 0. Otherwise it is 1 plus the maximum of the depths of the left and right subtrees, computed recursively with depth-first search. The same answer can also be obtained by counting the levels visited during a breadth-first traversal.",
  testCases: [
    { input: "3 9 20 null null 15 7", output: "3" },
    { input: "1 null 2", output: "2" },
    { input: "1", output: "1" },
  ],
  examples: {
    JAVASCRIPT: {
      input: "root = [3,9,20,null,null,15,7]",
      output: "3",
      explanation:
        "The tree has 3 levels: the root (3), its children (9 and 20), and the leaves (15 and 7).",
    },
    PYTHON: {
      input: "root = [3,9,20,null,null,15,7]",
      output: "3",
      explanation:
        "The tree has 3 levels: the root (3), its children (9 and 20), and the leaves (15 and 7).",
    },
    JAVA: {
      input: "root = [3,9,20,null,null,15,7]",
      output: "3",
      explanation:
        "The tree has 3 levels: the root (3), its children (9 and 20), and the leaves (15 and 7).",
    },
    CPP: {
      input: "root = [3,9,20,null,null,15,7]",
      output: "3",
      explanation:
        "The tree has 3 levels: the root (3), its children (9 and 20), and the leaves (15 and 7).",
    },
    RUST: {
      input: "root = [3,9,20,null,null,15,7]",
      output: "3",
      explanation:
        "The tree has 3 levels: the root (3), its children (9 and 20), and the leaves (15 and 7).",
    },
    TYPESCRIPT: {
      input: "root = [3,9,20,null,null,15,7]",
      output: "3",
      explanation:
        "The tree has 3 levels: the root (3), its children (9 and 20), and the leaves (15 and 7).",
    },
  },
  codeSnippets: {
    JAVASCRIPT: `/**
 * Definition for a binary tree node.
 */
function TreeNode(val) {
  this.val = val;
  this.left = null;
  this.right = null;
}

/**
 * @param {TreeNode} root
 * @return {number}
 */
function maxDepth(root) {
  // Write your code here
}

// Input parsing
const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  terminal: false
});

function buildTree(tokens) {
  if (tokens.length === 0 || tokens[0] === "null") {
    return null;
  }
  const root = new TreeNode(Number(tokens[0]));
  const queue = [root];
  let i = 1;
  while (i < tokens.length && queue.length > 0) {
    const node = queue.shift();
    if (tokens[i] !== "null") {
      node.left = new TreeNode(Number(tokens[i]));
      queue.push(node.left);
    }
    i++;
    if (i < tokens.length) {
      if (tokens[i] !== "null") {
        node.right = new TreeNode(Number(tokens[i]));
        queue.push(node.right);
      }
      i++;
    }
  }
  return root;
}

rl.on('line', (line) => {
  const trimmed = line.trim();
  if (trimmed === "") {
    console.log(0);
    rl.close();
    return;
  }
  const tokens = trimmed.split(/\\s+/);
  const root = buildTree(tokens);
  const result = maxDepth(root);
  console.log(result);
  rl.close();
});`,
    PYTHON: `from typing import List, Optional
from collections import deque

class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right

class Solution:
    def maxDepth(self, root: Optional[TreeNode]) -> int:
        # Write your code here
        pass

# Input parsing
def build_tree(tokens):
    if not tokens or tokens[0] == "null":
        return None
    root = TreeNode(int(tokens[0]))
    queue = deque([root])
    i = 1
    while i < len(tokens) and queue:
        node = queue.popleft()
        if tokens[i] != "null":
            node.left = TreeNode(int(tokens[i]))
            queue.append(node.left)
        i += 1
        if i < len(tokens):
            if tokens[i] != "null":
                node.right = TreeNode(int(tokens[i]))
                queue.append(node.right)
            i += 1
    return root

if __name__ == "__main__":
    import sys
    line = sys.stdin.readline().strip()
    tokens = line.split()
    if not tokens:
        print(0)
    else:
        root = build_tree(tokens)
        sol = Solution()
        result = sol.maxDepth(root)
        print(result)`,
    JAVA: `import java.util.*;

public class Main {
    public static class TreeNode {
        int val;
        TreeNode left;
        TreeNode right;
        TreeNode(int x) {
            val = x;
        }
    }

    public static TreeNode buildTree(String[] tokens) {
        if (tokens.length == 0 || tokens[0].equals("null")) {
            return null;
        }
        TreeNode root = new TreeNode(Integer.parseInt(tokens[0]));
        Queue<TreeNode> queue = new LinkedList<>();
        queue.offer(root);
        int i = 1;
        while (i < tokens.length && !queue.isEmpty()) {
            TreeNode node = queue.poll();
            if (!tokens[i].equals("null")) {
                node.left = new TreeNode(Integer.parseInt(tokens[i]));
                queue.offer(node.left);
            }
            i++;
            if (i < tokens.length) {
                if (!tokens[i].equals("null")) {
                    node.right = new TreeNode(Integer.parseInt(tokens[i]));
                    queue.offer(node.right);
                }
                i++;
            }
        }
        return root;
    }

    public static int maxDepth(TreeNode root) {
        // Write your code here
        return 0;
    }

    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        String line = sc.nextLine();
        String trimmed = line.trim();
        if (trimmed.isEmpty()) {
            System.out.println(0);
            return;
        }
        String[] tokens = trimmed.split("\\\\s+");

        TreeNode root = buildTree(tokens);
        System.out.println(maxDepth(root));
    }
}`,
    CPP: `#include <iostream>
#include <string>
#include <vector>
#include <queue>
#include <sstream>
#include <algorithm>
using namespace std;

struct TreeNode {
    int val;
    TreeNode* left;
    TreeNode* right;
    TreeNode(int x) : val(x), left(nullptr), right(nullptr) {}
};

TreeNode* buildTree(const vector<string>& tokens) {
    if (tokens.empty() || tokens[0] == "null") {
        return nullptr;
    }
    TreeNode* root = new TreeNode(stoi(tokens[0]));
    queue<TreeNode*> q;
    q.push(root);
    int i = 1;
    while (i < (int)tokens.size() && !q.empty()) {
        TreeNode* node = q.front();
        q.pop();
        if (tokens[i] != "null") {
            node->left = new TreeNode(stoi(tokens[i]));
            q.push(node->left);
        }
        i++;
        if (i < (int)tokens.size()) {
            if (tokens[i] != "null") {
                node->right = new TreeNode(stoi(tokens[i]));
                q.push(node->right);
            }
            i++;
        }
    }
    return root;
}

int maxDepth(TreeNode* root) {
    // Write your code here
    return 0;
}

int main() {
    string line;
    getline(cin, line);
    stringstream ss(line);
    vector<string> tokens;
    string token;
    while (ss >> token) {
        tokens.push_back(token);
    }
    if (tokens.empty()) {
        cout << 0 << endl;
        return 0;
    }

    TreeNode* root = buildTree(tokens);
    cout << maxDepth(root) << endl;
    return 0;
}`,
    RUST: `use std::io;
use std::collections::VecDeque;

#[derive(Debug, Clone)]
struct TreeNode {
    val: i32,
    left: Option<Box<TreeNode>>,
    right: Option<Box<TreeNode>>,
}

impl TreeNode {
    fn new(val: i32) -> Self {
        TreeNode { val, left: None, right: None }
    }
}

fn build_tree(tokens: &[String]) -> Option<Box<TreeNode>> {
    if tokens.is_empty() || tokens[0] == "null" {
        return None;
    }
    let mut root = Box::new(TreeNode::new(tokens[0].parse().unwrap()));
    let mut queue: VecDeque<&mut Box<TreeNode>> = VecDeque::new();
    queue.push_back(&mut root);
    let mut i = 1;
    while i < tokens.len() && !queue.is_empty() {
        let node = queue.pop_front().unwrap();
        if i < tokens.len() {
            if tokens[i] != "null" {
                let child = Box::new(TreeNode::new(tokens[i].parse().unwrap()));
                node.left = Some(child);
                queue.push_back(node.left.as_mut().unwrap());
            }
            i += 1;
        }
        if i < tokens.len() {
            if tokens[i] != "null" {
                let child = Box::new(TreeNode::new(tokens[i].parse().unwrap()));
                node.right = Some(child);
                queue.push_back(node.right.as_mut().unwrap());
            }
            i += 1;
        }
    }
    Some(root)
}

fn max_depth(root: Option<Box<TreeNode>>) -> i32 {
    // Write your code here
    0
}

fn main() {
    let mut line = String::new();
    io::stdin().read_line(&mut line).expect("Failed to read line");
    let tokens: Vec<String> = line
        .trim()
        .split_whitespace()
        .map(|s| s.to_string())
        .collect();
    if tokens.is_empty() {
        println!("{}", 0);
        return;
    }

    let root = build_tree(&tokens);
    println!("{}", max_depth(root));
}`,
    TYPESCRIPT: `// @ts-nocheck
class TreeNode {
  val: number;
  left: TreeNode | null;
  right: TreeNode | null;
  constructor(val: number) {
    this.val = val;
    this.left = null;
    this.right = null;
  }
}

/**
 * @param {TreeNode | null} root
 * @return {number}
 */
function maxDepth(root: TreeNode | null): number {
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

function buildTree(tokens: string[]): TreeNode | null {
  if (tokens.length === 0 || tokens[0] === "null") {
    return null;
  }
  const root = new TreeNode(Number(tokens[0]));
  const queue: TreeNode[] = [root];
  let i = 1;
  while (i < tokens.length && queue.length > 0) {
    const node = queue.shift();
    if (tokens[i] !== "null") {
      node.left = new TreeNode(Number(tokens[i]));
      queue.push(node.left);
    }
    i++;
    if (i < tokens.length) {
      if (tokens[i] !== "null") {
        node.right = new TreeNode(Number(tokens[i]));
        queue.push(node.right);
      }
      i++;
    }
  }
  return root;
}

rl.on('line', (line: string) => {
  const trimmed = line.trim();
  if (trimmed === "") {
    console.log(0);
    rl.close();
    return;
  }
  const tokens = trimmed.split(/\\s+/);
  const root = buildTree(tokens);
  const result = maxDepth(root);
  console.log(result);
  rl.close();
});`,
  },
  referenceSolutions: {
    JAVASCRIPT: `/**
 * Definition for a binary tree node.
 */
function TreeNode(val) {
  this.val = val;
  this.left = null;
  this.right = null;
}

/**
 * @param {TreeNode} root
 * @return {number}
 */
function maxDepth(root) {
  if (root === null) {
    return 0;
  }
  return 1 + Math.max(maxDepth(root.left), maxDepth(root.right));
}

// Input parsing
const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  terminal: false
});

function buildTree(tokens) {
  if (tokens.length === 0 || tokens[0] === "null") {
    return null;
  }
  const root = new TreeNode(Number(tokens[0]));
  const queue = [root];
  let i = 1;
  while (i < tokens.length && queue.length > 0) {
    const node = queue.shift();
    if (tokens[i] !== "null") {
      node.left = new TreeNode(Number(tokens[i]));
      queue.push(node.left);
    }
    i++;
    if (i < tokens.length) {
      if (tokens[i] !== "null") {
        node.right = new TreeNode(Number(tokens[i]));
        queue.push(node.right);
      }
      i++;
    }
  }
  return root;
}

rl.on('line', (line) => {
  const trimmed = line.trim();
  if (trimmed === "") {
    console.log(0);
    rl.close();
    return;
  }
  const tokens = trimmed.split(/\\s+/);
  const root = buildTree(tokens);
  const result = maxDepth(root);
  console.log(result);
  rl.close();
});`,
    PYTHON: `from typing import List, Optional
from collections import deque

class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right

class Solution:
    def maxDepth(self, root: Optional[TreeNode]) -> int:
        if root is None:
            return 0
        return 1 + max(self.maxDepth(root.left), self.maxDepth(root.right))

# Input parsing
def build_tree(tokens):
    if not tokens or tokens[0] == "null":
        return None
    root = TreeNode(int(tokens[0]))
    queue = deque([root])
    i = 1
    while i < len(tokens) and queue:
        node = queue.popleft()
        if tokens[i] != "null":
            node.left = TreeNode(int(tokens[i]))
            queue.append(node.left)
        i += 1
        if i < len(tokens):
            if tokens[i] != "null":
                node.right = TreeNode(int(tokens[i]))
                queue.append(node.right)
            i += 1
    return root

if __name__ == "__main__":
    import sys
    line = sys.stdin.readline().strip()
    tokens = line.split()
    if not tokens:
        print(0)
    else:
        root = build_tree(tokens)
        sol = Solution()
        result = sol.maxDepth(root)
        print(result)`,
    JAVA: `import java.util.*;

public class Main {
    public static class TreeNode {
        int val;
        TreeNode left;
        TreeNode right;
        TreeNode(int x) {
            val = x;
        }
    }

    public static TreeNode buildTree(String[] tokens) {
        if (tokens.length == 0 || tokens[0].equals("null")) {
            return null;
        }
        TreeNode root = new TreeNode(Integer.parseInt(tokens[0]));
        Queue<TreeNode> queue = new LinkedList<>();
        queue.offer(root);
        int i = 1;
        while (i < tokens.length && !queue.isEmpty()) {
            TreeNode node = queue.poll();
            if (!tokens[i].equals("null")) {
                node.left = new TreeNode(Integer.parseInt(tokens[i]));
                queue.offer(node.left);
            }
            i++;
            if (i < tokens.length) {
                if (!tokens[i].equals("null")) {
                    node.right = new TreeNode(Integer.parseInt(tokens[i]));
                    queue.offer(node.right);
                }
                i++;
            }
        }
        return root;
    }

    public static int maxDepth(TreeNode root) {
        if (root == null) {
            return 0;
        }
        return 1 + Math.max(maxDepth(root.left), maxDepth(root.right));
    }

    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        String line = sc.nextLine();
        String trimmed = line.trim();
        if (trimmed.isEmpty()) {
            System.out.println(0);
            return;
        }
        String[] tokens = trimmed.split("\\\\s+");

        TreeNode root = buildTree(tokens);
        System.out.println(maxDepth(root));
    }
}`,
    CPP: `#include <iostream>
#include <string>
#include <vector>
#include <queue>
#include <sstream>
#include <algorithm>
using namespace std;

struct TreeNode {
    int val;
    TreeNode* left;
    TreeNode* right;
    TreeNode(int x) : val(x), left(nullptr), right(nullptr) {}
};

TreeNode* buildTree(const vector<string>& tokens) {
    if (tokens.empty() || tokens[0] == "null") {
        return nullptr;
    }
    TreeNode* root = new TreeNode(stoi(tokens[0]));
    queue<TreeNode*> q;
    q.push(root);
    int i = 1;
    while (i < (int)tokens.size() && !q.empty()) {
        TreeNode* node = q.front();
        q.pop();
        if (tokens[i] != "null") {
            node->left = new TreeNode(stoi(tokens[i]));
            q.push(node->left);
        }
        i++;
        if (i < (int)tokens.size()) {
            if (tokens[i] != "null") {
                node->right = new TreeNode(stoi(tokens[i]));
                q.push(node->right);
            }
            i++;
        }
    }
    return root;
}

int maxDepth(TreeNode* root) {
    if (root == nullptr) {
        return 0;
    }
    return 1 + max(maxDepth(root->left), maxDepth(root->right));
}

int main() {
    string line;
    getline(cin, line);
    stringstream ss(line);
    vector<string> tokens;
    string token;
    while (ss >> token) {
        tokens.push_back(token);
    }
    if (tokens.empty()) {
        cout << 0 << endl;
        return 0;
    }

    TreeNode* root = buildTree(tokens);
    cout << maxDepth(root) << endl;
    return 0;
}`,
    RUST: `use std::io;
use std::collections::VecDeque;

#[derive(Debug, Clone)]
struct TreeNode {
    val: i32,
    left: Option<Box<TreeNode>>,
    right: Option<Box<TreeNode>>,
}

impl TreeNode {
    fn new(val: i32) -> Self {
        TreeNode { val, left: None, right: None }
    }
}

fn build_tree(tokens: &[String]) -> Option<Box<TreeNode>> {
    if tokens.is_empty() || tokens[0] == "null" {
        return None;
    }
    let mut root = Box::new(TreeNode::new(tokens[0].parse().unwrap()));
    let mut queue: VecDeque<&mut Box<TreeNode>> = VecDeque::new();
    queue.push_back(&mut root);
    let mut i = 1;
    while i < tokens.len() && !queue.is_empty() {
        let node = queue.pop_front().unwrap();
        if i < tokens.len() {
            if tokens[i] != "null" {
                let child = Box::new(TreeNode::new(tokens[i].parse().unwrap()));
                node.left = Some(child);
                queue.push_back(node.left.as_mut().unwrap());
            }
            i += 1;
        }
        if i < tokens.len() {
            if tokens[i] != "null" {
                let child = Box::new(TreeNode::new(tokens[i].parse().unwrap()));
                node.right = Some(child);
                queue.push_back(node.right.as_mut().unwrap());
            }
            i += 1;
        }
    }
    Some(root)
}

fn max_depth(root: Option<Box<TreeNode>>) -> i32 {
    match root {
        None => 0,
        Some(node) => 1 + max_depth(node.left).max(max_depth(node.right)),
    }
}

fn main() {
    let mut line = String::new();
    io::stdin().read_line(&mut line).expect("Failed to read line");
    let tokens: Vec<String> = line
        .trim()
        .split_whitespace()
        .map(|s| s.to_string())
        .collect();
    if tokens.is_empty() {
        println!("{}", 0);
        return;
    }

    let root = build_tree(&tokens);
    println!("{}", max_depth(root));
}`,
    TYPESCRIPT: `// @ts-nocheck
class TreeNode {
  val: number;
  left: TreeNode | null;
  right: TreeNode | null;
  constructor(val: number) {
    this.val = val;
    this.left = null;
    this.right = null;
  }
}

/**
 * @param {TreeNode | null} root
 * @return {number}
 */
function maxDepth(root: TreeNode | null): number {
  if (root === null) {
    return 0;
  }
  return 1 + Math.max(maxDepth(root.left), maxDepth(root.right));
}

// Input parsing
const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  terminal: false
});

function buildTree(tokens: string[]): TreeNode | null {
  if (tokens.length === 0 || tokens[0] === "null") {
    return null;
  }
  const root = new TreeNode(Number(tokens[0]));
  const queue: TreeNode[] = [root];
  let i = 1;
  while (i < tokens.length && queue.length > 0) {
    const node = queue.shift();
    if (tokens[i] !== "null") {
      node.left = new TreeNode(Number(tokens[i]));
      queue.push(node.left);
    }
    i++;
    if (i < tokens.length) {
      if (tokens[i] !== "null") {
        node.right = new TreeNode(Number(tokens[i]));
        queue.push(node.right);
      }
      i++;
    }
  }
  return root;
}

rl.on('line', (line: string) => {
  const trimmed = line.trim();
  if (trimmed === "") {
    console.log(0);
    rl.close();
    return;
  }
  const tokens = trimmed.split(/\\s+/);
  const root = buildTree(tokens);
  const result = maxDepth(root);
  console.log(result);
  rl.close();
});`,
  },
};