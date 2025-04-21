import React from 'react';
import { useBooks } from '../context/BookContext';

/**
 * Komponen untuk memfilter buku berdasarkan status
 */
const BookFilter = () => {
  const { filter, setFilter } = useBooks();

  const options = [
    { value: 'all', label: 'Perpustakaan Saya' },
    { value: 'owned', label: 'Koleksi Pribadi' },
    { value: 'reading', label: 'Dalam Proses Baca' },
    { value: 'toBuy', label: 'Wishlist' },
  ];

  const handleChange = (e) => setFilter(e.target.value);

  return (
    <section className="book-filter bg-white dark:bg-gray-900 p-6 rounded-lg shadow-md">
      <h2 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">Filter Buku</h2>
      <div className="flex flex-col gap-4">
        {options.map(({ value, label }) => (
          <label
            key={value}
            className="flex items-center space-x-3 text-gray-800 dark:text-gray-200"
          >
            <input
              type="radio"
              name="book-filter"
              value={value}
              checked={filter === value}
              onChange={handleChange}
              className="w-4 h-4 text-blue-600 focus:ring-blue-500"
            />
            <span className="text-base leading-none">{label}</span>
          </label>
        ))}
      </div>
    </section>
  );
};

export default BookFilter;
