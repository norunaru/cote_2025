/*
틱택토

3*3 판, 비어있음
두 사람이 X,O 번갈아 놓음, 첫 사람이 X
가로, 세로, 대각 방향 3칸이면 즉시 종료
가득 차도 게임 종료

게임판 상태 주어지념 그 상태가 발생할 수 있는 최종 상태인지 판별하라

입력은 여러 개의 테스트 케이스
각 줄은 9개의 문자를 포함하며, 'X', 'O', '.' 
입력의 마지막에는 문자열 "end"

<프로세스>
X 개수 >= O 개수
배열 입력받으면서 검사

변수 Xwin, Owin -> 숫자 저장
세로 검사 : 
0,3,6 / 1,4,7 / 2,5,8

가로 검사 : 
0,1,2 / 3,4,5 / 6,7,8

대각 검사 : 
0,4,8 / 2,4,6

각 검사의 시작 칸의 값 (O,X)로 재귀
cnt>3 기저조건, word O,X에 따라 Xwin, Owin++

rec(cnt, word)

Xwin+Owin==1이나 0이면 valid, 아니면 invalid

*/ const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "./example.txt";
const input = fs.readFileSync(filePath).toString().trim().split("\n");

let Xwin;
let Owin;

for (let tc = 0; tc < input.length - 1; tc++) {
  // 각 테스트 케이스 초기화
  let arr = input[tc].trim().split("");
  Xwin = 0;
  Owin = 0;
  let xCnt = 0;
  let oCnt = 0;

  // X와 O 개수 세기
  for (let i = 0; i < 9; i++) {
    if (arr[i] === "O") {
      oCnt++;
    } else if (arr[i] === "X") {
      xCnt++;
    }
  }

  // 가로 검사
  for (let idx = 0; idx <= 6; idx += 3) {
    checkGaro(1, arr[idx], idx, arr);
  }

  // 세로 검사
  for (let idx = 0; idx <= 2; idx++) {
    checkSero(1, arr[idx], idx, arr);
  }

  // 대각1 검사
  checkDaegak1(1, arr[0], 0, arr);

  // 대각2 검사
  checkDaegak2(1, arr[2], 2, arr);

  let valid = false;
  if (Xwin && Owin) {
    valid = false; // X와 O가 동시에 이길 수 없음
  } else if (Xwin) {
    valid = xCnt === oCnt + 1; // X가 이겼다면 X 개수가 O보다 1 많아야 함
  } else if (Owin) {
    valid = xCnt === oCnt; // O가 이겼다면 X와 O 개수가 같아야 함
  } else {
    valid = (xCnt === oCnt || xCnt === oCnt + 1) && xCnt + oCnt === 9; // 게임이 끝났을 때만 유효
  }

  console.log(valid ? "valid" : "invalid");
}

// 가로 검사
function checkGaro(cnt, word, idx, arr) {
  if (word === ".") return;
  if (cnt === 3) {
    if (word === "O") {
      Owin++;
    } else if (word === "X") {
      Xwin++;
    }
    return;
  }
  if (idx % 3 < 2 && word === arr[idx + 1]) {
    checkGaro(cnt + 1, word, idx + 1, arr);
  }
}

// 세로 검사
function checkSero(cnt, word, idx, arr) {
  if (word === ".") return;
  if (cnt === 3) {
    if (word === "O") {
      Owin++;
    } else if (word === "X") {
      Xwin++;
    }
    return;
  }
  if (idx + 3 < 9 && word === arr[idx + 3]) {
    checkSero(cnt + 1, word, idx + 3, arr);
  }
}

// 대각선 검사1
function checkDaegak1(cnt, word, idx, arr) {
  if (word === ".") return;
  if (cnt === 3) {
    if (word === "O") {
      Owin++;
    } else if (word === "X") {
      Xwin++;
    }
    return;
  }
  if (idx + 4 < 9 && word === arr[idx + 4]) {
    checkDaegak1(cnt + 1, word, idx + 4, arr);
  }
}

// 대각선 검사2
function checkDaegak2(cnt, word, idx, arr) {
  if (word === ".") return;
  if (cnt === 3) {
    if (word === "O") {
      Owin++;
    } else if (word === "X") {
      Xwin++;
    }
    return;
  }
  if (idx + 2 < 9 && idx !== 8 && word === arr[idx + 2]) {
    checkDaegak2(cnt + 1, word, idx + 2, arr);
  }
}
