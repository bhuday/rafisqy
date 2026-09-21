import React, { useState } from 'react';
import { Bookmark, Trash2, Play, Star, CheckCircle, Heart, Clock } from 'lucide-react';
import { WatchlistItem, Anime, WatchlistStatus } from '../types/anime';

interface WatchlistViewProps {
  watchlist: WatchlistItem[];
  onPlayAnime: (anime: Anime, epNumber?: number) => void;
  onOpenDetails: (anime: Anime) => void;
  onRemoveFromWatchlist: (animeId: number) => void;
  onChangeStatus: (animeId: number, status: WatchlistStatus) => void;
}

export const WatchlistView: React.FC<WatchlistViewProps> = ({
  watchlist,
  onPlayAnime,
  onOpenDetails,
  onRemoveFromWatchlist,
  onChangeStatus,
}) => {
  const [selectedFilter, setSelectedFilter] = useState<string>('all');

  const filteredItems = watchlist.filter((item) => {
    if (selectedFilter === 'all') return true;
    return item.status === selectedFilter;
  });

  const filterTabs = [
    { id: 'all', label: 'Semua Koleksi', count: watchlist.length },
    { id: 'watching', label: 'Sedang Ditonton', count: watchlist.filter((i) => i.status === 'watching').length },
    { id: 'plan_to_watch', label: 'Ingin Ditonton', count: watchlist.filter((i) => i.status === 'plan_to_watch').length },
    { id: 'completed', label: 'Tamat', count: watchlist.filter((i) => i.status === 'completed').length },
    { id: 'favorite', label: 'Favorit', count: watchlist.filter((i) => i.status === 'favorite').length },
  ];

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl sm:text-3xl font-display font-extrabold text-white flex items-center gap-2.5">
            <Bookmark className="w-7 h-7 text-rose-500 fill-rose-500/20" />
            <span>Koleksi Anime Saya</span>
          </h1>
          <p className="text-xs sm:text-sm text-neutral-400 mt-1">
            Simpan dan kelola anime favorit serta daftar tontonan kamu di Rafisqy Anime
          </p>
        </div>

        {/* Filter Badges */}
        <div className="flex flex-wrap gap-1.5">
          {filterTabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setSelectedFilter(tab.id)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition ${
                selectedFilter === tab.id
                  ? 'bg-rose-600 text-white shadow-md shadow-rose-600/30'
                  : 'bg-neutral-900 border border-neutral-800 text-neutral-400 hover:text-white hover:bg-neutral-800'
              }`}
            >
              <span>{tab.label}</span>
              <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-black/40 text-neutral-300">
                {tab.count}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Grid of Items */}
      {filteredItems.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
          {filteredItems.map(({ anime, status }) => (
            <div
              key={anime.id}
              className="bg-neutral-900 border border-neutral-800 rounded-xl overflow-hidden group flex flex-col justify-between hover:border-neutral-700 transition"
            >
              <div className="relative aspect-[3/4] bg-neutral-950 overflow-hidden">
                <img
                  src={anime.coverImage}
                  alt={anime.title.romaji}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-transparent to-black/40 opacity-80" />

                {/* Status selector */}
                <div className="absolute top-2 left-2 z-10">
                  <select
                    value={status}
                    onChange={(e) => onChangeStatus(anime.id, e.target.value as WatchlistStatus)}
                    className="bg-black/80 text-[10px] font-bold text-rose-400 border border-neutral-700 rounded px-1.5 py-0.5 backdrop-blur-sm cursor-pointer"
                  >
                    <option value="watching">Ditonton</option>
                    <option value="plan_to_watch">Ingin Nonton</option>
                    <option value="completed">Tamat</option>
                    <option value="favorite">Favorit</option>
                  </select>
                </div>

                {/* Delete button */}
                <button
                  onClick={() => onRemoveFromWatchlist(anime.id)}
                  title="Hapus dari Koleksi"
                  className="absolute top-2 right-2 w-7 h-7 rounded-full bg-black/80 hover:bg-rose-600 text-neutral-300 hover:text-white flex items-center justify-center transition z-10"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>

                {/* Quick Watch Hover */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/50 backdrop-blur-[1px]">
                  <button
                    onClick={() => onPlayAnime(anime, 1)}
                    className="w-12 h-12 rounded-full bg-rose-600 text-white flex items-center justify-center shadow-lg hover:scale-110 active:scale-95 transition"
                  >
                    <Play className="w-6 h-6 fill-current ml-0.5" />
                  </button>
                </div>

                <div className="absolute bottom-2 left-2 flex items-center gap-1 text-[11px] font-bold text-amber-300">
                  <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                  <span>{anime.score}</span>
                </div>
              </div>

              <div className="p-2.5">
                <h4
                  onClick={() => onOpenDetails(anime)}
                  className="text-xs font-bold text-white truncate cursor-pointer hover:text-rose-400 transition"
                  title={anime.title.romaji}
                >
                  {anime.title.romaji}
                </h4>
                <p className="text-[10px] text-neutral-400 truncate mt-0.5">
                  {anime.genres.slice(0, 2).join(' • ')}
                </p>

                <button
                  onClick={() => onPlayAnime(anime, 1)}
                  className="w-full mt-2 py-1 px-2 rounded-lg bg-neutral-800 hover:bg-rose-600 text-neutral-200 hover:text-white text-[11px] font-semibold flex items-center justify-center gap-1 transition"
                >
                  <Play className="w-3 h-3 fill-current" />
                  <span>Tonton</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="py-16 text-center bg-neutral-900/40 border border-dashed border-neutral-800 rounded-2xl p-8">
          <Bookmark className="w-12 h-12 text-neutral-600 mx-auto mb-3" />
          <h3 className="text-base font-bold text-neutral-300">Koleksi Kosong</h3>
          <p className="text-xs text-neutral-500 max-w-sm mx-auto mt-1">
            Kamu belum menambahkan anime ke dalam kategori ini. Jelajahi beranda dan klik tanda "+" untuk menyimpan anime ke koleksi kamu!
          </p>
        </div>
      )}

    </div>
  );
};
