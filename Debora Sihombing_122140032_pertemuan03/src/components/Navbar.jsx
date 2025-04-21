import React from 'react';
import { Link, useLocation } from 'react-router-dom';

/**
 * Komponen Navbar untuk navigasi utama
 */
const Navbar = () => {
  const location = useLocation();

  // Helper untuk menentukan apakah link sedang aktif
  const isActive = (path) => location.pathname === path;

  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <Link to="/" className={isActive('/') ? 'active' : ''}>
          Debora's Library
        </Link>
      </div>
      
      <ul className="nav-links">
        <li className={isActive('/') ? 'active' : ''}>
          <Link to="/">Beranda</Link>
        </li>
        <li className={isActive('/stats') ? 'active' : ''}>
          <Link to="/stats">Statistik</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
