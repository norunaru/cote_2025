/*
옥상 정원 꾸미기

빌딩 N개
i번쨰 빌딩 높이 = hi, 모든 빌딩 일렬, 오른쪽만 볼 수 있음
i번째 빌딩 관리인 -> i+1, i+1, ...,N번 빌딩 볼 수 있음
높이가 같거나 높으면 그 다음의 빌딩은 못봄

첫 번째 줄에 빌딩의 개수 N이 입력된다.(1 ≤ N ≤ 80,000)
두 번째 줄 부터 N+1번째 줄까지 각 빌딩의 높이가 hi 입력된다. (1 ≤ hi ≤ 1,000,000,000)

<프로세스>
O(N^2)로 풀면 시간초과 발생할듯?
스택으로 풀이
한 건물은 한번만 고려하도록

스택에 하나씩 
top보다 작은게 들어오면 그냥 push
top보다 크면 pop

pop될때 원소의 no랑 현재 번호랑 비교, 
len-1 만큼 더하기?

10
10 3 
10 7
10 7 4 
12
*/

const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "./example.txt";
const input = fs.readFileSync(filePath).toString().trim().split("\n");

let N = Number(input.shift());

let stk = [];
let ans = 0;

for (let i = 0; i < N; i++) {
  let cur = Number(input[i]);
  if (stk.length == 0) {
    stk.push(cur);
    continue;
  }

  while (stk.length > 0 && stk[stk.length - 1] <= cur) {
    stk.pop();
  }

  stk.push(cur);
  ans += stk.length - 1;
}

console.log(ans);
