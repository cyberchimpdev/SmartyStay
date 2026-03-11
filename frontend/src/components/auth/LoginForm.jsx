import React, { useState } from "react";
import { motion } from "framer-motion";
import { Lock, User, Eye, EyeOff } from "lucide-react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const LoginForm = () => {
  const { login, landingPath } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const [identifier, setIdentifier] = useState(""); // 🔥 changed
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const from = location.state?.from?.pathname || landingPath || "/";

  const onSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setBusy(true);

    try {
      // 🔥 Send identifier as username field
      const u = await login({ username: identifier, password });

      navigate(u?.role === "admin" ? "/admin" : from, {
        replace: true,
      });
    } catch (err) {
      const msg =
        err?.response?.data?.detail || "Invalid username/email or password.";
      setError(typeof msg === "string" ? msg : "Login failed.");
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
            Welcome back to <span className="text-indigo-300">SmartStay</span>
          </h2>

          <p className="text-white/70 mt-4 text-sm md:text-base max-w-xl">
            Sign in to manage bookings and organise your hotel stays across
            Nepal.
          </p>
        </motion.div>

        <motion.form
          onSubmit={onSubmit}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="rounded-3xl p-8 bg-white/5 backdrop-blur-xl border border-white/10 shadow-lg max-w-md ml-auto w-full"
        >
          <h3 className="text-2xl font-extrabold">Login</h3>
          <p className="text-white/70 mt-1 text-sm">
            Use username or email to sign in
          </p>

          {error && (
            <div className="mt-5 bg-red-500/10 border border-red-400/20 rounded-2xl p-4 text-sm font-bold text-red-200">
              {error}
            </div>
          )}

          <div className="mt-6 space-y-5">
            <div className="relative">
              <User className="w-4 h-4 text-white/60 absolute left-4 top-3.5" />
              <input
                value={identifier}
                onChange={(e) => setIdentifier(e.target.value)}
                className="w-full bg-white/10 focus:bg-white/15 transition rounded-full pl-10 pr-4 py-2 outline-none placeholder-white/60"
                placeholder="Username or Email"
                required
              />
            </div>

            <div className="relative">
              <Lock className="w-4 h-4 text-white/60 absolute left-4 top-3.5" />
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
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

            <button
              disabled={busy}
              className="w-full bg-indigo-600 hover:bg-indigo-500 disabled:opacity-60 transition rounded-full py-2 font-extrabold shadow-md"
            >
              {busy ? "Logging in..." : "Login"}
            </button>

            <p className="text-sm text-white/70 text-center sm:text-left">
              New here?{" "}
              <Link
                className="text-indigo-300 font-extrabold hover:text-indigo-200 transition"
                to="/register"
              >
                Create account
              </Link>
            </p>
          </div>
        </motion.form>
      </div>
    </div>
  );
};

export default LoginForm;
