export default function PromptsPage() {
  return (
    <div className="space-y-6 max-w-4xl">
      <h1 className="text-3xl font-bold text-gray-900">Prompts de Inteligência Artificial</h1>
      <p className="text-gray-600">Copie e cole esses prompts no ChatGPT para criar treinos, dietas e planilhas personalizadas.</p>

      <div className="space-y-4">
        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
          <h2 className="text-lg font-bold text-orange-600 mb-2">Treino de Força para Corredores</h2>
          <div className="bg-gray-900 text-gray-100 p-4 rounded-lg relative font-mono text-sm">
            <p>Atue como um treinador físico de elite. Monte um plano de musculação de 2 dias por semana focado especificamente em fortalecimento para um corredor de 5km iniciante que quer evitar dores no joelho (fortalecimento de glúteo médio, core e quadríceps). Os treinos devem durar 45 min no máximo.</p>
            <button className="absolute top-2 right-2 bg-gray-700 hover:bg-gray-600 text-xs px-2 py-1 rounded">Copiar</button>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
          <h2 className="text-lg font-bold text-orange-600 mb-2">Dieta Pré e Pós Treino</h2>
          <div className="bg-gray-900 text-gray-100 p-4 rounded-lg relative font-mono text-sm">
            <p>Atue como um nutricionista esportivo. Tenho 80kg, treino corrida de manhã cedo (6am). Monte 3 opções de café da manhã rápido (pré-treino) e 3 opções de refeição pós-treino com foco em recuperação muscular e energia ao longo do dia, usando ingredientes baratos do Brasil.</p>
            <button className="absolute top-2 right-2 bg-gray-700 hover:bg-gray-600 text-xs px-2 py-1 rounded">Copiar</button>
          </div>
        </div>
      </div>
    </div>
  );
}
