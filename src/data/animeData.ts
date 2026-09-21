import { Anime, AnimeEpisode } from '../types/anime';

// Helper to generate episode list for an anime
export function generateEpisodes(
  animeId: number,
  animeTitle: string,
  totalEpisodes: number,
  trailerYoutubeId?: string | null
): AnimeEpisode[] {
  const episodes: AnimeEpisode[] = [];
  const sampleVideos = [
    'https://media.w3.org/2010/05/sintel/trailer_hd.mp4',
    'https://vjs.zencdn.net/v/oceans.mp4',
    'https://media.w3.org/2010/05/bunny/trailer.mp4',
    'https://cdn.plyr.io/static/demo/View_From_A_Blue_Moon_Trailer-576p.mp4',
    'https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4'
  ];

  const count = Math.min(totalEpisodes || 12, 24);

  for (let i = 1; i <= count; i++) {
    const videoUrl = sampleVideos[(i - 1) % sampleVideos.length];
    const fastMirrorUrl = sampleVideos[i % sampleVideos.length];
    const dubbedMirrorUrl = sampleVideos[(i + 2) % sampleVideos.length];
    const ytId = trailerYoutubeId || 'VQGCKyvzIM4';

    episodes.push({
      id: `${animeId}-ep-${i}`,
      number: i,
      title: `Episode ${i}: ${getEpisodeName(animeTitle, i)}`,
      thumbnail: `https://images.unsplash.com/photo-1578632767115-351597cf2477?w=600&auto=format&fit=crop&q=80`,
      duration: '23:45',
      intro: {
        start: 90, // 01:30
        end: 175   // 02:55
      },
      outro: {
        start: 1320, // 22:00
        end: 1410   // 23:30
      },
      sources: [
        {
          name: 'Rafisqy Ultra HD (1080p)',
          url: videoUrl,
          quality: '1080p',
          type: 'video',
          isDub: false
        },
        {
          name: 'Rafisqy Fast CDN (720p)',
          url: fastMirrorUrl,
          quality: '720p',
          type: 'video',
          isDub: false
        },
        {
          name: 'Official HD Stream (YouTube)',
          url: `https://www.youtube-nocookie.com/embed/${ytId}?autoplay=1&enablejsapi=1`,
          quality: '1080p',
          type: 'youtube',
          isDub: false
        },
        {
          name: 'Rafisqy Dubbed Server (Audio Eng/Indo)',
          url: dubbedMirrorUrl,
          quality: '1080p',
          type: 'video',
          isDub: true
        }
      ]
    });
  }

  return episodes;
}

function getEpisodeName(title: string, ep: number): string {
  const titles = [
    'Awal Mula Kebangkitan (The Awakening)',
    'Pertemuan yang Ditakdirkan (Destined Encounter)',
    'Tekad di Tengah Badai (Resolve in the Storm)',
    'Kekuatan Tersembunyi (Hidden Power)',
    'Ujian Keberanian (Test of Courage)',
    'Konfrontasi di Garis Depan (Frontline Clash)',
    'Rahasia Masa Lalu (Secrets of the Past)',
    'Penebusan Dosa (Redemption)',
    'Pertarungan Sengit (Fierce Battle)',
    'Cahaya Harapan Baru (Ray of Hope)',
    'Titik Balik Takdir (Turning Point)',
    'Puncak Pertempuran (Climax)',
    'Menuju Era Baru (Into the New Era)',
    'Ikatan yang Tak Terputus (Unbreakable Bond)'
  ];
  return titles[(ep - 1) % titles.length];
}

