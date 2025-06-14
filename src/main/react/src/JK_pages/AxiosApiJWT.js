import axios from "axios";

// API 기본 URL 설정
const API_BASE_URL = "http://localhost:8111/api/auth";

// Axios 인스턴스 생성
const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// JWT 토큰을 로컬 스토리지에 저장하는 함수
const saveToken = (token) => {
  localStorage.setItem("token", token);
};

// 로컬 스토리지에서 JWT 토큰을 가져오는 함수
const getToken = () => {
  return localStorage.getItem("token");
};

// Axios 요청에 JWT 토큰을 자동으로 포함시키는 인터셉터 설정
axiosInstance.interceptors.request.use(
  (config) => {
    const token = getToken();
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// 로그아웃 함수 추가
export const logout = async () => {
  try {
    // 서버에 로그아웃 요청 보내기
    await axiosInstance.post("/logout", {}, { withCredentials: true }); // 로그아웃 API 호출
    localStorage.removeItem("token"); // 로컬 스토리지에서 JWT 토큰 삭제
    localStorage.removeItem("profileId"); // 필요에 따라 프로필 ID 삭제
  } catch (error) {
    console.error("로그아웃 실패", error);
    throw error; // 오류 발생 시 error를 던짐
  }
};

// 로그인 요청 함수
export const login = async (formData) => {
  try {
    const response = await axiosInstance.post("/login", formData); // 로그인 요청
    saveToken(response.data); // 로그인 성공 시 받은 토큰을 로컬 스토리지에 저장
    return response; // 로그인 성공 시 반환된 response를 그대로 반환
  } catch (error) {
    console.error("로그인 실패", error);
    throw error; // 오류 발생 시 error를 던짐
  }
};

// 회원가입 요청 함수
export const signup = async (formData) => {
  try {
    const response = await axiosInstance.post("/signup", formData); // 회원가입 요청
    return response; // 회원가입 성공 시 반환된 response를 그대로 반환
  } catch (error) {
    console.error("회원가입 실패", error);
    throw error; // 오류 발생 시 error를 던짐
  }
};

// 예시: 토큰을 포함한 다른 API 호출 (예: 회원 정보 조회)
export const getMemberInfo = async () => {
  try {
    const response = await axiosInstance.get("/some-member-endpoint"); // 실제 엔드포인트로 수정
    return response.data;
  } catch (error) {
    console.error("회원 정보 조회 실패", error);
    throw error;
  }
};

export default axiosInstance;
