/*
가장 긴 증가하는 부분 수열


[프로세스]
arr[i] = i번째 숫자가 가장 큰 숫자일 때 수열 길이
*/

const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "./example.txt";
const input = fs.readFileSync(filePath).toString().trim().split("\n");

let N = Number(input.shift().trim());

let arr = new Array(N).fill(1);
let nums = input.shift().trim().split(" ").map(Number);

for (let i = 0; i < N; i++) {
  for (let j = i - 1; j >= 0; j--) {
    if (nums[i] > nums[j]) {
      arr[i] = Math.max(arr[i], arr[j] + 1);
    }
  }
}

console.log(Math.max(...arr));
