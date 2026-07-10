'use client';
import { useState } from 'react';

export default function CalculadoraPage() {
  const [distancia, setDistancia] = useState('5');
  const [minutos, setMinutos] = useState('30');
  const [pace, setPace] = useState('');

  const calcularPace = () => {
    const d = parseFloat(distancia);
    const m = parseInt(minutos);
    if (!d || !m) return;
    
    const paceDecimal = m / d;
    const paceMinutos = Math.floor(paceDecimal);
    const paceSegundos = Math.round((paceDecimal - paceMinutos) * 60);
    
    setPace(`${paceMinutos}:${paceSegundos < 10 ? '0' : ''}${paceSegundos}`);
  };

  return (
    <div className="space-y-6 max-w-2xl">
      <h1 className="text-3xl font-bold text-gray-900">Calculadora de Pace</h1>
      <p className="text-gray-600">Descubra qual deve ser o seu ritmo para completar uma prova no tempo desejado.</p>

      <div className="bg-white p-8 rounded-xl border border-gray-200 shadow-sm">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Distância (km)</label>
            <input 
              type="number" 
              value={distancia}
              onChange={(e) => setDistancia(e.target.value)}
              className="w-full border border-gray-300 rounded-md p-2 focus:ring-orange-500 focus:border-orange-500" 
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Tempo Desejado (minutos totais)</label>
            <input 
              type="number" 
              value={minutos}
              onChange={(e) => setMinutos(e.target.value)}
              className="w-full border border-gray-300 rounded-md p-2 focus:ring-orange-500 focus:border-orange-500" 
            />
          </div>
          <button 
            onClick={calcularPace}
            className="w-full bg-orange-600 text-white font-bold py-3 rounded-md hover:bg-orange-700 transition mt-4"
          >
            Calcular Pace
          </button>
        </div>

        {pace && (
          <div className="mt-8 p-6 bg-orange-50 border border-orange-200 rounded-xl text-center">
            <p className="text-gray-600 mb-2">O seu pace médio será de</p>
            <p className="text-4xl font-black text-orange-600">{pace} / km</p>
          </div>
        )}
      </div>
    </div>
  );
}
