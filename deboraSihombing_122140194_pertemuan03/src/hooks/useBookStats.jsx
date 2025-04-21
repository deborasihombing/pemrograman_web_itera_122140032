import { useMemo } from 'react';

/**
 * Custom hook untuk kalkulasi statistik buku dari daftar buku
 * @param {Array} books - Array berisi objek buku
 * @returns {Object} - Objek berisi berbagai statistik
 */
const useBookStats = (books) => {
  // Hitung statistik berdasarkan books yang ada
  const stats = useMemo(() => {
    // Statistik default
    const initialStats = {
      total: 0,
      owned: 0,
      reading: 0,
      toBuy: 0,
      authors: {},
      topAuthor: { name: "Tidak ada", count: 0 }
    };
    
    // Jika tidak ada buku, kembalikan statistik default
    if (!books || books.length === 0) {
      return initialStats;
    }

    // Hitung statistik berdasarkan buku yang ada
    const calculatedStats = books.reduce((acc, book) => {
      // Tambah total buku
      acc.total++;
      
      // Hitung berdasarkan status
      if (book.status === 'owned') acc.owned++;
      else if (book.status === 'reading') acc.reading++;
      else if (book.status === 'toBuy') acc.toBuy++;
      
      // Hitung jumlah buku per penulis
      if (!acc.authors[book.author]) {
        acc.authors[book.author] = 1;
      } else {
        acc.authors[book.author]++;
      }
      
      return acc;
    }, { ...initialStats });
    
    // Temukan penulis dengan buku terbanyak
    let maxCount = 0;
    Object.entries(calculatedStats.authors).forEach(([author, count]) => {
      if (count > maxCount) {
        calculatedStats.topAuthor = { name: author, count };
        maxCount = count;
      }
    });
    
    return calculatedStats;
  }, [books]);

  return stats;
};

export default useBookStats;