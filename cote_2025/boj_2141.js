/*

*/

const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "./example.txt";
const input = fs.readFileSync(filePath).toString().trim().split("\n");

let N = Number(input.shift().trim());

let villages = [];
let humans = [];

for (let i = 0; i < N; i++) {
  let [v, h] = input.shift().trim().split(" ").map(Number);

  villages.push(v - 1);
  humans.push(h);
}

let humanSum = [];

let temp = 0;
for (let i = 0; i < N; i++) {
  temp = temp + humans[i];
  humanSum.push(temp);
}

let diff = Number.MAX_VALUE;
let ans = 0;

let left, right;

for (let i = 0; i < N; i++) {
  left = humanSum[i] - humans[i];
  right = humanSum[N - 1] - humanSum[i];

  if (Math.abs(left - right) < diff) {
    diff = Math.abs(left - right);
    ans = i;
  }
}

console.log(ans + 1);
