/*
도영이가 만든 맛있는 음식

재료 N개, 각 신맛 S, 쓴맛 B
재료 섞으면 음식 = 신맛들 곱, 쓴맛은 합

신맛, 쓴맛 차이 작게
재료 최소 1개


첫째 줄에 재료의 개수 N(1 ≤ N ≤ 10)
N개 줄에는 그 재료의 신맛과 쓴맛이 공백으로 구분

<프로세스> 
재귀로 부분집합 생성, 깊어질 때마다 계산
*/

let fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "./example.txt";
let input = fs.readFileSync(filePath).toString().trim().split("\n");

let ans = Number.MAX_VALUE;

let N = parseInt(input.shift());
let foods = new Array(N).fill(null).map(() => new Array(2).fill(0));

//재료 정보 생성
for (let i = 0; i < N; i++) {
  let cur = input[i];
  let [s, b] = cur.split(" ");
  foods[i][0] = parseInt(s);
  foods[i][1] = parseInt(b);
}

//부분집합
function subset(i, sourMul, bitterSum, isSelected) {
  if (i == N) {
    if (isSelected) {
      let temp = Math.abs(sourMul - bitterSum);
      if (temp < ans) ans = temp;
    }
    return;
  }

  //현재 재료 사용 X
  subset(i + 1, sourMul, bitterSum, isSelected);

  //현재 재료 사용 O
  subset(i + 1, sourMul * foods[i][0], bitterSum + foods[i][1], true);
}

subset(0, 1, 0, false);

console.log(ans);
