/*
회의실배정

*/
const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "./example.txt";
const input = fs.readFileSync(filePath).toString().trim().split("\n");

let N = Number(input.shift().trim());

let arr = [];

for (let i = 0; i < N; i++) {
  let [start, end] = input[i].trim().split(" ").map(Number);

  arr.push([start, end]);
}

arr.sort((a, b) => a[1] - b[1]);

// console.log(JSON.stringify(arr));

let ans = 1;
let endTime;
endTime = arr[0][1];

for (let i = 1; i < N; i++) {
  if (arr[i][0] > endTime) {
    ans++;
    endTime = arr[i][1];
  }
}

console.log(ans);
