/*
회전초밥

벨트 위 같은 종류 초밥 존재 가능

1. 벨트 임의 위치부터 k개 연속 먹으면 할인 가격
2. 초밥 종류 쿠폰 발행, 1번 행사 참가시 이 쿠폰에 적힌 초밥 무료 제공
    벨트 위에 없으면 만들어서 줌

가능한 한 다양한 종류의 초밥을 먹으려고 한다

[프로세스]
O(N)으로 처리
배열 검사하면서 set으로 만들고 개수 처리
*/
// const fs = require("fs");
// const filePath = process.platform === "linux" ? "/dev/stdin" : "./example.txt";
// const input = fs.readFileSync(filePath).toString().trim().split("\n");

// let [N, d, k, c] = input.shift().trim().split(" ").map(Number);

// let arr = [];

// for (let i = 0; i < N; i++) {
//   arr.push(Number(input[i].trim()));
// }

// for (let i = 0; i < k; i++) {
//   arr.push(arr[i]);
// }

// let ans = 0;
// let temp;

// for (let i = 0; i < N; i++) {
//   temp = arr.slice(i, i + k);
//   let set = new Set();
//   for (v of temp) {
//     set.add(v);
//   }
//   let count = set.size;
//   if (!set.has(c)) count++;
//   ans = Math.max(ans, count);
// }

// console.log(ans);

// let arr2 = Array.from({ length: N }, () => new Array(M));

const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "./example.txt";
const input = fs.readFileSync(filePath).toString().trim().split("\n");

let [N, d, k, c] = input.shift().trim().split(" ").map(Number);

let arr = [];

for (let i = 0; i < N; i++) {
  arr.push(Number(input[i].trim()));
}

for (let i = 0; i < k; i++) {
  arr.push(Number(input[i].trim()));
}

let ans = 0;

for (let i = 0; i < N; i++) {
  let s = new Set();
  for (let j = 0; j < k; j++) {
    s.add(arr[i + j]);
  }

  let count = s.size;

  if (!s.has(c)) count++;

  ans = Math.max(ans, count);
}

console.log(ans);
