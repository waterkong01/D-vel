import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { logout } from "./AxiosApiJWT"; // AxiosApiJWT에서 logout 함수 임포트
import "./Logout.css"; // CSS 파일 추가

const Logout = () => {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // 컴포넌트가 처음 렌더링될 때 JWT 토큰이 있는지 확인
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token); // 토큰이 있으면 로그인 상태, 없으면 로그아웃 상태
  }, []); // 컴포넌트가 처음 렌더링될 때만 실행

  // 로그인 상태를 반영하려면 이 부분도 변경
  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token); // 상태를 업데이트
  }, [localStorage.getItem("token")]); // 토큰이 변경될 때마다 상태 업데이트

  const handleLogout = async () => {
    try {
      // AxiosApiJWT에서 제공하는 logout 함수 호출
      await logout();
      localStorage.removeItem("token"); // 로그아웃 시 토큰 삭제
      setIsLoggedIn(false); // 상태 업데이트
      alert("로그아웃 되었습니다.");
      navigate("/"); // 로그인 페이지로 이동
    } catch (error) {
      console.error("로그아웃 실패:", error);
    }
  };

  const handleLogin = () => {
    navigate("/"); // 로그인 페이지로 이동
  };

  return (
    <div className="app-container">
      {" "}
      {/* app-container 클래스를 div에 추가 */}
      <nav className="navbar">
        {" "}
        {/* navbar 클래스를 nav에 추가 */}
        <button
          className="logout-button"
          onClick={isLoggedIn ? handleLogout : handleLogin} // 로그인 상태일 때 로그아웃, 아니면 로그인 페이지로 이동
        >
          {isLoggedIn ? "로그아웃" : "로그인"} {/* 버튼 텍스트 변경 */}
        </button>
      </nav>
    </div>
  );
};

export default Logout;
