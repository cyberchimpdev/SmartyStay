import React, { useEffect, useMemo, useState } from "react";
import api from "../../api/axiosConfig";
import { formatNPR } from "../../utils/currency";

const StatusPill = ({ status }) => {
  const s = String(status || "").toLowerCase();
  const base =
    "text-xs font-extrabold px-3 py-1 rounded-full border backdrop-blur-sm";

  if (s === "approved")
    return (
      <span
        className={`${base} bg-emerald-500/15 border-emerald-300/20 text-emerald-200`}
      >
        APPROVED
      </span>
    );

  if (s === "cancelled")
    return (
      <span className={`${base} bg-red-500/15 border-red-300/20 text-red-200`}>
        CANCELLED
      </span>
    );

  return (
    <span
      className={`${base} bg-amber-500/15 border-amber-300/20 text-amber-200`}
    >
      PENDING
    </span>
  );
};

const ManageBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [busyId, setBusyId] = useState(null);

  const [query, setQuery] = useState("");
  const [onlyPending, setOnlyPending] = useState(false);

  const fallbackImage =
    "https://images.unsplash.com/photo-1551887373-6a5bdac1fd1a?auto=format&fit=crop&w=600&q=80";

  const load = async () => {
    setLoading(true);
    try {
      const [bRes, rRes] = await Promise.all([
        api.get("bookings/"),
        api.get("rooms/"),
      ]);

      setBookings(bRes.data || []);
      setRooms(rRes.data || []);
    } catch (err) {
      console.error("Failed to load bookings:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const roomById = useMemo(() => {
    const map = new Map();
    rooms.forEach((r) => map.set(r.id, r));
    return map;
  }, [rooms]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();

    return bookings.filter((b) => {
      const status = String(b.status || "").toLowerCase();
      if (onlyPending && status !== "pending") return false;

      const room = roomById.get(b.room);
      const roomName = (room?.name || "").toLowerCase();
      const username = (b.user?.username || "").toLowerCase();
      const email = (b.user?.email || "").toLowerCase();

      if (!q) return true;

      return (
        roomName.includes(q) ||
        status.includes(q) ||
        username.includes(q) ||
        email.includes(q) ||
        String(b.check_in).includes(q) ||
        String(b.check_out).includes(q)
      );
    });
  }, [bookings, roomById, query, onlyPending]);

  const updateStatus = async (id, status) => {
    setBusyId(id);

    try {
      const res = await api.patch(`bookings/${id}/`, { status });

      setBookings((prev) => prev.map((b) => (b.id === id ? res.data : b)));
    } catch (err) {
      console.error("Status update failed:", err.response?.data || err);
    } finally {
      setBusyId(null);
    }
  };

  if (loading) {
    return (
      <div className="py-12 text-center text-white/70">Loading bookings...</div>
    );
  }

  return (
    <div className="rounded-3xl p-7 bg-white/5 backdrop-blur-xl border border-white/10">
      <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-5">
        <div>
          <h2 className="text-2xl font-extrabold">Manage Bookings</h2>
          <p className="text-white/70 text-sm mt-1">
            Search, filter and manage customer bookings.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3">
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search room / user / status / date..."
            className="bg-white/10 focus:bg-white/15 transition rounded-full px-4 py-2 outline-none placeholder-white/60"
          />

          <label className="bg-white/10 rounded-full px-4 py-2 flex items-center gap-2 text-sm font-bold">
            <input
              type="checkbox"
              checked={onlyPending}
              onChange={(e) => setOnlyPending(e.target.checked)}
            />
            Pending only
          </label>

          <button
            onClick={load}
            className="bg-indigo-600 hover:bg-indigo-500 rounded-full px-5 py-2 font-extrabold transition"
          >
            Refresh
          </button>
        </div>
      </div>

      {filtered.length === 0 ? (
        <div className="mt-8 text-center rounded-2xl p-10 bg-white/5">
          <div className="text-lg font-extrabold">No bookings found</div>
          <p className="text-white/70 text-sm mt-2">
            Try adjusting your filters.
          </p>
        </div>
      ) : (
        <div className="mt-8 space-y-4">
          {filtered.map((b) => {
            const room = roomById.get(b.room);
            const status = String(b.status || "").toLowerCase();
            const roomName = room?.name || `Room #${b.room}`;
            const imageUrl = room?.final_image || room?.image || fallbackImage;

            const nights = b.nights || 0;
            const total = b.total_price || 0;
            const price = room?.price || 0;

            const isApproved = status === "approved";
            const isCancelled = status === "cancelled";

            return (
              <div
                key={b.id}
                className="rounded-2xl p-5 flex flex-col md:flex-row md:items-center gap-6 bg-white/5 border border-white/10"
              >
                <div className="flex items-center gap-4 md:w-72">
                  <img
                    src={imageUrl}
                    alt={roomName}
                    className="w-20 h-20 rounded-xl object-cover"
                  />

                  <div>
                    <div className="font-extrabold text-sm md:text-base">
                      {roomName}
                    </div>

                    <div className="text-xs text-white/60 font-bold">
                      {room?.room_type?.toUpperCase() || "ROOM"}
                    </div>
                  </div>
                </div>

                <div className="flex-1 text-sm text-white/80 font-bold">
                  <div>
                    {b.check_in} → {b.check_out}
                  </div>

                  <div className="mt-1 text-xs text-indigo-300 font-bold">
                    👤 {b.user?.username || "Unknown"}{" "}
                    {b.user?.email && `(${b.user.email})`}
                  </div>

                  <div className="mt-2 text-xs text-white/70">
                    {nights} night{nights !== 1 ? "s" : ""} • {formatNPR(price)}{" "}
                    / night
                  </div>

                  <div className="mt-1 text-sm font-extrabold text-emerald-300">
                    Total: {formatNPR(total)}
                  </div>

                  <div className="mt-3">
                    <StatusPill status={b.status} />
                  </div>
                </div>

                <div className="flex gap-3">
                  <button
                    disabled={isApproved || busyId === b.id}
                    onClick={() => updateStatus(b.id, "approved")}
                    className="bg-emerald-500/20 hover:bg-emerald-500/30 disabled:opacity-40 border border-emerald-300/20 rounded-xl px-4 py-2 text-xs md:text-sm font-extrabold transition"
                  >
                    {busyId === b.id ? "Updating..." : "Approve"}
                  </button>

                  <button
                    disabled={isCancelled || busyId === b.id}
                    onClick={() => updateStatus(b.id, "cancelled")}
                    className="bg-red-500/20 hover:bg-red-500/30 disabled:opacity-40 border border-red-300/20 rounded-xl px-4 py-2 text-xs md:text-sm font-extrabold transition"
                  >
                    {busyId === b.id ? "Updating..." : "Cancel"}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default ManageBookings;
