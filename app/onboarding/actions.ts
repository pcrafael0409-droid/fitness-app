'use server';

import { supabaseAdmin } from '@/lib/supabaseAdmin';
import { cookies } from 'next/headers';

export async function saveOnboarding(data: { nome: string; idade: string; peso: string; nivel: string; dor: string; objetivo: string }) {
  try {
    const cookieStore = await cookies();
    const userId = cookieStore.get('fit_user_session')?.value;

    if (!userId) {
      return { success: false, error: 'Não autenticado' };
    }

    const { error } = await supabaseAdmin
      .from('configuracoes')
      .upsert({
        user_id: userId,
        nome: data.nome,
        idade: parseInt(data.idade) || null,
        peso: parseFloat(data.peso) || null,
        nivel: data.nivel,
        dor: data.dor,
        objetivo: data.objetivo
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
