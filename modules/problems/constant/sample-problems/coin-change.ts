// Coin Change — Array / Dynamic Programming / Breadth-First Search — MEDIUM
export const sampleCoinChangeProblem = {
  title: "Coin Change",
  description:
    "You are given an array of integers coins representing coins of different denominations and an integer amount representing a total amount of money. Return the fewest number of coins that you need to make up that amount, or -1 if that amount cannot be made up by any combination of the coins. You may assume that you have an infinite number of each kind of coin.",
  difficulty: "MEDIUM",
  tags: ["Array", "Dynamic Programming", "Breadth-First Search"],
  constraints:
    "1 <= coins.length <= 12\n1 <= coins[i] <= 2^31 - 1\n0 <= amount <= 10^4",
  hints:
    "Think about the minimum number of coins needed for every amount from 0 up to the target, using a dynamic programming table.",
  editorial:
    "Let dp[i] be the fewest number of coins needed to make amount i. Initialize dp[0] = 0 and every other entry to infinity. For each amount, try every coin; if the coin is not larger than the amount, update dp[i] = min(dp[i], dp[i - coin] + 1). If dp[amount] is still infinity after processing, no combination exists and the answer is -1.",
  testCases: [
    { input: "1 2 5\n11", output: "3" },
    { input: "2\n3", output: "-1" },
    { input: "1\n0", output: "0" },
    { input: "1 2 5\n7", output: "2" },
  ],
  examples: {
    JAVASCRIPT: {
      input: "coins = [1,2,5], amount = 11",
      output: "3",
      explanation: "11 = 5 + 5 + 1, so the fewest coins needed is 3.",
    },
    PYTHON: {
      input: "coins = [1,2,5], amount = 11",
      output: "3",
      explanation: "11 = 5 + 5 + 1, so the fewest coins needed is 3.",
    },
    JAVA: {
      input: "coins = [1,2,5], amount = 11",
      output: "3",
      explanation: "11 = 5 + 5 + 1, so the fewest coins needed is 3.",
    },
    CPP: {
      input: "coins = [1,2,5], amount = 11",
      output: "3",
      explanation: "11 = 5 + 5 + 1, so the fewest coins needed is 3.",
    },
    RUST: {
      input: "coins = [1,2,5], amount = 11",
      output: "3",
      explanation: "11 = 5 + 5 + 1, so the fewest coins needed is 3.",
    },
    TYPESCRIPT: {
      input: "coins = [1,2,5], amount = 11",
      output: "3",
      explanation: "11 = 5 + 5 + 1, so the fewest coins needed is 3.",
    },
  },
  codeSnippets: {
    JAVASCRIPT: `/**
 * @param {number[]} coins
 * @param {number} amount
 * @return {number}
 */
function coinChange(coins, amount) {
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
  const coins = lines[0].trim().split(/\\s+/).map(Number);
  const amount = Number(lines[1].trim());
  const result = coinChange(coins, amount);
  console.log(result);
});`,
    PYTHON: `from typing import List

class Solution:
    def coinChange(self, coins: List[int], amount: int) -> int:
        # Write your code here
        pass

# Input parsing
if __name__ == "__main__":
    import sys
    lines = sys.stdin.read().splitlines()
    coins = list(map(int, lines[0].split()))
    amount = int(lines[1].strip())
    sol = Solution()
    result = sol.coinChange(coins, amount)
    print(result)`,
    JAVA: `import java.util.*;

public class Main {
    public static int coinChange(int[] coins, int amount) {
        // Write your code here
        return 0;
    }

    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        String[] coinTokens = sc.nextLine().trim().split("\\\\s+");
        int[] coins = new int[coinTokens.length];
        for (int i = 0; i < coinTokens.length; i++) {
            coins[i] = Integer.parseInt(coinTokens[i]);
        }
        int amount = Integer.parseInt(sc.nextLine().trim());

        int result = coinChange(coins, amount);
        System.out.println(result);
    }
}`,
    CPP: `#include <iostream>
#include <vector>
#include <sstream>
#include <string>
#include <climits>
#include <algorithm>
using namespace std;

int coinChange(vector<int>& coins, int amount) {
    // Write your code here
    return 0;
}

int main() {
    string line;
    getline(cin, line);
    stringstream ss(line);
    vector<int> coins;
    int coin;
    while (ss >> coin) {
        coins.push_back(coin);
    }
    int amount;
    cin >> amount;

    int result = coinChange(coins, amount);
    cout << result << endl;
    return 0;
}`,
    RUST: `use std::io;

fn coin_change(coins: Vec<i32>, amount: i32) -> i32 {
    // Write your code here
    0
}

fn main() {
    let mut coins_line = String::new();
    io::stdin().read_line(&mut coins_line).expect("Failed to read line");
    let coins: Vec<i32> = coins_line
        .trim()
        .split_whitespace()
        .map(|s| s.parse().unwrap())
        .collect();

    let mut amount_line = String::new();
    io::stdin().read_line(&mut amount_line).expect("Failed to read line");
    let amount: i32 = amount_line.trim().parse().unwrap();

    let result = coin_change(coins, amount);
    println!("{}", result);
}`,
    TYPESCRIPT: `// @ts-nocheck
function coinChange(coins: number[], amount: number): number {
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
  const coins = lines[0].trim().split(/\\s+/).map(Number);
  const amount = Number(lines[1].trim());
  const result = coinChange(coins, amount);
  console.log(result);
});`,
  },
  referenceSolutions: {
    JAVASCRIPT: `/**
 * @param {number[]} coins
 * @param {number} amount
 * @return {number}
 */
function coinChange(coins, amount) {
  const dp = new Array(amount + 1).fill(Infinity);
  dp[0] = 0;
  for (let i = 1; i <= amount; i++) {
    for (const coin of coins) {
      if (coin <= i) {
        dp[i] = Math.min(dp[i], dp[i - coin] + 1);
      }
    }
  }
  return dp[amount] === Infinity ? -1 : dp[amount];
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
  const coins = lines[0].trim().split(/\\s+/).map(Number);
  const amount = Number(lines[1].trim());
  const result = coinChange(coins, amount);
  console.log(result);
});`,
    PYTHON: `from typing import List

class Solution:
    def coinChange(self, coins: List[int], amount: int) -> int:
        dp = [float("inf")] * (amount + 1)
        dp[0] = 0
        for i in range(1, amount + 1):
            for coin in coins:
                if coin <= i:
                    dp[i] = min(dp[i], dp[i - coin] + 1)
        return -1 if dp[amount] == float("inf") else dp[amount]

# Input parsing
if __name__ == "__main__":
    import sys
    lines = sys.stdin.read().splitlines()
    coins = list(map(int, lines[0].split()))
    amount = int(lines[1].strip())
    sol = Solution()
    result = sol.coinChange(coins, amount)
    print(result)`,
    JAVA: `import java.util.Arrays;
import java.util.Scanner;

public class Main {
    public static int coinChange(int[] coins, int amount) {
        int[] dp = new int[amount + 1];
        Arrays.fill(dp, Integer.MAX_VALUE);
        dp[0] = 0;
        for (int i = 1; i <= amount; i++) {
            for (int coin : coins) {
                if (coin <= i && dp[i - coin] != Integer.MAX_VALUE) {
                    dp[i] = Math.min(dp[i], dp[i - coin] + 1);
                }
            }
        }
        return dp[amount] == Integer.MAX_VALUE ? -1 : dp[amount];
    }

    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        String[] coinTokens = sc.nextLine().trim().split("\\\\s+");
        int[] coins = new int[coinTokens.length];
        for (int i = 0; i < coinTokens.length; i++) {
            coins[i] = Integer.parseInt(coinTokens[i]);
        }
        int amount = Integer.parseInt(sc.nextLine().trim());

        int result = coinChange(coins, amount);
        System.out.println(result);
    }
}`,
    CPP: `#include <iostream>
#include <vector>
#include <sstream>
#include <string>
#include <climits>
#include <algorithm>
using namespace std;

int coinChange(vector<int>& coins, int amount) {
    vector<int> dp(amount + 1, INT_MAX);
    dp[0] = 0;
    for (int i = 1; i <= amount; i++) {
        for (int coin : coins) {
            if (coin <= i && dp[i - coin] != INT_MAX) {
                dp[i] = min(dp[i], dp[i - coin] + 1);
            }
        }
    }
    return dp[amount] == INT_MAX ? -1 : dp[amount];
}

int main() {
    string line;
    getline(cin, line);
    stringstream ss(line);
    vector<int> coins;
    int coin;
    while (ss >> coin) {
        coins.push_back(coin);
    }
    int amount;
    cin >> amount;

    int result = coinChange(coins, amount);
    cout << result << endl;
    return 0;
}`,
    RUST: `use std::io;

fn coin_change(coins: Vec<i32>, amount: i32) -> i32 {
    let amount = amount as usize;
    let mut dp = vec![std::i32::MAX; amount + 1];
    dp[0] = 0;
    for i in 1..=amount {
        for &coin in &coins {
            let coin = coin as usize;
            if coin <= i && dp[i - coin] != std::i32::MAX {
                dp[i] = dp[i].min(dp[i - coin] + 1);
            }
        }
    }
    if dp[amount] == std::i32::MAX { -1 } else { dp[amount] }
}

fn main() {
    let mut coins_line = String::new();
    io::stdin().read_line(&mut coins_line).expect("Failed to read line");
    let coins: Vec<i32> = coins_line
        .trim()
        .split_whitespace()
        .map(|s| s.parse().unwrap())
        .collect();

    let mut amount_line = String::new();
    io::stdin().read_line(&mut amount_line).expect("Failed to read line");
    let amount: i32 = amount_line.trim().parse().unwrap();

    let result = coin_change(coins, amount);
    println!("{}", result);
}`,
    TYPESCRIPT: `// @ts-nocheck
function coinChange(coins: number[], amount: number): number {
  const dp: number[] = new Array(amount + 1).fill(Infinity);
  dp[0] = 0;
  for (let i = 1; i <= amount; i++) {
    for (const coin of coins) {
      if (coin <= i) {
        dp[i] = Math.min(dp[i], dp[i - coin] + 1);
      }
    }
  }
  return dp[amount] === Infinity ? -1 : dp[amount];
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
  const coins = lines[0].trim().split(/\\s+/).map(Number);
  const amount = Number(lines[1].trim());
  const result = coinChange(coins, amount);
  console.log(result);
});`,
  },
};