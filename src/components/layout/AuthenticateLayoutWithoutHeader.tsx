import { Navigate, Outlet } from "react-router";

import { useAppSelector } from "../../redux/hooks";
import { useCurrentUser } from "../../redux/features/auth/authSlice";

const AuthenticateLayoutWithoutHeader = () => {
  const user = useAppSelector(useCurrentUser);

  if (!user || !user?.exp) {
    return <Navigate to="/login" replace={true} />;
  }

  return (
    <main>
      <div className="container mx-auto">
        <Outlet />
      </div>
    </main>
  );
};

export default AuthenticateLayoutWithoutHeader;
