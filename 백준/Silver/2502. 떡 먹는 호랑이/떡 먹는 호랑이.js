const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "./example.txt";
const input = fs.readFileSync(filePath).toString().trim().split("\n");

let [D, K] = input[0].split(" ").map(Number);

let dp = new Array(D + 1).fill(0);

dp[D] = K;

A: for (let i = 1; i < K; i++) {
  dp[D - 2] = i;
  dp[D - 1] = K - i;

  for (let d = D - 3; d > 0; d--) {
    dp[d] = dp[d + 2] - dp[d + 1];

    if (dp[d] < 0 || dp[d] > dp[d + 1]) continue A;
  }

  //정답 찾았으면
  break;
}

console.log(dp[1]);
console.log(dp[2]);
