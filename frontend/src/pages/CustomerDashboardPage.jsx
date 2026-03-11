import React from "react";
import CustomerDashboard from "../components/customer/CustomerDashboard";
import AuroraBackground from "../components/public/AuroraBackground";

const CustomerDashboardPage = () => {
  return (
    <div className="relative min-h-screen overflow-hidden">
      <AuroraBackground />

      <div className="relative z-10">
        <CustomerDashboard />
      </div>
    </div>
  );
};

export default CustomerDashboardPage;
