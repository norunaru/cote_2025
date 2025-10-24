/*
가장 긴 바이토닉 부분 수열

[프로세스]
arr1[i] = i번쨰 숫자가 마지막일 때 증가하는 수열 최대 길이
arr2[i] = i번쨰 숫자가 마지막일 떄 증가하는 역방향 수열 최대 길이
*/

const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "./example.txt";
const input = fs.readFileSync(filePath).toString().trim().split("\n");

let N = Number(input.shift().trim());

let arr1 = new Array(N).fill(1); //증가 수열
let arr2 = new Array(N).fill(1); //감소 수열
let nums = input.shift().trim().split(" ").map(Number);

for (let i = 0; i < N; i++) {
  for (let j = i - 1; j >= 0; j--) {
    if (nums[i] > nums[j]) {
      arr1[i] = Math.max(arr1[i], arr1[j] + 1);
    }
  }
}

for (let i = N - 1; i >= 0; i--) {
  for (let j = i + 1; j < N; j++) {
    if (nums[i] > nums[j]) {
      arr2[i] = Math.max(arr2[i], arr2[j] + 1);
    }
  }
}

let ans = 0;

for (let i = 0; i < N; i++) {
  let temp = arr1[i] + arr2[i] - 1;
  ans = Math.max(temp, ans);
}

console.log(ans);
