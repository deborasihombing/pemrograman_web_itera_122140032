import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import BookItem from './BookItem'; // Sesuaikan dengan path file
import { BookContext } from '../context/BookContext'; // Sesuaikan dengan path file
import { vi } from 'vitest';

vi.mock('../context/BookContext', () => ({
    BookContext: {
      Provider: ({ children }) => children,  // Simulasi Provider tanpa implementasi nyata
    },
    useBooks: () => ({
      deleteBook: vi.fn(),  // Mock fungsi deleteBook
    }),
  }));


describe('BookItem Component', () => {
  const bookMock = {
    id: '1',
    title: 'React for Beginners',
    author: 'John Doe',
    status: 'reading',
    description: 'A beginner-friendly guide to learning React.',
  };

  const mockOnEdit = vi.fn();

  beforeEach(() => {
    // Reset the mock before each test
    mockOnEdit.mockClear();
  });

  test('renders book details correctly', () => {
    render(
      <BookContext.Provider value={{ deleteBook: jest.fn() }}>
        <BookItem book={bookMock} onEdit={mockOnEdit} />
      </BookContext.Provider>
    );

    expect(screen.getByText(bookMock.title)).toBeInTheDocument();
    expect(screen.getByText(`Penulis: ${bookMock.author}`)).toBeInTheDocument();
    expect(screen.getByText('Dalam Proses Baca')).toBeInTheDocument(); // Status
    expect(screen.getByText(bookMock.description)).toBeInTheDocument();
  });

  test('calls onEdit when the edit button is clicked', () => {
    render(
      <BookContext.Provider value={{ deleteBook: jest.fn() }}>
        <BookItem book={bookMock} onEdit={mockOnEdit} />
      </BookContext.Provider>
    );

    fireEvent.click(screen.getByRole('button', { name: /edit/i }));
    expect(mockOnEdit).toHaveBeenCalledTimes(1);
  });

  test('shows delete confirmation when delete button is clicked', () => {
    render(
      <BookContext.Provider value={{ deleteBook: jest.fn() }}>
        <BookItem book={bookMock} onEdit={mockOnEdit} />
      </BookContext.Provider>
    );

    fireEvent.click(screen.getByRole('button', { name: /hapus/i }));
    expect(screen.getByText(/Anda yakin ingin menghapus buku/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /lanjutkan hapus/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /batalkan/i })).toBeInTheDocument();
  });

  test('calls deleteBook when confirmed', () => {
    const mockDeleteBook = jest.fn();

    render(
      <BookContext.Provider value={{ deleteBook: mockDeleteBook }}>
        <BookItem book={bookMock} onEdit={mockOnEdit} />
      </BookContext.Provider>
    );

    fireEvent.click(screen.getByRole('button', { name: /hapus/i }));
    fireEvent.click(screen.getByRole('button', { name: /lanjutkan hapus/i }));

    expect(mockDeleteBook).toHaveBeenCalledTimes(1);
    expect(mockDeleteBook).toHaveBeenCalledWith(bookMock.id);
  });

  test('does not call deleteBook when cancelled', () => {
    const mockDeleteBook = jest.fn();

    render(
      <BookContext.Provider value={{ deleteBook: mockDeleteBook }}>
        <BookItem book={bookMock} onEdit={mockOnEdit} />
      </BookContext.Provider>
    );

    fireEvent.click(screen.getByRole('button', { name: /hapus/i }));
    fireEvent.click(screen.getByRole('button', { name: /batalkan/i }));

    expect(mockDeleteBook).toHaveBeenCalledTimes(0);
  });

  test('applies the correct status class', () => {
    render(
      <BookContext.Provider value={{ deleteBook: jest.fn() }}>
        <BookItem book={bookMock} onEdit={mockOnEdit} />
      </BookContext.Provider>
    );

    const statusClass = screen.getByText('Dalam Proses Baca').parentElement.className;
    expect(statusClass).toContain('reading');
  });
});
