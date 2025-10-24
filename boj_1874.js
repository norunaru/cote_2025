/*
스택 수열

*/
const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "./example.txt";
const input = fs.readFileSync(filePath).toString().trim().split("\n");

let N = Number(input.shift().trim());
let nums = [];

for (let i = 1; i <= N; i++) {
  nums.push(i);
}

let target = []; //목표 문자열

for (let i = 0; i < N; i++) {
  target.push(Number(input.shift().trim()));
}
// console.log(JSON.stringify(nums));
// console.log(JSON.stringify(target));

let idx = 0;
let stk = [];
let temp = []; //스택에서 뺸 문자열
let ans = [];

for (let i = 0; i < N; i++) {
  //   console.log("stk:", JSON.stringify(stk));
  //   console.log("temp:", JSON.stringify(temp));
  //   console.log("--------------------");

  let cur = nums[i];
  stk.push(cur);
  ans.push("+");

  while (stk.length != 0 && stk[stk.length - 1] == target[idx]) {
    temp.push(stk.pop());
    ans.push("-");
    idx++;
  }
}

// console.log(JSON.stringify(temp));
// console.log(ans);

let flag = true;
for (let i = 0; i < target.length; i++) {
  if (target[i] != temp[i]) flag = false;
}

if (flag) {
  console.log(ans.join("\n"));
} else {
  console.log("NO");
}
