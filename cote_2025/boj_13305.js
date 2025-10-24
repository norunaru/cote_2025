/*
주유소

N개 도시, 일직선

처음 출발시 기름 넣고 출발, 기름통 크기 무제한
1km = 1L

도시마다 리터당 가격 다름

N개 도시 = N-1개 도로


<프로세스>
마지막 도시의 기름 가격은 고려할 필요 X
현재 도시의 기름 가격이 이후 도시보다 싸다면 많이, 비싸면 적게

N-1 크기 기름 가격, 도로 길이 배열 생성

0인덱스부터 기름 가격 검사, 
다음 가격이 더 비싸면 현재 가격으로 계속 곱해서 계산

다음이 더 싸다면 현재 인덱스만 곱해서 다음으로 넘김

*/

const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "./example.txt";
const input = fs.readFileSync(filePath).toString().trim().split("\n");

let N = parseInt(input.shift());

let len = input
  .shift()
  .trim()
  .split(" ")
  .map((v) => parseInt(v));

// console.log(JSON.stringify(price));

let price = input
  .shift()
  .trim()
  .split(" ")
  .map((v) => parseInt(v));
price.pop();
// console.log(JSON.stringify(len));

let ans = 0;
let minPrice = price[0];

for (let i = 0; i < N - 1; i++) {
  //현재 도시가
  if (minPrice > price[i]) {
    minPrice = price[i];
  }
  ans += minPrice * len[i];
}

console.log(ans);
