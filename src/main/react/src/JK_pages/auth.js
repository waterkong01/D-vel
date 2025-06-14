// auth.js
export const isAuthenticated = () => {
  const token = localStorage.getItem("token"); // localStorage에서 토큰을 가져옵니다.
  if (!token) return false;

  // 유효성 검사: 여기서는 예시로 단순히 토큰이 존재하는지 확인하는 방법을 사용했습니다.
  // 실제로는 JWT의 만료 시간 등을 체크할 수 있습니다.
  return true;
};
