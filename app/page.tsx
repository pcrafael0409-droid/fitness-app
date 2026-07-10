import { redirect } from 'next/navigation';

export default function Home() {
  // Redireciona para o login para testar o novo fluxo de Onboarding
  redirect('/auth/login');
}
