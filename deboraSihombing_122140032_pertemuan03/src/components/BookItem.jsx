import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useBooks } from '../context/BookContext';

/**
 * Komponen untuk menampilkan detail buku dalam daftar
 */
const BookItem = ({ book, onEdit }) => {
  const { deleteBook } = useBooks();
  const [isDeleteConfirmVisible, setIsDeleteConfirmVisible] = useState(false);

  // Menampilkan status buku dalam bahasa Indonesia
  const getStatusLabel = (status) => {
    const statusLabels = {
      owned: 'Perpustakaan Saya',
      reading: 'Dalam Proses Baca',
      toBuy: 'Wishlist',
    };

    return statusLabels[status] || 'Status Tidak Diketahui';
  };

  // Tampilkan status dengan class terkait
  const getStatusClass = (status) => {
    const statusClasses = {
      owned: 'owned',
      reading: 'reading',
      toBuy: 'to-buy',
    };

    return statusClasses[status] || 'unknown';
  };

  // Menampilkan konfirmasi sebelum menghapus buku
  const handleDeleteRequest = () => {
    setIsDeleteConfirmVisible(true);
  };

  const confirmDelete = () => {
    deleteBook(book.id);
    setIsDeleteConfirmVisible(false);
  };

  const cancelDelete = () => {
    setIsDeleteConfirmVisible(false);
  };

  return (
    <div className="book-item">
      <div className="book-details">
        <h3 className="book-title">{book.title}</h3>
        <p className="book-author">Penulis: {book.author}</p>
        <div className={`book-status ${getStatusClass(book.status)}`}>
          {getStatusLabel(book.status)}
        </div>
        {book.description && (
          <p className="book-description">{book.description}</p>
        )}
      </div>

      <div className="book-actions">
        <button 
          className="btn-edit" 
          onClick={onEdit} 
          aria-label={`Edit buku ${book.title}`}
        >
          Edit
        </button>
        
        <button 
          className="btn-delete" 
          onClick={handleDeleteRequest}
          aria-label={`Hapus buku ${book.title}`}
        >
          Hapus
        </button>
      </div>

      {isDeleteConfirmVisible && (
        <div className="delete-confirmation">
          <p>Anda yakin ingin menghapus buku "{book.title}"?</p>
          <div className="confirm-actions">
            <button 
              className="btn-confirm" 
              onClick={confirmDelete}
            >
              Lanjutkan Hapus
            </button>
            <button 
              className="btn-cancel" 
              onClick={cancelDelete}
            >
              Batalkan
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

BookItem.propTypes = {
  book: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    author: PropTypes.string.isRequired,
    status: PropTypes.string.isRequired,
    description: PropTypes.string
  }).isRequired,
  onEdit: PropTypes.func.isRequired
};

export default BookItem;