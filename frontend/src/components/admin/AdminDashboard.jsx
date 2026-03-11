import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import DashboardNavbar from "../customer/DashboardNavbar";
import ManageRooms from "./ManageRooms";
import ManageBookings from "./ManageBookings";

const AdminDashboard = () => {
  const [tab, setTab] = useState("rooms");

  return (
    <div className="min-h-screen">
      <DashboardNavbar title="Admin Control Panel" />

      <div className="max-w-7xl mx-auto px-4 py-10">
        <div className="mb-8">
          <h2 className="text-3xl font-extrabold tracking-tight">
            Administration
          </h2>
          <p className="text-white/70 mt-2 text-sm">
            Manage rooms, bookings and overall system operations.
          </p>
        </div>

        <div className="relative inline-flex rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 p-2">
          <motion.div
            layout
            className="absolute top-2 bottom-2 rounded-xl bg-indigo-600"
            initial={false}
            animate={{
              left: tab === "rooms" ? "8px" : "calc(50% + 4px)",
              width: "calc(50% - 12px)",
            }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
          />

          <button
            onClick={() => setTab("rooms")}
            className={`relative z-10 px-6 py-2 font-extrabold rounded-xl transition text-sm ${
              tab === "rooms" ? "text-white" : "text-white/70"
            }`}
          >
            Manage Rooms
          </button>

          <button
            onClick={() => setTab("bookings")}
            className={`relative z-10 px-6 py-2 font-extrabold rounded-xl transition text-sm ${
              tab === "bookings" ? "text-white" : "text-white/70"
            }`}
          >
            Manage Bookings
          </button>
        </div>

        <div className="mt-8">
          <AnimatePresence mode="wait">
            <motion.div
              key={tab}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.25 }}
            >
              {tab === "rooms" ? <ManageRooms /> : <ManageBookings />}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
