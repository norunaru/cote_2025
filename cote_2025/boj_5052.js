const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "./example.txt";
const input = fs.readFileSync(filePath).toString().trim().split("\n");

let T = Number(input.shift().trim());

for (let tc = 0; tc < T; tc++) {
  let n = Number(input.shift().trim());

  let nums = [];

  for (let i = 0; i < n; i++) {
    nums.push(input.shift().trim());
  }

  // nums.sort((a, b) => a.length - b.length);
  nums.sort();

  let flag = false; //겹치는 번호 유무

  // console.log(JSON.stringify(nums));

  for (let i = 0; i < n - 1; i++) {
    if (nums[i + 1].startsWith(nums[i])) {
      flag = true;
      break;
    }
  }

  if (flag) console.log("NO");
  else console.log("YES");
}
