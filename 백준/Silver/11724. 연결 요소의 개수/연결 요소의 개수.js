/*
연결 요소의 개수

무방향 그래프 -> 연결 요소의 개수를 구하라

정점개수 N, 간선 개수 M  (1 ≤ N ≤ 1,000, 0 ≤ M ≤ N×(N-1)/2)
M개의 줄에 간선의 양 끝점 u와 v

<프로세스>
isVisited 배열 생성 (사이즈 N)
2차원배열 생성, 간선 u,v에 1, v,u에도 1 설정

2차원배열 순회, 1찾고, isVisited = false면 dfs 시작
isVisited = true로 설정
해당 행에서 N열에 대해 검사
    isVisited = false, arr값이 1이면 해당 노드에 대해 재귀 
    isVisited = true
    dfs()
    isVisited = false
*/
let fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "./example.txt";
let input = fs.readFileSync(filePath).toString().trim().split("\n");

let [N, M] = input
  .shift()
  .split(" ")
  .map((v) => parseInt(v));

let arr = Array.from({ length: N }, () => Array(N).fill(0));
let isVisited = new Array(N).fill(false);

for (let i = 0; i < M; i++) {
  let [u, v] = input[i].split(" ").map((v) => parseInt(v));
  arr[u - 1][v - 1] = 1;
  arr[v - 1][u - 1] = 1;
}

// for (let i = 0; i < N; i++) {
//   console.log(JSON.stringify(arr[i]));
// }

function dfs(cur) {
  //각 열에 대해 연결되었는지 검사
  for (let i = 0; i < N; i++) {
    if (isVisited[i] == false && arr[cur][i] == 1) {
      isVisited[i] = true;
      dfs(i);
    }
  }
}

let ans = 0;

for (let i = 0; i < N; i++) {
  if (isVisited[i] == false) {
    isVisited[i] = true;
    ans++;
    dfs(i);
  }
}

console.log(ans);
