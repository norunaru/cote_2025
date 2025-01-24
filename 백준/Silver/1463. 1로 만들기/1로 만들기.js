/*
1로 만들기

정수 X에 연산 종류 3개
1. 3으로 나눠 떨어지면 3으로 나누기
2. 2로 나눠 떨어지면 2로 나누기
3. -1

N주어졌을 때 1로 만드는 최소 연산 횟수는?

N+1 크기 배열 생성
인덱스 1부터 시작, 각 인덱스 순회

현 인덱스 %3, %2, -1순으로 계산, 이전 인덱스 +1
*/
let fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "./example.txt";
let input = parseInt(fs.readFileSync(filePath).toString().trim());

let dp = new Array(input + 1).fill(0);

// 1은 0번 연산 필요, 2부터 시작
for (let i = 2; i <= input; i++) {
  dp[i] = dp[i - 1] + 1; // 기본적으로 -1 연산

  if (i % 2 === 0) {
    dp[i] = Math.min(dp[i], dp[i / 2] + 1);
  }
  if (i % 3 === 0) {
    dp[i] = Math.min(dp[i], dp[i / 3] + 1);
  }
}

console.log(dp[input]);
