/*
체스

n*m, 상대의 퀸, 나이트, 폰 위치 주어졌을 때 안전한 칸의 개수
퀸은 가로 세로 대각 쭉 이동 가능, 장애물 있으면 중단
나이트는 중간에 장애물 있어도 이동 가능
폰은 상대 말을 잡을 수는 없고 장애물의 역할만

첫째 줄에는 체스 판의 크기 n과 m이 주어진다. (1 ≤ n, m ≤ 1000) 
 Queen의 개수와 그 개수만큼의 Queen의 위치
 셋째 줄에는 Knight의 개수와 위치
 넷째 줄에는 Pawn의 개수와 위치

<프로세스>
퀸, 나이트 델타 생성
체스판 배열 arr 생성성, '.'으로 채우기
n*m isSafe 배열(true) 생성, 말이 놓인 곳은 초기에 false로

각 말들 arr에 입력

arr순회하면서 말 나올 경우 델타에 따라 isSafe 갱신

*/

const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "./example.txt";
const input = fs.readFileSync(filePath).toString().trim().split("\n");

//델타
let Qy = [-1, -1, 0, 1, 1, 1, 0, -1];
let Qx = [0, 1, 1, 1, 0, -1, -1, -1];

let Ky = [-2, -1, 1, 2, 2, 1, -1, -2];
let Kx = [1, 2, 2, 1, -1, -2, -2, -1];

let [n, m] = input.shift().split(" ").map(Number);

let arr = Array.from({ length: n }, () => Array(m).fill("."));
let isSafe = Array.from({ length: n }, () => Array(m).fill(true));

for (let i = 0; i < 3; i++) {
  let chess = "";
  if (i == 0) {
    chess = "Q";
  } else if (i == 1) {
    chess = "K";
  } else {
    chess = "P";
  }

  let line = input.shift().trim().split(" ").map(Number);
  let N = line.shift();
  for (let j = 0; j < N; j++) {
    let y = line.shift() - 1;
    let x = line.shift() - 1;
    arr[y][x] = chess;

    isSafe[y][x] = false;
  }
}

// console.table(arr);
// console.table(isSafe);

for (let i = 0; i < n; i++) {
  for (let j = 0; j < m; j++) {
    if (arr[i][j] == "K") {
      for (let dir = 0; dir < 8; dir++) {
        let ny = i + Ky[dir];
        let nx = j + Kx[dir];

        if (ny >= 0 && ny < n && nx >= 0 && nx < m && arr[ny][nx] == ".") {
          isSafe[ny][nx] = false;
        }
      }
    } else if (arr[i][j] == "Q") {
      for (let dir = 0; dir < 8; dir++) {
        let ny = i + Qy[dir];
        let nx = j + Qx[dir];

        while (ny >= 0 && ny < n && nx >= 0 && nx < m && arr[ny][nx] == ".") {
          isSafe[ny][nx] = false;
          ny += Qy[dir];
          nx += Qx[dir];
        }
      }
    }
  }
}

let ans = 0;
for (let i = 0; i < n; i++) {
  for (let j = 0; j < m; j++) {
    if (isSafe[i][j] == true) ans++;
  }
}

console.log(ans);
