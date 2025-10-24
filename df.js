// let n = 120;
// let isPrime = new Array(n + 1).fill(true);

// isPrime[0] = false;
// isPrime[1] = false;

// for (let i = 2; i <= Math.floor(Math.sqrt(n)); i++) {
//   if (!isPrime[i]) continue; //소수아니면 넘김

//   //소수면
//   for (let k = 2; k * i < n; k++) {
//     isPrime[k * i] = false;
//   }
// }

let n = 120;
let isPrime = new Array(n + 1).fill(true);

isPrime[0] = false;
isPrime[1] = false;

for (let i = 2; i < Math.round(Math.sqrt(n)); i++) {
  if (!isPrime[i]) continue; //소수 아니면 패스

  for (let j = 2; i * j < n + 1; j++) {
    isPrime[i * j] = false;
  }
}

console.log(JSON.stringify(isPrime));

import React from "react";

for (let a = 2; a < Math.sqrt(n + 1); a++) {
  if (!isPrime[a]) continue;

  for (let b = 2; a * b < n + 1; b++) {
    isPrime[a * b] = false;
  }
}
