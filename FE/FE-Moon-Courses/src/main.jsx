import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { BrowserRouter } from "react-router";
import { Toaster } from "react-hot-toast";
import { AppRouter } from "./routes";

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <AppRouter />
    <Toaster />
  </BrowserRouter>
);
