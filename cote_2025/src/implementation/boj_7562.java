package implementation;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.util.ArrayDeque;
import java.util.Queue;
import java.util.StringTokenizer;

/*
 나이트의 이동
 
 이동하려는 칸이 주어짐
 몇 번 움직여서 이동 가능?
 
 테케 개수
 각 테케 3줄
 한 변의 길이 I (0~I-1)
 현재 칸
 이동 칸
 */
public class boj_7562 {
	static int[][] arr;
	static boolean[][] isVisited;
	static int I;
	static int startY,startX,endY,endX;
	
	static int[] dy = {-2,-1,1,2,2,1,-1,-2};
	static int[] dx = {1,2,2,1,-1,-2,-2,-1};
	
	static Queue<Node> queue;
	
	public static void main(String[] args) throws IOException {
		BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
		StringTokenizer st = new StringTokenizer(br.readLine());
		
		int tc = Integer.parseInt(st.nextToken());
		
		
		for(int i=0; i<tc; i++) {
			queue  = new ArrayDeque<Node>();
			int ans = 0;
			st =  new StringTokenizer(br.readLine());
			I = Integer.parseInt(st.nextToken());
			arr = new int[I][I];
			isVisited = new boolean[I][I];
			
			st =  new StringTokenizer(br.readLine());
			startY = Integer.parseInt(st.nextToken());
			startX = Integer.parseInt(st.nextToken());
			
			st =  new StringTokenizer(br.readLine());
			endY = Integer.parseInt(st.nextToken());
			endX = Integer.parseInt(st.nextToken());
			
			queue.add(new Node(startY, startX, 0));
			isVisited[startY][startX] = true;
			
			
			while(!queue.isEmpty()) {
				Node cur = queue.poll();
				int curY = cur.y;
				int curX = cur.x;
				int cnt = cur.cnt;
				
				if(curY==endY && curX==endX) {
					ans = cnt;
					break;
				}
				
				for(int j=0; j<8; j++) {
					int ny = curY+dy[j];
					int nx = curX+dx[j];
					
					if(ny<I && ny>=0 && nx<I && nx>=0 && isVisited[ny][nx]==false) {
						isVisited[ny][nx] = true;
						queue.add(new Node(ny,nx,cnt+1));
					}
				}
			}
			
			System.out.println(ans);
		}//tc
		
	}//main
	
	private static class Node{
		int y,x,cnt;
		
		Node(int y, int x, int cnt){
			this.y = y;
			this.x = x;
			this.cnt = cnt;
		}
		
	}//Node

}
