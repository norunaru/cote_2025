/*
절댓값 힙

가능한 연산 2개 : 
1. 배열에 정수 x(x!=0) 넣는다
2. 절댓값이 가장 작은 값 출력, 그 값 제거, 절댓값이 가장 작은 값이 여러개면 가장 작은 수 출력, 제거(음수인듯?)

<프로세스> 
빈 배열 생성
입력값 하나씩 처리
0 아니면 푸시
0이면 절댓값 가장 작은 값들 탐색, 음수 제거

N(1≤N≤100,000) -> n^2면 안될듯


*/

let fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "./example.txt";
let input = fs
  .readFileSync(filePath)
  .toString()
  .split("\n")
  .map((v) => parseInt(v));

// console.log(JSON.stringify(input));

let N = input.shift();

let pq = []; //양수
let pq2 = []; //음수수

for (let i = 0; i < N; i++) {
  let val = input.shift();

  //0아니면 큐에 추가
  if (val != 0) {
    if (val > 0) {
      pq.push(val);
      pq.sort((a, b) => b - a); //역순저장, pop하기 위함
    } else if (val < 0) {
      pq2.push(val);
      pq2.sort((a, b) => a - b);
    }
  }
  //0이면
  else {
    if (pq.length == 0 && pq2.length != 0) {
      console.log(pq2.pop());
    } else if (pq.length != 0 && pq2.length == 0) {
      console.log(pq.pop());
    } else if (pq.length == 0 && pq2.length == 0) {
      console.log(0);
    }
    //둘 다 비어있지 않으면
    else {
      if (Math.abs(pq[pq.length - 1]) < Math.abs(pq2[pq2.length - 1])) {
        console.log(pq.pop());
      } else if (Math.abs(pq[pq.length - 1]) > Math.abs(pq2[pq2.length - 1])) {
        console.log(pq2.pop());
      } else {
        console.log(pq2.pop());
      }
    }
  }
}
