/*
주사위 쌓기

1~6 가진 주사위, 마주 보는 면의 합이 7은 아님
아래부터 1번 주사위, 2번주사위 ... 순으로 쌓음

규칙:
붙은 주사위 -> 아래 주사위의 윗면 == 윗 주사위의 아랫면

쌓으면 사각 기둥이 되고 4개의 옆면 존재
옆면 중 한 면의 숫자 합이 최대가 되도록 쌓기
주사위 한 위아래는 고정하고 회전 가능

첫줄에는 주사위의 개수
한 줄에 하나씩 주사위의 종류가 1번 주사위부터 주사위 번호 순서대로 입력
주사위의 종류는 각 면에 적혀진 숫자가 그림1에 있는 주사위의 전개도에서 A, B, C, D, E, F 의 순서

<프로세스>
마주보는 인덱스 :
0-5
1-3
2-4

각 주사위로 재귀 

0~5 인덱스를 밑면 밑면으로 설정 ->
temp에 사용한 면 제외한 사이드 중 가장 큰 값 추가
맞은편 값이 다음 주사위의 밑면이됨
다음 주사위에서는 해당 밑면의 값을 가진 인덱스와 페어인 인덱스를 제외하고 최댓값 temp에 추가,
페어값을 bottom으로 다음 재귀 시작
*/

const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "./example.txt";
const input = fs.readFileSync(filePath).toString().trim().split("\n");

let N = Number(input.shift().trim());

let dices = [];

for (let i = 0; i < N; i++) {
  dices.push(input[i].trim().split(" ").map(Number));
}

let ans = 0;

function recursive(cnt, temp, bottom) {
  if (cnt == N) {
    ans = Math.max(ans, temp);
    return;
  }

  let btmIdx;
  let topIdx;

  //밑면의 값이 몇번 인덱스인지 검사, 밑면 인덱스와 윗면 인덱스 설정
  for (let i = 0; i < 6; i++) {
    if (dices[cnt][i] == bottom) {
      btmIdx = i;
      if (i == 0) {
        topIdx = 5;
      } else if (i == 1) {
        topIdx = 3;
      } else if (i == 2) {
        topIdx = 4;
      } else if (i == 3) {
        topIdx = 1;
      } else if (i == 4) {
        topIdx = 2;
      } else if (i == 5) {
        topIdx = 0;
      }
      break;
    }
  }

  //   let copy = [...dices[cnt]];
  //   copy.splice(topIdx,1);
  //   copy.splice()
  let maxVal = 0;
  for (let i = 0; i < 6; i++) {
    if (dices[cnt][i] > maxVal && i != topIdx && i != btmIdx) {
      maxVal = dices[cnt][i];
    }
  }

  recursive(cnt + 1, temp + maxVal, dices[cnt][topIdx]);
}

for (let i = 0; i < 6; i++) {
  recursive(0, 0, dices[0][i]);
}

console.log(ans);
