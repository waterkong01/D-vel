import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const Container = styled.div`
  // 스타일 설정
`;

const User = () => {
  const navigate = useNavigate();

  useEffect(() => {
    navigate("/profile");
  }, [navigate]);

  return <Container>{/* 컴포넌트 콘텐츠 */}</Container>;
};

export default User;
