/*
계단 오르기

1. 계단은 한 번에 한 계단씩 또는 두 계단씩 오를 수 있다. 즉, 한 계단을 밟으면서 이어서 다음 계단이나, 다음 다음 계단으로 오를 수 있다.
2. 연속된 세 개의 계단을 모두 밟아서는 안 된다. 단, 시작점은 계단에 포함되지 않는다.
3. 마지막 도착 계단은 반드시 밟아야 한다.


dp[i] = stairs[i] + stairs[i-1] +  dp[i-3]
dp[i] = stairs[i] + dp[i-2]

0 10 20 15 25
0 10 30 35 55
*/

let fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "./example.txt";
let input = fs.readFileSync(filePath).toString().trim().split("\n");

let N = parseInt(input.shift());

let dp = new Array(N + 1).fill(0);
let stairs = [0];

for (let i = 0; i < input.length; i++) {
  stairs.push(parseInt(input[i]));
}

dp[1] = stairs[1];
dp[2] = stairs[1] + stairs[2];

for (let i = 3; i < N + 1; i++) {
  dp[i] = Math.max(
    dp[i - 2] + stairs[i],
    dp[i - 3] + stairs[i - 1] + stairs[i]
  );
}

console.log(dp[N]);
