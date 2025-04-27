# Program Penghitung BMI
berat = float(input("Masukkan berat badan (kg): "))
tinggi_cm = float(input("Masukkan tinggi badan (cm): "))
tinggi = tinggi_cm / 100

bmi = berat / (tinggi ** 2)

print(f"\nBMI Anda: {bmi:.2f}")

if bmi < 18.5:
    print("Kategori: Berat badan kurang")
elif 18.5 <= bmi < 25:
    print("Kategori: Berat badan normal")
elif 25 <= bmi < 30:
    print("Kategori: Berat badan berlebih")
else:
    print("Kategori: Obesitas")
