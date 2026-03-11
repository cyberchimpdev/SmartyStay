import React, { useEffect, useMemo, useState } from "react";
import api from "../../api/axiosConfig";
import { formatNPR } from "../../utils/currency";

const StatusPill = ({ status }) => {
  const s = String(status || "").toLowerCase();
  const base = "text-xs font-extrabold px-3 py-1 rounded-full border";

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

const BookingHistory = () => {
  const [bookings, setBookings] = useState([]);
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [busyId, setBusyId] = useState(null);

  const load = async () => {
    setLoading(true);
    try {
      const [bRes, rRes] = await Promise.all([
        api.get("bookings/"),
        api.get("rooms/"),
      ]);

      setBookings(bRes.data || []);
      setRooms(rRes.data || []);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load().catch(() => setLoading(false));
  }, []);

  const roomNameById = useMemo(() => {
    const map = new Map();
    rooms.forEach((r) => map.set(r.id, r.name));
    return map;
  }, [rooms]);

  const cancelBooking = async (bookingId) => {
    if (!window.confirm("Cancel this booking?")) return;

    setBusyId(bookingId);

    try {
      await api.patch(`bookings/${bookingId}/`, { status: "cancelled" });
      await load();
    } catch {
      try {
        await api.delete(`bookings/${bookingId}/`);
        await load();
      } catch {
        alert("Cancel failed. Your backend may restrict this action.");
      }
    } finally {
      setBusyId(null);
    }
  };

  if (loading)
    return (
      <div className="py-12 text-center text-white/70">
        Loading booking history...
      </div>
    );

  return (
    <div className="glass rounded-3xl p-6">
      <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-2">
        <div>
          <h3 className="text-xl font-extrabold">Booking History</h3>
          <p className="text-white/70 text-sm mt-1">
            Your past and current booking requests.
          </p>
        </div>

        <button
          onClick={load}
          className="glass-soft hover:bg-white/15 px-4 py-2 rounded-full font-extrabold w-fit"
        >
          Refresh
        </button>
      </div>

      {bookings.length === 0 ? (
        <div className="mt-6 glass-soft rounded-2xl p-8 text-center">
          <div className="text-lg font-extrabold">No bookings yet</div>
          <p className="text-white/70 text-sm mt-2">
            Go to Rooms and make your first booking.
          </p>
        </div>
      ) : (
        <>
          <div className="hidden md:block mt-6 overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="text-white/70 text-sm">
                  <th className="py-3 px-3">Room</th>
                  <th className="py-3 px-3">Dates</th>
                  <th className="py-3 px-3">Nights</th>
                  <th className="py-3 px-3">Total</th>
                  <th className="py-3 px-3">Status</th>
                  <th className="py-3 px-3">Action</th>
                </tr>
              </thead>

              <tbody>
                {bookings.map((b) => {
                  const status = String(b.status || "").toLowerCase();
                  const canCancel =
                    status === "pending" || status === "approved";

                  return (
                    <tr key={b.id} className="border-t border-white/10">
                      <td className="py-4 px-3 font-extrabold">
                        {roomNameById.get(b.room) || `Room #${b.room}`}
                      </td>

                      <td className="py-4 px-3 text-white/80 font-bold">
                        {b.check_in} → {b.check_out}
                      </td>

                      <td className="py-4 px-3 font-bold">{b.nights || "-"}</td>

                      <td className="py-4 px-3 font-extrabold text-emerald-300">
                        {b.total_price ? formatNPR(b.total_price) : "-"}
                      </td>

                      <td className="py-4 px-3">
                        <StatusPill status={b.status} />
                      </td>

                      <td className="py-4 px-3">
                        <button
                          disabled={!canCancel || busyId === b.id}
                          onClick={() => cancelBooking(b.id)}
                          className="bg-red-500/20 hover:bg-red-500/30 disabled:opacity-50 border border-red-300/20 rounded-xl px-4 py-2 font-extrabold"
                        >
                          {busyId === b.id ? "Cancelling..." : "Cancel"}
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          <div className="md:hidden mt-6 space-y-3">
            {bookings.map((b) => {
              const status = String(b.status || "").toLowerCase();
              const canCancel = status === "pending" || status === "approved";
              const room = rooms.find((r) => r.id === b.room);
              const roomName = roomNameById.get(b.room) || `Room #${b.room}`;

              return (
                <div key={b.id} className="glass-soft rounded-2xl p-4">
                  <div className="font-extrabold text-sm">{roomName}</div>

                  <div className="mt-2 text-xs text-white/70 font-bold">
                    {b.check_in} → {b.check_out}
                  </div>

                  <div className="mt-1 text-xs text-white/70">
                    Nights: <span className="font-bold">{b.nights}</span>
                  </div>

                  <div className="mt-1 text-xs text-emerald-300 font-extrabold">
                    Total: {formatNPR(b.total_price || 0)}
                  </div>

                  <div className="mt-2">
                    <StatusPill status={b.status} />
                  </div>

                  <button
                    disabled={!canCancel || busyId === b.id}
                    onClick={() => cancelBooking(b.id)}
                    className="mt-3 w-full bg-red-500/20 hover:bg-red-500/30 disabled:opacity-50 border border-red-300/20 rounded-xl px-4 py-2 font-extrabold text-xs"
                  >
                    {busyId === b.id ? "Cancelling..." : "Cancel booking"}
                  </button>
                </div>
              );
            })}
          </div>
        </>
      )}
    </div>
  );
};

export default BookingHistory;
