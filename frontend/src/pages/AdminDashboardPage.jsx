import React from "react";
import AdminDashboard from "../components/admin/AdminDashboard";
import AuroraBackground from "../components/public/AuroraBackground";

const AdminDashboardPage = () => {
  return (
    <div className="relative min-h-screen overflow-hidden">
      <AuroraBackground />

      <div className="relative z-10">
        <AdminDashboard />
      </div>
    </div>
  );
};

export default AdminDashboardPage;
