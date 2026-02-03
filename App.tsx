
import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import History from './components/History';
import Inscripciones from './components/Inscripciones';
import GeminiAssistant from './components/GeminiAssistant';
import Gallery from './components/Gallery';
import Events from './components/Events';
import Footer from './components/Footer';
import SignaturePad from './components/SignaturePad';
import { EditableText, EditableImage } from './components/Editable';
import { AuthSession, SiteContent, Persona } from './types';
import { INITIAL_CONTENT } from './constants';
import { LogOut, User as UserIcon, ShieldCheck, CheckCircle, Download, Smartphone } from 'lucide-react';

const App: React.FC = () => {
  const [session, setSession] = useState<AuthSession>({ role: 'guest' });
  
  const [content, setContent] = useState<SiteContent>(() => {
    try {
      const saved = localStorage.getItem('site_content');
      return saved ? JSON.parse(saved) : INITIAL_CONTENT;
    } catch (e) { return INITIAL_CONTENT; }
  });
  
  const [isRemoteSigning, setIsRemoteSigning] = useState(false);
  const [remotePersonaId, setRemotePersonaId] = useState<string | null>(null);
  const [remotePersonaName, setRemotePersonaName] = useState('');
  const [signatureDone, setSignatureDone] = useState(false);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get('mode') === 'sign') {
      setIsRemoteSigning(true);
      setRemotePersonaId(params.get('pid'));
      setRemotePersonaName(params.get('pname') || 'Visitante');
    }
  }, []);

  const updateContent = (section: keyof SiteContent, field: string, value: string) => {
    const newContent = { ...content, [section]: { ...content[section], [field]: value } };
    setContent(newContent);
    localStorage.setItem('site_content', JSON.stringify(newContent));
  };

  const handleRemoteSave = (signature: string) => {
    if (!remotePersonaId) return;
    
    const storedPersonas = localStorage.getItem('romeria_personas');
    let updated: Persona[] = [];
    if (storedPersonas) {
      const personas: Persona[] = JSON.parse(storedPersonas);
      updated = personas.map(p => p.id === remotePersonaId ? { ...p, signature } : p);
    } else {
      updated = [{
        id: remotePersonaId,
        nombre: remotePersonaName,
        signature,
        tipo: 'socio',
        fechaRegistro: new Date().toLocaleDateString(),
        dni: '', tlf: '', email: '', fechaNacimiento: ''
      }];
    }
    localStorage.setItem('romeria_personas', JSON.stringify(updated));
    setSignatureDone(true);
  };

  const exportForBoss = () => {
    const stored = localStorage.getItem('romeria_personas');
    if (!stored) return;
    const blob = new Blob([stored], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `comprobante_firma_${remotePersonaName.replace(/\s+/g, '_')}.json`;
    a.click();
    alert('Comprobante descargado. Por favor, envíalo por WhatsApp al responsable de tu carreta.');
  };

  if (isRemoteSigning) {
    return (
      <div className="min-h-screen bg-stone-100 flex flex-col items-center justify-center p-4">
        {signatureDone ? (
          <div className="bg-white p-8 rounded-3xl shadow-2xl text-center max-w-sm w-full animate-fade-in border-t-8 border-green-500">
            <CheckCircle size={60} className="text-green-500 mx-auto mb-4" />
            <h2 className="text-2xl font-serif font-bold mb-2">¡Firma Registrada!</h2>
            <p className="text-stone-600 text-sm mb-8">Tu firma se ha guardado en este dispositivo. Para completar el proceso, descarga el archivo y envíaselo a tu responsable.</p>
            <button onClick={exportForBoss} className="w-full bg-green-600 text-white font-bold py-4 rounded-xl flex items-center justify-center mb-4 shadow-lg active:scale-95 transition-all">
              <Download size={20} className="mr-2" /> Enviar Comprobante
            </button>
            <p className="text-[10px] text-stone-400 uppercase font-bold">Romería de la Virgen de la Cabeza</p>
          </div>
        ) : (
          <div className="w-full max-w-md">
            <div className="text-center mb-6">
              <div className="inline-block p-2 bg-amber-100 text-amber-700 rounded-full mb-2">
                <Smartphone size={24} />
              </div>
              <h2 className="text-2xl font-serif font-bold">Portal de Firma</h2>
              <p className="text-stone-500 text-sm">Hola {remotePersonaName}, firma abajo para autorizar tus datos.</p>
            </div>
            <SignaturePad 
              userName={remotePersonaName}
              onCancel={() => window.location.href = window.location.origin + window.location.pathname}
              onSave={handleRemoteSave}
            />
          </div>
        )}
      </div>
    );
  }

  const isAdmin = session.role === 'admin';

  return (
    <div className="min-h-screen">
      <Header />
      {session.role !== 'guest' && (
        <div className={`fixed top-24 right-6 z-[60] flex items-center gap-4 px-4 py-2 rounded-full shadow-2xl backdrop-blur-md border animate-fade-in print:hidden ${isAdmin ? 'bg-amber-600 text-white border-amber-500' : 'bg-stone-900 text-stone-100 border-stone-800'}`}>
          {isAdmin ? <ShieldCheck size={18}/> : <UserIcon size={18}/>}
          <div className="flex flex-col text-left">
             <span className="text-[10px] uppercase opacity-60 leading-none">{session.role}</span>
             <span className="text-xs font-bold uppercase tracking-wider">{session.name}</span>
          </div>
          <button onClick={() => setSession({ role: 'guest' })} className="ml-2 p-1.5 bg-white/10 hover:bg-white/20 rounded-full transition-colors">
            <LogOut size={16}/>
          </button>
        </div>
      )}

      <main>
        <section id="inicio" className="relative h-screen w-full overflow-hidden flex items-center justify-center print:hidden">
          <div className="absolute inset-0 bg-cover bg-center z-0 scale-105" style={{ backgroundImage: `url('${content.hero.bgImage}')` }}>
            <div className="absolute inset-0 bg-gradient-to-b from-stone-900/60 via-transparent to-stone-900/70"></div>
          </div>
          <div className="relative z-10 text-center px-4 max-w-4xl">
            <h2 className="text-amber-400 font-medium tracking-[0.4em] uppercase mb-4 animate-fade-in text-sm md:text-base">
              <EditableText isAdmin={isAdmin} value={content.hero.subtitle} onSave={(val) => updateContent('hero', 'subtitle', val)} />
            </h2>
            <h1 className="text-6xl md:text-8xl font-serif text-white font-bold mb-6 drop-shadow-2xl leading-none">
              <EditableText isAdmin={isAdmin} value={content.hero.title} onSave={(val) => updateContent('hero', 'title', val)} />
            </h1>
            <p className="text-xl md:text-2xl text-stone-200 mb-10 max-w-2xl mx-auto leading-relaxed font-light drop-shadow-md">
              <EditableText isAdmin={isAdmin} value={content.hero.description} onSave={(val) => updateContent('hero', 'description', val)} type="textarea" />
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              <a href="#historia" className="px-10 py-4 bg-amber-600 text-white font-bold rounded-full transition-all shadow-xl hover:bg-amber-500">Nuestra Historia</a>
              <a href="#inscripciones" className="px-10 py-4 bg-white/10 backdrop-blur-md text-white font-bold border border-white/20 rounded-full transition-all hover:bg-white/20">Portal Carretas</a>
            </div>
          </div>
        </section>

        <section className="print:hidden">
          <History isAdmin={isAdmin} content={content} updateContent={updateContent} />
        </section>
        
        <Inscripciones isAdmin={isAdmin} onLogin={setSession} session={session} />

        <section id="santuario" className="py-32 bg-stone-50 overflow-hidden print:hidden">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col lg:flex-row items-center gap-20">
              <div className="lg:w-1/2">
                <h2 className="text-5xl font-serif font-bold text-stone-900 mb-8">
                  <EditableText isAdmin={isAdmin} value={content.santuario.title} onSave={(val) => updateContent('santuario', 'title', val)} />
                </h2>
                <p className="text-stone-600 text-xl leading-relaxed mb-8 font-light">
                  <EditableText isAdmin={isAdmin} value={content.santuario.description} onSave={(val) => updateContent('santuario', 'description', val)} type="textarea" />
                </p>
                <div className="bg-amber-900 text-amber-100 p-8 rounded-2xl shadow-2xl">
                  <p className="italic text-lg leading-relaxed">
                    <EditableText isAdmin={isAdmin} value={content.santuario.quote} onSave={(val) => updateContent('santuario', 'quote', val)} type="textarea" />
                  </p>
                </div>
              </div>
              <div className="lg:w-1/2 relative">
                <EditableImage isAdmin={isAdmin} src={content.santuario.image} onSave={(val) => updateContent('santuario', 'image', val)} className="rounded-2xl shadow-2xl w-full object-cover h-[700px]" />
              </div>
            </div>
          </div>
        </section>

        <div className="print:hidden">
          <GeminiAssistant />
          <Gallery />
          <Events />
        </div>
      </main>
      <div className="print:hidden"><Footer /></div>
    </div>
  );
};

export default App;
