/*
톱니바퀴

8개 톱니 가진 톱니바퀴 4개
N,S극 가짐
왼쪽부터 1,2,3,4

톱니바퀴 총 K번 회전, 한 칸 기준, 시계 or 반시계 방향

1 회전시켜서 2와 맞닿은 극이 다르면 2는 1과 반대 방향으로 회전 
회전시키기 이전 상태가 중요, 연쇄적으로 회전 가능

입력:
4줄
N은 0, S는 1
회전 횟수 K(1<=K<=100) 
K줄 
회전방법 번호, 방향 (1시계, -1 반시계)

회전시킨 이후 톱니바퀴 점수 합 출력

<프로세스>
8칸 배열 4개
0번 인덱스가 9시, 4인덱스가 3시

반시계(-1) 회전이면 shift하고 push
시계(1) 회전이면 pop하고 unshift

회전 바퀴 번호 고려 : 
n번 바퀴 회전시킬 경우 n-1, n+1번과 극이 다른지 검사 
극 다르면 n-1, n+1번도 회전해야함, 방향은 반대로
극성성 검사가 끝난 이후에 실제 회전 시작
재귀함수로 구성
from, dir, target, 


*/

const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "./example.txt";
const input = fs.readFileSync(filePath).toString().trim().split("\n");

let cogs = [];

for (let i = 0; i < 4; i++) {
  let line = input.shift().trim().split("").map(Number);
  //   console.log("Before pop/unshift:", line);
  line.unshift(line.pop());
  line.unshift(line.pop());
  //   console.log("After pop/unshift:", line);
  cogs.push(line);
}
// console.log("원본:", JSON.stringify(cogs));

let K = Number(input.shift());

for (let k = 0; k < K; k++) {
  let [no, dir] = input.shift().split(" ").map(Number);
  no = no - 1;
  spin(no, dir, no);
  //   console.log(`${k} 이후:`, JSON.stringify(cogs));
}

function spin(no, dir, from) {
  //주변 톱니바퀴 검사
  if (no == 0) {
    if (cogs[no][4] != cogs[no + 1][0] && from != no + 1) {
      spin(no + 1, dir * -1, no);
    }
  } else if (no == 3) {
    if (cogs[no][0] != cogs[no - 1][4] && from != no - 1) {
      spin(no - 1, dir * -1, no);
    }
  } else {
    if (cogs[no][4] != cogs[no + 1][0] && from != no + 1) {
      spin(no + 1, dir * -1, no);
    }
    if (cogs[no][0] != cogs[no - 1][4] && from != no - 1) {
      spin(no - 1, dir * -1, no);
    }
  }

  //반시계
  if (dir == -1) {
    cogs[no].push(cogs[no].shift());
  } else if (dir == 1) {
    cogs[no].unshift(cogs[no].pop());
  }
}

console.log("결과:", JSON.stringify(cogs));

let ans = 0;
let score = 1;
for (let i = 0; i < 4; i++) {
  //   console.log("score:", score);
  if (cogs[i][2] == 1) {
    ans += score;
  }
  score *= 2;
}

console.log(ans);
