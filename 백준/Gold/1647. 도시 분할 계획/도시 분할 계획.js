/*
N개 집, M개 길 존재 
길은 양방향 이동 가능, 비용 존재

두 마을로 분할 계획

분리된 두 마을 사이 길은 제거 가능
각 마을에서 두 집 사이에 경로가 항상 존재하게 하면서 없앨 수 있음

위 조건 만족하면서 길 비용 최소?

[프로세스]
mst 만들고 비용 가장 비싼 간선 제거하면 마을 두개로 분리됨
*/

const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "./example.txt";
const input = fs.readFileSync(filePath).toString().trim().split("\n");

let [N, M] = input.shift().trim().split(" ").map(Number);
let vertex = [];

let line = 0;
for (let i = 0; i < M; i++) {
  vertex.push(input[line++].trim().split(" ").map(Number));
}

vertex.sort((a, b) => a[2] - b[2]);

let p = {};

function makeSet(x) {
  if (x in p == false) p[x] = x;
}

function findSet(x) {
  if (x != p[x]) {
    p[x] = findSet(p[x]);
  }
  return p[x];
}

function union(a, b) {
  let rootX = findSet(a);
  let rootY = findSet(b);

  if (rootX == rootY) {
    return;
  } else {
    p[rootY] = rootX;
  }
}

for (let i = 0; i < N; i++) {
  makeSet(i);
}

let edgeCnt = 0;
let maxCost = 0;
let totalCost = 0;

for (let [a, b, cost] of vertex) {
  if (findSet(a) != findSet(b)) {
    union(a, b);
    totalCost += cost;
    maxCost = Math.max(maxCost, cost);
  }

  if (edgeCnt == N - 1) break;
}

console.log(totalCost - maxCost);
