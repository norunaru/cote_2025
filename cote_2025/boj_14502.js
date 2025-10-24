/*
연구소

N*M 연구소
빈칸, 벽으로 이루어짐

일부 칸에 바이러스, 상하좌우 인접 칸으로 전파
세울 수 있는 벽의 개수 3, 반드시 세개 세워야됨

0빈칸 1벽 2바이러스

벽을 세워서 바이러스가 퍼지지 않는 안전 영역의 최댓값 계산

<프로세스>
arr 생성하면서 0인 값들 좌표 y,x 저장
저장된 좌표들 중 3개 조합으로 선택

선택 완료되면 원본 배열 복사본에 선택한 좌표들 1로 설정한 뒤 바이러스 bfs
bfs 이후 안전 영역 개수 측정, ans로 설정

*/
const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "./example.txt";
const input = fs.readFileSync(filePath).toString().trim().split("\n");

//세팅
let dy = [-1, 0, 1, 0];
let dx = [0, 1, 0, -1];

let [N, M] = input.shift().trim().split(" ").map(Number);
let arr = [];
let ans = 0;

for (let i = 0; i < N; i++) {
  arr.push(input[i].split(" ").map((v) => parseInt(v)));
}

//0인 공간 저장
class Node {
  constructor(y, x) {
    this.y = y;
    this.x = x;
  }
}

let zeros = [];

for (let i = 0; i < N; i++) {
  for (let j = 0; j < M; j++) {
    if (arr[i][j] == 0) {
      zeros.push(new Node(i, j));
    }
  }
}

// console.log(JSON.stringify(zeros));

//조합
let temp = new Array(3).fill(new Node(0, 0));

const comb = (cnt, start) => {
  //벽 세울 곳 다 선정했으면
  if (cnt == 3) {
    //원본 복사하고 선정한 곳에 벽 세우기
    let copy = arr.map((row) => [...row]);
    for (let i = 0; i < 3; i++) {
      let { y, x } = temp[i];
      copy[y][x] = 1;
    }

    //바이러스 bfs
    let queue = [];
    for (let i = 0; i < N; i++) {
      for (let j = 0; j < M; j++) {
        if (copy[i][j] == 2) {
          queue.push(new Node(i, j));
        }
      }
    }

    while (queue.length != 0) {
      let { y, x } = queue.shift();

      for (let dir = 0; dir < 4; dir++) {
        let ny = y + dy[dir];
        let nx = x + dx[dir];

        if (ny >= 0 && ny < N && nx >= 0 && nx < M && copy[ny][nx] == 0) {
          copy[ny][nx] = 2;
          queue.push(new Node(ny, nx));
        }
      }
    }

    //bfs 이후 안전영역 개수 검사
    let safe = 0;
    for (let i = 0; i < N; i++) {
      for (let j = 0; j < M; j++) {
        if (copy[i][j] == 0) {
          safe++;
        }
      }
    }

    ans = Math.max(ans, safe);

    return;
  }

  for (let i = start; i < zeros.length; i++) {
    temp[cnt] = zeros[i];
    comb(cnt + 1, i + 1);
  }
};

comb(0, 0);

console.log(ans);
