package implementation;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.util.Arrays;
import java.util.StringTokenizer;

/*
 치킨 배달
 
 n*n 도시, 각 칸은 빈칸, 치킨집, 집
 빈칸 0, 집 1, 치킨 2
 
 칸은 (r,c)형태, (1,1)시작
 
 치킨 거리 = 집과 가장 가까운 치킨집 사이 거리
 도시의 치킨 거리 = 모든 집의 치킨 거리 합
 
 치킨집 m개 빼고 폐업
 m개 치킨집의 가장 작은 도시의 치킨거리는? 
 
 <프로세스>
 조합 + 완탐
 숫자 입력받으면서 1,2 좌표들 각각 저장
 치킨집중 m개 선택
 1 각각에 대해 m개까지 최소거리 (치킨거리)
 합 계산
 현재 저장된 값보다 작다면 대체
 
 */

public class boj_15686 {
	static int N,M,homeCnt,chickenCnt;
	static int ans = Integer.MAX_VALUE;
	
	static int[][] map, chickens, homes;
	static int[][] temp;
	
	
	
	public static void main(String[] args) throws IOException {
		BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
		StringTokenizer st = new StringTokenizer(br.readLine());
		
		N = Integer.parseInt(st.nextToken());
		M = Integer.parseInt(st.nextToken());
		
		map = new int[N][N];
		
		
		
		//치킨집, 집 개수 계산
		for(int i=0; i<N; i++) {
			st = new StringTokenizer(br.readLine());
			
			for(int j=0; j<N; j++) {
				map[i][j] = Integer.parseInt(st.nextToken());
				if(map[i][j] == 1) homeCnt++;
				else if(map[i][j]==2) chickenCnt++;
			}
		}
		
		//치킨집 배열, 집 배열 생성
		homes = new int[homeCnt][];
		chickens = new int[chickenCnt][];
		
		temp = new int[chickenCnt][2];
		
		int a=0; //집 인덱스
		int b=0; //치킨집 인덱스
		
		
		//집, 치킨집 위치정보 각 배열에 저장
		for(int i=0; i<N; i++) {
			for(int j=0; j<N; j++) {
				if(map[i][j] == 1) {
					homes[a] = new int[] {i,j};
					a++;
				}else if(map[i][j] == 2) {
					chickens[b] = new int[] {i,j};
					b++;
				}
			}
		}
		
		
		comb(0,0);
		System.out.println(ans);
		
		
	}//main
	
	static void comb(int cnt, int start) {
		if (cnt == M) {
	        int sum = 0;
	        for (int i = 0; i < homeCnt; i++) {
	            int dist = Integer.MAX_VALUE;

	            // 집과 선택된 M개의 치킨집 거리 비교
	            for (int j = 0; j < M; j++) {
	                dist = Math.min(dist, Math.abs(homes[i][0] - temp[j][0]) + Math.abs(homes[i][1] - temp[j][1]));
	            }
	            sum += dist;
	        }

	        // 최소 도시 치킨 거리 갱신
	        ans = Math.min(ans, sum);
	        return;
	    }

	    for (int i = start; i < chickenCnt; i++) {
	        temp[cnt] = chickens[i];
	        comb(cnt + 1, i + 1);
	    }
		
	}
	
}
