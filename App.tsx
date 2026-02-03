
import React from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import History from './components/History';
import GeminiAssistant from './components/GeminiAssistant';
import Gallery from './components/Gallery';
import Events from './components/Events';
import Footer from './components/Footer';

const App: React.FC = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <Hero />
        <History />
        
        {/* Santuario Section with Improved Visuals */}
        <section id="santuario" className="py-32 bg-stone-50 overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col lg:flex-row items-center gap-20">
              <div className="lg:w-1/2">
                <div className="inline-block p-3 bg-amber-600 text-white rounded-lg mb-8 shadow-lg shadow-amber-600/20">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                </div>
                <h2 className="text-5xl font-serif font-bold text-stone-900 mb-8">El Real Santuario de la Cabeza</h2>
                <p className="text-stone-600 text-xl leading-relaxed mb-8 font-light">
                  Más que una basílica, es el epicentro de un sentimiento que late en el corazón de Sierra Morena. Su arquitectura actual, reconstruida tras 1939, guarda la esencia de los siglos en cada piedra.
                </p>
                <div className="grid grid-cols-2 gap-6 mb-10">
                  <div className="p-4 bg-white rounded-xl shadow-sm border border-stone-100">
                    <p className="text-amber-600 font-bold text-2xl">Basílica</p>
                    <p className="text-stone-500 text-sm">Menor desde 2010</p>
                  </div>
                  <div className="p-4 bg-white rounded-xl shadow-sm border border-stone-100">
                    <p className="text-amber-600 font-bold text-2xl">665 m</p>
                    <p className="text-stone-500 text-sm">Altitud en el Cerro</p>
                  </div>
                </div>
                <div className="bg-amber-900 text-amber-100 p-8 rounded-2xl shadow-2xl relative overflow-hidden group">
                  <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:rotate-12 transition-transform">
                    <svg className="w-24 h-24" fill="currentColor" viewBox="0 0 20 20"><path d="M10 2a6 6 0 00-6 6v3.586l-.707.707A1 1 0 004 14h12a1 1 0 00.707-1.707L16 11.586V8a6 6 0 00-6-6zM10 18a3 3 0 01-3-3h6a3 3 0 01-3 3z"></path></svg>
                  </div>
                  <p className="italic text-lg relative z-10 leading-relaxed">
                    "Vengo de Sierra Morena, de ver a la Morenita, que es la Virgen de la Cabeza, la que más gracia tiene y la más bonita."
                  </p>
                  <p className="mt-4 font-bold text-amber-500 tracking-widest uppercase text-xs">Cante Popular</p>
                </div>
              </div>
              <div className="lg:w-1/2 relative">
                <div className="absolute -inset-4 bg-amber-600/10 rounded-3xl blur-2xl transform rotate-3"></div>
                <img 
                  src="https://picsum.photos/seed/basilica-facade-cabezo/1000/1200" 
                  alt="Fachada de la Basílica" 
                  className="relative z-10 rounded-2xl shadow-2xl w-full object-cover h-[700px]"
                />
              </div>
            </div>
          </div>
        </section>
        
        {/* Romeria Section with More Appropriate Content */}
        <section id="romeria" className="relative py-32 bg-stone-900 text-white overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-amber-600 to-transparent"></div>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
            <div className="text-center mb-24">
              <h2 className="text-5xl md:text-7xl font-serif font-bold text-white mt-4 mb-6">La Romería</h2>
              <div className="flex items-center justify-center gap-4 mb-8">
                <span className="h-px w-12 bg-amber-600"></span>
                <span className="text-amber-500 font-bold uppercase tracking-[0.2em] text-sm">Tradición Centenaria</span>
                <span className="h-px w-12 bg-amber-600"></span>
              </div>
              <p className="text-stone-400 mt-4 max-w-3xl mx-auto text-xl font-light">
                Cada último domingo de abril, el mundo mira hacia Andújar. Una amalgama de colores, vivas y emociones que recorre los senderos de Sierra Morena.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
              {[
                {
                  title: "Viernes de Recepción",
                  desc: "La llegada de las cofradías a Andújar y el desfile por sus calles ante la emoción del pueblo.",
                  seed: "andujar-reception"
                },
                {
                  title: "Sábado de Camino",
                  desc: "La subida por los caracoles, el lugar donde el esfuerzo se convierte en oración bajo el sol de la sierra.",
                  seed: "mountain-path"
                },
                {
                  title: "Domingo de Procesión",
                  desc: "El encuentro cara a cara con la Morenita. La Virgen sale a su calzada entre un mar de pañuelos.",
                  seed: "procession-crowd"
                }
              ].map((item, i) => (
                <div key={i} className="group cursor-pointer">
                  <div className="relative overflow-hidden rounded-2xl mb-8 aspect-video">
                    <img src={`https://picsum.photos/seed/${item.seed}/800/600`} alt={item.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                    <div className="absolute inset-0 bg-amber-900/40 group-hover:bg-amber-900/10 transition-colors"></div>
                  </div>
                  <h3 className="text-2xl font-serif font-bold mb-4 text-amber-500">{item.title}</h3>
                  <p className="text-stone-400 leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <GeminiAssistant />
        <Gallery />
        <Events />
      </main>
      <Footer />
    </div>
  );
};

export default App;
