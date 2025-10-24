/*
a가 b에 의존 -> b감염시 일정 시간 뒤 a도 감염
b가 a에 의존x -> a가 감염되어도 b는 안전

[프로세스]
다익스트라
모든 정점 INF로 초기화
isVisited
시작 정점 방문처리, 0처리
연결된 노드 탐색, 값 대체
*/
const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "./example.txt";
const input = fs.readFileSync(filePath).toString().trim().split("\n");

let T = Number(input.shift().trim());

for (let tc = 0; tc < T; tc++) {
  let [n, d, c] = input.shift().trim().split(" ").map(Number);

  let dist = new Array(n).fill(Infinity);
  let isVisited = new Array(n).fill(false);
  dist[c - 1] = 0;

  // 인접 리스트로 변경
  let graph = Array.from({ length: n }, () => []);
  for (let i = 0; i < d; i++) {
    let [child, parent, cost] = input.shift().trim().split(" ").map(Number);
    graph[parent - 1].push({ to: child - 1, cost });
  }

  function dijkstra(start) {
    isVisited[start] = true;

    for (let edge of graph[start]) {
      let next = edge.to;
      let cost = edge.cost;
      if (!isVisited[next]) {
        dist[next] = Math.min(dist[next], dist[start] + cost);
      }
    }

    let minDist = Infinity;
    let nextNode;

    //방문 안한 노드중 거리 최소값을 다음 시작점으로
    for (let i = 0; i < n; i++) {
      if (!isVisited[i] && dist[i] < minDist) {
        minDist = dist[i];
        nextNode = i;
      }
    }

    if (nextNode !== undefined) {
      dijkstra(nextNode);
    }
  }

  dijkstra(c - 1);

  let count = 0;
  let maxTime = 0;
  for (let i = 0; i < n; i++) {
    if (dist[i] !== Infinity) {
      count++;
      maxTime = Math.max(maxTime, dist[i]);
    }
  }

  console.log(`${count} ${maxTime}`);
}
