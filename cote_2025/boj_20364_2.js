/*
부동산 다툼

이진 트리 모양 땅

1. 루트 땅은 1
2. 어떤 땅이 K면 왼쪽은 2K, 오른쪽은 2K+1

오리들을 한 줄로 대기, 맨 처음 오리들은 1번에 위치
서있는 순서대로 원하는 땅 가져감

원하는 땅까지 가는 길에 점유된 땅이면 땅 못가짐
각 오리별로 땅을 가질 수 있는지, 못가지면 처음 마주치는 막히는 땅

[프로세스]
땅 점유 여부 배열 isVisited 생성, N+1 
원하는 땅부터 시작, 2로 나누면서 방문하는 지점의 isVisited가 false인지 확인, 
    true면 번호 출력하고 종료
    1까지 false이면 0출력하고 시작 위치 true로 변경



*/

const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "./example.txt";
const input = fs.readFileSync(filePath).toString().trim().split("\n");

let [N, Q] = input.shift().split(" ").map(Number);
let isVisited = new Set();

let ducks = [];
let result = [];
// console.log(input);

for (let i = 0; i < Q; i++) {
  ducks.push(Number(input.shift()));
}

for (let i = 0; i < ducks.length; i++) {
  let want = ducks[i];

  //이진트리 시작작
  while (want > 0) {
    //중간에 막힘
    if (isVisited.has(want) == true) {
      //   console.log(want);
      result.push(want);
      break;
    }
    //끝까지 도달달
    if (want == 1 && isVisited.has(1) == false) {
      //   console.log(0);
      result.push(0);
      isVisited.add(ducks[i]);
      break;
    }

    //트리 탐색
    want = Math.floor(want / 2);
  }
}

console.log(result.join("\n"));
