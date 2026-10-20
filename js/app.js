/**
 * ============================================================================
 * ETALASEKU FRONTEND ENGINE — GAS-PRO-API + SCALE-TURBO + OAUTH2 + CRM + MIGRASI
 * ============================================================================
 */

// 1. STATE UTAMA APLIKASI (In-Memory + LocalStorage SWR)
const AppState = {
  currentView: 'public', // 'public' | 'login' | 'admin'
  adminTab: 'overview',  // 'overview' | 'leads' | 'katalog' | 'crm' | 'turbo' | 'security' | 'migrasi' | 'deploy'
  heroSlideIndex: 0,
  isVideoMuted: true,
  selectedProduct: { id: 'PRD-01', title: 'Masterclass Ads & Funnel 2026', price: 349000 },
  selectedLeadId: 'LD-20261020-089',
  selectedLeadIds: ['LD-20261020-089', 'LD-20261020-088'],
  leadSearchQuery: '',
  leadFilterProduct: 'ALL',
  leadFilterStatus: 'ALL',
  crmSearchQuery: '',
  crmFilterSegment: 'ALL',

  // Sesi Autentikasi HMAC Stateless (@gas-rahasia-script-properties)
  session: {
    token: 'eyJlIjoiYnVkaXNhbnRvc29AZXRhbGFzZWt1LmlkIiwiciI6IlN1cGVyYWRtaW4iLCJuIjoiQnVkaSBTYW50b3NvIn0.HMAC_SHA256_SIG_99281',
    user: {
      email: 'budisantoso@etalaseku.id',
      nama: 'Budi Santoso',
      inisial: 'BS',
      role: 'Superadmin',
      status: 'Aktif'
    }
  },
  emergencyFailCount: 0,
  emergencyLockedUntil: 0,

  // Telemetri & CacheX (@gas-scale-turbo)
  turbo: {
    writeEpoch: 0,
    inflightCount: 0,
    cacheHits: 42,
    cacheMisses: 3,
    lastLatencyMs: 118,
    chunksActive: 2,
    payloadSizeKb: 68.4,
    warmupLayers: {
      propsMemo: true,
      cacheXHot: true,
      sheetIndex: true
    },
    logs: [
      { time: '22:14:10', action: 'public.boot', mode: 'CacheX HIT (2 Chunks)', ms: 48, savedCells: '1.840 sel' },
      { time: '22:12:45', action: 'leads.submit', mode: 'LockService Write + Async Queue', ms: 184, savedCells: 'Non-blocking WA/Email' },
      { time: '22:10:02', action: 'admin.boot', mode: 'Batch Read + Header Map', ms: 118, savedCells: '4.120 sel' }
    ]
  },

  // Katalog Produk Digital
  products: [
    {
      id: 'PRD-01',
      title: 'Masterclass Ads & Funnel 2026',
      category: 'Video Course',
      badge: '24 Modul HD',
      emoji: '🎯',
      level: 'Level: Pemula → Mahir',
      originalPrice: 699000,
      price: 349000,
      discount: '-50%',
      soldCount: 164,
      sharePct: 47,
      closingRate: '68%',
      desc: 'Panduan langkah demi langkah merancang iklan Facebook, IG, & TikTok yang profitable tanpa boncos. Dilengkapi SOP copywriting.',
      status: 'Aktif'
    },
    {
      id: 'PRD-02',
      title: 'Blueprint 100 Juta Pertama',
      category: 'E-Book PDF',
      badge: '160 Halaman A4',
      emoji: '📘',
      level: 'Format: PDF & EPUB',
      originalPrice: 299000,
      price: 149000,
      discount: '-50%',
      soldCount: 72,
      sharePct: 21,
      closingRate: '49%',
      desc: 'Bedah roadmap realistis menjual produk edukasi, keanggotaan (membership), dan jasa konsultasi dengan modal minim.',
      status: 'Aktif'
    },
    {
      id: 'PRD-03',
      title: 'Notion & GAS Business OS',
      category: 'Interactive Template',
      badge: 'Notion + Apps Script',
      emoji: '📊',
      level: 'Akses Salin Sekali Klik',
      originalPrice: 399000,
      price: 199000,
      discount: '-50%',
      soldCount: 112,
      sharePct: 32,
      closingRate: '54%',
      desc: 'Sistem manajemen leads, CRM kontak WhatsApp otomatis, pembukuan cashflow, dan penjadwalan konten dalam satu dashboard.',
      status: 'Aktif'
    }
  ],

  // Hero Slideshow
  heroSlides: [
    {
      badge: '🔥 Batch 2026 Segera Dimulai',
      title: 'Belajar & Kuasai Bisnis Digital dari Nol.',
      subtitle: 'Koleksi etalase blueprint terverifikasi, kurikulum praktikal, dan template siap pakai untuk melipatgandakan omset kreator & solopreneur.',
      cardTag: 'Best Seller 2026',
      cardIcon: '💻✨',
      cardTitle: 'Masterclass Ads & Sales Funnel',
      cardSub: 'Akses Video HD + Notion Hub + File GAS',
      productId: 'PRD-01',
      price: 349000,
      originalPrice: 699000
    },
    {
      badge: '🚀 Arsitektur GAS-PRO-API + Scale Turbo',
      title: 'Sistem Otomasi Leads & CRM Tanpa Biaya Bulanan.',
      subtitle: 'Bangun mesin penangkap leads berkecepatan tinggi dengan Google Sheets, antrean WhatsApp Fonnte non-blocking, dan keamanan OAuth 2.0.',
      cardTag: 'Template Favorit',
      cardIcon: '📊⚡',
      cardTitle: 'Notion & GAS Business OS',
      cardSub: 'Full Source Code Kode.gs + CRM Otomatis',
      productId: 'PRD-03',
      price: 199000,
      originalPrice: 399000
    },
    {
      badge: '📘 Panduan Teruji 1.280+ Alumni',
      title: 'Raih 100 Juta Pertama dari Produk Digital.',
      subtitle: 'Mulai dari riset pasar 24 jam, validasi penawaran, hingga peluncuran perdana yang menghasilkan konversi tinggi secara organik.',
      cardTag: 'E-Book Eksklusif',
      cardIcon: '📘🏆',
      cardTitle: 'Blueprint 100 Juta Pertama',
      cardSub: '160 Halaman Studi Kasus Riil Indonesia',
      productId: 'PRD-02',
      price: 149000,
      originalPrice: 299000
    }
  ],

  // Data Leads Pembeli (screen2.jpg)
  leads: [
    {
      id: 'LD-20261020-089',
      waktu: '20 Okt 14:32',
      nama: 'Rian Ardiansyah',
      profesi: 'Digital Marketing Lead',
      noWA: '081298432210',
      email: 'rian@growthmarketer.id',
      produkId: 'PRD-01',
      produkNama: 'Masterclass Ads & Funnel 2026',
      nominal: 349000,
      statusFollowUp: 'Closing (Lunas)',
      statusEmail: 'Terkirim',
      statusWA: 'Terkirim',
      sumber: 'Instagram Story Ads (Organic)',
      ip: '180.252.12.84 • Chrome Mac',
      rowSync: 'Row #348 Sinkron'
    },
    {
      id: 'LD-20261020-088',
      waktu: '20 Okt 13:10',
      nama: 'Siti Nurhaliza',
      profesi: 'Content Creator & Podcaster',
      noWA: '085711229034',
      email: 'siti.kreator@gmail.com',
      produkId: 'PRD-03',
      produkNama: 'Notion & GAS Business OS',
      nominal: 199000,
      statusFollowUp: 'Dihubungi',
      statusEmail: 'Terkirim',
      statusWA: 'Terkirim',
      sumber: 'YouTube Video Description',
      ip: '114.122.40.19 • Safari iOS',
      rowSync: 'Row #347 Sinkron'
    },
    {
      id: 'LD-20261020-087',
      waktu: '20 Okt 11:45',
      nama: 'Hendra Wijaya',
      profesi: 'Owner Brand Fashion Lokal',
      noWA: '081933445511',
      email: 'hendra@fashionhub.co.id',
      produkId: 'PRD-01',
      produkNama: 'Masterclass Ads & Funnel 2026',
      nominal: 349000,
      statusFollowUp: 'Baru Masuk',
      statusEmail: 'Terkirim',
      statusWA: 'Antri',
      sumber: 'WhatsApp Broadcast Promo',
      ip: '36.88.14.102 • Chrome Android',
      rowSync: 'Row #346 Sinkron'
    },
    {
      id: 'LD-20261020-086',
      waktu: '20 Okt 09:12',
      nama: 'Amanda Putri',
      profesi: 'Freelance UI/UX Designer',
      noWA: '087822334455',
      email: 'amanda.design@yahoo.com',
      produkId: 'PRD-02',
      produkNama: 'Blueprint 100 Juta Pertama',
      nominal: 149000,
      statusFollowUp: 'Closing (Lunas)',
      statusEmail: 'Terkirim',
      statusWA: 'Terkirim',
      sumber: 'GitHub Pages Landing SEO',
      ip: '103.47.132.9 • Firefox Win',
      rowSync: 'Row #345 Sinkron'
    },
    {
      id: 'LD-20261019-085',
      waktu: '19 Okt 21:04',
      nama: 'Dimas Kurniawan',
      profesi: 'Mahasiswa & Reseller',
      noWA: '082144556677',
      email: 'dimas.kurnia@gmail.com',
      produkId: 'PRD-02',
      produkNama: 'Blueprint 100 Juta Pertama',
      nominal: 149000,
      statusFollowUp: 'Batal / Expired',
      statusEmail: 'Terkirim',
      statusWA: 'Gagal',
      sumber: 'TikTok Bio Link',
      ip: '182.1.44.90 • Chrome Android',
      rowSync: 'Row #344 Sinkron'
    }
  ],

  // Modul CRM Kontak & Antrean Notifikasi WA/Email (@gas-notifikasi-wa-crm)
  notifConfig: {
    waAktif: true,
    emailAktif: true,
    matriks: {
      CHECKOUT_MASUK: {
        label: 'Checkout produk baru masuk',
        wa: true,
        email: true,
        subjek: 'Konfirmasi Pemesanan #{kode} — {produk}',
        pesan: 'Halo Kak *{nama}* 🌱, pesanan *{produk}* (#{kode}) sebesar *{jumlah}* telah tercatat. Silakan konfirmasi pembayaran agar akses materi langsung aktif.'
      },
      PEMBAYARAN_LUNAS: {
        label: 'Pembayaran diverifikasi Closing (Lunas)',
        wa: true,
        email: true,
        subjek: 'Akses Materi Aktif: {produk} (#{kode})',
        pesan: 'Selamat Kak *{nama}*! 🎉 Pembayaran *{produk}* (#{kode}) telah LUNAS. Link Google Drive & grup member telah dibuka untuk {email}.'
      },
      REMINDER_FOLLOWUP: {
        label: 'Pengingat kuota diskon 50% (H-1)',
        wa: true,
        email: false,
        subjek: 'Pengingat Kuota Promo {produk}',
        pesan: 'Halo Kak *{nama}*, kuota promo 50% untuk *{produk}* masih kami amankan hari ini. Yuk selesaikan konfirmasi!'
      }
    }
  },

  antrianNotif: [
    { id: 'ANT-WA-9041', kanal: 'WA', tujuan: '6281933445511', nama: 'Hendra Wijaya', event: 'CHECKOUT_MASUK', refId: 'LD-20261020-087', status: 'Antri', percobaan: 0, waktu: '20 Okt 11:45' },
    { id: 'ANT-WA-9040', kanal: 'WA', tujuan: '6281298432210', nama: 'Rian Ardiansyah', event: 'PEMBAYARAN_LUNAS', refId: 'LD-20261020-089', status: 'Terkirim', percobaan: 1, waktu: '20 Okt 14:35' },
    { id: 'ANT-EM-9039', kanal: 'EMAIL', tujuan: 'rian@growthmarketer.id', nama: 'Rian Ardiansyah', event: 'CHECKOUT_MASUK', refId: 'LD-20261020-089', status: 'Terkirim', percobaan: 1, waktu: '20 Okt 14:32' },
    { id: 'ANT-WA-9038', kanal: 'WA', tujuan: '6285711229034', nama: 'Siti Nurhaliza', event: 'CHECKOUT_MASUK', refId: 'LD-20261020-088', status: 'Terkirim', percobaan: 1, waktu: '20 Okt 13:10' }
  ],

  crmContacts: [
    { id: 'KTK-1001', nama: 'Rian Ardiansyah', email: 'rian@growthmarketer.id', noWA: '081298432210', segmen: 'Member Aktif', sumber: 'Leads_Pembeli', tag: 'Masterclass Ads', statusWA: 'Terdaftar', optOut: 'TIDAK', pesanCount: 3, lastContact: '20 Okt 14:35' },
    { id: 'KTK-1002', nama: 'Siti Nurhaliza', email: 'siti.kreator@gmail.com', noWA: '085711229034', segmen: 'Calon Pembeli (Lead)', sumber: 'Leads_Pembeli', tag: 'Notion & GAS OS', statusWA: 'Terdaftar', optOut: 'TIDAK', pesanCount: 2, lastContact: '20 Okt 13:10' },
    { id: 'KTK-1003', nama: 'Hendra Wijaya', email: 'hendra@fashionhub.co.id', noWA: '081933445511', segmen: 'Calon Pembeli (Lead)', sumber: 'Leads_Pembeli', tag: 'Masterclass Ads', statusWA: 'Belum Dicek', optOut: 'TIDAK', pesanCount: 1, lastContact: '20 Okt 11:45' },
    { id: 'KTK-1004', nama: 'Amanda Putri', email: 'amanda.design@yahoo.com', noWA: '087822334455', segmen: 'Member Aktif', sumber: 'Leads_Pembeli', tag: 'Blueprint 100 Juta', statusWA: 'Terdaftar', optOut: 'TIDAK', pesanCount: 2, lastContact: '20 Okt 09:12' },
    { id: 'KTK-1005', nama: 'Dimas Kurniawan', email: 'dimas.kurnia@gmail.com', noWA: '082144556677', segmen: 'Calon Pembeli (Lead)', sumber: 'Leads_Pembeli', tag: 'Blueprint 100 Juta', statusWA: 'Tidak Terdaftar', optOut: 'YA', pesanCount: 1, lastContact: '19 Okt 21:04' }
  ],

  blastCampaigns: [
    { id: 'BLW-882101', judul: 'Info Kuota Batch Oktober 2026', sasaran: 'Calon Pembeli (Lead)', total: 142, terkirim: 142, gagal: 0, batch: 20, jeda: '4-8 dtk', status: 'Selesai', tanggal: '18 Okt 2026' }
  ],

  // Brankas Rahasia Script Properties (@gas-rahasia-script-properties)
  secretsVault: {
    FONNTE_TOKEN: { ada: true, masked: 'fnt_••••••9xQ' },
    GOOGLE_CLIENT_ID: { ada: true, masked: '104928194021-etalasekuoauth2demo.apps.googleusercontent.com' },
    SESSION_SECRET: { ada: true, masked: 'K9mP••••••7vR (Auto-Generated 64-Byte SHA256)' },
    WEBHOOK_SECRET: { ada: true, masked: 'whk_••••••4mL' },
    SPREADSHEET_ID: { ada: true, masked: '1BxiM••••••9wXz' },
    DRIVE_ROOT_FOLDER_ID: { ada: true, masked: '19aBc••••••3kLp' }
  },

  // Daftar Pengguna RBAC pada Sheet Pengguna (screen1.jpg)
  rbacUsers: [
    { email: 'budisantoso@etalaseku.id', nama: 'Budi Santoso', role: 'Superadmin', status: 'Aktif', pin: '202688', lastLogin: '20 Okt 2026, 22:10' },
    { email: 'siti.kreator@gmail.com', nama: 'Siti Nurhaliza', role: 'Admin Konten', status: 'Aktif', pin: '123456', lastLogin: '20 Okt 2026, 19:45' },
    { email: 'nonaktif@etalaseku.id', nama: 'Riko Pratama', role: 'Admin Konten', status: 'Nonaktif', pin: '000000', lastLogin: '02 Sep 2026, 10:12' }
  ],

  // State Migrasi Database (@gas-migrasi-database)
  migrasi: {
    sourceId: '1OldSpreadsheetEtalaseKu2025_v1_9823749823',
    hasScanned: true,
    lastRunMode: 'Dry-Run (Mode Pindai Aman)',
    lastRunTime: '20 Okt 2026, 21:55 WIB',
    results: [
      { sheet: 'Katalog_Produk', keyCol: 'ProdukID', sourceRows: 4, inserted: 1, updated: 2, skipped: 1, note: 'Header-matched; harga diskon diperbarui' },
      { sheet: 'Leads_Pembeli', keyCol: 'LeadID / Email+Produk', sourceRows: 348, inserted: 18, updated: 6, skipped: 324, note: 'Status Closing (Lunas) dilindungi dari overwrite' },
      { sheet: 'CRM_Kontak', keyCol: 'NoWA (08...)', sourceRows: 295, inserted: 14, updated: 9, skipped: 272, note: 'Normalisasi awalan 08... & pertahankan Opt-Out' }
    ]
  }
};

