import { useState, useRef, useEffect } from "react";
import { createPortal } from "react-dom";

export default function GlassSelect({ options, value, onChange }) {
  const [open, setOpen] = useState(false);
  const [position, setPosition] = useState(null);
  const buttonRef = useRef(null);

  useEffect(() => {
    const handleClick = (e) => {
      if (buttonRef.current && !buttonRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  useEffect(() => {
    if (open && buttonRef.current) {
      const rect = buttonRef.current.getBoundingClientRect();
      setPosition({
        top: rect.bottom + window.scrollY + 8,
        left: rect.right - 180 + window.scrollX, // width = 180px
        width: 180,
      });
    }
  }, [open]);

  const selected = options.find((o) => o.value === value);

  return (
    <>
      {/* Button */}
      <button
        ref={buttonRef}
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        className="
          glass-soft text-white
          pl-6 pr-10 py-2
          rounded-full
          outline-none
          focus:ring-2 focus:ring-indigo-300/40
          flex items-center justify-between gap-3
          min-w-35
        "
      >
        <span>{selected?.label}</span>
        <span className={`transition-transform ${open ? "rotate-180" : ""}`}>
          ▲
        </span>
      </button>

      {open &&
        position &&
        createPortal(
          <div
            style={{
              position: "absolute",
              top: position.top,
              left: position.left,
              width: position.width,
              zIndex: 9999,
            }}
            className="
              bg-slate-900/95 backdrop-blur-xl
              border border-white/10
              rounded-2xl
              shadow-2xl
              overflow-hidden
              animate-fadeIn
            "
          >
            {options.map((opt) => (
              <button
                key={opt.value}
                onClick={() => {
                  onChange(opt.value);
                  setOpen(false);
                }}
                className="
                  w-full text-left
                  px-4 py-2.5
                  text-white
                  hover:bg-white/10
                  transition
                "
              >
                {opt.label}
              </button>
            ))}
          </div>,
          document.body,
        )}
    </>
  );
}
