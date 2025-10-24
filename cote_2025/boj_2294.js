/*
동전2 

n종류 동전, 적당히 사용해서 가치 합이 k원 되도록, 동전 개수는 최소가 되게 

[프로세스]
dp
0~k원까지 일차원 배열, infinity
주어진 가격 동전은 1로 초기화


*/

const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "./example.txt";
const input = fs.readFileSync(filePath).toString().trim().split("\n");

let [n, k] = input.shift().trim().split(" ").map(Number);

let dp = new Array(k + 1).fill(Infinity);
let values = [];

for (let i = 0; i < n; i++) {
  values.push(Number(input[i].trim()));
}

for (let v of values) {
  dp[v] = 1;
}

// // console.log(JSON.stringify(dp));

for (let p = 0; p <= k; p++) {
  for (v of values) {
    if (p - v >= 0 && dp[p - v] != Infinity) {
      dp[p] = Math.min(dp[p], dp[p - v] + 1);
    }
  }
}
console.table(dp);

if (dp[k] == Infinity) {
  console.log(-1);
} else {
  console.log(dp[k]);
}
