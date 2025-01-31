/*
Z

2^n * 2^n 크기 배열을 Z모양으롵 탐색

0 1 
2 3

N이 주어졌을 때 r행 c열을 몇 번째로 방문하는지 출력

<프로세스>
n=2

r<=2^(n-1), c<=2^(n-1)   1사분면
r<=2^(n-1), c>=2^(n-1)   1사분면
r<=2^(n-1), c<=2^(n-1)   1사분면
r<=2^(n-1), c<=2^(n-1)   1사분면

각 사분면의 시작 좌표 = half^2 * 사분면번호






*/
const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "./example.txt";
const [N, r, c] = fs
  .readFileSync(filePath)
  .toString()
  .trim()
  .split(" ")
  .map(Number);

function Z(n, row, col) {
  if (n == 0) return 0;
  let half = 1 * 2 ** (n - 1);

  if (row < half && col < half) return Z(n - 1, row, col);
  if (row < half && col >= half) return half * half + Z(n - 1, row, col - half);
  if (row >= half && col < half)
    return half * half * 2 + Z(n - 1, row - half, col);
  if (row >= half && col >= half)
    return half * half * 3 + Z(n - 1, row - half, col - half);

  return 0;
}

let ans = Z(N, r, c);
console.log(ans);
