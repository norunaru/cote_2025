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

function isWinning(board, player) {
  // 가로 체크
  for (let i = 0; i < 3; i++) {
    if (
      board[i][0] === player &&
      board[i][1] === player &&
      board[i][2] === player
    )
      return true;
  }
  // 세로 체크
  for (let i = 0; i < 3; i++) {
    if (
      board[0][i] === player &&
      board[1][i] === player &&
      board[2][i] === player
    )
      return true;
  }
  // 대각선 체크
  if (
    board[0][0] === player &&
    board[1][1] === player &&
    board[2][2] === player
  )
    return true;
  if (
    board[0][2] === player &&
    board[1][1] === player &&
    board[2][0] === player
  )
    return true;

  return false;
}

for (let tc = 0; tc < input.length - 1; tc++) {
  let str = input[tc].trim();
  let board = [
    [str[0], str[1], str[2]],
    [str[3], str[4], str[5]],
    [str[6], str[7], str[8]],
  ];

  let xCnt = str.split("").filter((c) => c === "X").length;
  let oCnt = str.split("").filter((c) => c === "O").length;

  let xWin = isWinning(board, "X");
  let oWin = isWinning(board, "O");

  let valid = false;

  if (xWin && oWin) {
    valid = false; // X와 O가 동시에 이길 수 없음
  } else if (xWin) {
    valid = xCnt === oCnt + 1; // X가 이겼다면 X의 개수는 O보다 1 많아야 함
  } else if (oWin) {
    valid = xCnt === oCnt; // O가 이겼다면 X와 O의 개수가 같아야 함
  } else {
    valid = (xCnt === oCnt || xCnt === oCnt + 1) && xCnt + oCnt === 9; // 게임이 끝났을 때만 유효
  }

  console.log(valid ? "valid" : "invalid");
}
