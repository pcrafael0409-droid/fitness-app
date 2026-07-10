'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { verifyUserEmail } from './actions';

export default function LoginPage() {
  const router = useRouter();
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Usando a Server Action para bypassar o RLS do banco de dados
      const { success } = await verifyUserEmail(email);

      // Bloqueia quem não comprou
      if (!success) {
        alert("E-mail não encontrado! Verifique se é o mesmo e-mail usado na compra da Kiwify.");
        setLoading(false);
        return;
      }

      // 2. Salva o nome e email no localStorage para usarmos no Dashboard
      if (typeof window !== 'undefined') {
        localStorage.setItem('fit_user_name', nome);
        localStorage.setItem('fit_user_email', email);
      }

      // 3. Redireciona para o Quiz de Onboarding
      router.push('/onboarding');
      
    } catch (err) {
      console.error(err);
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black flex justify-center">
      <div className="w-full max-w-[500px] bg-[#121212] min-h-screen px-6 py-12 flex flex-col">
        
        {/* Header */}
        <div className="flex flex-col items-center mt-12 mb-10">
          <div className="w-16 h-16 bg-[#c66035] rounded-2xl flex items-center justify-center mb-6 shadow-lg shadow-orange-900/20">
            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
          </div>
          <h1 className="text-2xl font-bold text-white tracking-tight mb-2">Corra 5km sem dor</h1>
          <p className="text-gray-400 text-sm">Acesse com os dados da sua compra</p>
        </div>

        {/* Form */}
        <form className="space-y-5" onSubmit={handleLogin}>
          
          {/* Nome */}
          <div>
            <label className="block text-sm text-gray-300 mb-2">Seu Primeiro Nome</label>
            <input 
              type="text" 
              placeholder="Ex: João" 
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              className="w-full bg-[#1e1e1e] border border-[#333] text-white rounded-xl p-4 focus:ring-1 focus:ring-[#c66035] focus:border-[#c66035] outline-none transition" 
              required
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm text-gray-300 mb-2">E-mail usado na Kiwify</label>
            <input 
              type="email" 
              placeholder="nome@email.com" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-[#1e1e1e] border border-[#333] text-white rounded-xl p-4 focus:ring-1 focus:ring-[#c66035] focus:border-[#c66035] outline-none transition" 
              required
            />
          </div>

          {/* Botão Acessar */}
          <button 
            type="submit" 
            disabled={loading}
            className="w-full bg-[#c66035] hover:bg-[#b0532d] text-white font-bold py-4 rounded-xl transition text-lg mt-4 disabled:opacity-50"
          >
            {loading ? 'Entrando...' : 'Acessar Meu Plano'}
          </button>
        </form>

        <div className="mt-8 text-center px-4">
          <p className="text-gray-500 text-xs leading-relaxed">
            Seu acesso foi enviado para o e-mail cadastrado no momento da compra. Certifique-se de digitar exatamente igual.
          </p>
        </div>

      </div>
    </div>
  );
}
