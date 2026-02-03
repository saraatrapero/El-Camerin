
import React, { useRef, useState, useEffect } from 'react';
import { Eraser, Check, X } from 'lucide-react';

interface SignaturePadProps {
  onSave: (signature: string) => void;
  onCancel: () => void;
  userName: string;
}

const SignaturePad: React.FC<SignaturePadProps> = ({ onSave, onCancel, userName }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.strokeStyle = '#1c1917';
    ctx.lineWidth = 3;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
  }, []);

  const getPos = (e: React.MouseEvent | React.TouchEvent) => {
    const canvas = canvasRef.current;
    if (!canvas) return { x: 0, y: 0 };
    const rect = canvas.getBoundingClientRect();
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;
    return {
      x: clientX - rect.left,
      y: clientY - rect.top
    };
  };

  const startDrawing = (e: React.MouseEvent | React.TouchEvent) => {
    const { x, y } = getPos(e);
    const ctx = canvasRef.current?.getContext('2d');
    if (ctx) {
      ctx.beginPath();
      ctx.moveTo(x, y);
      setIsDrawing(true);
    }
  };

  const draw = (e: React.MouseEvent | React.TouchEvent) => {
    if (!isDrawing) return;
    const { x, y } = getPos(e);
    const ctx = canvasRef.current?.getContext('2d');
    if (ctx) {
      ctx.lineTo(x, y);
      ctx.stroke();
    }
    e.preventDefault();
  };

  const stopDrawing = () => {
    setIsDrawing(false);
  };

  const clear = () => {
    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext('2d');
      ctx?.clearRect(0, 0, canvas.width, canvas.height);
    }
  };

  const save = () => {
    const canvas = canvasRef.current;
    if (canvas) {
      const dataUrl = canvas.toDataURL('image/png');
      onSave(dataUrl);
    }
  };

  return (
    <div className="fixed inset-0 bg-stone-900/90 z-[200] flex items-center justify-center p-4 backdrop-blur-sm">
      <div className="bg-white w-full max-w-lg rounded-3xl shadow-2xl overflow-hidden">
        <div className="p-6 bg-stone-50 border-b flex justify-between items-center">
          <div>
            <h3 className="font-serif font-bold text-xl">Firma Digital</h3>
            <p className="text-xs text-stone-500 uppercase font-bold">{userName}</p>
          </div>
          <button onClick={onCancel} className="text-stone-400 hover:text-stone-600"><X size={24}/></button>
        </div>
        
        <div className="p-6">
          <p className="text-sm text-stone-600 mb-4">Dibuja tu firma en el recuadro inferior utilizando tu dedo o un puntero.</p>
          <canvas
            ref={canvasRef}
            width={400}
            height={200}
            className="w-full h-48 border-2 border-dashed border-stone-200 bg-stone-50 rounded-xl cursor-crosshair touch-none"
            onMouseDown={startDrawing}
            onMouseMove={draw}
            onMouseUp={stopDrawing}
            onMouseLeave={stopDrawing}
            onTouchStart={startDrawing}
            onTouchMove={draw}
            onTouchEnd={stopDrawing}
          />
          
          <div className="grid grid-cols-2 gap-4 mt-6">
            <button 
              onClick={clear}
              className="flex items-center justify-center py-3 border-2 border-stone-200 rounded-xl font-bold text-stone-600 hover:bg-stone-50 transition-all"
            >
              <Eraser size={18} className="mr-2" /> Borrar
            </button>
            <button 
              onClick={save}
              className="flex items-center justify-center py-3 bg-amber-600 text-white rounded-xl font-bold shadow-lg shadow-amber-600/30 hover:bg-amber-700 transition-all"
            >
              <Check size={18} className="mr-2" /> Confirmar Firma
            </button>
          </div>
        </div>
        <div className="p-4 bg-amber-50 text-center">
          <p className="text-[10px] text-amber-700 font-bold uppercase tracking-widest">Documento con validez interna para la Federación</p>
        </div>
      </div>
    </div>
  );
};

export default SignaturePad;
