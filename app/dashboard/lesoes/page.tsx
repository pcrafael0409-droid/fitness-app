'use client';
import { useState } from 'react';

export default function LesoesPage() {
  const [activeTab, setActiveTab] = useState<number | null>(null);

  const lesoes = [
    { id: 1, nome: 'Canelite (Síndrome do Estresse Medial da Tíbia)', causa: 'Aumento rápido de volume, tênis inadequado, piso duro.', prevencao: 'Fortalecimento da panturrilha e alongamento.', acao: 'Gelo por 15 min e descanso.' },
    { id: 2, nome: 'Fascite Plantar', causa: 'Sobrecarga na sola do pé, falta de alongamento.', prevencao: 'Massagem com bolinha de tênis na sola do pé.', acao: 'Alongamento da fáscia antes de levantar da cama.' },
    { id: 3, nome: 'Dor no Joelho (Joelho de Corredor)', causa: 'Fraqueza nos glúteos ou quadríceps, pisada irregular.', prevencao: 'Treino de força focado em quadril e glúteo.', acao: 'Reduzir volume e evitar descidas intensas.' },
  ];

  return (
    <div className="space-y-6 max-w-3xl">
      <h1 className="text-3xl font-bold text-gray-900">Prevenção de Lesões</h1>
      <p className="text-gray-600">Conheça as lesões mais comuns e o que fazer para evitá-las.</p>

      <div className="space-y-4">
        {lesoes.map((lesao) => (
          <div key={lesao.id} className="border border-gray-200 rounded-xl overflow-hidden bg-white shadow-sm">
            <button 
              className="w-full text-left p-6 font-bold text-lg flex justify-between items-center hover:bg-gray-50 transition"
              onClick={() => setActiveTab(activeTab === lesao.id ? null : lesao.id)}
            >
              {lesao.nome}
              <span className="text-orange-500">{activeTab === lesao.id ? '−' : '+'}</span>
            </button>
            {activeTab === lesao.id && (
              <div className="p-6 pt-0 border-t border-gray-100 bg-gray-50 text-sm">
                <p className="mb-2"><strong>Causa comum:</strong> {lesao.causa}</p>
                <p className="mb-2 text-green-700"><strong>Como prevenir:</strong> {lesao.prevencao}</p>
                <p className="text-red-700"><strong>O que fazer se sentir dor:</strong> {lesao.acao}</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
