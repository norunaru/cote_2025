/*
치즈

n*n 정사각형 판, 위에 얇은 치즈
테두리에는 치즈 없음, 하나 이상의 구멍 존재 가능

공기와 닿으면 녹음, 접촉한 칸은 한시간 뒤 녹음
치즈 내부에는 공기 없지만 구멍이 열리면 들어감

치즈가 모두 녹아 없어지는 데 걸리는 시간, 모두 녹기 한시간 전 치즈조각 개수

<프로세스>
초기 배열 생성시 치즈 개수 저장

테두리에는 치즈 놓일 수 없음 = 무조건 공기
-> 테두리(0,0)부터 bfs시작
현재칸 0, 다음칸 0 -> 큐에 넣기
현재칸 0, 다음칸 1 -> 배열에 저장 (공기와 맞닿는 치즈들)

bfs끝난 뒤:
ans = 치즈 개수
치즈 개수 - 배열.length
time++

*/
const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "./example.txt";
const input = fs.readFileSync(filePath).toString().trim().split("\n");

let dy = [-1, 0, 1, 0];
let dx = [0, 1, 0, -1];

let arr = [];
let [N, M] = input.shift().split(" ").map(Number);

let chz = 0;
let ans = 0;
let time = 0;

//배열 생성
for (let i = 0; i < N; i++) {
  arr.push(input[i].split(" ").map(Number));
}

//초기 치즈 개수 저장
for (let i = 0; i < N; i++) {
  for (let j = 0; j < M; j++) {
    if (arr[i][j] == 1) {
      chz++;
    }
  }
}

class Node {
  constructor(y, x) {
    this.y = y;
    this.x = x;
  }
}

while (chz != 0) {
  let queue = [];
  let border = []; //공기와 맞닿는 치즈 좌표들

  let isVisited = Array.from({ length: N }, () => new Array(M).fill(false));
  queue.push(new Node(0, 0));
  isVisited[0][0] = true;

  //bfs, 맞닿는 칸들 저장
  while (queue.length != 0) {
    let { y, x } = queue.shift();

    for (let dir = 0; dir < 4; dir++) {
      let ny = y + dy[dir];
      let nx = x + dx[dir];

      if (
        ny >= 0 &&
        ny < N &&
        nx >= 0 &&
        nx < M &&
        isVisited[ny][nx] == false
      ) {
        isVisited[ny][nx] = true;
        if (arr[ny][nx] == 0) {
          queue.push(new Node(ny, nx));
        } else if (arr[ny][nx] == 1) {
          border.push(new Node(ny, nx));
        }
      }
    }
  }

  //   console.log(border.length);

  //   console.table(border);
  //맞닿는 면 녹이기
  for (let i = 0; i < border.length; i++) {
    // console.log(border[i]);
    let { y, x } = border[i];
    // console.log(y, x);
    arr[y][x] = 0;
  }

  ans = chz;
  chz -= border.length;
  time++;
}

console.log(time);
console.log(ans);
