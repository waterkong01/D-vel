// ProtectedRoute.js
import React from "react";
import { Navigate } from "react-router-dom";
import { isAuthenticated } from "./auth";

const ProtectedRoute = ({ element }) => {
  if (!isAuthenticated()) {
    return <Navigate to="/" />; // 로그인되지 않았으면 로그인 페이지로 리다이렉트
  }
  return element; // 인증되었으면 해당 컴포넌트 반환
};

export default ProtectedRoute;
