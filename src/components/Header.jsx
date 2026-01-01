import { NavLink } from "react-router-dom";
import { useState } from "react";
import logo from "../assets/nitrr_mca_logo.jpg";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="w-full">
      {/* NAVBAR */}
      <div className="bg-black text-white fixed top-0 left-0 w-full z-50 h-16">
        <div className="max-w-7xl mx-auto px-6 h-full flex items-center justify-between">
          {/* Logo (acts as Home) */}
          <NavLink
            to="/"
            onClick={() => setMenuOpen(false)}
            className="flex items-center gap-3"
          >
            <img
              src={logo}
              alt="StudyCircle Logo"
              className="h-10 w-10 object-contain"
              loading="eager"
              decoding="async"
            />
            <h1 className="text-xl font-bold">StudyCircle</h1>
          </NavLink>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex gap-8 text-lg font-medium">
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

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden text-2xl focus:outline-none"
            aria-label="Toggle Menu"
          >
            ☰
          </button>
        </div>

        {/* Mobile Menu */}
        {menuOpen && (
          <div className="md:hidden bg-black text-white flex flex-col items-center gap-6 py-6">
            <NavLink
              to="/"
              onClick={() => setMenuOpen(false)}
              className="hover:text-yellow-400"
            >
              Home
            </NavLink>
            <NavLink
              to="/about"
              onClick={() => setMenuOpen(false)}
              className="hover:text-yellow-400"
            >
              About
            </NavLink>
            <NavLink
              to="/contact"
              onClick={() => setMenuOpen(false)}
              className="hover:text-yellow-400"
            >
              Contact
            </NavLink>
          </div>
        )}
      </div>
    </header>
  );
}
