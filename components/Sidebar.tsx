'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Sidebar() {
  const pathname = usePathname();
  
  const menuItems = [
    { name: 'Início', href: '/dashboard', icon: '🏠' },
    { name: 'Plano 4 Semanas', href: '/dashboard/plano', icon: '📅' },
    { name: 'Aquecimento', href: '/dashboard/aquecimento', icon: '🔥' },
    { name: 'Respiração', href: '/dashboard/respiracao', icon: '🫁' },
    { name: 'Lesões', href: '/dashboard/lesoes', icon: '🩹' },
    { name: 'Calculadora', href: '/dashboard/calculadora', icon: '⏱️' },
    { name: 'Diário de Treino', href: '/dashboard/diario', icon: '📝' },
    { name: 'Prompts AI', href: '/dashboard/prompts', icon: '🤖' },
  ];

  return (
    <aside className="w-64 border-r border-gray-200 bg-white h-screen flex flex-col">
      <nav className="flex-1 space-y-1 p-4">
        {menuItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.name}
              href={item.href}
              className={`flex items-center gap-3 rounded-md px-3 py-3 text-sm font-medium ${
                isActive ? 'bg-orange-50 text-orange-600' : 'text-gray-700 hover:bg-gray-50'
              }`}
            >
              <span>{item.icon}</span>
              {item.name}
            </Link>
          );
        })}
      </nav>
      <div className="p-4 border-t border-gray-200">
        <button className="w-full text-left text-sm text-red-600 hover:text-red-700 font-medium py-2">
          Sair
        </button>
      </div>
    </aside>
  );
}
