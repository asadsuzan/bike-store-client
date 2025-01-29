import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { BrowserRouter, Routes, Route } from "react-router";
import Order from "./pages/Order.tsx";
import Cart from "./pages/Cart";
createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/orders" element={<Order />} />
        <Route path="/cart" element={<Cart />} />
        {/* Add more routes as needed */}
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
