import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import "./App.css";
// import Clients from "./pages/Clients";
import { QueryClientProvider } from "react-query";
import { Layout } from "antd";
import { Content } from "antd/es/layout/layout";
import Users from "./pages/Users";
import Login from "./pages/Login";
import Navbar from "./components/Navbar";
import { ReactQueryDevtools } from "react-query/devtools";
// import Login from "./pages/login";
import { queryClient } from "./queryClient";
import Analytics from "./pages/Analytics";
import { useApp } from "./store/useApp";
import ProtectedRoutes from "./helper/ProtectedRoutes";
function App() {
  const { isLogin } = useApp();

  return (
    <QueryClientProvider client={queryClient}>
      <div style={{ marginTop: 40 }}>
        <BrowserRouter>
          {isLogin ? <Navbar /> : null}
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route element={<ProtectedRoutes />}>
              <Route index element={<Users />} />
              <Route path="/analytics" element={<Analytics />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </div>
      <ReactQueryDevtools initialIsOpen />
    </QueryClientProvider>
  );
}

export default App;
