/*
요세푸스 순열

1~N번 N명의 사람, 양의 정수 K(K<=N) 
순서대로 K번째 사람 제거, N명 제거될 때까지 반복
제거되는 순서를 N,K 요세푸스 순열

1 2 3 4 5 6 7 ->
3 6 2 7 5 1 4 

 <6, 1, 3, 2, 5, 4>

원형큐
shift하고 뒤에 push * 2,
세번째 숫자는 shift하고 ans 배열에 추가 
*/
const fs = require("fs");

const filePath = process.platform === "linux" ? "/dev/stdin" : "./example.txt";
const input = fs.readFileSync(filePath).toString().trim().split(" ");

let N = parseInt(input.shift());
let K = parseInt(input.shift());

let ans = [];
let arr = [];

for (let i = 0; i < N; i++) {
  arr.push(i + 1);
}

while (arr.length > 0) {
  for (let i = 0; i < K - 1; i++) {
    arr.push(arr.shift());
  }

  ans.push(arr.shift());
}

console.log("<" + ans.join(", ") + ">");
