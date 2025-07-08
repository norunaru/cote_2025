/*
호텔

도시 별 홍보 비용, 몇 명 고객 늘어나는지 주어짐
각 도시에 무한 명의 잠재 고객, 호텔 고객을 최소 C명 늘리기 위해 투자해야 하는 돈의 최솟값

[프로세스]
dp
인덱스 = 사람 수
값 = 비용
*/

const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "./example.txt";
const input = fs.readFileSync(filePath).toString().trim().split("\n");

let [C, N] = input.shift().trim().split(" ").map(Number);
values = [];

let max = 0;
for (let i = 0; i < N; i++) {
  let [cost, nums] = input[i].trim().split(" ").map(Number);
  values.push([cost, nums]);
  max = Math.max(max, nums);
}
dp = new Array(C + max + 1).fill(Infinity);

for (let [cost, nums] of values) {
  dp[nums] = cost;
}
dp[0] = 0;

values.sort((a, b) => a[1] - b[1]);

for (let [cost, nums] of values) {
  for (let i = 0; i < dp.length - nums; i++) {
    if (dp[i] + cost < dp[i + nums]) {
      dp[i + nums] = dp[i] + cost;
    }
  }
}

let ans = dp.slice(C, dp.length);

console.log(Math.min(...ans));
