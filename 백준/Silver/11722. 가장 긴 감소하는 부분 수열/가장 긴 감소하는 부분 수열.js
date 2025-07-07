/*
가장 긴 감소하는 부분 수열
수열 A, 중간중간 뽑아서 길이 측정

[프로세스]
dp
dp[i] = i번쨰 숫자가 마지막인 수열의 최대 길이
i -> 0~j
*/

const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "./example.txt";
const input = fs.readFileSync(filePath).toString().trim().split("\n");

let N = Number(input.shift().trim());
let arr = input.shift().trim().split(" ").map(Number);
let dp = new Array(N).fill(1);

for (let i = 0; i < N; i++) {
  for (let j = 0; j < i; j++) {
    if (arr[j] > arr[i]) {
      dp[i] = Math.max(dp[i], dp[j] + 1);
    }
  }
}

console.log(Math.max(...dp));
