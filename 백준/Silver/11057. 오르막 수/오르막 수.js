const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "./example.txt";
const input = fs.readFileSync(filePath).toString().trim();

let N = Number(input);
const MOD = 10007;

let dp = Array.from({ length: N + 1 }, () => new Array(10).fill(0));

for (let i = 0; i < 10; i++) {
  dp[1][i] = 1;
}

for (let i = 2; i <= N; i++) {
  for (let j = 0; j <= 9; j++) {
    dp[i][j] = dp[i - 1].slice(0, j + 1).reduce((acc, cur) => (acc + cur) % MOD, 0);
  }
}

const result = dp[N].reduce((a, b) => (a + b) % MOD, 0);
console.log(result);
