/*
불

빈 공간, 벽으로 이루어진 건물

매 초마다 불은 동서남북 인접 빈공간으로 퍼짐
벽은 불 x
동서남북 인접 칸으로 이동 가능하며 1초 걸림

벽 통과 불가, 불이 옮겨지거나 붙으려는 칸으로 이동 불가

불이 먼저 붙고 다른 칸으로 이동

지도 주어졌을 떄 얼마나 빨리 탈출할 수 있는지 구하기

[프로세스]
w,h -> h*w배열 생성
생성하면서 @를 prevY, prevX로 저장

배열 검사하면서 * 만나면 큐에 다 넣음, fireCnt 
레벨 bfs로 불 확장, fireCnt 갱신

moveCnt 배열 생성, 사람 초기 위치부터 bfs 


탈출 조건 : 
y==0 || y==h-1 || x==0 || x==w-1 && moveCnt < fireCnt 

*/
const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "./example.txt";
const input = fs.readFileSync(filePath).toString().trim().split("\n");

let dy = [-1, 0, 1, 0];
let dx = [0, 1, 0, -1];

class Node {
  constructor(y, x, cnt) {
    this.y = y;
    this.x = x;
    this.cnt = cnt;
  }
}

let tc = Number(input.shift());

for (let T = 0; T < tc; T++) {
  let [w, h] = input.shift().split(" ").map(Number);
  let arr = Array.from({ length: h }, () => new Array(w).fill("."));
  let ans = "IMPOSSIBLE";

  let fireVisited = Array.from({ length: h }, () => new Array(w).fill(false));
  let moveVisited = Array.from({ length: h }, () => new Array(w).fill(false));

  let prevY, prevX;

  for (let y = 0; y < h; y++) {
    let line = input.shift().split("");
    for (let x = 0; x < w; x++) {
      arr[y][x] = line[x];
      if (line[x] == "@") {
        prevY = y;
        prevX = x;
      }
    }
  }

  //불이 먼저 번지고 사람이 이동
  let queue = [];
  let queue2 = [];

  let fireFront = 0;
  let moveFront = 0;

  for (let y = 0; y < h; y++) {
    for (let x = 0; x < w; x++) {
      if (arr[y][x] == "*") {
        queue.push(new Node(y, x, 0));
        fireVisited[y][x] = true;
      }
    }
  }

  queue2.push(new Node(prevY, prevX, 0));
  moveVisited[prevY][prevX] = true;

  A: while (moveFront < queue2.length) {
    //레벨 bfs
    let fireLen = queue.length;

    for (let i = fireFront; i < fireLen; i++) {
      let { y, x, cnt } = queue[i];

      //불 번지기
      for (let dir = 0; dir < 4; dir++) {
        let ny = y + dy[dir];
        let nx = x + dx[dir];

        if (
          ny >= 0 &&
          ny < h &&
          nx >= 0 &&
          nx < w &&
          arr[ny][nx] != "#" &&
          fireVisited[ny][nx] == false
        ) {
          fireVisited[ny][nx] = true;
          arr[ny][nx] = "*";
          queue.push(new Node(ny, nx, 0));
        }
      }
      fireFront = fireLen;
    }

    //사람 이동
    const moveLen = queue2.length;
    for (let j = moveFront; j < moveLen; j++) {
      let { y, x, cnt } = queue2[j];

      if (y == 0 || x == 0 || y == h - 1 || x == w - 1) {
        ans = cnt + 1;
        break A;
      }

      for (let dir = 0; dir < 4; dir++) {
        let ny = y + dy[dir];
        let nx = x + dx[dir];

        if (
          arr[ny][nx] == "." &&
          moveVisited[ny][nx] == false &&
          ny >= 0 &&
          ny < h &&
          nx >= 0 &&
          nx < w
        ) {
          moveVisited[ny][nx] = true;
          queue2.push(new Node(ny, nx, cnt + 1));
        }
      }
      moveFront = moveLen;
    }
  }
  console.log(ans);
} //tc
