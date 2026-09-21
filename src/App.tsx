import React, { useState, useEffect } from 'react';
import { 
  Flame, 
  Sparkles, 
  Tv, 
  Compass, 
  Bookmark, 
  History, 
  Star, 
  Film, 
  Play, 
  Trash2,
  Clock
} from 'lucide-react';
import { Anime, WatchHistoryItem, WatchlistItem, UserSettings, WatchlistStatus } from './types/anime';
import { INITIAL_ANIMES } from './data/animeData';
import { Navbar } from './components/Navbar';
import { HeroBanner } from './components/HeroBanner';
import { ContinueWatchingShelf } from './components/ContinueWatchingShelf';
import { AnimeCarousel } from './components/AnimeCarousel';
import { AnimeCard } from './components/AnimeCard';
import { VideoPlayerView } from './components/VideoPlayerView';
import { AnimeDetailModal } from './components/AnimeDetailModal';
import { WatchlistView } from './components/WatchlistView';
import { GenreSection } from './components/GenreSection';
import { SettingsModal } from './components/SettingsModal';
import { InstallAppModal } from './components/InstallAppModal';
import { Footer } from './components/Footer';

export default function App() {
  // Navigation & View State
  const [currentTab, setCurrentTab] = useState<string>('home');
  const [allAnimes, setAllAnimes] = useState<Anime[]>(INITIAL_ANIMES);
  
  // Video Player Watch Mode State
  const [activeAnimeForWatch, setActiveAnimeForWatch] = useState<Anime | null>(null);
  const [activeEpisodeNumber, setActiveEpisodeNumber] = useState<number>(1);
  const [initialWatchTimestamp, setInitialWatchTimestamp] = useState<number>(0);

  // Modals
  const [selectedAnimeForDetail, setSelectedAnimeForDetail] = useState<Anime | null>(null);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isInstallModalOpen, setIsInstallModalOpen] = useState(false);

  // Persistent Watchlist State
  const [watchlist, setWatchlist] = useState<WatchlistItem[]>(() => {
    try {
      const saved = localStorage.getItem('rafisqy_watchlist');
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error(e);
    }
    // Default initial bookmark
    return [
      {
        animeId: INITIAL_ANIMES[0].id,
        anime: INITIAL_ANIMES[0],
        status: 'watching',
        addedAt: Date.now() - 1000000
      },
      {
        animeId: INITIAL_ANIMES[2].id,
        anime: INITIAL_ANIMES[2],
        status: 'favorite',
        addedAt: Date.now() - 2000000
      }
    ];
  });

  // Persistent History / Keep Watching State
  const [history, setHistory] = useState<WatchHistoryItem[]>(() => {
    try {
      const saved = localStorage.getItem('rafisqy_history');
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error(e);
    }
    // Default initial keep watching item so the UI showcases the feature immediately!
    return [
      {
        animeId: INITIAL_ANIMES[0].id,
        animeTitle: INITIAL_ANIMES[0].title.romaji,
        animeImage: INITIAL_ANIMES[0].coverImage,
        episodeNumber: 4,
        episodeTitle: 'Episode 4: Kekuatan Tersembunyi (Hidden Power)',
        timestamp: 864, // 14:24
        duration: 1425, // 23:45
        updatedAt: Date.now(),
        progressPercent: 60.6
      },
      {
        animeId: INITIAL_ANIMES[2].id,
        animeTitle: INITIAL_ANIMES[2].title.romaji,
        animeImage: INITIAL_ANIMES[2].coverImage,
        episodeNumber: 2,
        episodeTitle: 'Episode 2: Pertemuan yang Ditakdirkan',
        timestamp: 420,
        duration: 1425,
        updatedAt: Date.now() - 3600000,
        progressPercent: 29.5
      }
    ];
  });

  // Persistent User Settings
  const [settings, setSettings] = useState<UserSettings>(() => {
    try {
      const saved = localStorage.getItem('rafisqy_settings');
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error(e);
    }
    return {
      autoSkipIntro: true,
      autoNextEpisode: true,
      defaultAudio: 'sub',
      defaultQuality: '1080p'
    };
  });

  // Sync with localStorage
  useEffect(() => {
    try {
      localStorage.setItem('rafisqy_watchlist', JSON.stringify(watchlist));
    } catch (e) {
      console.error(e);
    }
  }, [watchlist]);

  useEffect(() => {
    try {
      localStorage.setItem('rafisqy_history', JSON.stringify(history));
    } catch (e) {
      console.error(e);
    }
  }, [history]);

  useEffect(() => {
    try {
      localStorage.setItem('rafisqy_settings', JSON.stringify(settings));
    } catch (e) {
      console.error(e);
    }
  }, [settings]);

  // Actions
  const handlePlayAnime = (anime: Anime, epNumber: number = 1, timestamp: number = 0) => {
    setActiveAnimeForWatch(anime);
    setActiveEpisodeNumber(epNumber);
    setInitialWatchTimestamp(timestamp);
    setCurrentTab('watch');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenDetails = (anime: Anime) => {
    setSelectedAnimeForDetail(anime);
  };

  const isInWatchlist = (animeId: number) => {
    return watchlist.some((item) => item.animeId === animeId);
  };

  const handleToggleWatchlist = (anime: Anime) => {
    if (isInWatchlist(anime.id)) {
      setWatchlist(watchlist.filter((item) => item.animeId !== anime.id));
    } else {
      const newItem: WatchlistItem = {
        animeId: anime.id,
        anime,
        status: 'watching',
        addedAt: Date.now()
      };
      setWatchlist([newItem, ...watchlist]);
    }
  };

  const handleRemoveFromWatchlist = (animeId: number) => {
    setWatchlist(watchlist.filter((item) => item.animeId !== animeId));
  };

  const handleChangeWatchlistStatus = (animeId: number, status: WatchlistStatus) => {
    setWatchlist(
      watchlist.map((item) =>
        item.animeId === animeId ? { ...item, status } : item
      )
    );
  };

  const handleSaveHistory = (
    animeId: number,
    animeTitle: string,
    animeImage: string,
    epNum: number,
    epTitle: string,
    currentTime: number,
    duration: number
  ) => {
    const progressPercent = duration > 0 ? (currentTime / duration) * 100 : 0;
    const existingIndex = history.findIndex((h) => h.animeId === animeId);

    const historyItem: WatchHistoryItem = {
      animeId,
      animeTitle,
      animeImage,
      episodeNumber: epNum,
      episodeTitle: epTitle,
      timestamp: currentTime,
      duration: duration || 1425,
      updatedAt: Date.now(),
      progressPercent
    };

    if (existingIndex >= 0) {
      const updated = [...history];
      updated[existingIndex] = historyItem;
      setHistory(updated);
    } else {
      setHistory([historyItem, ...history]);
    }
  };

  const handleRemoveHistoryItem = (animeId: number) => {
    setHistory(history.filter((h) => h.animeId !== animeId));
  };

  const handleClearAllHistory = () => {
    setHistory([]);
  };

  const handleUpdateSettings = (newSettings: Partial<UserSettings>) => {
    setSettings((prev) => ({ ...prev, ...newSettings }));
  };

  const handleToggleSubDub = () => {
    const nextAudio = settings.defaultAudio === 'sub' ? 'dub' : 'sub';
    handleUpdateSettings({ defaultAudio: nextAudio });
  };

  // Curated lists for Carousels
  const featuredAnimes = allAnimes.slice(0, 5);
  const trendingAnimes = allAnimes.filter((a) => a.popularity && a.popularity <= 15);
  const airingAnimes = allAnimes.filter((a) => a.status === 'Currently Airing' || a.year === 2024);
  const topRatedAnimes = [...allAnimes].sort((a, b) => b.score - a.score);

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-100 flex flex-col font-sans">
      
      {/* Navigation Bar */}
      <Navbar
        currentTab={currentTab}
        onSelectTab={(tab) => {
          setCurrentTab(tab);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        onSelectAnime={handleOpenDetails}
        onOpenWatchEpisode={(anime, epNum) => handlePlayAnime(anime, epNum)}
        onOpenSettings={() => setIsSettingsOpen(true)}
        onOpenInstallModal={() => setIsInstallModalOpen(true)}
        watchlistCount={watchlist.length}
        historyCount={history.length}
        subDubPreference={settings.defaultAudio}
        onToggleSubDub={handleToggleSubDub}
      />

      {/* Main Content Area */}
      <main className="flex-1">
        
        {/* Watch Mode: Video Player Page */}
        {currentTab === 'watch' && activeAnimeForWatch ? (
          <VideoPlayerView
            anime={activeAnimeForWatch}
            episodeNumber={activeEpisodeNumber}
            initialTimestamp={initialWatchTimestamp}
            settings={settings}
            onUpdateSettings={handleUpdateSettings}
            onSelectEpisode={(epNum) => {
              setActiveEpisodeNumber(epNum);
              setInitialWatchTimestamp(0);
            }}
            onBackToBrowse={() => setCurrentTab('home')}
            onSaveHistory={handleSaveHistory}
            isInWatchlist={isInWatchlist(activeAnimeForWatch.id)}
            onToggleWatchlist={handleToggleWatchlist}
          />
        ) : currentTab === 'watchlist' ? (
          /* Watchlist View */
          <WatchlistView
            watchlist={watchlist}
            onPlayAnime={handlePlayAnime}
            onOpenDetails={handleOpenDetails}
            onRemoveFromWatchlist={handleRemoveFromWatchlist}
            onChangeStatus={handleChangeWatchlistStatus}
          />
        ) : currentTab === 'genres' ? (
          /* Genre Explorer */
          <GenreSection
            animes={allAnimes}
            onPlayAnime={handlePlayAnime}
            onOpenDetails={handleOpenDetails}
            onToggleWatchlist={handleToggleWatchlist}
            isInWatchlist={isInWatchlist}
          />
        ) : currentTab === 'trending' ? (
          /* Populer / Trending View */
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <div className="flex items-center gap-2.5 mb-6">
              <div className="w-9 h-9 rounded-xl bg-rose-600/20 text-rose-500 flex items-center justify-center">
                <Flame className="w-5 h-5" />
              </div>
              <div>
                <h1 className="text-2xl sm:text-3xl font-display font-extrabold text-white">
                  Anime Paling Populer & Trending
                </h1>
                <p className="text-xs sm:text-sm text-neutral-400">
                  Judul anime terpanas yang paling banyak ditonton minggu ini
                </p>
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
              {topRatedAnimes.map((anime) => (
                <AnimeCard
                  key={anime.id}
                  anime={anime}
                  onPlay={handlePlayAnime}
                  onOpenDetails={handleOpenDetails}
                  onToggleWatchlist={handleToggleWatchlist}
                  isInWatchlist={isInWatchlist(anime.id)}
                />
              ))}
            </div>
          </div>
        ) : currentTab === 'airing' ? (
          /* Sedang Tayang / Top Airing View */
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <div className="flex items-center gap-2.5 mb-6">
              <div className="w-9 h-9 rounded-xl bg-rose-600/20 text-rose-500 flex items-center justify-center">
                <Sparkles className="w-5 h-5" />
              </div>
              <div>
                <h1 className="text-2xl sm:text-3xl font-display font-extrabold text-white">
                  Sedang Tayang Musim Ini
                </h1>
                <p className="text-xs sm:text-sm text-neutral-400">
                  Episode terbaru rilis setiap minggu dengan subtitle Indonesia & English
                </p>
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
              {allAnimes.map((anime) => (
                <AnimeCard
                  key={anime.id}
                  anime={anime}
                  onPlay={handlePlayAnime}
                  onOpenDetails={handleOpenDetails}
                  onToggleWatchlist={handleToggleWatchlist}
                  isInWatchlist={isInWatchlist(anime.id)}
                />
              ))}
            </div>
          </div>
        ) : currentTab === 'history' ? (
          /* Riwayat Tontonan / Keep Watching Tab */
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-rose-600/20 text-rose-500 flex items-center justify-center">
                  <History className="w-5 h-5" />
                </div>
                <div>
                  <h1 className="text-2xl sm:text-3xl font-display font-extrabold text-white">
                    Riwayat Tontonan Saya
                  </h1>
                  <p className="text-xs sm:text-sm text-neutral-400">
                    Daftar episode anime yang pernah kamu putar di Rafisqy Anime
                  </p>
                </div>
              </div>

              {history.length > 0 && (
                <button
                  onClick={handleClearAllHistory}
                  className="px-3 py-1.5 rounded-lg bg-neutral-900 border border-neutral-800 text-xs text-red-400 hover:text-red-300 hover:border-red-800/60 flex items-center gap-1.5 transition"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  <span>Hapus Riwayat</span>
                </button>
              )}
            </div>

            {history.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {history.map((item) => {
                  const matchedAnime = allAnimes.find((a) => a.id === item.animeId) || {
                    id: item.animeId,
                    title: { romaji: item.animeTitle, english: item.animeTitle, native: '' },
                    coverImage: item.animeImage,
                    synopsis: '',
                    score: 8.5,
                    episodesCount: 24,
                    status: 'Currently Airing' as const,
                    format: 'TV' as const,
                    genres: ['Anime']
                  };

                  return (
                    <div
                      key={`${item.animeId}-${item.episodeNumber}`}
                      className="bg-neutral-900 border border-neutral-800 rounded-xl overflow-hidden p-3 flex flex-col justify-between hover:border-neutral-700 transition"
                    >
                      <div className="relative aspect-video rounded-lg overflow-hidden bg-neutral-950 mb-3">
                        <img
                          src={item.animeImage}
                          alt={item.animeTitle}
                          className="w-full h-full object-cover"
                          referrerPolicy="no-referrer"
                        />
                        <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                          <button
                            onClick={() => handlePlayAnime(matchedAnime, item.episodeNumber, item.timestamp)}
                            className="w-10 h-10 rounded-full bg-rose-600 text-white flex items-center justify-center shadow hover:scale-105 transition"
                          >
                            <Play className="w-4 h-4 fill-current ml-0.5" />
                          </button>
                        </div>
                        <div className="absolute bottom-0 left-0 right-0 h-1 bg-neutral-800">
                          <div
                            className="h-full bg-rose-500"
                            style={{ width: `${Math.min(item.progressPercent || 0, 100)}%` }}
                          />
                        </div>
                      </div>

                      <div>
                        <h3 className="text-xs sm:text-sm font-bold text-white truncate">
                          {item.animeTitle}
                        </h3>
                        <p className="text-[11px] text-rose-400 font-semibold mt-0.5">
                          {item.episodeTitle}
                        </p>
                        <p className="text-[10px] text-neutral-500 mt-1">
                          Progres: {Math.round(item.progressPercent || 0)}% selesai
                        </p>
                      </div>

                      <div className="mt-3 pt-2 border-t border-neutral-800 flex items-center gap-2">
                        <button
                          onClick={() => handlePlayAnime(matchedAnime, item.episodeNumber, item.timestamp)}
                          className="flex-1 py-1.5 rounded-lg bg-rose-600 hover:bg-rose-500 text-white text-xs font-semibold flex items-center justify-center gap-1 transition"
                        >
                          <Play className="w-3 h-3 fill-current" />
                          <span>Lanjutkan</span>
                        </button>
                        <button
                          onClick={() => handleRemoveHistoryItem(item.animeId)}
                          className="p-1.5 rounded-lg bg-neutral-800 hover:bg-red-900/60 text-neutral-400 hover:text-red-300 transition"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="py-16 text-center bg-neutral-900/40 border border-dashed border-neutral-800 rounded-2xl p-8">
                <History className="w-12 h-12 text-neutral-600 mx-auto mb-3" />
                <h3 className="text-base font-bold text-neutral-300">Belum Ada Riwayat</h3>
                <p className="text-xs text-neutral-500 max-w-sm mx-auto mt-1">
                  Mulai putar episode anime di beranda, progres tontonan kamu akan otomatis tersimpan di sini.
                </p>
              </div>
            )}
          </div>
        ) : (
          /* Home View (Default) */
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
            
            {/* Hero Featured Anime Banner */}
            <HeroBanner
              featuredAnimes={featuredAnimes}
              onPlayAnime={handlePlayAnime}
              onOpenDetails={handleOpenDetails}
              onToggleWatchlist={handleToggleWatchlist}
              isInWatchlist={isInWatchlist}
            />

            {/* Continue Watching / Keep Watching Shelf (AniProject feature) */}
            <ContinueWatchingShelf
              history={history}
              animes={allAnimes}
              onResume={(anime, epNum, time) => handlePlayAnime(anime, epNum, time)}
              onRemoveItem={handleRemoveHistoryItem}
              onClearAll={handleClearAllHistory}
            />

            {/* Carousel: Populer Minggu Ini */}
            <AnimeCarousel
              title="Sedang Populer Minggu Ini"
              subtitle="Anime paling dicari dengan jumlah penonton tertinggi"
              icon={Flame}
              animes={trendingAnimes}
              onPlayAnime={handlePlayAnime}
              onOpenDetails={handleOpenDetails}
              onToggleWatchlist={handleToggleWatchlist}
              isInWatchlist={isInWatchlist}
              onViewAll={() => setCurrentTab('trending')}
            />

            {/* Carousel: Sedang Tayang Musim Ini */}
            <AnimeCarousel
              title="Rilis Terbaru Musim Ini"
              subtitle="Update episode terbaru dengan server super cepat"
              icon={Sparkles}
              animes={airingAnimes}
              onPlayAnime={handlePlayAnime}
              onOpenDetails={handleOpenDetails}
              onToggleWatchlist={handleToggleWatchlist}
              isInWatchlist={isInWatchlist}
              onViewAll={() => setCurrentTab('airing')}
            />

            {/* Carousel: Rating Tertinggi Sepanjang Masa */}
            <AnimeCarousel
              title="Anime Terbaik Rating Tertinggi"
              subtitle="Koleksi mahakarya anime dengan skor di atas 8.5"
              icon={Star}
              animes={topRatedAnimes.slice(0, 8)}
              onPlayAnime={handlePlayAnime}
              onOpenDetails={handleOpenDetails}
              onToggleWatchlist={handleToggleWatchlist}
              isInWatchlist={isInWatchlist}
              onViewAll={() => setCurrentTab('genres')}
            />

          </div>
        )}

      </main>

      {/* Footer */}
      <Footer />

      {/* Anime Detail & Trailer Modal */}
      <AnimeDetailModal
        anime={selectedAnimeForDetail}
        onClose={() => setSelectedAnimeForDetail(null)}
        onPlayEpisode={handlePlayAnime}
        onToggleWatchlist={handleToggleWatchlist}
        isInWatchlist={selectedAnimeForDetail ? isInWatchlist(selectedAnimeForDetail.id) : false}
      />

      {/* Settings Modal */}
      <SettingsModal
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
        settings={settings}
        onUpdateSettings={handleUpdateSettings}
        onClearHistory={handleClearAllHistory}
      />

      {/* PWA In-App Install Modal */}
      <InstallAppModal
        isOpen={isInstallModalOpen}
        onClose={() => setIsInstallModalOpen(false)}
      />

    </div>
  );
}
