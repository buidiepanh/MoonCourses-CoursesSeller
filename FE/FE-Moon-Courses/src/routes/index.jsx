import { Route, Routes } from "react-router";

function UserRouter() {
  return (
    <>
      <Routes>
        <Route path="/" />
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
