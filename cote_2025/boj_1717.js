/*
초기 n+1개 집합 0,1,2,...,n
두 원소가 같은 집합인지 확인하는 연산


*/

const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "./example.txt";
const input = fs.readFileSync(filePath).toString().trim().split("\n");

let [n, m] = input.shift().split(" ").map(Number);

let p = {};

function makeSet(x) {
  if (!(x in p)) {
    p[x] = x;
  }
}

function findSet(x) {
  if (x == p[x]) return x;
  else {
    return (p[x] = findSet(p[x]));
  }
}

function union(x, y) {
  const rootX = findSet(x);
  const rootY = findSet(y);

  if (rootX == rootY) return;
  else {
    p[rootY] = rootX;
  }
}
for (let i = 0; i <= n; i++) {
  makeSet(i);
}

for (let i = 0; i < m; i++) {
  let [command, a, b] = input[i].trim().split(" ").map(Number);
  //   console.log(command, a, b);

  if (command == 0) {
    union(a, b);
  } else if (command == 1) {
    const rootA = findSet(a);
    const rootB = findSet(b);
    if (rootA == rootB) console.log("yes");
    else console.log("no");
  }
}