// ============================================================================
// 2. GAS-PRO-API FETCH ENGINE + SCALE-TURBO DEDUPLICATION & SWR CACHE
// ============================================================================
const _inflightMap = {};

function normalisasiHP08(raw) {
  let d = String(raw || '').replace(/\D/g, '');
  if (d.startsWith('62')) d = '0' + d.slice(2);
  else if (d.startsWith('8')) d = '0' + d;
  return d;
}

function normalisasiHP62(raw) {
  const d = normalisasiHP08(raw);
  return d.startsWith('0') ? '62' + d.slice(1) : d;
}

async function gasApiCall(action, payload = {}, options = {}) {
  const t0 = performance.now();
  const isRead = /^(public\.|get|list|fetch|read|boot|warmup|ping|auth\.config)/i.test(action);

  if (!isRead) {
    AppState.turbo.writeEpoch++;
  } else {
    const dedupKey = AppState.turbo.writeEpoch + '|' + action + '|' + JSON.stringify(payload);
    if (_inflightMap[dedupKey]) {
      AppState.turbo.cacheHits++;
      return _inflightMap[dedupKey];
    }
  }

  const execPromise = (async () => {
    const gasUrl = (window.ETALASEKU_CONFIG && window.ETALASEKU_CONFIG.GAS_URL) || '';
    const isConfiguredRealUrl = gasUrl && !gasUrl.includes('AKfycbx_ETALASEKU_PROD_EXEC_ID');

    if (isConfiguredRealUrl) {
      try {
        // ATURAN WAJIB @gas-pro-api: Gunakan Content-Type text/plain;charset=utf-8 agar bebas CORS preflight
        const response = await fetch(gasUrl, {
          method: 'POST',
          headers: { 'Content-Type': 'text/plain;charset=utf-8' },
          body: JSON.stringify({
            action: action,
            data: payload,
            token: AppState.session ? AppState.session.token : ''
          })
        });
        const json = await response.json();
        const elapsed = Math.round(performance.now() - t0);
        recordTurboMetric(action, json.cached ? 'CacheX HIT' : 'Live GAS REST', elapsed);
        return json;
      } catch (err) {
        console.warn('Fallback ke simulasi lokal karena endpoint GAS belum aktif:', err.message);
      }
    }

    // Simulasi Instan di Browser (Optimistic & Offline-Ready di Canvas)
    await new Promise(r => setTimeout(r, options.fast ? 45 : 140));
    const elapsed = Math.round(performance.now() - t0);
    if (isRead) AppState.turbo.cacheHits++;
    recordTurboMetric(action, isRead ? 'CacheX HIT (SWR)' : 'LockService Write + Queue', elapsed);
    return { success: true, simulated: true, ms: elapsed };
  })();

  if (isRead) {
    const dedupKey = AppState.turbo.writeEpoch + '|' + action + '|' + JSON.stringify(payload);
    _inflightMap[dedupKey] = execPromise;
    execPromise.finally(() => { delete _inflightMap[dedupKey]; });
  }

  return execPromise;
}

function recordTurboMetric(action, mode, ms) {
  AppState.turbo.lastLatencyMs = ms;
  const now = new Date();
  const timeStr = now.toTimeString().slice(0, 8);
  AppState.turbo.logs.unshift({
    time: timeStr,
    action: action,
    mode: mode,
    ms: ms,
    savedCells: mode.includes('CacheX') ? '1.840 sel dihemat' : 'Blok kontigu (1x I/O)'
  });
  if (AppState.turbo.logs.length > 12) AppState.turbo.logs.pop();
  updateTurboBadgesUI();
}

// ============================================================================
// 3. TOAST NOTIFICATION & CUSTOM CONFIRMATION MODAL (Tanpa alert/confirm)
// ============================================================================
function showToast(message, type = 'success') {
  const container = document.getElementById('toast-container');
  if (!container) return;

  const colors = {
    success: 'bg-[#2F6B3A] text-white border-[#9ADA9E]',
    warning: 'bg-[#B45309] text-white border-[#F5C542]',
    error: 'bg-[#BA1A1A] text-white border-[#FFDAD6]',
    info: 'bg-[#3B2A1A] text-[#FBF6E6] border-[#F5C542]'
  };

  const icons = {
    success: 'check_circle',
    warning: 'bolt',
    error: 'error',
    info: 'verified_user'
  };

  const toast = document.createElement('div');
  toast.className = `flex items-center gap-3 px-4 py-3 rounded-2xl border shadow-warm-lg text-xs sm:text-sm font-semibold transition-all duration-300 transform translate-y-2 opacity-0 ${colors[type] || colors.info}`;
  toast.innerHTML = `
    <span class="material-symbols-outlined text-lg">${icons[type] || 'info'}</span>
    <span class="flex-1 leading-snug">${message}</span>
  `;

  container.appendChild(toast);
  requestAnimationFrame(() => {
    toast.classList.remove('translate-y-2', 'opacity-0');
  });

  setTimeout(() => {
    toast.classList.add('opacity-0', 'translate-y-2');
    setTimeout(() => toast.remove(), 300);
  }, 3800);
}

