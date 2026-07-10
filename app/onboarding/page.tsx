'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

import { saveOnboarding } from './actions';

export default function OnboardingPage() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [isPersonalizing, setIsPersonalizing] = useState(false);
  const [loadingText, setLoadingText] = useState('Analisando seu perfil...');
  
  const [nivel, setNivel] = useState('Caminho às vezes');
  const [idade, setIdade] = useState('');
  const [peso, setPeso] = useState('');
  const [dor, setDor] = useState('Nenhuma');
  const [objetivo, setObjetivo] = useState('Completar meus primeiros 5km');

  const niveis = ['Sedentário', 'Caminho às vezes', 'Corro pouco', 'Já corri 5km'];
  const dores = ['Joelho', 'Canela', 'Sola do pé', 'Nenhuma'];
  const objetivos = ['Completar meus primeiros 5km', 'Correr 5km mais rápido', 'Correr sem sentir dor'];

  const handleContinue = async () => {
    setIsPersonalizing(true);
    
    // Ler o nome do localStorage
    let nome = 'Corredor';
    if (typeof window !== 'undefined') {
      nome = localStorage.getItem('fit_user_name') || 'Corredor';
    }

    // Salvar no Banco de Dados
    await saveOnboarding({
      nome,
      idade,
      nivel,
      dor,
      objetivo
    });
    
    // Fake loading steps
    setTimeout(() => setLoadingText('Ajustando volume de treino...'), 1500);
    setTimeout(() => setLoadingText('Calculando pace ideal...'), 3000);
    setTimeout(() => setLoadingText('Criando seu plano de 4 semanas...'), 4500);
    setTimeout(() => {
      router.push('/dashboard');
    }, 6000);
  };

  if (isPersonalizing) {
    return (
      <div className="min-h-screen bg-black flex justify-center items-center p-6">
        <div className="w-full max-w-[500px] flex flex-col items-center text-center space-y-6">
          <div className="w-16 h-16 border-4 border-[#333] border-t-[#c66035] rounded-full animate-spin"></div>
          <h2 className="text-2xl font-bold text-white">Personalizando</h2>
          <p className="text-gray-400">{loadingText}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black flex justify-center">
      <div className="w-full max-w-[500px] bg-[#121212] min-h-screen px-6 py-10 flex flex-col">
        
        {/* Progress Bar */}
        <div className="mb-8">
          <p className="text-gray-500 text-sm mb-2">Passo 2 de 3</p>
          <div className="w-full h-1 bg-[#333] rounded-full overflow-hidden">
            <div className="w-2/3 h-full bg-[#c66035] rounded-full"></div>
          </div>
        </div>

        <h1 className="text-3xl font-bold text-white mb-2">Vamos te conhecer</h1>
        <p className="text-gray-400 mb-8">Isso ajuda a montar um plano seguro pro seu ritmo.</p>

        <div className="space-y-6 flex-1">
          {/* Nível */}
          <div>
            <label className="block text-gray-400 mb-3">Qual seu nível atual?</label>
            <div className="grid grid-cols-2 gap-3">
              {niveis.map(n => (
                <button 
                  key={n}
                  onClick={() => setNivel(n)}
                  className={`p-4 rounded-xl text-left text-sm border flex items-center gap-2 transition ${
                    nivel === n 
                    ? 'border-blue-500 bg-[#0a1e3f] text-blue-100' 
                    : 'border-[#333] bg-[#1a1a1a] text-gray-300 hover:border-gray-500'
                  }`}
                >
                  <div className={`w-4 h-4 rounded border ${nivel === n ? 'border-blue-500 bg-blue-500' : 'border-gray-500'}`}></div>
                  {n}
                </button>
              ))}
            </div>
          </div>

          {/* Idade e Peso */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-400 mb-2">Idade</label>
              <input 
                type="number" 
                placeholder="Ex: 34" 
                value={idade}
                onChange={(e) => setIdade(e.target.value)}
                className="w-full bg-[#1a1a1a] border border-[#333] rounded-xl p-4 text-white outline-none focus:border-[#c66035]"
              />
            </div>
            <div>
              <label className="block text-gray-400 mb-2">Peso (kg)</label>
              <input 
                type="number" 
                placeholder="Ex: 78" 
                value={peso}
                onChange={(e) => setPeso(e.target.value)}
                className="w-full bg-[#1a1a1a] border border-[#333] rounded-xl p-4 text-white outline-none focus:border-[#c66035]"
              />
            </div>
          </div>

          {/* Dores */}
          <div>
            <label className="block text-gray-400 mb-3">Já sentiu alguma dor ao correr?</label>
            <div className="flex flex-wrap gap-2">
              {dores.map(d => (
                <button
                  key={d}
                  onClick={() => setDor(d)}
                  className={`px-5 py-2.5 rounded-full text-sm border transition ${
                    dor === d
                    ? 'border-red-900 bg-[#3a0b0b] text-red-200'
                    : 'border-[#333] bg-[#222] text-gray-300 hover:bg-[#333]'
                  }`}
                >
                  {d}
                </button>
              ))}
            </div>
          </div>

          {/* Objetivo */}
          <div>
            <label className="block text-gray-400 mb-3">Qual seu principal objetivo?</label>
            <div className="flex flex-col gap-3">
              {objetivos.map(obj => (
                <button
                  key={obj}
                  onClick={() => setObjetivo(obj)}
                  className={`p-4 rounded-xl text-left text-sm border flex items-center gap-3 transition ${
                    objetivo === obj
                    ? 'border-[#c66035] bg-[#3a1b11] text-orange-100'
                    : 'border-[#333] bg-[#1a1a1a] text-gray-300 hover:border-gray-500'
                  }`}
                >
                  <div className={`w-4 h-4 rounded-full border flex-shrink-0 ${
                    objetivo === obj ? 'border-[#c66035] bg-[#c66035]' : 'border-gray-500'
                  }`}></div>
                  {obj}
                </button>
              ))}
            </div>
          </div>
        </div>

        <button 
          onClick={handleContinue}
          className="w-full bg-[#c66035] hover:bg-[#b0532d] text-white font-bold py-4 rounded-xl mt-8 transition text-lg"
        >
          Continuar ➔
        </button>

      </div>
    </div>
  );
}
