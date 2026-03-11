import React, { useMemo, useState } from "react";
import { Calendar } from "lucide-react";
import api from "../../api/axiosConfig";
import { formatNPR } from "../../utils/currency";

const BookingForm = ({ roomId, price }) => {
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState("");
  const [error, setError] = useState(false);

  const nights = useMemo(() => {
    if (!checkIn || !checkOut) return null;

    const start = new Date(checkIn);
    const end = new Date(checkOut);

    const diff = (end - start) / (1000 * 60 * 60 * 24);

    if (!Number.isFinite(diff) || diff <= 0) return null;

    return diff;
  }, [checkIn, checkOut]);

  const totalPrice = useMemo(() => {
    if (!nights || !price) return null;
    return nights * price;
  }, [nights, price]);

  const onSubmit = async (e) => {
    e.preventDefault();
    setMsg("");
    setError(false);

    // Validation
    if (checkOut <= checkIn) {
      setError(true);
      setMsg("Check-out must be after check-in.");
      return;
    }

    const today = new Date().toISOString().split("T")[0];

    if (checkIn < today) {
      setError(true);
      setMsg("Check-in date cannot be in the past.");
      return;
    }

    setLoading(true);

    try {
      await api.post("bookings/", {
        room: roomId,
        check_in: checkIn,
        check_out: checkOut,
      });

      setError(false);
      setMsg("✅ Booking request submitted! (Pending approval)");

      setCheckIn("");
      setCheckOut("");
    } catch (err) {
      const data = err?.response?.data;

      let message =
        data?.detail ||
        data?.check_in ||
        data?.check_out ||
        (typeof data === "string" ? data : null) ||
        "Booking failed.";

      setError(true);
      setMsg(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h3 className="font-extrabold text-lg">Book this room</h3>
      <p className="text-white/70 text-sm mt-1">
        Choose dates and submit your request.
      </p>

      {msg && (
        <div
          className={`mt-4 rounded-2xl px-4 py-3 text-sm font-bold border ${
            error
              ? "bg-red-500/10 border-red-400/30 text-red-300"
              : "bg-emerald-500/10 border-emerald-400/30 text-emerald-300"
          }`}
        >
          {msg}
        </div>
      )}

      <form onSubmit={onSubmit} className="mt-5 grid sm:grid-cols-2 gap-3">
        <div className="relative">
          <Calendar className="w-4 h-4 text-white/60 absolute left-4 top-3.5" />
          <input
            type="date"
            value={checkIn}
            min={new Date().toISOString().split("T")[0]}
            onChange={(e) => setCheckIn(e.target.value)}
            className="w-full glass-soft rounded-full pl-10 pr-4 py-2 outline-none"
            required
          />
        </div>

        <div className="relative">
          <Calendar className="w-4 h-4 text-white/60 absolute left-4 top-3.5" />
          <input
            type="date"
            value={checkOut}
            min={checkIn || new Date().toISOString().split("T")[0]}
            onChange={(e) => setCheckOut(e.target.value)}
            className="w-full glass-soft rounded-full pl-10 pr-4 py-2 outline-none"
            required
          />
        </div>

        <button
          disabled={loading}
          className="sm:col-span-2 bg-indigo-600 hover:bg-indigo-500 disabled:opacity-60 text-white rounded-full py-2 font-extrabold transition"
        >
          {loading ? "Booking..." : "Submit Booking"}
        </button>
      </form>

      {nights !== null && (
        <div className="mt-4 glass-soft rounded-2xl p-4 text-sm font-bold">
          <div className="flex justify-between text-white/70">
            <span>Price per night</span>
            <span>{formatNPR(price)}</span>
          </div>

          <div className="flex justify-between text-white/70 mt-1">
            <span>Stay length</span>
            <span>
              {nights} night{nights > 1 ? "s" : ""}
            </span>
          </div>

          <div className="flex justify-between mt-2 text-white text-lg">
            <span>Total</span>
            <span>{formatNPR(totalPrice)}</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default BookingForm;
