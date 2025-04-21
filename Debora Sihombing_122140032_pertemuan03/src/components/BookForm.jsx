import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useBooks } from '../context/BookContext';

/**
 * Komponen untuk menambah atau mengedit buku
 */
const BookForm = ({ bookToEdit, onClose }) => {
  const { addBook, editBook } = useBooks();
  const [formData, setFormData] = useState({
    title: '',
    author: '',
    status: 'owned',
    description: ''
  });
  const [errors, setErrors] = useState({});

  // Jika ada buku yang sedang diedit, isi form dengan data buku tersebut
  useEffect(() => {
    if (bookToEdit) {
      setFormData({
        title: bookToEdit.title || '',
        author: bookToEdit.author || '',
        status: bookToEdit.status || 'owned',
        description: bookToEdit.description || ''
      });
    }
  }, [bookToEdit]);

  // Handler untuk perubahan input
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    // Reset error untuk field ini ketika diubah
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: null }));
    }
  };

  // Validasi form
  const validateForm = () => {
    const newErrors = {};

    if (!formData.title.trim()) {
      newErrors.title = 'Judul buku tidak boleh kosong';
    }

    if (!formData.author.trim()) {
      newErrors.author = 'Penulis tidak boleh kosong';
    }

    if (!formData.status) {
      newErrors.status = 'Silakan pilih status buku';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handler untuk submit form
  const handleSubmit = (e) => {
    e.preventDefault();

    if (validateForm()) {
      if (bookToEdit) {
        // Edit buku yang ada
        editBook(bookToEdit.id, formData);
      } else {
        // Tambah buku baru
        addBook(formData);
        // Reset form setelah menambah buku baru
        setFormData({
          title: '',
          author: '',
          status: 'owned',
          description: ''
        });
      }

      // Tutup form jika ada callback onClose
      if (onClose) onClose();
    }
  };

  return (
    <form className="book-form" onSubmit={handleSubmit}>
      <h2>{bookToEdit ? 'Edit Data Buku' : 'Masukkan Buku Baru'}</h2>

      <div className="form-group">
        <label htmlFor="title">Judul Buku</label>
        <input
          type="text"
          id="title"
          name="title"
          value={formData.title}
          onChange={handleChange}
          className={errors.title ? 'error' : ''}
        />
        {errors.title && <div className="error-message">{errors.title}</div>}
      </div>

      <div className="form-group">
        <label htmlFor="author">Penulis</label>
        <input
          type="text"
          id="author"
          name="author"
          value={formData.author}
          onChange={handleChange}
          className={errors.author ? 'error' : ''}
        />
        {errors.author && <div className="error-message">{errors.author}</div>}
      </div>

      <div className="form-group">
        <label htmlFor="status">Status</label>
        <select
          id="status"
          name="status"
          value={formData.status}
          onChange={handleChange}
          className={errors.status ? 'error' : ''}
        >
          <option value="owned">Dimiliki</option>
          <option value="reading">Sedang Dibaca</option>
          <option value="toBuy">Ingin Dibeli</option>
        </select>
        {errors.status && <div className="error-message">{errors.status}</div>}
      </div>

      <div className="form-group">
        <label htmlFor="description">Deskripsi (opsional)</label>
        <textarea
          id="description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          rows={4}
        />
      </div>

      <div className="form-actions">
        <button type="submit" className="btn btn-primary">
          {bookToEdit ? 'Simpan Data' : 'Input Buku Baru'}
        </button>
        {onClose && (
          <button type="button" className="btn btn-secondary" onClick={onClose}>
            Batal
          </button>
        )}
      </div>
    </form>
  );
};

BookForm.propTypes = {
  bookToEdit: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    author: PropTypes.string.isRequired,
    status: PropTypes.string.isRequired,
    description: PropTypes.string
  }),
  onClose: PropTypes.func
};

BookForm.defaultProps = {
  bookToEdit: null,
  onClose: null
};

export default BookForm;
