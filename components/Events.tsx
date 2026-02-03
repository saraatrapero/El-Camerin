
import React from 'react';
import { Calendar } from 'lucide-react';
import { UPCOMING_EVENTS } from '../constants';

const Events: React.FC = () => {
  return (
    <section className="py-24 bg-amber-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          <div className="lg:col-span-1">
            <h2 className="text-4xl font-serif font-bold mb-6">Próximas Citas</h2>
            <p className="text-amber-200/80 leading-relaxed mb-8">
              Sigue el calendario de eventos litúrgicos y festivos en torno al Santuario de la Virgen de la Cabeza.
            </p>
            <div className="p-8 bg-amber-800/50 rounded-2xl border border-amber-700/50">
              <div className="flex items-center text-amber-400 mb-4">
                <Calendar className="mr-2" size={24} />
                <span className="font-bold uppercase tracking-widest text-sm">Próxima Romería</span>
              </div>
              <p className="text-3xl font-serif font-bold">Abril 2025</p>
              <p className="text-amber-100/60 text-sm mt-2 italic">El último domingo de abril.</p>
            </div>
          </div>

          <div className="lg:col-span-2 space-y-6">
            {UPCOMING_EVENTS.map((event, idx) => (
              <div 
                key={idx}
                className="flex flex-col md:flex-row gap-6 p-6 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors group"
              >
                <div className="flex-shrink-0 md:w-32 text-center md:text-left">
                  <p className="text-amber-500 font-bold uppercase text-xs tracking-widest mb-1">Fecha</p>
                  <p className="text-lg font-serif font-bold">{event.date}</p>
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2 group-hover:text-amber-400 transition-colors">{event.title}</h3>
                  <p className="text-stone-300">{event.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Events;
