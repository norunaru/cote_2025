/*
차트

모든 개 마리수는 항상 100마리
중심을 지나는 선의 개수가 최대가 되도록

[프로세스]
순열
*/

const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "./example.txt";
const input = fs.readFileSync(filePath).toString().trim().split("\n");

let N = Number(input.shift().trim());
let nums = input.shift().trim().split(" ").map(Number);

let isUsed = new Array(N).fill(false);

let ans = 0;
let arr = new Array(N).fill(0);

// 순열로 가능한 모든 배치 탐색
function perm(cnt) {
  // 순열 완성 -> 누적합 계산
  if (cnt == N) {
    for (let i = 0; i < N; i++) {
      let sum = arr[i];
      let temp = 0;
      for (let j = i + 1; j < N; j++) {
        sum += arr[j];
        if (sum % 100 == 50) temp++;
      }

      ans = Math.max(temp, ans);
    }
    return;
  }

  for (let i = 0; i < N; i++) {
    if (isUsed[i] == false) {
      isUsed[i] = true;
      arr[cnt] = nums[i];
      perm(cnt + 1);
      isUsed[i] = false;
    }
  }
}

perm(0);

console.log(ans);
