package implementation;

/*
 함께 블록 쌓기
 
 1~N번 사람 각자 블록 가짐
 인당 최대 M개, 한명이 가진 블록들의 높이 다름
 1~N번까지 학생이 가진 블록 차례로 사용해 탑 만들기
 
 안써도 되고 쓰면 최대 한개
 
 높이가 정확히 H가 되는 경우의 수
 
 <프로세스> 
 배열 생성, 0추가, 역순정렬 (안쓰는 경우)
 
 각 사람이 가진 모든 블록에 대해 탐색
 목표까지 남은 높이 < 현재 블록의 높이 -> 리턴
 
 
 
 
 */

import java.io.*;
import java.util.ArrayList;
import java.util.Collections;
import java.util.StringTokenizer;

public class boj_18427 {
	static int N,M,H;
	static ArrayList<Integer>[] arr;
	static int ans = 0;
	
	
	public static void main(String[] args) throws IOException {
		BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
		StringTokenizer st = new StringTokenizer(br.readLine());
		
		N=Integer.parseInt(st.nextToken());
		M=Integer.parseInt(st.nextToken());
		H=Integer.parseInt(st.nextToken());
		
		arr = new ArrayList[N];
		
		//가변배열 생성
		for(int i=0; i<N; i++) {
			st = new StringTokenizer(br.readLine());
			arr[i] = new ArrayList<Integer>();
			
			
			while(st.hasMoreTokens()) {
				arr[i].add(Integer.parseInt(st.nextToken()));
			}
			
			arr[i].add(0);
			Collections.sort(arr[i], Collections.reverseOrder());
		}
		
		
		recursive(0, H);
		System.out.println(ans);
		
	}//main
	
	static void recursive(int idx, int diff) {
//		System.out.println("idx:"+idx+" diff:"+diff);
		if(idx==N) {
			if(diff==0) {
				ans = (ans + 1) % 10007;
//				System.out.println("ans!");
			}
			return;
		}
		
		for(int i=0; i<arr[idx].size(); i++) {
			int cur = arr[idx].get(i);
			
			if(cur > diff) continue;
			else {
				recursive(idx+1, diff-cur);
			}
		}
	}//recur
}
