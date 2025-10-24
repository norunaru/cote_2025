/*
체스판 다시 칠하기

M*N 보드 -> 잘라서 8*8 체스판으로
잘랐을 때 다시 칠해야 하는 정사각형의 최소 개수는?

<프로세스>
시작점 : 0~M-8, 0~N-8
ans = Math.maxVal

시작점이 흰색인 보드와 검은색인 보드 생성

자른 보드랑 흰,검 보드 비교, 다른개수 구하고 ans로
*/

const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "./example.txt";
const input = fs.readFileSync(filePath).toString().trim().split("\n");

let [N, M] = input
  .shift()
  .split(" ")
  .map((v) => parseInt(v));

let arr = [];
let ans = Number.MAX_VALUE;

for (let i = 0; i < N; i++) {
  arr.push(input[i].trim().split(""));
}

// console.table(arr);

const White = [
  ["W", "B", "W", "B", "W", "B", "W", "B"],
  ["B", "W", "B", "W", "B", "W", "B", "W"],
  ["W", "B", "W", "B", "W", "B", "W", "B"],
  ["B", "W", "B", "W", "B", "W", "B", "W"],
  ["W", "B", "W", "B", "W", "B", "W", "B"],
  ["B", "W", "B", "W", "B", "W", "B", "W"],
  ["W", "B", "W", "B", "W", "B", "W", "B"],
  ["B", "W", "B", "W", "B", "W", "B", "W"],
];

const Black = [
  ["B", "W", "B", "W", "B", "W", "B", "W"],
  ["W", "B", "W", "B", "W", "B", "W", "B"],
  ["B", "W", "B", "W", "B", "W", "B", "W"],
  ["W", "B", "W", "B", "W", "B", "W", "B"],
  ["B", "W", "B", "W", "B", "W", "B", "W"],
  ["W", "B", "W", "B", "W", "B", "W", "B"],
  ["B", "W", "B", "W", "B", "W", "B", "W"],
  ["W", "B", "W", "B", "W", "B", "W", "B"],
];

function check(y, x) {
  let temp1 = 0;
  let temp2 = 0;

  for (let i = 0; i < 8; i++) {
    for (let j = 0; j < 8; j++) {
      if (arr[y + i][x + j] != White[i][j]) temp1++;

      if (arr[y + i][x + j] != Black[i][j]) temp2++;
    }
  }

  ans = Math.min(ans, temp1);
  ans = Math.min(ans, temp2);
}

//각 칸은 시작점
for (let i = 0; i < N - 7; i++) {
  for (let j = 0; j < M - 7; j++) {
    check(i, j);
  }
}

console.log(ans);
