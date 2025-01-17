/*
연속합

n개 정수로 이루어진 수열
연속으로 몇 개 선택해서 가장 큰 합은?
최소 한개 선택
n<=1000000

<프로세스>
dp[i] = dp[i-1]+nums[i] > nums[i] ? dp[i-1]+nums[i] : nums[i]
10 -4 3 1 5 6 -35 12 21 -1
10 10 9 10 15 
*/

let fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "./example.txt";
let input = fs.readFileSync(filePath).toString().trim().split("\n");

let N = parseInt(input[0]);
let arr = input[1].split(" ").map((v) => parseInt(v));
let dp = new Array(N).fill(0);
dp[0] = arr[0];

for (let i = 1; i < N; i++) {
  dp[i] = dp[i - 1] + arr[i] > arr[i] ? dp[i - 1] + arr[i] : arr[i];
}

// console.log(JSON.stringify(dp));
console.log(Math.max(...dp));
