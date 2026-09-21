import React, { useState } from 'react';
import { 
  X, 
  Download, 
  Smartphone, 
  Monitor, 
  Share, 
  CheckCircle2, 
  ShieldCheck, 
  Zap, 
  Sparkles,
  Package,
  ExternalLink,
  Copy,
  Check,
  FolderArchive,
  Layers
} from 'lucide-react';
import { usePWAInstall } from '../hooks/usePWAInstall';

interface InstallAppModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const InstallAppModal: React.FC<InstallAppModalProps> = ({ isOpen, onClose }) => {
  const { isInstallable, isInstalled, isIOS, install } = usePWAInstall();
  const [activeTab, setActiveTab] = useState<'pwa' | 'apk' | 'export'>('pwa');
  const [copiedUrl, setCopiedUrl] = useState(false);

  if (!isOpen) return null;

  const appUrl = window.location.origin;

  const handleInstallClick = async () => {
    if (isInstallable) {
      const success = await install();
      if (success) {
        onClose();
      }
    }
  };

  const handleCopyUrl = () => {
    navigator.clipboard.writeText(appUrl);
    setCopiedUrl(true);
    setTimeout(() => setCopiedUrl(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div 
        className="w-full max-w-xl bg-neutral-900 border border-neutral-800 rounded-2xl p-6 shadow-2xl space-y-5 relative overflow-hidden max-h-[90vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Background glow accent */}
        <div className="absolute top-0 right-0 w-48 h-48 bg-rose-600/10 rounded-full blur-3xl pointer-events-none" />

        {/* Header */}
        <div className="flex items-start justify-between border-b border-neutral-800 pb-4 shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-rose-600 to-amber-500 p-0.5 shadow-lg shadow-rose-600/30 shrink-0">
              <img 
                src="/icon.png" 
                alt="Rafisqy Anime Icon" 
                className="w-full h-full object-cover rounded-[14px]"
                referrerPolicy="no-referrer"
              />
            </div>
            <div>
              <h2 className="text-lg font-display font-bold text-white flex items-center gap-2">
                <span>Kemas & Pasang Rafisqy Anime</span>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-rose-600/20 text-rose-400 font-semibold border border-rose-500/30">
                  v2.1
                </span>
              </h2>
              <p className="text-xs text-neutral-400">
                Pilih opsi instalasi langsung di HP, buat file APK Android, atau ekspor paket proyek
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-neutral-400 hover:text-white transition"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Navigation Tabs */}
        <div className="flex items-center gap-1.5 p-1 bg-neutral-950 border border-neutral-800/80 rounded-xl shrink-0">
          <button
            onClick={() => setActiveTab('pwa')}
            className={`flex-1 py-2 px-3 rounded-lg text-xs font-bold transition flex items-center justify-center gap-1.5 ${
              activeTab === 'pwa'
                ? 'bg-rose-600 text-white shadow-md shadow-rose-600/20'
                : 'text-neutral-400 hover:text-neutral-200'
            }`}
          >
            <Smartphone className="w-3.5 h-3.5" />
            <span>Pasang Cepat (PWA)</span>
          </button>

          <button
            onClick={() => setActiveTab('apk')}
            className={`flex-1 py-2 px-3 rounded-lg text-xs font-bold transition flex items-center justify-center gap-1.5 ${
              activeTab === 'apk'
                ? 'bg-rose-600 text-white shadow-md shadow-rose-600/20'
                : 'text-neutral-400 hover:text-neutral-200'
            }`}
          >
            <Package className="w-3.5 h-3.5" />
            <span>Kemas Jadi APK</span>
          </button>

          <button
            onClick={() => setActiveTab('export')}
            className={`flex-1 py-2 px-3 rounded-lg text-xs font-bold transition flex items-center justify-center gap-1.5 ${
              activeTab === 'export'
                ? 'bg-rose-600 text-white shadow-md shadow-rose-600/20'
                : 'text-neutral-400 hover:text-neutral-200'
            }`}
          >
            <FolderArchive className="w-3.5 h-3.5" />
            <span>Paket ZIP & Build</span>
          </button>
        </div>

        {/* Scrollable Tab Body */}
        <div className="flex-1 overflow-y-auto space-y-4 pr-1">
          {activeTab === 'pwa' && (
            <div className="space-y-4">
              {/* Benefits list */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 text-xs">
                <div className="p-3 rounded-xl bg-neutral-950 border border-neutral-800 flex items-center gap-2.5">
                  <Zap className="w-5 h-5 text-amber-400 shrink-0" />
                  <div>
                    <p className="font-bold text-white">Buka Instan</p>
                    <p className="text-[11px] text-neutral-400">Buka tanpa bar URL</p>
                  </div>
                </div>
                <div className="p-3 rounded-xl bg-neutral-950 border border-neutral-800 flex items-center gap-2.5">
                  <Sparkles className="w-5 h-5 text-rose-500 shrink-0" />
                  <div>
                    <p className="font-bold text-white">Layar Penuh</p>
                    <p className="text-[11px] text-neutral-400">Sensasi native app</p>
                  </div>
                </div>
                <div className="p-3 rounded-xl bg-neutral-950 border border-neutral-800 flex items-center gap-2.5">
                  <ShieldCheck className="w-5 h-5 text-emerald-400 shrink-0" />
                  <div>
                    <p className="font-bold text-white">Hemat Memori</p>
                    <p className="text-[11px] text-neutral-400">Ringan & tanpa kuota boros</p>
                  </div>
                </div>
              </div>

              {/* Main Action based on device / capability */}
              {isInstalled ? (
                <div className="p-4 rounded-xl bg-emerald-950/40 border border-emerald-800/40 flex items-center gap-3">
                  <CheckCircle2 className="w-6 h-6 text-emerald-400 shrink-0" />
                  <div>
                    <h4 className="text-sm font-bold text-white">Aplikasi Sudah Terpasang!</h4>
                    <p className="text-xs text-neutral-400">
                      Kamu sedang menjalankan Rafisqy Anime dalam mode aplikasi terpasang di perangkat ini.
                    </p>
                  </div>
                </div>
              ) : isInstallable ? (
                <div className="space-y-3">
                  <button
                    onClick={handleInstallClick}
                    className="w-full py-3.5 px-4 rounded-xl bg-gradient-to-r from-rose-600 to-rose-500 hover:from-rose-500 hover:to-rose-400 text-white font-bold text-sm shadow-lg shadow-rose-600/30 flex items-center justify-center gap-2.5 transition active:scale-[0.99]"
                  >
                    <Download className="w-5 h-5" />
                    <span>Pasang Aplikasi Sekarang</span>
                  </button>
                  <p className="text-center text-[11px] text-neutral-500">
                    Mendukung Google Chrome, Microsoft Edge, Brave, dan browser Android modern.
                  </p>
                </div>
              ) : isIOS ? (
                /* iOS Safari Guide */
                <div className="p-4 rounded-xl bg-neutral-950 border border-neutral-800 space-y-3 text-xs">
                  <div className="flex items-center gap-2 text-white font-bold text-sm">
                    <Smartphone className="w-4 h-4 text-rose-500" />
                    <span>Cara Pasang di iPhone / iPad (iOS Safari)</span>
                  </div>
                  <ol className="space-y-2 text-neutral-300 list-decimal list-inside leading-relaxed">
                    <li>
                      Ketuk tombol <strong className="text-white inline-flex items-center gap-1"><Share className="w-3.5 h-3.5 text-blue-400 inline" /> Share (Bagikan)</strong> di bar navigasi bawah Safari.
                    </li>
                    <li>
                      Gulir ke bawah dan pilih menu <strong className="text-rose-400">Tambahkan ke Layar Utama (Add to Home Screen)</strong>.
                    </li>
                    <li>
                      Ketuk tombol <strong>Tambah (Add)</strong> di pojok kanan atas. Ikon Rafisqy Anime akan langsung muncul di layar utama!
                    </li>
                  </ol>
                </div>
              ) : (
                /* Desktop / General instructions */
                <div className="p-4 rounded-xl bg-neutral-950 border border-neutral-800 space-y-3 text-xs">
                  <div className="flex items-center gap-2 text-white font-bold text-sm">
                    <Monitor className="w-4 h-4 text-rose-500" />
                    <span>Cara Pasang di Komputer / Android</span>
                  </div>
                  <p className="text-neutral-300 leading-relaxed">
                    Jika tombol otomatis tidak muncul di browser kamu:
                  </p>
                  <ul className="space-y-1.5 text-neutral-400 list-disc list-inside">
                    <li>Di Chrome Desktop: Klik ikon <strong>Install (Komputer kecil bertanda panah)</strong> di ujung kanan bilah alamat (URL bar).</li>
                    <li>Di Android: Ketuk menu titik tiga <strong className="text-neutral-200">⋮</strong> di pojok kanan atas browser lalu pilih <strong className="text-rose-400">Install app / Tambahkan ke Layar Utama</strong>.</li>
                  </ul>
                </div>
              )}
            </div>
          )}

          {activeTab === 'apk' && (
            <div className="space-y-4 text-xs">
              <div className="p-4 rounded-xl bg-neutral-950 border border-neutral-800 space-y-3">
                <div className="flex items-center gap-2 text-white font-bold text-sm">
                  <Package className="w-4 h-4 text-rose-500" />
                  <span>Kemas Menjadi File APK Android (.apk)</span>
                </div>
                <p className="text-neutral-300 leading-relaxed">
                  Aplikasi ini sudah berstandar <strong>PWA compliant</strong> (lengkap dengan manifest, service worker offline, ikon 192x192, 512x512, dan maskable icon). Kamu dapat mengemasnya menjadi file APK Android mandiri dalam 3 langkah mudah:
                </p>

                {/* Step 1: Copy URL */}
                <div className="space-y-1.5 pt-1">
                  <label className="text-[11px] font-semibold text-neutral-400">
                    Langkah 1: Salin URL Aplikasi Ini
                  </label>
                  <div className="flex items-center gap-2 p-1.5 bg-neutral-900 border border-neutral-800 rounded-xl">
                    <input 
                      type="text" 
                      readOnly 
                      value={appUrl} 
                      className="bg-transparent text-neutral-200 text-xs px-2 flex-1 outline-none font-mono"
                    />
                    <button
                      onClick={handleCopyUrl}
                      className="px-3 py-1.5 rounded-lg bg-rose-600 hover:bg-rose-500 text-white font-bold text-xs flex items-center gap-1.5 transition active:scale-95 shrink-0"
                    >
                      {copiedUrl ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                      <span>{copiedUrl ? 'Tersalin!' : 'Salin URL'}</span>
                    </button>
                  </div>
                </div>

                {/* Step 2: Open PWABuilder */}
                <div className="space-y-2 pt-2">
                  <label className="text-[11px] font-semibold text-neutral-400">
                    Langkah 2: Buka PWABuilder (Alat Resmi PWA to APK)
                  </label>
                  <a
                    href="https://www.pwabuilder.com"
                    target="_blank"
                    rel="noreferrer noopener"
                    className="w-full py-2.5 px-4 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-neutral-200 border border-neutral-700 font-semibold flex items-center justify-center gap-2 transition"
                  >
                    <span>Buka PWABuilder.com</span>
                    <ExternalLink className="w-3.5 h-3.5 text-neutral-400" />
                  </a>
                </div>

                {/* Step 3: Explanation */}
                <div className="space-y-1.5 pt-1">
                  <label className="text-[11px] font-semibold text-neutral-400">
                    Langkah 3: Unduh File APK
                  </label>
                  <p className="text-neutral-400 leading-relaxed text-[11px]">
                    Tempelkan URL tadi di kolom PWABuilder, lalu klik <strong>Start</strong>. Di bagian platform, pilih <strong>Android</strong> dan klik <strong>Generate Package / Download APK</strong>. File APK siap dipasang langsung di HP Android tanpa perlu Play Store!
                  </p>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'export' && (
            <div className="space-y-4 text-xs">
              <div className="p-4 rounded-xl bg-neutral-950 border border-neutral-800 space-y-3">
                <div className="flex items-center gap-2 text-white font-bold text-sm">
                  <FolderArchive className="w-4 h-4 text-rose-500" />
                  <span>Unduh Paket Berkas Proyek (ZIP)</span>
                </div>
                <p className="text-neutral-300 leading-relaxed">
                  Kamu dapat mengekspor seluruh kode sumber (Source Code) beserta berkas build produksi ke komputer kamu:
                </p>

                <ol className="space-y-2 text-neutral-300 list-decimal list-inside leading-relaxed bg-neutral-900 p-3 rounded-xl border border-neutral-800/80">
                  <li>
                    Klik ikon <strong>Settings / Menu Titik Tiga (⋯)</strong> di pojok kanan atas AI Studio.
                  </li>
                  <li>
                    Pilih opsi <strong className="text-rose-400">Export as ZIP</strong> atau <strong className="text-rose-400">Export to GitHub</strong>.
                  </li>
                  <li>
                    Buka file ZIP di komputermu, jalankan perintah:
                    <div className="mt-1 p-2 rounded-lg bg-black text-rose-300 font-mono text-[11px]">
                      npm install && npm run build
                    </div>
                  </li>
                  <li>
                    Folder <code className="text-rose-400 font-bold font-mono">dist/</code> siap diunggah ke hosting mana saja (Vercel, Netlify, Cloud Run, atau VPS Nginx).
                  </li>
                </ol>

                <div className="p-3 rounded-xl bg-rose-600/10 border border-rose-500/20 text-neutral-300 space-y-1">
                  <div className="flex items-center gap-2 text-rose-400 font-bold">
                    <Layers className="w-4 h-4" />
                    <span>Status Build Produksi</span>
                  </div>
                  <p className="text-[11px] text-neutral-400">
                    Paket produksi <code className="text-neutral-200 font-mono">dist/</code> telah berhasil dikompilasi dengan aset minified, Service Worker Workbox, dan App Manifest yang siap pakai.
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer info */}
        <div className="pt-3 border-t border-neutral-800/80 flex items-center justify-between text-[11px] text-neutral-500 shrink-0">
          <span>Rafisqy Anime • PWA & APK Ready</span>
          <button
            onClick={onClose}
            className="text-neutral-400 hover:text-white transition font-medium"
          >
            Tutup
          </button>
        </div>

      </div>
    </div>
  );
};

