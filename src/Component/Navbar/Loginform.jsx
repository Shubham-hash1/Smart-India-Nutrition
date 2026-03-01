import { useState, useEffect } from "react";

export default function LoginForm({ close }) {
  const [selected, setSelected] = useState("");

  /* Close using ESC key */
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape") close();
    };

    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [close]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4">

      {/* Background */}
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-md"
        onClick={close}
      />

      {/* Modal */}
      <div
        className="
          relative
          w-full
          max-w-md
          bg-white
          p-6 sm:p-8
          rounded-2xl
          shadow-2xl
          animate-scaleIn
        "
      >
        {/* Close */}
        <button
          onClick={close}
          className="
            absolute top-3 right-4
            text-xl font-bold
            hover:text-red-500
          "
        >
          ×
        </button>

        <h2 className="text-xl sm:text-2xl font-bold mb-5 text-center">
          Login
        </h2>

        {/* Email */}
        <input
          type="email"
          placeholder="Email"
          className="w-full border p-2.5 mb-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
        />

        {/* Password */}
        <input
          type="password"
          placeholder="Password"
          className="w-full border p-2.5 mb-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
        />

        {/* Region */}
        <select
          value={selected}
          onChange={(e) => setSelected(e.target.value)}
          className="w-full border p-2.5 mb-5 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
        >
          <option value="" disabled>
            -- Select Region --
          </option>
          <option>North</option>
          <option>South</option>
          <option>East</option>
          <option>West</option>
        </select>

        {/* Button */}
        <button
          className="
            w-full
            bg-blue-600
            text-white
            py-2.5
            rounded-lg
            hover:bg-blue-700
            transition
          "
        >
          Submit
        </button>
      </div>
    </div>
  );
}