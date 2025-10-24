/*
스네이크버드

과일 먹으면 길이 1 증가
과일은 지상으로부터 일정 높이,
자신의 길이보다 작거나 같은 높이 과일 먹을 수 있음
처음 길이가 L일 때 늘릴 수 있는 최대 길이?

과일 개수 N <=1000
스네이크버드 초기 길이 L <=10000

과일 높이 h1~hn <=10000

<프로세스>
과일배열 정렬
인덱스 하나씩 증가, 현재길이>=높이 -> 길이 증가, 다음 인덱스, 아니면 종료
*/

let fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "./example.txt";
let input = fs.readFileSync(filePath).toString().trim().split("\n");

let [N, L] = input[0].split(" ").map((v) => parseInt(v));

let fruits = input[1]
  .split(" ")
  .map((v) => parseInt(v))
  .sort((a, b) => a - b);

let idx = 0;

// console.log(L);
// console.log(JSON.stringify(fruits));

while (fruits[idx] <= L && idx < N) {
  L++;
  idx++;
}

console.log(L);
