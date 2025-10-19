import { Link } from "react-router";

const Navbar = () => {
  return (
    <nav className="navbar bg-liquid-glass border border-liquid-glass-border backdrop-blur-xl">
      <Link to="/">
        <p className="text-2xl font-bold text-gradient">RESUMIND</p>
      </Link>
      <Link
        to="/upload"
        className="purple-gradient hover:purple-gradient-hover text-white rounded-full px-6 py-3 font-semibold transition-all duration-300 hover:shadow-glow hover:scale-105"
      >
        Upload Resume
      </Link>
    </nav>
  );
};

export default Navbar;
