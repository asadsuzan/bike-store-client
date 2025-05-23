import { Outlet } from "react-router";
import Header from "../Shared/Header";

const OpenLayout = () => {
  return (
    <main>
      <div className="container mx-auto">
        <Header />

      <div className="pt-[85px]">
      <Outlet />
      </div>
      </div>
    </main>
  );
};

export default OpenLayout;
