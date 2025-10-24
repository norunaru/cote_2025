/*
주식

주식 하나 사기
주식 팔기
가만히 있기

미래를 알 때 최고 이익은?

[프로세스]
현재 구입하는 시점 "이후" 최고점에 매도하는 것이 최대 이득
앞에서부터 탐색시 현재 시점 이후 최고가가 언제인지 모름

반대로 뒤에서부터 탐색
-> 매수 시점 이후 최고가를 확정시킨 상태
price[i] > price[i-1] -> acc
price[i] < price[i-1] -> max = price[i-1]

*/
const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "./example.txt";
const input = fs.readFileSync(filePath).toString().trim().split("\n");

let T = Number(input.shift());

for (let tc = 0; tc < T; tc++) {
  let N = Number(input.shift());
  let price = input.shift().trim().split(" ").map(Number);

  let ans = 0;
  let maxPrice = price[N - 1];

  for (let i = N - 1; i >= 1; i--) {
    if (maxPrice > price[i - 1]) ans += maxPrice - price[i - 1];
    else maxPrice = price[i - 1];
  }

  console.log(ans);
}
