/*
두 수의 합

n개의 서로 다른 양의 정수들 존재, n <= 100000
자연수 x가 주어졌을 때 두 개 골라서 x만들 수 있는 경우의 수

<프로세스>
n <= 100000 -> O(n^2) 으로 하면 터짐 

투포인터
주어진 숫자들 정렬
left=0, right=n-1 시작

l+r < x면 l+1
l+r > x면 r-1
l+r == x  l+1, cnt++

1 2 3 5 7 9 10 11 12
*/

let fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "./example.txt";
let input = fs.readFileSync(filePath).toString().trim().split("\n");

let n = parseInt(input[0]);
let nums = input[1].split(" ").map((v) => parseInt(v));

nums.sort((a, b) => a - b);
// console.log(JSON.stringify(nums));

let x = parseInt(input[2]);
let left = 0;
let right = n - 1;
let ans = 0;

while (left < right) {
  //   console.log("l:", left, "r:", right);
  let l = nums[left]; // 왼쪽 인덱스에 들어있는 값
  let r = nums[right];

  if (l + r < x) {
    left += 1;
  } else if (l + r > x) {
    right -= 1;
  } else {
    ans += 1;
    left += 1;
  }
}

console.log(ans);
