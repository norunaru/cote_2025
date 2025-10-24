/*
문자열 폭발

문자열 내 폭발 문자열 존재 -> 그 문자는 사라지고 남은 문자열 합쳐짐

- 폭발 문자열 포함시 모든 폭발 문자열 폭발, 남은 문자열 붙임
- 새로 생긴 문자열에 폭발 문자열 포함되면 
- 폭발 문자열이 없을 때까지 반복


*/

const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "./example.txt";
const input = fs.readFileSync(filePath).toString().trim().split("\n");

let string = input[0].trim().split("");
let bomb = input[1].trim().split("");
let bLen = bomb.length;

let stk = [];
let top;

for (let s of string) {
  stk.push(s);

  if (s == bomb[bomb.length - 1]) {
    if (stk.slice(stk.length - bLen, stk.length).join("") == bomb.join("")) {
      for (let i = 0; i < bLen; i++) {
        stk.pop();
      }
    }
  }
}

if (stk.length != 0) {
  console.log(stk.join(""));
} else {
  console.log("FRULA");
}
