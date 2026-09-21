import React, { useState } from 'react';
import { X, Play, Plus, Check, Star, Calendar, Film, Layers, Award, Sparkles, Volume2 } from 'lucide-react';
import { Anime } from '../types/anime';

interface AnimeDetailModalProps {
  anime: Anime | null;
  onClose: () => void;
  onPlayEpisode: (anime: Anime, epNumber: number) => void;
  onToggleWatchlist: (anime: Anime) => void;
  isInWatchlist: boolean;
}

export const AnimeDetailModal: React.FC<AnimeDetailModalProps> = ({
  anime,
  onClose,
  onPlayEpisode,
  onToggleWatchlist,
  isInWatchlist,
}) => {
  const [activeTab, setActiveTab] = useState<'episodes' | 'trailer' | 'characters'>('episodes');

  if (!anime) return null;

  const episodes = anime.episodes || [];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/85 backdrop-blur-md overflow-y-auto animate-in fade-in-50 duration-200">
      <div 
        className="relative w-full max-w-4xl bg-neutral-900 border border-neutral-800 rounded-2xl shadow-2xl overflow-hidden my-8 max-h-[90vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-30 p-2 rounded-full bg-neutral-950/80 hover:bg-neutral-800 text-neutral-300 hover:text-white border border-neutral-700/60 backdrop-blur-sm transition shadow-lg"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header / Backdrop */}
        <div className="relative h-56 sm:h-72 w-full overflow-hidden shrink-0 bg-neutral-950">
          <img
            src={anime.bannerImage || anime.coverImage}
            alt={anime.title.romaji}
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-neutral-900 via-neutral-900/60 to-transparent" />

          {/* Quick info overlay inside backdrop */}
          <div className="absolute bottom-4 left-4 right-4 sm:left-8 sm:right-8 flex items-end gap-4">
            <img
              src={anime.coverImage}
              alt={anime.title.romaji}
              className="w-24 sm:w-32 h-36 sm:h-48 object-cover rounded-xl border-2 border-neutral-700/80 shadow-2xl shrink-0 -mb-8 sm:-mb-12 bg-neutral-950 z-10"
              referrerPolicy="no-referrer"
            />
            <div className="flex-1 min-w-0 pb-1">
              <div className="flex flex-wrap items-center gap-2 mb-1.5">
                <span className="flex items-center gap-1 px-2 py-0.5 rounded text-xs font-bold bg-amber-500/20 text-amber-300 border border-amber-500/30">
                  <Star className="w-3.5 h-3.5 fill-amber-400" />
                  {anime.score}
                </span>
                <span className="px-2 py-0.5 rounded text-xs font-semibold bg-neutral-800/80 text-neutral-300 border border-neutral-700/40">
                  {anime.format}
                </span>
                <span className="px-2 py-0.5 rounded text-xs font-semibold bg-neutral-800/80 text-neutral-300 border border-neutral-700/40">
                  {anime.status}
                </span>
              </div>
              <h2 className="text-lg sm:text-2xl font-display font-extrabold text-white truncate drop-shadow">
                {anime.title.romaji}
              </h2>
              {anime.title.native && (
                <p className="text-xs text-rose-300/80 truncate">
                  {anime.title.native} • {anime.studio}
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Modal Scrollable Body */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-8 pt-12 sm:pt-16 space-y-6">
          
          {/* Action Row */}
          <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-neutral-800">
            <div className="flex items-center gap-3">
              <button
                onClick={() => {
                  onPlayEpisode(anime, 1);
                  onClose();
                }}
                className="px-5 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-500 text-white text-xs sm:text-sm font-bold flex items-center gap-2 shadow-lg shadow-rose-600/30 transition active:scale-95"
              >
                <Play className="w-4 h-4 fill-current" />
                <span>Mulai Nonton Episode 1</span>
              </button>

              <button
                onClick={() => onToggleWatchlist(anime)}
                className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold flex items-center gap-2 border transition ${
                  isInWatchlist
                    ? 'bg-rose-600/20 text-rose-400 border-rose-500/40'
                    : 'bg-neutral-800 hover:bg-neutral-700 text-neutral-200 border-neutral-700'
                }`}
              >
                {isInWatchlist ? <Check className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                <span>{isInWatchlist ? 'Tersimpan' : 'Tambah ke Koleksi'}</span>
              </button>
            </div>

            {/* Quick stats */}
            <div className="flex items-center gap-4 text-xs text-neutral-400">
              <span>Studio: <strong className="text-neutral-200">{anime.studio || 'N/A'}</strong></span>
              <span>Musim: <strong className="text-neutral-200">{anime.season || '2024'}</strong></span>
              <span>Episode: <strong className="text-neutral-200">{anime.episodesCount}</strong></span>
            </div>
          </div>

          {/* Synopsis */}
          <div>
            <h3 className="text-xs font-bold text-neutral-400 uppercase tracking-wider mb-2">
              Sinopsis
            </h3>
            <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed">
              {anime.synopsis}
            </p>
          </div>

          {/* Genres */}
          <div>
            <h3 className="text-xs font-bold text-neutral-400 uppercase tracking-wider mb-2">
              Genre
            </h3>
            <div className="flex flex-wrap gap-1.5">
              {anime.genres.map((g) => (
                <span
                  key={g}
                  className="px-2.5 py-1 rounded-lg text-xs bg-neutral-800 text-neutral-200 border border-neutral-700/60"
                >
                  {g}
                </span>
              ))}
            </div>
          </div>

          {/* Tabs: Episode List vs Trailer vs Characters */}
          <div className="border-t border-neutral-800 pt-6">
            <div className="flex items-center gap-2 mb-4 border-b border-neutral-800 pb-2">
              <button
                onClick={() => setActiveTab('episodes')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition ${
                  activeTab === 'episodes'
                    ? 'bg-rose-600 text-white'
                    : 'text-neutral-400 hover:text-white'
                }`}
              >
                Daftar Episode ({episodes.length})
              </button>

              {anime.trailer?.embed_url && (
                <button
                  onClick={() => setActiveTab('trailer')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition flex items-center gap-1.5 ${
                    activeTab === 'trailer'
                      ? 'bg-rose-600 text-white'
                      : 'text-neutral-400 hover:text-white'
                  }`}
                >
                  <Film className="w-3.5 h-3.5" />
                  <span>Trailer Resmi</span>
                </button>
              )}

              {anime.characters && anime.characters.length > 0 && (
                <button
                  onClick={() => setActiveTab('characters')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition ${
                    activeTab === 'characters'
                      ? 'bg-rose-600 text-white'
                      : 'text-neutral-400 hover:text-white'
                  }`}
                >
                  Karakter & Seiyuu
                </button>
              )}
            </div>

            {/* Tab: Episodes */}
            {activeTab === 'episodes' && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-h-72 overflow-y-auto pr-1">
                {episodes.map((ep) => (
                  <div
                    key={ep.id}
                    onClick={() => {
                      onPlayEpisode(anime, ep.number);
                      onClose();
                    }}
                    className="p-2.5 rounded-xl bg-neutral-950/70 border border-neutral-800/80 hover:border-rose-500/60 hover:bg-neutral-800/60 transition cursor-pointer flex items-center gap-3 group"
                  >
                    <div className="relative w-16 h-11 rounded-lg overflow-hidden shrink-0 bg-neutral-900">
                      <img
                        src={ep.thumbnail}
                        alt={ep.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                        referrerPolicy="no-referrer"
                      />
                      <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                        <Play className="w-4 h-4 text-white fill-current" />
                      </div>
                      <span className="absolute bottom-1 right-1 text-[9px] bg-black/80 text-neutral-300 px-1 rounded">
                        {ep.duration}
                      </span>
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-white group-hover:text-rose-400 transition-colors">
                          Episode {ep.number}
                        </span>
                        <span className="text-[10px] text-rose-500 font-semibold">
                          Putar
                        </span>
                      </div>
                      <p className="text-[11px] text-neutral-400 truncate mt-0.5">
                        {ep.title}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Tab: Trailer Preview */}
            {activeTab === 'trailer' && anime.trailer?.embed_url && (
              <div className="aspect-video w-full rounded-xl overflow-hidden border border-neutral-800 bg-black">
                <iframe
                  src={anime.trailer.embed_url}
                  title="Official Trailer"
                  className="w-full h-full"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
            )}

            {/* Tab: Characters */}
            {activeTab === 'characters' && anime.characters && (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                {anime.characters.map((char) => (
                  <div key={char.id} className="p-2 rounded-xl bg-neutral-950/80 border border-neutral-800 flex items-center gap-2.5">
                    <img
                      src={char.image}
                      alt={char.name}
                      className="w-12 h-12 rounded-lg object-cover"
                      referrerPolicy="no-referrer"
                    />
                    <div className="min-w-0">
                      <h4 className="text-xs font-bold text-white truncate">{char.name}</h4>
                      <p className="text-[10px] text-rose-400">{char.role}</p>
                      {char.voiceActor && (
                        <p className="text-[10px] text-neutral-400 truncate">VA: {char.voiceActor.name}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}

          </div>

        </div>

      </div>
    </div>
  );
};
