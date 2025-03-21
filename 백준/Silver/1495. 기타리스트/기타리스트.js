const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "./example.txt";
let input = fs.readFileSync(filePath).toString().trim().split("\n");

let [N, S, M] = input.shift().split(" ").map(Number);
// console.log(N, S, M);

let volumes = input.shift().split(" ").map(Number);
let ans = -1;
let dp = Array.from({ length: N + 1 }, () => new Array(M + 1).fill(0));

dp[0][S] = 1;
for (let i = 0; i < N; i++) {
  for (let j = 0; j < M + 1; j++) {
    if (dp[i][j] == 1) {
      let a = j - volumes[i]; //줄인 볼륨
      let b = j + volumes[i];
      //   console.log(a, b);

      if (a >= 0) dp[i + 1][a] = 1;
      if (b <= M) dp[i + 1][b] = 1;
    }
  }
}
// console.table(dp);

for (let i = 0; i < M + 1; i++) {
  if (dp[N][i] == 1) ans = i;
}

console.log(ans);
