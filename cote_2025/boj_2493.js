/*
탑

일직선 상 N개 높이 서로 다른 탑, 꼭대기에 레이저 송신기
레이저는 수평 왼쪽방향으로 발사, 기둥에는 수신기 존재
가장 먼저 만나는 하나의 탑에서만 수신
탑의 개수 N <= 500000, 높이 주어질 떄 어느 탑에서 수신하는지 알아내자

<프로세스>
6 9 5 7 4 예시
6 9 5 4 7

1. 
각 인덱스마다 왼쪽으로 이동하면서 순회, 해당 인덱스의 값이 시작값보다 크다면 정답
시간초과남 O(N^2)

2. 스택
넣을 때마다 최상위 요소 확인
최상위가 현재 값보다 값이 작으면 팝
최상위가 현재 값보다 크다면 최상위의 no를 답으로 설정, 현재값 푸시시

 */
const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "./example.txt";
const input = fs.readFileSync(filePath).toString().trim().split("\n");

class Tower {
  constructor(no, height) {
    this.no = no;
    this.height = height;
  }
}

let N = Number(input[0]);
let heights = input[1].split(" ").map(Number);
let stk = [];
let ans = new Array(N).fill(0);

for (let i = 0; i < N; i++) {
  let cur = new Tower(i + 1, heights[i]);

  if (stk.length == 0) {
    stk.push(cur);
  } else {
    while (stk.length > 0 && stk[stk.length - 1].height < cur.height) {
      stk.pop();
    }
    if (stk.length > 0) {
      ans[i] = stk[stk.length - 1].no;
    }
    stk.push(cur);
  }
}

console.log(ans.join(" "));

/*
//시간초과과
let N = Number(input[0]);
let heights = input[1].split(" ").map(Number);
let arr = [];

for (let i = 0; i < N; i++) {
  let h = heights[i];
  arr.push(new Tower(i + 1, h));
}

let ans = new Array(N).fill(0);

for (let i = 0; i < N; i++) {
  let curH = arr[i].height;

  for (let j = i - 1; j >= 0; j--) {
    let leftH = arr[j].height;
    if (leftH > curH) {
      ans[i] = arr[j].no;
      break;
    }
  }
}

console.log(ans.join(" "));
 */
