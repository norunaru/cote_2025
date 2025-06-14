/*
N개 수 1차원 배열
M개 이하 구간으로 나눠 "구간의 점수의 최댓값을 최소로" 하려고 함
조건
- 하나의 구간은 하나 이상의 연속된 수로 이루어짐
- 배열의 각 수는 모두 하나의 구간에 포함되어야

구간의 최댓값 - 최솟값 = 구간 점수
구간 점수들 모아놓고 Min으로 정답
*/

const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "./example.txt";
const input = fs.readFileSync(filePath).toString().trim().split("\n");

let [N, M] = input.shift().trim().split(" ").map(Number);
let arr = input.shift().trim().split(" ").map(Number);

function isPossible(maxDiff) {
  let minVal = arr[0];
  let maxVal = arr[0];
  let splitCnt = 1;

  for (let i = 1; i < N; i++) {
    minVal = Math.min(minVal, arr[i]);
    maxVal = Math.max(maxVal, arr[i]);

    if (maxVal - minVal > maxDiff) {
      splitCnt++;
      minVal = arr[i];
      maxVal = arr[i];
    }
  }

  return splitCnt <= M;
}

let left = 0;
let right = Math.max(...arr);
let ans = right;

while (left <= right) {
  let mid = Math.floor((left + right) / 2);

  if (isPossible(mid)) {
    ans = mid;
    right--;
  } else {
    left++;
  }
}

console.log(ans);
