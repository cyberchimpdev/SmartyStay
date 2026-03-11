import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import DashboardNavbar from "./DashboardNavbar";
import BookingHistory from "./BookingHistory";
import { ArrowRight } from "lucide-react";

const CustomerDashboard = () => {
  return (
    <div className="min-h-screen">
      <DashboardNavbar title="Customer Overview" />

      <div className="max-w-7xl mx-auto px-4 py-12">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="rounded-3xl p-8 mb-8 bg-white/5 backdrop-blur-xl border border-white/10 shadow-sm flex flex-col md:flex-row md:items-center md:justify-between gap-6"
        >
          <div>
            <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight">
              Welcome back 👋
            </h2>
            <p className="text-white/70 mt-2 max-w-lg">
              View your booking history, track upcoming stays, or explore new
              destinations across Nepal.
            </p>
          </div>

          <Link
            to="/rooms"
            className="inline-flex items-center gap-2 bg-indigo-600 hover:bg-indigo-500 transition px-6 py-3 rounded-full font-bold shadow-md"
          >
            Explore Rooms
            <ArrowRight className="w-4 h-4" />
          </Link>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.15 }}
        >
          <BookingHistory />
        </motion.div>
      </div>
    </div>
  );
};

export default CustomerDashboard;
