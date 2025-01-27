/*
빗물

2차원 세계에 블록, 비가 오면 빗물이 고임
고이는 빗물의 총량?

세로 길이 H과 2차원 세계의 가로 길이 W가 주어진다. (1 ≤ H, W ≤ 500)
블록이 쌓인 높이를 의미하는 0이상 H이하의 정수가 2차원 세계의 맨 왼쪽 위치부터 차례대로 W개
바닥은 막혀있음

고이지 않으면 0 출력

<프로세스>
각 행, 열 순회하며 1이면 시작
오른쪽으로 쭉
0이면 누적
1이면 종료, 누적값 ans에 추가
*/

const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "./example.txt";
const input = fs.readFileSync(filePath).toString().trim().split("\n");

let [N, M] = input[0].split(" ").map(Number);
let arr = Array.from({ length: N }, () => new Array(M).fill(0));

let height = input[1].split(" ").map(Number);

//배열 생성 1=블록, 0은 빈칸
for (let x = 0; x < M; x++) {
  for (let y = 0; y < height[x]; y++) {
    arr[y][x] = 1;
  }
}

let ans = 0;

for (let y = 0; y < N; y++) {
  for (let x = 0; x < M; x++) {
    //블록칸 만나면 우측 검사
    if (arr[y][x] == 1) {
      let r = x + 1;
      let temp = 0; //누적값
      while (r < M) {
        //블록 만나면 종료
        if (arr[y][r] == 1) {
          ans += temp;
          break;
        }
        temp++;
        r++;
      }
    }
  }
}

console.log(ans);
