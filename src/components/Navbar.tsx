import React, { useState, useEffect, useRef } from 'react';
import { 
  Play, 
  Search, 
  Bookmark, 
  History, 
  SlidersHorizontal, 
  Menu, 
  X, 
  Sparkles,
  Tv,
  Flame,
  Film,
  Compass,
  Download
} from 'lucide-react';
import { Anime } from '../types/anime';
import { searchAnimeOnline } from '../data/animeData';

interface NavbarProps {
  currentTab: string;
  onSelectTab: (tab: string) => void;
  onSelectAnime: (anime: Anime) => void;
  onOpenWatchEpisode: (anime: Anime, episodeNumber: number) => void;
  onOpenSettings: () => void;
  onOpenInstallModal: () => void;
  watchlistCount: number;
  historyCount: number;
  subDubPreference: 'sub' | 'dub';
  onToggleSubDub: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentTab,
  onSelectTab,
  onSelectAnime,
  onOpenWatchEpisode,
  onOpenSettings,
  onOpenInstallModal,
  watchlistCount,
  historyCount,
  subDubPreference,
  onToggleSubDub,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<Anime[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [showSearchDropdown, setShowSearchDropdown] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const searchContainerRef = useRef<HTMLDivElement>(null);

  // Debounced live search
  useEffect(() => {
    if (!searchQuery.trim()) {
      setSearchResults([]);
      setShowSearchDropdown(false);
      return;
    }

    const timer = setTimeout(async () => {
      setIsSearching(true);
      const results = await searchAnimeOnline(searchQuery);
      setSearchResults(results.slice(0, 6));
      setIsSearching(false);
      setShowSearchDropdown(true);
    }, 300);

    return () => clearTimeout(timer);
  }, [searchQuery]);

  // Click outside to close search dropdown
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (searchContainerRef.current && !searchContainerRef.current.contains(e.target as Node)) {
        setShowSearchDropdown(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const navItems = [
    { id: 'home', label: 'Beranda', icon: Tv },
    { id: 'trending', label: 'Populer', icon: Flame },
    { id: 'airing', label: 'Sedang Tayang', icon: Sparkles },
    { id: 'genres', label: 'Genre', icon: Compass },
    { id: 'watchlist', label: 'Koleksi Saya', icon: Bookmark, badge: watchlistCount },
    { id: 'history', label: 'Riwayat', icon: History, badge: historyCount },
  ];

  return (
    <header className="sticky top-0 z-50 w-full bg-neutral-950/85 backdrop-blur-md border-b border-neutral-800/70">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        
        {/* Brand Logo */}
        <div className="flex items-center gap-8">
          <button 
            id="brand-logo-btn"
            onClick={() => onSelectTab('home')}
            className="flex items-center gap-2.5 text-left group focus:outline-none"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-rose-600 via-rose-500 to-amber-500 flex items-center justify-center shadow-lg shadow-rose-600/30 group-hover:scale-105 transition-transform duration-200">
              <Play className="w-5 h-5 text-white fill-current translate-x-0.5" />
            </div>
            <div className="flex flex-col">
              <span className="font-display font-extrabold text-xl tracking-tight text-white flex items-center gap-1">
                Rafisqy <span className="text-rose-500">Anime</span>
              </span>
              <span className="text-[10px] text-neutral-400 font-medium tracking-wider uppercase -mt-1">
                Online Video Player
              </span>
            </div>
          </button>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = currentTab === item.id;
              return (
                <button
                  key={item.id}
                  id={`nav-link-${item.id}`}
                  onClick={() => onSelectTab(item.id)}
                  className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors relative ${
                    isActive 
                      ? 'text-white bg-neutral-800/90' 
                      : 'text-neutral-400 hover:text-white hover:bg-neutral-900/80'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-rose-500' : ''}`} />
                  <span>{item.label}</span>
                  {item.badge !== undefined && item.badge > 0 && (
                    <span className="ml-1 px-1.5 py-0.2 rounded-full text-[10px] bg-rose-600 text-white font-bold leading-tight">
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Right Section: Search & Quick Controls */}
        <div className="flex items-center gap-3">
          
          {/* Search Bar Container */}
          <div ref={searchContainerRef} className="relative w-48 sm:w-64 md:w-72">
            <div className="relative flex items-center">
              <input
                id="search-anime-input"
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onFocus={() => searchQuery && setShowSearchDropdown(true)}
                placeholder="Cari anime..."
                className="w-full bg-neutral-900/90 border border-neutral-800 rounded-full py-2 pl-9 pr-8 text-xs sm:text-sm text-neutral-100 placeholder:text-neutral-500 focus:outline-none focus:border-rose-500 focus:ring-1 focus:ring-rose-500 transition-all"
              />
              <Search className="w-4 h-4 text-neutral-400 absolute left-3 pointer-events-none" />
              {searchQuery && (
                <button 
                  onClick={() => setSearchQuery('')}
                  className="absolute right-2.5 text-neutral-400 hover:text-white"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            {/* Dropdown Live Search Results */}
            {showSearchDropdown && (
              <div className="absolute left-0 right-0 mt-2 bg-neutral-900/95 border border-neutral-800 rounded-xl shadow-2xl backdrop-blur-xl overflow-hidden z-50 animate-in fade-in-50 duration-150">
                <div className="p-2 text-xs font-semibold text-neutral-400 border-b border-neutral-800 flex items-center justify-between">
                  <span>Hasil Pencarian</span>
                  {isSearching && <span className="text-rose-400 animate-pulse">Memuat...</span>}
                </div>

                {searchResults.length > 0 ? (
                  <div className="max-h-80 overflow-y-auto divide-y divide-neutral-800/50">
                    {searchResults.map((anime) => (
                      <div
                        key={anime.id}
                        className="p-2.5 flex items-center gap-3 hover:bg-neutral-800/80 transition cursor-pointer group"
                        onClick={() => {
                          onSelectAnime(anime);
                          setShowSearchDropdown(false);
                          setSearchQuery('');
                        }}
                      >
                        <img
                          src={anime.coverImage}
                          alt={anime.title.romaji}
                          className="w-10 h-14 object-cover rounded shadow-md shrink-0"
                          referrerPolicy="no-referrer"
                        />
                        <div className="flex-1 min-w-0">
                          <h4 className="text-xs font-semibold text-white truncate group-hover:text-rose-400 transition-colors">
                            {anime.title.romaji}
                          </h4>
                          <p className="text-[11px] text-neutral-400 truncate">
                            {anime.genres.slice(0, 2).join(' • ')} • ★ {anime.score}
                          </p>
                          <div className="flex items-center gap-2 mt-1">
                            <span className="text-[10px] bg-neutral-800 text-neutral-300 px-1.5 py-0.5 rounded">
                              {anime.format}
                            </span>
                            <span className="text-[10px] text-emerald-400">
                              {anime.episodesCount} Ep
                            </span>
                          </div>
                        </div>
                        <button
                          title="Tonton Langsung"
                          onClick={(e) => {
                            e.stopPropagation();
                            onOpenWatchEpisode(anime, 1);
                            setShowSearchDropdown(false);
                            setSearchQuery('');
                          }}
                          className="w-8 h-8 rounded-full bg-rose-600/20 text-rose-400 hover:bg-rose-600 hover:text-white flex items-center justify-center shrink-0 transition"
                        >
                          <Play className="w-3.5 h-3.5 fill-current ml-0.5" />
                        </button>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="p-6 text-center text-xs text-neutral-400">
                    Tidak ada anime yang cocok dengan "{searchQuery}"
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Sub / Dub quick toggle button */}
          <button
            id="sub-dub-toggle-btn"
            onClick={onToggleSubDub}
            title={`Ganti Audio: Sekarang ${subDubPreference.toUpperCase()}`}
            className="px-2.5 py-1.5 rounded-lg text-xs font-bold bg-neutral-900 border border-neutral-800 text-neutral-200 hover:border-rose-500 hover:text-white flex items-center gap-1.5 transition shadow-sm"
          >
            <span className="text-neutral-400 text-[10px] uppercase font-mono">Audio:</span>
            <span className={`px-1.5 py-0.5 rounded text-[10px] font-bold ${
              subDubPreference === 'sub' ? 'bg-rose-600 text-white' : 'bg-amber-500 text-neutral-950'
            }`}>
              {subDubPreference.toUpperCase()}
            </span>
          </button>

          {/* Install App Button (Desktop) */}
          <button
            id="install-pwa-btn"
            onClick={onOpenInstallModal}
            title="Pasang Aplikasi Rafisqy Anime (PWA / Mobile / PC)"
            className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold bg-gradient-to-r from-rose-600 to-rose-500 hover:from-rose-500 hover:to-rose-400 text-white shadow-md shadow-rose-600/25 transition active:scale-95"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Install App</span>
          </button>

          {/* Mobile Install Quick Button */}
          <button
            id="mobile-install-quick-btn"
            onClick={onOpenInstallModal}
            title="Pasang Aplikasi"
            className="sm:hidden p-2 rounded-lg bg-rose-600/20 text-rose-400 hover:bg-rose-600 hover:text-white border border-rose-500/30 transition"
          >
            <Download className="w-4 h-4" />
          </button>

          {/* Settings Button */}
          <button
            id="open-settings-btn"
            onClick={onOpenSettings}
            title="Pengaturan Pemutar"
            className="p-2 rounded-lg bg-neutral-900 border border-neutral-800 text-neutral-400 hover:text-white hover:border-neutral-700 transition"
          >
            <SlidersHorizontal className="w-4 h-4" />
          </button>

          {/* Mobile Menu Toggle Button */}
          <button
            id="mobile-menu-btn"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden p-2 rounded-lg bg-neutral-900 border border-neutral-800 text-neutral-400 hover:text-white"
          >
            {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>

        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      {isMobileMenuOpen && (
        <div className="lg:hidden bg-neutral-950/98 border-b border-neutral-800 px-4 py-4 space-y-2 animate-in slide-in-from-top-2">
          {/* Mobile Install Action Banner */}
          <button
            onClick={() => {
              onOpenInstallModal();
              setIsMobileMenuOpen(false);
            }}
            className="w-full mb-3 flex items-center justify-between px-4 py-3 rounded-xl text-sm font-bold bg-gradient-to-r from-rose-600 to-rose-500 text-white shadow-lg shadow-rose-600/30"
          >
            <div className="flex items-center gap-2.5">
              <Download className="w-4 h-4" />
              <span>Pasang Aplikasi (Install App)</span>
            </div>
            <span className="text-[10px] font-mono uppercase bg-black/40 px-2 py-0.5 rounded-full text-rose-200">
              PWA
            </span>
          </button>

          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => {
                  onSelectTab(item.id);
                  setIsMobileMenuOpen(false);
                }}
                className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-medium transition ${
                  isActive 
                    ? 'bg-rose-600/15 text-rose-400 border border-rose-600/30' 
                    : 'text-neutral-300 hover:bg-neutral-900'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon className="w-4 h-4" />
                  <span>{item.label}</span>
                </div>
                {item.badge !== undefined && item.badge > 0 && (
                  <span className="px-2 py-0.5 rounded-full text-xs bg-rose-600 text-white font-bold">
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      )}
    </header>
  );
};
