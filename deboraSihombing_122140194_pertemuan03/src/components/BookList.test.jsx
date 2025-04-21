import { render, screen, fireEvent } from '@testing-library/react';
import { BookList } from '../components/BookList';
import { BookContextProvider } from '../context/BookContext';
import '@testing-library/jest-dom';

// Mock data untuk filteredBooks
const mockBooks = [
  { id: 1, title: 'Book 1', author: 'Author 1' },
  { id: 2, title: 'Book 2', author: 'Author 2' },
];

// Membungkus BookList dengan BookContextProvider untuk meniru penggunaan context
const renderWithContext = (filteredBooks) => {
  return render(
    <BookContextProvider value={{ filteredBooks }}>
      <BookList />
    </BookContextProvider>
  );
};

describe('BookList component', () => {
  it('should render a message when there are no books', () => {
    renderWithContext([]); // Menggunakan array kosong untuk meniru tidak ada buku
    
    const emptyMessage = screen.getByText('Tidak ada buku ditemukan');
    expect(emptyMessage).toBeInTheDocument();
  });

  it('should render a list of books', () => {
    renderWithContext(mockBooks);

    const bookItems = screen.getAllByRole('listitem'); // Mengambil semua item daftar buku
    expect(bookItems).toHaveLength(mockBooks.length);
  });

  it('should display the BookForm when editing a book', () => {
    renderWithContext(mockBooks);
    
    const editButton = screen.getAllByText('Edit')[0]; // Mengambil tombol edit pada buku pertama
    fireEvent.click(editButton); // Memicu klik pada tombol edit

    const form = screen.getByTestId('edit-form');
    expect(form).toBeInTheDocument(); // Memastikan form edit tampil
  });

  it('should close the edit form when the close button is clicked', () => {
    renderWithContext(mockBooks);
    
    const editButton = screen.getAllByText('Edit')[0];
    fireEvent.click(editButton);

    const closeButton = screen.getByText('Close'); // Gantilah sesuai dengan teks tombol close Anda
    fireEvent.click(closeButton);

    const form = screen.queryByTestId('edit-form');
    expect(form).not.toBeInTheDocument(); // Memastikan form edit ditutup
  });
});
