let plain = "abab";
let a = plain.split("");
let b = [...a].reverse();
let ans;
let maxLen = 1;

for (let i = 0; i < a.length; i++) {
  let temp = 0;
  if (b.slice(0, i) == a.slice(a.length - 1 - i, i)) {
    temp = i;
  }
  if (maxLen > temp) temp = maxLen;
}
console.log("maxLen", maxLen);

ans = a.length * 2 - maxLen;
console.log(ans);
