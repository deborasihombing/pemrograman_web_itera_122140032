import React, { useState } from 'react';
import BookList from '../components/BookList';
import BookForm from '../components/BookForm';
import BookFilter from '../components/BookFilter';
import SearchBar from '../components/SearchBar';
import { useBooks } from '../context/BookContext';

/**
 * Halaman utama untuk menampilkan dan mengelola buku
 */
const Home = () => {
  const { filteredBooks } = useBooks();
  const [showForm, setShowForm] = useState(false);

  // Toggle form tambah buku
  const toggleForm = () => {
    setShowForm(prev => !prev);
  };

  return (
    <div className="home-page">
      <div className="home-header">
        <h1>Koleksi Buku Anda</h1>
        <p className="book-count">
          Menampilkan {filteredBooks.length} buku
        </p>
      </div>

      <div className="controls-container">
        <button 
          className="add-book-btn" 
          onClick={toggleForm}
        >
          {showForm ? 'Tutup Form' : '+ Tambah Buku'}
        </button>
        
        <div className="filter-search-container">
          <BookFilter />
          <SearchBar />
        </div>
      </div>

      {showForm && (
        <div className="form-container">
          <BookForm onClose={() => setShowForm(false)} />
        </div>
      )}

      <BookList />
    </div>
  );
};

export default Home;