import React, { createContext, useContext, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import useLocalStorage from '../hooks/useLocalStorage';

// Membuat Context
const BookContext = createContext();

/**
 * Provider untuk BookContext yang menyediakan state dan fungsi terkait buku
 * ke seluruh aplikasi
 */
export const BookProvider = ({ children }) => {
  // Gunakan custom hook untuk integrasi dengan localStorage
  const [books, setBooks] = useLocalStorage('books', []);
  const [filteredBooks, setFilteredBooks] = useState([]);
  const [filter, setFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  // Efek untuk memfilter buku berdasarkan status dan pencarian
  useEffect(() => {
    let result = [...books];
    
    // Filter berdasarkan status
    if (filter !== 'all') {
      result = result.filter(book => book.status === filter);
    }
    
    // Filter berdasarkan pencarian
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      result = result.filter(
        book => 
          book.title.toLowerCase().includes(term) || 
          book.author.toLowerCase().includes(term)
      );
    }
    
    setFilteredBooks(result);
  }, [books, filter, searchTerm]);

  // Menambahkan buku baru
  const addBook = (book) => {
    const newBook = {
      ...book,
      id: Date.now().toString(),
      createdAt: new Date().toISOString()
    };
    setBooks(prevBooks => [...prevBooks, newBook]);
  };

  // Mengedit buku yang ada
  const editBook = (id, updatedBook) => {
    setBooks(prevBooks => 
      prevBooks.map(book => 
        book.id === id ? { ...book, ...updatedBook, updatedAt: new Date().toISOString() } : book
      )
    );
  };

  // Menghapus buku
  const deleteBook = (id) => {
    setBooks(prevBooks => prevBooks.filter(book => book.id !== id));
  };

  // Nilai yang diekspos ke seluruh aplikasi
  const value = {
    books,
    filteredBooks,
    filter,
    searchTerm,
    setFilter,
    setSearchTerm,
    addBook,
    editBook,
    deleteBook
  };

  return (
    <BookContext.Provider value={value}>
      {children}
    </BookContext.Provider>
  );
};

// PropTypes
BookProvider.propTypes = {
  children: PropTypes.node.isRequired
};

// Custom hook untuk menggunakan BookContext
export const useBooks = () => {
  const context = useContext(BookContext);
  if (!context) {
    throw new Error('useBooks harus digunakan di dalam BookProvider');
  }
  return context;
};

export default BookContext;