import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import logo_gray from "../../images/newimages/글씨_풀네임 (그레이).png";
import searchIcon from "../../images/newimages/search.png";
import {Container} from "../../design/CommonDesign";

/*const Container = styled.div`
  position: relative;
  height: 100%;
  width: 100%;
`;*/

const Image = styled.img`
  position: absolute;
  transform: translateX(-150%);
  top: -60%;
  width: 100px;
  height: 100px;
`;

const ActionContainer = styled.div`
  position: absolute;
  top: 5%;
  left: 23%;
  width: 60%;
  height: 50px;
  display: flex;
  align-items: center;
`;

const Rectangle = styled.input`
  flex-grow: 1;
  height: 50px;
  background-color: white;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  border-radius: 20px;
  border: none;
  padding: 0 20px;
  font-size: 16px;
  outline: none;
`;

const SearchIcon = styled.img`
  position: absolute;
  right: 1.5%;
  top: 50%;
  transform: translateY(-50%);
  width: 35px;
  height: 35px;
  z-index: 2;
  cursor: pointer;
`;

const NoMatchMessage = styled.div`
  position: absolute;
  top: 12%; /* ActionContainer 아래로 약간 내려오도록 설정 */
  left: 23%;
  width: 60%;
  text-align: center;
  font-size: 18px;
  color: gray;
`;

const SearchResult = () => {
  const navigate = useNavigate();

  const handleSearchClick = () => {
    window.location.reload(); // 페이지 새로고침
  };
  return (
    <Container>
      <ActionContainer>
        <Image src={logo_gray} alt="Logo Image" />
        <Rectangle placeholder="검색어를 입력하세요" />
        <SearchIcon
          src={searchIcon}
          alt="Search Icon"
          onClick={handleSearchClick}
        />
      </ActionContainer>
      <NoMatchMessage>일치하는 내용이 없습니다.</NoMatchMessage>
    </Container>
  );
};

export default SearchResult;
