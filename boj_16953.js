/*
a->b

정수 a를 b로 바꾸려고 한다
2곱하기
1을 수의 가장 오른쪽에 추가

[프로세스]
dp

*2
*10+1
메모리초과나네

역방향 그리디

*/

const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "./example.txt";
const input = fs.readFileSync(filePath).toString().trim().split("\n");

let [A, B] = input[0].split(" ").map(Number);
let count = 1;

while (B > A) {
  if (B % 2 === 0) {
    B = B / 2;
  } else if (B % 10 === 1) {
    B = Math.floor(B / 10);
  } else {
    console.log(-1);
    return;
  }
  count++;
}

console.log(B === A ? count : -1);

let p = {};

function makeSet(x) {
  if (x in p) return;
  else p[x] = x;
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
  else p[rootY] = rootX;
}
