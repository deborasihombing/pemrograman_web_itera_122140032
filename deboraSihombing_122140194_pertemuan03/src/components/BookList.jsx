import React, { useState } from 'react';
import { useBooks } from '../context/BookContext';
import BookItem from './BookItem';
import BookForm from './BookForm';

/**
 * Komponen daftar buku yang menampilkan semua buku sesuai filter
 */
const BookList = () => {
  const { filteredBooks } = useBooks();
  const [editingBook, setEditingBook] = useState(null);

  // Handler untuk klik edit buku
  const handleEdit = (book) => {
    setEditingBook(book);
  };

  // Handler untuk menutup form edit
  const handleCloseEdit = () => {
    setEditingBook(null);
  };

  return (
    <div className="book-list-container">
      {editingBook && (
        <div className="edit-overlay">
          <div className="edit-form-container">
            <BookForm bookToEdit={editingBook} onClose={handleCloseEdit} />
          </div>
        </div>
      )}

      <div className="book-list">
        {filteredBooks.length === 0 ? (
          <div className="empty-list">
            <p>Tidak ada buku ditemukan</p>
          </div>
        ) : (
          filteredBooks.map((book) => (
            <BookItem
              key={book.id}
              book={book}
              onEdit={() => handleEdit(book)}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default BookList;
