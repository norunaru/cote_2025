/*
2*n 타일링

2*n 직사각형을 1*2, 2*1, 2*2타일로 채우는 방법의 수

입력
첫째 줄에 n이 주어진다. (1 ≤ n ≤ 1,000)

출력
첫째 줄에 2×n 크기의 직사각형을 채우는 방법의 수를 10,007로 나눈 나머지를 출력한다.

<프로세스>
1칸 = 1
2칸 = 3
3칸 = 5
4칸 = 

2칸 -> 3가지 방법
+1칸 -> 1*2 넣는 경우 추가
*/

let fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "./example.txt";
const n = parseInt(fs.readFileSync(filePath).toString().trim());

let dp = new Array(n + 1).fill(0);

for (let i = 0; i < n + 1; i++) {
  if (i == 0 || i == 1) dp[i] = 1;
  else {
    dp[i] = (dp[i - 1] + 2 * dp[i - 2]) % 10007;
  }
}

console.log(dp[n]);
