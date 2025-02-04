/*
문자열 폭발 

문자열 사이에 폭발 문자열 존재
폭발시 해당 문자는 사라지며 남은 문자열이 합쳐짐

폭발 과정 : 
문자열이 폭발 문자열 포함시 모든 폭발 문자열이 폭발, 남은 문자열은 순서대로 이어붙여 새로운 문자열
새로 생긴 문자열에 폭발 문자열이 있을 수도 있음
문자열에 폭발 문자열이 없을 때까지 계속

모든 폭발이 끝난 뒤 어떤 문자열이 남을까?

폭발 문자열은 같은 문자를 두 개 이상 포함 X

첫째 줄에 문자열이 주어진다. 문자열의 길이는 1보다 크거나 같고, 1,000,000보다 작거나 같다.
둘째 줄에 폭발 문자열이 주어진다. 길이는 1보다 크거나 같고, 36보다 작거나 같다.
두 문자열은 모두 알파벳 소문자와 대문자, 숫자 0, 1, ..., 9로만 이루어져 있다.

<프로세스>
1. 단순한 문자열 탐색
앞에서부터 보면서 문자열 탐색하고 삭제
문자열 길이=N, 폭발 문자열 길이 =M -> O(NM)
최악의 경우 폭발 후에도 다시 탐색 -> O(N^2 * M)

2. 스택
문자열 하나씩 스택에 넣음
스택의 길이가 폭발문자열보다 길다면 폭발문자열 마지막 글자 들어올 때 그 길이만큼 검사
폭발문자열이면 팝

*/
const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "./example.txt";
const input = fs.readFileSync(filePath).toString().trim().split("\n");

let str = input[0].trim().split("");
let bomb = input[1].split("");

let stk = [];

for (let i = 0; i < str.length; i++) {
  stk.push(str[i]);
  let top = stk[stk.length - 1];
  let bombTop = bomb[bomb.length - 1];

  if (stk.length >= bomb.length && top == bombTop) {
    let flag = true;

    for (let j = 0; j < bomb.length; j++) {
      if (stk[stk.length - 1 - j] != bomb[bomb.length - 1 - j]) {
        flag = false;
        break;
      }
    }

    if (flag) {
      for (let k = 0; k < bomb.length; k++) {
        stk.pop();
      }
    }
  }
}

if (stk.length == 0) {
  console.log("FRULA");
} else {
  console.log(stk.join(""));
}
