/*
운동

V개 마을, E개 도로 일방통행
1,V까지 마을 번호

도로 길이 합이 가장 작은 사이클 찾기

[프로세스]
플로이드 워셜로 모든 정점 간 최소 거리 계산
dist[i][j] = i에서 ??거쳐서 j까지 가는 최소 거리
dist[j][i] = j에서 ??거쳐서 i까지 가는 최소 거리

dist[i][j],dist[j][i]가 INF 아니면 사이클 존재 의미 -> 최소값만 구하면 정답
*/

const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "./example.txt";
const input = fs.readFileSync(filePath).toString().trim().split("\n");

let [V, E] = input.shift().trim().split(" ").map(Number);

let dist = Array.from({ length: V }, () => new Array(V).fill(Infinity));

for (let i = 0; i < E; i++) {
  let [a, b, cost] = input[i].trim().split(" ").map(Number);
  a -= 1;
  b -= 1;

  dist[a][b] = cost;
}

for (let i = 0; i < V; i++) {
  dist[i][i] = 0;
}

//플로이드워셜
//i->j vs i->k->j
for (let k = 0; k < V; k++) {
  for (let i = 0; i < V; i++) {
    for (let j = 0; j < V; j++) {
      dist[i][j] = Math.min(dist[i][j], dist[i][k] + dist[k][j]);
    }
  }
}

let ans = Infinity;

for (let i = 0; i < V; i++) {
  for (let j = 0; j < V; j++) {
    if (i == j) continue;
    if (dist[i][j] != Infinity && dist[j][i] != Infinity) {
      ans = Math.min(ans, dist[i][j] + dist[j][i]);
    }
  }
}

if (ans == Infinity) {
  console.log(-1);
} else {
  console.log(ans);
}
