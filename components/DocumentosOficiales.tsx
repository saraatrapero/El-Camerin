
import React from 'react';
import { InscripcionCarreta, Persona } from '../types';
import { Smartphone, CheckCircle, QrCode, ShieldAlert, FileCheck } from 'lucide-react';

interface DocumentosProps {
  carreta: InscripcionCarreta;
  integrantes: Persona[];
  onInitiateSignature: (personaId: string, method: 'local' | 'mobile') => void;
}

const DocumentosOficiales: React.FC<DocumentosProps> = ({ carreta, integrantes, onInitiateSignature }) => {
  const fechaHoy = new Date().toLocaleDateString('es-ES', { day: 'numeric', month: 'long', year: 'numeric' });
  const year = new Date().getFullYear();

  return (
    <div className="space-y-20 p-8 bg-white text-stone-900 print:p-0 print:space-y-0">
      
      {/* 1. CESIÓN DE DATOS */}
      <div className="max-w-4xl mx-auto border-2 border-stone-200 p-12 bg-white shadow-sm print:shadow-none print:border-none print:break-after-page">
        <h1 className="text-center font-bold text-xl mb-8 uppercase underline decoration-amber-600">Cesión de Datos y Privacidad</h1>
        <div className="text-sm space-y-4 text-justify leading-relaxed mb-10">
          <p>Los datos personales recogidos en la documentación aportada y todos aquellos facilitados por los abajo firmantes, han sido incorporados en un fichero que la Federación de Peñas Romeras y Marianas El Camarín mantiene con la finalidad de gestionar la relación con la Federación.</p>
          <p>Así mismo, sus datos personales son cedidos a las Administraciones Públicas, cuerpos de seguridad y entidades que presten servicios a La Federación de Peñas en el marco de la celebración de la Romería {year}.</p>
        </div>

        <table className="w-full border-collapse border border-stone-300 text-xs mb-8">
          <thead className="bg-stone-100">
            <tr>
              <th className="border border-stone-300 p-2 w-10">Nº</th>
              <th className="border border-stone-300 p-2">NOMBRE Y APELLIDOS</th>
              <th className="border border-stone-300 p-2">DNI</th>
              <th className="border border-stone-300 p-2 w-32">FIRMA DIGITAL</th>
            </tr>
          </thead>
          <tbody>
            {Array.from({ length: 15 }).map((_, i) => {
              const p = integrantes[i];
              return (
                <tr key={i} className="h-12">
                  <td className="border border-stone-300 p-2 text-center font-bold">{i + 1}</td>
                  <td className="border border-stone-300 p-2 uppercase font-medium">{p?.nombre || ''}</td>
                  <td className="border border-stone-300 p-2">{p?.dni || ''}</td>
                  <td className="border border-stone-300 p-1 text-center relative group">
                    {p?.signature ? (
                      <img src={p.signature} alt="Firma" className="max-h-10 mx-auto mix-blend-multiply" />
                    ) : p ? (
                      <div className="flex gap-1 justify-center print:hidden">
                        <button 
                          onClick={() => onInitiateSignature(p.id, 'mobile')}
                          className="p-1.5 bg-green-100 text-green-700 rounded-full hover:bg-green-200 transition-all"
                          title="Enviar al móvil del socio"
                        >
                          <Smartphone size={14} />
                        </button>
                        <button 
                          onClick={() => onInitiateSignature(p.id, 'local')}
                          className="p-1.5 bg-amber-100 text-amber-700 rounded-full hover:bg-amber-200 transition-all"
                          title="Firmar en esta pantalla"
                        >
                          <FileCheck size={14} />
                        </button>
                      </div>
                    ) : null}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>

        <div className="grid grid-cols-2 gap-8 text-sm mt-12 border-t pt-8">
          <p>Fdo. Presidente/a: <span className="font-bold border-b border-stone-400 min-w-[200px] inline-block">{carreta.presidente}</span></p>
          <p>Fdo. Jefe/a de carreta: <span className="font-bold border-b border-stone-400 min-w-[200px] inline-block">{carreta.jefeCarreta}</span></p>
        </div>
        <p className="text-center mt-8 text-sm italic">Lo firmo en Andújar a {fechaHoy}</p>
      </div>

      {/* 2. NORMAS DE RÉGIMEN INTERNO (Nueva) */}
      <div className="max-w-4xl mx-auto border-2 border-stone-200 p-12 bg-white shadow-sm print:shadow-none print:border-none print:break-after-page">
        <div className="flex items-center justify-center gap-4 mb-8">
          <ShieldAlert className="text-amber-600" size={32} />
          <h1 className="text-center font-bold text-xl uppercase underline decoration-amber-600">Normas de Régimen Interno</h1>
        </div>
        <div className="text-xs space-y-4 text-justify leading-relaxed mb-10">
          <p>Los integrantes de la carreta <strong>{carreta.nombreCarreta}</strong> se comprometen a:</p>
          <ul className="list-decimal pl-5 space-y-2">
            <li>Mantener el decoro y respeto absoluto hacia la imagen de la Virgen de la Cabeza y los demás peregrinos.</li>
            <li>Cumplir estrictamente los horarios de salida y entrada establecidos por la Cofradía Matriz y la Federación.</li>
            <li>Prohibición expresa de música no tradicional o que perturbe la naturaleza religiosa del acto durante los momentos de procesión y rezo.</li>
            <li>Mantenimiento de la limpieza en el Cerro y durante el camino, depositando residuos únicamente en los puntos habilitados.</li>
            <li>Seguir las indicaciones de los responsables de seguridad, protección civil y organización en todo momento.</li>
          </ul>
          <p className="font-bold mt-4">El incumplimiento de estas normas podrá suponer la expulsión inmediata de la carreta y la notificación a las autoridades pertinentes.</p>
        </div>

        <div className="grid grid-cols-2 gap-8 text-sm mt-12 border-t pt-8">
          <p className="text-center">Sello de la Carreta / Firma Presidente<br/><br/><br/>_______________________</p>
          <p className="text-center">Recibido por el Socio<br/><br/><br/>_______________________</p>
        </div>
      </div>

      {/* 3. DECLARACIÓN RESPONSABLE (Nueva) */}
      <div className="max-w-4xl mx-auto border-2 border-stone-200 p-12 bg-white shadow-sm print:shadow-none print:border-none print:break-after-page">
        <h1 className="text-center font-bold text-xl mb-8 uppercase underline decoration-amber-600">Declaración Responsable</h1>
        <div className="text-sm space-y-6 text-justify leading-relaxed">
          <p>D/Dña. <strong>{carreta.presidente}</strong>, en calidad de representante de la carreta {carreta.nombreCarreta}, DECLARA BAJO SU RESPONSABILIDAD:</p>
          <p>Que todos los integrantes relacionados en el listado adjunto han sido informados de las normas de seguridad y convivencia, y que la carreta cumple con los requisitos técnicos exigidos por la Federación para su circulación durante la Romería de {year}.</p>
          <p>Así mismo, manifiesta que la carreta dispone de los medios de extinción de incendios obligatorios y el seguro de responsabilidad civil vigente.</p>
        </div>
        <div className="mt-20 text-center">
          <p className="mb-20">Fdo. Responsable</p>
          <p className="font-bold">{carreta.presidente}</p>
          <p className="text-xs">DNI: __________________</p>
        </div>
      </div>

      {/* Instrucciones flotantes */}
      <div className="print:hidden fixed bottom-8 left-8 bg-white p-6 rounded-2xl shadow-2xl border-2 border-amber-500 animate-pulse max-w-xs z-50">
        <div className="flex items-center gap-4">
          <div className="bg-amber-100 p-3 rounded-xl text-amber-600">
            <QrCode size={32} />
          </div>
          <div>
            <p className="font-bold text-stone-800 text-sm">Gestión de Firmas</p>
            <p className="text-xs text-stone-500">Usa <Smartphone size={10} className="inline text-green-600"/> para enviar un WhatsApp al socio o <FileCheck size={10} className="inline text-amber-600"/> para firmar aquí mismo.</p>
          </div>
        </div>
      </div>

    </div>
  );
};

export default DocumentosOficiales;
