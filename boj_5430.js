/*
AC

R 배열 뒤집기
D 첫번쨰 수 버리기


// */
// const fs = require("fs");
// const filePath = process.platform === "linux" ? "/dev/stdin" : "./example.txt";
// const input = fs.readFileSync(filePath).toString().trim().split("\n");

// let T = Number(input.shift().trim());

// let line = 0;
// A: for (let tc = 0; tc < T; tc++) {
//   let command = input[line++].trim().split("");
//   let N = Number(input[line++].trim());
//   let nums = JSON.parse(input[line++].trim());

//   let front = 0;
//   let back = nums.length;
//   let isReversed = false;

//   for (let c of command) {
//     if (c == "R") {
//       isReversed = !isReversed;
//     } else if (c == "D") {
//       if (front >= back) {
//         console.log("error");
//         continue A;
//       } else {
//         if (!isReversed) front++;
//         else back--;
//       }
//     }
//   }

//   if (isReversed) {
//     nums = [...nums].reverse();
//   }
//   console.log(JSON.stringify(nums.slice(front, back)));
// }

const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "./example.txt";
const input = fs.readFileSync(filePath).toString().trim().split("\n");

const N = Number(input[0]);
const M = Number(input[1]);
const S = input[2].trim();

let ans = 0;
let cnt = 0;

for (let i = 1; i < M - 1; i++) {
  if (S[i - 1] == "I" && S[i] == "O" && S[i + 1] == "I") {
    cnt++;
    if (cnt == N) {
      ans++;
      cnt--;
    }

    i++;
  } else {
    cnt = 0;
  }
}

console.log(ans);
