/*
로봇청소기

1. 현재 칸 청소 x -> 청소
2. 상하좌우 청소되지 않은 칸이 없으면
    방향 유지한 채 후진할 수 있으면 후진하고 1로
    바라보는 방향 반대가 벽이면 작동 멈춤
3. 상하좌우 청소되지 않은 빈칸 있으면
    반시계 회전
    바라보는 방향 기준 앞쪽 칸이 청소되지 않은 빈칸이면 전진
    1로
    

*/
const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "./example.txt";
const input = fs.readFileSync(filePath).toString().trim().split("\n");

class Node {
  constructor(y, x, d) {
    this.y = y;
    this.x = x;
    this.d = d;
  }
}

let dy = [-1, 0, 1, 0];
let dx = [0, 1, 0, -1];

let [N, M] = input.shift().trim().split(" ").map(Number);
let arr = Array.from({ length: N }, () => new Array(M).fill(0));
let isCleaned = Array.from({ length: N }, () => new Array(M).fill(false));

let [startY, startX, d] = input.shift().trim().split(" ").map(Number);

for (let i = 0; i < N; i++) {
  let line = input[i].trim().split(" ").map(Number);
  for (let j = 0; j < M; j++) {
    if (line[j] == 1) arr[i][j] = 1;
  }
}

let queue = [];
queue.push(new Node(startY, startX, d));

let ans = 0;

function printArr() {
  for (let i = 0; i < N; i++) {
    console.log(JSON.stringify(arr[i]));
  }
}

// printArr();

A: while (queue.length != 0) {
  // console.log(JSON.stringify(queue));
  let { y, x, d } = queue.shift();
  // console.log(y, x, arr[y][x]);

  if (isCleaned[y][x] == false) {
    isCleaned[y][x] = true;
    ans++;
  }

  let unCleaned = 0;
  let ny, nx;
  let ry, rx; //후면 방향

  //상하좌우 탐색
  for (let dir = 0; dir < 4; dir++) {
    ny = y + dy[dir];
    nx = x + dx[dir];
    ry = y + dy[d] * -1;
    rx = x + dx[d] * -1;

    if (
      ny >= 0 &&
      ny < N &&
      nx >= 0 &&
      nx < M &&
      arr[ny][nx] == 0 &&
      isCleaned[ny][nx] == false
    ) {
      unCleaned += 1;
    }
  }
  // console.log("uncleaned:", unCleaned);

  if (unCleaned == 0) {
    if (arr[ry][rx] == 0) {
      queue.push(new Node(ry, rx, d));
    } else {
      break A;
    }
  }

  while (unCleaned != 0) {
    d -= 1;
    if (d == -1) d = 3;
    ny = y + dy[d];
    nx = x + dx[d];

    if (
      ny >= 0 &&
      ny < N &&
      nx >= 0 &&
      nx < M &&
      arr[ny][nx] == 0 &&
      isCleaned[ny][nx] == false
    ) {
      queue.push(new Node(ny, nx, d));
      break;
    }
  }
}

console.log(ans);
