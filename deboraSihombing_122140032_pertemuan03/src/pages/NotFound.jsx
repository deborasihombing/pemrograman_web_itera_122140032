import React from 'react';
import { Link } from 'react-router-dom';

/**
 * Halaman 404 Not Found
 */
const NotFound = () => {
  return (
    <div className="not-found">
      <h1>404</h1>
      <h2>Halaman Tidak Ditemukan</h2>
      <p>Maaf, halaman yang Anda cari tidak ditemukan.</p>
      <Link to="/" className="home-link">
        Kembali ke Beranda
      </Link>
    </div>
  );
};

export default NotFound;