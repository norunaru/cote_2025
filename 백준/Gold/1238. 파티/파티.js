/*
N개 숫자 구분된 각 마을에 한 명씩
N명 학생이 ?번 마을에 모여 파티
마을 사이에 총 M개 단방향 도로, i번째 길 코스트 Ti

?마을로 갔다 다시 돌아와야 함
최단시간에 오고 가기 원함

[프로세스]
다익스트라
*/

const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "./example.txt";
const input = fs.readFileSync(filePath).toString().trim().split("\n");

let [N, M, X] = input.shift().trim().split(" ").map(Number);
X -= 1;

let isVisited = new Array(N).fill(false);
let dist = new Array(N).fill(Infinity);

let rVisited = new Array(N).fill(false); //역방향 방분배열, 거리
let rDist = new Array(N).fill(Infinity);

let arr = Array.from({ length: N }, () => new Array(N).fill(-1));
let rArr = Array.from({ length: N }, () => new Array(N).fill(-1));

for (let i = 0; i < M; i++) {
  let [a, b, cost] = input[i].trim().split(" ").map(Number);
  a -= 1;
  b -= 1;
  arr[a][b] = cost;
  rArr[b][a] = cost;
}

function dijkstra(start, isVisited, arr, dist) {
  isVisited[start] = true;

  for (let i = 0; i < N; i++) {
    if (isVisited[i] == true) continue;
    if (arr[start][i] != -1) {
      dist[i] = Math.min(dist[i], dist[start] + arr[start][i]);
    }
  }

  let nextNode = findNextNode(isVisited, dist);
  if (nextNode != -1) {
    dijkstra(nextNode, isVisited, arr, dist);
  }
}

function findNextNode(isVisited, dist) {
  let cost = Infinity;
  let no = -1;

  for (let i = 0; i < N; i++) {
    if (isVisited[i] == true || dist[i] == Infinity) continue;
    if (cost > dist[i]) {
      cost = dist[i];
      no = i;
    }
  }
  return no;
}

dist[X] = 0;
rDist[X] = 0;

dijkstra(X, isVisited, arr, dist);
dijkstra(X, rVisited, rArr, rDist);

let ans = 0;

for (let i = 0; i < N; i++) {
  if (i == X) continue;
  let temp = dist[i] + rDist[i];

  ans = Math.max(ans, temp);
}

console.log(ans);
