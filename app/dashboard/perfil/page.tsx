'use client';
import { useState } from 'react';

const lesoes = [
  {
    id: 'canelite',
    title: 'Canelite',
    subtitle: 'Síndrome do estresse medial da tíbia',
    severity: 'Comum',
    recovery: '2 a 4 semanas',
    desc: 'Inflamação na parte frontal ou interna do osso da canela, muito comum em iniciantes ou ao aumentar o volume muito rápido.',
    prevention: 'Evite aumentar a distância em mais de 10% por semana, use tênis adequados e fortaleça as panturrilhas.'
  },
  {
    id: 'fascite',
    title: 'Fascite plantar',
    subtitle: 'Dor na sola do pé',
    severity: 'Comum',
    recovery: '2 a 4 semanas',
    desc: 'Inflamação do tecido que liga o calcanhar aos dedos, comum em quem aumenta o volume de treino rápido demais.',
    prevention: 'Alongue a panturrilha antes e depois, use tênis com bom amortecimento e aumente a distância aos poucos.'
  },
  {
    id: 'joelho',
    title: 'Dor no joelho',
    subtitle: 'Joelho de corredor',
    severity: 'Frequente',
    recovery: '4 a 6 semanas',
    desc: 'Dor ao redor ou atrás da patela (rótula). Piora ao subir/descer escadas ou correr ladeiras.',
    prevention: 'Fortaleça quadríceps e glúteos, melhore a cadência dos passos (passos mais curtos) e evite declives longos.'
  },
  {
    id: 'aquiles',
    title: 'Tendinite de Aquiles',
    subtitle: 'Dor no tendão atrás do calcanhar',
    severity: 'Moderada a Grave',
    recovery: '4 a 8 semanas',
    desc: 'Inflamação no tendão que conecta o músculo da panturrilha ao calcanhar. Comum ao fazer treinos de velocidade sem preparo.',
    prevention: 'Faça exercícios excêntricos para a panturrilha (elevação em um degrau). Evite correr com calçados muito gastos.'
  },
  {
    id: 'panturrilha',
    title: 'Distensão na Panturrilha',
    subtitle: 'Fisgada repentina na perna',
    severity: 'Moderada',
    recovery: '2 a 6 semanas',
    desc: 'Pequenas rupturas nas fibras musculares da panturrilha, geralmente sentidas como uma pedrada súbita durante a corrida.',
    prevention: 'Nunca pule o aquecimento! Aumente o fluxo sanguíneo na região caminhando antes de começar a correr.'
  },
  {
    id: 'itb',
    title: 'Síndrome da Banda Iliotibial',
    subtitle: 'Dor na lateral externa do joelho',
    severity: 'Frequente',
    recovery: '3 a 6 semanas',
    desc: 'Atrito repetitivo do tecido conjuntivo (banda iliotibial) contra o osso do fêmur. Muito comum em corredores que correm sempre do mesmo lado da rua.',
    prevention: 'Fortalecimento dos glúteos médios (exercício de concha, abdução). Evite correr apenas em descidas.'
  }
];

export default function PerfilLesoesPage() {
  const [expandedId, setExpandedId] = useState<string | null>('fascite'); // Fascite aberta por padrão

  const toggleAccordion = (id: string) => {
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <div className="space-y-6 pb-24">
      <div>
        <p className="text-xs text-gray-500 tracking-wider mb-1 uppercase font-bold">Saúde do Corredor</p>
        <h1 className="text-2xl font-bold text-white mb-1">Prevenção de lesões</h1>
        <p className="text-gray-400 text-sm">Conheça as lesões mais comuns e como evitá-las.</p>
      </div>

      <div className="space-y-3">
        {lesoes.map((item) => {
          const isExpanded = expandedId === item.id;

          return (
            <div 
              key={item.id}
              className={`rounded-2xl transition-all duration-300 border overflow-hidden ${
                isExpanded ? 'bg-[#242426] border-[#3b82f6]' : 'bg-[#1c1c1e] border-[#333]'
              }`}
            >
              <button
                onClick={() => toggleAccordion(item.id)}
                className="w-full flex items-center justify-between p-4 text-left focus:outline-none"
              >
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-xl bg-red-900/30 flex items-center justify-center shrink-0">
                    <svg className="w-5 h-5 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path></svg>
                  </div>
                  <div>
                    <h3 className="text-white font-bold text-lg leading-tight">{item.title}</h3>
                    <p className="text-gray-500 text-sm">{item.subtitle}</p>
                  </div>
                </div>
                <div className="text-gray-400">
                  <svg 
                    className={`w-5 h-5 transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`} 
                    fill="none" stroke="currentColor" viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                  </svg>
                </div>
              </button>

              {isExpanded && (
                <div className="p-4 pt-0 border-t border-[#333] mt-2">
                  <div className="flex flex-wrap gap-2 mt-4 mb-4">
                    <span className="bg-[#b45309]/20 text-[#fbbf24] text-xs px-3 py-1.5 rounded-full font-semibold border border-[#b45309]/30">
                      {item.severity}
                    </span>
                    <span className="bg-[#1f2937] text-gray-300 text-xs px-3 py-1.5 rounded-full font-medium">
                      Recuperação: {item.recovery}
                    </span>
                  </div>
                  
                  <p className="text-gray-300 text-sm leading-relaxed mb-4">
                    {item.desc}
                  </p>
                  
                  <div>
                    <h4 className="text-green-400 font-bold text-sm mb-1 flex items-center gap-2">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                      Como prevenir
                    </h4>
                    <p className="text-gray-400 text-sm leading-relaxed">
                      {item.prevention}
                    </p>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
