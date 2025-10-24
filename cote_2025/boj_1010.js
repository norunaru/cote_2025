/*
동 -> 서 다리 짓기
서쪽 N개, 동쪽 M개, N<=M

다리를 N개 지으려고 함

다리끼리 겹쳐질 수 없을 경우 가능한 경우의 수?

<입력>
첫 줄에는 테스트 케이스의 개수 T
서쪽과 동쪽에 있는 사이트의 개수 정수 N, M (0 < N ≤ M < 30)

<프로세스>
겹쳐질 수 없다 = 오른쪽 M개중에 N개 선택, 순서는 고려 안함 = 조합

일반
*/

let fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
let input = fs.readFileSync(filePath).toString().trim().split("\n");
const tc = parseInt(input.shift());

let dp;

for (let i = 0; i < tc; i++) {
  const curLine = input[i].split(" ");
  const N = parseInt(curLine[0]);
  const M = parseInt(curLine[1]);

  // dp 배열 초기화
  dp = new Array(N + 1);
  for (let row = 0; row <= N; row++) {
    dp[row] = new Array(M + 1).fill(0);
  }

  let result = comb(N, M);
  console.log(result);
}

// DP 기반 조합 계산 함수
function comb(m, n) {
  if (dp[m][n] > 0) {
    return dp[m][n];
  } else if (m === n || m === 0) {
    dp[m][n] = 1; // m == n 또는 m == 0인 경우 조합값은 1
    return dp[m][n];
  } else {
    dp[m][n] = comb(m - 1, n - 1) + comb(m, n - 1);
    return dp[m][n];
  }
}
