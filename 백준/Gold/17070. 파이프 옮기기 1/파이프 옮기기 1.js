/*
파이프 옮기기 1

n*n 집
1*2 파이프 존재, 회전 가능
45도 각도 회전 가능, 우, 우하, 하

파이프는 빈 칸만 차지

가로 : 가로, 대각
세로 : 세로, 대각
대각 : 가로, 세로, 대각

빈칸 or 벽
대각의 경우 4칸 검사 필요

<프로세스>
(n,r)에 올 수 있는 경우의 수 :
(n-1,r)에서 세로로 온 경우
(n-1,r-1)에서 대각
(n,r-1)에서 가로 

이전 이동의 방향에 따라 경우의 수 정해짐

이동 방향 저장, 방향에 따라 경우 다르게 처리, 벽 고려

*/

const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "./example.txt";
const input = fs.readFileSync(filePath).toString().trim().split("\n");

let N = Number(input.shift());

let arr = [];
for (let i = 0; i < N; i++) {
  arr.push(input[i].trim().split(" ").map(Number));
}

let dir = 0; //0:가로, 1:대각, 2:세로

//델타
const garoY = [0, 1];
const garoX = [1, 1];

const daegakY = [0, 1, 1];
const daegakX = [1, 1, 0];

const seroY = [1, 1];
const seroX = [1, 0];

let ans = 0;

//y,x는 파이프 끝의 좌표
function move(dir, y, x) {
  if (y == N - 1 && x == N - 1) {
    ans++;
    return;
  }

  let ny;
  let nx;

  //이전 칸에서 가로로 온 경우
  if (dir == 0) {
    //가로, 대각
    for (let i = 0; i < 2; i++) {
      ny = y + garoY[i];
      nx = x + garoX[i];

      if (ny >= 0 && ny < N && nx >= 0 && nx < N && arr[ny][nx] != 1) {
        if (i == 1) {
          // 대각선 이동의 경우
          if (
            arr[y + 1][x] == 1 ||
            arr[y][x + 1] == 1 ||
            arr[y + 1][x + 1] == 1
          ) {
            continue; // 벽이 있으면 이동하지 않음
          }
        }
        move(i, ny, nx);
      }
    }
  }
  //이전 칸에서 대각으로 온 경우
  else if (dir == 1) {
    //가로, 대각, 세로
    for (let i = 0; i < 3; i++) {
      ny = y + daegakY[i];
      nx = x + daegakX[i];
      //대각 벽처리 추가 필요
      if (ny >= 0 && ny < N && nx >= 0 && nx < N && arr[ny][nx] != 1) {
        if (i == 1) {
          // 대각선 이동의 경우
          if (
            arr[y + 1][x] == 1 ||
            arr[y][x + 1] == 1 ||
            arr[y + 1][x + 1] == 1
          ) {
            continue; // 벽이 있으면 이동하지 않음
          }
        }
        move(i, ny, nx);
      }
    }
  }
  //세로로 온 경우 -> 대각(1) or 세로(2)만 가능 -> i 1부터 시작
  else if (dir == 2) {
    //대각, 세로
    for (let i = 1; i < 3; i++) {
      ny = y + seroY[i - 1];
      nx = x + seroX[i - 1];

      if (ny >= 0 && ny < N && nx >= 0 && nx < N && arr[ny][nx] != 1) {
        if (i == 1) {
          // 대각선 이동의 경우
          if (
            arr[y + 1][x] == 1 ||
            arr[y][x + 1] == 1 ||
            arr[y + 1][x + 1] == 1
          ) {
            continue; // 벽이 있으면 이동하지 않음
          }
        }
        move(i, ny, nx);
      }
    }
  }
}

move(dir, 0, 1);

console.log(ans);
