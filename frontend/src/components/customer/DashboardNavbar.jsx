import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { LayoutDashboard, LogOut, Home } from "lucide-react";
import { useAuth } from "../../context/AuthContext";

const DashboardNavbar = ({ title }) => {
  const { logout, user, isAdmin } = useAuth() || {};
  const navigate = useNavigate();

  const onLogout = () => {
    if (typeof logout === "function") {
      logout();
    }
    navigate("/");
  };

  return (
    <div className="safe-pad pt-6">
      <div className="max-w-7xl mx-auto">
        <div className="rounded-3xl px-6 py-6 bg-white/5 backdrop-blur-xl border border-white/10 shadow-sm flex flex-col md:flex-row md:items-center md:justify-between gap-5">
          {/* Left Section */}
          <div>
            <p className="text-xs text-white/60 font-bold uppercase tracking-widest">
              {isAdmin ? "Admin" : "Customer"} Dashboard
            </p>
            <h1 className="text-2xl font-extrabold tracking-tight mt-1">
              {title}
            </h1>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <Link
              to="/"
              className="glass-soft hover:bg-white/15 px-4 py-2 rounded-full font-semibold inline-flex items-center gap-2 transition"
            >
              <Home className="w-4 h-4" />
              Home
            </Link>

            <Link
              to={isAdmin ? "/admin" : "/customer"}
              className="glass-soft hover:bg-white/15 px-4 py-2 rounded-full font-semibold inline-flex items-center gap-2 transition"
            >
              <LayoutDashboard className="w-4 h-4" />
              Dashboard
            </Link>

            <button
              onClick={onLogout}
              className="bg-indigo-600 hover:bg-indigo-500 transition px-4 py-2 rounded-full font-bold inline-flex items-center gap-2 shadow-md"
            >
              <LogOut className="w-4 h-4" />
              Logout {user?.username && `(${user.username})`}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardNavbar;
