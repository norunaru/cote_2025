/*
영단어 암기는 힘들어

영어 단어장 조건 : 
1. 자주 나오는 단어를 앞에
2. 단어의 길이가 길수록 앞에
3. 사전 순으로 정렬

M보다 짧은 길이의 단어는 안적어도됨

첫째 줄에는 영어 지문에 나오는 단어의 개수 N, 단어 길이 기준 M이 공백
1<=N<=100000, 1<=M<=10

Object로 저장, 키:밸류(등장 횟수)
조건에 따라 분기해서 정렬
*/

let fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "./example.txt";
let input = fs.readFileSync(filePath).toString().split("\n");

let [N, M] = input
  .shift()
  .split(" ")
  .map((v) => parseInt(v));

let memo = new Map();

for (let i = 0; i < N; i++) {
  let word = input[i];
  if (word.length < M) {
    continue;
  }
  memo.set(word, (memo.get(word) || 0) + 1);
}

// 정렬
let result = [...memo].sort((a, b) => {
  // 등장 횟수 내림차순
  if (a[1] !== b[1]) {
    return b[1] - a[1];
  }
  // 길이 내림차순
  if (a[0].length !== b[0].length) {
    return b[0].length - a[0].length;
  }
  // 알파벳 순 정렬
  return a[0].localeCompare(b[0]);
});

// 출력
console.log(result.map((item) => item[0]).join("\n"));
