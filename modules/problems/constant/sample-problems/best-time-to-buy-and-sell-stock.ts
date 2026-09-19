// Best Time to Buy and Sell Stock — Array / Greedy / Dynamic Programming — EASY
export const sampleBestTimeToBuyAndSellStockProblem = {
  title: "Best Time to Buy and Sell Stock",
  description:
    "You are given an array prices where prices[i] is the price of a given stock on the ith day. You want to maximize your profit by choosing a single day to buy one stock and choosing a different day in the future to sell that stock. Return the maximum profit you can achieve from this transaction; if no profit can be achieved, return 0. The input is a single line of space-separated integers; output the maximum profit as a single integer.",
  difficulty: "EASY",
  tags: ["Array", "Greedy", "Dynamic Programming"],
  constraints: "1 <= prices.length <= 10^5\n0 <= prices[i] <= 10^4",
  hints:
    "Track the minimum price seen so far, and update the maximum profit each day by selling at the current price.",
  editorial:
    "Scan the prices array once, keeping the minimum price seen so far. For each day, the profit from selling that day is prices[i] minus the minimum price; update the best profit whenever it is larger. This gives the maximum profit in O(n) time and O(1) space.",
  testCases: [
    { input: "7 1 5 3 6 4", output: "5" },
    { input: "7 6 4 3 1", output: "0" },
    { input: "2 4 1", output: "2" },
    { input: "1", output: "0" },
  ],
  examples: {
    JAVASCRIPT: {
      input: "prices = [7,1,5,3,6,4]",
      output: "5",
      explanation:
        "Buy on day 2 (price = 1) and sell on day 5 (price = 6), profit = 6 - 1 = 5.",
    },
    PYTHON: {
      input: "prices = [7,1,5,3,6,4]",
      output: "5",
      explanation:
        "Buy on day 2 (price = 1) and sell on day 5 (price = 6), profit = 6 - 1 = 5.",
    },
    JAVA: {
      input: "prices = [7,1,5,3,6,4]",
      output: "5",
      explanation:
        "Buy on day 2 (price = 1) and sell on day 5 (price = 6), profit = 6 - 1 = 5.",
    },
    CPP: {
      input: "prices = [7,1,5,3,6,4]",
      output: "5",
      explanation:
        "Buy on day 2 (price = 1) and sell on day 5 (price = 6), profit = 6 - 1 = 5.",
    },
    RUST: {
      input: "prices = [7,1,5,3,6,4]",
      output: "5",
      explanation:
        "Buy on day 2 (price = 1) and sell on day 5 (price = 6), profit = 6 - 1 = 5.",
    },
    TYPESCRIPT: {
      input: "prices = [7,1,5,3,6,4]",
      output: "5",
      explanation:
        "Buy on day 2 (price = 1) and sell on day 5 (price = 6), profit = 6 - 1 = 5.",
    },
  },
  codeSnippets: {
    JAVASCRIPT: `/**
 * @param {number[]} prices
 * @return {number}
 */
function maxProfit(prices) {
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
  const prices = line.trim().split(/\\s+/).map(Number);
  const result = maxProfit(prices);
  console.log(result);
  rl.close();
});`,
    PYTHON: `from typing import List

class Solution:
    def maxProfit(self, prices: List[int]) -> int:
        # Write your code here
        pass

# Input parsing
if __name__ == "__main__":
    import sys
    prices = list(map(int, sys.stdin.readline().split()))
    sol = Solution()
    result = sol.maxProfit(prices)
    print(result)`,
    JAVA: `import java.util.*;

public class Main {
    public static int maxProfit(int[] prices) {
        // Write your code here
        return 0;
    }

    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        String line = sc.nextLine().trim();
        String[] tokens = line.split("\\\\s+");
        int[] prices = new int[tokens.length];
        for (int i = 0; i < tokens.length; i++) {
            prices[i] = Integer.parseInt(tokens[i]);
        }

        int result = maxProfit(prices);
        System.out.println(result);
    }
}`,
    CPP: `#include <iostream>
#include <vector>
#include <sstream>
#include <string>
#include <algorithm>
using namespace std;

int maxProfit(vector<int>& prices) {
    // Write your code here
    return 0;
}

int main() {
    string line;
    getline(cin, line);
    stringstream ss(line);
    vector<int> prices;
    int num;
    while (ss >> num) {
        prices.push_back(num);
    }

    int result = maxProfit(prices);
    cout << result << endl;
    return 0;
}`,
    RUST: `use std::io;

fn max_profit(prices: Vec<i32>) -> i32 {
    // Write your code here
    0
}

fn main() {
    let mut input = String::new();
    io::stdin().read_line(&mut input).expect("Failed to read line");
    let prices: Vec<i32> = input
        .trim()
        .split_whitespace()
        .map(|s| s.parse().unwrap())
        .collect();

    let result = max_profit(prices);
    println!("{}", result);
}`,
    TYPESCRIPT: `// @ts-nocheck
function maxProfit(prices: number[]): number {
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
  const prices = line.trim().split(/\\s+/).map(Number);
  const result = maxProfit(prices);
  console.log(result);
  rl.close();
});`,
  },
  referenceSolutions: {
    JAVASCRIPT: `/**
 * @param {number[]} prices
 * @return {number}
 */
function maxProfit(prices) {
  let minPrice = Infinity;
  let maxProfit = 0;
  for (const price of prices) {
    if (price < minPrice) {
      minPrice = price;
    } else if (price - minPrice > maxProfit) {
      maxProfit = price - minPrice;
    }
  }
  return maxProfit;
}

// Input parsing
const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  terminal: false
});

rl.on('line', (line) => {
  const prices = line.trim().split(/\\s+/).map(Number);
  const result = maxProfit(prices);
  console.log(result);
  rl.close();
});`,
    PYTHON: `from typing import List

class Solution:
    def maxProfit(self, prices: List[int]) -> int:
        min_price = float("inf")
        max_profit = 0
        for price in prices:
            if price < min_price:
                min_price = price
            elif price - min_price > max_profit:
                max_profit = price - min_price
        return max_profit

# Input parsing
if __name__ == "__main__":
    import sys
    prices = list(map(int, sys.stdin.readline().split()))
    sol = Solution()
    result = sol.maxProfit(prices)
    print(result)`,
    JAVA: `import java.util.Scanner;

public class Main {
    public static int maxProfit(int[] prices) {
        int minPrice = Integer.MAX_VALUE;
        int maxProfit = 0;
        for (int price : prices) {
            if (price < minPrice) {
                minPrice = price;
            } else if (price - minPrice > maxProfit) {
                maxProfit = price - minPrice;
            }
        }
        return maxProfit;
    }

    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        String line = sc.nextLine().trim();
        String[] tokens = line.split("\\\\s+");
        int[] prices = new int[tokens.length];
        for (int i = 0; i < tokens.length; i++) {
            prices[i] = Integer.parseInt(tokens[i]);
        }

        int result = maxProfit(prices);
        System.out.println(result);
    }
}`,
    CPP: `#include <iostream>
#include <vector>
#include <sstream>
#include <string>
#include <climits>
using namespace std;

int maxProfit(vector<int>& prices) {
    int minPrice = INT_MAX;
    int maxProfit = 0;
    for (int price : prices) {
        if (price < minPrice) {
            minPrice = price;
        } else if (price - minPrice > maxProfit) {
            maxProfit = price - minPrice;
        }
    }
    return maxProfit;
}

int main() {
    string line;
    getline(cin, line);
    stringstream ss(line);
    vector<int> prices;
    int num;
    while (ss >> num) {
        prices.push_back(num);
    }

    int result = maxProfit(prices);
    cout << result << endl;
    return 0;
}`,
    RUST: `use std::io;

fn max_profit(prices: Vec<i32>) -> i32 {
    let mut min_price = std::i32::MAX;
    let mut max_profit = 0;
    for price in prices {
        if price < min_price {
            min_price = price;
        } else if price - min_price > max_profit {
            max_profit = price - min_price;
        }
    }
    max_profit
}

fn main() {
    let mut input = String::new();
    io::stdin().read_line(&mut input).expect("Failed to read line");
    let prices: Vec<i32> = input
        .trim()
        .split_whitespace()
        .map(|s| s.parse().unwrap())
        .collect();

    let result = max_profit(prices);
    println!("{}", result);
}`,
    TYPESCRIPT: `// @ts-nocheck
function maxProfit(prices: number[]): number {
  let minPrice = Infinity;
  let maxProfit = 0;
  for (const price of prices) {
    if (price < minPrice) {
      minPrice = price;
    } else if (price - minPrice > maxProfit) {
      maxProfit = price - minPrice;
    }
  }
  return maxProfit;
}

// Input parsing
const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  terminal: false
});

rl.on('line', (line: string) => {
  const prices = line.trim().split(/\\s+/).map(Number);
  const result = maxProfit(prices);
  console.log(result);
  rl.close();
});`,
  },
};