/*
피자 오븐

재료 넣고 정확히 N분 동작
버튼 5개 
각 버튼은 시간 추가, 감소
초기 시간 0분
0분보다 감소 불가

ADDH : +60
ADDT : +10
MINT : -10
ADDO : +1
MINO : -1

설정해야 할 시간 주어질 때 그 시간을 만들기 위해 눌러야 하는 최소 횟수는?

입력을 
T개의 테스트 케이스
N분 단위의 정수로 주어짐

<프로세스>
bfs? dp?
N <= 10,000,000

dp[i] = dp[i-60], dp[i-10], dp[i+10], dp[i-1], dp[i+1] 중 최솟값 +1

*/

const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "./example.txt";
const input = fs.readFileSync(filePath).toString().trim().split("\n");

class Node {
  constructor(curT, ADDH, ADDT, MINT, ADDO, MINO) {
    this.curT = curT;
    this.ADDH = ADDH;
    this.ADDT = ADDT;
    this.MINT = MINT;
    this.ADDO = ADDO;
    this.MINO = MINO;
  }
}

//델타
const diff = [60, 10, -10, 1, -1];

let T = input.shift();

for (let tc = 0; tc < T; tc++) {
  let time = Number(input[tc]);
}
