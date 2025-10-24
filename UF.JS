// const p = {};

// function makeSet(x) {
//   if (!(x in p)) {
//     p[x] = x;
//   }
// }

// function findSet(x) {
//   if (x != p[x]) {
//     p[x] = findSet(p[x]); // 경로 압축
//   }
//   return p[x];
// }

// function union(x, y) {
//   const rootX = findSet(x);
//   const rootY = findSet(y);

//   if (rootX == rootY) {
//     return;
//   } else {
//     p[rootY] = rootX;
//   }
// }

// let abc = ["A", "B", "C", "D", "E", "F", "G", "H", "I"];

// for (let a of abc) {
//   makeSet(a);
// }

// console.log(p);

let p = {}; //parent

function makeSet(x) {
  if (!(x in p)) {
    p[x] = x;
  }
}

function findSet(x) {
  if (p[x] != x) {
    p[x] = findSet(p[x]);
  }

  return p[x];
}

function union(a, b) {
  let rootX = findSet(a);
  let rootY = findSet(b);

  if (rootX == rootY) return;
  else {
    p[rootY] = rootX;
  }
}

let vertex = [];
vertex.sort((a, b) => a[2] - b[2]);

let maxCost = 0;
let totalCost = 0;
let edgeCnt = 0;

for (let [a, b, cost] of vertex) {
  if (findSet(a) != findSet(b)) {
    union(a, b);
    totalCost += cost;
    maxCost = Math.max(cost, maxCost);
    edgeCnt++;
  }

  if (edgeCnt == N - 1) break;
}

console.log(totalCost - maxCost);
