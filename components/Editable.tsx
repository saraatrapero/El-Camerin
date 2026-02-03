
import React, { useState } from 'react';
import { Edit2, Check, X, Image as ImageIcon } from 'lucide-react';

interface EditableTextProps {
  value: string;
  onSave: (val: string) => void;
  className?: string;
  isAdmin: boolean;
  type?: 'text' | 'textarea';
}

export const EditableText: React.FC<EditableTextProps> = ({ value, onSave, className, isAdmin, type = 'text' }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [tempValue, setTempValue] = useState(value);

  if (!isAdmin) return <span className={className}>{value}</span>;

  if (isEditing) {
    return (
      <div className="relative group">
        {type === 'text' ? (
          <input 
            type="text" 
            value={tempValue} 
            onChange={(e) => setTempValue(e.target.value)}
            className={`w-full p-2 border-2 border-amber-500 rounded bg-white text-stone-900 ${className}`}
            autoFocus
          />
        ) : (
          <textarea 
            value={tempValue} 
            onChange={(e) => setTempValue(e.target.value)}
            className={`w-full p-2 border-2 border-amber-500 rounded bg-white text-stone-900 min-h-[100px] ${className}`}
            autoFocus
          />
        )}
        <div className="flex gap-2 mt-2">
          <button onClick={() => { onSave(tempValue); setIsEditing(false); }} className="bg-green-500 text-white p-1 rounded"><Check size={16}/></button>
          <button onClick={() => { setTempValue(value); setIsEditing(false); }} className="bg-red-500 text-white p-1 rounded"><X size={16}/></button>
        </div>
      </div>
    );
  }

  return (
    <div className="relative group inline-block">
      <span className={className}>{value}</span>
      <button 
        onClick={() => setIsEditing(true)}
        className="absolute -top-4 -right-4 opacity-0 group-hover:opacity-100 bg-amber-600 text-white p-1.5 rounded-full shadow-lg transition-all"
      >
        <Edit2 size={12} />
      </button>
    </div>
  );
};

interface EditableImageProps {
  src: string;
  onSave: (src: string) => void;
  className?: string;
  isAdmin: boolean;
  alt?: string;
}

export const EditableImage: React.FC<EditableImageProps> = ({ src, onSave, className, isAdmin, alt }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [tempSrc, setTempSrc] = useState(src);

  if (!isAdmin) return <img src={src} className={className} alt={alt} />;

  return (
    <div className="relative group">
      <img src={src} className={className} alt={alt} />
      <button 
        onClick={() => setIsEditing(true)}
        className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 bg-amber-600 text-white p-3 rounded-full shadow-xl transition-all z-20"
      >
        <ImageIcon size={20} />
      </button>

      {isEditing && (
        <div className="fixed inset-0 bg-black/80 z-[100] flex items-center justify-center p-4">
          <div className="bg-white p-8 rounded-2xl w-full max-w-lg">
            <h3 className="text-2xl font-serif font-bold mb-4">Cambiar Imagen (URL)</h3>
            <input 
              type="text" 
              value={tempSrc} 
              onChange={(e) => setTempSrc(e.target.value)}
              className="w-full p-3 border border-stone-300 rounded-lg mb-6"
              placeholder="https://images.unsplash.com/..."
            />
            <div className="flex justify-end gap-4">
              <button onClick={() => setIsEditing(false)} className="px-6 py-2 text-stone-600">Cancelar</button>
              <button onClick={() => { onSave(tempSrc); setIsEditing(false); }} className="px-6 py-2 bg-amber-600 text-white rounded-lg font-bold">Guardar</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
