/*
정해진 총액 이하에서 가능한 한 최대의 예산을 배정
1. 모든 요청 배정 가능한 경우 그대로 배정
2. 안되면 정수 상한액 계산, 그 이상인 요청에는 모두 상한액 배정
상안행 이하의 경우 요청 금액 배정

[프로세스]
예산 N개 합 계산 
M 이하이면 N개중 최대

이상이면 이분탐색

*/

const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "./example.txt";
const input = fs.readFileSync(filePath).toString().trim().split("\n");

let N = Number(input.shift().trim());
let arr = input.shift().trim().split(" ").map(Number);
let M = Number(input.shift().trim());

let requireSum = arr.reduce((a, b) => a + b, 0); //요청 예산 총액

// console.log("예산 총액:", M);

if (requireSum <= M) {
  console.log(Math.max(...arr));
  return;
}

let left = 0;
let right = Math.max(...arr);
let mid; //상한선
let ans;

while (left <= right) {
  let temp = [];
  mid = Math.round((left + right) / 2);

  for (let i = 0; i < N; i++) {
    if (arr[i] <= mid) {
      temp.push(arr[i]);
    } else {
      temp.push(mid);
    }
  }
  let tempSum = temp.reduce((a, b) => a + b, 0);
  // console.log("left:", left, "right:", right);
  // console.log("mid:", mid, "tempSum:", tempSum);

  if (tempSum <= M) {
    left = mid + 1;
    ans = mid;
  } else {
    right = mid - 1;
  }
}

console.log(ans);
