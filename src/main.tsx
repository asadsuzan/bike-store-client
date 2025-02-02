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
import OpenLayout from "./components/layout/OpenLayout.tsx";
import AuthLayout from "./components/layout/AuthenticateLayout.tsx";
import Shop from "./pages/Shop.tsx";
import About from "./pages/About.tsx";
import ProductDetails from "./pages/ProductDetails.tsx";
import VerifyOrder from "./pages/VerifyOrder.tsx";
import AuthenticateLayoutWithoutHeader from "./components/layout/AuthenticateLayoutWithoutHeader.tsx";
import Dashboard from "./components/layout/Dashboard.tsx";
import AddProducts from "./pages/AddProducts.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <BrowserRouter>
          <Routes>
            <Route element={<OpenLayout />}>
              <Route index element={<App />} />
              <Route path="cart" element={<Cart />} />
              <Route path="login" element={<Login />} />
              <Route path="shop" element={<Shop />} />
              <Route path="product/:id" element={<ProductDetails />} />
              <Route path="about" element={<About />} />
            </Route>
            <Route element={<AuthLayout />}>
              <Route element={<Dashboard />}>
                <Route path="dashboard/orders" element={<Order />} />
                <Route path="dashboard/add-product" element={<AddProducts />} />
              </Route>
            </Route>
            <Route element={<AuthenticateLayoutWithoutHeader />}>
              <Route path="order/verify-order" element={<VerifyOrder />} />
            </Route>
          </Routes>
        </BrowserRouter>
        <Toaster />
      </PersistGate>
    </Provider>
  </StrictMode>
);
