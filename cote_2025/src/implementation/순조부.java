
package implementation;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.util.Arrays;
import java.util.StringTokenizer;

public class 순조부 {
	static int N,R;
	static int[] numbers,result;
	static boolean[] used;

	public static void main(String[] args) throws IOException {
		BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
		StringTokenizer st  = new StringTokenizer(br.readLine());

		N = Integer.parseInt(st.nextToken());
		R = Integer.parseInt(st.nextToken());

		numbers = new int[N];
		result = new int[R];
		used = new boolean[N];
		

		st  = new StringTokenizer(br.readLine());
		for(int i=0; i<N; i++) {
			numbers[i] = Integer.parseInt(st.nextToken());
		}

		perm(0);
//		comb(0,0);
//		subset(0);

	}
	static void perm(int cnt) {
		if(cnt==R) {
			System.out.println(Arrays.toString(result));
			return;
		}
		for(int i=0; i<N; i++) {
			if(used[i]==false) {
				used[i] = true;
				result[cnt] = numbers[i];
				perm(cnt+1);
				used[i] = false;
			}
		}
	}//perm

	static void comb(int cnt,int start) {
		if(cnt==R) {
			System.out.println(Arrays.toString(result));
			return;
		}
		for(int i=start; i<N; i++) {
			result[cnt] = numbers[i];
			comb(cnt+1,i+1);
		}
	}//comb

	static void subset(int cnt) {
		if(cnt==N) {
			for(int i=0; i<N; i++) {
				System.out.print((used[i] ? numbers[i] : "X")+" ");
			}
			System.out.println();
			return;
		}
		used[cnt] = true;
		subset(cnt+1);
		used[cnt] = false;
		subset(cnt+1);
	}
}
