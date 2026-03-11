import React from "react";
import { Link } from "react-router-dom";
import { Facebook, Instagram, Twitter } from "lucide-react";
import logo from "../../assets/logo.png";

const Footer = () => {
  const socialLinks = [
    { icon: Facebook, url: "https://facebook.com" },
    { icon: Instagram, url: "https://instagram.com" },
    { icon: Twitter, url: "https://twitter.com" },
  ];

  return (
    <footer className="safe-pad mt-20">
      <div className="max-w-7xl mx-auto">
        <div className="rounded-3xl px-6 py-12 bg-white/5 backdrop-blur-xl border border-white/10">
          <div className="grid md:grid-cols-3 gap-12">
            {/* Brand */}
            <div>
              <div className="inline-flex items-center bg-white/15 backdrop-blur-md rounded-xl px-4 py-2 mb-5 shadow-sm">
                <img
                  src={logo}
                  alt="SmartStay Logo"
                  className="h-8 object-contain"
                />
              </div>

              <p className="text-sm text-white/70 leading-relaxed max-w-sm">
                SmartStay helps hotels across Nepal manage bookings, rooms, and
                guests with a simple, powerful system built for modern
                hospitality.
              </p>
            </div>

            <div>
              <h3 className="font-bold text-white mb-5 tracking-wide">
                Quick Links
              </h3>

              <div className="flex flex-col gap-3 text-sm text-white/70">
                <Link
                  to="/rooms"
                  className="hover:text-white transition duration-200"
                >
                  Explore Rooms
                </Link>

                <Link
                  to="/login"
                  className="hover:text-white transition duration-200"
                >
                  Login
                </Link>

                <Link
                  to="/register"
                  className="hover:text-white transition duration-200"
                >
                  Create Account
                </Link>
              </div>
            </div>

            <div>
              <h3 className="font-bold text-white mb-5 tracking-wide">
                Connect With Us
              </h3>

              <div className="flex items-center gap-4">
                {socialLinks.map((item, index) => {
                  const Icon = item.icon;
                  return (
                    <a
                      key={index}
                      href={item.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-white/10 hover:bg-indigo-500/40 hover:scale-110 transition-all duration-300 p-3 rounded-full shadow-sm"
                    >
                      <Icon className="w-4 h-4 text-white" />
                    </a>
                  );
                })}
              </div>
            </div>
          </div>

          <div className="mt-12 border-t border-white/10 pt-6 flex flex-col md:flex-row items-center justify-center gap-4 text-xs text-white/60 font-medium text-center">
            <p>
              © {new Date().getFullYear()} SmartStay Hotel Management System |
              All Rights Reserved
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
