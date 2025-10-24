/*
연속합 2 (re)

n개 정수 임의 수열, 연속된 몇 개 선택해서 구할 수 있는 가장 큰 합
최소 1개 선택, 수열에서 하나 제거 가능(제거하지 않아도 됨)

10 -4 3 1  5  6  -35 12 21 -1
10  6 9 10 15 21 -14 -2 19 18

<프로세스>
인풋 100000 -> O(n^2)이면 시간초과

dp
dp[i] = arr[i], dp[i-1]+arr[i] <= 기존 연속합

현 인덱스 원소를 삭제할지, 가져갈지 구분 필요
dp[i][j] = arr[1] ~ arr[j]까지 연속합

dp[0][j] = 아무것도 삭제하지 않고 고려한 경우
-> dp[0][j] = max dp[0][j-1]+arr[j], arr[j]

dp[1][j] = 삭제를 한 경우 
1. j 이전에 삭제하지 않은 경우
2. j 이전에 삭제한 경우 
    j번째 원소 반드시 포함 필요 -> j-1번째까지 중 삭제한 경우의 연속합에 arr[j] 더하기
    
-> dp[1][j] = dp[0][j-1], dp[1][j-1] + arr[j]
*/

const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "./example.txt";
const input = fs.readFileSync(filePath).toString().trim().split("\n");

let N = Number(input.shift());
let arr = input[0].split(" ").map(Number);

let dp = Array.from({ length: 2 }, () => new Array(N).fill(0));

dp[0][0] = arr[0];
dp[1][0] = arr[0];

// console.log(arr);
// console.log(dp[0]);

for (let i = 1; i < N; i++) {
  //   console.log(dp[0][i - 1] + arr[i], arr[i]);
  dp[0][i] = Math.max(dp[0][i - 1] + arr[i], arr[i]);
  dp[1][i] = Math.max(dp[0][i - 1], dp[1][i - 1] + arr[i]);
}

// console.log(dp[0]);
// console.log(dp[1]);

let max1 = Math.max(...dp[0]);
let max2 = Math.max(...dp[1]);

// console.log(max1, max2);

console.log(Math.max(max1, max2));
