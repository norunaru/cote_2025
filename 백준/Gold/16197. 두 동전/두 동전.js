/*
n*m 보드, 4개 버튼
비어있거나 벽

동전 2개, 위치는 다름
상하좌우 버튼 4개, 동시 이동

동전 하나만 떨구는 최소 버튼 클릭 횟수?

[프로세스]

*/
const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "./example.txt";
const input = fs.readFileSync(filePath).toString().trim().split("\n");

const [N, M] = input.shift().split(" ").map(Number);
const board = input.map((line) => line.trim().split(""));

const dy = [-1, 0, 1, 0];
const dx = [0, 1, 0, -1];

let coins = [];
for (let i = 0; i < N; i++) {
  for (let j = 0; j < M; j++) {
    if (board[i][j] === "o") {
      coins.push([i, j]);
    }
  }
}

const [y1, x1] = coins[0];
const [y2, x2] = coins[1];

// 4차원 visited 배열
const visited = Array.from({ length: N }, () =>
  Array.from({ length: M }, () =>
    Array.from({ length: N }, () => Array(M).fill(false))
  )
);

let isVisited = Array.from({ length: N }, () =>
  Array.from({ length: N }, () =>
    Array.from({ length: N }, () => new Array(M).fill(0))
  )
);

let queue = [];
queue.push([y1, x1, y2, x2, 0]);
visited[y1][x1][y2][x2] = true;

let result = -1;

while (queue.length > 0) {
  let [cy1, cx1, cy2, cx2, count] = queue.shift();

  if (count >= 10) {
    break; // 10번 초과는 무시
  }

  for (let dir = 0; dir < 4; dir++) {
    let ny1 = cy1 + dy[dir];
    let nx1 = cx1 + dx[dir];
    let ny2 = cy2 + dy[dir];
    let nx2 = cx2 + dx[dir];

    let out1 = ny1 < 0 || ny1 >= N || nx1 < 0 || nx1 >= M;
    let out2 = ny2 < 0 || ny2 >= N || nx2 < 0 || nx2 >= M;

    // 둘 중 하나만 떨어졌다면 성공
    if (out1 ^ out2) {
      result = count + 1;
      queue = [];
      break;
    }

    // 둘 다 떨어졌다면 실패한 경우
    if (out1 && out2) continue;

    // 벽일 경우 위치 유지
    if (!out1 && board[ny1][nx1] === "#") {
      ny1 = cy1;
      nx1 = cx1;
    }
    if (!out2 && board[ny2][nx2] === "#") {
      ny2 = cy2;
      nx2 = cx2;
    }

    // 방문한 상태인지 확인
    if (!visited[ny1][nx1][ny2][nx2]) {
      visited[ny1][nx1][ny2][nx2] = true;
      queue.push([ny1, nx1, ny2, nx2, count + 1]);
    }
  }
}

console.log(result);
