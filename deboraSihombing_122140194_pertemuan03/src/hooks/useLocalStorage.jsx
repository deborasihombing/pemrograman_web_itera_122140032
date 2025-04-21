import { useState, useEffect } from 'react';

/**
 * Custom hook untuk mengintegrasikan localStorage dengan state React
 * @param {string} key - Kunci untuk item di localStorage
 * @param {any} initialValue - Nilai awal jika tidak ada data di localStorage
 * @returns {Array} - [storedValue, setValue] pasangan state dan setter
 */
const useLocalStorage = (key, initialValue) => {
  // State untuk menyimpan nilai
  const [storedValue, setStoredValue] = useState(() => {
    try {
      // Mengambil dari localStorage berdasarkan key
      const item = window.localStorage.getItem(key);
      // Parse JSON jika item ada, atau kembalikan initialValue jika tidak ada
      return item !== null ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error(`Error membaca dari localStorage dengan key ${key}:`, error);
      return initialValue;
    }
  });

  // Fungsi untuk menyimpan nilai ke localStorage dan state
  const setValue = (value) => {
    try {
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      console.error(`Error menyimpan ke localStorage dengan key ${key}:`, error);
    }
  };

  // Efek untuk menyinkronkan ulang jika key berubah (bukan initialValue)
  useEffect(() => {
    try {
      const item = window.localStorage.getItem(key);
      if (item !== null) {
        setStoredValue(JSON.parse(item));
      }
    } catch (error) {
      console.error(`Error saat sinkronisasi dengan localStorage:`, error);
    }
  }, [key]); // <--- FIX: hanya tergantung pada 'key'

  return [storedValue, setValue];
};

export default useLocalStorage;
