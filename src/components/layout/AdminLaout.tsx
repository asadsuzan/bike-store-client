import { Outlet } from "react-router";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { logout, useCurrentUser } from "../../redux/features/auth/authSlice";

const AdminLayout = () => {
  const user = useAppSelector(useCurrentUser);
  const dispatch = useAppDispatch();

  if (!user || !user?.exp || user.role !== "admin") {
    dispatch(logout());
    window.location.href = "/";
    return;
  }

  return <Outlet />;
};

export default AdminLayout;
