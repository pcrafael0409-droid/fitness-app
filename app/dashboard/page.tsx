'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { planoCompleto } from '@/lib/planoData';
import { useDashboard } from '@/components/DashboardProvider';

export default function DashboardHome() {
  const { userName, userInitial, totalTreinos, treinosFeitos, toggleTreino, loading } = useDashboard();
  
  const [proximoTreino, setProximoTreino] = useState<any>(null);
  const [semanaAtual, setSemanaAtual] = useState(1);
  const [isFeito, setIsFeito] = useState(false);

  useEffect(() => {
    if (loading) return;

    let encontrou = false;
    for (const semana of planoCompleto) {
      for (const treino of semana.treinos) {
        if (!treinosFeitos.includes(treino.id)) {
          setProximoTreino(treino);
          setSemanaAtual(semana.semana);
          setIsFeito(false);
          encontrou = true;
          break;
        }
      }
      if (encontrou) break;
    }

    // Se completou tudo
    if (!encontrou) {
      const ultimaSemana = planoCompleto[planoCompleto.length - 1];
      const ultimoTreino = ultimaSemana.treinos[ultimaSemana.treinos.length - 1];
      setProximoTreino(ultimoTreino);
      setSemanaAtual(ultimaSemana.semana);
      setIsFeito(true);
    }
  }, [treinosFeitos, loading]);

  const handleMarcarFeito = async () => {
    if (!proximoTreino) return;
    await toggleTreino(proximoTreino.id);
  };

  const kmCorrido = (totalTreinos * 2.5).toFixed(1).replace('.', ',');
  const tituloSemana = planoCompleto.find(s => s.semana === semanaAtual)?.titulo || 'Adaptação';

  // Lógica para o gráfico "Sua semana"
  // O plano geralmente tem Segunda, Quarta, Sexta, Domingo.
  // Vamos acender no gráfico de acordo com o que foi feito NA SEMANA ATUAL.
  const treinosDaSemanaAtual = planoCompleto.find(s => s.semana === semanaAtual)?.treinos || [];
  
  // Função para checar se o dia da semana teve o treino concluído
  const foiConcluido = (dia: string) => {
    const treinoDoDia = treinosDaSemanaAtual.find(t => t.dia.substring(0, 3) === dia || t.dia === dia);
    if (!treinoDoDia) return false;
    return treinosFeitos.includes(treinoDoDia.id);
  };

  if (loading) {
    return <div className="p-10 text-center text-gray-500 animate-pulse">Carregando seus dados...</div>;
  }

  return (
    <div className="space-y-6 pb-6">
      {/* Header Profile */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-medium text-white">Olá, {userName}</h1>
          <p className="text-sm text-gray-500">Semana {semanaAtual} de 4 • {tituloSemana}</p>
        </div>
        <div className="w-10 h-10 rounded-full bg-[#003366] text-blue-200 flex items-center justify-center font-bold text-lg">
          {userInitial}
        </div>
      </div>
      
      {/* Main Card - Treino de Hoje */}
      <div className="bg-[#c66035] rounded-3xl p-6 shadow-lg relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent pointer-events-none"></div>
        
        <div className="relative z-10">
          <p className="text-orange-100 text-xs font-bold tracking-wider mb-2 uppercase">Próximo Treino • {proximoTreino?.dia || 'Buscando...'}</p>
          <h2 className="text-3xl font-bold text-white mb-1">
            {proximoTreino ? proximoTreino.titulo : 'Carregando...'}
          </h2>
          <p className="text-orange-100 text-sm mb-6 line-clamp-2">
            {proximoTreino ? proximoTreino.desc : 'Siga o ritmo do seu corpo'}
          </p>
          
          <div className="flex gap-3">
            <button 
              onClick={handleMarcarFeito}
              className={`flex-1 font-bold py-3 rounded-xl transition ${
                isFeito 
                ? 'bg-green-500 text-white' 
                : 'bg-white text-[#c66035] hover:bg-gray-100'
              }`}
            >
              {isFeito ? '✓ Feito!' : 'Marcar como feito'}
            </button>
            <Link 
              href="/dashboard/plano"
              className="w-12 h-12 border border-white/30 rounded-xl flex items-center justify-center text-white hover:bg-white/10 transition"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path></svg>
            </Link>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-[#1c1c1e] p-5 rounded-3xl border border-[#333]">
          <div className="w-10 h-10 bg-[#333] rounded-full flex items-center justify-center mb-3 text-white">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
          </div>
          <p className="text-gray-500 text-xs font-medium uppercase tracking-wider mb-1">Total corrido</p>
          <p className="text-2xl font-bold text-white">{kmCorrido} <span className="text-sm font-medium text-gray-500">km</span></p>
        </div>
        <div className="bg-[#1c1c1e] p-5 rounded-3xl border border-[#333]">
          <div className="w-10 h-10 bg-[#333] rounded-full flex items-center justify-center mb-3 text-white">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
          </div>
          <p className="text-gray-500 text-xs font-medium uppercase tracking-wider mb-1">Sequência</p>
          <p className="text-2xl font-bold text-white">{totalTreinos} <span className="text-sm font-medium text-gray-500">dias</span></p>
        </div>
      </div>

      {/* Week Progress */}
      <div>
        <h3 className="text-white font-bold mb-4">Sua semana {semanaAtual}</h3>
        <div className="flex justify-between items-end h-32 bg-[#1c1c1e] rounded-3xl p-6 border border-[#333]">
          {['Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sab', 'Dom'].map((dia) => {
            const concluiu = foiConcluido(dia === 'Seg' ? 'Segunda' : dia === 'Qua' ? 'Quarta' : dia === 'Sex' ? 'Sexta' : dia === 'Dom' ? 'Domingo' : dia);
            const height = concluiu ? 'h-full' : 'h-1/3';
            const color = concluiu ? 'bg-[#c66035]' : 'bg-[#333]';

            return (
              <div key={dia} className="flex flex-col items-center gap-2 h-full justify-end">
                <div className={`w-3 rounded-full transition-all duration-500 ${height} ${color}`}></div>
                <span className="text-xs text-gray-500 font-medium">{dia}</span>
              </div>
            );
          })}
        </div>
      </div>

    </div>
  );
}
