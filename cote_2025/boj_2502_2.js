/*
떡 먹는 호랑이

오늘 떡 = 어제 + 그저께
오늘 몇 개를 줬고 며칠쨰인지 알고있음
D,K

첫 날 A, 둘째 날 B 구하기
1<=A<=B

[프로세스]
A=D-2, B=D-1 날짜로 역순으로 검사

떡 배열 D+1 생성 (인덱스 = 날짜, 값 = 떡 개수)

B초기값은 K/2, 조건 안맞으면 ++, dduck 초기화
조건 : dduck[A]<dduck[B], A==1까지 반복
    dduck[A]+dduck[B]==dduck[B+1] -> B=A, A=B-1, dduck[A]=dduck[B+1]-dduck[B];
    
기저 A==1, B==2, dduck[A],dduck[B] > 0
*/

const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "./example.txt";
const input = fs.readFileSync(filePath).toString().trim().split(" ");

let [D, K] = input.map(Number);

let original = new Array(D + 1).fill(0);
let last = original.length - 1;
original[last] = K;

// console.log(JSON.stringify(original));

A: for (let b = Math.ceil(K / 2); b < K; b++) {
  //떡 배열 복사
  let dduck = [...original];

  let A = last - 2;
  let B = last - 1;

  dduck[B] = b;
  dduck[A] = dduck[last] - dduck[B];

  while (A != 0) {
    B = A;
    A = B - 1;
    dduck[A] = dduck[B + 1] - dduck[B];
    // if (dduck[A] > dduck[B]) continue A;
  }

  //   console.log(JSON.stringify(dduck));
  if (dduck[1] > 1 && dduck[1] < dduck[2]) {
    console.log(dduck[1]);
    console.log(dduck[2]);
    break;
  }
}
