import { Navigate, Outlet, useLocation } from "react-router";
import Header from "../Shared/Header";
import { useAppSelector } from "../../redux/hooks";
import { useCurrentUser } from "../../redux/features/auth/authSlice";

const AuthLayout = () => {
  const user = useAppSelector(useCurrentUser);
  const location = useLocation();
  if (!user || !user?.exp) {
    return <Navigate to="/login" state={{ from: location }} replace={true} />;
  }

  return (
    <main>
      <div className="container mx-auto">
        <Header />
        <Outlet />
      </div>
    </main>
  );
};

export default AuthLayout;
