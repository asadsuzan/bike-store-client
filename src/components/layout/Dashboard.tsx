// import React from 'react'
import { Outlet } from "react-router";

import DashboardNavigation from "../Shared/DashboardNavigation";

const Dashboard = () => {
  return (
    <div>
      <DashboardNavigation />
      <Outlet />
    </div>
  );
};

export default Dashboard;
