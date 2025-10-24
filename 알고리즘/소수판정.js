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
