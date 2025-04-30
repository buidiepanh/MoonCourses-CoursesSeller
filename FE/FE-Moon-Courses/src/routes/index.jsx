import { Route, Routes } from "react-router";
import Home from "../pages/user/home/home";
import Header from "../components/header/header";
import Footer from "../components/footer/footer";
import Login from "../pages/authen/login/login";
import Details from "../pages/user/details/details";

function UserRouter() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/:courseId" element={<Details />} />
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
