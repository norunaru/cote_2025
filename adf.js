/*
지도에 폭탄 묻힌 위치 기록
r*c 크기 직사각형, 지도 압축 과정
1. 임의 행에 대해 행의 위, 아래 행의 내용과 동일하면 하나로 합침
2. 임의 열에 대해 좌나 우 동일하면 하나로 합침

check 배열 생성, 초기 0
합치는 연산은 0일 경우에만 수행
    합치는 연산 생길 경우 카운트 증가


카운트 0 아닌 칸 bfs해서 계산 + 0인 칸 따로 계산

*/

class Node{
    constructor(y,x){
        this.y = y;
        this.x = x;
    }
}


function solution(r, c, bombmap) {
    var answer = [];

    let dy = [-1,0,1,0];
    let dx = [0,1,0,-1];

    let check = Array.from({length:r}, () => new Array(c).fill(0));

    let arr = [];
    for(let i=0; i<r; i++){
        arr.push(bombmap.slice(i*c,i*c+c));
    }

    //상하 
    for(let i=0; i<r-1; i++){
        let flag = true;   

        for(let j=0; j<c; j++){
            if(arr[i][j] != arr[i+1][j]){
                flag = false;
            }
            // console.log(r,c,"flag:",flag);
            
        }
        
        if(flag){
            for(let j=0; j<c; j++){
                check[i][j]++;
                check[i+1][j]++;
            }
        }
    }

    //좌우 
    for(let j=0; j<c-1; j++){
        let flag = true;   

        for(let i=0; i<r; i++){
            if(arr[i][j] != arr[i][j+1]){
                flag = false;
            }
            // console.log(r,c,"flag:",flag);
            
        }
        
        if(flag){
             for(let i=0; i<r; i++){
                check[i][j]++;
                check[i][j+1]++;
            }
        }
    }


    let ans = 0; //O
    let ans2 = 0; //X
    let isVisited = Array.from({length:r}, () => new Array(c).fill(false));


    //0인 칸 카운트
    for(let i=0; i<r; i++){
        for(let j=0; j<c; j++){
            if(check[i][j]==0 && arr[i][j]==1){
                ans++;
            }
        }
    }

    for(let i=0; i<r; i++){
        for(let j=0; j<c; j++){
            if(check[i][j]==0 && arr[i][j]==0){
                ans2++;
            }
        }
    }

    //0 아닌 칸


    let queue = [];
    for(let i=0; i<r; i++){
        for(let j=0; j<c; j++){
            //폭탄, 합쳐진 칸, 방문안한 칸
            if(arr[i][j]==1 && check[i][j] > 0 && isVisited[i][j]==false){
                console.log("--",i,j);
                ans++;
                isVisited[i][j] = true;


                queue.push(new Node(i,j));
                while(queue.length!=0){
                    let {y,x}= queue.shift();
                    for(let dir=0; dir<4; dir++){
                        let ny = y+dy;
                        let nx = x+dx;

                        if(ny>=0 && ny<r && nx>=0 && nx<c && arr[ny][nx]==1 && isVisited[ny][nx]==false && check[ny][nx]!=0){
                            isVisited[ny][nx] = true;
                            queue.push(ny,nx);
                        }
                    }
                }
            }
        }
    }


    for(let i=0; i<r; i++){
        for(let j=0; j<c; j++){
            if(arr[i][j]==0 && check[i][j] != 0 && isVisited[i][j]==false){
                ans2++;
                queue.push(new Node(i,j));
                isVisited[i][j] = true;

                while(queue.length!=0){
                    let {y,x}= queue.shift();
                    for(let dir=0; dir<4; dir++){
                        let ny = y+dy;
                        let nx = x + dx;

                        if(ny>=0 && ny<r && nx>=0 && nx<c && arr[ny][nx]==0 && isVisited[ny][nx]==false && check[ny][nx]!=0){
                            isVisited[ny][nx] = true;
                            queue.push(ny,nx);
                        }
                    }
                }
            }
        }
    }

    console.log(ans, ans2);

    answer = [ans,ans2];
    
    return answer;

}