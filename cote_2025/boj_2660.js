/*
회장 뽑기

모임에서 회장 선출
회원 간 모르는 사람 존재, 몇 사람 통하면 모두 알 수 있음
각 회원은 다른 회원과 가까운 정도에 따라 점수

모든 회원과 친구 = 1
다른 사람이 친구 or 친구의 친구 = 2
친구, 친구의 찬구, 친구의 친구의 친구 = 3

두 사람이 친구사이면서 동시에 친구의 친구사이 -> 친구

점수가 가장 낮은 사람이 회장
회장의 점수, 될 수 있는 모든 사람 찾기

입력:
회원의 수가 있다. 단, 회원의 수는 50명을 넘지 않는다.
한 줄에 두 개의 회원번호가 있는데, 이것은 두 회원이 서로 친구
회원번호는 1부터 회원의 수만큼
마지막 -1, -1

출력:
첫째 줄에는 회장 후보의 점수와 후보의 수를 출력하고, 
두 번째 줄에는 회장 후보를 오름차순으로 모두 출력한다.

<프로세스> 
최단거리 -> bfs
각 회원의 점수 point 배열 생성
이차원배열 친구관계면 1로 설정

각 회원에 대해 
isFriend배열 생성, false
1인 값들 큐에 넣고 시작, 
클래스 Node = (idx, cnt)

하나씩 꺼내면 a의 친구 b로 bfs하게됨, b에서 1 만나면 친구인지 확인하고 false라면 +1해서 큐에 넣기
*/

const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "./example.txt";
const input = fs.readFileSync(filePath).toString().trim().split("\n");

let N = Number(input.shift());

let arr = Array.from({ length: N }, () => new Array(N).fill(0));

//배열 생성
while (true) {
  [a, b] = input.shift().trim().split(" ").map(Number);
  if (a == -1 && b == -1) break;
  arr[a - 1][b - 1] = 1;
  arr[b - 1][a - 1] = 1;
}

class Node {
  constructor(idx, cnt) {
    this.idx = idx;
    this.cnt = cnt;
  }
}

let points = new Array(N).fill(0);

for (let a = 0; a < N; a++) {
  let isFriend = new Array(N).fill(false);
  isFriend[a] = true;
  let point = 0; //특정 회원의 점수
  let queue = [];

  queue.push(new Node(a, 0));

  while (queue.length != 0) {
    let { idx, cnt } = queue.shift();
    point = cnt;

    for (let x = 0; x < N; x++) {
      if (arr[idx][x] == 1 && isFriend[x] == false) {
        isFriend[x] = true;
        queue.push(new Node(x, cnt + 1));
      }
    }
  }

  points[a] = point;
}

// console.log(JSON.stringify(points));

let minPoint = Math.min(...points);

let ans = [];

for (let i = 0; i < N; i++) {
  if (points[i] == minPoint) ans.push(i + 1);
}

console.log(minPoint, ans.length);
console.log(ans.sort((a, b) => a - b).join(" "));
