from abc import ABC, abstractmethod

# Abstraksi item perpustakaan
class KoleksiPerpustakaan(ABC):
    """
    Kelas abstrak sebagai dasar untuk semua item koleksi perpustakaan.
    """
    def __init__(self, kode_item: int, nama_item: str):
        self._kode_item = kode_item  # Protected attribute
        self._nama_item = nama_item  # Protected attribute

    @abstractmethod
    def info(self) -> str:
        """
        Method abstrak untuk menampilkan informasi item.
        Harus diimplementasikan oleh subclass.
        """
        pass

    @property
    def nama(self) -> str:
        """
        Property untuk mengakses nama item.
        """
        return self._nama_item

    @property
    def kode(self) -> int:
        """
        Property untuk mengakses kode item.
        """
        return self._kode_item


# Kelas Buku
class Buku(KoleksiPerpustakaan):
    """
    Kelas representasi buku dalam koleksi perpustakaan.
    """
    def __init__(self, kode_item: int, nama_item: str, penulis: str):
        super().__init__(kode_item, nama_item)
        self.__penulis = penulis  # Private attribute

    def info(self) -> str:
        """
        Menampilkan informasi detail buku.
        """
        return f"Buku => '{self._nama_item}' oleh {self.__penulis} [Kode: {self._kode_item}]"


# Kelas Majalah
class Majalah(KoleksiPerpustakaan):
    """
    Kelas representasi majalah dalam koleksi perpustakaan.
    """
    def __init__(self, kode_item: int, nama_item: str, edisi: str):
        super().__init__(kode_item, nama_item)
        self.__edisi = edisi  # Private attribute

    def info(self) -> str:
        """
        Menampilkan informasi detail majalah.
        """
        return f"Majalah => '{self._nama_item}', Edisi: {self.__edisi} [Kode: {self._kode_item}]"


# Sistem Manajemen Perpustakaan
class SistemPerpustakaan:
    """
    Kelas untuk mengelola koleksi perpustakaan.
    Menyediakan fitur untuk menambah, menampilkan, dan mencari koleksi.
    """
    def __init__(self, nama_perpustakaan: str = "Perpustakaan Umum"):
        self._daftar_koleksi = []  # List of KoleksiPerpustakaan
        self._nama = nama_perpustakaan

    def tambah_koleksi(self, item: KoleksiPerpustakaan):
        """
        Menambahkan item ke dalam koleksi perpustakaan.
        """
        if not isinstance(item, KoleksiPerpustakaan):
            raise ValueError("Item harus turunan dari KoleksiPerpustakaan.")
        self._daftar_koleksi.append(item)
        print(f"'{item.nama}' telah ditambahkan ke {self._nama}.")

    def tampilkan_koleksi(self):
        """
        Menampilkan semua koleksi yang tersedia di perpustakaan.
        """
        print(f"\nKoleksi di {self._nama}:")
        if not self._daftar_koleksi:
            print(" (Tidak ada koleksi yang tersedia.)")
        else:
            for idx, item in enumerate(self._daftar_koleksi, start=1):
                print(f"{idx}. {item.info()}")

    def cari_koleksi(self, query: str):
        """
        Mencari koleksi berdasarkan nama atau kode item.
        """
        hasil = [
            item for item in self._daftar_koleksi
            if query.lower() in item.nama.lower() or query == str(item.kode)
        ]
        print(f"\nPencarian untuk '{query}':")
        if hasil:
            for item in hasil:
                print(f"• {item.info()}")
        else:
            print("Tidak ditemukan koleksi yang sesuai.")


# Contoh Implementasi Program
def main():
    """
    Fungsi utama untuk menjalankan sistem perpustakaan.
    """
    perpustakaan = SistemPerpustakaan("Perpustakaan Digital")

    # Tambahkan koleksi awal
    koleksi_awal = [
        Buku(301, "Pemrograman Python Lanjut", "A. Pythonic"),
        Buku(302, "Struktur Data", "B. Algor"),
        Majalah(401, "Komputasi Modern", "Januari 2025"),
        Majalah(402, "AI & Data", "Februari 2025"),
    ]

    for item in koleksi_awal:
        perpustakaan.tambah_koleksi(item)

    # Tampilkan seluruh koleksi
    perpustakaan.tampilkan_koleksi()

    # Uji fitur pencarian
    perpustakaan.cari_koleksi("Data")
    perpustakaan.cari_koleksi("401")
    perpustakaan.cari_koleksi("Tidak Ada")


# Eksekusi jika dijalankan sebagai skrip
if __name__ == "__main__":
    main()