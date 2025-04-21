import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import BookForm from './BookForm';
import { useBooks } from '../context/BookContext';

vi.mock('../context/BookContext');

describe('BookForm Component', () => {
  const mockAddBook = vi.fn();
  const mockEditBook = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
    useBooks.mockReturnValue({
      addBook: mockAddBook,
      editBook: mockEditBook,
    });
  });

  it('menampilkan form kosong saat tambah buku baru', () => {
    render(<BookForm />);

    expect(screen.getByLabelText(/Judul Buku/i)).toHaveValue('');
    expect(screen.getByLabelText(/Penulis/i)).toHaveValue('');
    expect(screen.getByLabelText(/Status/i)).toHaveValue('owned');
    expect(screen.getByLabelText(/Deskripsi/i)).toHaveValue('');
  });

  it('menampilkan data saat mengedit buku', () => {
    const book = {
      id: '1',
      title: 'Buku A',
      author: 'Penulis A',
      status: 'reading',
      description: 'Deskripsi buku'
    };

    render(<BookForm bookToEdit={book} />);

    expect(screen.getByLabelText(/Judul Buku/i)).toHaveValue(book.title);
    expect(screen.getByLabelText(/Penulis/i)).toHaveValue(book.author);
    expect(screen.getByLabelText(/Status/i)).toHaveValue(book.status);
    expect(screen.getByLabelText(/Deskripsi/i)).toHaveValue(book.description);
  });

  it('menampilkan error saat submit dengan input kosong', () => {
    render(<BookForm />);
    fireEvent.click(screen.getByRole('button', { name: /Input Buku Baru/i }));

    expect(screen.getByText(/Judul buku tidak boleh kosong/i)).toBeInTheDocument();
    expect(screen.getByText(/Penulis tidak boleh kosong/i)).toBeInTheDocument();
  });

  it('memanggil addBook saat form disubmit untuk buku baru', () => {
    render(<BookForm />);

    fireEvent.change(screen.getByLabelText(/Judul Buku/i), { target: { value: 'Buku Baru' } });
    fireEvent.change(screen.getByLabelText(/Penulis/i), { target: { value: 'Penulis Baru' } });
    fireEvent.click(screen.getByRole('button', { name: /Input Buku Baru/i }));

    expect(mockAddBook).toHaveBeenCalledWith(expect.objectContaining({
      title: 'Buku Baru',
      author: 'Penulis Baru',
      status: 'owned',
      description: ''
    }));
  });

  it('memanggil editBook saat form disubmit untuk buku yang sedang diedit', () => {
    const book = {
      id: '1',
      title: 'Buku Lama',
      author: 'Penulis Lama',
      status: 'toBuy',
      description: 'Catatan lama'
    };

    render(<BookForm bookToEdit={book} />);

    fireEvent.change(screen.getByLabelText(/Judul Buku/i), { target: { value: 'Judul Baru' } });
    fireEvent.click(screen.getByRole('button', { name: /Simpan Data/i }));

    expect(mockEditBook).toHaveBeenCalledWith(book.id, expect.objectContaining({
      title: 'Judul Baru',
      author: 'Penulis Lama', // Tidak diubah
      status: 'toBuy',
      description: 'Catatan lama'
    }));
  });

  it('memanggil onClose jika tersedia setelah submit', () => {
    const onCloseMock = vi.fn();

    render(<BookForm onClose={onCloseMock} />);

    fireEvent.change(screen.getByLabelText(/Judul Buku/i), { target: { value: 'Judul' } });
    fireEvent.change(screen.getByLabelText(/Penulis/i), { target: { value: 'Penulis' } });
    fireEvent.click(screen.getByRole('button', { name: /Input Buku Baru/i }));

    expect(onCloseMock).toHaveBeenCalled();
  });

  it('memanggil onClose saat tombol batal ditekan', () => {
    const onCloseMock = vi.fn();

    render(<BookForm onClose={onCloseMock} />);
    fireEvent.click(screen.getByRole('button', { name: /Batal/i }));

    expect(onCloseMock).toHaveBeenCalled();
  });
});
