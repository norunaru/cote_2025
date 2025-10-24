/*
N과 M(3)

N,M이 주어졌을 때 
1부터 N까지 자연수 중 M개 고른 수열
같은 수 여러 번 골라도 됨

<프로세스> 
같은 수 여러번 = 중복순열
*/

let fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "./example.txt";
let [N, M] = fs
  .readFileSync(filePath)
  .toString()
  .split(" ")
  .map((v) => parseInt(v));

let nums = [];
let result = new Array(M).fill(0);

let output = "";

for (let i = 0; i < N; i++) {
  nums.push(i + 1);
}

function perm(cnt) {
  if (cnt == M) {
    output += result.join(" ") + "\n";
    return;
  }

  for (let i = 0; i < N; i++) {
    result[cnt] = nums[i];
    perm(cnt + 1);
  }
}

perm(0);

console.log(output);
