/*
부동산 다툼

이진 트리 모양 땅
루트 땅 = 1
왼자식 = 2*k, 오른자식 = 2*k+1

원하는 땅까지 가는 길에 점유된 땅이 있으면 못감

<프로세스>
루트부터 탐색 시작해야함
n이 짝수 = 왼자식, 홀수 = 오른자식

n이 1 될때까지 거치는 길 저장
if(n%2==0) n=n/2, temp.push(n/2);


isVisited배열 생성(N+1), false

*/
const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "./example.txt";
const input = fs.readFileSync(filePath).toString().trim().split("\n");

let [N, Q] = input[0].split(" ").map(Number);
let end = input.slice(1, Q + 1).map(Number);
let answer = new Array(Q).fill(0);
let visited = new Set(); // 점유된 땅 저장
let nodes = []; // 경로 저장용 스택

for (let i = 0; i < Q; i++) {
  let endNum = end[i];

  // 지나가는 노드들을 저장
  while (endNum > 0) {
    nodes.push(endNum);
    if (endNum % 2 === 1) endNum--; // 홀수라면 -1 해서 부모 찾기
    endNum = Math.floor(endNum / 2);
  }

  let isReach = true;
  while (nodes.length > 0) {
    let node = nodes.pop();

    if (visited.has(node)) {
      answer[i] = node; // 처음 마주치는 점유된 땅
      isReach = false;
      break;
    }
  }

  if (isReach) visited.add(end[i]); // 원하는 땅을 차지할 수 있다면 점유 처리
  nodes.length = 0; // 스택 초기화
}

console.log(answer.join("\n")); // 출력 최적화
