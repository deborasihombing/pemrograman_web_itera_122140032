// BookFilter.test.jsx
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import BookFilter from './BookFilter';
import { useBooks } from '../context/BookContext';

// Mock konteks BookContext
vi.mock('../context/BookContext');

describe('BookFilter Component', () => {
    const mockSetFilter = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
    useBooks.mockReturnValue({
      filter: 'all',
      setFilter: mockSetFilter,
    });
  });

  it('menampilkan semua opsi filter', () => {
    render(<BookFilter />);
    expect(screen.getByLabelText(/Perpustakaan Saya/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Koleksi Pribadi/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Dalam Proses Baca/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Wishlist/i)).toBeInTheDocument();
  });

  it('memilih opsi yang sesuai dengan nilai filter dari context', () => {
    useBooks.mockReturnValue({
      filter: 'reading',
      setFilter: mockSetFilter,
    });
    render(<BookFilter />);
    expect(screen.getByLabelText(/Dalam Proses Baca/i)).toBeChecked();
  });

  it('memanggil setFilter saat filter diubah', () => {
    render(<BookFilter />);
    const wishlistRadio = screen.getByLabelText(/Wishlist/i);
    fireEvent.click(wishlistRadio);
    expect(mockSetFilter).toHaveBeenCalledWith('toBuy');
  });
});
