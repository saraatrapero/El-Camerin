
import React from 'react';
import { GALLERY_IMAGES } from '../constants';

const Gallery: React.FC = () => {
  return (
    <section id="galeria" className="py-32 bg-stone-950 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-8">
          <div className="max-w-2xl">
            <h2 className="text-5xl font-serif font-bold text-amber-500">Mosaico de Devoción</h2>
            <p className="text-stone-400 mt-6 text-lg">
              Capturas que resumen la esencia de un sentimiento: desde el silencio del santuario en invierno hasta el estallido de júbilo en la calzada.
            </p>
          </div>
          <a href="#" className="inline-flex items-center text-amber-500 font-bold hover:text-amber-400 transition-colors group">
            Ver galería completa
            <span className="ml-2 group-hover:translate-x-2 transition-transform">→</span>
          </a>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {GALLERY_IMAGES.map((img, idx) => (
            <div 
              key={idx} 
              className={`relative overflow-hidden group rounded-2xl cursor-pointer ${
                idx === 0 ? 'lg:col-span-2 lg:row-span-2 aspect-[16/10] lg:aspect-auto' : 'aspect-square'
              }`}
            >
              <img 
                src={img.url} 
                alt={img.title} 
                className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/20 to-transparent opacity-60 group-hover:opacity-90 transition-opacity duration-500"></div>
              <div className="absolute inset-0 flex flex-col justify-end p-8 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                <h3 className="text-2xl font-serif font-bold text-amber-500">{img.title}</h3>
                <p className="text-stone-300 text-sm mt-2 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">{img.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Gallery;
