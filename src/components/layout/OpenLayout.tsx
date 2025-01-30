import { Outlet } from "react-router";
import Header from "../Shared/Header";

const OpenLayout = () => {
  return (
    <main>
      <div className="container mx-auto">
        <Header />
        <Outlet />
      </div>
    </main>
  );
};

export default OpenLayout;
