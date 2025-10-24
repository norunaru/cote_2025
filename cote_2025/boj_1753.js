/*
방향그래프 -> 시작점에서 모든 다른 정점까지 최단 경로
가중치는 10 이하

[프로세스]
다익스트라
arr[a][b] = a에서 b까지 이동 비용
*/

const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "./example.txt";
const input = fs.readFileSync(filePath).toString().trim().split("\n");

let [V, E] = input[0].trim().split(" ").map(Number);
let start = Number(input[1].trim());
start -= 1;

let graph = Array.from({ length: V }, () => []);
let minCost = new Array(V).fill(Infinity);
let isVisited = new Array(V).fill(false);

let line = 2;

for (let i = 0; i < E; i++) {
  let [a, b, cost] = input[line++].trim().split(" ").map(Number);
  a -= 1;
  b -= 1;
  graph[a].push([b, cost]);
}

//간선 거리 설정
minCost[start] = 0;

function dijkstra(start) {
  isVisited[start] = true;

  //현재 노드에서 방문 가능한 노드들 대상으로 최소 거리 갱신
  for (let [next, weight] of graph[start]) {
    if (!isVisited[next]) {
      minCost[next] = Math.min(minCost[next], minCost[start] + weight);
    }
  }

  //인접 노드 중 최소값 찾고 다음 노드로 선정
  let nextNode = findNextNode();
  if (nextNode == -1) return;

  //다익스트라 재귀
  dijkstra(nextNode);
}

function findNextNode() {
  let cost = Infinity;
  let no = -1;
  for (let i = 0; i < V; i++) {
    if (isVisited[i] == false && minCost[i] < cost) {
      cost = minCost[i];
      no = i;
    }
  }

  return no;
}

dijkstra(start);

for (let i = 0; i < V; i++) {
  if (minCost[i] == Infinity) console.log("INF");
  else console.log(minCost[i]);
}
