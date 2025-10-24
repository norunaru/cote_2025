/*
0 만들기

1~N N개 숫자 오름차순 1,2,3,..,N

+,-,' '중 하나를 숫자 사이 삽입
더하기, 빼기, 숫자 이어붙이기

N이 주어졌을 때 수식 결과가 0이 되는 모든 수식을 찾아라

첫 번째 줄에 테스트 케이스의 개수가 주어진다(<10).
각 테스트 케이스엔 자연수 N이 주어진다(3 <= N <= 9).

<프로세스>
오름차순 배열 2N-1 생성
인덱스 홀수 = 값, 짝수 = 문자

temp 배열 생성, 각 재귀에 사용
result 배열 생성 -> 이후 sort하여 출력

recursive(idx)
idx==2N 기저조건, 생성된 temp 계산하여 0이면 result에 저장
*/

const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "./example.txt";
const input = fs.readFileSync(filePath).toString().trim().split("\n");

let T = Number(input.shift());
let N;
let ans;

for (let tc = 0; tc < T; tc++) {
  N = Number(input[tc]);

  //오름차순 배열, 중간중간 빈 공간
  let arr = new Array(2 * N - 1).fill(0);
  let num = 1;
  for (let i = 0; i < 2 * N - 1; i += 2) {
    arr[i] = num;
    num += 1;
  }

  ans = [];
  let temp = [...arr];
  console.log(JSON.stringify(temp));

  recursive(1, temp);

  for (let i = 0; i < ans.length; i++) {
    console.log(JSON.stringify(ans[i]));
  }
}
//------------------------------------------------------------
function recursive(idx, temp) {
  if (idx > 2 * N - 2) {
    //완성된 문자열 검사
    temp = temp.filter((a) => a != ""); //3,2,'+',4,'-'

    let numStr = "";
    let result = 0;
    let operator = "+";

    for (let i = 0; i < temp.length; i++) {
      if (typeof temp[i] == "number") {
        numStr += temp[i];
      } else {
        let num = Number(numStr);
        numStr = "";

        if (operator == "+") {
          result += num;
        } else if (operator == "-") {
          result -= num;
        }

        operator = temp[i];
      }
    }

    if (result == 0) ans.push(temp.join(""));

    return;
  }

  for (let i = 0; i < 3; i++) {
    if (i == 0) {
      temp[idx] = "+";
    } else if (i == 1) {
      temp[idx] = "-";
    } else if (i == 2) {
      temp[idx] = "";
    }

    recursive(idx + 2, temp);
  }
}
