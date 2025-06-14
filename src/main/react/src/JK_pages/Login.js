import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "./AxiosApiJWT"; // AxiosApiJWT.js에서 login 함수 import
import { isAuthenticated } from "./auth";
import "./Login.css"; // 로그인 전용 CSS 파일

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  // 로그인된 사용자가 로그인 페이지에 접근하지 못하도록 리다이렉트
  useEffect(() => {
    const profileId = localStorage.getItem("profileId"); // 프로필 ID 가져오기
    if (isAuthenticated()) {
      if (profileId) {
        navigate(`/profiles/${profileId}`); // 프로필 페이지로 리디렉트
      } else {
        navigate("/postlist"); // 프로필이 없으면 게시글 목록으로 리디렉트
      }
    }
  }, [navigate]);
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // AxiosApiJWT.js에서 정의한 login 함수 호출
      const response = await login(formData);
      const { token, memberId, profileId } = response.data;

      localStorage.setItem("token", token); // JWT 토큰을 로컬 스토리지에 저장
      alert("로그인 성공!");

      // 로그인 후 리디렉션
      if (profileId) {
        navigate(`/profiles/${profileId}`); // 프로필 페이지로 리디렉션
      } else {
        navigate("/postlist"); // 프로필이 없으면 게시글 목록으로 리디렉션
      }
    } catch (error) {
      console.error("로그인 오류:", error);
      alert("로그인 실패"); // 로그인 실패 시 알림
    }
  };

  return (
    <div className="login-container">
      <div className="form-box">
        <h2>로그인</h2>
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label>이메일</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="input-group">
            <label>비밀번호</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>
          <button type="submit" className="submit-btn">
            로그인
          </button>
        </form>
        <p className="toggle-text">
          계정이 없나요?
          <span onClick={() => navigate("/signup")}> 회원가입하기</span>
        </p>
      </div>
    </div>
  );
};

export default Login;
