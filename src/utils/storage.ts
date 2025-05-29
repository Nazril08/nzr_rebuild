"use client";

// Fungsi untuk menyimpan data ke localStorage
export const setStorageItem = (key: string, value: any) => {
  if (typeof window !== 'undefined') {
    localStorage.setItem(key, JSON.stringify(value));
  }
};

// Fungsi untuk mengambil data dari localStorage
export const getStorageItem = (key: string) => {
  if (typeof window !== 'undefined') {
    const data = localStorage.getItem(key);
    if (data) return JSON.parse(data);
  }
  return null;
};

// Fungsi untuk menghapus data dari localStorage
export const removeStorageItem = (key: string) => {
  if (typeof window !== 'undefined') {
    localStorage.removeItem(key);
  }
};

// Fungsi untuk memeriksa apakah data ada di localStorage
export const hasStorageItem = (key: string) => {
  if (typeof window !== 'undefined') {
    return localStorage.getItem(key) !== null;
  }
  return false;
};

// Fungsi untuk menyimpan data tabel
export const saveTableData = (tableId: string, data: any[]) => {
  setStorageItem(`table_${tableId}`, data);
};

// Fungsi untuk mengambil data tabel
export const getTableData = (tableId: string) => {
  return getStorageItem(`table_${tableId}`) || [];
};

// Fungsi untuk menyimpan pengaturan aplikasi
export const saveAppSettings = (settings: any) => {
  setStorageItem('app_settings', settings);
};

// Fungsi untuk mengambil pengaturan aplikasi
export const getAppSettings = () => {
  return getStorageItem('app_settings') || {
    theme: 'light',
    language: 'en',
    notifications: true
  };
};

// Fungsi untuk menyimpan data grafik
export const saveChartData = (chartId: string, data: any) => {
  setStorageItem(`chart_${chartId}`, data);
};

// Fungsi untuk mengambil data grafik
export const getChartData = (chartId: string) => {
  return getStorageItem(`chart_${chartId}`);
}; 