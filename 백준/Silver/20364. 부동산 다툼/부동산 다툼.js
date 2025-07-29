/*
부동산 다툼

이진 트리 모양 땅
루트가 1
땅 번호가 K면 왼자식은 2K, 오른자식은 2K+1

오리 한 줄로 대기, 1번에 위치
서있는 순서대로 원하는 땅 가짐

가는 길에 점유된 땅 있으면 처음 마주치는 땅의 번호

[프로세스]
원하는 역순부터 역순으로 1까지 게산
홀수면 -1하고 /2
*/

const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "./example.txt";
const input = fs.readFileSync(filePath).toString().trim().split("\n");

let [N, Q] = input.shift().trim().split(" ").map(Number);
let isVisited = new Array(N + 1).fill(false);
let ans = [];

for (let i = 0; i < Q; i++) {
  let want = Number(input[i].trim());
  let curNo = want;
  let temp = [];
  let flag = true;

  while (curNo >= 1) {
    temp.push(curNo);
    if (curNo == 1) {
      curNo -= 1;
    } else if (curNo % 2 == 1) {
      curNo = (curNo - 1) / 2;
    } else {
      curNo = curNo / 2;
    }
  }

  temp.reverse();

  for (let j = 0; j < temp.length; j++) {
    let idx = temp[j];
    if (isVisited[idx] == true) {
      flag = false;
      ans.push(idx);
      break;
    }
  }

  if (flag) {
    isVisited[temp[temp.length - 1]] = true;
    ans.push(0);
  }
}

console.log(ans.join("\n"));
