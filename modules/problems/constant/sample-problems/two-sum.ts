// Two Sum — Array / Hash Map — EASY
export const sampleTwoSumProblem = {
  title: "Two Sum",
  description:
    "Given an array of integers nums and an integer target, return the indices of the two numbers such that they add up to target. You may assume that each input would have exactly one solution, and you may not use the same element twice. Return the answer as two space-separated integers on a single line.",
  difficulty: "EASY",
  tags: ["Array", "Hash Map"],
  constraints:
    "2 <= nums.length <= 10^4\n-10^9 <= nums[i] <= 10^9\n-10^9 <= target <= 10^9\nOnly one valid answer exists.",
  hints:
    "Use a hash map to store the complement (target - nums[i]) you have seen so far, mapping value to index.",
  editorial:
    "Iterate over the array once. For each number, check whether target - nums[i] already exists in the hash map; if it does, return its index together with i. Otherwise, store the current value and index. This yields an O(n) time, O(n) space solution.",
  testCases: [
    { input: "2 7 11 15\n9", output: "0 1" },
    { input: "3 2 4\n6", output: "1 2" },
    { input: "3 3\n6", output: "0 1" },
    { input: "8 1 5\n6", output: "1 2" },
  ],
  examples: {
    JAVASCRIPT: {
      input: "nums = [2,7,11,15], target = 9",
      output: "0 1",
      explanation:
        "nums[0] + nums[1] == 9, so we return [0, 1].",
    },
    PYTHON: {
      input: "nums = [2,7,11,15], target = 9",
      output: "0 1",
      explanation:
        "nums[0] + nums[1] == 9, so we return [0, 1].",
    },
    JAVA: {
      input: "nums = [2,7,11,15], target = 9",
      output: "0 1",
      explanation:
        "nums[0] + nums[1] == 9, so we return [0, 1].",
    },
    CPP: {
      input: "nums = [2,7,11,15], target = 9",
      output: "0 1",
      explanation:
        "nums[0] + nums[1] == 9, so we return [0, 1].",
    },
    RUST: {
      input: "nums = [2,7,11,15], target = 9",
      output: "0 1",
      explanation:
        "nums[0] + nums[1] == 9, so we return [0, 1].",
    },
    TYPESCRIPT: {
      input: "nums = [2,7,11,15], target = 9",
      output: "0 1",
      explanation:
        "nums[0] + nums[1] == 9, so we return [0, 1].",
    },
  },
  codeSnippets: {
    JAVASCRIPT: `/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
function twoSum(nums, target) {
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
  const nums = lines[0].trim().split(/\\s+/).map(Number);
  const target = Number(lines[1].trim());
  const result = twoSum(nums, target);
  console.log(result.join(' '));
});`,
    PYTHON: `from typing import List

class Solution:
    def twoSum(self, nums: List[int], target: int) -> List[int]:
        # Write your code here
        pass

# Input parsing
if __name__ == "__main__":
    import sys
    lines = sys.stdin.read().splitlines()
    nums = list(map(int, lines[0].split()))
    target = int(lines[1].strip())
    sol = Solution()
    result = sol.twoSum(nums, target)
    if result is not None:
        print(" ".join(map(str, result)))
    else:
        print("0 0")`,
    JAVA: `import java.util.*;

public class Main {
    public static int[] twoSum(int[] nums, int target) {
        // Write your code here
        return new int[0];
    }

    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        String[] numTokens = sc.nextLine().trim().split("\\\\s+");
        int[] nums = new int[numTokens.length];
        for (int i = 0; i < numTokens.length; i++) {
            nums[i] = Integer.parseInt(numTokens[i]);
        }
        int target = Integer.parseInt(sc.nextLine().trim());

        int[] result = twoSum(nums, target);
        if (result.length == 2) {
            System.out.println(result[0] + " " + result[1]);
        } else {
            System.out.println("0 0");
        }
    }
}`,
    CPP: `#include <iostream>
#include <vector>
#include <sstream>
#include <string>
#include <unordered_map>
using namespace std;

vector<int> twoSum(vector<int>& nums, int target) {
    // Write your code here
    return {};
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
    int target;
    cin >> target;

    vector<int> result = twoSum(nums, target);
    if (result.size() == 2) {
        cout << result[0] << " " << result[1] << endl;
    } else {
        cout << "0 0" << endl;
    }
    return 0;
}`,
    RUST: `use std::io;
use std::collections::HashMap;

fn two_sum(nums: Vec<i32>, target: i32) -> Vec<i32> {
    // Write your code here
    vec![]
}

fn main() {
    let mut lines = String::new();
    io::stdin().read_line(&mut lines).expect("Failed to read line");
    let nums: Vec<i32> = lines
        .trim()
        .split_whitespace()
        .map(|s| s.parse().unwrap())
        .collect();

    let mut target_line = String::new();
    io::stdin().read_line(&mut target_line).expect("Failed to read line");
    let target: i32 = target_line.trim().parse().unwrap();

    let result = two_sum(nums, target);
    if result.len() == 2 {
        println!("{} {}", result[0], result[1]);
    } else {
        println!("0 0");
    }
}`,
    TYPESCRIPT: `// @ts-nocheck
function twoSum(nums: number[], target: number): number[] {
  // Write your code here
  return [];
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
  const nums = lines[0].trim().split(/\\s+/).map(Number);
  const target = Number(lines[1].trim());
  const result = twoSum(nums, target);
  console.log(result.join(' '));
});`,
  },
  referenceSolutions: {
    JAVASCRIPT: `/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
function twoSum(nums, target) {
  const seen = new Map();
  for (let i = 0; i < nums.length; i++) {
    const complement = target - nums[i];
    if (seen.has(complement)) {
      return [seen.get(complement), i];
    }
    seen.set(nums[i], i);
  }
  return [];
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
  const nums = lines[0].trim().split(/\\s+/).map(Number);
  const target = Number(lines[1].trim());
  const result = twoSum(nums, target);
  console.log(result.join(' '));
});`,
    PYTHON: `from typing import List

class Solution:
    def twoSum(self, nums: List[int], target: int) -> List[int]:
        seen = {}
        for i, num in enumerate(nums):
            complement = target - num
            if complement in seen:
                return [seen[complement], i]
            seen[num] = i
        return []

# Input parsing
if __name__ == "__main__":
    import sys
    lines = sys.stdin.read().splitlines()
    nums = list(map(int, lines[0].split()))
    target = int(lines[1].strip())
    sol = Solution()
    result = sol.twoSum(nums, target)
    if result is not None:
        print(" ".join(map(str, result)))
    else:
        print("0 0")`,
    JAVA: `import java.util.HashMap;
import java.util.Scanner;

public class Main {
    public static int[] twoSum(int[] nums, int target) {
        HashMap<Integer, Integer> seen = new HashMap<>();
        for (int i = 0; i < nums.length; i++) {
            int complement = target - nums[i];
            if (seen.containsKey(complement)) {
                return new int[] { seen.get(complement), i };
            }
            seen.put(nums[i], i);
        }
        return new int[0];
    }

    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        String[] numTokens = sc.nextLine().trim().split("\\\\s+");
        int[] nums = new int[numTokens.length];
        for (int i = 0; i < numTokens.length; i++) {
            nums[i] = Integer.parseInt(numTokens[i]);
        }
        int target = Integer.parseInt(sc.nextLine().trim());

        int[] result = twoSum(nums, target);
        if (result.length == 2) {
            System.out.println(result[0] + " " + result[1]);
        } else {
            System.out.println("0 0");
        }
    }
}`,
    CPP: `#include <iostream>
#include <vector>
#include <unordered_map>
#include <sstream>
#include <string>
using namespace std;

vector<int> twoSum(vector<int>& nums, int target) {
    unordered_map<int, int> seen;
    for (int i = 0; i < (int)nums.size(); i++) {
        int complement = target - nums[i];
        if (seen.find(complement) != seen.end()) {
            return { seen[complement], i };
        }
        seen[nums[i]] = i;
    }
    return {};
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
    int target;
    cin >> target;

    vector<int> result = twoSum(nums, target);
    if (result.size() == 2) {
        cout << result[0] << " " << result[1] << endl;
    } else {
        cout << "0 0" << endl;
    }
    return 0;
}`,
    RUST: `use std::io;
use std::collections::HashMap;

fn two_sum(nums: Vec<i32>, target: i32) -> Vec<i32> {
    let mut seen = HashMap::new();
    for (i, &num) in nums.iter().enumerate() {
        let complement = target - num;
        if let Some(&j) = seen.get(&complement) {
            return vec![j as i32, i as i32];
        }
        seen.insert(num, i);
    }
    vec![]
}

fn main() {
    let mut lines = String::new();
    io::stdin().read_line(&mut lines).expect("Failed to read line");
    let nums: Vec<i32> = lines
        .trim()
        .split_whitespace()
        .map(|s| s.parse().unwrap())
        .collect();

    let mut target_line = String::new();
    io::stdin().read_line(&mut target_line).expect("Failed to read line");
    let target: i32 = target_line.trim().parse().unwrap();

    let result = two_sum(nums, target);
    if result.len() == 2 {
        println!("{} {}", result[0], result[1]);
    } else {
        println!("0 0");
    }
}`,
    TYPESCRIPT: `// @ts-nocheck
function twoSum(nums: number[], target: number): number[] {
  const seen = new Map<number, number>();
  for (let i = 0; i < nums.length; i++) {
    const complement = target - nums[i];
    if (seen.has(complement)) {
      return [seen.get(complement)!, i];
    }
    seen.set(nums[i], i);
  }
  return [];
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
  const nums = lines[0].trim().split(/\\s+/).map(Number);
  const target = Number(lines[1].trim());
  const result = twoSum(nums, target);
  console.log(result.join(' '));
});`,
  },
};