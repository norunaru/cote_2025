/*
점프왕 쩰리 Large

정사각형 구역, 외부로 나가면 즉시 패배
출발점은 항상 0,0
이동 가능 방향 : 오른쪽, 아래쪽 (상,좌는 불가)
n,n에 도착하면 승리 
한번에 이동 가능한 칸의 수 = 현재 칸의 숫자 (미만, 초과 불가)
맨 끝까지 도달할 수 있는지 검증

N 
N줄동안 구역

[프로세스]
n*n 생성, 숫자 채우고 같은 크기 isVisited 생성
bfs

*/

const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "./example.txt";
let input = fs.readFileSync(filePath).toString().trim().split("\n");

let n = Number(input.shift());
let arr = [];

for (let i = 0; i < n; i++) {
  arr.push(input.shift().split(" ").map(Number));
}
let isVisited = Array.from({ length: n }, () => new Array(n).fill(false));
//하, 우
let dy = [1, 0];
let dx = [0, 1];

class Node {
  constructor(y, x, val) {
    this.y = y;
    this.x = x;
    this.val = val;
  }
}

//-------------------------------------------------------------------------------------
let queue = [];
queue.push(new Node(0, 0));
isVisited[0][0] = true;

//bfs
A: while (queue.length != 0) {
  let { y, x } = queue.shift();

  let jumpCnt = arr[y][x];

  for (let dir = 0; dir < 2; dir++) {
    let ny = y + dy[dir] * jumpCnt;
    let nx = x + dx[dir] * jumpCnt;

    if (ny >= 0 && ny < n && nx >= 0 && nx < n && isVisited[ny][nx] == false) {
      isVisited[ny][nx] = true;
      queue.push(new Node(ny, nx));
    }
  }
}

//result
// console.table(isVisited);

if (isVisited[n - 1][n - 1] == false) {
  console.log("Hing");
} else {
  console.log("HaruHaru");
}
