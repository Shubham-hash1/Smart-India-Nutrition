import { useState } from "react";
import LoginForm from "./Loginform";

export default function Login() {
  const [open, setOpen] = useState(false);

  return (
    <div className="bg-orange-600">

      <button
        onClick={() => setOpen(true)}
        className="absolute right-10  text-xl font-bold cursor-pointer hover:text-blue-300 "
      >
        Login
      </button>

      {open && <LoginForm close={() => setOpen(false)} />}
    </div>
  );
}

