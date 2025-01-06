package 순조부;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.util.Arrays;
import java.util.StringTokenizer;

/*
 로또
 
 1~49 중 6개
 
 k(k>6)개를 골라 집합을 만들고 그 중 6개만 고르는 전략
 
 조합
 */

public class boj_6603 {
	static int[] arr,temp;
	static int k;

	public static void main(String[] args) throws IOException {
		BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
		
		while(true) {
			StringTokenizer st = new StringTokenizer(br.readLine());
			k = Integer.parseInt(st.nextToken());
			if(k==0) break;

			arr = new int[k];
			temp = new int[k];
			
			for(int i=0; i<k; i++) {
				arr[i] = Integer.parseInt(st.nextToken());
			}
			
			
			
			comb(0,0);
		}
		
		
	}//main
	
	static void comb(int cnt, int start) {
		if(cnt==6) {
			StringBuilder sb = new StringBuilder();
			
			for(int i=0; i<6; i++) {
				sb.append(temp[i]).append(" ");
			}
			
			System.out.println(sb);
			
			return;
		}
		
		for(int i=start; i<k; i++) {
			temp[cnt] = arr[i];
			comb(cnt+1, i+1);
		}
		
	}
}
