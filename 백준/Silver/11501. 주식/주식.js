/*
주식

매일 행동 선택지 3개
1. 한 주 사기
2. 원하는만큼 팔기
3. 아무것도 안하기

날 별로 주식 가격을 알고있을 떄 최대 이익 계산

테스트케이스 수를 나타내는 자연수 T
첫 줄에는 날의 수를 나타내는 자연수 N(2 ≤ N ≤ 1,000,000)
둘째 줄에는 날 별 주가를 나타내는 N개의 자연수들이 공백으로 구분

<프로세스>
N이 1000000 -> O(n*2)면 시간초과

틀린 풀이 : 
스택
현재 원소가 top보다 크거나 같다면 스택에 push
top보다 작은 원소인 경우 :
top이 매도할 수 있는 최대 가격
top = bestPrice
들어있는 모든 값을 팝하면서 ans += bestPrice-스택의 각 원소 
다 팝한 뒤 오늘 가격 push

이렇게 풀면 10 1 1 1 1 100 반례 존재
현재 만나는 값이 최대인 것이 아닌 미래의 값 중 최고점에 매도해야 최대 이득이됨
-> 뒤에서부터 역으로 접근

풀이 2: 
뒤에서부터 역순으로 접근
값이 증가하면 maxPrice 갱신
값이 감소하면 ans에 maxPrice - cur 


*/

const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "./example.txt";
const input = fs.readFileSync(filePath).toString().trim().split("\n");

let T = Number(input.shift());

for (let tc = 0; tc < T; tc++) {
  let N = Number(input.shift());
  let arr = input.shift().split(" ").map(Number);
  let ans = 0;
  let maxPrice = 0;

  for (let i = N - 1; i >= 0; i--) {
    let cur = arr[i];

    if (cur >= maxPrice) {
      maxPrice = cur;
    } else {
      ans += maxPrice - cur;
    }
  }

  console.log(ans);
}
