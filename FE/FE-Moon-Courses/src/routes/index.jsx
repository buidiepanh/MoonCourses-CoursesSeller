import { Route, Routes } from "react-router";
import Home from "../pages/user/home/home";
import Header from "../components/header/header";
import Footer from "../components/footer/footer";
import Login from "../pages/authen/login/login";
import Details from "../pages/user/details/details";
import Register from "../pages/authen/register/register";
import PaymentCallback from "../pages/user/payment/paymentCallback";
import MyCourse from "../pages/user/my-course/myCourse";

function UserRouter() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/:courseId" element={<Details />} />
        <Route path="/my-course" element={<MyCourse />} />
        <Route path="/payment/vnpay-return" element={<PaymentCallback />} />
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
