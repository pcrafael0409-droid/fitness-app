'use client';

export default function RespiracaoPage() {
  return (
    <div className="space-y-6 max-w-4xl">
      <h1 className="text-3xl font-bold text-gray-900">Técnica de Respiração (3:2)</h1>
      <p className="text-gray-600">Aprenda a respirar para nunca mais faltar ar durante a corrida.</p>

      <div className="bg-white p-8 rounded-xl border border-gray-200 shadow-sm flex flex-col md:flex-row gap-8 items-center">
        <div className="flex-1">
          <h2 className="text-2xl font-bold mb-4">Como funciona?</h2>
          <ul className="space-y-4">
            <li className="flex items-start gap-3">
              <span className="bg-blue-100 text-blue-700 w-8 h-8 rounded-full flex items-center justify-center font-bold shrink-0">1</span>
              <p><strong>Inspire por 3 passos:</strong> Puxe o ar pelo nariz ou boca durante 3 pisadas no chão.</p>
            </li>
            <li className="flex items-start gap-3">
              <span className="bg-orange-100 text-orange-700 w-8 h-8 rounded-full flex items-center justify-center font-bold shrink-0">2</span>
              <p><strong>Expire por 2 passos:</strong> Solte o ar forte durante 2 pisadas.</p>
            </li>
            <li className="flex items-start gap-3">
              <span className="bg-green-100 text-green-700 w-8 h-8 rounded-full flex items-center justify-center font-bold shrink-0">3</span>
              <p><strong>Por que funciona?</strong> Isso evita que você exale sempre no mesmo pé, prevenindo dores no flanco ("dor de veado") e equilibrando o impacto.</p>
            </li>
          </ul>
        </div>
        
        <div className="w-64 h-64 bg-gray-50 rounded-full border-4 border-blue-100 flex items-center justify-center relative overflow-hidden">
          {/* Animação CSS do Pulmão */}
          <style dangerouslySetInnerHTML={{__html: `
            @keyframes breathe {
              0%, 100% { transform: scale(1); background: #e0f2fe; }
              60% { transform: scale(1.2); background: #bae6fd; }
            }
            .lung-animation { animation: breathe 3s infinite ease-in-out; }
          `}} />
          <div className="lung-animation w-32 h-32 rounded-full bg-blue-100 flex items-center justify-center">
            <span className="text-4xl">🫁</span>
          </div>
        </div>
      </div>
    </div>
  );
}
