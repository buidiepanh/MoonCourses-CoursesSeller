import { Route, Routes } from "react-router";
import Home from "../pages/user/home/home";
import Header from "../components/header/header";
import Footer from "../components/footer/footer";
import Login from "../pages/authen/login/login";

function UserRouter() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
      </Routes>
      <Footer />
    </>
  );
}

export function AppRouter() {
  return (
    <>
      <Routes>
        <Route path="/*" element={<UserRouter />} />
      </Routes>
    </>
  );
}
