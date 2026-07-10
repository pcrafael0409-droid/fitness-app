'use server';

import { supabaseAdmin } from '@/lib/supabaseAdmin';
import { cookies } from 'next/headers';

export async function verifyUserEmail(email: string) {
  try {
    const { data: user, error } = await supabaseAdmin
      .from('users')
      .select('*')
      .eq('email', email)
      .single();

    if (error || !user) {
      return { success: false };
    }

    // Cria um cookie seguro com o ID do usuário para mantermos a sessão
    const cookieStore = await cookies();
    cookieStore.set('fit_user_session', user.id, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 60 * 60 * 24 * 30, // 30 dias
      path: '/',
    });

    return { success: true, user };
  } catch (err) {
    console.error('Error verifying email:', err);
    return { success: false };
  }
}
