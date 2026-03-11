import React, { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Filter, Search, Star } from "lucide-react";
import { Link } from "react-router-dom";
import api from "../../api/axiosConfig";
import { formatNPR, formatUSD } from "../../utils/currency";
import GlassSelect from "../../components/common/GlassSelect";

const BACKEND_URL = "https://intrinsically-nonperjured-kyoko.ngrok-free.dev";

const fallbackImage =
  "https://images.unsplash.com/photo-1551887373-6a5bdac1fd1a?auto=format&fit=crop&w=1200&q=80";

const RoomsList = () => {
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState("");
  const [type, setType] = useState("all");

  useEffect(() => {
    api
      .get("rooms/")
      .then((res) => {
        setRooms(res.data || []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const filtered = useMemo(() => {
    return rooms.filter((r) => {
      const matchQuery =
        r.name?.toLowerCase().includes(query.toLowerCase()) ||
        r.description?.toLowerCase().includes(query.toLowerCase());

      const matchType = type === "all" ? true : r.room_type === type;

      return matchQuery && matchType;
    });
  }, [rooms, query, type]);

  if (loading) {
    return (
      <div className="py-14 text-center text-white/70">Loading rooms...</div>
    );
  }

  const roomFilterOptions = [
    { value: "all", label: "All" },
    { value: "single", label: "Single" },
    { value: "double", label: "Double" },
    { value: "suite", label: "Suite" },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      {/* Filters */}
      <div className="glass rounded-3xl p-6 mb-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-extrabold tracking-tight">Rooms</h1>
            <p className="text-white/70 mt-1">
              Search & filter to find your perfect stay.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative">
              <Search className="w-4 h-4 text-white/60 absolute left-4 top-3.5" />
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="glass-soft text-white placeholder-white/60 pl-10 pr-4 py-2 rounded-full outline-none focus:ring-2 focus:ring-indigo-300/40"
                placeholder="Search rooms..."
              />
            </div>

            <div className="relative">
              <Filter className="w-4 h-4 text-white/60 absolute left-1 top-1/2 -translate-y-1/2" />
              <GlassSelect
                options={roomFilterOptions}
                value={type}
                onChange={setType}
              />
            </div>
          </div>
        </div>
      </div>

      {filtered.length === 0 ? (
        <div className="glass rounded-3xl p-10 text-center">
          <div className="text-xl font-extrabold">No rooms found</div>
          <p className="text-white/70 mt-2">
            Try clearing search or changing the room type.
          </p>
        </div>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((room, idx) => (
            <motion.div
              key={room.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.05 }}
              className="glass rounded-3xl overflow-hidden hover:translate-y-1 transition duration-300"
            >
              <div className="h-48 overflow-hidden">
                <img
                  src={
                    room.final_image
                      ? `${BACKEND_URL}${room.final_image}`
                      : fallbackImage
                  }
                  alt={room.name}
                  loading="lazy"
                  onError={(e) => (e.target.src = fallbackImage)}
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                />
              </div>

              <div className="p-6">
                <div className="flex items-center justify-between">
                  <h3 className="font-extrabold">{room.name}</h3>

                  <div className="flex items-center gap-1 text-amber-300">
                    <Star className="w-4 h-4 fill-amber-300" />
                    <span className="text-sm font-extrabold text-white/80">
                      4.7
                    </span>
                  </div>
                </div>

                <p className="text-white/70 text-sm mt-2 line-clamp-2">
                  {room.description}
                </p>

                <div className="mt-4 flex items-center justify-between">
                  <div className="font-extrabold">
                    <div className="text-lg">{formatNPR(room.price)}</div>
                    <div className="text-xs text-white/60 font-bold">
                      {formatUSD(room.price)} / night
                    </div>
                  </div>

                  <Link
                    to={`/rooms/${room.id}`}
                    className="bg-indigo-600 hover:bg-indigo-500 text-white px-4 py-2 rounded-full text-sm font-extrabold"
                  >
                    View
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
};

export default RoomsList;
