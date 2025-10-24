/*
길이 N 컨베이어 벨트, 길이 2N가 위아래로 감싸며 도는중
각 칸은 1~2N까지 번호, 1~N까지 물건 올릴 수 있음
i번 칸의 내구도는 Ai
1번이 올리는 위치, N이 내리는 위치

컨베이어 벨트 위에서 로봇 이동 가능, N도달시 즉시 내린다
로봇 이동시 내구도 1감소

1. 벨트가 각 로봇과 한 칸 회전
2. 가장 먼저 올라간 로봇부터 벨트 회전 방향으로 이동 가능하면 이동. 이동 못하면 가만히
    1. 이동하려는 칸이 비어있고 내구도가 1 이상 있어야 이동 가능
4. 올리는 위치의 내구도 0 아니면 올림
5. 내구도 0칸 개수가 K개 이상이면 종료

[프로세스]
upper shift -> lower push
lower shift -> upper push

올리는 위치에 올리고, 내리는 위치에 내림
내리는 위치 도달시 즉시 내림
위치에 올리거나 로봇 이동시 해당 칸 내구도 -1

*/

class Node {
  constructor(no, durability, hasRobot) {
    this.no = no;
    this.durability = durability;
    this.hasRobot = hasRobot;
  }
}

const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "./example.txt";
const input = fs.readFileSync(filePath).toString().trim().split("\n");

let [N, K] = input.shift().trim().split(" ").map(Number);

let upper = [];
let lower = [];

let values = input.shift().trim().split(" ").map(Number);
for (let i = 0; i < 2 * N; i++) {
  if (i < N) {
    upper.unshift(new Node(i + 1, values[i], false));
  } else {
    lower.unshift(new Node(i + 1, values[i], false));
  }
}

function checkFinish() {
  let cnt = 0;
  for (let i = 0; i < N; i++) {
    if (upper[i].durability == 0) cnt++;
    if (lower[i].durability == 0) cnt++;
  }
  //   console.log("cnt:", cnt);
  return cnt >= K ? true : false;
}

function dropRobot() {
  if (upper[0].hasRobot == true) {
    upper[0].hasRobot = false;
  }
}

let ans = 0;

A: while (true) {
  ans++;

  //벨트 한 칸 회전
  lower.push(upper.shift());
  upper.push(lower.shift());

  //   console.log(JSON.stringify(upper));
  //   console.log(JSON.stringify(lower));
  dropRobot();

  //로봇 이동
  for (let i = 1; i < N; i++) {
    if (upper[i].hasRobot) {
      if (upper[i - 1].hasRobot == false && upper[i - 1].durability > 0) {
        upper[i].hasRobot = false;
        upper[i - 1].hasRobot = true;
        upper[i - 1].durability -= 1;
      }
    }
    if (checkFinish()) break A;
  }
  dropRobot();

  //로봇 올리기
  if (upper[N - 1].durability > 0) {
    upper[N - 1].hasRobot = true;
    upper[N - 1].durability -= 1;
  }

  if (checkFinish()) break;
}

console.log(ans);
