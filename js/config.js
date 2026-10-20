/**
 * ============================================================================
 * KONFIGURASI FRONTEND BERSIH (@gas-pro-api & @gas-rahasia-script-properties R11)
 * ============================================================================
 * ATURAN EMAS KEAMANAN (R1 & R11):
 * - File ini HANYA boleh memuat URL endpoint Web App GAS (GAS_URL) dan Client ID
 *   publik Google OAuth 2.0.
 * - DILARANG KERAS menyimpan FONNTE_TOKEN, SESSION_SECRET, API Key, atau sandi
 *   di dalam kode frontend ini. Semua rahasia Kelas A berada di Script Properties.
 */
window.ETALASEKU_CONFIG = {
  // Ganti dengan URL Web App Google Apps Script Anda setelah deploy (New deployment -> Web app)
  GAS_URL: 'https://script.google.com/macros/s/AKfycby6ZQv5Ceq28arRaC58p9lMYSxW_FyxUuvUjUoQeamgJA57xCG7gDEKlKvLN6xW3y-Fkw/exec',

  // Client ID Publik Google OAuth 2.0 (Dapat disinkronkan otomatis via action=auth.config)
  GOOGLE_CLIENT_ID: '729708721412-rilm5s0sem2ml8ij1ng4eeltg6pbpv34.apps.googleusercontent.com',

  // Versi Aplikasi & Konfigurasi Cache Scale Turbo
  APP_VERSION: '2.6.0-TURBO',
  CACHE_TTL_MS: 5 * 60 * 1000, // 5 menit SWR LocalCache
  POLL_ACTIVE_MS: 15000,       // 15 detik saat user aktif (@gas-scale-turbo 4.3)
  POLL_IDLE_MS: 60000          // 60 detik saat user pasif
};
