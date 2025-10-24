/*
최소비용 구하기

N개 도시 
한 도시 -> 다른 도시에 도착하는 M개 버스
A번째 도시에서 B번쨰 도시까지 가는 비용 최소화

N,M
출발 도시 번호, 도착지 번호, 비용

[프로세스]
음의 비용 x, 그래프 형태 -> 다익스트라
*/

// const fs = require("fs");
// const filePath = process.platform === "linux" ? "/dev/stdin" : "./example.txt";
// const input = fs.readFileSync(filePath).toString().trim().split("\n");

// let N = Number(input.shift().trim());
// let M = Number(input.shift().trim());

// let isVisited = new Array(N).fill(false);
// let dist = new Array(N).fill(Infinity);

// //인접행렬
// let adj = Array.from({ length: N }, () => new Array());
// // console.table(adj);
// for (let i = 0; i < M; i++) {
//   let [a, b, cost] = input[i].trim().split(" ").map(Number);
//   adj[a - 1].push([b - 1, cost]);
// }

// let [from, to] = input[input.length - 1].trim().split(" ").map(Number);

// from -= 1;
// to -= 1;
// dist[from] = 0;

// // console.log(JSON.stringify(adj));
// // console.table(adj);

// function dijkstra(start) {
//   isVisited[start] = true;

//   for (let [to, cost] of adj[start]) {
//     dist[to] = Math.min(dist[to], dist[start] + cost);
//   }

//   let nextNode = findNext();

//   if (nextNode == -1) return;
//   else dijkstra(nextNode);
// }

// function findNext() {
//   let no = -1;
//   let minVal = Infinity;

//   for (let i = 0; i < N; i++) {
//     if (isVisited[i] == false) {
//       if (dist[i] <= minVal) {
//         no = i;
//         minVal = dist[i];
//       }
//     }
//   }
//   return no;
// }

// dijkstra(from);

// console.log(dist[to]);

const fs = require("fs");
const { findSourceMap } = require("module");
const filePath = process.platform === "linux" ? "/dev/stdin" : "./example.txt";
const input = fs.readFileSync(filePath).toString().trim().split("\n");

let N = Number(input.shift().trim());
let M = Number(input.shift().trim());

let adj = Array.from({ length: N }, () => new Array());

let line = 0;
for (let i = 0; i < M; i++) {
  let [from, to, cost] = input[line++].trim().split(" ").map(Number);
  console.log(from, to, cost);

  from -= 1;
  to -= 1;
  adj[from].push([to, cost]);
}

let [start, end] = input[line].trim().split(" ").map(Number);
start -= 1;
end -= 1;

//다익스트라
let isVisited = new Array(N).fill(false);
let dist = new Array(N).fill(Infinity);

dist[start] = 0;

function dijkstra(node) {
  isVisited[node] = true;

  for (let [to, cost] of adj[node]) {
    dist[to] = Math.min(dist[to], dist[node] + cost);
  }

  let nextNode = findNext();
  if (nextNode != -1) {
    dijkstra(nextNode);
  }
}

function findNext() {
  let minDist = Infinity;
  let nextNode = -1;

  for (let i = 0; i < N; i++) {
    if (isVisited[i] == false && dist[i] < minDist) {
      minDist = dist[i];
      nextNode = i;
    }
  }

  return nextNode;
}

dijkstra(start);
console.log(dist[end]);
