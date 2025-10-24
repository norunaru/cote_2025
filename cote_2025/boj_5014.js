/*
스타트링크

총 F층 건물, 사무실 위치는 G, 현재위치 S, 엘베타고 G로 이동하려함
위로 U층, 아래로 D층 이동 버튼 존재

G층에 도착하려면 몇 번? 
G층에 갈 수 없다면, "use the stairs"를 출력

첫째 줄에 F, S, G, U, D가 주어진다. (1 ≤ S, G ≤ F ≤ 1000000, 0 ≤ U, D ≤ 1000000) 건물은 1층부터 시작하고, 가장 높은 층은 F층

<프로세스>
bfs:
방문배열, 층수에 몇번 누르는지 저장할 배열 생성
층수 숫자를 큐에 넣고 bfs
*/

let fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "./example.txt";
let [F, S, G, U, D] = fs
  .readFileSync(filePath)
  .toString()
  .trim()
  .split(" ")
  .map((v) => parseInt(v));

//배열 생성
let stairs = new Array(F + 1).fill(0);
let isVisited = new Array(F + 1).fill(false);

let queue = [];

class Node {
  constructor(stair, cnt) {
    this.stair = stair;
    this.cnt = cnt;
  }
}

let move = [U, -D];
let result = -1;

queue.push(new Node(S, 0));
isVisited[S] = true;

while (queue.length != 0) {
  let cur = queue.shift();
  let stair = cur.stair;
  let cnt = cur.cnt;

  if (stair == G) {
    result = 1;
    break;
  }

  for (let i = 0; i < 2; i++) {
    let next = stair + move[i];
    if (next > 0 && next < F + 1 && isVisited[next] == false) {
      isVisited[next] = true;
      stairs[next] = cnt + 1;
      queue.push(new Node(next, cnt + 1));
    }
  }
}

// console.log(JSON.stringify(stairs));

if (result == -1) {
  console.log("use the stairs");
} else {
  console.log(stairs[G]);
}
