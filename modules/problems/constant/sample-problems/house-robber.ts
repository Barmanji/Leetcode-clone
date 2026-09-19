// House Robber — Array / Dynamic Programming — MEDIUM
export const sampleHouseRobberProblem = {
  title: "House Robber",
  description:
    "You are a professional robber planning to rob houses along a street. Each house has a certain amount of money stashed (nums[i]), and adjacent houses are connected by a security system that alerts the police if two adjacent houses are robbed on the same night. Return the maximum amount of money you can rob tonight without alerting the police.",
  difficulty: "MEDIUM",
  tags: ["Array", "Dynamic Programming"],
  constraints:
    "1 <= nums.length <= 100\n0 <= nums[i] <= 400",
  hints:
    "For each house you either rob it (and must skip the previous house) or skip it (keeping the best result up to the previous house). Track two running bests.",
  editorial:
    "Process the houses left to right while keeping two values: the maximum amount you can rob up to the previous house, and up to the house before that. At each house the new best is the maximum of skipping it (previous best) or robbing it (best two houses back plus the current value). This runs in O(n) time and O(1) space.",
  testCases: [
    { input: "1 2 3 1", output: "4" },
    { input: "2 7 9 3 1", output: "12" },
    { input: "5", output: "5" },
    { input: "2 1 1 2", output: "4" },
  ],
  examples: {
    JAVASCRIPT: {
      input: "nums = [1,2,3,1]",
      output: "4",
      explanation:
        "Rob house 1 (money = 1) and then rob house 3 (money = 3). Total amount you can rob = 1 + 3 = 4.",
    },
    PYTHON: {
      input: "nums = [1,2,3,1]",
      output: "4",
      explanation:
        "Rob house 1 (money = 1) and then rob house 3 (money = 3). Total amount you can rob = 1 + 3 = 4.",
    },
    JAVA: {
      input: "nums = [1,2,3,1]",
      output: "4",
      explanation:
        "Rob house 1 (money = 1) and then rob house 3 (money = 3). Total amount you can rob = 1 + 3 = 4.",
    },
    CPP: {
      input: "nums = [1,2,3,1]",
      output: "4",
      explanation:
        "Rob house 1 (money = 1) and then rob house 3 (money = 3). Total amount you can rob = 1 + 3 = 4.",
    },
    RUST: {
      input: "nums = [1,2,3,1]",
      output: "4",
      explanation:
        "Rob house 1 (money = 1) and then rob house 3 (money = 3). Total amount you can rob = 1 + 3 = 4.",
    },
    TYPESCRIPT: {
      input: "nums = [1,2,3,1]",
      output: "4",
      explanation:
        "Rob house 1 (money = 1) and then rob house 3 (money = 3). Total amount you can rob = 1 + 3 = 4.",
    },
  },
  codeSnippets: {
    JAVASCRIPT: `/**
 * @param {number[]} nums
 * @return {number}
 */
function rob(nums) {
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
  const nums = line.trim().split(/\\s+/).map(Number);
  const result = rob(nums);
  console.log(result);
  rl.close();
});`,
    PYTHON: `from typing import List

class Solution:
    def rob(self, nums: List[int]) -> int:
        # Write your code here
        pass

# Input parsing
if __name__ == "__main__":
    import sys
    nums = list(map(int, sys.stdin.readline().split()))
    sol = Solution()
    result = sol.rob(nums)
    print(result)`,
    JAVA: `import java.util.*;

public class Main {
    public static int rob(int[] nums) {
        // Write your code here
        return 0;
    }

    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        String[] tokens = sc.nextLine().trim().split("\\\\s+");
        int[] nums = new int[tokens.length];
        for (int i = 0; i < tokens.length; i++) {
            nums[i] = Integer.parseInt(tokens[i]);
        }

        int result = rob(nums);
        System.out.println(result);
    }
}`,
    CPP: `#include <iostream>
#include <vector>
#include <sstream>
#include <string>
#include <algorithm>
using namespace std;

int rob(vector<int>& nums) {
    // Write your code here
    return 0;
}

int main() {
    string line;
    getline(cin, line);
    stringstream ss(line);
    vector<int> nums;
    int num;
    while (ss >> num) {
        nums.push_back(num);
    }

    int result = rob(nums);
    cout << result << endl;
    return 0;
}`,
    RUST: `use std::io;

fn rob(nums: Vec<i32>) -> i32 {
    // Write your code here
    0
}

fn main() {
    let mut input = String::new();
    io::stdin().read_line(&mut input).expect("Failed to read line");
    let nums: Vec<i32> = input
        .trim()
        .split_whitespace()
        .map(|s| s.parse().unwrap())
        .collect();

    let result = rob(nums);
    println!("{}", result);
}`,
    TYPESCRIPT: `// @ts-nocheck
function rob(nums: number[]): number {
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
  const nums = line.trim().split(/\\s+/).map(Number);
  const result = rob(nums);
  console.log(result);
  rl.close();
});`,
  },
  referenceSolutions: {
    JAVASCRIPT: `/**
 * @param {number[]} nums
 * @return {number}
 */
function rob(nums) {
  let prev1 = 0;
  let prev2 = 0;
  for (const num of nums) {
    const current = Math.max(prev1, prev2 + num);
    prev2 = prev1;
    prev1 = current;
  }
  return prev1;
}

// Input parsing
const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  terminal: false
});

rl.on('line', (line) => {
  const nums = line.trim().split(/\\s+/).map(Number);
  const result = rob(nums);
  console.log(result);
  rl.close();
});`,
    PYTHON: `from typing import List

class Solution:
    def rob(self, nums: List[int]) -> int:
        prev1 = 0
        prev2 = 0
        for num in nums:
            current = max(prev1, prev2 + num)
            prev2 = prev1
            prev1 = current
        return prev1

# Input parsing
if __name__ == "__main__":
    import sys
    nums = list(map(int, sys.stdin.readline().split()))
    sol = Solution()
    result = sol.rob(nums)
    print(result)`,
    JAVA: `import java.util.Scanner;

public class Main {
    public static int rob(int[] nums) {
        int prev1 = 0, prev2 = 0;
        for (int num : nums) {
            int current = Math.max(prev1, prev2 + num);
            prev2 = prev1;
            prev1 = current;
        }
        return prev1;
    }

    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        String[] tokens = sc.nextLine().trim().split("\\\\s+");
        int[] nums = new int[tokens.length];
        for (int i = 0; i < tokens.length; i++) {
            nums[i] = Integer.parseInt(tokens[i]);
        }

        int result = rob(nums);
        System.out.println(result);
    }
}`,
    CPP: `#include <iostream>
#include <vector>
#include <sstream>
#include <string>
#include <algorithm>
using namespace std;

int rob(vector<int>& nums) {
    int prev1 = 0, prev2 = 0;
    for (int num : nums) {
        int current = max(prev1, prev2 + num);
        prev2 = prev1;
        prev1 = current;
    }
    return prev1;
}

int main() {
    string line;
    getline(cin, line);
    stringstream ss(line);
    vector<int> nums;
    int num;
    while (ss >> num) {
        nums.push_back(num);
    }

    int result = rob(nums);
    cout << result << endl;
    return 0;
}`,
    RUST: `use std::io;

fn rob(nums: Vec<i32>) -> i32 {
    let mut prev1 = 0;
    let mut prev2 = 0;
    for num in nums {
        let current = prev1.max(prev2 + num);
        prev2 = prev1;
        prev1 = current;
    }
    prev1
}

fn main() {
    let mut input = String::new();
    io::stdin().read_line(&mut input).expect("Failed to read line");
    let nums: Vec<i32> = input
        .trim()
        .split_whitespace()
        .map(|s| s.parse().unwrap())
        .collect();

    let result = rob(nums);
    println!("{}", result);
}`,
    TYPESCRIPT: `// @ts-nocheck
function rob(nums: number[]): number {
  let prev1 = 0;
  let prev2 = 0;
  for (const num of nums) {
    const current = Math.max(prev1, prev2 + num);
    prev2 = prev1;
    prev1 = current;
  }
  return prev1;
}

// Input parsing
const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  terminal: false
});

rl.on('line', (line: string) => {
  const nums = line.trim().split(/\\s+/).map(Number);
  const result = rob(nums);
  console.log(result);
  rl.close();
});`,
  },
};