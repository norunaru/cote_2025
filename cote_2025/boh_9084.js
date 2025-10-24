/*
동전

동전 종류 N개 존재
a원, b원, c원...

위 동전들로 M원을 만들 수 있는 가지수는?

테스트 케이스의 개수 T(1 ≤ T ≤ 10)
첫 번째 줄에는 동전의 가지 수 N(1 ≤ N ≤ 20)
N가지 동전의 각 금액이 오름차순

<프로세스>
브루트포스로 풀면 시간초과 -> dp

dp 배열 사이즈 M+1로 설정
a,b,c... 인덱스의 값은 1로 설정

각 인덱스 = 금액, 인덱스의 값 = 가지수

인덱스 증가, 각 인덱스에 대해 -a, -b, -c인덱스에 저장된 값을 더함
이때 동전을 한번에 고려하지 않고 하나씩만 고려해서 반복적으로 수행
이유 : 1,2 원으로 3원 만든다 가정할 때 dp[3] = dp[3-2] + dp[3-1]이 되는데 이러면 2원1원, 1원2원과 같은 중복 발생
*/

const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "./example.txt";
const input = fs.readFileSync(filePath).toString().trim().split("\n");

let T = Number(input.shift());

for (let tc = 0; tc < T; tc++) {
  let N = Number(input.shift());
  let coins = input.shift().split(" ").map(Number);
  let M = Number(input.shift());

  let dp = new Array(M + 1).fill(0);
  dp[0] = 1;

  coins.forEach((coin) => {
    for (let i = 1; i < M + 1; i++) {
      if (dp[i - coin] != undefined) {
        dp[i] += dp[i - coin];
      }
    }
  });
  console.log(dp[M]);
}
