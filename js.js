// async function fetchUser(userId) {
//   try {
//     const response = fetch(
//       `https://jsonplaceholder.typicode.com/users/${userId}`
//     );

//     console.log("response:", response);

//     if (!response.ok) {
//       throw new Error(`❌ 서버 응답 오류: ${response.status}`);
//     }

//     const data = await response.json();
//     console.log(data);
//     return data;
//   } catch (error) {
//     throw new Error(`❌ 네트워크 오류 또는 파싱 실패: ${error}`);
//   }
// }

// // 사용
// fetchUser(1)
//   .then((user) => {
//     console.log("✅ 유저 정보:", user);
//   })
//   .catch((error) => {
//     console.error("⚠️ 에러:", error.message);
//   });

async function example() {
  console.log("1. 요청 시작");

  const res = await fetch("https://jsonplaceholder.typicode.com/users/1");
  const data = await res.json(); // ✅ 반드시 await 붙여야 함!

  console.log("2. 응답 도착");
  console.log("✅ JSON 파싱된 결과:", data);
}
example();
