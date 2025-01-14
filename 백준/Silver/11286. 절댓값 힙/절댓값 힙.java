import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.util.PriorityQueue;
import java.util.StringTokenizer;

/*
 * 배열에 0이 아닌 정수 넣음
 * 절댓값이 가장 작은 값 출력, 배열에서 제거
 * 가장 작은 값이 여러개면 가장 작은 수 출력, 배열에서 제거
 * 비어있는 배열에서 시작
 * 
 * 연산 개수 N(1≤N≤100,000)
 * 다음 N개줄에 정수 x 주어짐
 * x != 0 -> 배열에 추가
 * x == 0 -> 절댓값 가장 작은 값 출력, 제거
 * 2^31 2^-31 -> int
 * */

public class Main {
	static int[] arr;
	
	static int x;
	static int N;
	
	public static void main(String[] args) throws IOException {
		BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
		PriorityQueue<Integer> pq = new PriorityQueue<>(); //양수 오름차순
		PriorityQueue<Integer> pq2 = new PriorityQueue<>( (a,b)->b-a ); //음수 내림차순
		
		N = Integer.parseInt(br.readLine());
		for(int i=0; i<N; i++) {
			x = Integer.parseInt(br.readLine());
			if(x>0) { //양수는 pq에 저장
				pq.add(x);
			}else if(x<0){ //음수는 pq2에 저장
				pq2.add(x);
			}else { //0이면 출력
				if(pq.size()==0 && pq2.size()==0)System.out.println("0"); //둘 다 비어있으면 0출력
				else if(pq.size()!=0 && pq2.size() ==0) { //둘 중 하나가 비어있으면 들어있는거에서 빼서 출력
					System.out.println(pq.poll());
				} else if(pq.size()==0 && pq2.size()!=0) {
					System.out.println(pq2.poll());
				}
				else if(pq.peek()<Math.abs(pq2.peek())) { 
					System.out.println(pq.poll());
				} else if(pq.peek()>Math.abs(pq2.peek())) {
					System.out.println(pq2.poll());
				} else {//pq,pq2의 절댓값이 같으면 pq2의 값 poll
					System.out.println(pq2.poll());
				}
			}
		}
		
		
	}//main
}