import React, { useRef } from 'react';
import { ChevronLeft, ChevronRight, LucideIcon } from 'lucide-react';
import { Anime } from '../types/anime';
import { AnimeCard } from './AnimeCard';

interface AnimeCarouselProps {
  title: string;
  subtitle?: string;
  icon?: LucideIcon;
  animes: Anime[];
  onPlayAnime: (anime: Anime, epNumber?: number) => void;
  onOpenDetails: (anime: Anime) => void;
  onToggleWatchlist: (anime: Anime) => void;
  isInWatchlist: (animeId: number) => boolean;
  onViewAll?: () => void;
}

export const AnimeCarousel: React.FC<AnimeCarouselProps> = ({
  title,
  subtitle,
  icon: Icon,
  animes,
  onPlayAnime,
  onOpenDetails,
  onToggleWatchlist,
  isInWatchlist,
  onViewAll,
}) => {
  const scrollRef = useRef<HTMLDivElement>(null);

  const handleScroll = (direction: 'left' | 'right') => {
    if (!scrollRef.current) return;
    const distance = scrollRef.current.clientWidth * 0.75;
    scrollRef.current.scrollBy({
      left: direction === 'left' ? -distance : distance,
      behavior: 'smooth',
    });
  };

  return (
    <section className="mb-10">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2.5">
          {Icon && (
            <div className="w-8 h-8 rounded-lg bg-rose-600/20 text-rose-500 flex items-center justify-center">
              <Icon className="w-4 h-4" />
            </div>
          )}
          <div>
            <h2 className="text-lg sm:text-xl font-display font-bold text-white tracking-tight">
              {title}
            </h2>
            {subtitle && (
              <p className="text-xs text-neutral-400">
                {subtitle}
              </p>
            )}
          </div>
        </div>

        {/* Scroll Controls & View All */}
        <div className="flex items-center gap-2">
          {onViewAll && (
            <button
              onClick={onViewAll}
              className="text-xs font-semibold text-rose-500 hover:text-rose-400 px-2 py-1 transition"
            >
              Lihat Semua
            </button>
          )}

          <div className="hidden sm:flex items-center gap-1">
            <button
              onClick={() => handleScroll('left')}
              title="Geser ke Kiri"
              className="w-8 h-8 rounded-lg bg-neutral-900 hover:bg-neutral-800 border border-neutral-800 text-neutral-300 hover:text-white flex items-center justify-center transition"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={() => handleScroll('right')}
              title="Geser ke Kanan"
              className="w-8 h-8 rounded-lg bg-neutral-900 hover:bg-neutral-800 border border-neutral-800 text-neutral-300 hover:text-white flex items-center justify-center transition"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Horizontal Carousel */}
      <div
        ref={scrollRef}
        className="flex items-stretch gap-4 overflow-x-auto pb-4 scroll-smooth no-scrollbar"
        style={{ scrollSnapType: 'x mandatory' }}
      >
        {animes.map((anime) => (
          <div
            key={anime.id}
            className="w-40 sm:w-48 md:w-52 shrink-0"
            style={{ scrollSnapAlign: 'start' }}
          >
            <AnimeCard
              anime={anime}
              onPlay={onPlayAnime}
              onOpenDetails={onOpenDetails}
              onToggleWatchlist={onToggleWatchlist}
              isInWatchlist={isInWatchlist(anime.id)}
            />
          </div>
        ))}
      </div>
    </section>
  );
};
