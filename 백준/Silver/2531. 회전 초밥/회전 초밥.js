
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
