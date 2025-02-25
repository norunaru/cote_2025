/*
떡 먹는 호랑이

호랑이는 어제 받은 떡 + 그저께 받은 떡만큼 받아야 통과

오늘 몇개 줬는지, 오늘이 며칠째인지 알고있음
D번째날에 준 떡 개수가 K개면 처음 만난 날에 준 개수 A, 다음날에 준 개수 B를 구하라
1<=A<=B

<프로세스>
dp[i] = dp[i-1] + dp[i-2]


*/

const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "./example.txt";
const input = fs.readFileSync(filePath).toString().trim().split("\n");

let [D, K] = input[0].split(" ").map(Number);

let dp = new Array(D + 1).fill(0);

// console.log(JSON.stringify(dp));

for (let i = 1; i < K; i++) {
  for (let j = i; j < K; j++) {
    dp[1] = i;
    dp[2] = j;

    for (let d = 3; d <= D; d++) {
      dp[d] = dp[d - 1] + dp[d - 2];
    }

    if (dp[D] == K) {
      console.log(dp[1]);
      console.log(dp[2]);

      process.exit(0);
    }
  }
}
