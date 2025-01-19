/*
토마토

N*M*H 창고
익은 토마토, 안익은 토마토

하루 지나면 익은 토마토 근처 토마토는 익음
상 하 좌 우 앞 뒤
대각은 영향 x
며칠이 지나면 다 익을까?

1=익은 토마토, 0=안익음, -1=빈칸

N개의 줄에는 하나의 상자에 담긴 토마토의 정보
각 줄에는 상자 가로줄에 들어있는 토마토들의 상태가 M개의 정수
1은 익은 토마토, 정수 0 은 익지 않은 토마토, 정수 -1은 토마토가 들어있지 않은 칸

<프로세스>
레벨 bfs
델타만 6개로 늘리기
----
배열 생성하고 입력받으면서 1,0이면 모든 토마토 개수++
1이면 익은토마토++

bfs시 현재 들어있는 개수만큼 빼고 상하좌우전후 0이면 넣기 (레벨)

큐가 다 비었는데 개수 다르면 -1출력

bfs 종료시:
red!=전체 -> -1출력


++++++++++++++++++++
js에서는 레벨별 bfs할때 queue.length로 하면 동적으로 변해서 반복횟수 이상해짐...
미리 변수에 저장해두고 쓰자 ㅅㅂ

js에서 큐 만들때 그냥 배열로 쓰는데 shift하는 과정이 O(N)이라 양이 많으면 느림
front 변수 만들어서 맨 앞 원소 인덱스 저장하고 실제 삭제하는 대신 계속 그냥 추가만 하는 식으로 사용


 */

class Node {
  constructor(h, y, x) {
    this.h = h;
    this.y = y;
    this.x = x;
  }
}

let fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "./example.txt";
let input = fs.readFileSync(filePath).toString().trim().split("\n");

let [M, N, H] = input
  .shift()
  .split(" ")
  .map((v) => parseInt(v));

//H*N*M 3차원 배열 설정
let arr = Array.from({ length: H }, () =>
  Array.from({ length: N }, () => Array(M).fill(0))
);
let isVisited = Array.from({ length: H }, () =>
  Array.from({ length: N }, () => Array(M).fill(false))
);

let queue = [];

let total = 0;
let red = 0;

for (let h = 0; h < H; h++) {
  for (let n = 0; n < N; n++) {
    let row = input
      .shift()
      .split(" ")
      .map((v) => parseInt(v));
    for (let m = 0; m < M; m++) {
      arr[h][n][m] = row[m];

      if (row[m] == 1) {
        total++;
        red++;
        isVisited[h][n][m] = true;
        queue.push(new Node(h, n, m));
      } else if (row[m] == 0) {
        total++;
      }
    }
  }
}

// for (let h = 0; h < H; h++) {
//   for (let n = 0; n < N; n++) {
//     console.log(JSON.stringify(arr[h][n]));
//   }
// }

// console.log(total, red);
// console.log(queue.length);

let dy = [-1, 0, 1, 0, 0, 0];
let dx = [0, 1, 0, -1, 0, 0];
let dh = [0, 0, 0, 0, 1, -1];

//bfs

let day = 0;
let ans = -1;
let front = 0;

while (front < queue.length) {
  // console.log("red:", red);
  if (red == total) {
    ans = day;
    break;
  }

  //레벨별 bfs
  let queueSize = queue.length - front;
  for (let i = 0; i < queueSize; i++) {
    let { h, y, x } = queue[front++];
    for (let dir = 0; dir < 6; dir++) {
      let nh = h + dh[dir];
      let ny = y + dy[dir];
      let nx = x + dx[dir];

      //범위 내, 안익은 토마토, 방문 안했으면 큐에 넣기기
      if (
        nh >= 0 &&
        nh < H &&
        ny >= 0 &&
        ny < N &&
        nx >= 0 &&
        nx < M &&
        arr[nh][ny][nx] == 0 &&
        isVisited[nh][ny][nx] == false
      ) {
        // console.log(day, nh, ny, nx);
        arr[nh][ny][nx] = 1; //빨개짐
        isVisited[nh][ny][nx] = true;
        queue.push(new Node(nh, ny, nx));
        red = red + 1;
      }
    }
  }
  day++;
  // console.log("day:", day, "red:", red);
}

console.log(ans);
