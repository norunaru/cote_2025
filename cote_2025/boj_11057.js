/*
오르막 수

수의 자리가 오름차순, 인접 수 같아도 인정
수의 길이 N 주어질 떄 오르막 수 개수는?
숫자 0으로 시작 가능

[프로세스]
길이 N+1 배열 생성, 0으로 채우고 마지막에는 10 넣기
0~N-1 인덱스 값 0부터 9까지 증가 반복

오름차순 -> cnt +1
*/

const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "./example.txt";
const input = fs.readFileSync(filePath).toString().trim().split(" ");

let N = Number(input);
let dp = Array.from({ length: N + 1 }, () => new Array(10).fill(0));

for (let i = 0; i < 10; i++) {
  dp[1][i] = 1;
}

for (let i = 2; i <= N; i++) {
  for (let j = 0; j <= 9; j++) {
    dp[i][j] = dp[i - 1]
      .slice(0, j + 1)
      .reduce((acc, cur) => (acc + cur) % 10007, 0);
  }
}

// console.table(dp);
const result = dp[N].reduce((a, b) => (a + b) % 10007, 0);
console.log(result);
