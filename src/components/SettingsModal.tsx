import React from 'react';
import { X, SlidersHorizontal, Check, RefreshCw, Volume2, Film, Zap } from 'lucide-react';
import { UserSettings } from '../types/anime';

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  settings: UserSettings;
  onUpdateSettings: (newSettings: Partial<UserSettings>) => void;
  onClearHistory: () => void;
}

export const SettingsModal: React.FC<SettingsModalProps> = ({
  isOpen,
  onClose,
  settings,
  onUpdateSettings,
  onClearHistory,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in-50 duration-200">
      <div 
        className="w-full max-w-md bg-neutral-900 border border-neutral-800 rounded-2xl p-6 shadow-2xl space-y-6"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between border-b border-neutral-800 pb-4">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-rose-600/20 text-rose-500 flex items-center justify-center">
              <SlidersHorizontal className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-display font-bold text-white">
                Pengaturan Rafisqy Anime
              </h2>
              <p className="text-xs text-neutral-400">
                Sesuaikan preferensi pemutar video dan streaming
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-neutral-400 hover:text-white"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Options List */}
        <div className="space-y-4">
          
          {/* Auto Skip Intro */}
          <div className="flex items-center justify-between p-3 rounded-xl bg-neutral-950/60 border border-neutral-800/80">
            <div className="flex items-center gap-3">
              <Zap className="w-5 h-5 text-rose-500" />
              <div>
                <h4 className="text-xs sm:text-sm font-semibold text-white">
                  Lewati Intro Otomatis (Auto-Skip)
                </h4>
                <p className="text-[11px] text-neutral-400">
                  Secara otomatis melompati 85 detik lagu pembuka
                </p>
              </div>
            </div>
            <button
              onClick={() => onUpdateSettings({ autoSkipIntro: !settings.autoSkipIntro })}
              className={`w-12 h-6 rounded-full transition-colors relative ${
                settings.autoSkipIntro ? 'bg-rose-600' : 'bg-neutral-800'
              }`}
            >
              <div
                className={`w-5 h-5 rounded-full bg-white transition-transform ${
                  settings.autoSkipIntro ? 'translate-x-6' : 'translate-x-0.5'
                }`}
              />
            </button>
          </div>

          {/* Auto Next Episode */}
          <div className="flex items-center justify-between p-3 rounded-xl bg-neutral-950/60 border border-neutral-800/80">
            <div className="flex items-center gap-3">
              <Film className="w-5 h-5 text-rose-500" />
              <div>
                <h4 className="text-xs sm:text-sm font-semibold text-white">
                  Putar Episode Berikutnya Otomatis
                </h4>
                <p className="text-[11px] text-neutral-400">
                  Lanjut ke episode selanjutnya saat video selesai
                </p>
              </div>
            </div>
            <button
              onClick={() => onUpdateSettings({ autoNextEpisode: !settings.autoNextEpisode })}
              className={`w-12 h-6 rounded-full transition-colors relative ${
                settings.autoNextEpisode ? 'bg-rose-600' : 'bg-neutral-800'
              }`}
            >
              <div
                className={`w-5 h-5 rounded-full bg-white transition-transform ${
                  settings.autoNextEpisode ? 'translate-x-6' : 'translate-x-0.5'
                }`}
              />
            </button>
          </div>

          {/* Audio Preference: Sub / Dub */}
          <div className="p-3 rounded-xl bg-neutral-950/60 border border-neutral-800/80">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <Volume2 className="w-4 h-4 text-rose-500" />
                <h4 className="text-xs sm:text-sm font-semibold text-white">
                  Audio Bawaan (Default Audio)
                </h4>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => onUpdateSettings({ defaultAudio: 'sub' })}
                className={`py-2 rounded-lg text-xs font-bold transition flex items-center justify-center gap-1.5 ${
                  settings.defaultAudio === 'sub'
                    ? 'bg-rose-600 text-white'
                    : 'bg-neutral-900 border border-neutral-800 text-neutral-400'
                }`}
              >
                <span>Subtitle (SUB)</span>
                {settings.defaultAudio === 'sub' && <Check className="w-3.5 h-3.5" />}
              </button>

              <button
                onClick={() => onUpdateSettings({ defaultAudio: 'dub' })}
                className={`py-2 rounded-lg text-xs font-bold transition flex items-center justify-center gap-1.5 ${
                  settings.defaultAudio === 'dub'
                    ? 'bg-amber-500 text-neutral-950 font-extrabold'
                    : 'bg-neutral-900 border border-neutral-800 text-neutral-400'
                }`}
              >
                <span>Sulih Suara (DUB)</span>
                {settings.defaultAudio === 'dub' && <Check className="w-3.5 h-3.5" />}
              </button>
            </div>
          </div>

          {/* Video Quality Preference */}
          <div className="p-3 rounded-xl bg-neutral-950/60 border border-neutral-800/80">
            <h4 className="text-xs sm:text-sm font-semibold text-white mb-2">
              Kualitas Resolusi Bawaan
            </h4>
            <div className="grid grid-cols-4 gap-1.5 text-xs">
              {(['1080p', '720p', '480p', 'auto'] as const).map((q) => (
                <button
                  key={q}
                  onClick={() => onUpdateSettings({ defaultQuality: q })}
                  className={`py-1.5 rounded-lg font-bold uppercase transition ${
                    settings.defaultQuality === q
                      ? 'bg-rose-600 text-white'
                      : 'bg-neutral-900 border border-neutral-800 text-neutral-400'
                  }`}
                >
                  {q}
                </button>
              ))}
            </div>
          </div>

          {/* Reset History */}
          <div className="pt-2">
            <button
              onClick={() => {
                onClearHistory();
                onClose();
              }}
              className="w-full py-2.5 px-4 rounded-xl bg-red-950/40 hover:bg-red-900/60 border border-red-800/40 text-red-400 hover:text-red-200 text-xs font-semibold flex items-center justify-center gap-2 transition"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Hapus Semua Riwayat Video (Keep Watching)</span>
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};
