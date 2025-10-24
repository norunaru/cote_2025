/*
가장 큰 증가하는 부분 수열
수열 A, 중간중간 뽑아서 누적

가장 큰 결과값?

[프로세스]
dp
인덱스 i에 대해 j(0~i-1)까지 값 탐색, 
arr[j] < arr[i]일 경우 dp[i], dp[j] + arr[i] 중 큰 값으로 대체

*/
// const fs = require("fs");
// const filePath = process.platform === "linux" ? "/dev/stdin" : "./example.txt";
// const input = fs.readFileSync(filePath).toString().trim().split("\n");

// let N = Number(input.shift().trim());
// let arr = input.shift().trim().split(" ").map(Number);
// let dp = [...arr];

// for (let i = 0; i < N; i++) {
//   for (let j = 0; j < i; j++) {
//     if (arr[j] < arr[i]) {
//       dp[i] = Math.max(dp[i], dp[j] + arr[i]);
//     }
//   }
// }

// console.log(Math.max(...dp));

const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "./example.txt";
const input = fs.readFileSync(filePath).toString().trim().split("\n");

let N = Number(input.shift().trim());
let arr = input.shift().trim().split(" ").map(Number);
let dp = [...arr];

for (let i = 0; i < N; i++) {
  for (let j = 0; j < i; j++) {
    if (arr[i] > arr[j]) {
      dp[i] = Math.max(dp[i], dp[j] + arr[i]);
    }
  }
}

console.log(Math.max(...dp));
