
import React from 'react';
import { Facebook, Instagram, Twitter, Mail, MapPin } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-stone-900 text-stone-400 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          <div className="col-span-1 md:col-span-2">
            <h3 className="text-2xl font-serif font-bold text-white mb-6">Virgen de la Cabeza</h3>
            <p className="max-w-md mb-8">
              Página informativa dedicada a la devoción de Nuestra Señora de la Cabeza, Reina de Sierra Morena y Patrona de la Diócesis de Jaén.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="p-2 bg-stone-800 rounded-full hover:bg-amber-600 hover:text-white transition-all"><Facebook size={20} /></a>
              <a href="#" className="p-2 bg-stone-800 rounded-full hover:bg-amber-600 hover:text-white transition-all"><Instagram size={20} /></a>
              <a href="#" className="p-2 bg-stone-800 rounded-full hover:bg-amber-600 hover:text-white transition-all"><Twitter size={20} /></a>
            </div>
          </div>

          <div>
            <h4 className="text-white font-bold mb-6 uppercase tracking-wider text-sm">Contacto</h4>
            <ul className="space-y-4">
              <li className="flex items-start">
                <MapPin className="mr-3 text-amber-600 shrink-0" size={18} />
                <span>Cerro del Cabezo s/n,<br />23740 Andújar, Jaén</span>
              </li>
              <li className="flex items-center">
                <Mail className="mr-3 text-amber-600 shrink-0" size={18} />
                <span>info@santuariovirtual.es</span>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold mb-6 uppercase tracking-wider text-sm">Legales</h4>
            <ul className="space-y-4">
              <li><a href="#" className="hover:text-amber-500 transition-colors">Aviso Legal</a></li>
              <li><a href="#" className="hover:text-amber-500 transition-colors">Política de Privacidad</a></li>
              <li><a href="#" className="hover:text-amber-500 transition-colors">Cookies</a></li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-stone-800 text-center text-sm">
          <p>&copy; {new Date().getFullYear()} Santuario Virtual Virgen de la Cabeza. Realizado con fervor por devotos de la Morenita.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
