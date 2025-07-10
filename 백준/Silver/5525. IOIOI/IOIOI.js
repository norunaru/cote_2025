/*
IOIOI

[프로세스]
스택

N으로 문자열 만들기 IOI...I, 길이 = 2*N+1
스택에 들어오는 문자가 I이고 스택 길이가 문자열 길이보다 크거나 같으면 시작
*/

const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "./example.txt";
const input = fs.readFileSync(filePath).toString().trim().split("\n");

let N = Number(input.shift().trim());
let M = Number(input.shift().trim());
let S = input.shift().trim().split("");

let strLen = 2 * N + 1; //IOIOI 문자열 길이
let stk = [];
let temp = [];
let ans = 0;

//IOIOI문자열 생성성
let ioi = new Array(strLen).fill("");
for (let i = 0; i < strLen; i++) {
  if (i % 2 == 0) ioi[i] = "I";
  else ioi[i] = "O";
}

// console.log(JSON.stringify(S));
// console.log(JSON.stringify(ioi));

for (let s of S) {
  stk.push(s);

  if (s == "I" && stk.length >= strLen) {
    let idx = 0; //문자열과 비교하는 위치

    while (idx != strLen) {
      if (stk[stk.length - 1] == ioi[idx]) temp.push(stk.pop());
      else break;
      idx++;
    }

    if (temp.length == strLen) ans++;

    while (temp.length != 0) {
      stk.push(temp.pop());
    }
  }
}

console.log(ans);
