Debora's Library

## Deskripsi Aplikasi
Debora's Library adalah aplikasi manajemen koleksi buku pribadi yang memungkinkan pengguna untuk mengelola buku mereka dengan mudah. Aplikasi ini menyediakan fitur-fitur utama seperti pengelolaan buku (menambahkan, memperbarui, dan menghapus entri buku), pencarian dan penyaringan berdasarkan status buku, serta visualisasi statistik koleksi buku.

Fitur Utama:
Pengelolaan Buku: Menambahkan, memperbarui, dan menghapus buku.
Pencarian dan Penyaringan: Menelusuri buku berdasarkan judul atau penulis, dan menyaring koleksi berdasarkan status (dimiliki, sedang dibaca, ingin dibeli).
Visualisasi Statistik Koleksi: Menampilkan jumlah buku, grafik distribusi status, dan penulis yang paling sering muncul.

**Live Demo:** 

## Cara Instalasi & Menjalankan Aplikasi

Ikuti langkah-langkah berikut untuk menjalankan aplikasi secara lokal:

```bash
# 1. Clone repositori
git clone https://github.com/username/deboras-library.git

# 2. Masuk ke direktori project
cd deboras-library

# 3. Install dependencies
npm install

# 4. Jalankan server lokal
npm start

# 5. Buka di browser
http://localhost:3000

# 6. Menjalankan Testing
npm start
```

## Tampilan Antarmuka

### Halaman Utama (Daftar Buku)

Menampilkan seluruh buku yang telah ditambahkan dengan fitur pencarian dan filter status.
![Screenshot](./src/img/halamanUtama.png)

## Form Tambah/Edit Buku

Formulir untuk menambahkan atau memperbarui data buku.
![Screenshot](./src/img/halamanUtama.png)
![Screenshot](./src/img/halamanEdit.png)

## Statistik Koleksi Buku

Visualisasi statistik seperti jumlah buku berdasarkan status dan total penulis unik.
![Screenshot](./src/img/halamanStatistik.png)

## ⚙️ Penjelasan Fitur React yang Digunakan

## React Hooks:
useState: Mengatur state di dalam komponen fungsional.
useEffect: Digunakan untuk menyinkronkan data dengan localStorage dan melakukan filtering data.
useContext: Mempermudah akses terhadap nilai context dalam aplikasi.

## Context API:
BookContext: Menyediakan penyimpanan state terpusat untuk data buku di seluruh aplikasi.
useBooks: Hook kustom untuk mengakses data buku dari BookContext.

## Custom Hooks:
useLocalStorage: Hook untuk menyimpan data ke dalam localStorage sehingga data tetap tersedia meskipun aplikasi di-refresh.
useBookStats: Hook untuk menghitung dan mengembalikan statistik terkait koleksi buku (misalnya, distribusi status buku).

## React Router:
Digunakan untuk navigasi antar halaman (seperti antara halaman utama dan halaman statistik) tanpa melakukan reload seluruh halaman.

## Komentar dalam Kode
// Menggunakan useEffect untuk memuat data dari localStorage saat komponen pertama kali dirender
useEffect(() => {
  const storedBooks = JSON.parse(localStorage.getItem('books'));
  if (storedBooks) {
    setBooks(storedBooks);
  }
}, []);

## 🧪 Laporan Testing

Aplikasi telah diuji dengan melakukan pengujian berikut:

Unit Testing: Menggunakan Jest untuk menguji logika terkait pengelolaan buku (penambahan, penghapusan, pembaruan buku).

Contoh pengujian:
npm test

Pengujian Manual: Pengujian dilakukan pada setiap fitur aplikasi, termasuk pencarian buku, penyaringan berdasarkan status, dan visualisasi statistik, untuk memastikan bahwa semuanya berjalan dengan baik tanpa kesalahan.

## Identitas

Nama: Debora Sihombing
NIM: 122140032
Mata Kuliah: Pemrograman Web RB
