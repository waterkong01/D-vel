import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import logo_gray from "../../images/newimages/글씨_풀네임 (그레이).png";
import searchIcon from "../../images/newimages/search.png";

const Container = styled.div`
  position: relative;
  height: 100%;
  width: 100%;
`;

const Image = styled.img`
  position: absolute;
  top: 5%;
  left: 50%;
  transform: translateX(-50%);
  width: 400px;
  height: 400px;
`;

const ActionContainer = styled.div`
  position: absolute;
  top: calc(5% + 400px + 30px);
  left: 15%;
  width: 70%;
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

const Search = () => {
  const navigate = useNavigate();

  const handleSearchClick = () => {
    navigate("/searchresult");
  };
  return (
    <Container>
      <Image src={logo_gray} alt="Logo Image" />
      <ActionContainer>
        <Rectangle placeholder="검색어를 입력하세요" />
        <SearchIcon
          src={searchIcon}
          alt="Search Icon"
          onClick={handleSearchClick}
        />
      </ActionContainer>
    </Container>
  );
};

export default Search;
