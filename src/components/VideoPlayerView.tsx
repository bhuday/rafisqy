import React, { useState, useEffect, useRef } from 'react';
import { 
  Play, 
  Pause, 
  RotateCcw, 
  RotateCw, 
  Volume2, 
  VolumeX, 
  Maximize, 
  Minimize, 
  SkipForward, 
  SkipBack, 
  Server, 
  Check, 
  ChevronRight, 
  ChevronLeft, 
  Star, 
  Bookmark, 
  Share2, 
  MessageSquare, 
  Send, 
  Settings, 
  Layers, 
  Tv, 
  Sparkles,
  ArrowLeft,
  X,
  AlertCircle,
  Loader2
} from 'lucide-react';
import { Anime, AnimeEpisode, UserSettings } from '../types/anime';

interface VideoPlayerViewProps {
  anime: Anime;
  episodeNumber: number;
  initialTimestamp?: number;
  settings: UserSettings;
  onUpdateSettings: (newSettings: Partial<UserSettings>) => void;
  onSelectEpisode: (epNum: number) => void;
  onBackToBrowse: () => void;
  onSaveHistory: (
    animeId: number,
    animeTitle: string,
    animeImage: string,
    epNum: number,
    epTitle: string,
    currentTime: number,
    duration: number
  ) => void;
  isInWatchlist: boolean;
  onToggleWatchlist: (anime: Anime) => void;
}

interface Comment {
  id: string;
  author: string;
  avatar: string;
  text: string;
  timestamp: string;
  likes: number;
}

