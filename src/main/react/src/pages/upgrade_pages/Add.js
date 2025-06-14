import styled from "styled-components";
import boxImage from "../../images/newimages/box.png";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

const Image = styled.img`
  position: absolute;
  top: 20%;
  width: 60%;
  height: auto;
`;

const Add = () => {
  const navigate = useNavigate();

  useEffect(() => {
    navigate("/post-Editor");
  }, [navigate]);
  return (
    <Container>
      <Image src={boxImage} alt="Box" />
    </Container>
  );
};

export default Add;
