import React from 'react';

/**
 * Komponen Footer untuk bagian bawah aplikasi
 */
const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="footer">
      <div className="footer-content">
        <p>
          &copy; {currentYear} Debora's Library - Koleksiku
        </p>
        <p className="footer-tagline">
          Kim Jong Hyun SHINee<br />
        </p>
      </div>
    </footer>
  );
};

export default Footer;