export const VideoPlayerView: React.FC<VideoPlayerViewProps> = ({
  anime,
  episodeNumber,
  initialTimestamp = 0,
  settings,
  onUpdateSettings,
  onSelectEpisode,
  onBackToBrowse,
  onSaveHistory,
  isInWatchlist,
  onToggleWatchlist,
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const playerContainerRef = useRef<HTMLDivElement>(null);

  const episodes = anime.episodes || [];
  const currentEpisode: AnimeEpisode | undefined = 
    episodes.find((e) => e.number === episodeNumber) || episodes[0];

  const [selectedServerIndex, setSelectedServerIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(0.8);
  const [isMuted, setIsMuted] = useState(false);
  const [playbackSpeed, setPlaybackSpeed] = useState(1);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showControls, setShowControls] = useState(true);
  const [showSpeedMenu, setShowSpeedMenu] = useState(false);
  const [showServerMenu, setShowServerMenu] = useState(false);
  const [audioMode, setAudioMode] = useState<'sub' | 'dub'>(settings.defaultAudio || 'sub');
  
  // Skip intro state & countdown
  const [showSkipIntro, setShowSkipIntro] = useState(false);
  const [episodeSearch, setEpisodeSearch] = useState('');
  const [copySuccess, setCopySuccess] = useState(false);

  // Interactive Comments state
  const [comments, setComments] = useState<Comment[]>([
    {
      id: '1',
      author: 'WibuSejati99',
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&auto=format&fit=crop&q=80',
      text: 'Animasi dari episode ini gila banget, sound effect-nya bener-bener mantap! Rafisqy Anime lancar banget tanpa ngelag.',
      timestamp: '2 jam yang lalu',
      likes: 42
    },
    {
      id: '2',
      author: 'Kenji_Ackerman',
      avatar: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=100&auto=format&fit=crop&q=80',
      text: 'Fitur auto-skip intronya ngebantu banget pas lagi maraton episode! Makasih admin.',
      timestamp: '5 jam yang lalu',
      likes: 19
    }
  ]);
  const [newCommentText, setNewCommentText] = useState('');

  const [videoHasError, setVideoHasError] = useState(false);
  const [isVideoLoading, setIsVideoLoading] = useState(true);

  const currentSource = currentEpisode?.sources?.[selectedServerIndex] || {
    name: 'Rafisqy Ultra HD',
    url: 'https://media.w3.org/2010/05/sintel/trailer_hd.mp4',
    quality: '1080p',
    type: 'video'
  };

  // Reset error & reload media when episode or server changes
  useEffect(() => {
    setVideoHasError(false);
    setIsVideoLoading(true);
    setCurrentTime(initialTimestamp);

    if (videoRef.current && currentSource.type !== 'youtube') {
      try {
        videoRef.current.pause();
        videoRef.current.load();
        videoRef.current.currentTime = initialTimestamp;
        const playPromise = videoRef.current.play();
        if (playPromise !== undefined) {
          playPromise
            .then(() => {
              setIsPlaying(true);
              setIsVideoLoading(false);
            })
            .catch(() => {
              // Autoplay policy: pause until user interacts
              setIsPlaying(false);
              setIsVideoLoading(false);
            });
        }
      } catch (err) {
        console.warn('Video playback reload issue:', err);
      }
    }
  }, [episodeNumber, selectedServerIndex, currentSource.url]);

  // Handle Video Time Updates & Keep Watching persistence
  const handleTimeUpdate = () => {
    if (!videoRef.current) return;
    const curr = videoRef.current.currentTime;
    const dur = videoRef.current.duration || 1425;
    setCurrentTime(curr);
    setDuration(dur);

    // Check for Skip Intro trigger
    const introStart = currentEpisode?.intro?.start || 80;
    const introEnd = currentEpisode?.intro?.end || 170;

    if (curr >= introStart && curr <= introEnd) {
      setShowSkipIntro(true);
      if (settings.autoSkipIntro && curr >= introStart + 2) {
        handleSkipIntro();
      }
    } else {
      setShowSkipIntro(false);
    }

    // Auto save history to Keep Watching every 5 seconds
    if (Math.floor(curr) % 5 === 0 && curr > 2) {
      onSaveHistory(
        anime.id,
        anime.title.romaji,
        anime.coverImage,
        episodeNumber,
        currentEpisode?.title || `Episode ${episodeNumber}`,
        curr,
        dur
      );
    }
  };

  const handleSkipIntro = () => {
    if (!videoRef.current) return;
    const introEnd = currentEpisode?.intro?.end || 170;
    videoRef.current.currentTime = introEnd;
    setShowSkipIntro(false);
  };

  const handleTogglePlay = () => {
    if (!videoRef.current) return;
    if (videoRef.current.paused) {
      videoRef.current.play();
      setIsPlaying(true);
    } else {
      videoRef.current.pause();
      setIsPlaying(false);
    }
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const targetTime = parseFloat(e.target.value);
    setCurrentTime(targetTime);
    if (videoRef.current) {
      videoRef.current.currentTime = targetTime;
    }
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseFloat(e.target.value);
    setVolume(val);
    setIsMuted(val === 0);
    if (videoRef.current) {
      videoRef.current.volume = val;
      videoRef.current.muted = val === 0;
    }
  };

  const toggleMute = () => {
    if (!videoRef.current) return;
    if (isMuted) {
      videoRef.current.muted = false;
      videoRef.current.volume = volume || 0.8;
      setIsMuted(false);
    } else {
      videoRef.current.muted = true;
      setIsMuted(true);
    }
  };

  const handleSpeedChange = (speed: number) => {
    setPlaybackSpeed(speed);
    setShowSpeedMenu(false);
    if (videoRef.current) {
      videoRef.current.playbackRate = speed;
    }
  };

  const toggleFullscreen = () => {
    if (!playerContainerRef.current) return;
    if (!document.fullscreenElement) {
      playerContainerRef.current.requestFullscreen().catch(() => {});
      setIsFullscreen(true);
    } else {
      document.exitFullscreen().catch(() => {});
      setIsFullscreen(false);
    }
  };

  const handleVideoEnded = () => {
    setIsPlaying(false);
    if (settings.autoNextEpisode && episodeNumber < (anime.episodesCount || episodes.length)) {
      onSelectEpisode(episodeNumber + 1);
    }
  };

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopySuccess(true);
    setTimeout(() => setCopySuccess(false), 2500);
  };

  const handleAddComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCommentText.trim()) return;

    const newComment: Comment = {
      id: Date.now().toString(),
      author: 'Pengguna Rafisqy',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80',
      text: newCommentText.trim(),
      timestamp: 'Baru saja',
      likes: 1
    };

    setComments([newComment, ...comments]);
    setNewCommentText('');
  };

  function formatTime(secs: number): string {
    if (isNaN(secs)) return '00:00';
    const mins = Math.floor(secs / 60);
    const remainder = Math.floor(secs % 60);
    return `${mins < 10 ? '0' : ''}${mins}:${remainder < 10 ? '0' : ''}${remainder}`;
  }

  // Filter episodes for sidebar
  const filteredEpisodes = episodes.filter((ep) => 
    ep.number.toString().includes(episodeSearch) || 
    ep.title.toLowerCase().includes(episodeSearch.toLowerCase())
  );

  return (
    <div className="w-full max-w-7xl mx-auto px-2 sm:px-4 lg:px-6 py-4 animate-in fade-in-50 duration-300">
      
      {/* Top Breadcrumb & Return Bar */}
      <div className="flex items-center justify-between gap-2 mb-4">
        <button
          onClick={onBackToBrowse}
          className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-neutral-900 border border-neutral-800 text-neutral-300 hover:text-white hover:border-neutral-700 text-xs sm:text-sm font-semibold transition"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Kembali ke Beranda</span>
        </button>

        <div className="flex items-center gap-2 text-xs">
          <span className="text-neutral-400 hidden sm:inline">{anime.title.romaji}</span>
          <span className="text-neutral-600 hidden sm:inline">/</span>
          <span className="text-rose-500 font-bold">Episode {episodeNumber}</span>
        </div>
      </div>

      {/* Main Grid: Video Player + Episode Selector */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Column: Player + Anime Info (Span 8 or 9) */}
        <div className="lg:col-span-8 xl:col-span-9 space-y-4">
          
          {/* Video Player Container */}
          <div 
            ref={playerContainerRef}
            onMouseEnter={() => setShowControls(true)}
            onMouseLeave={() => setShowControls(false)}
            className="relative w-full aspect-video bg-black rounded-2xl overflow-hidden shadow-2xl border border-neutral-800 group select-none"
          >
            {/* Direct HTML5 Video Player or YouTube Embed based on selected server */}
            {currentSource.type === 'youtube' ? (
              <iframe
                src={currentSource.url}
                title={currentEpisode?.title}
                className="w-full h-full border-0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            ) : (
              <video
                key={`${currentEpisode?.id}-${selectedServerIndex}-${currentSource.url}`}
                ref={videoRef}
                onTimeUpdate={handleTimeUpdate}
                onPlay={() => {
                  setIsPlaying(true);
                  setIsVideoLoading(false);
                  setVideoHasError(false);
                }}
                onPause={() => setIsPlaying(false)}
                onWaiting={() => setIsVideoLoading(true)}
                onPlaying={() => setIsVideoLoading(false)}
                onCanPlay={() => {
                  setIsVideoLoading(false);
                  setVideoHasError(false);
                }}
                onError={(e) => {
                  console.warn('Video failed to load source:', currentSource.url, e);
                  setVideoHasError(true);
                  setIsVideoLoading(false);
                }}
                onEnded={handleVideoEnded}
                onClick={handleTogglePlay}
                playsInline
                preload="metadata"
                className="w-full h-full object-contain cursor-pointer"
              >
                <source src={currentSource.url} type="video/mp4" />
                <source src={currentSource.url} type="video/webm" />
                Browser kamu tidak mendukung pemutaran video HTML5 langsung.
              </video>
            )}

            {/* Video Buffering / Loading Indicator */}
            {isVideoLoading && !videoHasError && currentSource.type !== 'youtube' && (
              <div className="absolute inset-0 pointer-events-none flex items-center justify-center bg-black/40 backdrop-blur-[1px] z-10">
                <div className="flex flex-col items-center gap-2">
                  <Loader2 className="w-8 h-8 text-rose-500 animate-spin" />
                  <span className="text-xs font-semibold text-neutral-300">Memuat Video...</span>
                </div>
              </div>
            )}

            {/* Video Error Recovery Overlay */}
            {videoHasError && currentSource.type !== 'youtube' && (
              <div className="absolute inset-0 z-30 bg-neutral-950/95 backdrop-blur-sm flex flex-col items-center justify-center p-6 text-center space-y-4">
                <div className="w-12 h-12 rounded-full bg-rose-600/20 text-rose-500 border border-rose-500/40 flex items-center justify-center shadow-lg shadow-rose-950/50">
                  <AlertCircle className="w-6 h-6" />
                </div>
                <div className="space-y-1">
                  <h3 className="text-base font-bold text-white">
                    Gagal Memuat Sumber Video
                  </h3>
                  <p className="text-xs text-neutral-400 max-w-sm">
                    Server <strong className="text-rose-400">{currentSource.name}</strong> tidak dapat diakses atau format terganggu. Silakan ganti server di bawah ini:
                  </p>
                </div>

                <div className="flex flex-wrap items-center justify-center gap-2.5 pt-1">
                  <button
                    onClick={() => {
                      const nextIdx = (selectedServerIndex + 1) % (currentEpisode?.sources?.length || 1);
                      setSelectedServerIndex(nextIdx);
                      setVideoHasError(false);
                    }}
                    className="px-4 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-500 text-white text-xs font-bold transition flex items-center gap-2 shadow-lg shadow-rose-600/30 active:scale-95"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span>Ganti ke Server Cadangan</span>
                  </button>

                  {currentEpisode?.sources?.some((s) => s.type === 'youtube') && (
                    <button
                      onClick={() => {
                        const ytIdx = currentEpisode.sources.findIndex((s) => s.type === 'youtube');
                        if (ytIdx >= 0) {
                          setSelectedServerIndex(ytIdx);
                          setVideoHasError(false);
                        }
                      }}
                      className="px-4 py-2.5 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-neutral-200 text-xs font-semibold border border-neutral-700 transition"
                    >
                      <span>Putar via Server YouTube</span>
                    </button>
                  )}
                </div>
              </div>
            )}

            {/* Skip Intro Button (AniProject style with animated countdown) */}
            {showSkipIntro && currentSource.type !== 'youtube' && (
              <div className="absolute bottom-20 right-6 z-30 animate-in slide-in-from-right-4 duration-200">
                <button
                  onClick={handleSkipIntro}
                  className="px-4 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-500 text-white text-xs sm:text-sm font-bold flex items-center gap-2 shadow-2xl shadow-rose-950/80 active:scale-95 border border-rose-400/40 transition"
                >
                  <SkipForward className="w-4 h-4" />
                  <span>Lewati Intro (85d)</span>
                </button>
              </div>
            )}

            {/* Custom Player Controls Bar (For Video type) */}
            {currentSource.type !== 'youtube' && (
              <div
                className={`absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/95 via-black/60 to-transparent p-4 transition-opacity duration-300 z-20 ${
                  showControls || !isPlaying ? 'opacity-100' : 'opacity-0 pointer-events-none'
                }`}
              >
                {/* Seek Bar / Progress Slider */}
                <div className="relative mb-3 flex items-center group/seek">
                  <input
                    type="range"
                    min={0}
                    max={duration || 100}
                    value={currentTime}
                    onChange={handleSeek}
                    className="w-full h-1.5 bg-neutral-700/80 rounded-lg appearance-none cursor-pointer accent-rose-500 hover:h-2.5 transition-all"
                  />
                </div>

                {/* Controls Bottom Row */}
                <div className="flex items-center justify-between text-white text-xs sm:text-sm">
                  
                  {/* Left Controls: Play, Prev, Next, Time, Volume */}
                  <div className="flex items-center gap-3">
                    <button
                      onClick={handleTogglePlay}
                      className="p-1.5 rounded-lg hover:bg-white/10 text-white transition active:scale-90"
                    >
                      {isPlaying ? <Pause className="w-5 h-5 fill-current" /> : <Play className="w-5 h-5 fill-current ml-0.5" />}
                    </button>

                    {/* Prev Episode */}
                    <button
                      disabled={episodeNumber <= 1}
                      onClick={() => onSelectEpisode(episodeNumber - 1)}
                      title="Episode Sebelumnya"
                      className={`p-1.5 rounded-lg transition ${
                        episodeNumber <= 1 ? 'text-neutral-600 cursor-not-allowed' : 'hover:bg-white/10 text-white'
                      }`}
                    >
                      <SkipBack className="w-4 h-4" />
                    </button>

                    {/* Next Episode */}
                    <button
                      disabled={episodeNumber >= (anime.episodesCount || episodes.length)}
                      onClick={() => onSelectEpisode(episodeNumber + 1)}
                      title="Episode Selanjutnya"
                      className={`p-1.5 rounded-lg transition ${
                        episodeNumber >= (anime.episodesCount || episodes.length) 
                          ? 'text-neutral-600 cursor-not-allowed' 
                          : 'hover:bg-white/10 text-white'
                      }`}
                    >
                      <SkipForward className="w-4 h-4" />
                    </button>

                    {/* Volume Slider */}
                    <div className="flex items-center gap-1.5 group/vol">
                      <button onClick={toggleMute} className="p-1 rounded hover:bg-white/10">
                        {isMuted || volume === 0 ? <VolumeX className="w-4 h-4 text-rose-400" /> : <Volume2 className="w-4 h-4" />}
                      </button>
                      <input
                        type="range"
                        min={0}
                        max={1}
                        step={0.05}
                        value={isMuted ? 0 : volume}
                        onChange={handleVolumeChange}
                        className="w-16 h-1 bg-neutral-700 rounded appearance-none cursor-pointer accent-rose-500"
                      />
                    </div>

                    {/* Time Counter */}
                    <span className="text-[11px] sm:text-xs text-neutral-300 font-mono">
                      {formatTime(currentTime)} / {formatTime(duration)}
                    </span>
                  </div>

                  {/* Right Controls: Audio Sub/Dub, Speed, Quality/Server, Fullscreen */}
                  <div className="flex items-center gap-2">
                    
                    {/* Audio Mode (Sub / Dub) */}
                    <button
                      onClick={() => setAudioMode(audioMode === 'sub' ? 'dub' : 'sub')}
                      className={`px-2 py-0.5 rounded text-[11px] font-bold uppercase transition ${
                        audioMode === 'sub' ? 'bg-neutral-800 text-rose-400 border border-neutral-700' : 'bg-amber-500 text-neutral-950'
                      }`}
                    >
                      {audioMode.toUpperCase()}
                    </button>

                    {/* Playback Speed Menu Toggle */}
                    <div className="relative">
                      <button
                        onClick={() => setShowSpeedMenu(!showSpeedMenu)}
                        className="px-2 py-0.5 rounded bg-neutral-800 hover:bg-neutral-700 text-[11px] font-semibold text-neutral-300"
                      >
                        {playbackSpeed}x
                      </button>

                      {showSpeedMenu && (
                        <div className="absolute bottom-full right-0 mb-2 w-24 bg-neutral-900 border border-neutral-700 rounded-lg shadow-xl overflow-hidden py-1 z-30">
                          {[0.5, 0.75, 1, 1.25, 1.5, 2].map((s) => (
                            <button
                              key={s}
                              onClick={() => handleSpeedChange(s)}
                              className={`w-full text-left px-3 py-1 text-xs hover:bg-neutral-800 flex items-center justify-between ${
                                playbackSpeed === s ? 'text-rose-500 font-bold' : 'text-neutral-300'
                              }`}
                            >
                              <span>{s}x</span>
                              {playbackSpeed === s && <Check className="w-3 h-3" />}
                            </button>
                          ))}
                        </div>
                      )}
                    </div>

                    {/* Fullscreen Toggle */}
                    <button
                      onClick={toggleFullscreen}
                      title="Layar Penuh"
                      className="p-1.5 rounded-lg hover:bg-white/10 text-white transition"
                    >
                      {isFullscreen ? <Minimize className="w-4 h-4" /> : <Maximize className="w-4 h-4" />}
                    </button>

                  </div>

                </div>
              </div>
            )}
          </div>

          {/* Server Switcher Bar */}
          <div className="bg-neutral-900/90 border border-neutral-800 rounded-xl p-3 flex flex-wrap items-center justify-between gap-3 shadow-md">
            <div className="flex items-center gap-2">
              <Server className="w-4 h-4 text-rose-500" />
              <span className="text-xs font-bold text-neutral-300 uppercase tracking-wider">
                Pilih Server Streaming:
              </span>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              {currentEpisode?.sources?.map((src, idx) => (
                <button
                  key={src.name}
                  onClick={() => setSelectedServerIndex(idx)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition ${
                    selectedServerIndex === idx
                      ? 'bg-rose-600 text-white shadow-md shadow-rose-600/30'
                      : 'bg-neutral-800 text-neutral-400 hover:text-neutral-200 hover:bg-neutral-700'
                  }`}
                >
                  <span>{src.name}</span>
                  {selectedServerIndex === idx && <Check className="w-3 h-3" />}
                </button>
              ))}
            </div>
          </div>

          {/* Quick Auto-Skip & Auto-Next Toggle Strip */}
          <div className="bg-neutral-900/50 border border-neutral-800/80 rounded-xl px-4 py-2.5 flex flex-wrap items-center justify-between gap-3 text-xs">
            <div className="flex items-center gap-4">
              <label className="flex items-center gap-2 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={settings.autoSkipIntro}
                  onChange={(e) => onUpdateSettings({ autoSkipIntro: e.target.checked })}
                  className="rounded bg-neutral-800 border-neutral-700 text-rose-600 focus:ring-rose-500"
                />
                <span className="text-neutral-300">Auto-Skip Intro</span>
              </label>

              <label className="flex items-center gap-2 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={settings.autoNextEpisode}
                  onChange={(e) => onUpdateSettings({ autoNextEpisode: e.target.checked })}
                  className="rounded bg-neutral-800 border-neutral-700 text-rose-600 focus:ring-rose-500"
                />
                <span className="text-neutral-300">Putar Episode Otomatis</span>
              </label>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={handleShare}
                className="flex items-center gap-1 text-neutral-400 hover:text-white px-2 py-1 rounded bg-neutral-800/60"
              >
                <Share2 className="w-3.5 h-3.5" />
                <span>{copySuccess ? 'Tersalin!' : 'Bagikan'}</span>
              </button>

              <button
                onClick={() => onToggleWatchlist(anime)}
                className={`flex items-center gap-1 px-2.5 py-1 rounded font-semibold transition ${
                  isInWatchlist
                    ? 'bg-rose-600/20 text-rose-400 border border-rose-500/50'
                    : 'bg-neutral-800 text-neutral-300 hover:text-white'
                }`}
              >
                <Bookmark className="w-3.5 h-3.5" />
                <span>{isInWatchlist ? 'Tersimpan' : 'Koleksi'}</span>
              </button>
            </div>
          </div>

          {/* Anime Information Header & Synopsis */}
          <div className="bg-neutral-900/60 border border-neutral-800 rounded-2xl p-5 shadow-lg">
            <div className="flex flex-col sm:flex-row gap-5">
              <img
                src={anime.coverImage}
                alt={anime.title.romaji}
                className="w-24 h-36 object-cover rounded-xl shadow-md shrink-0 mx-auto sm:mx-0"
                referrerPolicy="no-referrer"
              />

              <div className="flex-1 space-y-2">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="px-2 py-0.5 rounded text-[11px] font-bold bg-amber-500/20 text-amber-300 border border-amber-500/30 flex items-center gap-1">
                    <Star className="w-3 h-3 fill-amber-400" />
                    {anime.score}
                  </span>
                  <span className="px-2 py-0.5 rounded text-[11px] bg-neutral-800 text-neutral-300">
                    {anime.format}
                  </span>
                  <span className="px-2 py-0.5 rounded text-[11px] bg-neutral-800 text-neutral-300">
                    {anime.status}
                  </span>
                  <span className="px-2 py-0.5 rounded text-[11px] bg-neutral-800 text-neutral-300">
                    {anime.studio}
                  </span>
                </div>

                <h1 className="text-xl sm:text-2xl font-display font-extrabold text-white">
                  {anime.title.romaji}
                </h1>
                {anime.title.english && (
                  <p className="text-xs text-neutral-400">{anime.title.english}</p>
                )}

                <div className="flex flex-wrap gap-1.5 pt-1">
                  {anime.genres.map((g) => (
                    <span
                      key={g}
                      className="px-2 py-0.5 rounded text-[10px] bg-neutral-800/80 text-neutral-300 border border-neutral-700/40"
                    >
                      {g}
                    </span>
                  ))}
                </div>

                <p className="text-xs sm:text-sm text-neutral-300 pt-2 leading-relaxed">
                  {anime.synopsis}
                </p>
              </div>
            </div>
          </div>

          {/* Interactive Comments & Discussions Section */}
          <div className="bg-neutral-900/60 border border-neutral-800 rounded-2xl p-5 shadow-lg space-y-4">
            <div className="flex items-center gap-2 border-b border-neutral-800 pb-3">
              <MessageSquare className="w-4 h-4 text-rose-500" />
              <h3 className="text-sm sm:text-base font-display font-bold text-white">
                Komentar & Diskusi Episode {episodeNumber} ({comments.length})
              </h3>
            </div>

            {/* Comment Input */}
            <form onSubmit={handleAddComment} className="flex gap-2">
              <input
                type="text"
                value={newCommentText}
                onChange={(e) => setNewCommentText(e.target.value)}
                placeholder="Tulis tanggapan atau review tentang episode ini..."
                className="flex-1 bg-neutral-950 border border-neutral-800 rounded-xl px-4 py-2.5 text-xs sm:text-sm text-white placeholder:text-neutral-500 focus:outline-none focus:border-rose-500"
              />
              <button
                type="submit"
                className="px-4 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-500 text-white text-xs font-bold flex items-center gap-1.5 transition active:scale-95 shrink-0"
              >
                <Send className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Kirim</span>
              </button>
            </form>

            {/* Comment List */}
            <div className="space-y-3 pt-2">
              {comments.map((c) => (
                <div key={c.id} className="p-3 rounded-xl bg-neutral-950/60 border border-neutral-800/60 flex gap-3">
                  <img
                    src={c.avatar}
                    alt={c.author}
                    className="w-9 h-9 rounded-full object-cover shrink-0"
                    referrerPolicy="no-referrer"
                  />
                  <div className="flex-1">
                    <div className="flex items-center justify-between text-xs mb-1">
                      <span className="font-semibold text-rose-400">{c.author}</span>
                      <span className="text-neutral-500 text-[11px]">{c.timestamp}</span>
                    </div>
                    <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed">
                      {c.text}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Right Column: Episode List Sidebar (Span 4 or 3) */}
        <div className="lg:col-span-4 xl:col-span-3 space-y-4">
          <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-4 shadow-xl sticky top-20">
            
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <Layers className="w-4 h-4 text-rose-500" />
                <h3 className="font-display font-bold text-white text-sm">
                  Daftar Episode
                </h3>
              </div>
              <span className="text-xs text-neutral-400 font-mono">
                Total: {episodes.length}
              </span>
            </div>

            {/* Search episode inside anime */}
            <div className="mb-3">
              <input
                type="text"
                placeholder="Cari nomor/judul episode..."
                value={episodeSearch}
                onChange={(e) => setEpisodeSearch(e.target.value)}
                className="w-full bg-neutral-950 border border-neutral-800 rounded-lg px-3 py-1.5 text-xs text-neutral-200 placeholder:text-neutral-500 focus:outline-none focus:border-rose-500"
              />
            </div>

            {/* Episodes Scrollable List */}
            <div className="max-h-[620px] overflow-y-auto space-y-2 pr-1 divide-y divide-neutral-800/40">
              {filteredEpisodes.map((ep) => {
                const isSelected = ep.number === episodeNumber;
                return (
                  <button
                    key={ep.id}
                    onClick={() => onSelectEpisode(ep.number)}
                    className={`w-full pt-2 first:pt-0 text-left p-2.5 rounded-xl transition flex items-center gap-3 group ${
                      isSelected
                        ? 'bg-rose-600/20 border border-rose-500/60 shadow-md'
                        : 'hover:bg-neutral-800/80 border border-transparent'
                    }`}
                  >
                    <div className="relative w-14 h-10 rounded-lg overflow-hidden shrink-0 bg-neutral-950">
                      <img
                        src={ep.thumbnail}
                        alt={ep.title}
                        className="w-full h-full object-cover"
                        referrerPolicy="no-referrer"
                      />
                      <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                        {isSelected ? (
                          <div className="w-5 h-5 rounded-full bg-rose-600 text-white flex items-center justify-center">
                            <Play className="w-2.5 h-2.5 fill-current ml-0.5" />
                          </div>
                        ) : (
                          <span className="text-[10px] font-bold text-white bg-black/60 px-1 rounded">
                            {ep.number}
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <span className={`text-xs font-semibold truncate ${
                          isSelected ? 'text-rose-400' : 'text-neutral-200 group-hover:text-white'
                        }`}>
                          Ep {ep.number}
                        </span>
                        <span className="text-[10px] text-neutral-500 font-mono">
                          {ep.duration}
                        </span>
                      </div>
                      <p className="text-[11px] text-neutral-400 truncate mt-0.5">
                        {ep.title}
                      </p>
                    </div>
                  </button>
                );
              })}
            </div>

          </div>
        </div>

      </div>

    </div>
  );
};
