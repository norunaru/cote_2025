/*
암호 만들기

암호는 서로 다른 L개 알파벳 소문자로 구성, 최소 한 개의 모음 + 최소 두 개의 자음
정렬됨

암호로 사용했을 법한 문자 C개
C개 문자가 주어졌을 때 가능성 있는 모든 암호를 구하라

첫째 줄에 두 정수 L, C가 주어진다. (3 ≤ L ≤ C ≤ 15) 다음 줄에는 C개의 문자들이 공백으로 구분되어 주어진다.
주어지는 문자들은 알파벳 소문자이며, 중복되는 것은 없다.

<프로세스>
조합
입력받는 문자 정렬
기저조건에 모음 개수, 자음 개수 확인
*/

const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "./example.txt";
const input = fs.readFileSync(filePath).toString().trim().split("\n");

let [L, C] = input.shift().split(" ").map(Number);

let arr = input.shift().split(" ").sort();
let temp = new Array(L).fill("");

function comb(cnt, start) {
  //기저조건 : L개 뽑은 뒤 자음, 모음 개수 검증
  if (cnt == L) {
    // console.log(temp);
    let son = 0;
    let mom = 0;

    for (let i = 0; i < L; i++) {
      if (
        temp[i] == "a" ||
        temp[i] == "e" ||
        temp[i] == "i" ||
        temp[i] == "o" ||
        temp[i] == "u"
      ) {
        mom++;
      } else {
        son++;
      }
    }
    if (mom >= 1 && son >= 2) {
      console.log(temp.join(""));
    }
    return;
  }

  for (let i = start; i < C; i++) {
    temp[cnt] = arr[i];
    comb(cnt + 1, i + 1);
  }
}

comb(0, 0);
