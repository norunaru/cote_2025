/*
외판원 순회 2

1~N까지 N개 도시, 도시 사이에 길 (없을 수도 있음)
한 도시에서 출발해 N개 도시 거쳐 다시 원래 도시로 돌아온다
한 번 방문한 도시는 다시 못감, 출발 도시로 돌아오는것 제외

도시 간 이동 비용 : W[i][j] = i->j 비용, != j->i
모든 도시 간 비용은 양의 정수
W[i][i] = 0
N과 비용 행렬이 주어졌을 때 가장 적은 비용은?

<프로세스>
let ans = Math.maxValue로 시작

방문한 도시 개수 cnt 설정
시작 도시를 1~N까지 변수로 사용해서 재귀 시작

방문배열 생성
시작 도시 isVisited = true;

각 재귀용 비용 계산 변수 temp
비용 배열의 시작 도시 행에 해당하는 값 isVisited = false면 넣기

cnt==N이면 마지막 도시->출발도시 값 있으면 계산해서 ans랑 비교하고 리턴, 없으면 그냥 리턴
 */
let fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "./example.txt";
let input = fs.readFileSync(filePath).toString().trim().split("\n");

const N = parseInt(input.shift());
let arr = Array.from({ length: N }, () => Array(N).fill(0));
let ans = Number.MAX_VALUE;
let isVisited;

for (let i = 0; i < N; i++) {
  let row = input[i].split(" ").map((v) => parseInt(v));
  for (let j = 0; j < N; j++) {
    arr[i][j] = row[j];
  }
}

// for (let i = 0; i < N; i++) {
//   console.log(JSON.stringify(arr[i]));
// }

//출발지, 현재 도시, 방문한 도시 개수, 비용
function check(start, cur, cnt, temp) {
  //기저조건
  if (cnt == N) {
    //마지막 도시에서 시작 도시로 돌아갈 수 있으면
    if (arr[cur][start] != 0) {
      temp += arr[cur][start];
      if (ans > temp) ans = temp;
    }
    return;
  }

  //안가본 도시 넣기
  for (let i = 0; i < N; i++) {
    if (isVisited[i] == false && arr[cur][i] != 0) {
      isVisited[i] = true;
      check(start, i, cnt + 1, temp + arr[cur][i]);
      isVisited[i] = false;
    }
  }
}

for (let i = 0; i < N; i++) {
  isVisited = new Array(N).fill(false);
  isVisited[i] = true;
  check(i, i, 1, 0);
}

console.log(ans);
