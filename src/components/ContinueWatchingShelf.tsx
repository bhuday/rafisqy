import React from 'react';
import { Play, Trash2, Clock, CheckCircle2 } from 'lucide-react';
import { WatchHistoryItem, Anime } from '../types/anime';

interface ContinueWatchingShelfProps {
  history: WatchHistoryItem[];
  animes: Anime[];
  onResume: (anime: Anime, episodeNumber: number, timestamp: number) => void;
  onRemoveItem: (animeId: number) => void;
  onClearAll: () => void;
}

export const ContinueWatchingShelf: React.FC<ContinueWatchingShelfProps> = ({
  history,
  animes,
  onResume,
  onRemoveItem,
  onClearAll,
}) => {
  if (history.length === 0) return null;

  function formatTime(seconds: number): string {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  }

  return (
    <section className="mb-10 animate-in fade-in-50 duration-300">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-rose-600/20 text-rose-500 flex items-center justify-center">
            <Clock className="w-4 h-4" />
          </div>
          <div>
            <h2 className="text-lg sm:text-xl font-display font-bold text-white tracking-tight">
              Lanjutkan Menonton
            </h2>
            <p className="text-xs text-neutral-400">
              Lanjutkan video dari episode dan durasi terakhir kamu
            </p>
          </div>
        </div>

        {history.length > 0 && (
          <button
            onClick={onClearAll}
            className="text-xs text-neutral-400 hover:text-rose-400 flex items-center gap-1 transition"
          >
            <Trash2 className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Hapus Semua Riwayat</span>
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {history.slice(0, 4).map((item) => {
          const matchedAnime = animes.find((a) => a.id === item.animeId);
          const animeData: Anime = matchedAnime || {
            id: item.animeId,
            title: { romaji: item.animeTitle, english: item.animeTitle, native: '' },
            coverImage: item.animeImage,
            synopsis: '',
            score: 8.5,
            episodesCount: 24,
            status: 'Currently Airing',
            format: 'TV',
            genres: ['Anime'],
          };

          return (
            <div
              key={`${item.animeId}-${item.episodeNumber}`}
              className="bg-neutral-900 border border-neutral-800/80 hover:border-neutral-700 rounded-xl overflow-hidden group shadow-md transition-all duration-200 flex flex-col justify-between"
            >
              <div className="relative h-36 overflow-hidden bg-neutral-950">
                <img
                  src={item.animeImage}
                  alt={item.animeTitle}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/40 to-transparent" />
                
                {/* Play hover button */}
                <button
                  onClick={() => onResume(animeData, item.episodeNumber, item.timestamp)}
                  title="Lanjutkan Menonton"
                  className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/40 backdrop-blur-[1px]"
                >
                  <div className="w-12 h-12 rounded-full bg-rose-600 text-white flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                    <Play className="w-5 h-5 fill-current ml-0.5" />
                  </div>
                </button>

                {/* Episode label badge */}
                <span className="absolute top-2 left-2 px-2 py-0.5 rounded text-[11px] font-bold bg-neutral-900/90 text-neutral-200 border border-neutral-700/60 backdrop-blur-sm">
                  Ep {item.episodeNumber}
                </span>

                {/* Delete button */}
                <button
                  onClick={() => onRemoveItem(item.animeId)}
                  title="Hapus dari daftar tonton"
                  className="absolute top-2 right-2 w-7 h-7 rounded-full bg-neutral-900/80 hover:bg-rose-600/80 text-neutral-400 hover:text-white flex items-center justify-center transition"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>

                {/* Progress bar along the bottom of the thumbnail */}
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-neutral-800">
                  <div
                    className="h-full bg-rose-500"
                    style={{ width: `${Math.min(item.progressPercent || 0, 100)}%` }}
                  />
                </div>
              </div>

              {/* Info Details */}
              <div className="p-3">
                <h3 className="text-xs sm:text-sm font-semibold text-white truncate mb-1 group-hover:text-rose-400 transition-colors">
                  {item.animeTitle}
                </h3>
                
                <div className="flex items-center justify-between text-[11px] text-neutral-400 mb-2">
                  <span className="truncate max-w-[140px]">{item.episodeTitle || `Episode ${item.episodeNumber}`}</span>
                  <span>{formatTime(item.timestamp)} / {formatTime(item.duration || 1425)}</span>
                </div>

                <button
                  onClick={() => onResume(animeData, item.episodeNumber, item.timestamp)}
                  className="w-full py-1.5 px-3 rounded-lg bg-neutral-800 hover:bg-rose-600 text-neutral-200 hover:text-white text-xs font-semibold flex items-center justify-center gap-1.5 transition"
                >
                  <Play className="w-3 h-3 fill-current" />
                  <span>Lanjutkan ({Math.round(item.progressPercent || 0)}%)</span>
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
