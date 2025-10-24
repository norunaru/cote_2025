/*
DNA 비밀번호

DNA문자열은 A,C,G,T로 구성
긴 문자열 만들고 일부를 부분문자열로 사용

DNA 문자열, 사용할 부분분자열의 길이, {‘A’, ‘C’, ‘G’, ‘T’} 가 각 몇번 이상 필요한지
만들 수 있는 비밀번호 종류 수?

<프로세스>
ACGT 등장 횟수 저장용 배열 생성, 초기 0,0,0,0으로 설정
부분문자열 길이 P만큼 초기에 0인덱스부터 검사, 저장배열 값 설정
P시작인덱스, 끝인덱스 1씩 증가시키면서 저장배열 수정, 주어진 조건에 맞는지 검사 후 ans++

*/

let fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "./example.txt";
let input = fs.readFileSync(filePath).toString().trim().split("\n");

//전체 길이, 답으로 사용할 길이
let [S, P] = input
  .shift()
  .trim()
  .split(" ")
  .map((v) => parseInt(v));

//주어진 문자열
let code = input.shift().trim().split("");
//ACGT 카운트
let cnt = new Array(4).fill(0);

//필수 개수
let mins = input[0].split(" ").map((v) => parseInt(v));

let ans = 0;

//초기 설정
for (let i = 0; i < P; i++) {
  if (code[i] == "A") {
    cnt[0] += 1;
  } else if (code[i] == "C") {
    cnt[1] += 1;
  } else if (code[i] == "G") {
    cnt[2] += 1;
  } else if (code[i] == "T") {
    cnt[3] += 1;
  }
}

function check(min, cnts) {
  let flag = true;
  for (let i = 0; i < 4; i++) {
    if (min[i] > cnts[i]) flag = false;
  }

  if (flag) ans++;

  return;
}

//0~P-1까지 첫 길이에 대해서는 초기에 검사하고 시작
check(mins, cnt);

//이후 현재 검사중인 문자열의 맨 앞-1 인덱스 값은 뺴고, 마지막 인덱스 문자는 추가
for (let i = 1; i < S - P + 1; i++) {
  let left = i - 1;
  let right = i + P - 1;

  if (code[left] == "A") {
    cnt[0] -= 1;
  } else if (code[left] == "C") {
    cnt[1] -= 1;
  } else if (code[left] == "G") {
    cnt[2] -= 1;
  } else if (code[left] == "T") {
    cnt[3] -= 1;
  }

  if (code[right] == "A") {
    cnt[0] += 1;
  } else if (code[right] == "C") {
    cnt[1] += 1;
  } else if (code[right] == "G") {
    cnt[2] += 1;
  } else if (code[right] == "T") {
    cnt[3] += 1;
  }

  check(mins, cnt);
}

console.log(ans);
