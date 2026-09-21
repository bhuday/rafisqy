import React from 'react';
import { Play, Heart, Shield, Film, Sparkles } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="mt-20 border-t border-neutral-900 bg-neutral-950/90 text-neutral-400 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-rose-600 to-amber-500 flex items-center justify-center text-white">
              <Play className="w-4 h-4 fill-current translate-x-0.5" />
            </div>
            <div>
              <span className="font-display font-extrabold text-base text-white">
                Rafisqy <span className="text-rose-500">Anime</span>
              </span>
              <p className="text-[11px] text-neutral-500">
                Aplikasi streaming anime online dengan pemutar video lengkap
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-6 text-neutral-400">
            <span className="flex items-center gap-1.5">
              <Shield className="w-3.5 h-3.5 text-emerald-500" />
              Tanpa Iklan Mengganggu
            </span>
            <span className="flex items-center gap-1.5">
              <Film className="w-3.5 h-3.5 text-rose-500" />
              Video Ultra HD & Multi-Server
            </span>
            <span className="flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-amber-500" />
              Auto Skip Intro & Keep Watching
            </span>
          </div>

          <div className="text-center md:text-right text-[11px] text-neutral-500">
            <p>© {new Date().getFullYear()} Rafisqy Anime.</p>
            <p className="mt-0.5">Dibuat dengan cinta untuk para pecinta anime di seluruh Indonesia.</p>
          </div>

        </div>
      </div>
    </footer>
  );
};
