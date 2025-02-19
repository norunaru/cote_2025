/*
2*n 타일링

<프로세스> 
dp[n] = dp[n-1] + dp[n-2];
*/

const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "./example.txt";
const input = fs.readFileSync(filePath).toString().trim().split("\n");

let N = Number(input);

let dp = new Array(1001).fill(0);

dp[0] = 1;
dp[1] = 1;

for (let i = 2; i <= N; i++) {
  dp[i] = (dp[i - 1] + dp[i - 2]) % 10007;
}

console.log(dp[N]);
