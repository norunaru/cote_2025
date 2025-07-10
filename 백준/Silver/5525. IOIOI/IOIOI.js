/*
IOIOI

[프로세스]
스택

N으로 문자열 만들기 IOI...I, 길이 = 2*N+1
스택에 들어오는 문자가 I이고 스택 길이가 문자열 길이보다 크거나 같으면 시작 - 50점

슬라이딩 윈도우로 풀어야된다함
찾는 문자열 = I로 시작, OI가 N개 이어짐 
    ex IOIOI N=2
I로 시작하는 인덱스를 i로 두고, i+1, i+2가 OI인지 확인
OI가 N개 이상 -> IOIOIOIOI -> 'IOIOI'OIOI, IO'IOIOI'OI, IOIO'IOIOI' 겹치는 패턴 존재
ans += OI개수 - N + 1

*/

const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "./example.txt";
const input = fs.readFileSync(filePath).toString().trim().split("\n");

let N = Number(input.shift().trim());
let M = Number(input.shift().trim());
let S = input.shift().trim().split("");
let ans = 0;

let i = 0;

while (i < S.length) {
  if (S[i] == "I") {
    let ioCnt = 0;
    while (S[i + 1] == "O" && S[i + 2] == "I") {
      ioCnt++;
      i += 2;
    }
    if (ioCnt >= N) {
      ans += ioCnt - N + 1;
    }
    i++;
  } else {
    i++;
  }
}
console.log(ans);