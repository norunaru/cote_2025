/*
색종이

100*100 크기 도화지

10*10인 정사각형 검은 색종이를 여러장 붙임
검은 영역의 넓이는??

<프로세스>
2차원 배열, 0으로 초기화
색종이 영역을 1로 변경

모든 인덱스 돌면서 0아니면 cnt++
*/

let fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "./example.txt";
let input = fs.readFileSync(filePath).toString().trim().split("\n");

let arr = Array.from({ length: 100 }, () => Array(100).fill(0));

let N = parseInt(input.shift());

for (let i = 0; i < N; i++) {
  let [left, bottom] = input
    .shift()
    .split(" ")
    .map((v) => parseInt(v));

  for (let y = bottom; y < bottom + 10; y++) {
    for (let x = left; x < left + 10; x++) {
      arr[y][x] = 1;
    }
  }
}

let cnt = 0;

for (let y = 0; y < 100; y++) {
  for (let x = 0; x < 100; x++) {
    if (arr[y][x] != 0) cnt++;
  }
}

console.log(cnt);
