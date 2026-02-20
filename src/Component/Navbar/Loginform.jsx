import { useState } from "react";

export default function LoginForm({ close }) {

  const [selected, setSelected] = useState("");

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">

      {/* Dark blur background */}
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-md"
        onClick={close}
      ></div>

      {/* Modal box */}
      <div className="relative bg-white w-[350px] p-8 rounded-2xl shadow-2xl">

        {/* Close */}
        <button
          onClick={close}
          className="absolute top-2 right-4 text-2xl font-bold cursor-pointer hover:text-red-500"
        >
          ×
        </button>

        <h2 className="text-2xl font-bold mb-5 text-center">Login</h2>

        <input
          type="email"
          placeholder="Email"
          className="w-full border p-2 mb-4 rounded-lg"
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full border p-2 mb-4 rounded-lg"
        />

        {/* Region Select */}
        <select
          value={selected}
          onChange={(e) => setSelected(e.target.value)}
          className="w-full border p-2 mb-4 rounded-lg"
        >
          <option value="" disabled className="text-gray-400"> -- Select Region -- </option>

          <option value="North">North</option>
          <option value="South">South</option>
          <option value="East">East</option>
          <option value="West">West</option>
        </select>

        {/* Show Selected Outside Select */}
        {/* {selected && (
          <p className="mb-4 text-sm text-gray-600">
            You selected: {selected}
          </p>
        )} */}

        <button className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700">
          Submit
        </button>
      </div>

    </div>
  );
}