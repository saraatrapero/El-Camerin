
import React from 'react';
import { ChevronDown } from 'lucide-react';

const Hero: React.FC = () => {
  return (
    <section id="inicio" className="relative h-screen w-full overflow-hidden flex items-center justify-center">
      {/* Background Image with Overlay - Evoking a misty morning in Sierra Morena */}
      <div 
        className="absolute inset-0 bg-cover bg-center z-0 scale-105 animate-slow-zoom"
        style={{ backgroundImage: "url('https://picsum.photos/seed/sierra-morena-dawn/1920/1080')" }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/30 to-black/60"></div>
      </div>

      <div className="relative z-10 text-center px-4 max-w-4xl">
        <h2 className="text-amber-400 font-medium tracking-[0.3em] uppercase mb-4 animate-fade-in-up text-sm md:text-base">
          Reina de Sierra Morena
        </h2>
        <h1 className="text-6xl md:text-8xl font-serif text-white font-bold mb-6 drop-shadow-2xl">
          La Morenita
        </h1>
        <p className="text-xl md:text-2xl text-stone-200 mb-10 max-w-2xl mx-auto leading-relaxed font-light">
          Ocho siglos de fervor, milagro y tradición en el corazón de la Sierra de Andújar.
        </p>
        <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
          <a 
            href="#historia" 
            className="group relative px-10 py-4 bg-amber-600 hover:bg-amber-500 text-white font-bold rounded-full transition-all shadow-xl hover:shadow-amber-500/40 overflow-hidden"
          >
            <span className="relative z-10">Explorar Tradición</span>
            <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
          </a>
          <a 
            href="#assistant" 
            className="px-10 py-4 bg-white/5 hover:bg-white/10 backdrop-blur-xl text-white font-bold border border-white/20 rounded-full transition-all hover:border-white/40"
          >
            Guía Virtual
          </a>
        </div>
      </div>

      <div className="absolute bottom-12 left-1/2 -translate-x-1/2 text-white/50 animate-bounce">
        <div className="flex flex-col items-center gap-2">
          <span className="text-[10px] uppercase tracking-widest">Deslizar</span>
          <ChevronDown size={24} />
        </div>
      </div>

      <style>{`
        @keyframes slow-zoom {
          from { transform: scale(1); }
          to { transform: scale(1.1); }
        }
        .animate-slow-zoom {
          animation: slow-zoom 20s infinite alternate ease-in-out;
        }
      `}</style>
    </section>
  );
};

export default Hero;
