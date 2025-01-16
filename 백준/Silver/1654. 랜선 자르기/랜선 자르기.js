/*
랜선자르기

N개 랜선 필요
자체적으로 K개 랜선 가짐, 길이 제각각
모두 N개의 같은 크기로 만들고 싶음 -> K개의 랜선 잘라야됨

기존 K개 랜선으로 N개 무조건 만들 수 있음
만들 수 있는 랜선의 최대길이?

가지고 있는 랜선의 개수 K, 그리고 필요한 랜선의 개수 N
K ≦ N 
K는 1이상 10,000이하의 정수이고, N은 1이상 1,000,000이하의 정수

<프로세스>
이분탐색?

정렬하고 left = 1, right = max로 시작
mid로 자를 경우 몫의 합 계산

합이 목표 개수보다 작다면 -> 더 짧게 잘라야됨 -> right = mid-1
합이 목표 개수보다 크다면 -> 더 길게 잘라야됨 -> left = mid+1

left<=right인 동안 반복
 */

let fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "./example.txt";
let input = fs.readFileSync(filePath).toString().split("\n");

[K, N] = input
  .shift()
  .trim()
  .split(" ")
  .map((v) => parseInt(v));

//갖고 있는 전선들
let lines = [];

for (let i = 0; i < K; i++) {
  lines.push(parseInt(input[i]));
}

lines.sort((a, b) => a - b);

let left = 1;
let right = lines[lines.length - 1];
let ans;

while (left <= right) {
  let cnt = 0;
  let mid = Math.floor((left + right) / 2);

  for (let i = 0; i < K; i++) {
    cnt += Math.floor(lines[i] / mid);
  }

  //결과물이 부족하면 더 짧게 자르기
  if (cnt < N) {
    right = mid - 1;
  }
  //결과물이 많으면 더 길게 자르기
  else {
    ans = mid;
    left = mid + 1;
  }
}

console.log(ans);
