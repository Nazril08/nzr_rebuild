"use client";

import { getStorageItem, setStorageItem } from "./storage";

// Konstanta untuk superscale API
const SUPERSCALE_API_URL = "https://fastrestapis.fasturl.cloud/aiimage/superscale";
const RATE_LIMIT_MAX = 20; // Maksimal request dalam periode waktu
const RATE_LIMIT_PERIOD = 60 * 60 * 1000; // 1 jam dalam milidetik

// Tipe untuk menyimpan hasil superscale
interface SuperscaleResult {
  status: "success" | "error";
  imageUrl?: string;
  result?: string;
  timestamp: number;
  originalUrl: string;
  resize: number;
  anime: boolean;
  error?: string;
}

// Tipe untuk menyimpan informasi rate limit
interface RateLimitInfo {
  count: number;
  resetTime: number;
}

// Fungsi untuk mendapatkan informasi rate limit dari localStorage
export const getRateLimitInfo = (): RateLimitInfo => {
  const info = getStorageItem("superscale_rate_limit");
  if (!info) {
    return {
      count: 0,
      resetTime: Date.now() + RATE_LIMIT_PERIOD
    };
  }
  return info;
};

// Fungsi untuk memperbarui informasi rate limit
export const updateRateLimit = () => {
  const info = getRateLimitInfo();
  
  // Reset jika periode sudah berakhir
  if (Date.now() > info.resetTime) {
    const newInfo = {
      count: 1,
      resetTime: Date.now() + RATE_LIMIT_PERIOD
    };
    setStorageItem("superscale_rate_limit", newInfo);
    return newInfo;
  }
  
  // Tambah count jika masih dalam periode yang sama
  const newInfo = {
    count: info.count + 1,
    resetTime: info.resetTime
  };
  setStorageItem("superscale_rate_limit", newInfo);
  return newInfo;
};

// Fungsi untuk memeriksa apakah sudah mencapai rate limit
export const isRateLimited = (): boolean => {
  const info = getRateLimitInfo();
  
  // Reset jika periode sudah berakhir
  if (Date.now() > info.resetTime) {
    return false;
  }
  
  return info.count >= RATE_LIMIT_MAX;
};

// Fungsi untuk mendapatkan waktu reset rate limit dalam format yang mudah dibaca
export const getRateLimitResetTime = (): string => {
  const info = getRateLimitInfo();
  const remainingMs = Math.max(0, info.resetTime - Date.now());
  const remainingMinutes = Math.ceil(remainingMs / (60 * 1000));
  
  if (remainingMinutes <= 0) {
    return "sekarang";
  } else if (remainingMinutes === 1) {
    return "1 menit";
  } else {
    return `${remainingMinutes} menit`;
  }
};

// Fungsi untuk menyimpan hasil superscale ke localStorage
export const saveSupercaleResult = (result: SuperscaleResult) => {
  // Dapatkan history yang sudah ada
  const history = getStorageItem("superscale_history") || [];
  
  // Tambahkan hasil baru ke history
  const newHistory = [result, ...history];
  
  // Batasi history hanya menyimpan 10 item terakhir
  const limitedHistory = newHistory.slice(0, 10);
  
  // Simpan ke localStorage
  setStorageItem("superscale_history", limitedHistory);
};

// Fungsi untuk mendapatkan history superscale dari localStorage
export const getSupercaleHistory = (): SuperscaleResult[] => {
  return getStorageItem("superscale_history") || [];
};

// Fungsi untuk melakukan superscale pada gambar
export const superscaleImage = async (
  imageUrl: string,
  resize: number = 4,
  anime: boolean = false
): Promise<SuperscaleResult> => {
  try {
    // Cek rate limit
    if (isRateLimited()) {
      throw new Error(`Rate limit tercapai. Coba lagi dalam ${getRateLimitResetTime()}.`);
    }
    
    // Cek apakah gambar sudah pernah di-superscale dengan parameter yang sama
    const history = getSupercaleHistory();
    const cachedResult = history.find(
      item => 
        item.originalUrl === imageUrl && 
        item.resize === resize && 
        item.anime === anime
    );
    
    // Jika sudah ada di cache, kembalikan hasil yang sudah ada
    if (cachedResult) {
      return cachedResult;
    }
    
    // Perbarui rate limit
    updateRateLimit();
    
    // Buat URL untuk request
    const url = new URL(SUPERSCALE_API_URL);
    url.searchParams.append("imageUrl", imageUrl);
    url.searchParams.append("resize", resize.toString());
    url.searchParams.append("anime", anime.toString());
    
    // Lakukan request ke API
    const response = await fetch(url.toString());
    
    if (!response.ok) {
      throw new Error(`Error: ${response.status} ${response.statusText}`);
    }
    
    const data = await response.json();
    
    // Buat hasil
    const result: SuperscaleResult = {
      status: "success",
      result: data.result,
      imageUrl: data.result,
      timestamp: Date.now(),
      originalUrl: imageUrl,
      resize,
      anime
    };
    
    // Simpan hasil ke localStorage
    saveSupercaleResult(result);
    
    return result;
  } catch (error) {
    const errorResult: SuperscaleResult = {
      status: "error",
      error: error instanceof Error ? error.message : "Unknown error",
      timestamp: Date.now(),
      originalUrl: imageUrl,
      resize,
      anime
    };
    
    // Simpan error ke localStorage juga
    saveSupercaleResult(errorResult);
    
    return errorResult;
  }
}; 