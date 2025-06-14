import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./pages/Navbar"; // 네비게이터 바 컴포넌트 import
import Feed from "./components/Feed/Feed";
import Forum from "./components/Forums/Forum";
import News from "./pages/News";
import JobPost from "./pages/JobPost";
import JobDetail from "./pages/JobDetail"; // 구직 공고 상세 페이지
import Edu from "./pages/Edu";
import EduList from "./pages/EduList";
import Profile from "./pages/Profile";
import MyPage from "./pages/MyPage";
import Login from "./pages/Login";
import ScrollToTop from "./pages/ScrollToTop";
import { ProfileProvider } from "./pages/ProfileContext";

import { AuthProvider } from "./api/context/AuthContext";
import SignUp from "./pages/SignUp";
import Lecture from "./pages/kedu/course/lecture2";
import { RegionContextProvider } from "./api/provider/RegionSearchContextProvider2";
import Course from "./pages/kedu/course/course2";
import KakaoAuth from "./component/KakaoAuth";
import NaverCallback from "./component/NaverCallBack";
import { ToastContainer } from "react-toastify"; // ToastContainer 컴포넌트 import
import "react-toastify/dist/ReactToastify.css"; // 스타일 impor
import { MemberInfoContextProvider } from "./api/provider/MemberInfoContextProvider2";

import GlobalStyle from "./styles/GlobalStyles";
import { useEffect, useState } from "react";
import TopBar from "./component/TopBar";
import SideBar from "./component/SideBar";
import Main from "./pages/upgrade_pages/Main";
import Home from "./pages/upgrade_pages/Home";
import Search from "./pages/upgrade_pages/Search";
import NewsandTrend from "./pages/upgrade_pages/NewsandTrend";
import Add from "./pages/upgrade_pages/Add";
import Alarm from "./pages/upgrade_pages/Alarm";
import Msg from "./pages/upgrade_pages/Msg";
import User from "./pages/upgrade_pages/User";
import MsgMain from "./pages/Msg/MsgMain";
import SearchResult from "./pages/upgrade_pages/Search_result";
import { MainContent } from "./styles/GlobalStyles";
import { ThemeProvider } from "styled-components";
import { ChatStoreProvider } from "./api/context/ChatStore";
import Store from "./api/context/Store";
import { Provider } from "react-redux";
import MypageDetail from "./pages/mypage/MypageDetail";
import MypageList from "./pages/mypage/MypageList";

import CreatePost from "./components/Forums/CreatePost";
import PostDetail from "./components/Forums/PostDetail";
import ForumPosts from "./components/Forums/ForumPosts";
import CourseList from "./pages/kedu/course/courseList2";
import DetailCourse from "./pages/kedu/course/detailCourse2";

import PostList from "../src/JK_pages/PostList"; // 게시글 목록 (페이지네이션)
import PostDetail2 from "../src/JK_pages/PostDetail"; // 게시글 상세
import PostEditor from "../src/JK_pages/PostEditor"; // 게시글 작성/수정
import ProfileDetail from "../src/JK_pages/ProfileDetail";
import ProfileList from "../src/JK_pages/ProfileList";
import ProtectedRoute from "../src/JK_pages/ProtectedRoute";
import Logout from "../src/JK_pages/Logout";

