
import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;

public class Main {
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
