/*
스택 구현, 입력 명령 처리

push X : 정수 X 스택에 넣음
pop : 가장 위에 있는 정수 빼고 출력, 없으면 -1
size : 스택에 들어있는 개수 출력
empty : 비었으면 1, 아니면 0
top : 가장 위에 있는 정수 출력, 없으면 -1

<입력>
주어지는 명령의 수 N (1 ≤ N ≤ 10,000)
N개의 줄에는 명령이 하나씩, 1보다 크거나 같고, 100,000보다 작거나 같다

*/
const array = require("fs").readFileSync("/dev/stdin").toString().split("\n");

const stack = [];
const result = [];

const len = array.shift();

for (let i = 0; i < len; i++) {
  switch (array[i]) {
    case "pop":
      result.push(stack.pop() || -1);
      break;

    case "size":
      result.push(stack.length);
      break;

    case "empty":
      result.push(stack[0] ? 0 : 1);
      break;

    case "top":
      result.push(stack[stack.length - 1] || -1);
      break;

    default:
      stack.push(array[i].split(" ")[1]);
      break;
  }
}

console.log(result.join("\n"));