export const INITIAL_ANIMES: Anime[] = [
  {
    id: 1,
    mal_id: 52991,
    title: {
      romaji: 'Sousou no Frieren',
      english: "Frieren: Beyond Journey's End",
      native: '葬送のフリーレン'
    },
    synopsis: 'Raja Iblis telah dikalahkan, dan kelompok pahlawan pemenang bubar setelah kembali ke rumah mereka. Penyihir elf Frieren, pahlawan Himmel, pendeta Heiter, dan pejuang Eisen mengenang perjalanan sepuluh tahun mereka saat momen perpisahan tiba. Petualangan baru Frieren dimulai untuk memahami arti hubungan antar manusia.',
    bannerImage: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?w=1600&auto=format&fit=crop&q=80',
    coverImage: 'https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?w=600&auto=format&fit=crop&q=80',
    score: 9.34,
    scoredBy: 342000,
    rank: 1,
    popularity: 12,
    episodesCount: 28,
    status: 'Finished Airing',
    format: 'TV',
    season: 'Fall',
    year: 2023,
    studio: 'Madhouse',
    rating: 'PG-13',
    genres: ['Adventure', 'Drama', 'Fantasy', 'Shounen'],
    trailer: {
      youtube_id: 'ZEkwCGJ3o7M',
      url: 'https://www.youtube.com/watch?v=ZEkwCGJ3o7M',
      embed_url: 'https://www.youtube-nocookie.com/embed/ZEkwCGJ3o7M?autoplay=1'
    },
    characters: [
      {
        id: 101,
        name: 'Frieren',
        role: 'Main',
        image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300&auto=format&fit=crop&q=80',
        voiceActor: { name: 'Atsumi Tanezaki', language: 'Japanese', image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=200&auto=format&fit=crop&q=80' }
      },
      {
        id: 102,
        name: 'Fern',
        role: 'Main',
        image: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=300&auto=format&fit=crop&q=80',
        voiceActor: { name: 'Kana Ichinose', language: 'Japanese', image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&auto=format&fit=crop&q=80' }
      },
      {
        id: 103,
        name: 'Stark',
        role: 'Main',
        image: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=300&auto=format&fit=crop&q=80',
        voiceActor: { name: 'Chiaki Kobayashi', language: 'Japanese', image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&auto=format&fit=crop&q=80' }
      }
    ]
  },
  {
    id: 2,
    mal_id: 5114,
    title: {
      romaji: 'Fullmetal Alchemist: Brotherhood',
      english: 'Fullmetal Alchemist: Brotherhood',
      native: '鋼の錬金術師 FULLMETAL ALCHEMIST'
    },
    synopsis: 'Setelah percobaan transmutasi manusia yang mengerikan gagal di rumah Elric bersaudara, Edward kehilangan kaki kirinya dan Alphonse seluruh tubuhnya. Menolak untuk berputus asa, mereka memulai pencarian legendaris Batu Bertuah untuk memulihkan raga mereka.',
    bannerImage: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=1600&auto=format&fit=crop&q=80',
    coverImage: 'https://images.unsplash.com/photo-1563089145-599997674d42?w=600&auto=format&fit=crop&q=80',
    score: 9.10,
    scoredBy: 2150000,
    rank: 2,
    popularity: 3,
    episodesCount: 64,
    status: 'Finished Airing',
    format: 'TV',
    season: 'Spring',
    year: 2009,
    studio: 'Bones',
    rating: 'R - 17+',
    genres: ['Action', 'Adventure', 'Drama', 'Fantasy', 'Military'],
    trailer: {
      youtube_id: '--IcmZkvL0Q',
      url: 'https://www.youtube.com/watch?v=--IcmZkvL0Q',
      embed_url: 'https://www.youtube-nocookie.com/embed/--IcmZkvL0Q?autoplay=1'
    }
  },
  {
    id: 3,
    mal_id: 52299,
    title: {
      romaji: 'Ore dake Level Up na Ken',
      english: 'Solo Leveling',
      native: '俺だけレベルアップな件'
    },
    synopsis: 'Dikenal sebagai pemburu terlemah di seluruh umat manusia, Sung Jinwoo terus berjuang demi membiayai pengobatan ibunya. Ketika terjebak di Double Dungeon mematikan, dia menerima Quest rahasia misterius yang hanya bisa dilihat olehnya: Sistem yang memungkinkannya menaikkan level tanpa batas!',
    bannerImage: 'https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?w=1600&auto=format&fit=crop&q=80',
    coverImage: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=600&auto=format&fit=crop&q=80',
    score: 8.42,
    scoredBy: 490000,
    rank: 145,
    popularity: 1,
    episodesCount: 12,
    status: 'Finished Airing',
    format: 'TV',
    season: 'Winter',
    year: 2024,
    studio: 'A-1 Pictures',
    rating: 'R - 17+',
    genres: ['Action', 'Adventure', 'Fantasy'],
    trailer: {
      youtube_id: 'k8YhyA_L_yY',
      url: 'https://www.youtube.com/watch?v=k8YhyA_L_yY',
      embed_url: 'https://www.youtube-nocookie.com/embed/k8YhyA_L_yY?autoplay=1'
    }
  },
  {
    id: 4,
    mal_id: 40748,
    title: {
      romaji: 'Jujutsu Kaisen',
      english: 'Jujutsu Kaisen',
      native: '呪術廻戦'
    },
    synopsis: 'Yuuji Itadori adalah siswa SMA biasa dengan kekuatan fisik luar biasa. Demi menyelamatkan temannya dari Kutukan ganas, dia menelan jari Ryomen Sukuna, Raja Kutukan legendaris, dan terseret ke dalam perang dunia penyihir jujutsu yang mematikan.',
    bannerImage: 'https://images.unsplash.com/photo-1563089145-599997674d42?w=1600&auto=format&fit=crop&q=80',
    coverImage: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?w=600&auto=format&fit=crop&q=80',
    score: 8.61,
    scoredBy: 1650000,
    rank: 68,
    popularity: 4,
    episodesCount: 24,
    status: 'Finished Airing',
    format: 'TV',
    season: 'Fall',
    year: 2020,
    studio: 'MAPPA',
    rating: 'R - 17+',
    genres: ['Action', 'Fantasy', 'Supernatural', 'Shounen'],
    trailer: {
      youtube_id: 'pkZXflMmPrY',
      url: 'https://www.youtube.com/watch?v=pkZXflMmPrY',
      embed_url: 'https://www.youtube-nocookie.com/embed/pkZXflMmPrY?autoplay=1'
    }
  },
  {
    id: 5,
    mal_id: 38000,
    title: {
      romaji: 'Kimetsu no Yaiba',
      english: 'Demon Slayer: Kimetsu no Yaiba',
      native: '鬼滅の刃'
    },
    synopsis: 'Sejak zaman kuno, rumor tentang iblis pemakan manusia yang bersembunyi di hutan telah beredar. Setelah keluarganya dibantai dan adik perempuannya Nezuko diubah menjadi iblis, Tanjiro Kamado bersumpah untuk membalas dendam dan mencari obat untuk mengembalikan kemanusiaan adiknya.',
    bannerImage: 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?w=1600&auto=format&fit=crop&q=80',
    coverImage: 'https://images.unsplash.com/photo-1579783902614-a3fb3927b675?w=600&auto=format&fit=crop&q=80',
    score: 8.49,
    scoredBy: 2200000,
    rank: 120,
    popularity: 2,
    episodesCount: 26,
    status: 'Finished Airing',
    format: 'TV',
    season: 'Spring',
    year: 2019,
    studio: 'ufotable',
    rating: 'R - 17+',
    genres: ['Action', 'Fantasy', 'Historical', 'Supernatural'],
    trailer: {
      youtube_id: 'VQGCKyvzIM4',
      url: 'https://www.youtube.com/watch?v=VQGCKyvzIM4',
      embed_url: 'https://www.youtube-nocookie.com/embed/VQGCKyvzIM4?autoplay=1'
    }
  },
  {
    id: 6,
    mal_id: 16498,
    title: {
      romaji: 'Shingeki no Kyojin',
      english: 'Attack on Titan',
      native: '進撃の巨人'
    },
    synopsis: 'Berabad-abad yang lalu, umat manusia dibantai hingga hampir punah oleh makhluk mengerikan setinggi raksasa yang disebut Titan. Setelah ratusan tahun damai di balik dinding raksasa, Titan Kolosal menerobos gerbang, memicu sumpah Eren Yeager untuk membasmi setiap Titan di muka bumi.',
    bannerImage: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=1600&auto=format&fit=crop&q=80',
    coverImage: 'https://images.unsplash.com/photo-1578632767115-351597cf2477?w=600&auto=format&fit=crop&q=80',
    score: 8.55,
    scoredBy: 2800000,
    rank: 95,
    popularity: 1,
    episodesCount: 25,
    status: 'Finished Airing',
    format: 'TV',
    season: 'Spring',
    year: 2013,
    studio: 'Wit Studio',
    rating: 'R - 17+',
    genres: ['Action', 'Drama', 'Fantasy', 'Mystery', 'Suspense'],
    trailer: {
      youtube_id: 'M_OauHnAFc8',
      url: 'https://www.youtube.com/watch?v=M_OauHnAFc8',
      embed_url: 'https://www.youtube-nocookie.com/embed/M_OauHnAFc8?autoplay=1'
    }
  },
  {
    id: 7,
    mal_id: 56931,
    title: {
      romaji: 'Dandadan',
      english: 'DAN DA DAN',
      native: 'ダンダダン'
    },
    synopsis: 'Momo Ayase percaya pada hantu tapi tidak pada alien, sementara Okarun percaya pada alien tapi skeptis pada hantu. Keduanya bertaruh mengunjungi lokasi terkutuk dan piring terbang secara bersamaan, mengungkap dunia supranatural yang liar dan penuh kejutan kocak serta pertarungan epik.',
    bannerImage: 'https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?w=1600&auto=format&fit=crop&q=80',
    coverImage: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=600&auto=format&fit=crop&q=80',
    score: 8.65,
    scoredBy: 310000,
    rank: 55,
    popularity: 18,
    episodesCount: 12,
    status: 'Currently Airing',
    format: 'TV',
    season: 'Fall',
    year: 2024,
    studio: 'Science SARU',
    rating: 'R - 17+',
    genres: ['Action', 'Comedy', 'Supernatural', 'Sci-Fi'],
    trailer: {
      youtube_id: 'L3yqYxR-5W4',
      url: 'https://www.youtube.com/watch?v=L3yqYxR-5W4',
      embed_url: 'https://www.youtube-nocookie.com/embed/L3yqYxR-5W4?autoplay=1'
    }
  },
  {
    id: 8,
    mal_id: 21,
    title: {
      romaji: 'One Piece',
      english: 'One Piece',
      native: 'ONE PIECE'
    },
    synopsis: 'Monkey D. Luffy menolak definisi bajak laut biasa yang kejam. Dengan tubuh berkemampuan karet dan mimpi menemukan harta karun pamungkas "One Piece", Luffy mengumpulkan kru setia dan mengarungi lautan Grand Line yang berbahaya.',
    bannerImage: 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?w=1600&auto=format&fit=crop&q=80',
    coverImage: 'https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?w=600&auto=format&fit=crop&q=80',
    score: 8.73,
    scoredBy: 1400000,
    rank: 45,
    popularity: 15,
    episodesCount: 1120,
    status: 'Currently Airing',
    format: 'TV',
    season: 'Fall',
    year: 1999,
    studio: 'Toei Animation',
    rating: 'PG-13',
    genres: ['Action', 'Adventure', 'Comedy', 'Fantasy', 'Shounen'],
    trailer: {
      youtube_id: 'MCb13lbK-bk',
      url: 'https://www.youtube.com/watch?v=MCb13lbK-bk',
      embed_url: 'https://www.youtube-nocookie.com/embed/MCb13lbK-bk?autoplay=1'
    }
  },
  {
    id: 9,
    mal_id: 44511,
    title: {
      romaji: 'Chainsaw Man',
      english: 'Chainsaw Man',
      native: 'チェンソーマン'
    },
    synopsis: 'Denji memiliki mimpi sederhana: menjalani hidup bahagia dan damai bersama gadis yang disukainya. Namun dipaksa membayar hutang ayahnya kepada Yakuza, Denji memburu iblis bersama anjing iblis gergaji Pochita sampai pengkhianatan fatal mengubahnya menjadi Chainsaw Man.',
    bannerImage: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?w=1600&auto=format&fit=crop&q=80',
    coverImage: 'https://images.unsplash.com/photo-1579783902614-a3fb3927b675?w=600&auto=format&fit=crop&q=80',
    score: 8.48,
    scoredBy: 980000,
    rank: 125,
    popularity: 8,
    episodesCount: 12,
    status: 'Finished Airing',
    format: 'TV',
    season: 'Fall',
    year: 2022,
    studio: 'MAPPA',
    rating: 'R - 17+',
    genres: ['Action', 'Supernatural', 'Gore', 'Shounen'],
    trailer: {
      youtube_id: 'q15CRdE5Bv0',
      url: 'https://www.youtube.com/watch?v=q15CRdE5Bv0',
      embed_url: 'https://www.youtube-nocookie.com/embed/q15CRdE5Bv0?autoplay=1'
    }
  },
  {
    id: 10,
    mal_id: 50265,
    title: {
      romaji: 'Spy x Family',
      english: 'SPY x FAMILY',
      native: 'SPY×FAMILY'
    },
    synopsis: 'Untuk menjalankan misi tingkat tinggi demi perdamaian dunia, mata-mata nomor satu "Twilight" harus membentuk keluarga palsu. Tanpa disadarinya, istri barunya adalah pembunuh bayaran ulung, dan anak angkatnya adalah gadis telepati yang bisa membaca pikiran!',
    bannerImage: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=1600&auto=format&fit=crop&q=80',
    coverImage: 'https://images.unsplash.com/photo-1563089145-599997674d42?w=600&auto=format&fit=crop&q=80',
    score: 8.50,
    scoredBy: 1120000,
    rank: 110,
    popularity: 14,
    episodesCount: 25,
    status: 'Finished Airing',
    format: 'TV',
    season: 'Spring',
    year: 2022,
    studio: 'Wit Studio / CloverWorks',
    rating: 'PG-13',
    genres: ['Action', 'Comedy', 'Shounen'],
    trailer: {
      youtube_id: 'ofXigq9aI60',
      url: 'https://www.youtube.com/watch?v=ofXigq9aI60',
      embed_url: 'https://www.youtube-nocookie.com/embed/ofXigq9aI60?autoplay=1'
    }
  },
  {
    id: 11,
    mal_id: 1535,
    title: {
      romaji: 'Death Note',
      english: 'Death Note',
      native: 'DEATH NOTE'
    },
    synopsis: 'Light Yagami, siswa jenius yang muak dengan kejahatan dunia, menemukan buku catatan hitam kepunyaan Dewa Kematian Ryuk. Setiap manusia yang namanya ditulis di dalamnya akan mati. Light berniat menjadi Dewa Dunia Baru, memicu perburuan otak legendaris melawan detektif misterius L.',
    bannerImage: 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?w=1600&auto=format&fit=crop&q=80',
    coverImage: 'https://images.unsplash.com/photo-1578632767115-351597cf2477?w=600&auto=format&fit=crop&q=80',
    score: 8.62,
    scoredBy: 3700000,
    rank: 60,
    popularity: 2,
    episodesCount: 37,
    status: 'Finished Airing',
    format: 'TV',
    season: 'Fall',
    year: 2006,
    studio: 'Madhouse',
    rating: 'R - 17+',
    genres: ['Supernatural', 'Suspense', 'Psychological'],
    trailer: {
      youtube_id: 'tPEE9ZwTmy0',
      url: 'https://www.youtube.com/watch?v=tPEE9ZwTmy0',
      embed_url: 'https://www.youtube-nocookie.com/embed/tPEE9ZwTmy0?autoplay=1'
    }
  },
  {
    id: 12,
    mal_id: 41467,
    title: {
      romaji: 'Bleach: Sennen Kessen-hen',
      english: 'Bleach: Thousand-Year Blood War',
      native: 'BLEACH 千年血戦篇'
    },
    synopsis: 'Keseimbangan Soul Society tiba-tiba runtuh ketika Hollow menghilang secara misterius dari Dunia Manusia. Kekaisaran Quincy yang tak terlihat pimpinan Yhwach bangkit untuk membalas dendam ribuan tahun kepada Shinigami.',
    bannerImage: 'https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?w=1600&auto=format&fit=crop&q=80',
    coverImage: 'https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?w=600&auto=format&fit=crop&q=80',
    score: 9.02,
    scoredBy: 360000,
    rank: 7,
    popularity: 38,
    episodesCount: 13,
    status: 'Finished Airing',
    format: 'TV',
    season: 'Fall',
    year: 2022,
    studio: 'Pierrot',
    rating: 'R - 17+',
    genres: ['Action', 'Adventure', 'Supernatural'],
    trailer: {
      youtube_id: 'e8YBesRKq_U',
      url: 'https://www.youtube.com/watch?v=e8YBesRKq_U',
      embed_url: 'https://www.youtube-nocookie.com/embed/e8YBesRKq_U?autoplay=1'
    }
  }
].map(anime => ({
  ...anime,
  episodes: generateEpisodes(anime.id, anime.title.romaji, anime.episodesCount, anime.trailer?.youtube_id)
}));

// Available genres for filtering
export const GENRE_LIST = [
  'Semua Genre',
  'Action',
  'Adventure',
  'Comedy',
  'Drama',
  'Fantasy',
  'Mystery',
  'Romance',
  'Sci-Fi',
  'Shounen',
  'Supernatural',
  'Suspense'
];

// Helper to fetch live from Jikan API or fallback to local
export async function searchAnimeOnline(query: string): Promise<Anime[]> {
  if (!query.trim()) return INITIAL_ANIMES;

  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 4000);

    const res = await fetch(`https://api.jikan.moe/v4/anime?q=${encodeURIComponent(query)}&limit=12&sfw=true`, {
      signal: controller.signal
    });
    clearTimeout(timeout);

    if (res.ok) {
      const data = await res.json();
      if (data && Array.isArray(data.data) && data.data.length > 0) {
        // Map Jikan data to our Anime format
        return data.data.map((item: any) => {
          const ytId = item.trailer?.youtube_id || null;
          return {
            id: item.mal_id,
            mal_id: item.mal_id,
            title: {
              romaji: item.title,
              english: item.title_english || item.title,
              native: item.title_japanese || item.title
            },
            synopsis: item.synopsis || 'Sinopsis belum tersedia untuk judul ini.',
            bannerImage: item.images?.jpg?.large_image_url || item.images?.webp?.large_image_url,
            coverImage: item.images?.jpg?.large_image_url || item.images?.jpg?.image_url,
            score: item.score || 8.0,
            scoredBy: item.scored_by,
            rank: item.rank,
            popularity: item.popularity,
            episodesCount: item.episodes || 12,
            status: item.status || 'Finished Airing',
            format: item.type || 'TV',
            season: item.season,
            year: item.year,
            studio: item.studios?.[0]?.name || 'Animation Studio',
            rating: item.rating || 'PG-13',
            genres: item.genres ? item.genres.map((g: any) => g.name) : ['Action'],
            trailer: {
              youtube_id: ytId,
              url: item.trailer?.url || null,
              embed_url: item.trailer?.embed_url || (ytId ? `https://www.youtube-nocookie.com/embed/${ytId}?autoplay=1` : null)
            },
            episodes: generateEpisodes(item.mal_id, item.title, item.episodes || 12, ytId)
          };
        });
      }
    }
  } catch (err) {
    console.warn('Jikan API search fallback to local data:', err);
  }

  // Fallback search locally
  const q = query.toLowerCase();
  return INITIAL_ANIMES.filter(
    a =>
      a.title.romaji.toLowerCase().includes(q) ||
      a.title.english.toLowerCase().includes(q) ||
      a.genres.some(g => g.toLowerCase().includes(q))
  );
}
