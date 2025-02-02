// import React from 'react'
import { Outlet } from "react-router";

const Dashboard = () => {
  console.log("dashboard");
  return (
    <div>
      <h1>Dashboard</h1>
      <p>Welcome to your dashboard</p>
      <button>Logout</button>
      <Outlet />
    </div>
  );
};

export default Dashboard;
