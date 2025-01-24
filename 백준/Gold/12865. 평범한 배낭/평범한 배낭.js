/*
평범한 배낭

N개 물건, 각 무게 W와 가치 V
최대 K만큼의 무게 가능 배낭
배낭에 넣을 수 있는 가치의 최댓값은?


첫 줄에 물품의 수 N(1 ≤ N ≤ 100)과 준서가 버틸 수 있는 무게 K(1 ≤ K ≤ 100,000)가 주어진다. 두 번째 줄부터 N개의 줄에 거쳐 각 물건의 무게 W(1 ≤ W ≤ 100,000)와 해당 물건의 가치 V(0 ≤ V ≤ 1,000)가 주어진다.

<프로세스>
dp
현재무게 w에 들어가는 최대 가치 : 
w-1의 최대가치 or w-현재 물건의 무게에 들어가는 최대가치 + 현재 물건의 가치

2차원 dp배열

*/

let fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "./example.txt";
let input = fs.readFileSync(filePath).toString().trim().split("\n");

//물건 개수, 가방 무게게
let [N, K] = input
  .shift()
  .split(" ")
  .map((v) => parseInt(v));

let dp = Array.from({ length: K + 1 }, () => Array(N + 1).fill(0));

let weights = [0];
let values = [0];

for (let i = 0; i < N; i++) {
  let [W, V] = input[i].split(" ").map((v) => parseInt(v));
  weights.push(W);
  values.push(V);
}

for (let w = 1; w < K + 1; w++) {
  for (let i = 1; i < N + 1; i++) {
    if (w - weights[i] >= 0) {
      dp[w][i] = Math.max(dp[w][i - 1], dp[w - weights[i]][i - 1] + values[i]);
    } else {
      dp[w][i] = dp[w][i - 1]; // 물건을 넣을 수 없는 경우 이전 값을 유지
    }
  }
}

// console.log("\n");
// for (let i = 0; i < K + 1; i++) {
//   console.log(JSON.stringify(dp[i]));
// }

console.log(dp[K][N]);
