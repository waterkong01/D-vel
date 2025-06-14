import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signup } from "./AxiosApiJWT"; // AxiosApiJWT.js에서 signup 함수 import
import "./SignUp.css"; // 회원가입 전용 CSS 파일

const SignUp = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // AxiosApiJWT.js에서 정의한 signup 함수 호출
      const response = await signup(formData);
      alert("회원가입 성공!");
      navigate("/"); // 회원가입 후 로그인 페이지로 이동
    } catch (error) {
      console.error("회원가입 오류:", error);
      alert("회원가입 실패");
    }
  };

  return (
    <div className="signup-container">
      <div className="form-box">
        <h2>회원가입</h2>
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label>이름</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>
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
            회원가입
          </button>
        </form>
        <p className="toggle-text">
          이미 계정이 있나요?
          <span onClick={() => navigate("/")}> 로그인하기</span>
        </p>
      </div>
    </div>
  );
};

export default SignUp;
