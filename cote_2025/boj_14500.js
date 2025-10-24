/*
테트로미노

1*1 정사각형 4개 이어 붙인 도형 5종류

N*M 종이 위에 하나 놓음
하나를 놓았을 때 놓인 칸에 쓰인 수의 합이 최대가 되도록
회전이나 대칭 가능

<프로세스>
매 칸에서 dfs 4번


*/

const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "./example.txt";
const input = fs.readFileSync(filePath).toString().trim().split("\n");

let [N, M] = input
  .shift()
  .split(" ")
  .map((v) => parseInt(v));

//배열 생성
let arr = [];
for (let i = 0; i < N; i++) {
  arr.push(input.shift().trim().split(" ").map(Number));
}

let isVisited = Array.from({ length: N }, () => new Array(M).fill(false));

//델타
let dy = [-1, 0, 1, 0];
let dx = [0, 1, 0, -1];

let ans = 0;

const dfs = (y, x, cnt, temp) => {
  if (cnt == 4) {
    ans = Math.max(ans, temp);
    return;
  }

  for (let dir = 0; dir < 4; dir++) {
    let ny = y + dy[dir];
    let nx = x + dx[dir];

    if (ny >= 0 && ny < N && nx >= 0 && nx < M && isVisited[ny][nx] == false) {
      isVisited[ny][nx] = true;
      dfs(ny, nx, cnt + 1, temp + arr[ny][nx]);
      isVisited[ny][nx] = false;
    }
  }
};

const checkT = (y, x, cnt, temp) => {
  for (let dir = 0; dir < 4; dir++) {
    let ny = y + dy[dir];
    let nx = x + dx[dir];

    if (ny >= 0 && ny < N && nx >= 0 && nx < M) {
      temp += arr[ny][nx];
      cnt++;
    }
  }

  if (cnt == 4) {
    ans = Math.max(ans, temp);
  } else if (cnt == 5) {
    for (let dir = 0; dir < 4; dir++) {
      let ny = y + dy[dir];
      let nx = x + dx[dir];
      ans = Math.max(ans, temp - arr[ny][nx]);
    }
  }
};

for (let i = 0; i < N; i++) {
  for (let j = 0; j < M; j++) {
    isVisited[i][j] = true;
    dfs(i, j, 1, arr[i][j]);
    checkT(i, j, 1, arr[i][j]);
    isVisited[i][j] = false;
  }
}

console.log(ans);
