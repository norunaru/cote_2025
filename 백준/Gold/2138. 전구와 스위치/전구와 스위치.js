/*
N개 스위치, N개 전구
전구는 on/off
i(1<i<N) 번 스위치 누르면 i-1, i, i+1 전구 상태 반대로
1번 -> 1,2  / N번 -> N-1, N
현재 상태, 만들고자 하는 상태 주어지면 최소 몇 번 눌러야 하는가?
*/
const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "./example.txt";
const input = fs.readFileSync(filePath).toString().trim().split("\n");

let N = Number(input.shift());
let ans = Number.MAX_VALUE;

let initial = input.shift().trim().split("").map(Number);
let target = input.shift().trim().split("").map(Number);

let arr;

function change(i) {
  if (i >= 0 && i < N) {
    arr[i] = arr[i] === 0 ? 1 : 0;
  }
}

function checkPrev(i) {
  return arr[i - 1] !== target[i - 1];
}

// 첫 번째 시도: 1번 스위치 누른 경우
arr = [...initial];
change(0);
change(1);
let cnt1 = 1;
for (let i = 1; i < N; i++) {
  if (checkPrev(i)) {
    cnt1++;
    change(i - 1);
    change(i);
    change(i + 1);
  }
}
if (arr.join("") === target.join("")) {
  ans = cnt1;
}

// 두 번째 시도: 1번 스위치 안 누른 경우
arr = [...initial];
let cnt2 = 0;
for (let i = 1; i < N; i++) {
  if (checkPrev(i)) {
    cnt2++;
    change(i - 1);
    change(i);
    change(i + 1);
  }
}
if (arr.join("") === target.join("")) {
  ans = Math.min(ans, cnt2);
}

console.log(ans === Number.MAX_VALUE ? -1 : ans);
