/*
n*m
2면이 공기와 접촉하면 녹음

[프로세스]
치즈칸의 공기와 맞닿는 면 개수 저장하는 airSide배열 생성(내부 공기 제외)
0,0부터 공기칸 bfs, 치즈칸만나면 airSide++

airSide >= 2인 칸 삭제
time++
*/
let dy = [-1, 0, 1, 0];
let dx = [0, 1, 0, -1];

const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "./example.txt";
const input = fs.readFileSync(filePath).toString().trim().split("\n");

let [N, M] = input.shift().trim().split(" ").map(Number);

let arr = Array.from({ length: N }, () => new Array(M).fill(0));
let isVisited;
let airSide;
let time = 0;

for (let i = 0; i < N; i++) {
  let line = input.shift().trim().split(" ").map(Number);
  for (let j = 0; j < M; j++) {
    arr[i][j] = line[j];
  }
}

function noCheeze() {
  for (let i = 0; i < N; i++) {
    for (let j = 0; j < N; j++) {
      if (arr[i][j] == 1) return false;
    }
  }
  return true;
}

while (!noCheeze()) {
  airSide = Array.from({ length: N }, () => new Array(M).fill(0));
  isVisited = Array.from({ length: N }, () => new Array(M).fill(false));

  let queue = [];
  queue.push([0, 0]);
  isVisited[0][0] = true;

  //공기랑 닿는 면 개수 체크
  while (queue.length != 0) {
    let [y, x] = queue.shift();

    for (let dir = 0; dir < 4; dir++) {
      let ny = y + dy[dir];
      let nx = x + dx[dir];

      //공기칸 큐에 넣기
      if (
        ny >= 0 &&
        ny < N &&
        nx >= 0 &&
        nx < M &&
        arr[ny][nx] == 0 &&
        isVisited[ny][nx] == false
      ) {
        isVisited[ny][nx] = true;
        queue.push([ny, nx]);
      }

      //치즈칸이면 ++
      if (ny >= 0 && ny < N && nx >= 0 && nx < M && arr[ny][nx] == 1) {
        airSide[ny][nx]++;
      }
    }
  }

  //녹이기
  for (let i = 0; i < N; i++) {
    for (let j = 0; j < M; j++) {
      if (airSide[i][j] >= 2) {
        arr[i][j] = 0;
      }
    }
  }

  time++;

  //   console.table(airSide);
}

console.log(time);
