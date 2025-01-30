import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { BrowserRouter, Routes, Route } from "react-router";
import Order from "./pages/Order.tsx";
import Cart from "./pages/Cart";
import { Provider } from "react-redux";
import { persistor, store } from "./redux/store.ts";
import Login from "./pages/Login.tsx";
import { PersistGate } from "redux-persist/integration/react";
import { Toaster } from "sonner";
createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<App />} />
            <Route path="/orders" element={<Order />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/login" element={<Login />} />
            {/* Add more routes as needed */}
          </Routes>
        </BrowserRouter>
        <Toaster />
      </PersistGate>
    </Provider>
  </StrictMode>
);
