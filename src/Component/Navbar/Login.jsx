import { useState } from "react";
import LoginForm from "./Loginform";

export default function Login() {
  const [open, setOpen] = useState(false);

  return (
    <div className="w-full flex justify-end px-4 sm:px-6 md:px-10 py-3">

      {/* Login Button */}
      <button
        onClick={() => setOpen(true)}
        className="
          text-sm
          sm:text-base
          md:text-lg
          font-semibold
          cursor-pointer
          hover:text-blue-400
          transition
        "
      >
        Login
      </button>

      {/* Modal */}
      {open && (
        <LoginForm close={() => setOpen(false)} />
      )}
    </div>
  );
}