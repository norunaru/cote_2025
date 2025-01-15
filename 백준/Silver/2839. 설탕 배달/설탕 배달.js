/*
설탕 배달

설탕 정확히 N키로 배달
봉지 3,5키로 존재

최대한 적은 봉지

N키로 배달해야 할 때 몇 개를 들고가야 최소인가


첫째 줄에 N이 주어진다. (3 ≤ N ≤ 5000)
정확히 N못만들면 -1

<프로세스> 
dp배열 생성, 3,5를 1로 두고 시작
N까지 인덱스 증가시키면서 cur-3, cur-5 중 작은 값에 +1해서 저장

 */

let fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "./example.txt";
let input = parseInt(fs.readFileSync(filePath).toString());

//dp배열 초기 설정
let dp = new Array(input + 1).fill(-1);
dp[3] = 1;
if (dp.length > 5) {
  dp[5] = 1;
}

for (let i = 3; i <= input; i++) {
  let three = dp[i - 3]; //i-3인덱스값
  let five = dp[i - 5]; //i-5인덱스값

  if ((three == -1 && five == -1) || i < 5) continue;
  else if (three == -1 && five != -1) dp[i] = five + 1;
  else if (three != -1 && five == -1) dp[i] = three + 1;
  else dp[i] = three < five ? three + 1 : five + 1;
}

// console.log(JSON.stringify(dp));
console.log(dp[input]);
