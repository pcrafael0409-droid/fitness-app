import { NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabaseAdmin';

// Esta rota vai receber o "Aviso de Venda Aprovada" da Kiwify
export async function POST(request: Request) {
  try {
    // Segurança: Verifica se o webhook realmente veio da Kiwify usando um token
    const url = new URL(request.url);
    const token = url.searchParams.get('token');
    
    if (token !== process.env.KIWIFY_WEBHOOK_TOKEN) {
      return NextResponse.json({ error: 'Token de segurança inválido ou ausente' }, { status: 401 });
    }

    // 1. Recebe os dados da Kiwify
    const body = await request.json();
    
    // Na Kiwify, o status de compra aprovada geralmente vem como 'approved'
    if (body.order_status === 'approved' || body.status === 'approved') {
      const buyerEmail = body.Customer?.email || body.email;
      const buyerName = body.Customer?.full_name || body.name;

      if (!buyerEmail) {
        return NextResponse.json({ error: 'Email não fornecido no webhook' }, { status: 400 });
      }

      // 2. Insere o aluno no nosso banco de dados usando Service Role (liberando o acesso bypassando RLS)
      const { error } = await supabaseAdmin
        .from('users')
        .insert([{ email: buyerEmail, name: buyerName }])
        // Opcional: Se ele comprar de novo (upsell), não dá erro por email duplicado
        .upsert({ email: buyerEmail, name: buyerName }, { onConflict: 'email' });

      if (error) {
        console.error('Erro ao inserir aluno no Supabase:', error);
        return NextResponse.json({ error: 'Erro no banco' }, { status: 500 });
      }

      return NextResponse.json({ success: true, message: 'Acesso liberado com sucesso!' });
    }

    return NextResponse.json({ message: 'Ignorado. Status não é approved.' });
  } catch (err) {
    console.error('Webhook error:', err);
    return NextResponse.json({ error: 'Erro interno' }, { status: 500 });
  }
}
