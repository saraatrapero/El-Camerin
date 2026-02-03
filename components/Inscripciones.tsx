
import React, { useState, useEffect } from 'react';
import { Save, Users, Trash2, ClipboardCheck, User, Truck, Lock, LogIn, FileText, Printer, Smartphone, Download, Upload, Share2, FileSpreadsheet } from 'lucide-react';
import { InscripcionCarreta, Persona, AuthSession } from '../types';
import DocumentosOficiales from './DocumentosOficiales';
import SignaturePad from './SignaturePad';

interface InscripcionesProps {
  isAdmin: boolean;
  onLogin: (session: AuthSession) => void;
  session: AuthSession;
}

const Inscripciones: React.FC<InscripcionesProps> = ({ isAdmin, onLogin, session }) => {
  const [activeTab, setActiveTab] = useState<'carretas' | 'socios' | 'caballistas' | 'login' | 'dashboard' | 'docs'>('carretas');
  
  const [carretas, setCarretas] = useState<InscripcionCarreta[]>(() => {
    try {
      const stored = localStorage.getItem('romeria_carretas');
      return stored ? JSON.parse(stored) : [];
    } catch (e) { return []; }
  });

  const [personas, setPersonas] = useState<Persona[]>(() => {
    try {
      const stored = localStorage.getItem('romeria_personas');
      return stored ? JSON.parse(stored) : [];
    } catch (e) { return []; }
  });
  
  const [signingPersonaId, setSigningPersonaId] = useState<string | null>(null);

  const [loginForm, setLoginForm] = useState({ name: '', password: '' });
  const [loginError, setLoginError] = useState('');
  const [formCarreta, setFormCarreta] = useState({ nombreCarreta: '', presidente: '', jefeCarreta: '', mail: '', direccion: '', password: '' });
  const [formPersona, setFormPersona] = useState({ nombre: '', dni: '', fechaNacimiento: '', tlf: '', email: '', password: '' });

  useEffect(() => {
    localStorage.setItem('romeria_carretas', JSON.stringify(carretas));
  }, [carretas]);

  useEffect(() => {
    localStorage.setItem('romeria_personas', JSON.stringify(personas));
  }, [personas]);

  useEffect(() => {
    const syncData = (e: StorageEvent) => {
      if (e.key === 'romeria_personas' && e.newValue) setPersonas(JSON.parse(e.newValue));
      if (e.key === 'romeria_carretas' && e.newValue) setCarretas(JSON.parse(e.newValue));
    };
    window.addEventListener('storage', syncData);
    return () => window.removeEventListener('storage', syncData);
  }, []);

  useEffect(() => {
    if (session.role === 'carreta') setActiveTab('dashboard');
  }, [session.role]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError('');

    if (loginForm.name === 'admin' && loginForm.password === 'admin123') {
      onLogin({ role: 'admin', name: 'Administrador' });
      setActiveTab('carretas');
      return;
    }

    const carretaMatch = carretas.find(c => c.nombreCarreta === loginForm.name && c.password === loginForm.password);
    if (carretaMatch) {
      onLogin({ role: 'carreta', name: carretaMatch.nombreCarreta, id: carretaMatch.id, data: carretaMatch });
      setActiveTab('dashboard');
      return;
    }
    setLoginError('Credenciales incorrectas');
  };

  const handleSaveSignature = (signature: string) => {
    if (!signingPersonaId) return;
    const updatedPersonas = personas.map(p => p.id === signingPersonaId ? { ...p, signature } : p);
    setPersonas(updatedPersonas);
    setSigningPersonaId(null);
  };

  const handleAddCarreta = (e: React.FormEvent) => {
    e.preventDefault();
    const nueva: InscripcionCarreta = { ...formCarreta, id: crypto.randomUUID(), fechaRegistro: new Date().toLocaleDateString() };
    setCarretas(prev => [...prev, nueva]);
    setFormCarreta({ nombreCarreta: '', presidente: '', jefeCarreta: '', mail: '', direccion: '', password: '' });
    alert('¡Carreta registrada!');
  };

  const handleAddPersona = (e: React.FormEvent, tipo: 'socio' | 'caballista') => {
    e.preventDefault();
    const nueva: Persona = {
      ...formPersona,
      id: crypto.randomUUID(),
      tipo,
      fechaRegistro: new Date().toLocaleDateString(),
      carretaId: session.role === 'carreta' ? session.id : undefined
    };
    setPersonas(prev => [...prev, nueva]);
    setFormPersona({ nombre: '', dni: '', fechaNacimiento: '', tlf: '', email: '', password: '' });
  };

  const deletePersona = (id: string) => {
    if (confirm('¿Seguro que quieres eliminar este registro?')) {
      setPersonas(personas.filter(p => p.id !== id));
    }
  };

  const sendSignatureToMobile = (persona: Persona) => {
    const baseUrl = window.location.origin + window.location.pathname;
    const signatureUrl = `${baseUrl}?mode=sign&pid=${persona.id}&pname=${encodeURIComponent(persona.nombre)}`;
    const message = `Hola ${persona.nombre}, abre este enlace para firmar digitalmente tu inscripción en la carreta ${session.name}: ${signatureUrl}`;
    const whatsappUrl = `https://wa.me/${persona.tlf.replace(/\s+/g, '')}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  const handleDocSignature = (personaId: string, method: 'local' | 'mobile') => {
    const persona = personas.find(p => p.id === personaId);
    if (!persona) return;

    if (method === 'local') {
      setSigningPersonaId(personaId);
    } else {
      sendSignatureToMobile(persona);
    }
  };

  const exportData = () => {
    const dataToExport = {
      carretas: isAdmin ? carretas : carretas.filter(c => c.id === session.id),
      personas: isAdmin ? personas : personas.filter(p => p.carretaId === session.id)
    };
    const blob = new Blob([JSON.stringify(dataToExport, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `romeria_datos_${session.name || 'backup'}.json`;
    a.click();
  };

  const downloadExcelTemplate = () => {
    const headers = ["Nombre", "DNI", "Fecha_Nacimiento", "Telefono", "Email"];
    const csvContent = "\uFEFF" + headers.join(",") + "\n" + 
      "Juan Perez,12345678Z,1990-05-15,+34600000000,juan@ejemplo.com\n" +
      "Maria Garcia,87654321X,1985-10-20,+34611223344,maria@ejemplo.com";
    
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", "plantilla_personas_romeria.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const importData = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    
    const reader = new FileReader();
    reader.onload = (event) => {
      const content = event.target?.result as string;
      if (file.name.endsWith('.csv')) {
        try {
          const lines = content.split('\n');
          const newPersonas: Persona[] = [];
          for (let i = 1; i < lines.length; i++) {
            const line = lines[i].trim();
            if (!line) continue;
            const [nombre, dni, fechaNac, tlf, email] = line.split(',');
            if (nombre && dni) {
              newPersonas.push({
                id: crypto.randomUUID(),
                fechaRegistro: new Date().toLocaleDateString(),
                tipo: 'socio',
                nombre: nombre.trim(),
                dni: dni.trim(),
                fechaNacimiento: fechaNac?.trim() || '',
                tlf: tlf?.trim() || '',
                email: email?.trim() || '',
                carretaId: session.role === 'carreta' ? session.id : undefined
              });
            }
          }
          setPersonas(prev => [...prev, ...newPersonas]);
          alert(`Importados ${newPersonas.length} registros.`);
        } catch (err) {
          alert('Error en el CSV.');
        }
      } else {
        try {
          const imported = JSON.parse(content);
          if (imported.carretas && isAdmin) setCarretas(prev => [...prev, ...imported.carretas]);
          if (imported.personas) setPersonas(prev => [...prev, ...imported.personas]);
          alert('JSON importado.');
        } catch (err) {
          alert('JSON no válido.');
        }
      }
    };
    reader.readAsText(file);
  };

  const filteredPersonas = isAdmin 
    ? personas 
    : session.role === 'carreta' 
      ? personas.filter(p => p.carretaId === session.id)
      : [];

  const signingUser = personas.find(p => p.id === signingPersonaId);

  return (
    <section id="inscripciones" className="py-24 bg-stone-100 min-h-screen">
      {signingPersonaId && signingUser && (
        <SignaturePad 
          userName={signingUser.nombre}
          onCancel={() => setSigningPersonaId(null)}
          onSave={handleSaveSignature}
        />
      )}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 print:hidden">
          <div className="inline-block p-2 bg-amber-600 text-white rounded-lg mb-4 text-xs font-bold uppercase tracking-widest">
            {session.role === 'carreta' ? 'Panel de Carreta' : 'Portal de Inscripción'}
          </div>
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-stone-900 mt-2">
            {session.role === 'carreta' ? `Gestión: ${session.name}` : 'Acceso y Registro'}
          </h2>
        </div>

        <div className="flex flex-wrap justify-center gap-4 mb-12 print:hidden">
          {session.role === 'guest' ? (
            <>
              <button onClick={() => setActiveTab('login')} className={`tab-btn ${activeTab === 'login' ? 'active-black' : ''}`}>
                <LogIn size={20} className="mr-2" /> Iniciar Sesión
              </button>
              <button onClick={() => setActiveTab('carretas')} className={`tab-btn ${activeTab === 'carretas' ? 'active-amber' : ''}`}>
                <Truck size={20} className="mr-2" /> Nueva Carreta
              </button>
            </>
          ) : (
            <div className="flex flex-col items-center gap-4 w-full">
              <div className="flex flex-wrap justify-center gap-4">
                <button onClick={() => setActiveTab('dashboard')} className={`tab-btn ${activeTab === 'dashboard' ? 'active-amber' : ''}`}>
                  <Users size={20} className="mr-2" /> Integrantes
                </button>
                <button onClick={() => setActiveTab('docs')} className={`tab-btn ${activeTab === 'docs' ? 'active-black' : ''}`}>
                  <FileText size={20} className="mr-2" /> Documentos y Firmas
                </button>
                <div className="flex gap-2">
                  <button onClick={exportData} title="Copia JSON" className="p-3 bg-white border border-stone-200 rounded-full text-stone-600 hover:bg-amber-50">
                    <Download size={20} />
                  </button>
                  <label className="p-3 bg-white border border-stone-200 rounded-full text-stone-600 hover:bg-amber-50 cursor-pointer">
                    <Upload size={20} />
                    <input type="file" className="hidden" accept=".json,.csv" onChange={importData} />
                  </label>
                </div>
              </div>
              <button onClick={downloadExcelTemplate} className="text-xs text-amber-700 font-bold underline flex items-center">
                <FileSpreadsheet size={14} className="mr-1" /> Descargar Plantilla Excel
              </button>
            </div>
          )}
        </div>

        {activeTab === 'dashboard' && session.role !== 'guest' ? (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 animate-fade-in">
            {session.role === 'carreta' && (
              <div className="lg:col-span-1">
                <div className="bg-white p-8 rounded-2xl shadow-xl border border-stone-200 sticky top-24">
                  <h3 className="text-xl font-serif font-bold mb-6">Nuevo Integrante</h3>
                  <form onSubmit={(e) => handleAddPersona(e, 'socio')} className="space-y-4">
                    <input required type="text" placeholder="Nombre completo" value={formPersona.nombre} onChange={e => setFormPersona({...formPersona, nombre: e.target.value})} className="input-form" />
                    <div className="grid grid-cols-2 gap-4">
                      <input required type="text" placeholder="DNI" value={formPersona.dni} onChange={e => setFormPersona({...formPersona, dni: e.target.value})} className="input-form" />
                      <input required type="date" value={formPersona.fechaNacimiento} onChange={e => setFormPersona({...formPersona, fechaNacimiento: e.target.value})} className="input-form" />
                    </div>
                    <input required type="tel" placeholder="Móvil (ej: +34...)" value={formPersona.tlf} onChange={e => setFormPersona({...formPersona, tlf: e.target.value})} className="input-form" />
                    <input required type="email" placeholder="Email" value={formPersona.email} onChange={e => setFormPersona({...formPersona, email: e.target.value})} className="input-form" />
                    <button type="submit" className="w-full bg-amber-600 text-white font-bold py-3 rounded-xl shadow-lg">Guardar Socio</button>
                  </form>
                </div>
              </div>
            )}
            <div className={session.role === 'carreta' ? 'lg:col-span-2' : 'lg:col-span-3'}>
              <div className="bg-white rounded-2xl shadow-xl border border-stone-200 overflow-hidden">
                <div className="p-6 bg-stone-50 border-b flex justify-between items-center">
                  <h3 className="font-serif font-bold text-xl">Listado de Integrantes</h3>
                  <span className="px-3 py-1 bg-amber-100 text-amber-700 rounded-full text-xs font-bold">{filteredPersonas.length}</span>
                </div>
                <div className="divide-y divide-stone-100">
                  {filteredPersonas.length === 0 ? <p className="p-10 text-center text-stone-400">Sin registros.</p> : filteredPersonas.map(p => (
                    <div key={p.id} className="p-6 flex justify-between items-center hover:bg-stone-50">
                      <div>
                        <p className="font-bold text-stone-800 uppercase">{p.nombre}</p>
                        <p className="text-xs text-stone-400">{p.signature ? '✓ FIRMADO' : '⌛ PENDIENTE'}</p>
                      </div>
                      <div className="flex gap-2">
                        <button onClick={() => sendSignatureToMobile(p)} className="p-2 text-green-600 hover:bg-green-50 rounded-lg"><Smartphone size={18} /></button>
                        <button onClick={() => setSigningPersonaId(p.id)} className="p-2 text-amber-600 hover:bg-amber-50 rounded-lg"><FileCheck size={18} /></button>
                        <button onClick={() => deletePersona(p.id)} className="p-2 text-red-300 hover:text-red-500"><Trash2 size={18} /></button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ) : activeTab === 'docs' ? (
          <div className="animate-fade-in">
            <div className="flex justify-between items-center mb-8 print:hidden">
              <h3 className="text-2xl font-serif font-bold">Documentos Oficiales</h3>
              <button onClick={() => window.print()} className="px-6 py-3 bg-stone-900 text-white rounded-xl font-bold shadow-xl flex items-center">
                <Printer size={20} className="mr-2" /> Imprimir Documentación Completa
              </button>
            </div>
            <DocumentosOficiales 
              carreta={isAdmin ? { nombreCarreta: 'ADMINISTRACIÓN', presidente: 'Admin', jefeCarreta: 'Admin' } as any : session.data} 
              integrantes={filteredPersonas} 
              onInitiateSignature={handleDocSignature}
            />
          </div>
        ) : activeTab === 'login' ? (
          <div className="max-w-md mx-auto animate-fade-in bg-white p-10 rounded-3xl shadow-2xl">
            <h3 className="text-2xl font-serif font-bold text-center mb-8">Acceso Carretas</h3>
            <form onSubmit={handleLogin} className="space-y-6">
              <input required type="text" placeholder="Nombre Carreta" value={loginForm.name} onChange={e => setLoginForm({...loginForm, name: e.target.value})} className="input-form" />
              <input required type="password" placeholder="Contraseña" value={loginForm.password} onChange={e => setLoginForm({...loginForm, password: e.target.value})} className="input-form" />
              {loginError && <p className="text-red-500 text-xs text-center">{loginError}</p>}
              <button type="submit" className="w-full bg-stone-900 text-white font-bold py-4 rounded-xl">Entrar</button>
            </form>
          </div>
        ) : activeTab === 'carretas' ? (
          <div className="max-w-3xl mx-auto animate-fade-in bg-white p-10 rounded-3xl shadow-2xl">
            <h3 className="text-2xl font-serif font-bold mb-8">Nueva Carreta</h3>
            <form onSubmit={handleAddCarreta} className="space-y-6">
              <input required type="text" placeholder="Nombre Carreta" value={formCarreta.nombreCarreta} onChange={e => setFormCarreta({...formCarreta, nombreCarreta: e.target.value})} className="input-form" />
              <div className="grid grid-cols-2 gap-6">
                <input required type="text" placeholder="Presidente" value={formCarreta.presidente} onChange={e => setFormCarreta({...formCarreta, presidente: e.target.value})} className="input-form" />
                <input required type="text" placeholder="Jefe de Carreta" value={formCarreta.jefeCarreta} onChange={e => setFormCarreta({...formCarreta, jefeCarreta: e.target.value})} className="input-form" />
              </div>
              <input required type="password" placeholder="Establecer Contraseña" value={formCarreta.password} onChange={e => setFormCarreta({...formCarreta, password: e.target.value})} className="input-form bg-amber-50" />
              <button type="submit" className="w-full bg-amber-600 text-white font-bold py-4 rounded-xl">Crear Carreta</button>
            </form>
          </div>
        ) : null}
      </div>

      <style>{`
        .tab-btn { display: flex; align-items: center; padding: 0.75rem 1.5rem; border-radius: 9999px; font-weight: 700; background: white; transition: all 0.2s; box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1); }
        .active-amber { background: #d97706; color: white; }
        .active-black { background: #1c1917; color: white; }
        .input-form { width: 100%; padding: 0.75rem 1rem; border: 1px solid #e7e5e4; border-radius: 0.75rem; outline: none; transition: border-color 0.2s; }
        .input-form:focus { border-color: #d97706; }
        @media print { .print\\:hidden { display: none !important; } }
      `}</style>
    </section>
  );
};

export default Inscripciones;
