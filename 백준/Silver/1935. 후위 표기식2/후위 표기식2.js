/*
후위 표기식 2

첫째 줄에 피연산자의 개수(1 ≤ N ≤ 26) 
둘째 줄에는 후위 표기식
피연산자는 A~Z의 영대문자이며, A부터 순서대로 N개의 영대문자


<프로세스>
스택
연산자 만나면 두개 팝
연산하고 다시 스택에 넣기
*/
const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "./example.txt";
const input = fs.readFileSync(filePath).toString().trim().split("\n");

let N = Number(input.shift());

let arr = input.shift().trim().split("");
let nums = [];

//각 알파벳에 해당하는 숫자
for (let i = 0; i < N; i++) {
  nums.push(Number(input[i].trim()));
}

let idx = 0;
for (let i = 0; i < arr.length; i++) {
  //알파벳이라면
  if (arr[i] != "+" && arr[i] != "-" && arr[i] != "*" && arr[i] != "/") {
    // arr[i] = nums[idx];
    // idx++;

    arr[i] = nums[arr[i].charCodeAt(0) - 65];
  }
}

let stk = [];

for (let i = 0; i < arr.length; i++) {
  stk.push(arr[i]);
  let top = stk[stk.length - 1];

  //연산자면 두개 팝하고 계산해서 넣기
  if (top == "+" || top == "-" || top == "*" || top == "/") {
    let operator = stk.pop();
    let b = stk.pop();
    let a = stk.pop();

    if (operator == "+") {
      stk.push(a + b);
    } else if (operator == "-") {
      stk.push(a - b);
    } else if (operator == "*") {
      stk.push(a * b);
    } else if (operator == "/") {
      stk.push(a / b);
    }
  }

  //   console.log(JSON.stringify(stk));
}

console.log(stk[0].toFixed(2));
