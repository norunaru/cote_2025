/*
고속도로 모든 차가 단속 카메라를 한 번은 만나게 설치

진입 시점, 진출 시점 주어짐

*/

function solution(routes) {
    var answer = 1;
    
    routes.sort((a,b) => a[1]-b[1]);
    console.log(JSON.stringify(routes));
    let cur = routes[0][1];
    
    for(let i=1; i<routes.length; i++){
        if(routes[i][0] > cur){
            answer++;
            cur = routes[i][1];
        }
    }
    
    
    return answer;
}