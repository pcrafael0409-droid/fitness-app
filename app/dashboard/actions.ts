'use server';

import { supabaseAdmin } from '@/lib/supabaseAdmin';
import { cookies } from 'next/headers';
import { revalidatePath } from 'next/cache';

export async function toggleTreinoFeito(treinoDesc: string, isFeito: boolean) {
  try {
    const cookieStore = await cookies();
    const userId = cookieStore.get('fit_user_session')?.value;

    if (!userId) {
      return { success: false, error: 'Não autenticado' };
    }

    if (isFeito) {
      // Inserir no diário (usamos observacao para guardar o ID/Desc do treino)
      const { error } = await supabaseAdmin
        .from('diario')
        .insert({
          user_id: userId,
          data: new Date().toISOString().split('T')[0], // data de hoje
          observacao: treinoDesc
        });
      
      if (error) throw error;
    } else {
      // Remover do diário
      const { error } = await supabaseAdmin
        .from('diario')
        .delete()
        .eq('user_id', userId)
        .eq('observacao', treinoDesc);
        
      if (error) throw error;
    }

    revalidatePath('/dashboard', 'layout');
    return { success: true };
  } catch (err) {
    console.error('Error toggling treino:', err);
    return { success: false };
  }
}

export async function getTreinosFeitos() {
  try {
    const cookieStore = await cookies();
    const userId = cookieStore.get('fit_user_session')?.value;

    if (!userId) {
      return { success: false, feitos: [] };
    }

    const { data, error } = await supabaseAdmin
      .from('diario')
      .select('observacao')
      .eq('user_id', userId);

    if (error) throw error;

    return { success: true, feitos: data.map(d => d.observacao) };
  } catch (err) {
    console.error('Error getting treinos:', err);
    return { success: false, feitos: [] };
  }
}

export async function getUserStats() {
  try {
    const cookieStore = await cookies();
    const userId = cookieStore.get('fit_user_session')?.value;

    if (!userId) {
      return { success: false };
    }

    // Busca configurações (nome, nível)
    const { data: config } = await supabaseAdmin
      .from('configuracoes')
      .select('*')
      .eq('user_id', userId)
      .single();

    // Busca total de treinos
    const { data: diarios } = await supabaseAdmin
      .from('diario')
      .select('*')
      .eq('user_id', userId);

    return { 
      success: true, 
      nome: config?.nome || 'Corredor',
      totalTreinos: diarios?.length || 0
    };
  } catch (err) {
    console.error('Error getting stats:', err);
    return { success: false };
  }
}
