/*
N과 M(2)

1~N까지 자연수 중 중복 없이 M개 고른 수열
고른 수열은 오름차순

<프로세스>
중복 없이 = 조합


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

for (let i = 0; i < N; i++) {
  nums.push(i + 1);
}

function comb(cnt, start) {
  if (cnt == M) {
    console.log(result.sort((a, b) => a - b).join(" "));
    return;
  }

  for (let i = start; i < N; i++) {
    result[cnt] = nums[i];
    comb(cnt + 1, i + 1);
  }
}

comb(0, 0);
