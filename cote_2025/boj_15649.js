/*
N과 M(1)

N,M이 주어졌을 때 길이가 M인 수열 모두 구하기
1~N중 중복 없이 M개 고른 수열

순열

*/

let fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "./example.txt";
let input = fs
  .readFileSync(filePath)
  .toString()
  .split(" ")
  .map((v) => parseInt(v));

// console.log(JSON.stringify(input));

let [N, M] = input;

let nums = [];
for (let i = 0; i < N; i++) {
  nums.push(i + 1);
}

let isUsed = new Array(N).fill(false);
let ans = new Array(M).fill(0);

function perm(cnt) {
  if (cnt == M) {
    console.log(ans.join(" "));
    return;
  }

  for (let i = 0; i < N; i++) {
    if (isUsed[i] == false) {
      isUsed[i] = true;
      ans[cnt] = nums[i];
      perm(cnt + 1);
      isUsed[i] = false;
    }
  }
}

perm(0);
