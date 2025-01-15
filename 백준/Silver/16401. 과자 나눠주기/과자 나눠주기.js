/*
과자 나눠주기

조카 여러 명, 최대한 길게 같은 길이 과자 분배
M명 조카, N개의 과자
과자는 나눌 수 있지만 합칠 수는 없음

오름차순 정렬됨

첫째 줄에 조카의 수 M (1 ≤ M ≤ 1,000,000), 과자의 수 N (1 ≤ N ≤ 1,000,000)
둘째 줄에 과자 N개의 길이 L1, L2, ..., LN이 공백으로 구분, 1 이상


<프로세스>
1000000 -> N^2로 하면 터짐
이분탐색

left right두고 mid 구함 (초기에 left=1, right=마지막값)
각 인덱스를 mid로 나눴을 때 몫들의 합 계산

while left<right 
1. 합이 인원수보다 많다면 -> 더 긴거줘도됨 -> left = mid+1
일단 결과 값 저장
2. 합이 인원수보다 작다면 -> 더 작게 쪼개야됨 -> right = mid-1
3. 모두에게 같은 길이 못주면 0
*/

let fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "./example.txt";
let input = fs.readFileSync(filePath).toString().split("\n");

let [M, N] = input[0].split(" ").map((v) => parseInt(v));
let snacks = input[1].split(" ").map((v) => parseInt(v));

snacks.sort((a, b) => a - b);

let left = 1;
let right = snacks[snacks.length - 1];

let ans = 0;

while (left <= right) {
  let mid = Math.floor((left + right) / 2);
  let cnt = 0;

  //각 과자들에 대해서 현재 설정한 길이로 나누면서 몫들을 더함
  for (let i = 0; i < snacks.length; i++) {
    cnt += Math.floor(snacks[i] / mid);
  }
  //   console.log(left, right, mid, cnt);
  if (cnt >= M) {
    ans = mid;
    left = mid + 1;
  } else {
    right = mid - 1;
  }
}

console.log(ans);
