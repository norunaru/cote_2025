/*
기타리스트

N개 곡 연주
곡 시작하기 전 볼륨 변경

각 곡이 시작하기 전 바꿀 수 있는 볼륨 리스트 V
V[i] = i번째 곡 연주하기 전 바꿀 수 있는 볼륨
항상 적힌 차이로만 볼륨 변경 가능
-> 현재 P면 P+V[i] / P-V[i]

0보다 작거나 M보다 큰 값으로 변경 불가

dp
*/

const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "./example.txt";
const input = fs.readFileSync(filePath).toString().trim().split("\n");

let [N, S, M] = input[0].trim().split(" ").map(Number);
let vol = input[1].trim().split(" ").map(Number);

let dp = Array.from({ length: N + 1 }, () => new Array(M + 1).fill(0));
dp[0][S] = 1;

// console.table(dp);

for (let i = 0; i < N; i++) {
  for (let j = 0; j < M + 1; j++) {
    if (dp[i][j] == 1) {
      let left = j - vol[i];
      let right = j + vol[i];
      //   console.log("cur:", j, "vol:", vol[i]);
      //   console.log("left:", left, "right:", right);

      if (left >= 0) dp[i + 1][left] = 1;
      if (right <= M) dp[i + 1][right] = 1;
    }
  }
}

let ans = -1;
for (let j = 0; j <= M; j++) {
  if (dp[N][j] == 1) ans = j;
}

console.log(ans);
