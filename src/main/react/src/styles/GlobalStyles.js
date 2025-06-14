import styled, { createGlobalStyle } from "styled-components";
const GlobalStyle = createGlobalStyle`
  * {
      box-sizing: border-box;
      margin: 0;
      padding: 0;
      font-family: "Nanum Gothic", serif;
      font-optical-sizing: auto;
      font-weight: 400;
      font-style: normal;
  }

  /* 다크모드 적용 */
  body {
      width: 100%;
      height: 100vh;
      background: #FFF;
      color: #000;
      transition: background 0.3s ease, color 0.3s ease;
  }

  body.dark {
      background: #3D3D3D;
      color: #FFF;
  }

  h1 {
      color: inherit; /* body의 color를 상속 */
  }
`;
export const MainContent = styled.div`
/*  margin-top: ${({ topbarHeight }) => topbarHeight};
  margin-left: ${({ sidebarWidth }) => sidebarWidth};
  width: calc(100vw - ${({ sidebarWidth }) => sidebarWidth});
  height: calc(150vh - ${({ topbarHeight }) => topbarHeight});*/
    position: fixed;
    top: 80px;
    left: 80px;
    width: 100%;
    height: 100%;
  overflow: auto;
  background-color: ${({ darkMode }) => (darkMode ? "#3D3D3D" : "#FFF")};
`;

export const BackGround = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export default GlobalStyle;
