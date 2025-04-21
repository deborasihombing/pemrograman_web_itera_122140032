import React, { useState, useEffect } from 'react';
import { useBooks } from '../context/BookContext';

/**
 * Komponen untuk pencarian buku berdasarkan judul atau penulis
 */
const SearchBar = () => {
  const { setSearchTerm, searchTerm } = useBooks();
  const [inputValue, setInputValue] = useState(searchTerm);
  
  // Gunakan debounce untuk mengurangi jumlah rerender
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setSearchTerm(inputValue);
    }, 300);
    
    return () => clearTimeout(timeoutId);
  }, [inputValue, setSearchTerm]);
  
  // Reset search ketika komponen di-unmount
  useEffect(() => {
    return () => setSearchTerm('');
  }, [setSearchTerm]);

  // Handler untuk perubahan input
  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  // Handler untuk reset pencarian
  const handleReset = () => {
    setInputValue('');
    setSearchTerm('');
  };

  return (
    <div className="search-bar">
      <input
        type="text"
        placeholder="Cari judul atau penulis..."
        value={inputValue}
        onChange={handleInputChange}
        aria-label="Cari buku"
      />
      {inputValue && (
        <button 
          className="reset-button" 
          onClick={handleReset}
          aria-label="Reset pencarian"
        >
          ×
        </button>
      )}
    </div>
  );
};

export default SearchBar;