/*
오목

19*19 오목판
위에서부터 1,2,3,...,19 번호
다섯개 같은색 가로 세로 대각 연속 -> 승리, 
여섯개는 아님
둘 다 이기거나 두군데 이상에서 5개인 경우는 없음

검 1, 백2, 빈칸 0

<프로세스>
20*20으로 설정
(dy>=1 && dy<20 && dx>=1 && dx<20)

각 인덱스 검사, 1이나 2나오면 해당 색으로 시작
델타 뱡향 : 
오른쪽, 아래, 왼아래대각, 우아래대각 4개 (위쪽은 어차피 각 인덱스 검사하므로 필요없음)

종료 조건 : 
현재 검사하는 칸이 시작 색과 다른색이거나 빈칸, 바둑판 벗어날 경우
cnt==5면 출력

*/

let fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "./example.txt";
let input = fs.readFileSync(filePath).toString().trim().split("\n");

let dy = [0, 1, 1, 1];
let dx = [1, 0, -1, 1];
let ans = 0;
let ansY, ansX;

//바둑판 생성
let arr = Array.from({ length: 20 }, () => Array(20).fill(0));
for (let i = 0; i < 19; i++) {
  let row = input[i].split(" ").map((v) => parseInt(v));
  for (let j = 0; j < 19; j++) {
    arr[i + 1][j + 1] = row[j];
  }
}

// for (let i = 0; i < 20; i++) {
//   console.log(JSON.stringify(arr[i]));
// }

for (let i = 1; i < 20; i++) {
  for (let j = 1; j < 20; j++) {
    if (ans != 0) break;
    //흑
    if (arr[i][j] == 1) {
      for (let dir = 0; dir < 4; dir++) {
        let dirY = dy[dir];
        let dirX = dx[dir];

        //육목 가능성 체크하고 시작작
        if (arr[i - dirY][j - dirX] != 1) check(1, 1, i, j, dirY, dirX);
      }
    }
    //백
    else if (arr[i][j] == 2) {
      for (let dir = 0; dir < 4; dir++) {
        let dirY = dy[dir];
        let dirX = dx[dir];

        if (arr[i - dirY][j - dirX] != 2) check(2, 1, i, j, dirY, dirX);
      }
    }
  }
}

function check(color, cnt, y, x, dirY, dirX) {
  let ny = y + dirY;
  let nx = x + dirX;

  //경계 벗어나거나 색깔이 다르면 현재 재귀 종료
  if (ny == 20 || nx == 20 || arr[ny][nx] != color) {
    if (cnt == 5) {
      ans = color;
      //시작점, 끝점 비교 -> 시작점의 X가 끝점의 X보다 값이 작다면 ansX는 시작점
      if (x - dirX * 4 < x || x - dirX == x) {
        ansX = x - dirX * 4;
        ansY = y - dirY * 4;
      } else {
        ansX = x;
        ansY = y;
      }
    }
    return;
  }

  if (ny >= 1 && ny < 20 && nx >= 1 && nx < 20) {
    check(color, cnt + 1, ny, nx, dirY, dirX);
  }
}

console.log(ans);
if (ans != 0) {
  console.log(ansY, ansX);
}
