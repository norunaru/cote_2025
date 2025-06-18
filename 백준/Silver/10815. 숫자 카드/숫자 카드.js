/*
숫자 카드 N개
M개 정수 주어졌을 때 이 수가 적힌 카드를 갖고있는가


*/

const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "./example.txt";
const input = fs.readFileSync(filePath).toString().trim().split("\n");

let N = Number(input[0].trim());
let myNums = input[1].trim().split(" ").map(Number);

let M = Number(input[2].trim());
let nums = input[3].trim().split(" ").map(Number);

let set = new Set();
for (let i = 0; i < N; i++) {
  set.add(myNums[i]);
}

let ans = [];

for (let i = 0; i < M; i++) {
  let cur = nums[i];
  if (set.has(cur)) ans.push(1);
  else ans.push(0);
}

console.log(ans.join(" "));
