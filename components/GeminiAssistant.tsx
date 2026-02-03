
import React, { useState, useRef, useEffect } from 'react';
import { Send, User, Bot, Sparkles, Loader2 } from 'lucide-react';
import { getAssistantResponse } from '../services/geminiService';
import { ChatMessage } from '../types';

const GeminiAssistant: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: 'assistant', content: '¡Hola! Soy tu guía virtual del Santuario. ¿Qué te gustaría saber sobre la Virgen de la Cabeza o su romería?' }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isLoading]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMsg = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', content: userMsg }]);
    setIsLoading(true);

    const response = await getAssistantResponse(userMsg);
    
    setMessages(prev => [...prev, { role: 'assistant', content: response }]);
    setIsLoading(false);
  };

  return (
    <section id="assistant" className="py-24 bg-stone-50">
      <div className="max-w-4xl mx-auto px-4">
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center p-2 bg-amber-100 rounded-full text-amber-700 mb-4">
            <Sparkles size={20} className="mr-2" />
            <span className="text-sm font-bold uppercase tracking-wider">Inteligencia Artificial</span>
          </div>
          <h2 className="text-4xl font-serif font-bold text-stone-800">Guía del Peregrino Virtual</h2>
          <p className="text-stone-600 mt-4">Resuelve tus dudas sobre historia, accesos, fechas y rituales de la Morenita.</p>
        </div>

        <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-stone-200 flex flex-col h-[600px]">
          {/* Chat Messages */}
          <div 
            ref={scrollRef}
            className="flex-1 overflow-y-auto p-6 space-y-6"
          >
            {messages.map((msg, i) => (
              <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`flex max-w-[85%] ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                  <div className={`flex-shrink-0 h-10 w-10 rounded-full flex items-center justify-center ${
                    msg.role === 'user' ? 'bg-amber-600 text-white ml-3' : 'bg-stone-200 text-stone-600 mr-3'
                  }`}>
                    {msg.role === 'user' ? <User size={20} /> : <Bot size={20} />}
                  </div>
                  <div className={`p-4 rounded-2xl text-sm leading-relaxed ${
                    msg.role === 'user' 
                      ? 'bg-amber-600 text-white rounded-tr-none shadow-md' 
                      : 'bg-stone-100 text-stone-800 rounded-tl-none'
                  }`}>
                    {msg.content}
                  </div>
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="flex items-center bg-stone-100 p-4 rounded-2xl rounded-tl-none">
                  <Loader2 className="animate-spin text-amber-600 mr-2" size={18} />
                  <span className="text-sm text-stone-500 italic">El guía está escribiendo...</span>
                </div>
              </div>
            )}
          </div>

          {/* Input Area */}
          <div className="p-4 border-t border-stone-100 bg-stone-50">
            <form 
              onSubmit={(e) => { e.preventDefault(); handleSend(); }}
              className="flex gap-2"
            >
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Pregunta algo: ¿Cuándo es la romería?..."
                className="flex-1 px-4 py-3 rounded-xl border border-stone-300 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all"
                disabled={isLoading}
              />
              <button
                type="submit"
                disabled={isLoading || !input.trim()}
                className="bg-amber-600 hover:bg-amber-700 disabled:opacity-50 disabled:hover:bg-amber-600 text-white p-3 rounded-xl shadow-lg transition-all"
              >
                <Send size={20} />
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default GeminiAssistant;
