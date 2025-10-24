/*
미로 탐색

N*M 크기 미로
1은 이동 가능 칸, 0은 이동 불가 칸
1,1에서 출발해서 N,M으로 이동시 지나야 하는 최소 칸 수?
시작칸, 끝칸도 포함

첫째 줄에 두 정수 N, M(2 ≤ N, M ≤ 100)이 주어진다. 
다음 N개의 줄에는 M개의 정수로 미로가 주어진다. 각각의 수들은 붙어서 입력으로 주어진다.

<프로세스>
N+1*M+1 로 배열 생성
bfs

*/
let fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "./example.txt";
let input = fs.readFileSync(filePath).toString().trim().split("\n");

//미로 생성
let [N, M] = input
  .shift()
  .split(" ")
  .map((v) => parseInt(v));
let arr = Array.from({ length: N + 1 }, () => Array(M + 1).fill(0));
let isVisited = Array.from({ length: N + 1 }, () => Array(M + 1).fill(false));

for (let i = 0; i < N; i++) {
  let line = input[i].split("").map((v) => parseInt(v));
  for (let j = 0; j < M; j++) {
    arr[i + 1][j + 1] = line[j];
  }
}

// for (let i = 0; i < N + 1; i++) {
//   console.log(JSON.stringify(isVisited[i]));
// }

//bfs
class Node {
  constructor(y, x, cnt) {
    this.y = y;
    this.x = x;
    this.cnt = cnt;
  }
}

let ans = 0;
let dy = [-1, 0, 1, 0];
let dx = [0, 1, 0, -1];
let queue = [];

isVisited[1][1] = true;
queue.push(new Node(1, 1, 1));

while (queue.length != 0) {
  let cur = queue.shift();
  let { y, x, cnt } = cur;

  if (y == N && x == M) {
    ans = cnt;
    break;
  }

  for (let dir = 0; dir < 4; dir++) {
    let ny = y + dy[dir];
    let nx = x + dx[dir];

    if (
      ny >= 1 &&
      ny <= N &&
      nx >= 1 &&
      nx <= M &&
      arr[ny][nx] == 1 &&
      isVisited[ny][nx] == false
    ) {
      isVisited[ny][nx] = true;
      queue.push(new Node(ny, nx, cnt + 1));
      //   console.log(ny, nx, cnt + 1, "push");
    }
  }
}

console.log(ans);
