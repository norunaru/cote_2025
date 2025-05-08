const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "./example.txt";
const input = fs.readFileSync(filePath).toString().trim().split("\n");

const [N, K] = input[0].split(" ").map(Number);
const words = input.slice(1).map((word) => word.slice(4, -4));

const essential = ["a", "n", "t", "i", "c"];

if (K < 5) {
  console.log(0);
  return;
}

const alpha = Array.from({ length: 26 }, (_, i) => String.fromCharCode(97 + i));
const learnable = alpha.filter((a) => !essential.includes(a));

let max = 0;

function comb(cnt, start, learned) {
  if (cnt == K - 5) {
    let readable = 0; //현재 배운 단어들로 읽을 수 있는 개수
    for (let word of words) {
      if ([...word].every((ch) => learned.has(ch))) {
        readable++;
      }
    }
    max = Math.max(max, readable);

    return;
  }

  for (let i = start; i < learnable.length; i++) {
    learned.add(learnable[i]);
    comb(cnt + 1, i + 1, learned);
    learned.delete(learnable[i]);
  }
}

const learned = new Set(essential);

comb(0, 0, learned);

console.log(max);
