'use client';
import { useState, useEffect } from 'react';

import Image from 'next/image';

const aquecimentos = [
  { id: 1, title: 'Rotação de tornozelo', desc: 'Gire o tornozelo 10x para cada lado, soltando a articulação. Essencial para evitar torções.', img: '/images/warmup_ankle_1783642481202.png' },
  { id: 2, title: 'Balanço Frontal', desc: 'Apoie-se na parede e balance a perna para frente e para trás para soltar o quadril.', img: '/images/warmup_legswing_forward_1783642490351.png' },
  { id: 3, title: 'Balanço Lateral', desc: 'De frente para a parede, balance a perna de um lado para o outro. Libera a tensão.', img: '/images/warmup_legswing_side_1783642497965.png' },
  { id: 4, title: 'Agachamento Livre', desc: '10 agachamentos com peso corporal. Acorda os glúteos e coxas para o impacto.', img: '/images/warmup_squat_1783642504326.png' },
  { id: 5, title: 'Elevação de Joelhos', desc: 'Corridinha no lugar erguendo bem os joelhos para ativar o sistema cardiovascular.', img: '/images/warmup_highknees_1783642511215.png' },
];

export default function AquecimentoPage() {
  const [activeTimer, setActiveTimer] = useState<number | null>(null);
  const [timeLeft, setTimeLeft] = useState(30);
  const [completed, setCompleted] = useState<number[]>([]);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (activeTimer !== null && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (timeLeft === 0 && activeTimer !== null) {
      setCompleted((prev) => [...prev, activeTimer]);
      setActiveTimer(null);
    }
    return () => clearInterval(interval);
  }, [activeTimer, timeLeft]);

  const startTimer = (id: number) => {
    if (activeTimer === id) {
      // Pause/Stop
      setActiveTimer(null);
    } else {
      setActiveTimer(id);
      setTimeLeft(30);
    }
  };

  const totalCompleted = completed.length;
  const progressPercent = (totalCompleted / aquecimentos.length) * 100;

  return (
    <div className="space-y-6 pb-24">
      <div>
        <p className="text-xs text-gray-500 tracking-wider mb-1 uppercase font-bold">Antes de Correr</p>
        <h1 className="text-2xl font-bold text-white mb-1">Aquecimento dinâmico</h1>
        <p className="text-gray-400 text-sm">Prepare as articulações. Nunca pule esta etapa.</p>
      </div>

      <div className="space-y-4">
        {aquecimentos.map((item) => {
          const isCompleted = completed.includes(item.id);
          const isActive = activeTimer === item.id;

          return (
            <div 
              key={item.id} 
              className={`rounded-2xl p-4 transition-all duration-300 border ${
                isActive 
                  ? 'bg-[#1a2b4c] border-blue-800 shadow-[0_0_15px_rgba(37,99,235,0.2)]' 
                  : 'bg-[#242426] border-[#333]'
              }`}
            >
              {/* Image Box */}
              <div className="w-full h-56 bg-[#1a1a1a] rounded-xl mb-4 relative overflow-hidden">
                <Image 
                  src={item.img} 
                  alt={item.title} 
                  fill 
                  className="object-cover"
                />
              </div>

              <div className="flex justify-between items-start mb-2">
                <div>
                  <h3 className="text-white font-bold text-lg">{item.title}</h3>
                  <p className="text-gray-400 text-sm mt-1">{item.desc}</p>
                </div>
                {isCompleted && (
                  <span className="bg-[#10b981]/20 text-[#10b981] text-xs px-2 py-1 rounded-md font-semibold shrink-0 mt-1">Feito</span>
                )}
                {isActive && !isCompleted && (
                  <span className="bg-blue-600 text-blue-100 text-xs px-2 py-1 rounded-md font-semibold shrink-0 mt-1">Agora</span>
                )}
              </div>

              {!isCompleted && (
                <button
                  onClick={() => startTimer(item.id)}
                  className={`w-full py-3 mt-3 rounded-xl font-bold transition-all ${
                    isActive
                      ? 'bg-red-900/40 text-red-400 border border-red-900/50 hover:bg-red-900/60'
                      : 'bg-[#c66035] text-white hover:bg-[#b0532d]'
                  }`}
                >
                  {isActive ? `Parar (${timeLeft}s)` : '⏱ Iniciar 30s'}
                </button>
              )}
            </div>
          );
        })}
      </div>


    </div>
  );
}