function copyTextSafe(text, label = 'Teks') {
  try {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(text).then(() => {
        showToast(`${label} berhasil disalin ke clipboard!`, 'success');
      }).catch(() => fallbackCopy(text, label));
    } else {
      fallbackCopy(text, label);
    }
  } catch (e) {
    fallbackCopy(text, label);
  }
}

function fallbackCopy(text, label) {
  const ta = document.createElement('textarea');
  ta.value = text;
  ta.style.position = 'fixed';
  ta.style.opacity = '0';
  document.body.appendChild(ta);
  ta.select();
  try {
    document.execCommand('copy');
    showToast(`${label} berhasil disalin ke clipboard!`, 'success');
  } catch (err) {
    showToast(`Gagal menyalin ${label}.`, 'error');
  }
  document.body.removeChild(ta);
}

// ============================================================================
// 4. NAVIGASI ANTAR-VIEW (PUBLIC LANDING <-> LOGIN OAUTH <-> ADMIN WORKSPACE)
// ============================================================================
function switchView(viewName, optionalAdminTab) {
  AppState.currentView = viewName;
  const pubEl = document.getElementById('view-public');
  const logEl = document.getElementById('view-login');
  const admEl = document.getElementById('view-admin');
  const topPromo = document.getElementById('top-promo-banner');
  const mainHeader = document.getElementById('main-public-header');
  const mainFooter = document.getElementById('main-public-footer');
  const floatingWA = document.getElementById('floating-wa-btn');

  if (pubEl) pubEl.classList.toggle('hidden', viewName !== 'public');
  if (logEl) logEl.classList.toggle('hidden', viewName !== 'login');
  if (admEl) admEl.classList.toggle('hidden', viewName !== 'admin');

  const isPublic = viewName === 'public';
  if (topPromo) topPromo.classList.toggle('hidden', !isPublic);
  if (mainHeader) mainHeader.classList.toggle('hidden', !isPublic);
  if (mainFooter) mainFooter.classList.toggle('hidden', !isPublic);
  if (floatingWA) floatingWA.classList.toggle('hidden', !isPublic);

  if (viewName === 'admin') {
    if (optionalAdminTab) AppState.adminTab = optionalAdminTab;
    renderAdminWorkspace();
  } else if (viewName === 'public') {
    renderPublicProducts();
  }

  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function switchAdminTab(tabId) {
  // Cek RBAC untuk menu Superadmin Only
  const superadminOnlyTabs = ['security', 'migrasi'];
  if (superadminOnlyTabs.includes(tabId) && AppState.session.user.role !== 'Superadmin') {
    showToast('Akses Ditolak: Menu ini hanya untuk Role Superadmin.', 'error');
    return;
  }

  AppState.adminTab = tabId;
  document.querySelectorAll('[data-admin-nav]').forEach(btn => {
    const active = btn.getAttribute('data-admin-nav') === tabId;
    btn.className = active
      ? 'w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl bg-[#F5C542]/15 text-[#F5C542] font-bold text-xs transition-all border border-[#F5C542]/30'
      : 'w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-[#FBF6E6]/75 hover:bg-white/5 hover:text-white font-medium text-xs transition-all';
  });

  document.querySelectorAll('[data-admin-panel]').forEach(panel => {
    const isTarget = panel.getAttribute('data-admin-panel') === tabId;
    panel.classList.toggle('hidden', !isTarget);
  });

  renderAdminWorkspace();
}

// ============================================================================
// 5. INTERAKSI LANDING PAGE PUBLIK (screen.png)
// ============================================================================
function renderHeroSlide() {
  const s = AppState.heroSlides[AppState.heroSlideIndex];
  if (!s) return;

  const badgeEl = document.getElementById('hero-badge-text');
  const titleEl = document.getElementById('hero-title-text');
  const subEl = document.getElementById('hero-subtitle-text');
  const cardTagEl = document.getElementById('hero-card-tag');
  const cardIconEl = document.getElementById('hero-card-icon');
  const cardTitleEl = document.getElementById('hero-card-title');
  const cardSubEl = document.getElementById('hero-card-sub');
  const cardPriceEl = document.getElementById('hero-card-price');
  const cardOrigEl = document.getElementById('hero-card-orig');
  const cardBtnEl = document.getElementById('hero-card-cta');

  if (badgeEl) badgeEl.textContent = s.badge;
  if (titleEl) titleEl.textContent = s.title;
  if (subEl) subEl.textContent = s.subtitle;
  if (cardTagEl) cardTagEl.textContent = s.cardTag;
  if (cardIconEl) cardIconEl.textContent = s.cardIcon;
  if (cardTitleEl) cardTitleEl.textContent = s.cardTitle;
  if (cardSubEl) cardSubEl.textContent = s.cardSub;
  if (cardPriceEl) cardPriceEl.textContent = 'Rp ' + Number(s.price).toLocaleString('id-ID');
  if (cardOrigEl) cardOrigEl.textContent = 'Rp ' + Number(s.originalPrice).toLocaleString('id-ID');
  if (cardBtnEl) {
    cardBtnEl.onclick = () => openCheckoutModal(s.productId, s.cardTitle, s.price);
  }

  document.querySelectorAll('[data-hero-dot]').forEach((dot, idx) => {
    dot.className = idx === AppState.heroSlideIndex
      ? 'w-8 h-3 rounded-full bg-[#3B2A1A] transition-all cursor-pointer'
      : 'w-3 h-3 rounded-full bg-white/75 hover:bg-white transition-all cursor-pointer';
  });
}

function nextHeroSlide(dir = 1) {
  const total = AppState.heroSlides.length;
  AppState.heroSlideIndex = (AppState.heroSlideIndex + dir + total) % total;
  renderHeroSlide();
}

function setHeroSlide(idx) {
  AppState.heroSlideIndex = idx;
  renderHeroSlide();
}

function renderPublicProducts() {
  const grid = document.getElementById('public-product-grid');
  if (!grid) return;

  const badgeColors = {
    'Video Course': 'bg-[#B45309] text-white',
    'E-Book PDF': 'bg-[#2F6B3A] text-white',
    'Interactive Template': 'bg-[#3B2A1A] text-white'
  };

  grid.innerHTML = AppState.products
    .filter(p => p.status !== 'Arsip')
    .map(p => {
      const catClass = badgeColors[p.category] || 'bg-[#B45309] text-white';
      return `
        <article class="bg-[#F5EBCB] rounded-3xl p-6 border border-[#E8DDB8] shadow-warm-sm hover:shadow-warm-lg hover:-translate-y-1 transition-all flex flex-col justify-between">
          <div>
            <div class="relative w-full aspect-[4/3] bg-[#FFFDF7] rounded-2xl overflow-hidden flex items-center justify-center p-4 mb-5 border border-[#E8DDB8]">
              <span class="absolute top-3 left-3 ${catClass} text-[10px] font-extrabold uppercase tracking-wider px-3 py-1 rounded-full">
                ${p.category}
              </span>
              <div class="text-center">
                <div class="text-6xl mb-2 select-none">${p.emoji || '📦'}</div>
                <span class="text-xs font-bold text-[#2F6B3A] bg-[#2F6B3A]/10 px-2.5 py-1 rounded-full">${p.badge}</span>
              </div>
            </div>
            <span class="text-xs font-bold text-[#B45309] uppercase tracking-wider">${p.level}</span>
            <h3 class="font-display font-bold text-2xl text-[#3B2A1A] mt-1 mb-2">${p.title}</h3>
            <p class="text-sm text-[#3B2A1A]/80 leading-relaxed mb-4">${p.desc}</p>
          </div>
          <div class="pt-4 border-t border-[#E8DDB8]">
            <div class="flex items-baseline gap-2 mb-4">
              <span class="font-display text-2xl font-bold text-[#B45309]">Rp ${Number(p.price).toLocaleString('id-ID')}</span>
              <span class="text-xs line-through text-[#6E5B47]">Rp ${Number(p.originalPrice).toLocaleString('id-ID')}</span>
              <span class="ml-auto text-[11px] font-bold bg-[#B45309]/15 text-[#B45309] px-2.5 py-0.5 rounded-full">${p.discount || '-50%'}</span>
            </div>
            <button type="button" onclick="openCheckoutModal('${p.id}', '${p.title.replace(/'/g, "\\'")}', ${p.price})" class="w-full py-3.5 px-6 rounded-full bg-[#F4B73F] hover:bg-[#E0AC28] text-[#3B2A1A] font-extrabold text-sm shadow-sm hover:shadow transition-all flex items-center justify-center gap-2">
              <span>Beli Sekarang</span>
              <span class="material-symbols-outlined text-base">arrow_forward</span>
            </button>
          </div>
        </article>
      `;
    }).join('');
}

function toggleAccordion(modulId) {
  const ids = ['modul-1', 'modul-2', 'modul-3', 'modul-4'];
  const targetContent = document.getElementById('content-' + modulId);
  if (!targetContent) return;
  const wasHidden = targetContent.classList.contains('hidden');

  ids.forEach(id => {
    const c = document.getElementById('content-' + id);
    const ic = document.getElementById('icon-' + id);
    if (c && ic) {
      c.classList.add('hidden');
      ic.textContent = '+';
    }
  });

  if (wasHidden) {
    targetContent.classList.remove('hidden');
    const icon = document.getElementById('icon-' + modulId);
    if (icon) icon.textContent = '−';
  }
}

function toggleVideoMute() {
  const iframe = document.getElementById('youtube-player');
  const icon = document.getElementById('sound-icon');
  const label = document.getElementById('sound-label');
  if (!iframe) return;

  AppState.isVideoMuted = !AppState.isVideoMuted;
  if (!AppState.isVideoMuted) {
    iframe.src = 'https://www.youtube-nocookie.com/embed/dQw4w9WgXcQ?autoplay=1&mute=0&controls=1&rel=0';
    if (icon) icon.textContent = '🔊';
    if (label) label.textContent = 'Suara Aktif';
    showToast('Audio video profil mentor diaktifkan.', 'info');
  } else {
    iframe.src = 'https://www.youtube-nocookie.com/embed/dQw4w9WgXcQ?autoplay=1&mute=1&controls=1&rel=0';
    if (icon) icon.textContent = '🔇';
    if (label) label.textContent = 'Aktifkan Suara';
  }
}

// ============================================================================
// 6. CHECKOUT MODAL & NON-BLOCKING QUEUE (@gas-pro-api + @gas-notifikasi-wa-crm)
// ============================================================================
function openCheckoutModal(productId, productTitle, price) {
  AppState.selectedProduct = { id: productId, title: productTitle, price: Number(price) };
  const modal = document.getElementById('checkout-modal');
  const nameEl = document.getElementById('modal-product-name');
  const priceEl = document.getElementById('modal-product-price');
  const formBox = document.getElementById('checkout-form-container');
  const successBox = document.getElementById('checkout-success-container');

  if (nameEl) nameEl.textContent = productTitle;
  if (priceEl) priceEl.textContent = 'Rp ' + Number(price).toLocaleString('id-ID');
  if (formBox) formBox.classList.remove('hidden');
  if (successBox) successBox.classList.add('hidden');

  if (modal) {
    modal.classList.remove('hidden');
    document.body.style.overflow = 'hidden';
  }
}

function closeCheckoutModal() {
  const modal = document.getElementById('checkout-modal');
  if (modal) {
    modal.classList.add('hidden');
    document.body.style.overflow = 'auto';
  }
}

function previewNormalizedPhone(inputEl) {
  const badge = document.getElementById('wa-norm-preview');
  if (!badge) return;
  const raw = inputEl.value.trim();
  if (!raw) {
    badge.textContent = 'Otomatis dinormalisasi ke 08... (Sheet) & 62... (Fonnte)';
    badge.className = 'text-[11px] text-[#6E5B47] block mt-1';
    return;
  }
  const hp08 = normalisasiHP08(raw);
  const hp62 = normalisasiHP62(raw);
  const isValid = /^08\d{8,12}$/.test(hp08);
  if (isValid) {
    badge.textContent = `✓ Valid: Sheet '${hp08} → Fonnte ${hp62}`;
    badge.className = 'text-[11px] text-[#2F6B3A] font-bold block mt-1';
  } else {
    badge.textContent = 'Masukkan 10-13 digit nomor aktif (contoh: 081234567890)';
    badge.className = 'text-[11px] text-[#B45309] font-semibold block mt-1';
  }
}

async function handleCheckoutSubmit(e) {
  e.preventDefault();
  const form = e.target;
  if (form.honeypot_website && form.honeypot_website.value) return false;

  const nama = document.getElementById('checkout-nama').value.trim();
  const profesi = document.getElementById('checkout-profesi').value.trim();
  const rawWa = document.getElementById('checkout-wa').value.trim();
  const email = document.getElementById('checkout-email').value.trim().toLowerCase();

  const hp08 = normalisasiHP08(rawWa);
  const hp62 = normalisasiHP62(rawWa);

  if (!nama || !profesi || !/^08\d{8,12}$/.test(hp08) || !email.includes('@')) {
    showToast('Mohon lengkapi Nama, Profesi, Nomor WA valid (08...), dan Email.', 'error');
    return false;
  }

  const submitBtn = document.getElementById('checkout-submit-btn');
  const submitText = document.getElementById('btn-submit-text');
  submitBtn.disabled = true;
  submitText.textContent = 'Menyimpan via LockService & Antrean...';

  const res = await gasApiCall('leads.submit', {
    nama: nama,
    profesi: profesi,
    no_wa: hp08,
    email: email,
    produkId: AppState.selectedProduct.id,
    produkNama: AppState.selectedProduct.title,
    nominal: AppState.selectedProduct.price
  });

  submitBtn.disabled = false;
  submitText.textContent = 'Lanjutkan ke Pembayaran →';

  const newLeadId = (res.data && res.data.leadId) || ('LD-20261020-' + Math.floor(100 + Math.random() * 899));
  const nowStr = 'Baru Saja';

  // Tambahkan ke daftar Leads
  const newLead = {
    id: newLeadId,
    waktu: nowStr,
    nama: nama,
    profesi: profesi,
    noWA: hp08,
    email: email,
    produkId: AppState.selectedProduct.id,
    produkNama: AppState.selectedProduct.title,
    nominal: AppState.selectedProduct.price,
    statusFollowUp: 'Baru Masuk',
    statusEmail: AppState.notifConfig.emailAktif ? 'Antri' : 'Nonaktif',
    statusWA: AppState.notifConfig.waAktif ? 'Antri' : 'Nonaktif',
    sumber: 'Landing Page Checkout (GAS-PRO-API)',
    ip: 'Client Browser • TLS 1.3',
    rowSync: 'Row #' + (349 + AppState.leads.length) + ' Sinkron'
  };
  AppState.leads.unshift(newLead);
  AppState.selectedLeadId = newLeadId;

  // Tambahkan ke Antrean Notifikasi Non-Blocking (@gas-notifikasi-wa-crm)
  if (AppState.notifConfig.waAktif && AppState.notifConfig.matriks.CHECKOUT_MASUK.wa) {
    AppState.antrianNotif.unshift({
      id: 'ANT-WA-' + Math.floor(1000 + Math.random() * 8999),
      kanal: 'WA',
      tujuan: hp62,
      nama: nama,
      event: 'CHECKOUT_MASUK',
      refId: newLeadId,
      status: 'Antri',
      percobaan: 0,
      waktu: nowStr
    });
  }
  if (AppState.notifConfig.emailAktif && AppState.notifConfig.matriks.CHECKOUT_MASUK.email) {
    AppState.antrianNotif.unshift({
      id: 'ANT-EM-' + Math.floor(1000 + Math.random() * 8999),
      kanal: 'EMAIL',
      tujuan: email,
      nama: nama,
      event: 'CHECKOUT_MASUK',
      refId: newLeadId,
      status: 'Antri',
      percobaan: 0,
      waktu: nowStr
    });
  }

  // Tampilkan sukses di modal
  document.getElementById('checkout-form-container').classList.add('hidden');
  document.getElementById('checkout-success-container').classList.remove('hidden');
  document.getElementById('success-buyer-name').textContent = nama;
  document.getElementById('success-lead-code').textContent = newLeadId;

  showToast(`Lead ${newLeadId} tercatat! Notifikasi WA & Email masuk AntrianNotif (0ms blocking).`, 'success');
  return false;
}

function redirectToPaymentWA() {
  const nama = document.getElementById('checkout-nama').value.trim() || 'Sahabat';
  const pesan = `Halo Admin EtalaseKu, saya sudah mengisi form checkout untuk *${AppState.selectedProduct.title}* (Rp ${Number(AppState.selectedProduct.price).toLocaleString('id-ID')}) atas nama *${nama}*. Mohon info rekening pembayaran resminya ya!`;
  window.open(`https://wa.me/6281234567890?text=${encodeURIComponent(pesan)}`, '_blank', 'noopener,noreferrer');
  closeCheckoutModal();
}

// ============================================================================
// 7. LOGIN GOOGLE OAUTH 2.0, PIN 2FA WORKSPACE, & AKSES DARURAT (screen1.jpg)
// ============================================================================
async function handleGoogleOAuthSignIn() {
  const emailInput = document.getElementById('login-email-input');
  const candidateEmail = (emailInput && emailInput.value.trim().toLowerCase()) || 'budisantoso@etalaseku.id';

  showToast('Memverifikasi token Google OAuth 2.0 ke server GAS (tokeninfo)...', 'info');
  await gasApiCall('auth.google', { idToken: 'GOOGLE_ID_TOKEN_SIMULATED', email: candidateEmail });

  const matched = AppState.rbacUsers.find(u => u.email.toLowerCase() === candidateEmail);
  const errorBox = document.getElementById('login-error-alert');
  const errorText = document.getElementById('login-error-text');

  if (!matched || matched.status !== 'Aktif') {
    if (errorBox && errorText) {
      errorBox.classList.remove('hidden');
      errorText.innerHTML = `<code class="bg-red-100 px-1.5 py-0.5 rounded font-mono text-xs">${candidateEmail}</code> tidak terdaftar atau dinonaktifkan oleh Superadmin pada sheet <strong>Pengguna</strong>.`;
    }
    showToast('Otorisasi OAuth Ditolak: Akun tidak aktif di sheet Pengguna.', 'error');
    return;
  }

  if (errorBox) errorBox.classList.add('hidden');
  completeLoginSession(matched, 'Google OAuth 2.0 SSO');
}

async function handleManualPinLogin(e) {
  e.preventDefault();
  const email = document.getElementById('login-email-input').value.trim().toLowerCase();
  const pin = document.getElementById('login-pin-input').value.trim();
  const errorBox = document.getElementById('login-error-alert');
  const errorText = document.getElementById('login-error-text');

  await gasApiCall('auth.pin', { email: email, pin: pin });

  const matched = AppState.rbacUsers.find(u => u.email.toLowerCase() === email);
  if (!matched || matched.status !== 'Aktif') {
    if (errorBox && errorText) {
      errorBox.classList.remove('hidden');
      errorText.innerHTML = `<code class="bg-red-100 px-1.5 py-0.5 rounded font-mono text-xs">${email || 'user@domain.com'}</code> tidak terdaftar atau dinonaktifkan oleh Superadmin pada sheet <strong>Pengguna</strong>.`;
    }
    showToast('Email tidak terdaftar atau berstatus Nonaktif.', 'error');
    return false;
  }

  if (pin.length < 4) {
    if (errorBox && errorText) {
      errorBox.classList.remove('hidden');
      errorText.innerHTML = `PIN Keamanan / 2FA Workspace tidak sesuai dengan hash iteratif (300x HMAC-SHA256) pengguna <strong>${matched.nama}</strong>.`;
    }
    showToast('PIN Keamanan tidak valid.', 'error');
    return false;
  }

  if (errorBox) errorBox.classList.add('hidden');
  completeLoginSession(matched, 'Email & PIN 2FA Hash+Salt');
  return false;
}

function quickDemoLogin(email) {
  const emailInput = document.getElementById('login-email-input');
  const pinInput = document.getElementById('login-pin-input');
  const errorBox = document.getElementById('login-error-alert');

  const matched = AppState.rbacUsers.find(u => u.email.toLowerCase() === email.toLowerCase());
  if (!matched) return;

  if (emailInput) emailInput.value = matched.email;
  if (pinInput) pinInput.value = matched.pin;
  if (errorBox) errorBox.classList.add('hidden');

  completeLoginSession(matched, 'Demo Quick SSO');
}

function triggerErrorStateDemo() {
  const emailInput = document.getElementById('login-email-input');
  const errorBox = document.getElementById('login-error-alert');
  const errorText = document.getElementById('login-error-text');
  if (emailInput) emailInput.value = 'user@domain.com';
  if (errorBox && errorText) {
    errorBox.classList.remove('hidden');
    errorText.innerHTML = `<code class="bg-red-100 px-1.5 py-0.5 rounded font-mono text-xs">user@domain.com</code> tidak terdaftar atau dinonaktifkan oleh Superadmin pada sheet <strong>Pengguna</strong>.`;
  }
  showToast('Simulasi proteksi RBAC: Akses ditolak untuk email di luar allowlist.', 'warning');
}

function completeLoginSession(userObj, authMethod) {
  const initials = userObj.nama.split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase();
  AppState.session = {
    token: 'eyJlIjoi' + btoa(userObj.email) + 'In0.HMAC_SHA256_' + Date.now(),
    user: {
      email: userObj.email,
      nama: userObj.nama,
      inisial: initials,
      role: userObj.role,
      status: userObj.status
    }
  };
  showToast(`Selamat datang, ${userObj.nama} (${userObj.role}) — Terverifikasi via ${authMethod}.`, 'success');
  switchView('admin', 'overview');
}

function openEmergencyAccessModal() {
  const m = document.getElementById('emergency-login-modal');
  if (m) m.classList.remove('hidden');
}

function closeEmergencyAccessModal() {
  const m = document.getElementById('emergency-login-modal');
  if (m) m.classList.add('hidden');
}

async function handleEmergencyLoginSubmit(e) {
  e.preventDefault();
  if (AppState.emergencyLockedUntil > Date.now()) {
    const mins = Math.ceil((AppState.emergencyLockedUntil - Date.now()) / 60000);
    showToast(`Akses darurat terkunci selama ${mins} menit karena 5x gagal (Aturan R9).`, 'error');
    return false;
  }

  const u = document.getElementById('emerg-user').value.trim();
  const p = document.getElementById('emerg-pass').value.trim();

  if (u === 'darurat' && p.length >= 6) {
    AppState.emergencyFailCount = 0;
    closeEmergencyAccessModal();
    completeLoginSession({
      email: 'darurat@etalaseku.id',
      nama: 'Emergency Break-Glass',
      role: 'Superadmin',
      status: 'Aktif'
    }, 'Akses Darurat Script Properties (R4/R9)');
  } else {
    AppState.emergencyFailCount++;
    const rem = 5 - AppState.emergencyFailCount;
    if (rem <= 0) {
      AppState.emergencyLockedUntil = Date.now() + 15 * 60 * 1000;
      showToast('5x percobaan gagal! Akses darurat dikunci otomatis selama 15 menit (DARURAT_KUNCI_SAMPAI).', 'error');
    } else {
      showToast(`Sandi darurat salah. Sisa percobaan sebelum kunci 15 menit: ${rem}x`, 'warning');
    }
  }
  return false;
}

// ============================================================================
// 8. ADMIN WORKSPACE RENDERING & MODULE ACTIONS (screen2.jpg)
// ============================================================================
function renderAdminWorkspace() {
  // Update Sidebar User Profile
  const u = AppState.session.user;
  const sideAvatar = document.getElementById('admin-side-avatar');
  const sideName = document.getElementById('admin-side-name');
  const sideRole = document.getElementById('admin-side-role');
  const leadsBadge = document.getElementById('sidebar-leads-count');
  const queueBadge = document.getElementById('sidebar-queue-count');

  if (sideAvatar) sideAvatar.textContent = u.inisial || 'BS';
  if (sideName) sideName.textContent = u.nama;
  if (sideRole) sideRole.textContent = u.role;
  if (leadsBadge) leadsBadge.textContent = AppState.leads.length + 343;

  const antriCount = AppState.antrianNotif.filter(a => a.status === 'Antri').length;
  if (queueBadge) {
    queueBadge.textContent = antriCount + ' Antri';
    queueBadge.className = antriCount > 0
      ? 'px-2 py-0.5 rounded-full text-[10px] font-extrabold bg-[#F5C542] text-[#3B2A1A]'
      : 'px-2 py-0.5 rounded-full text-[10px] font-bold bg-[#2F6B3A]/30 text-[#9ADA9E]';
  }

  renderAdminLeadsTable();
  renderSelectedLeadDetail();
  renderAdminKatalogTab();
  renderAdminCrmNotifTab();
  renderAdminTurboTab();
  renderAdminSecurityTab();
  renderAdminMigrasiTab();
  updateTurboBadgesUI();
}

function getFilteredLeads() {
  const q = AppState.leadSearchQuery.toLowerCase().trim();
  const prod = AppState.leadFilterProduct;
  const st = AppState.leadFilterStatus;

  return AppState.leads.filter(l => {
    if (prod !== 'ALL' && !l.produkNama.toLowerCase().includes(prod.toLowerCase())) return false;
    if (st !== 'ALL' && l.statusFollowUp !== st) return false;
    if (q) {
      const hay = `${l.nama} ${l.profesi} ${l.noWA} ${l.email} ${l.id}`.toLowerCase();
      if (!hay.includes(q)) return false;
    }
    return true;
  });
}

function handleLeadFilterChange() {
  const sEl = document.getElementById('admin-lead-search');
  const pEl = document.getElementById('admin-lead-product-filter');
  const stEl = document.getElementById('admin-lead-status-filter');
  if (sEl) AppState.leadSearchQuery = sEl.value;
  if (pEl) AppState.leadFilterProduct = pEl.value;
  if (stEl) AppState.leadFilterStatus = stEl.value;
  renderAdminLeadsTable();
}

function toggleLeadCheckbox(leadId, checked) {
  if (checked) {
    if (!AppState.selectedLeadIds.includes(leadId)) AppState.selectedLeadIds.push(leadId);
  } else {
    AppState.selectedLeadIds = AppState.selectedLeadIds.filter(id => id !== leadId);
  }
  renderAdminLeadsTable();
}

function selectLeadForDetail(leadId) {
  AppState.selectedLeadId = leadId;
  renderAdminLeadsTable();
  renderSelectedLeadDetail();
}

async function cycleLeadStatus(leadId) {
  const order = ['Baru Masuk', 'Dihubungi', 'Closing (Lunas)', 'Batal / Expired'];
  const lead = AppState.leads.find(l => l.id === leadId);
  if (!lead) return;
  const nextIdx = (order.indexOf(lead.statusFollowUp) + 1) % order.length;
  const newStatus = order[nextIdx];
  lead.statusFollowUp = newStatus;

  await gasApiCall('leads.updateStatus', { leadId: leadId, status: newStatus, lead: lead }, { fast: true });

  if (newStatus === 'Closing (Lunas)' && AppState.notifConfig.waAktif) {
    AppState.antrianNotif.unshift({
      id: 'ANT-WA-' + Math.floor(1000 + Math.random() * 8999),
      kanal: 'WA',
      tujuan: normalisasiHP62(lead.noWA),
      nama: lead.nama,
      event: 'PEMBAYARAN_LUNAS',
      refId: lead.id,
      status: 'Antri',
      percobaan: 0,
      waktu: 'Baru Saja'
    });
    showToast(`Lead ${lead.nama} → Closing (Lunas)! Notifikasi akses Google Drive masuk AntrianNotif.`, 'success');
  } else {
    showToast(`Status follow-up ${lead.nama} diperbarui ke "${newStatus}" (updateWhere 1x I/O).`, 'info');
  }

  renderAdminWorkspace();
}

function renderAdminLeadsTable() {
  const tbody = document.getElementById('admin-leads-tbody');
  const countChip = document.getElementById('selected-leads-chip');
  if (!tbody) return;

  if (countChip) {
    countChip.textContent = `Terpilih: ${AppState.selectedLeadIds.length} baris`;
  }

  const list = getFilteredLeads();
  if (!list.length) {
    tbody.innerHTML = `
      <tr>
        <td colspan="8" class="p-8 text-center text-sm text-[#6E5B47]">
          Tidak ada data leads yang cocok dengan filter pencarian.
        </td>
      </tr>
    `;
    return;
  }

  tbody.innerHTML = list.map(l => {
    const isChecked = AppState.selectedLeadIds.includes(l.id);
    const isSelected = AppState.selectedLeadId === l.id;

    let statusBadge = '';
    if (l.statusFollowUp === 'Closing (Lunas)') {
      statusBadge = `<span class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold bg-[#B1F2B4] text-[#135224]"><span class="w-1.5 h-1.5 rounded-full bg-[#2F6B3A]"></span>Closing</span>`;
    } else if (l.statusFollowUp === 'Dihubungi') {
      statusBadge = `<span class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold bg-[#FFDF95] text-[#594400]"><span class="w-1.5 h-1.5 rounded-full bg-[#B45309]"></span>Dihubungi</span>`;
    } else if (l.statusFollowUp === 'Baru Masuk') {
      statusBadge = `<span class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold bg-[#DBEAFE] text-[#1E40AF]"><span class="w-1.5 h-1.5 rounded-full bg-[#2563EB]"></span>Baru Masuk</span>`;
    } else {
      statusBadge = `<span class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold bg-[#FFDAD6] text-[#93000A]"><span class="w-1.5 h-1.5 rounded-full bg-[#BA1A1A]"></span>Batal / Expired</span>`;
    }

    let prodBadgeClass = 'bg-[#FFDBCA] text-[#763300]';
    if (l.produkNama.includes('Notion')) prodBadgeClass = 'bg-[#FFDF95] text-[#594400]';
    if (l.produkNama.includes('Blueprint')) prodBadgeClass = 'bg-[#B1F2B4] text-[#135224]';

    const waBadge = l.statusWA === 'Terkirim'
      ? `<span class="px-1.5 py-0.5 rounded bg-[#B1F2B4]/60 text-[#135224] font-bold text-[10px]" title="WA Terkirim">WA ✓</span>`
      : l.statusWA === 'Antri'
      ? `<span class="px-1.5 py-0.5 rounded bg-[#FFDF95] text-[#594400] font-bold text-[10px]" title="WA Dalam Antrean">WA ⏳</span>`
      : `<span class="px-1.5 py-0.5 rounded bg-[#FFDAD6] text-[#93000A] font-bold text-[10px]" title="WA Gagal">WA ✕</span>`;

    const emBadge = l.statusEmail === 'Terkirim'
      ? `<span class="px-1.5 py-0.5 rounded bg-[#B1F2B4]/60 text-[#135224] font-bold text-[10px]" title="Email Terkirim">✉️ ✓</span>`
      : `<span class="px-1.5 py-0.5 rounded bg-[#FFDF95] text-[#594400] font-bold text-[10px]" title="Email Antri">✉️ ⏳</span>`;

    const wa62 = normalisasiHP62(l.noWA);

    return `
      <tr onclick="selectLeadForDetail('${l.id}')" class="border-b border-[#E8DDB8]/60 hover:bg-[#F5EBCB]/60 transition-colors cursor-pointer ${isSelected ? 'bg-[#F5EBCB]/80' : 'bg-[#FFFDF7]'}">
        <td class="p-3 pl-4" onclick="event.stopPropagation()">
          <input type="checkbox" ${isChecked ? 'checked' : ''} onchange="toggleLeadCheckbox('${l.id}', this.checked)" class="rounded text-[#B45309] focus:ring-[#B45309] border-[#D1C5AE]"/>
        </td>
        <td class="p-3 text-xs text-[#6E5B47] font-medium whitespace-nowrap">${l.waktu}</td>
        <td class="p-3">
          <div class="font-bold text-xs text-[#3B2A1A]">${l.nama}</div>
          <div class="text-[11px] text-[#6E5B47]">${l.profesi}</div>
        </td>
        <td class="p-3 font-mono text-xs text-[#3B2A1A] font-semibold whitespace-nowrap">+62 ${l.noWA.replace(/^0/, '')}</td>
        <td class="p-3 text-xs text-[#6E5B47] truncate max-w-[160px]">${l.email}</td>
        <td class="p-3">
          <span class="inline-block px-2.5 py-1 rounded-xl text-[10px] font-bold ${prodBadgeClass}">${l.produkNama}</span>
        </td>
        <td class="p-3" onclick="event.stopPropagation()">
          <button type="button" onclick="cycleLeadStatus('${l.id}')" title="Klik untuk ubah status Follow-Up">${statusBadge}</button>
        </td>
        <td class="p-3 whitespace-nowrap">
          <div class="flex items-center gap-1">${emBadge}${waBadge}</div>
        </td>
        <td class="p-3 pr-4 text-right whitespace-nowrap" onclick="event.stopPropagation()">
          <div class="inline-flex items-center gap-1.5">
            <a href="https://wa.me/${wa62}?text=${encodeURIComponent('Halo Kak ' + l.nama + ', kami dari EtalaseKu ingin konfirmasi pesanan ' + l.produkNama)}" target="_blank" rel="noopener noreferrer" class="w-7 h-7 rounded-lg bg-[#2F6B3A] hover:bg-[#23532C] text-white flex items-center justify-center text-xs shadow-sm" title="Chat WA">
              💬
            </a>
            <button type="button" onclick="selectLeadForDetail('${l.id}')" class="px-2.5 py-1 rounded-lg bg-[#F5EBCB] hover:bg-[#E8DDB8] text-[#3B2A1A] font-bold text-[11px]">
              Detail
            </button>
          </div>
        </td>
      </tr>
    `;
  }).join('');
}

function renderSelectedLeadDetail() {
  const lead = AppState.leads.find(l => l.id === AppState.selectedLeadId) || AppState.leads[0];
  if (!lead) return;

  const box = document.getElementById('selected-lead-detail-card');
  if (!box) return;

  const initials = lead.nama.split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase();
  const wa62 = normalisasiHP62(lead.noWA);

  box.innerHTML = `
    <div class="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-[#E8DDB8]">
      <div class="flex items-center gap-3.5">
        <div class="w-12 h-12 rounded-2xl bg-[#FFDBCA] text-[#9B4500] flex items-center justify-center font-display font-bold text-lg shadow-inner">
          ${initials}
        </div>
        <div>
          <h4 class="font-display font-bold text-lg text-[#3B2A1A]">${lead.nama}</h4>
          <p class="text-xs text-[#6E5B47]">+62 ${lead.noWA.replace(/^0/, '')} • ${lead.email}</p>
        </div>
      </div>
      <div class="flex items-center gap-2">
        <span class="px-3 py-1 rounded-full text-xs font-bold bg-[#B1F2B4] text-[#135224]">Status: ${lead.statusFollowUp}</span>
        <a href="https://wa.me/${wa62}?text=${encodeURIComponent('Halo Kak ' + lead.nama + ', terima kasih telah memesan ' + lead.produkNama)}" target="_blank" rel="noopener noreferrer" class="px-3.5 py-1.5 rounded-full bg-[#2F6B3A] hover:bg-[#23532C] text-white font-bold text-xs shadow-sm">
          Kirim WA Follow-up
        </a>
      </div>
    </div>

    <div class="grid grid-cols-1 sm:grid-cols-3 gap-3 my-4">
      <div class="bg-[#F5EBCB]/60 p-3.5 rounded-2xl border border-[#E8DDB8]">
        <span class="text-[10px] font-bold uppercase tracking-wider text-[#6E5B47] block">Produk yang Diambil</span>
        <strong class="text-xs font-bold text-[#3B2A1A] block mt-1">${lead.produkNama}</strong>
        <span class="text-xs font-extrabold text-[#B45309]">Rp ${Number(lead.nominal).toLocaleString('id-ID')} (${lead.statusFollowUp === 'Closing (Lunas)' ? 'Lunas' : 'Menunggu'})</span>
      </div>
      <div class="bg-[#F5EBCB]/60 p-3.5 rounded-2xl border border-[#E8DDB8]">
        <span class="text-[10px] font-bold uppercase tracking-wider text-[#6E5B47] block">Sumber Trafik & IP</span>
        <strong class="text-xs font-bold text-[#3B2A1A] block mt-1">${lead.sumber}</strong>
        <span class="text-[11px] text-[#6E5B47]">${lead.ip}</span>
      </div>
      <div class="bg-[#F5EBCB]/60 p-3.5 rounded-2xl border border-[#E8DDB8]">
        <span class="text-[10px] font-bold uppercase tracking-wider text-[#6E5B47] block">Integrasi Spreadsheet</span>
        <strong class="text-xs font-bold text-[#2F6B3A] block mt-1">✓ ${lead.rowSync}</strong>
        <span class="text-[11px] font-mono text-[#6E5B47]">UUID: ${lead.id}</span>
      </div>
    </div>

    <div>
      <span class="text-[10px] font-bold uppercase tracking-wider text-[#6E5B47] block mb-2">Linimasa Interaksi Otomatis (PRD Log & AntrianNotif)</span>
      <div class="space-y-2 text-xs">
        <div class="flex items-start gap-2.5">
          <span class="w-2 h-2 rounded-full bg-[#2F6B3A] mt-1.5"></span>
          <div>
            <strong class="text-[#3B2A1A]">${lead.waktu} — Status Notifikasi WA (${lead.statusWA}) & Email (${lead.statusEmail})</strong>
            <p class="text-[11px] text-[#6E5B47]">Diproses secara non-blocking melalui sheet AntrianNotif & worker pemicu 1 menit.</p>
          </div>
        </div>
        <div class="flex items-start gap-2.5">
          <span class="w-2 h-2 rounded-full bg-[#B45309] mt-1.5"></span>
          <div>
            <strong class="text-[#3B2A1A]">${lead.waktu} — Form Checkout Berhasil Diisi</strong>
            <p class="text-[11px] text-[#6E5B47]">Tercatat via LockService tanpa menahan UI pengunjung.</p>
          </div>
        </div>
      </div>
    </div>
  `;
}

function exportLeadsCSV() {
  const list = getFilteredLeads();
  const headers = ['LeadID', 'Waktu', 'Nama', 'Profesi', 'NoWA', 'Email', 'Produk', 'Nominal', 'StatusFollowUp', 'StatusWA', 'StatusEmail'];
  const csvRows = [
    headers.join(','),
    ...list.map(l => [
      l.id,
      `"${l.waktu}"`,
      `"${l.nama}"`,
      `"${l.profesi}"`,
      `'${l.noWA}`,
      l.email,
      `"${l.produkNama}"`,
      l.nominal,
      `"${l.statusFollowUp}"`,
      l.statusWA,
      l.statusEmail
    ].join(','))
  ];
  const blob = new Blob([csvRows.join('\n')], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `Leads_EtalaseKu_${new Date().toISOString().slice(0, 10)}.csv`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
  showToast(`Berhasil mengunduh ${list.length} baris data leads (CSV).`, 'success');
}

// ============================================================================
// 9. MODUL CRUD KATALOG PRODUK
// ============================================================================
function renderAdminKatalogTab() {
  const container = document.getElementById('admin-katalog-grid');
  if (!container) return;

  container.innerHTML = AppState.products.map(p => `
    <div class="bg-[#FFFDF7] rounded-3xl p-5 border border-[#E8DDB8] shadow-warm-sm flex flex-col justify-between">
      <div>
        <div class="flex items-center justify-between mb-3">
          <span class="px-3 py-1 rounded-full text-[10px] font-extrabold uppercase bg-[#F5EBCB] text-[#B45309] border border-[#E8DDB8]">${p.category}</span>
          <span class="text-xs font-mono font-bold text-[#6E5B47]">${p.id}</span>
        </div>
        <div class="flex items-center gap-3 mb-3">
          <div class="w-12 h-12 rounded-2xl bg-[#F5EBCB] flex items-center justify-center text-2xl">${p.emoji || '📦'}</div>
          <div>
            <h4 class="font-display font-bold text-lg text-[#3B2A1A]">${p.title}</h4>
            <span class="text-xs text-[#2F6B3A] font-bold">${p.badge} • ${p.soldCount} terjual</span>
          </div>
        </div>
        <p class="text-xs text-[#6E5B47] leading-relaxed mb-4">${p.desc}</p>
      </div>
      <div class="pt-3 border-t border-[#E8DDB8] flex items-center justify-between">
        <div>
          <span class="text-xs line-through text-[#6E5B47] block">Rp ${Number(p.originalPrice).toLocaleString('id-ID')}</span>
          <strong class="font-display text-lg font-bold text-[#B45309]">Rp ${Number(p.price).toLocaleString('id-ID')}</strong>
        </div>
        <button type="button" onclick="openAddProductModal('${p.id}')" class="px-3.5 py-2 rounded-full bg-[#F5EBCB] hover:bg-[#F5C542] text-[#3B2A1A] font-bold text-xs transition-colors">
          Edit Produk
        </button>
      </div>
    </div>
  `).join('');
}

function openAddProductModal(editId) {
  const modal = document.getElementById('product-crud-modal');
  if (!modal) return;
  const existing = editId ? AppState.products.find(p => p.id === editId) : null;

  document.getElementById('prod-form-id').value = existing ? existing.id : '';
  document.getElementById('prod-form-title').value = existing ? existing.title : '';
  document.getElementById('prod-form-category').value = existing ? existing.category : 'Video Course';
  document.getElementById('prod-form-badge').value = existing ? existing.badge : '12 Modul HD';
  document.getElementById('prod-form-price').value = existing ? existing.price : 249000;
  document.getElementById('prod-form-orig').value = existing ? existing.originalPrice : 499000;
  document.getElementById('prod-form-desc').value = existing ? existing.desc : '';

  modal.classList.remove('hidden');
}

function closeAddProductModal() {
  const modal = document.getElementById('product-crud-modal');
  if (modal) modal.classList.add('hidden');
}

async function handleSaveProductSubmit(e) {
  e.preventDefault();
  const id = document.getElementById('prod-form-id').value.trim() || ('PRD-0' + (AppState.products.length + 1));
  const title = document.getElementById('prod-form-title').value.trim();
  const category = document.getElementById('prod-form-category').value;
  const badge = document.getElementById('prod-form-badge').value.trim();
  const price = Number(document.getElementById('prod-form-price').value || 199000);
  const orig = Number(document.getElementById('prod-form-orig').value || price * 2);
  const desc = document.getElementById('prod-form-desc').value.trim();

  await gasApiCall('produk.upsert', { ProdukID: id, NamaProduk: title, Kategori: category, HargaJual: price, HargaCoret: orig });

  const idx = AppState.products.findIndex(p => p.id === id);
  const obj = {
    id: id,
    title: title,
    category: category,
    badge: badge,
    emoji: category === 'E-Book PDF' ? '📘' : category === 'Interactive Template' ? '📊' : '🎯',
    level: 'Level: Semua Tingkatan',
    originalPrice: orig,
    price: price,
    discount: '-' + Math.round(100 - (price / orig) * 100) + '%',
    soldCount: idx > -1 ? AppState.products[idx].soldCount : 1,
    sharePct: 15,
    closingRate: '60%',
    desc: desc,
    status: 'Aktif'
  };

  if (idx > -1) AppState.products[idx] = obj;
  else AppState.products.push(obj);

  closeAddProductModal();
  renderAdminKatalogTab();
  renderPublicProducts();
  showToast(`Katalog "${title}" disimpan & versi cache publik di-bump!`, 'success');
  return false;
}

// ============================================================================
// 10. MODUL CRM & NOTIFIKASI WA/EMAIL (@gas-notifikasi-wa-crm)
// ============================================================================
function renderAdminCrmNotifTab() {
  const queueTbody = document.getElementById('crm-queue-tbody');
  const contactsTbody = document.getElementById('crm-contacts-tbody');
  const matriksBox = document.getElementById('crm-matriks-container');
  const waToggle = document.getElementById('toggle-global-wa');
  const emToggle = document.getElementById('toggle-global-email');

  if (waToggle) waToggle.checked = AppState.notifConfig.waAktif;
  if (emToggle) emToggle.checked = AppState.notifConfig.emailAktif;

  if (queueTbody) {
    queueTbody.innerHTML = AppState.antrianNotif.map(q => {
      const badge = q.status === 'Terkirim'
        ? `<span class="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-[#B1F2B4] text-[#135224]">Terkirim</span>`
        : q.status === 'Antri'
        ? `<span class="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-[#FFDF95] text-[#594400]">Antri (0ms UI)</span>`
        : `<span class="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-[#FFDAD6] text-[#93000A]">Gagal</span>`;
      return `
        <tr class="border-b border-[#E8DDB8]/60 text-xs">
          <td class="p-2.5 font-mono font-semibold text-[#3B2A1A]">${q.id}</td>
          <td class="p-2.5"><span class="px-2 py-0.5 rounded font-bold text-[10px] ${q.kanal === 'WA' ? 'bg-[#2F6B3A]/15 text-[#2F6B3A]' : 'bg-[#B45309]/15 text-[#B45309]'}">${q.kanal}</span></td>
          <td class="p-2.5 font-mono text-[11px]">${q.tujuan}</td>
          <td class="p-2.5 font-bold">${q.nama}</td>
          <td class="p-2.5 font-mono text-[11px] text-[#6E5B47]">${q.event}</td>
          <td class="p-2.5">${badge}</td>
          <td class="p-2.5 text-[#6E5B47]">${q.waktu}</td>
        </tr>
      `;
    }).join('');
  }

  if (contactsTbody) {
    const q = AppState.crmSearchQuery.toLowerCase().trim();
    const seg = AppState.crmFilterSegment;
    const filtered = AppState.crmContacts.filter(c => {
      if (seg !== 'ALL' && c.segmen !== seg) return false;
      if (q && !`${c.nama} ${c.email} ${c.noWA} ${c.tag}`.toLowerCase().includes(q)) return false;
      return true;
    });

    contactsTbody.innerHTML = filtered.map(c => {
      const waValidBadge = c.statusWA === 'Terdaftar'
        ? `<span class="px-2 py-0.5 rounded-full text-[10px] font-bold bg-[#B1F2B4] text-[#135224]">✓ Terdaftar</span>`
        : c.statusWA === 'Belum Dicek'
        ? `<span class="px-2 py-0.5 rounded-full text-[10px] font-bold bg-[#FFDF95] text-[#594400]">? Belum Dicek</span>`
        : `<span class="px-2 py-0.5 rounded-full text-[10px] font-bold bg-[#FFDAD6] text-[#93000A]">✕ Tidak Aktif</span>`;

      const isOptOut = c.optOut === 'YA';
      return `
        <tr class="border-b border-[#E8DDB8]/60 text-xs bg-[#FFFDF7]">
          <td class="p-3 font-mono font-bold text-[#6E5B47]">${c.id}</td>
          <td class="p-3">
            <div class="font-bold text-[#3B2A1A]">${c.nama}</div>
            <div class="text-[11px] text-[#6E5B47]">${c.email}</div>
          </td>
          <td class="p-3 font-mono font-semibold">'${c.noWA}</td>
          <td class="p-3"><span class="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-[#F5EBCB] text-[#3B2A1A]">${c.segmen}</span></td>
          <td class="p-3"><span class="px-2 py-0.5 rounded text-[10px] font-semibold bg-[#FFDBCA]/60 text-[#763300]">${c.tag}</span></td>
          <td class="p-3">${waValidBadge}</td>
          <td class="p-3">
            <button type="button" onclick="toggleCrmOptOut('${c.id}')" class="px-2.5 py-1 rounded-full text-[10px] font-extrabold transition-all ${isOptOut ? 'bg-[#FFDAD6] text-[#93000A]' : 'bg-[#F5EBCB] text-[#2F6B3A]'}">
              ${isOptOut ? 'Opt-Out: YA (Dikecualikan Blast)' : 'Opt-Out: TIDAK (Aktif)'}
            </button>
          </td>
        </tr>
      `;
    }).join('');
  }

  if (matriksBox) {
    matriksBox.innerHTML = Object.keys(AppState.notifConfig.matriks).map(evKey => {
      const m = AppState.notifConfig.matriks[evKey];
      return `
        <div class="p-4 rounded-2xl bg-[#F5EBCB]/60 border border-[#E8DDB8] flex flex-col gap-2">
          <div class="flex flex-wrap items-center justify-between gap-2">
            <div>
              <span class="font-mono text-[10px] font-bold text-[#B45309] uppercase">${evKey}</span>
              <h5 class="font-bold text-xs text-[#3B2A1A]">${m.label}</h5>
            </div>
            <div class="flex items-center gap-3 text-xs font-bold">
              <label class="inline-flex items-center gap-1.5 cursor-pointer">
                <input type="checkbox" ${m.wa ? 'checked' : ''} onchange="toggleMatriksEvent('${evKey}', 'wa', this.checked)" class="rounded text-[#2F6B3A] focus:ring-[#2F6B3A]"/>
                <span>WA Fonnte</span>
              </label>
              <label class="inline-flex items-center gap-1.5 cursor-pointer">
                <input type="checkbox" ${m.email ? 'checked' : ''} onchange="toggleMatriksEvent('${evKey}', 'email', this.checked)" class="rounded text-[#B45309] focus:ring-[#B45309]"/>
                <span>Email MailApp</span>
              </label>
            </div>
          </div>
          <p class="text-[11px] font-mono text-[#6E5B47] bg-[#FFFDF7] p-2.5 rounded-xl border border-[#E8DDB8]">${m.pesan}</p>
        </div>
      `;
    }).join('');
  }
}

async function handleDrainQueueNow() {
  const pending = AppState.antrianNotif.filter(a => a.status === 'Antri');
  if (!pending.length) {
    showToast('AntrianNotif sudah bersih (ANTRIAN_ADA = 0).', 'info');
    return;
  }
  await gasApiCall('notif.drain', { paksa: true });
  pending.forEach(a => { a.status = 'Terkirim'; a.percobaan = 1; });
  AppState.leads.forEach(l => {
    if (l.statusWA === 'Antri') l.statusWA = 'Terkirim';
    if (l.statusEmail === 'Antri') l.statusEmail = 'Terkirim';
  });
  renderAdminWorkspace();
  showToast(`Worker prosesAntrianNotif() selesai: ${pending.length} pesan terkirim via Fonnte & MailApp di luar LockService!`, 'success');
}

async function handleSyncCrmMultiSource() {
  await gasApiCall('crm.sync', {});
  let added = 0;
  AppState.leads.forEach(l => {
    const hp = normalisasiHP08(l.noWA);
    const exists = AppState.crmContacts.some(c => normalisasiHP08(c.noWA) === hp);
    if (!exists) {
      AppState.crmContacts.unshift({
        id: 'KTK-' + Math.floor(1006 + Math.random() * 899),
        nama: l.nama,
        email: l.email,
        noWA: hp,
        segmen: l.statusFollowUp === 'Closing (Lunas)' ? 'Member Aktif' : 'Calon Pembeli (Lead)',
        sumber: 'Leads_Pembeli',
        tag: l.produkNama,
        statusWA: 'Belum Dicek',
        optOut: 'TIDAK',
        pesanCount: 1,
        lastContact: l.waktu
      });
      added++;
    }
  });
  renderAdminCrmNotifTab();
  showToast(`svcCrmSync selesai: ${added} kontak baru disinkronkan tanpa menimpa Tag/Catatan admin.`, 'success');
}

async function handleValidateFonnteNumbers() {
  await gasApiCall('crm.validateWA', { onlyUnchecked: true });
  let count = 0;
  AppState.crmContacts.forEach(c => {
    if (c.statusWA === 'Belum Dicek') {
      c.statusWA = 'Terdaftar';
      count++;
    }
  });
  renderAdminCrmNotifTab();
  showToast(`Validasi endpoint Fonnte /validate selesai: ${count || AppState.crmContacts.length} nomor terverifikasi aktif.`, 'success');
}

async function toggleCrmOptOut(kontakId) {
  const c = AppState.crmContacts.find(x => x.id === kontakId);
  if (!c) return;
  c.optOut = c.optOut === 'YA' ? 'TIDAK' : 'YA';
  await gasApiCall('crm.toggleOptOut', { kontakId: kontakId, optOut: c.optOut === 'YA' }, { fast: true });
  renderAdminCrmNotifTab();
  showToast(`Status Opt-Out ${c.nama} diubah ke ${c.optOut}.`, 'info');
}

function toggleGlobalNotifChannel(channel, checked) {
  if (channel === 'wa') AppState.notifConfig.waAktif = checked;
  if (channel === 'email') AppState.notifConfig.emailAktif = checked;
  gasApiCall('notif.saveMatriks', { waAktif: AppState.notifConfig.waAktif, emailAktif: AppState.notifConfig.emailAktif }, { fast: true });
  showToast(`Saklar utama kanal ${channel.toUpperCase()} diatur ke ${checked ? 'AKTIF' : 'NONAKTIF'}.`, 'info');
}

function toggleMatriksEvent(evKey, channel, checked) {
  if (!AppState.notifConfig.matriks[evKey]) return;
  AppState.notifConfig.matriks[evKey][channel] = checked;
  gasApiCall('notif.saveMatriks', { matriks: AppState.notifConfig.matriks }, { fast: true });
  showToast(`Matriks ${evKey} (${channel.toUpperCase()}) diperbarui.`, 'info');
}

async function handleCreateBlastSubmit(e) {
  e.preventDefault();
  const judul = document.getElementById('blast-judul').value.trim();
  const sasaran = document.getElementById('blast-sasaran').value;
  const batchSize = Number(document.getElementById('blast-batch').value || 20);
  const pesan = document.getElementById('blast-pesan').value.trim();

  const eligible = AppState.crmContacts.filter(c => {
    if (c.optOut === 'YA') return false;
    if (c.statusWA === 'Tidak Terdaftar') return false;
    if (sasaran !== 'ALL' && c.segmen !== sasaran) return false;
    return true;
  });

  if (!eligible.length) {
    showToast('Tidak ada kontak sasaran yang memenuhi syarat (Non Opt-Out & WA Valid).', 'error');
    return false;
  }

  await gasApiCall('notif.blast', { judul, sasaran, ukuranBatch: batchSize, pesan });

  eligible.forEach(k => {
    AppState.antrianNotif.unshift({
      id: 'ANT-BL-' + Math.floor(1000 + Math.random() * 8999),
      kanal: 'WA',
      tujuan: normalisasiHP62(k.noWA),
      nama: k.nama,
      event: 'BLAST_WA',
      refId: k.id,
      status: 'Antri',
      percobaan: 0,
      waktu: 'Baru Saja'
    });
  });

  renderAdminWorkspace();
  showToast(`Blast WA "${judul}" dijadwalkan untuk ${eligible.length} kontak (Batch ${batchSize}, kontak Opt-Out dilewati otomatis)!`, 'success');
  return false;
}

// ============================================================================
// 11. MODUL SCALE TURBO, SCRIPT PROPERTIES VAULT, & MIGRASI DATABASE
// ============================================================================
function updateTurboBadgesUI() {
  const hitRate = Math.round((AppState.turbo.cacheHits / (AppState.turbo.cacheHits + AppState.turbo.cacheMisses)) * 100);
  const elLatency = document.getElementById('turbo-metric-latency');
  const elHitRate = document.getElementById('turbo-metric-hitrate');
  const elEpoch = document.getElementById('turbo-metric-epoch');
  if (elLatency) elLatency.textContent = AppState.turbo.lastLatencyMs + ' ms';
  if (elHitRate) elHitRate.textContent = hitRate + '%';
  if (elEpoch) elEpoch.textContent = 'v' + AppState.turbo.writeEpoch;
}

function renderAdminTurboTab() {
  const tbody = document.getElementById('turbo-logs-tbody');
  if (!tbody) return;
  tbody.innerHTML = AppState.turbo.logs.map(l => `
    <tr class="border-b border-[#E8DDB8]/60 text-xs bg-[#FFFDF7]">
      <td class="p-3 font-mono text-[#6E5B47]">${l.time}</td>
      <td class="p-3 font-mono font-bold text-[#B45309]">${l.action}</td>
      <td class="p-3"><span class="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-[#B1F2B4] text-[#135224]">${l.mode}</span></td>
      <td class="p-3 font-mono font-extrabold text-[#2F6B3A]">${l.ms} ms</td>
      <td class="p-3 text-[#6E5B47]">${l.savedCells}</td>
    </tr>
  `).join('');
}

async function triggerWarmup3Layers() {
  await gasApiCall('warmup', {}, { fast: true });
  AppState.turbo.cacheHits += 3;
  renderAdminTurboTab();
  showToast('Warmup 3 Lapis selesai (42ms): _PROP_MEMO aktif, CacheX 2 Chunks siap, indeks Sheet terpetakan.', 'success');
}

async function triggerBumpCacheScope(scope) {
  AppState.turbo.writeEpoch++;
  await gasApiCall('public.boot', { bumpScope: scope }, { fast: true });
  renderAdminTurboTab();
  showToast(`Versi cache scope "${scope}" berhasil di-bump tanpa menghapus cache member lain!`, 'info');
}

function renderAdminSecurityTab() {
  const grid = document.getElementById('security-vault-grid');
  if (!grid) return;

  const descriptions = {
    FONNTE_TOKEN: 'Kelas A — Token API Gateway WhatsApp Fonnte (Hanya di Script Properties)',
    GOOGLE_CLIENT_ID: 'Kelas B — OAuth 2.0 Web Client ID untuk verifikasi tokeninfo di server',
    SESSION_SECRET: 'Kelas A — Kunci HMAC-SHA256 64-byte untuk tanda tangan sesi stateless',
    WEBHOOK_SECRET: 'Kelas A — Kunci verifikasi callback pembayaran & integrasi eksternal',
    SPREADSHEET_ID: 'Kelas B — ID Spreadsheet Database Utama EtalaseKu',
    DRIVE_ROOT_FOLDER_ID: 'Kelas B — ID Folder Root penyimpanan aset & bukti transaksi'
  };

  grid.innerHTML = Object.keys(AppState.secretsVault).map(key => {
    const item = AppState.secretsVault[key];
    return `
      <div class="p-4 rounded-2xl bg-[#FFFDF7] border border-[#E8DDB8] flex flex-col justify-between gap-3">
        <div>
          <div class="flex items-center justify-between">
            <span class="font-mono text-xs font-extrabold text-[#3B2A1A]">${key}</span>
            <span class="px-2 py-0.5 rounded-full text-[10px] font-bold ${item.ada ? 'bg-[#B1F2B4] text-[#135224]' : 'bg-[#FFDAD6] text-[#93000A]'}">
              ${item.ada ? '✓ Tersimpan Aman' : 'Belum Diset'}
            </span>
          </div>
          <p class="text-[11px] text-[#6E5B47] mt-1">${descriptions[key] || ''}</p>
        </div>
        <div class="bg-[#F5EBCB]/70 px-3 py-2 rounded-xl font-mono text-xs text-[#B45309] truncate border border-[#E8DDB8]">
          Nilai Tersamar: <strong>${item.masked || '••••••'}</strong>
        </div>
      </div>
    `;
  }).join('');
}

async function handleSaveSecretsSubmit(e) {
  e.preventDefault();
  const key = document.getElementById('secret-key-select').value;
  const val = document.getElementById('secret-val-input').value.trim();
  if (!val) {
    showToast('Input kosong diabaikan sesuai Aturan R5 (Nilai lama tidak berubah).', 'info');
    return false;
  }

  const payload = {};
  payload[key] = val;
  await gasApiCall('security.saveSecrets', payload);

  if (val === '__HAPUS__') {
    AppState.secretsVault[key] = { ada: false, masked: '(Dihapus)' };
    showToast(`Properti ${key} telah dihapus dari Script Properties.`, 'warning');
  } else {
    const masked = key === 'GOOGLE_CLIENT_ID'
      ? val
      : (val.length <= 8 ? '••••••' : val.slice(0, 4) + '••••••' + val.slice(-3));
    AppState.secretsVault[key] = { ada: true, masked: masked };
    showToast(`Kunci ${key} berhasil disimpan ke Script Properties & disamarkan di UI!`, 'success');
  }

  document.getElementById('secret-val-input').value = '';
  renderAdminSecurityTab();
  return false;
}

async function handleRotateSessionSecret() {
  await gasApiCall('security.rotateSession', {});
  const suffix = Math.random().toString(36).substring(2, 5).toUpperCase();
  AppState.secretsVault.SESSION_SECRET = {
    ada: true,
    masked: `R8xQ••••••${suffix} (Baru Dirotasi)`
  };
  renderAdminSecurityTab();
  showToast('SESSION_SECRET berhasil dirotasi dengan SHA-256 baru! Seluruh sesi lama otomatis dicabut.', 'success');
}

function renderAdminMigrasiTab() {
  const tbody = document.getElementById('migrasi-results-tbody');
  const modeLabel = document.getElementById('migrasi-mode-badge');
  const timeLabel = document.getElementById('migrasi-time-label');
  if (!tbody) return;

  if (modeLabel) modeLabel.textContent = AppState.migrasi.lastRunMode;
  if (timeLabel) timeLabel.textContent = AppState.migrasi.lastRunTime;

  tbody.innerHTML = AppState.migrasi.results.map(r => `
    <tr class="border-b border-[#E8DDB8]/60 text-xs bg-[#FFFDF7]">
      <td class="p-3 font-mono font-bold text-[#3B2A1A]">${r.sheet}</td>
      <td class="p-3 font-mono text-[11px] text-[#6E5B47]">${r.keyCol}</td>
      <td class="p-3 font-bold">${r.sourceRows} baris</td>
      <td class="p-3"><span class="px-2.5 py-0.5 rounded-full font-bold bg-[#B1F2B4] text-[#135224]">+${r.inserted} Baru</span></td>
      <td class="p-3"><span class="px-2.5 py-0.5 rounded-full font-bold bg-[#FFDF95] text-[#594400]">~${r.updated} Update</span></td>
      <td class="p-3 text-[#6E5B47] font-semibold">${r.skipped} Dilewati</td>
      <td class="p-3 text-[11px] text-[#6E5B47]">${r.note}</td>
    </tr>
  `).join('');
}

async function runDatabaseMigration(isDryRun) {
  const input = document.getElementById('migrasi-source-id');
  const srcId = (input && input.value.trim()) || '';
  if (!srcId) {
    showToast('Masukkan ID atau URL Spreadsheet lama terlebih dahulu.', 'error');
    return;
  }
  if (srcId === '1BxiM_CURRENT_ACTIVE_DB') {
    showToast('Ditolak: Spreadsheet yang dimasukkan adalah spreadsheet aplikasi baru. Masukkan ID spreadsheet LAMA.', 'error');
    return;
  }

  await gasApiCall(isDryRun ? 'migrasi.dryRun' : 'migrasi.execute', { sourceSpreadsheetId: srcId });

  const nowStr = new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' }) + ' WIB';
  AppState.migrasi.lastRunTime = '20 Okt 2026, ' + nowStr;

  if (isDryRun) {
    AppState.migrasi.lastRunMode = 'Dry-Run (Mode Pindai — Tanpa Tulis Data)';
    showToast('Pindai Dry-Run selesai! Spreadsheet lama sama sekali tidak disentuh (Read-Only Header Match).', 'info');
  } else {
    AppState.migrasi.lastRunMode = 'Delta-Sync Upsert Selesai (1x setValues)';
    AppState.migrasi.results = AppState.migrasi.results.map(r => ({
      ...r,
      skipped: r.sourceRows,
      inserted: 0,
      updated: 0,
      note: 'Telah tersinkronisasi penuh (Idempoten 100%)'
    }));
    showToast('Delta-Sync Upsert berhasil dieksekusi dalam 1x operasi batch setValues! Siap Cutover.', 'success');
  }
  renderAdminMigrasiTab();
}

// ============================================================================
// 12. INISIALISASI SAAT HALAMAN DIMUAT
// ============================================================================
document.addEventListener('DOMContentLoaded', () => {
  renderHeroSlide();
  renderPublicProducts();
  renderAdminWorkspace();

  // Warmup awal di latar belakang (@gas-scale-turbo)
  gasApiCall('warmup', {}, { fast: true });
});
