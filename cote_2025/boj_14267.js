/*
회사 문화

상사가 부하 칭찬 -> 연쇄적으로 내리칭찬
칭찬 수치는 동일하게 내려감
각자 얼마나 칭찬 받았는가?

입력 
n(인원) m(칭찬 횟수)
n명의 직속 상사 번호 n개
m줄:
    칭찬받은 직원 번호 i, 수치 w

[프로세스]
(2 ≤ n, m ≤ 100,000) , w<=1000 -> 최대 칭찬 = 100000*1000
인접 배열식으로 처리하면 O(n^2) 시간초과

dp
*/
const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "./example.txt";
const input = fs.readFileSync(filePath).toString().trim().split("\n");

let [n, m] = input.shift().split(" ").map(Number);
let bossInfo = input.shift().split(" ").map(Number);

let tree = Array.from({ length: n + 1 }, () => []);
for (let i = 1; i <= n; i++) {
  let boss = bossInfo[i - 1];
  if (boss !== -1) {
    tree[boss].push(i);
  }
}

let praise = new Array(n + 1).fill(0);
for (let i = 0; i < m; i++) {
  let [employee, value] = input.shift().split(" ").map(Number);
  praise[employee] += value; // 누적 합산
}

function dfs(current) {
  for (let emp of tree[current]) {
    praise[emp] += praise[current]; // 칭찬 전파
    dfs(emp);
  }
}

dfs(1); // CEO부터 시작

console.log(praise.slice(1).join(" "));
