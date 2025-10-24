/*
뱀과 사다리 게임

주사위 조작해서 원하는 수 나오게 한다면 최소 몇 번?

주사위 굴려 나온만큼 이동
현재 i칸, 4 나왔다면 i+4로 이동

100 넘어가면 이동 불가
사다리면 위로, 뱀이면 아래로

사다리의 수 N(1 ≤ N ≤ 15)과 뱀의 수 M
N개의 줄에는 사다리의 정보를 의미하는 x, y (x < y)가 주어진다. x번 칸에 도착하면, y번 칸으로 이동\
M개의 줄에는 뱀의 정보를 의미하는 u, v (u > v)가 주어진다. u번 칸에 도착하면, v번 칸으로 이동

<프로세스>
101 배열 생성
인덱스 = 칸 번호, 값 = 사다리 or 뱀 or 빈칸 정보

cur에서 1~6칸에 굴림
각 칸의 [0]이 0이면 [1]에 cnt+1, [0] 이 특정 인덱스의 위치라면(뱀이나 사다리) [idx][1] 에 cnt+1

*/
const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "./example.txt";
const input = fs.readFileSync(filePath).toString().trim().split("\n");

let [N, M] = input.shift().split(" ").map(Number);

//보드판
let arr = new Array(101).fill(0);
let isVisited = new Array(101).fill(false);

//사다리 N줄
for (let i = 0; i < N; i++) {
  let [x, y] = input.shift().split(" ").map(Number);
  arr[x] = y;
}

//뱀 M줄
for (let i = 0; i < M; i++) {
  let [u, v] = input.shift().split(" ").map(Number);
  arr[u] = v;
}

class Node {
  constructor(cur, cnt) {
    this.cur = cur;
    this.cnt = cnt;
  }
}

let queue = [];
queue.push(new Node(1, 0));
isVisited[1] = true;
let ans;

// console.log(JSON.stringify(arr));

//bfs
while (queue.length != 0) {
  let { cur, cnt } = queue.shift();

  //기저조건
  if (cur >= 100) {
    ans = cnt;
    break;
  }

  for (let dice = 1; dice <= 6; dice++) {
    if (isVisited[cur + dice] == false) {
      //그냥 빈칸
      if (arr[cur + dice] == 0) {
        isVisited[cur + dice] = true;
        queue.push(new Node(cur + dice, cnt + 1));
      }
      //뱀 or 사다리
      else {
        isVisited[arr[cur + dice]] = true;
        queue.push(new Node(arr[cur + dice], cnt + 1));
      }
    }
  }

  //   console.log(JSON.stringify(queue));
}

console.log(ans);
