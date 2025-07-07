/*
트리의 지름

트리에서 두 노드 사이 최장 거리 구하기

[프로세스]
두 노드 사이 최장 거리 = 리프 노드 2개 간 거리
리프 2개 어떻게?

아무 노드부터 dfs 해서 가장 긴 거리 측정, 해당 노드가 리프 노드 1
리프 1에서 다시 dfs -> 리프2
*/

const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "./example.txt";
const input = fs.readFileSync(filePath).toString().trim().split("\n");

let N = Number(input.shift().trim());
let tree = Array.from({ length: N }, () => []);

for (let i = 0; i < N - 1; i++) {
  let [a, b, cost] = input[i].trim().split(" ").map(Number);
  a -= 1;
  b -= 1;
  tree[a].push([b, cost]);
  tree[b].push([a, cost]);
}

//리프 1 검색용 누적값
let maxDist = 0;
let leaf1 = -1;
let isVisited = new Array(N).fill(false);
let ans = 0;

function dfs(from, sum) {
  if (sum >= maxDist) {
    maxDist = sum;
    leaf1 = from;

    ans = maxDist;
  }

  isVisited[from] = true;

  for (let [to, cost] of tree[from]) {
    if (isVisited[to] == false) {
      dfs(to, sum + cost);
    }
  }

  isVisited[from] = false;
}

dfs(0, 0);
dfs(leaf1, 0);
console.log(ans);
