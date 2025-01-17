/*
쉬운 계단 수 -- 다시 풀어보기!

인접한 자리의 숫자 차이가 1 = 계단수
N이 주어질 때 자리수가 N인 계단 수가 총 몇개 있는지 구하기

1<=N<=100

<프로세스>
재귀로 풀면 터질듯 -> dp

N=1
1 2 3 4 5 6 7 8 9

N=2
10 12 21 23 32 34 43 45 54 56 65 67 76 78 87 89 98
N자리가 1,9는 다음에 올 수 있는게 1개, 1~8은 2개씩
길이 N인 i로 마지막 숫자의 가지수 = N-1길이의 i-1로 끝나는 수 + i+1로 끝나는 수

*/
let fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "./example.txt";
let N = parseInt(fs.readFileSync(filePath).toString().trim());

let dp = new Array(N + 1).fill(0);
let DIV = 1000000000;

// DP 배열 초기화
for (let i = 0; i < N + 1; i++) {
  dp[i] = new Array(10).fill(0);
}

// 길이가 1인 계단 수 초기화
for (let i = 1; i < 10; i++) {
  dp[1][i] = 1;
}

// DP 계산
for (let i = 2; i < N + 1; i++) {
  for (let j = 0; j < 10; j++) {
    if (j == 0) {
      dp[i][j] = dp[i - 1][1] % DIV;
    } else if (j == 9) {
      dp[i][j] = dp[i - 1][8] % DIV;
    } else {
      dp[i][j] = (dp[i - 1][j - 1] + dp[i - 1][j + 1]) % DIV;
    }
  }
}

// 결과 계산
let ans = dp[N].reduce((acc, cur) => (acc + cur) % DIV, 0);

// 정답 출력
console.log(ans);
