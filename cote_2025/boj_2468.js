/*
안전 영역

비가 내릴 때 물에 잠기지 않는 안전한 영역이 최대 몇개?

n*n, 높이 주어짐

<프로세스> 
bfs

*/
let fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "./example.txt";
let input = fs.readFileSync(filePath).toString().trim().split("\n");

let N = parseInt(input.shift().trim());

//2차원 배열 생성
let arr = new Array(N).fill(0);
for (let i = 0; i < N; i++) {
  arr[i] = new Array(N).fill(0);
}

let maxHeight = 0;

//높이 초기화
for (let i = 0; i < N; i++) {
  let cur = input[i].split(" ").map((v) => parseInt(v));
  for (let j = 0; j < N; j++) {
    arr[i][j] = cur[j];
    if (maxHeight < cur[j]) maxHeight = cur[j];
  }
}

// console.log(maxHeight);

//bfs
class Node {
  constructor(y, x) {
    this.y = y;
    this.x = x;
  }
}

let dy = [-1, 0, 1, 0];
let dx = [0, 1, 0, -1];
let ans = 0;

//수위를 1부터 최대 높이까지 올려가면서 검사
for (let h = 0; h <= maxHeight; h++) {
  let temp = 0; //현재 수위에 대한 결과
  let queue = [];
  let copy = arr.map((row) => row.slice());

  let isVisited = new Array(N).fill(false);
  for (let i = 0; i < N; i++) {
    isVisited[i] = new Array(N).fill(false);
  }

  //수위보다 낮은 건물은 0으로 초기화
  for (let i = 0; i < N; i++) {
    for (let j = 0; j < N; j++) {
      if (copy[i][j] <= h) copy[i][j] = 0;
    }
  }
  //   console.log(JSON.stringify(copy));
  for (let i = 0; i < N; i++) {
    for (let j = 0; j < N; j++) {
      //각 인덱스에서 0아니면 큐에 넣고 bfs, temp++
      if (copy[i][j] != 0 && isVisited[i][j] == false) {
        temp++;
        isVisited[i][j] = true;
        queue.push(new Node(i, j));

        while (queue.length != 0) {
          let cur = queue.shift();
          let y = cur.y;
          let x = cur.x;
          let ny, nx;
          for (let dir = 0; dir < 4; dir++) {
            ny = y + dy[dir];
            nx = x + dx[dir];
            if (
              ny >= 0 &&
              ny < N &&
              nx >= 0 &&
              nx < N &&
              isVisited[ny][nx] == false &&
              copy[ny][nx] > 0
            ) {
              isVisited[ny][nx] = true;
              queue.push(new Node(ny, nx));
            }
          }
        }
      }
    }
  } //각 인덱스 검사

  if (temp > ans) ans = temp;
}

console.log(ans);
