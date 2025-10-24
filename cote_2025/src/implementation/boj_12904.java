
/*
 A와 B
 
 A,B로만 이루어진 단어
 
 두 문자열 S,T가 주어질 때 S->T
 방법 2개
 1. 문자열 뒤에 A추가
 2. 문자열 뒤집고 B 추가
 
 가능하면 1, 안되면 0
 
 <프로세스> 
 재귀?
 S에다가 방법 1,2 브루트포스
 S길이==T길이 일 때 문자열 같은지 검사, 같으면 result = 1
 --- 시간초과
 */
package implementation;


import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;

public class boj_12904 {
	static String S,T;
	static int result=0;

	public static void main(String[] args) throws IOException {
		BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
		
		S = br.readLine();
		T = br.readLine();
		
		recursive(S, T);
		
		System.out.println(result);

	}//main
	
	static void recursive(String S, String T) {
		if(S.length()==T.length()) {
			if(S.equals(T)) result = 1;
			return;
		}
		
		if(T.charAt(T.length()-1)== 'A') { 
			T = T.substring(0,T.length()-1);
			recursive(S,T);
		}else {
			T = new StringBuilder(T.substring(0,T.length()-1)).reverse().toString() ;
			recursive(S, T);
		}
		
	}//recursive
	
}
