// Maximum Subarray — Array / Dynamic Programming / Divide and Conquer — MEDIUM
export const sampleMaximumSubarrayProblem = {
  title: "Maximum Subarray",
  description:
    "Given an integer array nums, find the subarray with the largest sum, and return its sum. The input is a single line of space-separated integers (values may be negative). Output the maximum subarray sum as a single integer.",
  difficulty: "MEDIUM",
  tags: ["Array", "Dynamic Programming", "Divide and Conquer"],
  constraints: "1 <= nums.length <= 10^5\n-10^4 <= nums[i] <= 10^4",
  hints:
    "Use Kadane's algorithm: keep the maximum subarray sum ending at the current position and the overall maximum seen so far.",
  editorial:
    "Kadane's algorithm scans the array once, maintaining the maximum sum of a subarray ending at the current index (either the current element alone or the current element appended to the best previous subarray) and the global maximum. Since each step only needs the previous value, the solution runs in O(n) time and O(1) space.",
  testCases: [
    { input: "-2 1 -3 4 -1 2 1 -5 4", output: "6" },
    { input: "1", output: "1" },
    { input: "5 4 -1 7 8", output: "23" },
    { input: "-1 -2", output: "-1" },
  ],
  examples: {
    JAVASCRIPT: {
      input: "nums = [-2,1,-3,4,-1,2,1,-5,4]",
      output: "6",
      explanation: "The subarray [4,-1,2,1] has the largest sum 6.",
    },
    PYTHON: {
      input: "nums = [-2,1,-3,4,-1,2,1,-5,4]",
      output: "6",
      explanation: "The subarray [4,-1,2,1] has the largest sum 6.",
    },
    JAVA: {
      input: "nums = [-2,1,-3,4,-1,2,1,-5,4]",
      output: "6",
      explanation: "The subarray [4,-1,2,1] has the largest sum 6.",
    },
    CPP: {
      input: "nums = [-2,1,-3,4,-1,2,1,-5,4]",
      output: "6",
      explanation: "The subarray [4,-1,2,1] has the largest sum 6.",
    },
    RUST: {
      input: "nums = [-2,1,-3,4,-1,2,1,-5,4]",
      output: "6",
      explanation: "The subarray [4,-1,2,1] has the largest sum 6.",
    },
    TYPESCRIPT: {
      input: "nums = [-2,1,-3,4,-1,2,1,-5,4]",
      output: "6",
      explanation: "The subarray [4,-1,2,1] has the largest sum 6.",
    },
  },
  codeSnippets: {
    JAVASCRIPT: `/**
 * @param {number[]} nums
 * @return {number}
 */
function maxSubArray(nums) {
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
  const result = maxSubArray(nums);
  console.log(result);
  rl.close();
});`,
    PYTHON: `from typing import List

class Solution:
    def maxSubArray(self, nums: List[int]) -> int:
        # Write your code here
        pass

# Input parsing
if __name__ == "__main__":
    import sys
    nums = list(map(int, sys.stdin.readline().split()))
    sol = Solution()
    result = sol.maxSubArray(nums)
    print(result)`,
    JAVA: `import java.util.*;

public class Main {
    public static int maxSubArray(int[] nums) {
        // Write your code here
        return 0;
    }

    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        String line = sc.nextLine().trim();
        String[] tokens = line.split("\\\\s+");
        int[] nums = new int[tokens.length];
        for (int i = 0; i < tokens.length; i++) {
            nums[i] = Integer.parseInt(tokens[i]);
        }

        int result = maxSubArray(nums);
        System.out.println(result);
    }
}`,
    CPP: `#include <iostream>
#include <vector>
#include <sstream>
#include <string>
#include <algorithm>
using namespace std;

int maxSubArray(vector<int>& nums) {
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

    int result = maxSubArray(nums);
    cout << result << endl;
    return 0;
}`,
    RUST: `use std::io;

fn max_sub_array(nums: Vec<i32>) -> i32 {
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

    let result = max_sub_array(nums);
    println!("{}", result);
}`,
    TYPESCRIPT: `// @ts-nocheck
function maxSubArray(nums: number[]): number {
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
  const result = maxSubArray(nums);
  console.log(result);
  rl.close();
});`,
  },
  referenceSolutions: {
    JAVASCRIPT: `/**
 * @param {number[]} nums
 * @return {number}
 */
function maxSubArray(nums) {
  let maxSoFar = nums[0];
  let maxEndingHere = nums[0];
  for (let i = 1; i < nums.length; i++) {
    maxEndingHere = Math.max(nums[i], maxEndingHere + nums[i]);
    maxSoFar = Math.max(maxSoFar, maxEndingHere);
  }
  return maxSoFar;
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
  const result = maxSubArray(nums);
  console.log(result);
  rl.close();
});`,
    PYTHON: `from typing import List

class Solution:
    def maxSubArray(self, nums: List[int]) -> int:
        max_so_far = nums[0]
        max_ending_here = nums[0]
        for num in nums[1:]:
            max_ending_here = max(num, max_ending_here + num)
            max_so_far = max(max_so_far, max_ending_here)
        return max_so_far

# Input parsing
if __name__ == "__main__":
    import sys
    nums = list(map(int, sys.stdin.readline().split()))
    sol = Solution()
    result = sol.maxSubArray(nums)
    print(result)`,
    JAVA: `import java.util.Scanner;

public class Main {
    public static int maxSubArray(int[] nums) {
        int maxSoFar = nums[0];
        int maxEndingHere = nums[0];
        for (int i = 1; i < nums.length; i++) {
            maxEndingHere = Math.max(nums[i], maxEndingHere + nums[i]);
            maxSoFar = Math.max(maxSoFar, maxEndingHere);
        }
        return maxSoFar;
    }

    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        String line = sc.nextLine().trim();
        String[] tokens = line.split("\\\\s+");
        int[] nums = new int[tokens.length];
        for (int i = 0; i < tokens.length; i++) {
            nums[i] = Integer.parseInt(tokens[i]);
        }

        int result = maxSubArray(nums);
        System.out.println(result);
    }
}`,
    CPP: `#include <iostream>
#include <vector>
#include <sstream>
#include <string>
#include <algorithm>
using namespace std;

int maxSubArray(vector<int>& nums) {
    int maxSoFar = nums[0];
    int maxEndingHere = nums[0];
    for (int i = 1; i < (int)nums.size(); i++) {
        maxEndingHere = max(nums[i], maxEndingHere + nums[i]);
        maxSoFar = max(maxSoFar, maxEndingHere);
    }
    return maxSoFar;
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

    int result = maxSubArray(nums);
    cout << result << endl;
    return 0;
}`,
    RUST: `use std::io;

fn max_sub_array(nums: Vec<i32>) -> i32 {
    let mut max_so_far = nums[0];
    let mut max_ending_here = nums[0];
    for &num in nums.iter().skip(1) {
        max_ending_here = num.max(max_ending_here + num);
        max_so_far = max_so_far.max(max_ending_here);
    }
    max_so_far
}

fn main() {
    let mut input = String::new();
    io::stdin().read_line(&mut input).expect("Failed to read line");
    let nums: Vec<i32> = input
        .trim()
        .split_whitespace()
        .map(|s| s.parse().unwrap())
        .collect();

    let result = max_sub_array(nums);
    println!("{}", result);
}`,
    TYPESCRIPT: `// @ts-nocheck
function maxSubArray(nums: number[]): number {
  let maxSoFar = nums[0];
  let maxEndingHere = nums[0];
  for (let i = 1; i < nums.length; i++) {
    maxEndingHere = Math.max(nums[i], maxEndingHere + nums[i]);
    maxSoFar = Math.max(maxSoFar, maxEndingHere);
  }
  return maxSoFar;
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
  const result = maxSubArray(nums);
  console.log(result);
  rl.close();
});`,
  },
};