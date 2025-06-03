import java.util.PriorityQueue;

class Solution {
    public int solution(int[] scoville, int K) {
        int ans = 0;
        PriorityQueue<Integer> pq = new PriorityQueue<>();
        
        // 모든 스코빌 지수를 우선순위 큐에 추가
        for (int scov : scoville) {
            pq.offer(scov);
        }

        // 섞는 과정을 시작
        while (pq.size() > 1) {
            // 현재 가장 작은 스코빌 지수가 K 이상이면 멈춤
            if (pq.peek() >= K) {
                return ans;
            }

            // 가장 작은 두 개의 스코빌 지수를 꺼내서 섞기
            int first = pq.poll();
            int second = pq.poll();
            int newScoville = first + second * 2;
            pq.offer(newScoville);  // 새로운 스코빌 지수를 다시 추가
            ans++;  // 섞은 횟수 증가
        }

        // 마지막 하나 남은 음식이 K 미만인 경우
        if (pq.peek() < K) {
            return -1;
        }

        return ans;
    }
}
