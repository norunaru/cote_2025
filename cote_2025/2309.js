/*
일곱난쟁이

난쟁이는 7명, 2명 스파이
원래 7명은 키 합이 100

진짜 난쟁이만 찾는법?

<프로세스>
조합 -> 7명 골라서 키 합이 100
 */

let fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "./example.txt";
let input = fs.readFileSync(filePath).toString().trim().split("\n");

let dwarfs = [];

for (let i = 0; i < 9; i++) {
  dwarfs.push(parseInt(input[i]));
}

let ans = [];

//temp는 임시 조합 배열
function comb(cnt, start, temp) {
  if (cnt == 7) {
    let tempSum = temp.reduce((acc, curr) => acc + curr, 0);
    if (tempSum == 100) {
      ans = [...temp];
    }

    return;
  }

  for (let i = start; i < 9; i++) {
    temp.push(dwarfs[i]);
    comb(cnt + 1, i + 1, temp);
    temp.pop();
  }
}

comb(0, 0, []);

ans.sort((a, b) => a - b);
for (let i = 0; i < 7; i++) {
  console.log(ans[i]);
}
