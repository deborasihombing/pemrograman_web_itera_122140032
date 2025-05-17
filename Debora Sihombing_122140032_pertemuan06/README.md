# Sistem Manajemen Mata Kuliah - Pemrograman Web ITERA

## Deskripsi Proyek
Sistem Manajemen Mata Kuliah ini adalah aplikasi berbasis web yang dirancang untuk membantu pengelolaan data mata kuliah secara efisien dan terstruktur. Proyek ini dikembangkan sebagai bagian dari tugas kuliah Pemrograman Web di ITERA dengan tujuan memberikan solusi sederhana namun efektif dalam mengelola mata kuliah, dosen, dan jadwal perkuliahan.

## Fitur Utama
- Manajemen data mata kuliah (CRUD: Create, Read, Update, Delete)
- Pengelolaan dosen dan pengajar mata kuliah
- Penjadwalan kelas dan sesi perkuliahan
- Sistem autentikasi dan manajemen pengguna
- Penyimpanan data menggunakan SQLite untuk kemudahan setup dan portabilitas
- Testing unit untuk memastikan kualitas kode

## Instalasi
Pastikan Anda memiliki Python versi terbaru (minimal Python 3.7) dan `pip` terinstal di sistem Anda.

1. Clone repositori atau ekstrak file zip proyek ini:
    ```bash
    git clone <URL_REPOSITORY> 
    ```
    atau ekstrak file zip secara manual.

2. Masuk ke direktori proyek:
    ```bash
    cd manajemen_matakuliah
    ```

3. Buat dan aktifkan virtual environment (opsional tapi direkomendasikan):
    ```bash
    python -m venv env
    source env/bin/activate   # Linux/Mac
    env\Scripts\activate      # Windows
    ```

4. Install dependensi yang diperlukan:
    ```bash
    pip install -r requirements.txt
    ```

5. Jalankan aplikasi (sesuaikan dengan framework yang digunakan):
    ```bash
    python setup.py develop
    pserve development.ini --reload
    ```

## Penggunaan
Setelah aplikasi berjalan, akses melalui browser di alamat: http://localhost:6543


Anda dapat mulai menggunakan fitur manajemen mata kuliah, menambah data mata kuliah, dosen, dan mengatur jadwal.

## Struktur Proyek
manajemen_matakuliah/
├── init.py
├── models/ # Model database
├── views/ # Tampilan dan routing
├── tests/ # Unit testing
├── development.ini # Konfigurasi lingkungan development
├── production.ini # Konfigurasi lingkungan production
├── setup.py # Script instalasi dan setup
├── manajemen_matakuliah.sqlite # Database SQLite
└── README.md # Dokumentasi proyek


## Dependensi
- Python 3.7+
- Pyramid (atau framework web lain yang digunakan)
- SQLite
- pytest (untuk testing)
- Beberapa package lain sesuai `requirements.txt`

## Testing
Untuk menjalankan testing, gunakan perintah berikut:

```bash
pytest
