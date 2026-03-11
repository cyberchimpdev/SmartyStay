import { useState, useRef, useEffect } from "react";

export default function CustomSelect({ options, value, onChange }) {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const selectedOption = options.find((opt) => opt.value === value);

  return (
    <div className="relative w-full" ref={dropdownRef}>
      {/* Selected Box */}
      <div
        onClick={() => setOpen(!open)}
        className="
          bg-white/10 
          hover:bg-white/15
          transition
          backdrop-blur-md
          border border-white/20
          text-white
          rounded-2xl
          px-4 py-2
          cursor-pointer
          flex justify-between items-center
        "
      >
        <span>{selectedOption?.label || "Select option"}</span>
        <span className={`transition-transform ${open ? "rotate-180" : ""}`}>
          ▼
        </span>
      </div>

      {open && (
        <div
          className="
            absolute z-50 mt-2 w-full
            bg-[#1e293b] 
            border border-white/10
            rounded-2xl
            shadow-2xl
            overflow-hidden
            animate-fadeIn
          "
        >
          {options.map((option) => (
            <div
              key={option.value}
              onClick={() => {
                onChange(option.value);
                setOpen(false);
              }}
              className="
                px-4 py-3
                text-white
                hover:bg-white/10
                cursor-pointer
                transition
              "
            >
              {option.label}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
