import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import DashboardPage from "./pages/DashboardPage";
import TeachersPage from "./pages/TeachersPage";
import StudentsPage from "./pages/StudentsPage";
import { useState } from "react";
import NotFoundPage from "./pages/NotFoundPage";
import { IS_LOGIN } from "./constants";
import AdminLayout from "./components/layout/AdminLayout";

const App = () => {
  const [isLogin, setIsLogin] = useState(
    Boolean(localStorage.getItem(IS_LOGIN))
  );
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<LoginPage setIsLogin={setIsLogin} />} />
        {isLogin ? (
          <Route path="" element={<AdminLayout setIsLogin={setIsLogin}/>}>
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/teachers" element={<TeachersPage />} />
            <Route path="/students" element={<StudentsPage />} />
          </Route>
        ) : null}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
