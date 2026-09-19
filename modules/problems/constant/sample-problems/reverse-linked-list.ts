// Reverse Linked List — Linked List / Recursion — EASY
export const sampleReverseLinkedListProblem = {
  title: "Reverse Linked List",
  description:
    "Given the head of a singly linked list, reverse the list, and return the head of the reversed list. The input is a single line of space-separated integers representing the node values of the list in order. Output the reversed list as space-separated integers on a single line.",
  difficulty: "EASY",
  tags: ["Linked List", "Recursion"],
  constraints:
    "0 <= number of nodes <= 5000\n-5000 <= Node.val <= 5000",
  hints:
    "Iterate through the list and point each node's next pointer at the previous node, saving the next node before rewiring it.",
  editorial:
    "Set prev to null and cur to the head. For each node, temporarily save cur.next, point cur.next back to prev, then advance prev to cur and cur to the saved next node. When cur becomes null, prev is the new head. This takes O(n) time and O(1) space; the same approach can be written recursively.",
  testCases: [
    { input: "1 2 3 4 5", output: "5 4 3 2 1" },
    { input: "1 2", output: "2 1" },
    { input: "1", output: "1" },
  ],
  examples: {
    JAVASCRIPT: {
      input: "head = [1,2,3,4,5]",
      output: "[5,4,3,2,1]",
      explanation:
        "Reversing the list 1 -> 2 -> 3 -> 4 -> 5 gives 5 -> 4 -> 3 -> 2 -> 1.",
    },
    PYTHON: {
      input: "head = [1,2,3,4,5]",
      output: "[5,4,3,2,1]",
      explanation:
        "Reversing the list 1 -> 2 -> 3 -> 4 -> 5 gives 5 -> 4 -> 3 -> 2 -> 1.",
    },
    JAVA: {
      input: "head = [1,2,3,4,5]",
      output: "[5,4,3,2,1]",
      explanation:
        "Reversing the list 1 -> 2 -> 3 -> 4 -> 5 gives 5 -> 4 -> 3 -> 2 -> 1.",
    },
    CPP: {
      input: "head = [1,2,3,4,5]",
      output: "[5,4,3,2,1]",
      explanation:
        "Reversing the list 1 -> 2 -> 3 -> 4 -> 5 gives 5 -> 4 -> 3 -> 2 -> 1.",
    },
    RUST: {
      input: "head = [1,2,3,4,5]",
      output: "[5,4,3,2,1]",
      explanation:
        "Reversing the list 1 -> 2 -> 3 -> 4 -> 5 gives 5 -> 4 -> 3 -> 2 -> 1.",
    },
    TYPESCRIPT: {
      input: "head = [1,2,3,4,5]",
      output: "[5,4,3,2,1]",
      explanation:
        "Reversing the list 1 -> 2 -> 3 -> 4 -> 5 gives 5 -> 4 -> 3 -> 2 -> 1.",
    },
  },
  codeSnippets: {
    JAVASCRIPT: `/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val === undefined ? 0 : val)
 *     this.next = (next === undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} head
 * @return {ListNode}
 */
function ListNode(val, next) {
  this.val = val === undefined ? 0 : val;
  this.next = next === undefined ? null : next;
}

function reverseList(head) {
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
  const trimmed = line.trim();
  const values = trimmed === '' ? [] : trimmed.split(/\\s+/).map(Number);

  // Build the linked list from the input values
  const dummy = new ListNode(0);
  let cur = dummy;
  for (const val of values) {
    cur.next = new ListNode(val);
    cur = cur.next;
  }

  const result = reverseList(dummy.next);

  // Print the reversed list
  const out = [];
  let node = result;
  while (node !== null) {
    out.push(node.val);
    node = node.next;
  }
  console.log(out.join(' '));
  rl.close();
});`,
    PYTHON: `from typing import Optional

class ListNode:
    def __init__(self, val=0, next=None):
        self.val = val
        self.next = next

class Solution:
    def reverseList(self, head: Optional[ListNode]) -> Optional[ListNode]:
        # Write your code here
        pass

# Input parsing
if __name__ == "__main__":
    import sys
    line = sys.stdin.readline().strip()
    values = list(map(int, line.split())) if line else []

    dummy = ListNode(0)
    cur = dummy
    for val in values:
        cur.next = ListNode(val)
        cur = cur.next

    sol = Solution()
    result = sol.reverseList(dummy.next)

    out = []
    node = result
    while node is not None:
        out.append(node.val)
        node = node.next
    print(" ".join(map(str, out)))`,
    JAVA: `import java.util.*;

public class Main {
    static class ListNode {
        int val;
        ListNode next;
        ListNode(int val) {
            this.val = val;
        }
    }

    public static ListNode reverseList(ListNode head) {
        // Write your code here
        return null;
    }

    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        String line = sc.nextLine().trim();
        String[] tokens = line.isEmpty() ? new String[0] : line.split("\\\\s+");

        ListNode dummy = new ListNode(0);
        ListNode cur = dummy;
        for (String token : tokens) {
            cur.next = new ListNode(Integer.parseInt(token));
            cur = cur.next;
        }

        ListNode result = reverseList(dummy.next);
        StringBuilder sb = new StringBuilder();
        while (result != null) {
            if (sb.length() > 0) {
                sb.append(" ");
            }
            sb.append(result.val);
            result = result.next;
        }
        System.out.println(sb.toString());
    }
}`,
    CPP: `#include <iostream>
#include <vector>
#include <sstream>
#include <string>
using namespace std;

struct ListNode {
    int val;
    ListNode* next;
    ListNode(int x) : val(x), next(nullptr) {}
};

ListNode* reverseList(ListNode* head) {
    // Write your code here
    return nullptr;
}

int main() {
    string line;
    getline(cin, line);
    stringstream ss(line);
    vector<int> values;
    int num;
    while (ss >> num) {
        values.push_back(num);
    }

    ListNode dummy(0);
    ListNode* cur = &dummy;
    for (int val : values) {
        cur->next = new ListNode(val);
        cur = cur->next;
    }

    ListNode* result = reverseList(dummy.next);
    bool first = true;
    while (result != nullptr) {
        if (!first) {
            cout << " ";
        }
        first = false;
        cout << result->val;
        result = result->next;
    }
    cout << endl;
    return 0;
}`,
    RUST: `use std::io;

struct ListNode {
    val: i32,
    next: Option<Box<ListNode>>,
}

impl ListNode {
    fn new(val: i32) -> Self {
        ListNode { val, next: None }
    }
}

fn reverse_list(head: Option<Box<ListNode>>) -> Option<Box<ListNode>> {
    // Write your code here
    None
}

fn main() {
    let mut input = String::new();
    io::stdin().read_line(&mut input).expect("Failed to read line");
    let values: Vec<i32> = input
        .trim()
        .split_whitespace()
        .map(|s| s.parse().unwrap())
        .collect();

    let mut dummy = ListNode::new(0);
    let mut cur = &mut dummy;
    for val in values {
        cur.next = Some(Box::new(ListNode::new(val)));
        cur = cur.next.as_mut().unwrap();
    }

    let result = reverse_list(dummy.next);

    let mut out: Vec<String> = Vec::new();
    let mut node = result;
    while let Some(boxed) = node {
        out.push(boxed.val.to_string());
        node = boxed.next;
    }
    println!("{}", out.join(" "));
}`,
    TYPESCRIPT: `// @ts-nocheck
class ListNode {
  val: number;
  next: ListNode | null;
  constructor(val?: number, next?: ListNode | null) {
    this.val = val === undefined ? 0 : val;
    this.next = next === undefined ? null : next;
  }
}

function reverseList(head: ListNode | null): ListNode | null {
  // Write your code here
  return null;
}

// Input parsing
const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  terminal: false
});

rl.on('line', (line: string) => {
  const trimmed = line.trim();
  const values = trimmed === '' ? [] : trimmed.split(/\\s+/).map(Number);

  const dummy = new ListNode(0);
  let cur: ListNode = dummy;
  for (const val of values) {
    cur.next = new ListNode(val);
    cur = cur.next;
  }

  const result = reverseList(dummy.next);

  const out: number[] = [];
  let node: ListNode | null = result;
  while (node !== null) {
    out.push(node.val);
    node = node.next;
  }
  console.log(out.join(' '));
  rl.close();
});`,
  },
  referenceSolutions: {
    JAVASCRIPT: `/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val === undefined ? 0 : val)
 *     this.next = (next === undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} head
 * @return {ListNode}
 */
function ListNode(val, next) {
  this.val = val === undefined ? 0 : val;
  this.next = next === undefined ? null : next;
}

function reverseList(head) {
  let prev = null;
  let cur = head;
  while (cur !== null) {
    const next = cur.next;
    cur.next = prev;
    prev = cur;
    cur = next;
  }
  return prev;
}

// Input parsing
const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  terminal: false
});

rl.on('line', (line) => {
  const trimmed = line.trim();
  const values = trimmed === '' ? [] : trimmed.split(/\\s+/).map(Number);

  // Build the linked list from the input values
  const dummy = new ListNode(0);
  let cur = dummy;
  for (const val of values) {
    cur.next = new ListNode(val);
    cur = cur.next;
  }

  const result = reverseList(dummy.next);

  // Print the reversed list
  const out = [];
  let node = result;
  while (node !== null) {
    out.push(node.val);
    node = node.next;
  }
  console.log(out.join(' '));
  rl.close();
});`,
    PYTHON: `from typing import Optional

class ListNode:
    def __init__(self, val=0, next=None):
        self.val = val
        self.next = next

class Solution:
    def reverseList(self, head: Optional[ListNode]) -> Optional[ListNode]:
        prev = None
        cur = head
        while cur is not None:
            nxt = cur.next
            cur.next = prev
            prev = cur
            cur = nxt
        return prev

# Input parsing
if __name__ == "__main__":
    import sys
    line = sys.stdin.readline().strip()
    values = list(map(int, line.split())) if line else []

    dummy = ListNode(0)
    cur = dummy
    for val in values:
        cur.next = ListNode(val)
        cur = cur.next

    sol = Solution()
    result = sol.reverseList(dummy.next)

    out = []
    node = result
    while node is not None:
        out.append(node.val)
        node = node.next
    print(" ".join(map(str, out)))`,
    JAVA: `import java.util.*;

public class Main {
    static class ListNode {
        int val;
        ListNode next;
        ListNode(int val) {
            this.val = val;
        }
    }

    public static ListNode reverseList(ListNode head) {
        ListNode prev = null;
        ListNode cur = head;
        while (cur != null) {
            ListNode next = cur.next;
            cur.next = prev;
            prev = cur;
            cur = next;
        }
        return prev;
    }

    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        String line = sc.nextLine().trim();
        String[] tokens = line.isEmpty() ? new String[0] : line.split("\\\\s+");

        ListNode dummy = new ListNode(0);
        ListNode cur = dummy;
        for (String token : tokens) {
            cur.next = new ListNode(Integer.parseInt(token));
            cur = cur.next;
        }

        ListNode result = reverseList(dummy.next);
        StringBuilder sb = new StringBuilder();
        while (result != null) {
            if (sb.length() > 0) {
                sb.append(" ");
            }
            sb.append(result.val);
            result = result.next;
        }
        System.out.println(sb.toString());
    }
}`,
    CPP: `#include <iostream>
#include <vector>
#include <sstream>
#include <string>
using namespace std;

struct ListNode {
    int val;
    ListNode* next;
    ListNode(int x) : val(x), next(nullptr) {}
};

ListNode* reverseList(ListNode* head) {
    ListNode* prev = nullptr;
    ListNode* cur = head;
    while (cur != nullptr) {
        ListNode* next = cur->next;
        cur->next = prev;
        prev = cur;
        cur = next;
    }
    return prev;
}

int main() {
    string line;
    getline(cin, line);
    stringstream ss(line);
    vector<int> values;
    int num;
    while (ss >> num) {
        values.push_back(num);
    }

    ListNode dummy(0);
    ListNode* cur = &dummy;
    for (int val : values) {
        cur->next = new ListNode(val);
        cur = cur->next;
    }

    ListNode* result = reverseList(dummy.next);
    bool first = true;
    while (result != nullptr) {
        if (!first) {
            cout << " ";
        }
        first = false;
        cout << result->val;
        result = result->next;
    }
    cout << endl;
    return 0;
}`,
    RUST: `use std::io;

struct ListNode {
    val: i32,
    next: Option<Box<ListNode>>,
}

impl ListNode {
    fn new(val: i32) -> Self {
        ListNode { val, next: None }
    }
}

fn reverse_list(head: Option<Box<ListNode>>) -> Option<Box<ListNode>> {
    let mut prev: Option<Box<ListNode>> = None;
    let mut cur = head;
    while let Some(mut node) = cur {
        let next = node.next.take();
        node.next = prev;
        prev = Some(node);
        cur = next;
    }
    prev
}

fn main() {
    let mut input = String::new();
    io::stdin().read_line(&mut input).expect("Failed to read line");
    let values: Vec<i32> = input
        .trim()
        .split_whitespace()
        .map(|s| s.parse().unwrap())
        .collect();

    let mut dummy = ListNode::new(0);
    let mut cur = &mut dummy;
    for val in values {
        cur.next = Some(Box::new(ListNode::new(val)));
        cur = cur.next.as_mut().unwrap();
    }

    let result = reverse_list(dummy.next);

    let mut out: Vec<String> = Vec::new();
    let mut node = result;
    while let Some(boxed) = node {
        out.push(boxed.val.to_string());
        node = boxed.next;
    }
    println!("{}", out.join(" "));
}`,
    TYPESCRIPT: `// @ts-nocheck
class ListNode {
  val: number;
  next: ListNode | null;
  constructor(val?: number, next?: ListNode | null) {
    this.val = val === undefined ? 0 : val;
    this.next = next === undefined ? null : next;
  }
}

function reverseList(head: ListNode | null): ListNode | null {
  let prev: ListNode | null = null;
  let cur: ListNode | null = head;
  while (cur !== null) {
    const next = cur.next;
    cur.next = prev;
    prev = cur;
    cur = next;
  }
  return prev;
}

// Input parsing
const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  terminal: false
});

rl.on('line', (line: string) => {
  const trimmed = line.trim();
  const values = trimmed === '' ? [] : trimmed.split(/\\s+/).map(Number);

  const dummy = new ListNode(0);
  let cur: ListNode = dummy;
  for (const val of values) {
    cur.next = new ListNode(val);
    cur = cur.next;
  }

  const result = reverseList(dummy.next);

  const out: number[] = [];
  let node: ListNode | null = result;
  while (node !== null) {
    out.push(node.val);
    node = node.next;
  }
  console.log(out.join(' '));
  rl.close();
});`,
  },
};