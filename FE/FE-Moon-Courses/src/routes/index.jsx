import { Route, Routes } from "react-router";
import Home from "../pages/user/home/home";

function UserRouter() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
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
