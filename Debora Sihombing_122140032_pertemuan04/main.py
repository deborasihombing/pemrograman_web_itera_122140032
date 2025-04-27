# main.py

# Cara 1: Impor seluruh modul
import math_operations as mo

# Cara 2: Impor fungsi spesifik
from math_operations import luas_lingkaran, celsius_ke_fahrenheit

print("=== Hasil Perhitungan Matematika ===")
print(f"Luas persegi (sisi=4): {mo.luas_persegi(4)}")
print(f"Keliling persegi (sisi=4): {mo.keliling_persegi(4)}")

print(f"Luas persegi panjang (5x3): {mo.luas_persegi_panjang(5, 3)}")
print(f"Keliling persegi panjang (5x3): {mo.keliling_persegi_panjang(5, 3)}")

print(f"Luas lingkaran (r=7): {luas_lingkaran(7)}")
print(f"Keliling lingkaran (r=7): {mo.keliling_lingkaran(7)}")

print("\n=== Konversi Suhu ===")
print(f"25°C ke Fahrenheit: {celsius_ke_fahrenheit(25):.2f}")
print(f"25°C ke Kelvin: {mo.celsius_ke_kelvin(25):.2f}")
