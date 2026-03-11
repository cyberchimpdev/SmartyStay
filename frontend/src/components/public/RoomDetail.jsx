import React, { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Bed,
  MapPin,
  Star,
  ArrowLeft,
  ShieldCheck,
  Wifi,
  Coffee,
} from "lucide-react";
import api from "../../api/axiosConfig";
import { useAuth } from "../../context/AuthContext";
import BookingForm from "../customer/BookingForm";
import { formatNPR, formatUSD } from "../../utils/currency";

const BACKEND_URL = "https://intrinsically-nonperjured-kyoko.ngrok-free.dev";

const fallbackImage =
  "https://images.unsplash.com/photo-1560067174-8943bd8f7421?auto=format&fit=crop&w=1600&q=80";

const RoomDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { isAuthenticated, user } = useAuth();

  const [room, setRoom] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api
      .get(`rooms/${id}/`)
      .then((res) => setRoom(res.data))
      .catch(() => setRoom(null))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) {
    return (
      <div className="py-14 text-center text-white/70">Loading room...</div>
    );
  }

  if (!room) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-14">
        <div className="glass rounded-3xl p-10 text-center">
          <div className="text-2xl font-extrabold">Room not found</div>
          <p className="text-white/70 mt-2">Please go back to rooms list.</p>

          <button
            onClick={() => navigate("/rooms")}
            className="mt-6 bg-indigo-600 hover:bg-indigo-500 px-6 py-2 rounded-full font-extrabold"
          >
            Back to Rooms
          </button>
        </div>
      </div>
    );
  }

  const imageUrl =
    room.final_image || room.image
      ? `${BACKEND_URL}${room.final_image || room.image}`
      : fallbackImage;

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <div className="mb-6">
        <Link
          to="/rooms"
          className="inline-flex items-center gap-2 text-indigo-200 font-extrabold"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Rooms
        </Link>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass rounded-3xl overflow-hidden"
        >
          <div className="h-90 overflow-hidden">
            <img
              src={imageUrl}
              alt={room.name}
              loading="lazy"
              onError={(e) => (e.target.src = fallbackImage)}
              className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
            />
          </div>

          <div className="p-7">
            <div className="flex items-start justify-between gap-3">
              <div>
                <h1 className="text-3xl font-extrabold tracking-tight">
                  {room.name}
                </h1>

                <p className="text-white/70 mt-2">{room.description}</p>
              </div>

              <div className="glass-soft rounded-2xl px-4 py-2 text-center">
                <div className="text-xs text-white/60 font-extrabold uppercase">
                  From
                </div>

                <div className="text-lg font-extrabold">
                  {formatNPR(room.price)}
                </div>

                <div className="text-xs text-white/60 font-bold">
                  {formatUSD(room.price)} / night
                </div>
              </div>
            </div>

            <div className="mt-6 grid sm:grid-cols-3 gap-3">
              <div className="glass-soft rounded-2xl p-4 flex items-center gap-3">
                <Bed className="w-5 h-5 text-indigo-200" />
                <div>
                  <div className="font-extrabold text-sm">
                    {String(room.room_type || "").toUpperCase()}
                  </div>
                  <div className="text-xs text-white/60 font-bold">
                    Room type
                  </div>
                </div>
              </div>

              <div className="glass-soft rounded-2xl p-4 flex items-center gap-3">
                <Star className="w-5 h-5 text-amber-300 fill-amber-300" />
                <div>
                  <div className="font-extrabold text-sm">4.8</div>
                  <div className="text-xs text-white/60 font-bold">Rating</div>
                </div>
              </div>

              <div className="glass-soft rounded-2xl p-4 flex items-center gap-3">
                <MapPin className="w-5 h-5 text-emerald-200" />
                <div>
                  <div className="font-extrabold text-sm">Nepal</div>
                  <div className="text-xs text-white/60 font-bold">
                    Destination
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-6 grid sm:grid-cols-3 gap-3">
              <div className="glass-soft rounded-2xl p-4 flex items-center gap-3">
                <Wifi className="w-5 h-5 text-indigo-200" />
                <div className="text-sm font-extrabold">Free Wi-Fi</div>
              </div>

              <div className="glass-soft rounded-2xl p-4 flex items-center gap-3">
                <Coffee className="w-5 h-5 text-indigo-200" />
                <div className="text-sm font-extrabold">Breakfast</div>
              </div>

              <div className="glass-soft rounded-2xl p-4 flex items-center gap-3">
                <ShieldCheck className="w-5 h-5 text-indigo-200" />
                <div className="text-sm font-extrabold">Secure Stay</div>
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass rounded-3xl p-7"
        >
          <h2 className="text-2xl font-extrabold">Reservation</h2>

          <p className="text-white/70 mt-1">
            Choose dates and submit your booking request.
          </p>

          <div className="mt-6">
            {!isAuthenticated ? (
              <div className="glass-soft rounded-2xl p-5">
                <div className="font-extrabold">Login required</div>

                <p className="text-white/70 text-sm mt-1">
                  Please login to book this room.
                </p>

                <Link
                  to="/login"
                  className="inline-block mt-4 bg-indigo-600 hover:bg-indigo-500 px-6 py-2 rounded-full font-extrabold"
                >
                  Go to Login
                </Link>
              </div>
            ) : user?.role === "admin" ? (
              <div className="glass-soft rounded-2xl p-5">
                <div className="font-extrabold">Admin account</div>

                <p className="text-white/70 text-sm mt-1">
                  Booking is for customers.
                </p>
              </div>
            ) : (
              <div className="glass-soft rounded-2xl p-5">
                <BookingForm roomId={room.id} price={room.price} />
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default RoomDetail;
