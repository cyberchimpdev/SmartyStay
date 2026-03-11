import React, { useState } from "react";
import { motion } from "framer-motion";
import { Mail, User, Lock, Eye, EyeOff } from "lucide-react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const RegisterForm = () => {
  const { register } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState("");
  const [isError, setIsError] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const onSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setIsError(false);

    if (form.password !== form.confirmPassword) {
      setMessage("Passwords do not match.");
      setIsError(true);
      return;
    }

    setBusy(true);

    try {
      await register({
        username: form.username,
        email: form.email,
        password: form.password,
      });

      setMessage("Account created successfully! Redirecting to login...");
      setTimeout(() => navigate("/login"), 1000);
    } catch (err) {
      const apiMsg =
        err?.response?.data?.detail ||
        "Registration failed. Username or email may already exist.";
      setMessage(apiMsg);
      setIsError(true);
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-16">
      <div className="grid lg:grid-cols-2 gap-12 items-center">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight">
            Join <span className="text-indigo-300">SmartStay</span>
          </h2>

          <p className="text-white/70 mt-4 text-sm md:text-base max-w-xl">
            One account to explore and book hotels across Nepal, with pricing in
            Nepali Rupees and bookings saved in your dashboard.
          </p>
        </motion.div>

        <motion.form
          onSubmit={onSubmit}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="rounded-3xl p-8 bg-white/5 backdrop-blur-xl border border-white/10 shadow-lg max-w-md ml-auto w-full"
        >
          <h3 className="text-2xl font-extrabold">Create Account</h3>
          <p className="text-white/70 mt-1 text-sm">
            Register your SmartStay profile
          </p>

          {message && (
            <div
              className={`mt-5 rounded-2xl p-4 text-sm font-bold border ${
                isError
                  ? "bg-red-500/10 border-red-400/20 text-red-200"
                  : "bg-emerald-500/10 border-emerald-400/20 text-emerald-200"
              }`}
            >
              {message}
            </div>
          )}

          <div className="mt-6 space-y-5">
            <div className="relative">
              <User className="w-4 h-4 text-white/60 absolute left-4 top-3.5" />
              <input
                value={form.username}
                onChange={(e) => setForm({ ...form, username: e.target.value })}
                className="w-full bg-white/10 focus:bg-white/15 transition rounded-full pl-10 pr-4 py-2 outline-none placeholder-white/60"
                placeholder="Username"
                required
              />
            </div>

            <div className="relative">
              <Mail className="w-4 h-4 text-white/60 absolute left-4 top-3.5" />
              <input
                type="email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className="w-full bg-white/10 focus:bg-white/15 transition rounded-full pl-10 pr-4 py-2 outline-none placeholder-white/60"
                placeholder="Email"
                required
              />
            </div>

            <div className="relative">
              <Lock className="w-4 h-4 text-white/60 absolute left-4 top-3.5" />
              <input
                type={showPassword ? "text" : "password"}
                value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
                className="w-full bg-white/10 focus:bg-white/15 transition rounded-full pl-10 pr-11 py-2 outline-none placeholder-white/60"
                placeholder="Password"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword((v) => !v)}
                className="absolute right-4 top-2.5 text-white/60 hover:text-white transition"
              >
                {showPassword ? (
                  <EyeOff className="w-4 h-4" />
                ) : (
                  <Eye className="w-4 h-4" />
                )}
              </button>
            </div>

            <div className="relative">
              <Lock className="w-4 h-4 text-white/60 absolute left-4 top-3.5" />
              <input
                type={showConfirmPassword ? "text" : "password"}
                value={form.confirmPassword}
                onChange={(e) =>
                  setForm({ ...form, confirmPassword: e.target.value })
                }
                className="w-full bg-white/10 focus:bg-white/15 transition rounded-full pl-10 pr-11 py-2 outline-none placeholder-white/60"
                placeholder="Confirm Password"
                required
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword((v) => !v)}
                className="absolute right-4 top-2.5 text-white/60 hover:text-white transition"
              >
                {showConfirmPassword ? (
                  <EyeOff className="w-4 h-4" />
                ) : (
                  <Eye className="w-4 h-4" />
                )}
              </button>
            </div>

            <button
              disabled={busy}
              className="w-full bg-indigo-600 hover:bg-indigo-500 disabled:opacity-60 transition rounded-full py-2 font-extrabold shadow-md"
            >
              {busy ? "Creating..." : "Create account"}
            </button>

            <p className="text-sm text-white/70 text-center sm:text-left">
              Already have an account?{" "}
              <Link
                className="text-indigo-300 font-extrabold hover:text-indigo-200 transition"
                to="/login"
              >
                Login
              </Link>
            </p>
          </div>
        </motion.form>
      </div>
    </div>
  );
};

export default RegisterForm;
