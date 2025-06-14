import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const Container = styled.div`
  // 스타일 설정
`;

const Home = () => {
  const navigate = useNavigate();

  useEffect(() => {
    navigate("/feed");
  }, [navigate]);

  return <Container>{/* 컴포넌트 콘텐츠 */}</Container>;
};

export default Home;
