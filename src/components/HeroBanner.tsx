import React, { useState, useEffect } from 'react';
import { Play, Plus, Check, Info, Star, ChevronLeft, ChevronRight, Volume2, Sparkles } from 'lucide-react';
import { Anime } from '../types/anime';

interface HeroBannerProps {
  featuredAnimes: Anime[];
  onPlayAnime: (anime: Anime, episodeNum?: number) => void;
  onOpenDetails: (anime: Anime) => void;
  onToggleWatchlist: (anime: Anime) => void;
  isInWatchlist: (animeId: number) => boolean;
}

export const HeroBanner: React.FC<HeroBannerProps> = ({
  featuredAnimes,
  onPlayAnime,
  onOpenDetails,
  onToggleWatchlist,
  isInWatchlist,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Auto rotate banner every 8 seconds
  useEffect(() => {
    if (featuredAnimes.length <= 1) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % featuredAnimes.length);
    }, 8000);
    return () => clearInterval(interval);
  }, [featuredAnimes.length]);

  if (!featuredAnimes || featuredAnimes.length === 0) return null;

  const current = featuredAnimes[currentIndex];
  const inWatchlist = isInWatchlist(current.id);

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + featuredAnimes.length) % featuredAnimes.length);
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % featuredAnimes.length);
  };

  return (
    <div className="relative w-full h-[460px] sm:h-[520px] md:h-[580px] overflow-hidden rounded-2xl bg-neutral-900 border border-neutral-800/80 shadow-2xl mb-8 group">
      
      {/* Background Poster with Dark Gradient Mask */}
      <div 
        className="absolute inset-0 bg-cover bg-center transition-all duration-700 ease-out transform scale-105"
        style={{ backgroundImage: `url(${current.bannerImage || current.coverImage})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/70 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-neutral-950 via-neutral-950/60 to-transparent" />
        <div className="absolute inset-0 backdrop-blur-[1px]" />
      </div>

      {/* Slide Navigation Buttons */}
      <div className="absolute right-4 top-1/2 -translate-y-1/2 flex flex-col gap-2 z-20 opacity-0 group-hover:opacity-100 transition-opacity">
        <button
          onClick={handlePrev}
          title="Anime Sebelumnya"
          className="w-10 h-10 rounded-full bg-neutral-900/80 hover:bg-neutral-800 border border-neutral-700/60 text-white flex items-center justify-center transition shadow-lg backdrop-blur-sm"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
        <button
          onClick={handleNext}
          title="Anime Selanjutnya"
          className="w-10 h-10 rounded-full bg-neutral-900/80 hover:bg-neutral-800 border border-neutral-700/60 text-white flex items-center justify-center transition shadow-lg backdrop-blur-sm"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>

      {/* Content Container */}
      <div className="relative z-10 h-full flex flex-col justify-end p-6 sm:p-10 md:p-12 max-w-3xl">
        
        {/* Badges / Metadata */}
        <div className="flex flex-wrap items-center gap-2 sm:gap-3 mb-3 animate-in fade-in-50 duration-300">
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-rose-600/90 text-white text-xs font-bold tracking-wide shadow-md">
            <Sparkles className="w-3.5 h-3.5" />
            SOROTAN MINGGU INI
          </span>
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-amber-500/20 border border-amber-500/40 text-amber-300 text-xs font-bold">
            <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
            {current.score}
          </span>
          <span className="px-2.5 py-1 rounded-lg bg-neutral-800/80 text-neutral-300 text-xs font-semibold backdrop-blur-md border border-neutral-700/50">
            {current.format}
          </span>
          <span className="px-2.5 py-1 rounded-lg bg-neutral-800/80 text-neutral-300 text-xs font-semibold backdrop-blur-md border border-neutral-700/50">
            {current.episodesCount} Episode
          </span>
          <span className="px-2.5 py-1 rounded-lg bg-emerald-950/70 border border-emerald-600/40 text-emerald-400 text-xs font-semibold">
            {current.status === 'Currently Airing' ? 'Sedang Tayang' : 'Tamat'}
          </span>
        </div>

        {/* Title */}
        <h1 className="text-2xl sm:text-4xl md:text-5xl font-display font-extrabold text-white tracking-tight leading-tight sm:leading-none mb-2 drop-shadow-md">
          {current.title.romaji}
        </h1>

        {/* Japanese Subtitle */}
        {current.title.native && (
          <p className="text-sm font-medium text-rose-300/80 tracking-wider mb-3">
            {current.title.native} • {current.studio}
          </p>
        )}

        {/* Genres */}
        <div className="flex flex-wrap gap-1.5 mb-4">
          {current.genres.map((genre) => (
            <span
              key={genre}
              className="px-2 py-0.5 rounded text-[11px] font-medium bg-neutral-800/70 text-neutral-300 border border-neutral-700/30"
            >
              {genre}
            </span>
          ))}
        </div>

        {/* Synopsis snippet */}
        <p className="text-xs sm:text-sm text-neutral-300 line-clamp-2 sm:line-clamp-3 mb-6 max-w-2xl leading-relaxed">
          {current.synopsis}
        </p>

        {/* Call to action buttons */}
        <div className="flex flex-wrap items-center gap-3">
          <button
            id={`hero-watch-btn-${current.id}`}
            onClick={() => onPlayAnime(current, 1)}
            className="px-6 py-3 rounded-xl bg-gradient-to-r from-rose-600 to-rose-500 hover:from-rose-500 hover:to-rose-400 text-white font-bold text-sm sm:text-base flex items-center gap-2.5 shadow-xl shadow-rose-600/30 hover:shadow-rose-600/50 transition duration-200 active:scale-95"
          >
            <Play className="w-5 h-5 fill-current" />
            <span>Tonton Episode 1</span>
          </button>

          <button
            id={`hero-details-btn-${current.id}`}
            onClick={() => onOpenDetails(current)}
            className="px-4 py-3 rounded-xl bg-neutral-900/80 hover:bg-neutral-800 text-neutral-200 hover:text-white font-semibold text-sm flex items-center gap-2 border border-neutral-700/60 backdrop-blur-md transition active:scale-95"
          >
            <Info className="w-4 h-4" />
            <span>Detail & Episode</span>
          </button>

          <button
            id={`hero-watchlist-btn-${current.id}`}
            onClick={() => onToggleWatchlist(current)}
            title={inWatchlist ? "Hapus dari Koleksi" : "Tambah ke Koleksi"}
            className={`p-3 rounded-xl border transition active:scale-95 ${
              inWatchlist
                ? 'bg-rose-600/20 border-rose-500 text-rose-400'
                : 'bg-neutral-900/80 hover:bg-neutral-800 border-neutral-700/60 text-neutral-300 hover:text-white'
            }`}
          >
            {inWatchlist ? <Check className="w-5 h-5" /> : <Plus className="w-5 h-5" />}
          </button>
        </div>

      </div>

      {/* Bottom slide indicator dots */}
      <div className="absolute bottom-4 right-6 sm:right-10 flex items-center gap-1.5 z-20">
        {featuredAnimes.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrentIndex(idx)}
            title={`Slide ${idx + 1}`}
            className={`h-2 rounded-full transition-all duration-300 ${
              idx === currentIndex ? 'w-8 bg-rose-500' : 'w-2 bg-neutral-600/70 hover:bg-neutral-400'
            }`}
          />
        ))}
      </div>

    </div>
  );
};
