/*
알파벳

R*C 
각 칸에 알파벳, 좌상단 1,1에서 시작, 시작칸도 카운트

상하좌우 이동 가능, 새로 이동한 칸에는 지금까지 이동한 알파벳과 달라야함
좌상단 시작, 최대 몇 칸?

<프로세스>
dfs, Set 이용
칸 이동시 Set 검사
has가 true면 리턴, false면 set에 추가하고 다음 dfs

*/

const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "./example.txt";
const input = fs.readFileSync(filePath).toString().trim().split("\n");

let [N, M] = input.shift().split(" ").map(Number);
let arr = input.map((line) => line.trim().split(""));

let dy = [-1, 0, 1, 0];
let dx = [0, 1, 0, -1];

let ans = 0;

// DFS 함수
const dfs = (y, x, cnt) => {
  ans = Math.max(ans, cnt); // 최대 이동 거리 업데이트

  for (let dir = 0; dir < 4; dir++) {
    let ny = y + dy[dir];
    let nx = x + dx[dir];

    if (ny >= 0 && ny < N && nx >= 0 && nx < M && !abc.has(arr[ny][nx])) {
      abc.add(arr[ny][nx]); // 방문 처리
      dfs(ny, nx, cnt + 1);
      abc.delete(arr[ny][nx]); // 백트래킹
    }
  }
};

// 시작 위치
let abc = new Set();
abc.add(arr[0][0]); // 시작점 추가
dfs(0, 0, 1);

console.log(ans);
