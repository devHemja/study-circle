import { NavLink } from "react-router-dom";
import logo from "../assets/nitrr_mca_logo.jpg";

export default function Header() {
  return (
    <header className="w-full">

      {/* 🔹 NAVBAR (FIXED) */}
      <div className="bg-black text-white w-full fixed top-0 left-0 z-50 h-16">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">

          {/* Logo + Name */}
          <div className="flex items-center gap-3">
            <img
              src={logo}
              alt="StudyCircle Logo"
              className="h-10 w-10 object-contain"
            />
            <h1 className="text-xl font-bold">
              StudyCircle
            </h1>
          </div>

          {/* NavLinks */}
          <nav className="flex gap-8 text-lg font-medium">
            <NavLink to="/" className="hover:text-yellow-400 transition">
              Home
            </NavLink>
            <NavLink to="/about" className="hover:text-yellow-400 transition">
              About
            </NavLink>
            <NavLink to="/contact" className="hover:text-yellow-400 transition">
              Contact
            </NavLink>
          </nav>

        </div>
      </div>

    </header>
  );
}
