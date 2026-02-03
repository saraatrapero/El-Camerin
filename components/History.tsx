
import React from 'react';

const History: React.FC = () => {
  return (
    <section id="historia" className="py-24 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <div className="relative">
            <div className="absolute -top-10 -left-10 w-40 h-40 bg-amber-50 rounded-full -z-10 blur-3xl"></div>
            <div className="absolute -bottom-10 -right-10 w-60 h-60 bg-stone-100 rounded-full -z-10 blur-3xl"></div>
            
            <div className="relative z-10">
              <img 
                src="https://picsum.photos/seed/old-religious-painting/800/1000" 
                alt="Grabado antiguo de la Aparición" 
                className="rounded-2xl shadow-[0_32px_64px_-16px_rgba(0,0,0,0.2)] w-full h-[650px] object-cover border-8 border-white"
              />
              <div className="absolute bottom-6 right-6 bg-amber-600 text-white px-6 py-4 rounded-xl shadow-lg font-serif">
                <p className="text-sm italic">"Pastorcillo de Colomera..."</p>
              </div>
            </div>
          </div>
          
          <div className="relative">
            <span className="inline-block px-4 py-1 rounded-full bg-amber-100 text-amber-800 font-bold tracking-widest uppercase text-xs mb-6">
              Crónica de un Milagro
            </span>
            <h2 className="text-5xl md:text-6xl font-serif font-bold mb-10 text-stone-900 leading-tight">
              La Noche del <br/>Cerro del Cabezo
            </h2>
            
            <div className="space-y-8 text-stone-600 text-lg leading-relaxed italic font-light">
              <p className="border-l-4 border-amber-600 pl-6 bg-stone-50 py-4 rounded-r-xl">
                "En la soledad de la sierra, entre el aroma de la jara y el romero, una luz inefable rompió las sombras de la historia en aquel agosto de 1227."
              </p>
              <p className="not-italic font-normal">
                Juan de Rivas, pastor humilde, fue el primer testigo de la presencia de la Morenita. Su brazo, antaño inmóvil, cobró vida ante la mirada de la Reina de los Ángeles, convirtiéndose en el primer heraldo de una devoción que hoy cruza fronteras.
              </p>
              <p className="not-italic font-normal">
                Desde Andújar hasta el último rincón de la Diócesis, el eco de aquella campana milagrosa sigue resonando en el corazón de miles de peregrinos que cada año ascienden al santuario para rendir pleitesía a su Patrona.
              </p>
            </div>

            <div className="mt-12 flex items-center gap-8">
              <div className="flex -space-x-4">
                {[1,2,3,4].map(i => (
                  <div key={i} className="w-12 h-12 rounded-full border-4 border-white overflow-hidden shadow-sm">
                    <img src={`https://picsum.photos/seed/devotee-${i}/100/100`} alt="Devoto" />
                  </div>
                ))}
              </div>
              <p className="text-sm text-stone-500 font-medium">Miles de devotos comparten esta historia.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default History;
