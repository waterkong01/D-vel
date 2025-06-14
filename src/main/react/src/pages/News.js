import { useEffect, useState } from "react";
import TrendTab from "./kedu/etc/TrendTab";
import NewsTab from "./kedu/etc/NewsTab";
import GlobalStyle from "../styles/GlobalStyles";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  padding: 20px;
  margin-top: 70px;
`;

const Title = styled.h1`
  align-self: flex-start;
  color: ${({ theme }) => (theme.darkMode ? "#FFF" : "#000")};
`;

function News() {
  const [activeTab, setActiveTab] = useState("news"); // 현재 선택된 탭
  const [darkMode, setDarkMode] = useState(() => {
    return document.documentElement.classList.contains("dark");
  });

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  return (
    <>
      <GlobalStyle setDarkMode={setDarkMode} darkMode={darkMode} />
      <Container darkMode={darkMode}>
        <Title darkMode={darkMode}>뉴스 / 트렌드</Title>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
            padding: "20px",
            marginTop: "70px",
          }}
        >
          <h1>IT 뉴스 페이지에 오신 것을 환영합니다!</h1>

          {/* 탭 메뉴 */}
          <ul
            style={{
              listStyle: "none",
              display: "flex",
              gap: "20px",
              padding: 0,
              marginBottom: "20px",
            }}
          >
            <li
              style={{
                cursor: "pointer",
                padding: "10px",
                borderBottom: activeTab === "news" ? "3px solid blue" : "none",
              }}
              onClick={() => setActiveTab("news")}
            >
              뉴스
            </li>
            <li
              style={{
                cursor: "pointer",
                padding: "10px",
                borderBottom: activeTab === "trend" ? "3px solid blue" : "none",
              }}
              onClick={() => setActiveTab("trend")}
            >
              트렌드
            </li>
          </ul>

          {/* 선택된 탭에 따라 컴포넌트 표시 */}
          {activeTab === "news" ? <NewsTab /> : <TrendTab />}
        </div>
      </Container>
    </>
  );
}

export default News;
