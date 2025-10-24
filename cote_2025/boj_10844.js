/*
인접한 모든 자리 차이가 1인 수 = 계단 수

길이 N인 계단 수 총 개수는?
0시작은 계단 수 X

dp[n][m] = n자리 숫자의 끝자리가 m인 경우의 계단 수 개수 
= dp[n-1][m-1] + dp[n-1][m+1]

dp[2,2] = dp[1][1] + dp[1][3]

?2
= 12, 32

?4
= 34, 54

??3

*/ const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "./example.txt";
const input = fs.readFileSync(filePath).toString().trim();

const N = Number(input);
const MOD = 1_000_000_000;

const dp = Array.from({ length: N + 1 }, () => Array(10).fill(0));

for (let i = 1; i <= 9; i++) {
  dp[1][i] = 1;
}

// DP 점화식 적용
for (let i = 2; i <= N; i++) {
  for (let j = 0; j <= 9; j++) {
    if (j === 0) {
      dp[i][j] = dp[i - 1][1];
    } else if (j === 9) {
      dp[i][j] = dp[i - 1][8];
    } else {
      dp[i][j] = (dp[i - 1][j - 1] + dp[i - 1][j + 1]) % MOD;
    }
  }
}

// 최종 결과 계산
const result = dp[N].reduce((acc, val) => (acc + val) % MOD, 0);
console.log(result);
