function solution(land) {
  // 배열 길이 받아오기
  let n = land.length;
  let m = land[0].length;
  
  // 방문 배열 생성
  let visited = Array.from({length:n}, () => Array(m).fill(0));
  
  // 인접 탐색 값 설정
  let dt = [[0,1], [1,0], [0,-1], [-1,0]];
  
  // 유전 탐색, 값 부여
  let oilList = [];
  let rowLine = new Set();
  let spotCount = 0;
  let areaValue = 0;
  for (let i=0; i<n; i++) {
      for (let j=0; j<m; j++) {
          if (land[i][j] && !visited[i][j]) {
              // 기름이 있는 지점 조우시 DFS로 구역 탐색
              let queue = [[i,j]];
              rowLine.clear();
              areaValue = 0;
              
              while (queue.length > 0) {
                  spot = queue.pop()
                  rowLine.add(spot[1])
                  areaValue += 1;
                  visited[spot[0]][spot[1]] = 1;
                  for (let d=0; d<4; d++) {
                      let di = spot[0]+dt[d][0];
                      let dj = spot[1]+dt[d][1];
                      if (di >= 0 && dj >= 0 && di<n && dj<m && !visited[di][dj] && land[di][dj]) {
                          queue.push([di,dj]);
                          visited[di][dj] = 1;  
                      }
                  }  
              }
              oilList.push([Array.from(rowLine), areaValue]);
              spotCount += 1;
          }
      }
  }
  
  // 기름 정보를 토대로 m을 순회하며 가장 높은 값 구하기
  let values = []
  for (let r=0; r<m; r++) {
      let rowValue = 0
      for (let oil of oilList) {
          if (oil[0].includes(r)) {
              rowValue += oil[1]
          }
      }
      values.push(rowValue)
  }
  let result = values.reduce((max, current) => Math.max(max, current), values[0])
  return result
}