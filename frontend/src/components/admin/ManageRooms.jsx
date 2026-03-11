import React, { useEffect, useState } from "react";
import api from "../../api/axiosConfig";
import { Plus, Trash2 } from "lucide-react";
import { formatNPR, formatUSD } from "../../utils/currency";
import CustomSelect from "./CustomSelect";

const fallbackImage =
  "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&w=600&q=80";

const ManageRooms = () => {
  const [rooms, setRooms] = useState([]);
  const [busy, setBusy] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [msg, setMsg] = useState("");

  const [previewImage, setPreviewImage] = useState(fallbackImage);

  const [form, setForm] = useState({
    name: "",
    description: "",
    price: "",
    room_type: "single",
    image: null,
    image_url: "",
  });

  useEffect(() => {
    let objectUrl;

    if (form.image) {
      objectUrl = URL.createObjectURL(form.image);
      setPreviewImage(objectUrl);
    } else if (form.image_url) {
      setPreviewImage(form.image_url);
    } else {
      setPreviewImage(fallbackImage);
    }

    return () => {
      if (objectUrl) URL.revokeObjectURL(objectUrl);
    };
  }, [form.image, form.image_url]);

  const load = async () => {
    try {
      const res = await api.get("rooms/");
      setRooms(res.data || []);
    } catch (err) {
      console.error("Room load failed:", err);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const onCreate = async (e) => {
    e.preventDefault();
    setMsg("");
    setBusy(true);

    try {
      const fd = new FormData();

      fd.append("name", form.name);
      fd.append("description", form.description);
      fd.append("price", form.price);
      fd.append("room_type", form.room_type);

      if (form.image_url) fd.append("image_url", form.image_url);
      if (form.image) fd.append("image", form.image);

      const res = await api.post("rooms/", fd, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      setMsg("Room created successfully!");

      setRooms((prev) => [res.data, ...prev]);

      setForm({
        name: "",
        description: "",
        price: "",
        room_type: "single",
        image: null,
        image_url: "",
      });
    } catch (err) {
      console.error(err);
      setMsg("Failed to create room. Check admin permissions.");
    } finally {
      setBusy(false);
    }
  };

  const onDelete = async (id) => {
    if (!window.confirm("Delete this room?")) return;

    setDeleteId(id);

    try {
      await api.delete(`rooms/${id}`);

      setRooms((prev) => prev.filter((r) => r.id !== id));
    } catch (err) {
      console.error("Delete failed:", err);
    } finally {
      setDeleteId(null);
    }
  };

  const roomTypeOptions = [
    { value: "single", label: "Single" },
    { value: "double", label: "Double" },
    { value: "suite", label: "Suite" },
  ];

  return (
    <div className="grid lg:grid-cols-2 gap-8">
      <div className="rounded-3xl p-7 bg-white/5 backdrop-blur-xl border border-white/10">
        <h2 className="text-2xl font-extrabold">Create Room</h2>
        <p className="text-white/70 text-sm mt-1">
          Add rooms with image, type and pricing.
        </p>

        {msg && (
          <div className="mt-5 bg-white/10 border border-white/10 rounded-2xl p-4 text-sm font-bold">
            {msg}
          </div>
        )}

        <form onSubmit={onCreate} className="mt-6 space-y-4">
          <input
            className="w-full bg-white/10 focus:bg-white/15 transition rounded-2xl px-4 py-2 outline-none"
            placeholder="Room name"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            required
          />

          <textarea
            className="w-full bg-white/10 focus:bg-white/15 transition rounded-2xl px-4 py-2 outline-none min-h-27.5"
            placeholder="Description"
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
            required
          />

          <div className="grid sm:grid-cols-2 gap-4">
            <input
              type="number"
              className="bg-white/10 focus:bg-white/15 transition rounded-2xl px-4 py-2 outline-none"
              placeholder="Price (NPR)"
              value={form.price}
              onChange={(e) => setForm({ ...form, price: e.target.value })}
              required
            />

            <CustomSelect
              options={roomTypeOptions}
              value={form.room_type}
              onChange={(val) => setForm({ ...form, room_type: val })}
            />
          </div>

          <input
            className="w-full bg-white/10 focus:bg-white/15 transition rounded-2xl px-4 py-2 outline-none"
            placeholder="Image URL (optional)"
            value={form.image_url}
            onChange={(e) => setForm({ ...form, image_url: e.target.value })}
          />

          <input
            type="file"
            className="w-full bg-white/10 focus:bg-white/15 transition rounded-2xl px-4 py-2 outline-none"
            accept="image/*"
            onChange={(e) =>
              setForm({ ...form, image: e.target.files?.[0] || null })
            }
          />

          <button
            disabled={busy}
            className="w-full bg-indigo-600 hover:bg-indigo-500 disabled:opacity-60 transition rounded-2xl py-2 font-extrabold flex items-center justify-center gap-2"
          >
            <Plus className="w-4 h-4" />
            {busy ? "Creating..." : "Create Room"}
          </button>
        </form>

        <div className="mt-8">
          <div className="text-sm font-extrabold mb-3">Live Preview</div>

          <div className="glass-soft rounded-2xl overflow-hidden">
            <div className="h-36">
              <img
                src={previewImage}
                alt="Preview"
                className="w-full h-full object-cover"
              />
            </div>

            <div className="p-4">
              <div className="flex justify-between items-start">
                <div>
                  <div className="font-extrabold text-sm">
                    {form.name || "Room name"}
                  </div>

                  <div className="text-xs text-white/60 font-bold mt-1">
                    {form.room_type.toUpperCase()}
                  </div>
                </div>

                <div className="text-xs text-white/70 font-bold">
                  {form.price ? `${formatNPR(form.price)}` : "Set price"}
                </div>
              </div>

              <p className="mt-2 text-xs text-white/70 line-clamp-2">
                {form.description || "Short description of this room."}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="rounded-3xl p-7 bg-white/5 backdrop-blur-xl border border-white/10">
        <h2 className="text-2xl font-extrabold">All Rooms</h2>

        <p className="text-white/70 text-sm mt-1">
          Manage your room inventory.
        </p>

        <div className="mt-6 space-y-4">
          {rooms.length === 0 && (
            <div className="text-white/70 font-bold text-center py-10">
              No rooms yet.
            </div>
          )}

          {rooms.map((r) => (
            <div
              key={r.id}
              className="glass-soft rounded-2xl p-4 flex items-center gap-4"
            >
              <img
                src={r.final_image || r.image || fallbackImage}
                alt={r.name}
                className="w-16 h-16 rounded-xl object-cover"
              />

              <div className="flex-1">
                <div className="font-extrabold">{r.name}</div>

                <div className="text-white/70 text-sm">
                  {r.room_type?.toUpperCase()} • {formatNPR(r.price)}
                  <span className="text-xs text-white/60 font-bold ml-1">
                    ({formatUSD(r.price)} / night)
                  </span>
                </div>
              </div>

              <button
                onClick={() => onDelete(r.id)}
                disabled={deleteId === r.id}
                className="bg-red-500/20 hover:bg-red-500/30 disabled:opacity-40 border border-red-300/20 rounded-xl px-3 py-2 transition"
              >
                <Trash2 className="w-4 h-4 text-red-200" />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ManageRooms;
