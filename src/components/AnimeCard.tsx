import React from 'react';
import { Play, Star, Plus, Check, Info } from 'lucide-react';
import { Anime } from '../types/anime';

interface AnimeCardProps {
  anime: Anime;
  onPlay: (anime: Anime, epNumber?: number) => void;
  onOpenDetails: (anime: Anime) => void;
  onToggleWatchlist: (anime: Anime) => void;
  isInWatchlist: boolean;
}

export const AnimeCard: React.FC<AnimeCardProps> = ({
  anime,
  onPlay,
  onOpenDetails,
  onToggleWatchlist,
  isInWatchlist,
}) => {
  return (
    <div className="group relative flex flex-col bg-neutral-900/60 rounded-xl overflow-hidden border border-neutral-800/80 hover:border-neutral-700/80 hover:shadow-xl hover:shadow-rose-950/20 transition-all duration-300">
      
      {/* Poster Image Container */}
      <div className="relative aspect-[3/4] w-full overflow-hidden bg-neutral-950">
        <img
          src={anime.coverImage}
          alt={anime.title.romaji}
          loading="lazy"
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          referrerPolicy="no-referrer"
        />

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-transparent to-black/30 opacity-70 group-hover:opacity-90 transition-opacity" />

        {/* Top Badges */}
        <div className="absolute top-2 left-2 right-2 flex items-center justify-between z-10 pointer-events-none">
          <span className="flex items-center gap-1 px-2 py-0.5 rounded-md text-[11px] font-bold bg-neutral-950/80 text-amber-300 border border-amber-500/30 backdrop-blur-sm shadow">
            <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
            {anime.score}
          </span>
          <div className="flex items-center gap-1">
            <span className="px-1.5 py-0.5 rounded text-[10px] font-bold bg-neutral-900/80 text-neutral-300 border border-neutral-700/50 backdrop-blur-sm">
              {anime.format}
            </span>
            <span className="px-1.5 py-0.5 rounded text-[10px] font-bold bg-rose-600/90 text-white shadow-sm">
              SUB/DUB
            </span>
          </div>
        </div>

        {/* Hover Quick Actions Overlay */}
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 p-4 opacity-0 group-hover:opacity-100 transition-all duration-200 bg-black/60 backdrop-blur-[2px] z-20">
          <button
            onClick={() => onPlay(anime, 1)}
            title="Tonton Sekarang"
            className="w-12 h-12 rounded-full bg-rose-600 hover:bg-rose-500 text-white flex items-center justify-center shadow-lg transform translate-y-2 group-hover:translate-y-0 transition-all duration-200 hover:scale-110 active:scale-95"
          >
            <Play className="w-6 h-6 fill-current ml-0.5" />
          </button>

          <div className="flex items-center gap-2 transform translate-y-2 group-hover:translate-y-0 transition-all duration-200 delay-75">
            <button
              onClick={() => onOpenDetails(anime)}
              title="Lihat Detail & Episode"
              className="px-3 py-1.5 rounded-lg bg-neutral-800/90 hover:bg-neutral-700 text-white text-xs font-semibold flex items-center gap-1.5 border border-neutral-600/50 backdrop-blur-sm transition"
            >
              <Info className="w-3.5 h-3.5" />
              <span>Detail</span>
            </button>

            <button
              onClick={() => onToggleWatchlist(anime)}
              title={isInWatchlist ? "Hapus dari Koleksi" : "Tambah ke Koleksi"}
              className={`p-1.5 rounded-lg border text-xs font-semibold transition ${
                isInWatchlist
                  ? 'bg-rose-600/30 border-rose-500 text-rose-400'
                  : 'bg-neutral-800/90 hover:bg-neutral-700 border-neutral-600/50 text-neutral-200 hover:text-white'
              }`}
            >
              {isInWatchlist ? <Check className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
            </button>
          </div>
        </div>

        {/* Bottom Episode count badge */}
        <div className="absolute bottom-2 left-2 z-10">
          <span className="text-[10px] font-semibold text-neutral-300 bg-neutral-900/85 px-2 py-0.5 rounded border border-neutral-800 backdrop-blur-sm">
            {anime.episodesCount} Ep
          </span>
        </div>
      </div>

      {/* Card Body */}
      <div className="p-3 flex-1 flex flex-col justify-between">
        <div>
          <h3 
            onClick={() => onOpenDetails(anime)}
            className="text-xs sm:text-sm font-semibold text-white truncate hover:text-rose-400 cursor-pointer transition-colors"
            title={anime.title.romaji}
          >
            {anime.title.romaji}
          </h3>
          <p className="text-[11px] text-neutral-400 truncate mt-0.5">
            {anime.genres.slice(0, 2).join(' • ')}
          </p>
        </div>

        <div className="mt-2 pt-2 border-t border-neutral-800/60 flex items-center justify-between text-[11px] text-neutral-500">
          <span className="truncate">{anime.studio || 'Studio'}</span>
          <span>{anime.year || '2024'}</span>
        </div>
      </div>

    </div>
  );
};
