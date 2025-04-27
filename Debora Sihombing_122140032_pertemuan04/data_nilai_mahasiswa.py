# Pengelolaan Data Nilai Mahasiswa
mahasiswa = [
    {"nama": "Debora", "nim": "032", "nilai_uts": 70, "nilai_uas": 75, "nilai_tugas": 80},
    {"nama": "Joy", "nim": "124", "nilai_uts": 60, "nilai_uas": 65, "nilai_tugas": 70},
    {"nama": "Gabriella", "nim": "125", "nilai_uts": 90, "nilai_uas": 95, "nilai_tugas": 85},
    {"nama": "Dyo", "nim": "126", "nilai_uts": 50, "nilai_uas": 55, "nilai_tugas": 60},
    {"nama": "Andre", "nim": "127", "nilai_uts": 40, "nilai_uas": 45, "nilai_tugas": 50}
]

# Hitung nilai akhir dan grade untuk masing-masing mahasiswa
for mhs in mahasiswa:
    nilai_akhir = (0.3 * mhs["nilai_uts"] + 0.4 * mhs["nilai_uas"] + 0.3 * mhs["nilai_tugas"])
    mhs["nilai_akhir"] = nilai_akhir

    if nilai_akhir >= 80:
        grade = "A"
    elif nilai_akhir >= 70:
        grade = "B"
    elif nilai_akhir >= 60:
        grade = "C"
    elif nilai_akhir >= 50:
        grade = "D"
    else:
        grade = "E"
    
    mhs["grade"] = grade

# Urutkan mahasiswa berdasarkan nilai akhir dari tertinggi ke terendah
mahasiswa.sort(key=lambda x: x["nilai_akhir"], reverse=True)

# Tampilkan data
print("\nData Mahasiswa (Diurutkan dari Nilai Tertinggi ke Terendah):")
print("="*70)
print(f"{'Nama':<10} {'NIM':<10} {'UTS':<5} {'UAS':<5} {'Tugas':<7} {'Akhir':<7} {'Grade'}")
print("-"*70)

for mhs in mahasiswa:
    print(f"{mhs['nama']:<10} {mhs['nim']:<10} {mhs['nilai_uts']:<5} {mhs['nilai_uas']:<5} {mhs['nilai_tugas']:<7} {mhs['nilai_akhir']:<7.2f} {mhs['grade']}")

print("="*70)
print(f"Mahasiswa dengan nilai tertinggi: {mahasiswa[0]['nama']} ({mahasiswa[0]['nilai_akhir']:.2f})")
print(f"Mahasiswa dengan nilai terendah: {mahasiswa[-1]['nama']} ({mahasiswa[-1]['nilai_akhir']:.2f})")