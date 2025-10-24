/*
DFS, BFS 탐색 결과
방문 가능 정점 여러개 -> 번호 작은 거 먼저
방문 가능 점 없으면 종료

1~N번까지

정점 개수 N, 간선 개수 M, 시작 정점 V
(M줄)
연결 두 정점 번호


*/

const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "./example.txt";
const input = fs.readFileSync(filePath).toString().trim().split("\n");

let settings = input.shift();
settings = settings.split(" ");

const N = parseInt(settings[0]);
const M = parseInt(settings[1]);
const V = parseInt(settings[2]);

let adj = new Array(N).fill(null).map(() => {
  return new Array(N).fill(0);
});

//인접행렬 생성
for (let i = 0; i < M; i++) {
  let [a, b] = input[i].split(" ").map((x) => parseInt(x - 1));
  adj[a][b] = 1;
  adj[b][a] = 1;
}

//dfs
let dfsVisit = new Array(N).fill(false);
let dfsAns = [];

function dfs(start) {
  dfsVisit[start] = true;
  dfsAns.push(start + 1);

  for (let i = 0; i < N; i++) {
    if (adj[start][i] == 1 && !dfsVisit[i]) {
      dfs(i);
    }
  }
}

dfs(V - 1);
console.log(dfsAns.join(" "));

//bfs
let queue = [];
let bfsAns = [];
let bfsVisit = new Array(N).fill(false);

bfsVisit[V - 1] = true;

queue.push(V - 1);

while (queue.length) {
  let cur = queue.shift();
  bfsAns.push(cur + 1);

  for (let i = 0; i < N; i++) {
    if (adj[cur][i] == 1 && !bfsVisit[i]) {
      bfsVisit[i] = true;
      queue.push(i);
    }
  }
}

console.log(bfsAns.join(" "));