function App() {
/*  const [barWidth, setBarWidth] = useState("5.2vw");
  const [barHeight, setBarHeight] = useState("7.4vh");

  const [darkMode, setDarkMode] = useState(() => {
    return document.documentElement.classList.contains("dark");
  });

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);*/

  const [darkMode, setDarkMode] = useState(() => {
    return JSON.parse(localStorage.getItem("darkMode")) || false;
  });

  useEffect(() => {
    localStorage.setItem("darkMode", JSON.stringify(darkMode));
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  const theme = {
    darkMode: darkMode, // 다크모드 상태를 전역 테마로 설정
  };

  return (
    <>
      <ThemeProvider theme={theme}>
        <GlobalStyle setDarkMode={setDarkMode} darkMode={darkMode} />
        <Provider store={Store}>
          <ChatStoreProvider>
            <AuthProvider>
              <RegionContextProvider>
                <MemberInfoContextProvider>
                  <ProfileProvider>
                    <Router>
                      {/*<Navbar />*/}
                      <TopBar
                        darkMode={darkMode}
                        setDarkMode={setDarkMode}
                      />
                      <SideBar
                        darkMode={darkMode}
                        setDarkMode={setDarkMode}
                      />
                      <MainContent
                        darkMode={darkMode}
                      >
                        {/* <ScrollToTop /> */}
                        {/* 네비게이터 바 렌더링 */}
                        <Routes>
                          <Route path="/" element={<Main />} />
                          <Route path="/home" element={<Home />} />
                          <Route path="/search" element={<Search />} />
                          <Route path="/news" element={<News />} />
                          <Route path="/add" element={<Add />} />
                          <Route path="/alarm" element={<Alarm />} />
                          <Route
                            path="/msg"
                            element={
                              <MsgMain
                                darkMode={darkMode}
                                setDarkMode={setDarkMode}
                              />
                            }
                          />
                          <Route path="/user" element={<User />} />
                          <Route
                            path="/searchresult"
                            element={<SearchResult />}
                          />
                          {/* 메인 화면 */}
                          <Route path="/" element={<Login />} />
                          <Route path="/signup" element={<SignUp />} />
                          <Route path="/login" element={<Login />} />
                          <Route
                            path="/auth/kakao/callback"
                            element={<KakaoAuth />}
                          />
                          <Route
                            path="/login/oauth2/code/naver"
                            element={<NaverCallback />}
                          />
                          <Route path="/profile" element={<Profile />} />
                          <Route path="/profile/mypage" element={<MyPage />} />
                          <Route
                            path="/mypage/:mypageId"
                            element={<MypageDetail />}
                          />
                          <Route path="/mypagelist" element={<MypageList />} />

                          <Route path="/feed" element={<Feed />} />
                          <Route path="/jobpost" element={<JobPost />} />
                          <Route path="/job/:id" element={<JobDetail />} />
                          <Route path="/edu" element={<Edu />} />
                          <Route path="/edulist" element={<EduList />} />
                          <Route path="/forum" element={<Forum />} />
                          <Route
                            path="/forum/post/:postId"
                            element={<PostDetail />}
                          />
                          {/* 포럼 게시글 생성 페이지 */}
                          <Route
                            path="/forum/create-post"
                            element={<CreatePost />}
                          />
                          {/* 각 카테고리 내의 게시글 */}
                          <Route
                            path="/forum/category/:categoryId"
                            element={<ForumPosts />}
                          />
                          {/* 고태경 뉴스  */}
                          <Route path="/news" element={<News />} />
                          {/* 고태경 뉴스  */}
                          {/* 김요한 국비 교육*/}
                          <Route path="/edu" element={<Edu />} />
                          <Route
                            path="/lecture/:academyId"
                            element={<Lecture />}
                          />
                          <Route path="/academy" element={<Course />} />
                          <Route path="/course" element={<CourseList />} />
                          <Route
                            path="/detail/:region/:academyName/:courseId"
                            element={<DetailCourse />}
                          />
                          {/* 김요한 국비 교육*/}
                        </Routes>
                        {/* 최상위에 ToastContainer 배치 */}
                        <ToastContainer
                          position="top-right" // 위치 설정 (top-right)
                          autoClose={2000} // 자동 닫힘 시간 설정 (5000ms = 5초)
                          hideProgressBar={false} // 진행바 숨기기 여부
                          newestOnTop={false} // 새 메시지가 위에 표시되도록 설정
                          closeOnClick={true} // 클릭 시 닫히도록 설정
                          rtl={false} // RTL (오른쪽에서 왼쪽으로) 설정
                          pauseOnHover={true} // Hover 시 일시 정지
                        />

                        <div className="app-container">
                          {/* 네비게이션 바 (로그아웃 버튼 포함) */}
                          {/* <nav className="navbar">
                        <Logout /> 로그아웃 버튼 추가
                      </nav> */}

                          <Routes>
                            {/* 인증된 사용자만 접근 가능 */}
                            <Route
                              path="/postList"
                              element={
                                <ProtectedRoute element={<PostList />} />
                              }
                            />
                            <Route
                              path="/posts/:postId"
                              element={
                                <ProtectedRoute element={<PostDetail2 />} />
                              }
                            />
                            <Route
                              path="/post-editor/:postId"
                              element={
                                <ProtectedRoute element={<PostEditor />} />
                              }
                            />
                            <Route
                              path="/post-editor"
                              element={
                                <ProtectedRoute element={<PostEditor />} />
                              }
                            />
                            <Route
                              path="/profiles/:profileId"
                              element={<ProfileDetail />}
                            />
                            <Route
                              path="/profilelist"
                              element={<ProfileList />}
                            />

                            {/* 로그인 및 회원가입 페이지 */}
                            <Route path="/" element={<Login />} />
                            <Route path="/signup" element={<SignUp />} />
                          </Routes>
                        </div>
                      </MainContent>
                    </Router>
                  </ProfileProvider>
                </MemberInfoContextProvider>
              </RegionContextProvider>
            </AuthProvider>
          </ChatStoreProvider>
        </Provider>
      </ThemeProvider>
    </>
  );
}

export default App;
