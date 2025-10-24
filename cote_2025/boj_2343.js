/*
기타 레슨

N개 강의, 순서 바뀌면 안됨
i번,j번을 같은 블루레이에 녹화하려면 i,j사이 모든 번호의 강의도 같이 녹화

M개의 블루레이, 녹화 가능한 길이를 최소로, 모두 같은 크기
M개 안에 모든 강의 녹화

강의 길이가 분 단위 -> 가능한 크기 중 최소를 구하는 프로그램 작성

입력:
첫째 줄에 강의의 수 N (1 ≤ N ≤ 100,000)과 M (1 ≤ M ≤ N)이 주어진다. 
다음 줄에는 강토의 기타 강의의 길이가 강의 순서대로 분 단위로(자연수)로 주어진다.
각 강의의 길이는 10,000분을 넘지 않는다.

<프로세스>
N<=100000  => O(N^2)이면 시간초과

이분탐색
입력받는 배열의 최댓값을 left로, 배열의 합을 right, sum으로 
sum//mid > M -> 더 길게 -> left = mid+1
sum//mid <= M -> 더 짧게 -> right = mid-1
*/

const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "./example.txt";
const input = fs.readFileSync(filePath).toString().trim().split("\n");

let [N, M] = input.shift().trim().split(" ").map(Number);

let arr = input[0].split(" ").map(Number);

let left = Math.max(...arr);
let right = arr.reduce((a, b) => a + b, 0);

while (left <= right) {
  let mid = Math.floor((left + right) / 2);
  let temp = 0;
  let cnt = 1;

  for (let i = 0; i < N; i++) {
    if (temp + arr[i] > mid) {
      cnt++;
      temp = arr[i];
    } else {
      temp += arr[i];
    }
  }

  if (cnt > M) {
    left = mid + 1;
  } else {
    right = mid - 1;
  }
}

console.log(left);
