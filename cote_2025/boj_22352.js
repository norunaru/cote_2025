/*
항체 인식

[프로세스]
a, b
두 배열에서 다른 좌표들 저장
아무 좌표나 넣고 bfs, b의 좌표값으로 대체

같은지 비교
*/

const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "./example.txt";
const input = fs.readFileSync(filePath).toString().trim().split("\n");

let [N, M] = input.shift().trim().split(" ").map(Number);

let a = [];
let b = [];

for (let i = 0; i < N; i++) {
  let nums = input[i].trim().split(" ").map(Number);
  a.push(nums);
}

for (let i = N; i < 2 * N; i++) {
  let nums = input[i].trim().split(" ").map(Number);
  b.push(nums);
}

let diff = [];

for (let i = 0; i < N; i++) {
  for (let j = 0; j < M; j++) {
    if (a[i][j] != b[i][j]) {
      diff.push([i, j]);
    }
  }
}

if (diff.length == 0) {
  console.log("YES");
  return;
}

let startY = diff[0][0];
let startX = diff[0][1];
let startVal = a[startY][startX];
let target = b[startY][startX]; //다른 위치의 b값 (이 값으로 a배열 변화시켜야함)

let isVisited = Array.from({ length: N }, () => new Array(M).fill(false));

let dy = [-1, 0, 1, 0];
let dx = [0, 1, 0, -1];

let queue = [];

queue.push([startY, startX, startVal]);
isVisited[startY][startX] = true;

while (queue.length != 0) {
  let [y, x, val] = queue.shift();
  a[y][x] = target;

  for (let i = 0; i < 4; i++) {
    let ny = y + dy[i];
    let nx = x + dx[i];

    if (
      ny >= 0 &&
      ny < N &&
      nx >= 0 &&
      nx < M &&
      isVisited[ny][nx] == false &&
      a[ny][nx] == val
    ) {
      isVisited[ny][nx] = true;
      queue.push([ny, nx, val]);
    }
  }
}

let flag = true;
for (let i = 0; i < N; i++) {
  for (let j = 0; j < M; j++) {
    if (a[i][j] != b[i][j]) flag = false;
  }
}

if (flag) {
  console.log("YES");
} else {
  console.log("NO");
}
