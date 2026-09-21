import React, { useState } from 'react';
import { Compass, Filter, Sparkles } from 'lucide-react';
import { Anime } from '../types/anime';
import { AnimeCard } from './AnimeCard';
import { GENRE_LIST } from '../data/animeData';

interface GenreSectionProps {
  animes: Anime[];
  onPlayAnime: (anime: Anime, epNumber?: number) => void;
  onOpenDetails: (anime: Anime) => void;
  onToggleWatchlist: (anime: Anime) => void;
  isInWatchlist: (animeId: number) => boolean;
}

export const GenreSection: React.FC<GenreSectionProps> = ({
  animes,
  onPlayAnime,
  onOpenDetails,
  onToggleWatchlist,
  isInWatchlist,
}) => {
  const [selectedGenre, setSelectedGenre] = useState<string>('Semua Genre');
  const [selectedFormat, setSelectedFormat] = useState<string>('All');
  const [sortBy, setSortBy] = useState<'score' | 'popular' | 'latest'>('score');

  const filteredAnimes = animes.filter((anime) => {
    const matchGenre = 
      selectedGenre === 'Semua Genre' || 
      anime.genres.some((g) => g.toLowerCase() === selectedGenre.toLowerCase());
    
    const matchFormat = 
      selectedFormat === 'All' || anime.format === selectedFormat;

    return matchGenre && matchFormat;
  }).sort((a, b) => {
    if (sortBy === 'score') return b.score - a.score;
    if (sortBy === 'popular') return (a.popularity || 999) - (b.popularity || 999);
    if (sortBy === 'latest') return (b.year || 0) - (a.year || 0);
    return 0;
  });

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl sm:text-3xl font-display font-extrabold text-white flex items-center gap-2.5">
            <Compass className="w-7 h-7 text-rose-500" />
            <span>Jelajahi Anime Berdasarkan Genre</span>
          </h1>
          <p className="text-xs sm:text-sm text-neutral-400 mt-1">
            Temukan ribuan episode anime berkualitas tinggi sesuai genre favorit kamu
          </p>
        </div>

        {/* Format & Sort Selectors */}
        <div className="flex flex-wrap items-center gap-2 text-xs">
          <div className="flex items-center gap-1 bg-neutral-900 border border-neutral-800 rounded-xl p-1">
            <span className="text-neutral-400 px-2">Format:</span>
            {['All', 'TV', 'Movie'].map((fmt) => (
              <button
                key={fmt}
                onClick={() => setSelectedFormat(fmt)}
                className={`px-2.5 py-1 rounded-lg font-bold transition ${
                  selectedFormat === fmt
                    ? 'bg-rose-600 text-white shadow'
                    : 'text-neutral-400 hover:text-white'
                }`}
              >
                {fmt}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-1 bg-neutral-900 border border-neutral-800 rounded-xl p-1">
            <span className="text-neutral-400 px-2">Urutan:</span>
            <button
              onClick={() => setSortBy('score')}
              className={`px-2.5 py-1 rounded-lg font-bold transition ${
                sortBy === 'score' ? 'bg-rose-600 text-white' : 'text-neutral-400 hover:text-white'
              }`}
            >
              Rating Tertinggi
            </button>
            <button
              onClick={() => setSortBy('popular')}
              className={`px-2.5 py-1 rounded-lg font-bold transition ${
                sortBy === 'popular' ? 'bg-rose-600 text-white' : 'text-neutral-400 hover:text-white'
              }`}
            >
              Populer
            </button>
          </div>
        </div>
      </div>

      {/* Genre Pills */}
      <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-6 no-scrollbar">
        {GENRE_LIST.map((genre) => (
          <button
            key={genre}
            onClick={() => setSelectedGenre(genre)}
            className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all shadow-sm shrink-0 ${
              selectedGenre === genre
                ? 'bg-gradient-to-r from-rose-600 to-rose-500 text-white shadow-rose-600/30'
                : 'bg-neutral-900 hover:bg-neutral-800 text-neutral-300 border border-neutral-800'
            }`}
          >
            {genre}
          </button>
        ))}
      </div>

      {/* Results Count & Grid */}
      <div className="flex items-center justify-between text-xs text-neutral-400 mb-4">
        <span>Menampilkan <strong className="text-white">{filteredAnimes.length}</strong> judul</span>
        <span className="text-rose-400 font-semibold">{selectedGenre}</span>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
        {filteredAnimes.map((anime) => (
          <AnimeCard
            key={anime.id}
            anime={anime}
            onPlay={onPlayAnime}
            onOpenDetails={onOpenDetails}
            onToggleWatchlist={onToggleWatchlist}
            isInWatchlist={isInWatchlist(anime.id)}
          />
        ))}
      </div>

    </div>
  );
};
