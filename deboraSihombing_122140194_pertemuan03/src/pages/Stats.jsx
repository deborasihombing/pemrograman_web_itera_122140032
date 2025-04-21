import React from 'react';
import { useBooks } from '../context/BookContext';

/**
 * Halaman statistik yang menampilkan rangkuman data buku
 */
const Stats = () => {
  const { books } = useBooks();
  
  // Fungsi untuk menghitung statistik buku
  const calculateStats = () => {
    // Statistik default
    const stats = {
      total: 0,
      owned: 0,
      reading: 0,
      toBuy: 0,
      authors: {},
      topAuthor: { name: "Tidak ada", count: 0 }
    };
    
    // Jika tidak ada buku, kembalikan statistik default
    if (!books || books.length === 0) {
      return stats;
    }

    // Hitung statistik berdasarkan buku yang ada
    books.forEach(book => {
      // Tambah total buku
      stats.total++;
      
      // Hitung berdasarkan status
      if (book.status === 'owned') stats.owned++;
      else if (book.status === 'reading') stats.reading++;
      else if (book.status === 'toBuy') stats.toBuy++;
      
      // Hitung jumlah buku per penulis
      if (!stats.authors[book.author]) {
        stats.authors[book.author] = 1;
      } else {
        stats.authors[book.author]++;
      }
    });
    
    // Temukan penulis dengan buku terbanyak
    let maxCount = 0;
    Object.entries(stats.authors).forEach(([author, count]) => {
      if (count > maxCount) {
        stats.topAuthor = { name: author, count };
        maxCount = count;
      }
    });
    
    return stats;
  };

  // Hitung statistik
  const stats = calculateStats();

  // Helper untuk menampilkan persentase
  const calculatePercentage = (part, total) => {
    if (total === 0) return 0;
    return Math.round((part / total) * 100);
  };

  return (
    <div className="stats-page">
      <h1>Statistik Koleksi Buku</h1>

      <div className="stats-grid">
        <div className="stat-card total">
          <h3>Total Buku</h3>
          <div className="stat-value">{stats.total}</div>
        </div>

        <div className="stat-card owned">
          <h3>Buku Dimiliki</h3>
          <div className="stat-value">
            {stats.owned}
            <span className="stat-percentage">
              ({calculatePercentage(stats.owned, stats.total)}%)
            </span>
          </div>
          <div className="progress-bar">
            <div 
              className="progress owned-progress" 
              style={{ width: `${calculatePercentage(stats.owned, stats.total)}%` }}
            ></div>
          </div>
        </div>

        <div className="stat-card reading">
          <h3>Sedang Dibaca</h3>
          <div className="stat-value">
            {stats.reading}
            <span className="stat-percentage">
              ({calculatePercentage(stats.reading, stats.total)}%)
            </span>
          </div>
          <div className="progress-bar">
            <div 
              className="progress reading-progress" 
              style={{ width: `${calculatePercentage(stats.reading, stats.total)}%` }}
            ></div>
          </div>
        </div>

        <div className="stat-card to-buy">
          <h3>Ingin Dibeli</h3>
          <div className="stat-value">
            {stats.toBuy}
            <span className="stat-percentage">
              ({calculatePercentage(stats.toBuy, stats.total)}%)
            </span>
          </div>
          <div className="progress-bar">
            <div 
              className="progress to-buy-progress" 
              style={{ width: `${calculatePercentage(stats.toBuy, stats.total)}%` }}
            ></div>
          </div>
        </div>
        
        <div className="stat-card authors">
          <h3>Penulis Favorit</h3>
          <div className="top-author">
            <div className="author-name">{stats.topAuthor.name}</div>
            <div className="author-count">
              {stats.topAuthor.count} buku
            </div>
          </div>
          <div className="authors-count">
            Total {Object.keys(stats.authors).length} penulis dalam koleksi
          </div>
        </div>
      </div>
      
      {stats.total === 0 && (
        <div className="no-stats-message">
          <p>Belum ada data statistik. Tambahkan buku untuk melihat statistik.</p>
        </div>
      )}
    </div>
  );
};

export default Stats;