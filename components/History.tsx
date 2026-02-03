
import React from 'react';
import { EditableText, EditableImage } from './Editable';
import { SiteContent } from '../types';

interface HistoryProps {
  isAdmin: boolean;
  content: SiteContent;
  updateContent: (section: keyof SiteContent, field: string, value: string) => void;
}

// Updated History component to support editing and dynamic content from the CMS
const History: React.FC<HistoryProps> = ({ isAdmin, content, updateContent }) => {
  return (
    <section id="historia" className="py-24 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <div className="relative">
            <div className="absolute -top-10 -left-10 w-40 h-40 bg-amber-50 rounded-full -z-10 blur-3xl"></div>
            
            <div className="relative z-10">
              <EditableImage 
                isAdmin={isAdmin} 
                src={content.history.image} 
                onSave={(val) => updateContent('history', 'image', val)} 
                className="rounded-2xl shadow-2xl w-full h-[650px] object-cover border-8 border-white" 
              />
              <div className="absolute bottom-6 right-6 bg-amber-600 text-white px-6 py-4 rounded-xl shadow-lg font-serif">
                <p className="text-sm italic">"Año de gracia de 1227"</p>
              </div>
            </div>
          </div>
          
          <div className="relative">
            <span className="inline-block px-4 py-1 rounded-full bg-amber-100 text-amber-800 font-bold tracking-widest uppercase text-xs mb-6">
              El Milagro del Cabezo
            </span>
            <h2 className="text-5xl md:text-6xl font-serif font-bold mb-10 text-stone-900 leading-tight">
              <EditableText 
                isAdmin={isAdmin} 
                value={content.history.title} 
                onSave={(val) => updateContent('history', 'title', val)} 
              />
            </h2>
            
            <div className="space-y-8 text-stone-600 text-lg leading-relaxed font-light">
              <p className="border-l-4 border-amber-600 pl-6 bg-stone-50 py-4 rounded-r-xl italic">
                <EditableText 
                  isAdmin={isAdmin} 
                  value={content.history.quote} 
                  onSave={(val) => updateContent('history', 'quote', val)} 
                  type="textarea" 
                />
              </p>
              <div className="not-italic font-normal space-y-4">
                <p>
                  <EditableText 
                    isAdmin={isAdmin} 
                    value={content.history.p1} 
                    onSave={(val) => updateContent('history', 'p1', val)} 
                    type="textarea" 
                  />
                </p>
                <p>
                  <EditableText 
                    isAdmin={isAdmin} 
                    value={content.history.p2} 
                    onSave={(val) => updateContent('history', 'p2', val)} 
                    type="textarea" 
                  />
                </p>
              </div>
            </div>

            <div className="mt-12 flex items-center gap-6">
              <div className="p-4 bg-stone-100 rounded-2xl">
                <p className="text-amber-700 font-bold text-lg">797 Años</p>
                <p className="text-stone-500 text-xs uppercase tracking-wider">De Tradición Continua</p>
              </div>
              <div className="p-4 bg-stone-100 rounded-2xl">
                <p className="text-amber-700 font-bold text-lg">Andújar</p>
                <p className="text-stone-500 text-xs uppercase tracking-wider">Cuna de la Devoción</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default History;
