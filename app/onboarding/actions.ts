'use server';

import { supabaseAdmin } from '@/lib/supabaseAdmin';
import { cookies } from 'next/headers';

export async function saveOnboarding(data: { nome: string; idade: string; nivel: string; dor: string; objetivo: string }) {
  try {
    const cookieStore = await cookies();
    const userId = cookieStore.get('fit_user_session')?.value;

    if (!userId) {
      return { success: false, error: 'Não autenticado' };
    }

    // A tabela atual tem 'nome', 'idade', 'nivel'
    // Se o banco não tiver 'dor' e 'objetivo', você precisaria adicionar essas colunas, 
    // mas por enquanto salvamos as 3 principais e atualizamos o nome do usuário lá.
    const { error } = await supabaseAdmin
      .from('configuracoes')
      .upsert({
        user_id: userId,
        nome: data.nome,
        idade: parseInt(data.idade) || null,
        nivel: data.nivel,
      });

    if (error) {
      console.error(error);
      return { success: false, error: error.message };
    }

    // Também atualizar o nome do usuário na tabela `users` só pra garantir
    await supabaseAdmin
      .from('users')
      .update({ name: data.nome })
      .eq('id', userId);

    return { success: true };
  } catch (err) {
    console.error('Error saving onboarding:', err);
    return { success: false };
  }
}
