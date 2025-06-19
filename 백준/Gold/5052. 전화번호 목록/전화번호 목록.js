const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "./example.txt";
const input = fs.readFileSync(filePath).toString().trim().split("\n");

let T = Number(input[0]);
let index = 1;

for (let tc = 0; tc < T; tc++) {
  let n = Number(input[index++]);

  let nums = [];

  for (let i = 0; i < n; i++) {
    nums.push(input[index++]);
  }

  nums.sort();

  let flag = false;

  for (let i = 0; i < n - 1; i++) {
    if (nums[i + 1].startsWith(nums[i])) {
      flag = true;
      break;
    }
  }

  console.log(flag ? "NO" : "YES");
}
