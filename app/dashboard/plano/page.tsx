'use client';
import { useState, useEffect } from 'react';
import { planoCompleto } from '@/lib/planoData';
import { useDashboard } from '@/components/DashboardProvider';

export default function PlanoPage() {
  const { treinosFeitos, toggleTreino, loading } = useDashboard();
  const [semanaAtiva, setSemanaAtiva] = useState(1);

  // Lógica de auto-expandir a semana correta
  useEffect(() => {
    if (loading) return; // Espera os dados do contexto carregarem
    
    // Descobre qual semana tem o primeiro treino pendente
    for (const semana of planoCompleto) {
      const todosFeitos = semana.treinos.every(t => treinosFeitos.includes(t.id));
      if (!todosFeitos) {
        setSemanaAtiva(semana.semana);
        break;
      }
      // Se todos estiverem feitos, vai tentar abrir a próxima.
      // Se for a última semana e estiver toda feita, ele manterá a última ativa (ou o break cuidará)
    }
  }, [treinosFeitos, loading]);

  if (loading) {
    return <div className="p-10 text-center text-gray-500 animate-pulse">Sincronizando plano...</div>;
  }

  // Quantas semanas faltam contando com a atual
  const semanasRestantes = 4 - semanaAtiva + 1;
  const textoSemanas = semanasRestantes === 1 ? 'Última semana' : `${semanasRestantes} semanas`;

  return (
    <div className="space-y-6 pb-24">
      <div>
        <p className="text-xs text-gray-500 tracking-wider mb-1 uppercase font-bold">Seu Plano</p>
        <h1 className="text-2xl font-bold text-white">{textoSemanas} até seus 5km</h1>
      </div>

      <div className="relative pt-4">
        {/* Vertical Line */}
        <div className="absolute left-[19px] top-4 bottom-0 w-[2px] bg-[#333]"></div>

        {planoCompleto.map((semanaInfo) => {
          const isActive = semanaAtiva === semanaInfo.semana;
          const todosFeitos = semanaInfo.treinos.every(t => treinosFeitos.includes(t.id));
          
          return (
            <div key={semanaInfo.semana} className="relative flex gap-4 mb-8">
              <div 
                className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 z-10 border-4 border-[#121212] font-bold cursor-pointer transition ${
                  todosFeitos ? 'bg-[#10b981] text-white' : (isActive ? 'bg-[#c66035] text-white' : 'bg-[#222] text-gray-500 hover:bg-[#333]')
                }`}
                onClick={() => setSemanaAtiva(semanaInfo.semana)}
              >
                {todosFeitos ? (
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path></svg>
                ) : (
                  semanaInfo.semana
                )}
              </div>
              
              <div className="flex-1 mt-1">
                {isActive ? (
                  <div className="bg-[#1e2330] rounded-2xl p-5 border border-[#2a344a] animate-in fade-in slide-in-from-top-2 duration-300">
                    <div className="flex justify-between items-center mb-4">
                      <h3 className="text-white font-bold text-lg">Semana {semanaInfo.semana} • {semanaInfo.titulo}</h3>
                    </div>
                    
                    <div className="space-y-4">
                      {semanaInfo.treinos.map(treino => {
                        const isFeito = treinosFeitos.includes(treino.id);
                        return (
                          <label key={treino.id} className="flex items-start gap-3 cursor-pointer group" onClick={(e) => {
                            e.preventDefault();
                            toggleTreino(treino.id);
                          }}>
                            {isFeito ? (
                              <div className="w-5 h-5 mt-0.5 rounded bg-[#3b82f6] flex items-center justify-center shrink-0 transition">
                                <svg className="w-3.5 h-3.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path></svg>
                              </div>
                            ) : (
                              <div className="w-5 h-5 mt-0.5 rounded border-2 border-gray-400 shrink-0 group-hover:border-white transition"></div>
                            )}
                            <div>
                              <span className={`text-sm font-bold transition block mb-1 ${isFeito ? 'text-gray-500 line-through' : 'text-white'}`}>
                                {treino.dia}
                              </span>
                              <span className={`text-xs leading-relaxed block ${isFeito ? 'text-gray-600' : 'text-gray-400'}`}>
                                {treino.desc}
                              </span>
                            </div>
                          </label>
                        );
                      })}
                    </div>
                  </div>
                ) : (
                  <div 
                    className="pt-2 cursor-pointer group"
                    onClick={() => setSemanaAtiva(semanaInfo.semana)}
                  >
                    <h3 className="text-gray-400 font-bold text-lg group-hover:text-gray-200 transition">
                      Semana {semanaInfo.semana} • {semanaInfo.titulo}
                    </h3>
                    <p className="text-gray-600 text-sm">
                      {todosFeitos ? 'Concluída' : 'Toque para expandir'}
                    </p>
                  </div>
                )}
              </div>
            </div>
          );
        })}

      </div>
    </div>
  );
}
