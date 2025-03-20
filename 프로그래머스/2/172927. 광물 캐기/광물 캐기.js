/*
다이아, 철, 돌 곡괭이 각 0~5개 
광물캘때 피로도 소모
각 곡괭이는 5개 캐면 사용 불가

곡괭이중 하나 선택
한번 사용한 곡괭이는 부서질때까지
광물은 주어진 순서대로만 
모든 광물 캐거나 곡괭이 없을 때까지 광물 캐기

피로도의 최소치는?

[프로세스]
그리디?
5개씩 묶어서 다 돌로 캤을 때 가정하고 값 나누기
값 정렬
좋은 곡괭이부터 사용
*/

function solution(picks, minerals) {
    var answer = 0;
    let temp = [];
    let pickCnt = picks.reduce((acc, cur) => acc+cur,0);
    
    minerals = minerals.splice(0,pickCnt*5);

    //광물들 5개씩 묶어서 계산
    while(minerals.length!=0 && picks.reduce((acc,cur)=>acc+cur, 0) != 0){
        let tempSum = 0;
        
        //5개 중 다이아, 철, 돌 갯수
        let diaCnt = 0;
        let ironCnt = 0;
        let stoneCnt =0;
        
        for(let i=0; i<5 && minerals.length!=0; i++){
            let mineral = minerals.shift();
            if(mineral == 'diamond') diaCnt++;
            else if(mineral == 'iron') ironCnt++;
            else stoneCnt++;
        }
        
        //다곡으로 캤을때, 철곡으로 캤을때, 돌곡으로 캤을때 피로도
        temp.push([diaCnt+ironCnt+stoneCnt, diaCnt*5+ironCnt+stoneCnt,diaCnt*25+ironCnt*5+stoneCnt]);
    }
    
    //결과 역순정렬
    temp.sort((a,b) => b[2]-a[2]);
    console.log(JSON.stringify(temp));    
        
    let index = 0;
    //좋은 곡괭이부터 그리디
    while(temp.length!=0 && pickCnt!=0){
        let curGroup = temp.shift();
        let curPick;
        //곡괭이 설정
        if(picks[0]) {
            curPick = 0;
            picks[0]--;
            pickCnt--;
        }
        else if(picks[1]) {
            curPick = 1;
            picks[1]--;
            pickCnt--;
        }
        else {
            curPick = 2;
            picks[2]--;
            pickCnt--;
        }
        answer += curGroup[curPick];
        console.log(curGroup[curPick]);
        
        index++;
    }
    
    return answer;
}

















