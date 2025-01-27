const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "./example.txt";
const input = fs.readFileSync(filePath).toString().trim().split("\n");

class Tower {
  constructor(no, height) {
    this.no = no;
    this.height = height;
  }
}

let N = Number(input[0]);
let heights = input[1].split(" ").map(Number);
let stk = [];
let ans = new Array(N).fill(0);

for (let i = 0; i < N; i++) {
  let cur = new Tower(i + 1, heights[i]);

  if (stk.length == 0) {
    stk.push(cur);
  } else {
    while (stk.length > 0 && stk[stk.length - 1].height < cur.height) {
      stk.pop();
    }
    if (stk.length > 0) {
      ans[i] = stk[stk.length - 1].no;
    }
    stk.push(cur);
  }
}

console.log(ans.join(" "));
