/*
벌집

육각형으로 이루어진 벌집
1부터 시작해서 이웃하는 방에 돌아가면서 1씩 증가하는 번호
N이 주어졌을 때, 벌집의 중앙 1에서 N번 방까지 최소 개수의 방을 지나서 갈 때 몇 개의 방을 지나가는지
시작, 끝 포함

<프로세스>
테두리 :
1 
6 
12
18

2번째부터는 +6씩됨
1이면 1리턴하고 끝
cur, border변수 생성
N <= cur이면 종료
N>cur -> cur+=border, border+=6, cnt++


*/
let fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "./example.txt";
let N = parseInt(fs.readFileSync(filePath).toString());

let cnt = 1;
let border = 0;
let cur = 1;

while (N > cur) {
  border += 6;
  cur += border;
  cnt++;
}

console.log(cnt);
