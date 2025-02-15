/*
A와 B 2

문자열 S,T가 주어졌을 떄 S를 T로 바꾸기

연산 2개:
1. 문자열 뒤에 A 추가
2. 문자열 뒤에 B 추가하고 reverse

<프로세스> 
문자열 길이 <= 50, 연산 2개 -> 브루트포스로 풀면 시간초과

연산을 거꾸로?
문자열 맨 뒤가 A다 -> 연산 1 수행한 결과
문자열 맨 앞이 B다 -> 연산 2 수행한 결과

1. 문자열 뒤에서 A 제거
2. 문자열 앞의 B제거하고 reverse
*/
const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "./example.txt";
let [S, T] = fs.readFileSync(filePath).toString().trim().split("\n");

let ans = 0;

function recursive(str) {
  if (str.length === S.length) {
    if (str === S) {
      ans = 1;
    }
    return; // 길이가 같다면 비교 후 바로 종료해야 함
  }

  if (str[str.length - 1] === "A") {
    recursive(str.slice(0, -1)); // 마지막 'A' 제거 후 재귀 호출
  }

  if (str[0] === "B") {
    recursive(str.slice(1).split("").reverse().join("")); // 첫 번째 'B' 제거 후 뒤집기
  }
}

recursive(T);

console.log(ans);
