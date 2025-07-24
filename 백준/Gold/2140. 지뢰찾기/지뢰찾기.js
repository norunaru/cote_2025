/*
지뢰찾기

N*N
현재 칸 기준 팔방 탐색
테두리 칸 열림, 나머지는 닫힘

닫힌 칸에 존재할 수 있는 지뢰 최대 개수?

[프로세스]
테두리2칸 제외한 내부 칸은 모두 지뢰로 채우기 가능

최댓값을 구해야 하므로 기본적으로 모든 칸에 있다 가정하고 시작
#인 칸만 검사, 팔방 검사해서 0있으면 해당 칸은 지뢰 존재 불가
0 없으면 8방 숫자 칸 -1
*/
const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "./example.txt";
const input = fs.readFileSync(filePath).toString().trim().split("\n");

let N = Number(input.shift().trim());
let arr = Array.from({ length: N }, () => new Array(N).fill(0));
let isMine = Array.from({ length: N }, () => new Array(N).fill(true));

for (let i = 0; i < N; i++) {
  let line = input[i].trim().split("");
  for (let j = 0; j < N; j++) {
    arr[i][j] = line[j];
    if (line[j] != "#") arr[i][j] = Number(line[j]);
  }
}

// console.table(arr);

let dy = [-1, -1, 0, 1, 1, 1, 0, -1];
let dx = [0, 1, 1, 1, 0, -1, -1, -1];

for (let i = 1; i < N - 1; i++) {
  for (let j = 1; j < N - 1; j++) {
    let zeroExists = searchZero(i, j);

    if (zeroExists) {
      isMine[i][j] = false;
    } else {
      let ny, nx;
      for (let d = 0; d < 8; d++) {
        ny = i + dy[d];
        nx = j + dx[d];

        if (typeof arr[ny][nx] == "number") {
          arr[ny][nx]--;
        }
      }
    }
  }
}

function searchZero(y, x) {
  let flag = false;
  let ny, nx;
  for (let d = 0; d < 8; d++) {
    ny = y + dy[d];
    nx = x + dx[d];

    if (arr[ny][nx] == 0) flag = true;
  }

  return flag;
}

let ans = 0;
for (let i = 1; i < N - 1; i++) {
  for (let j = 1; j < N - 1; j++) {
    if (isMine[i][j] == true) ans++;
  }
}

console.log(ans);
