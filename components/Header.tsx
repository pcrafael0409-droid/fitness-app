import Link from 'next/link';

export default function Header() {
  return (
    <header className="flex h-16 items-center justify-between border-b border-gray-200 bg-white px-6">
      <div className="flex items-center gap-4">
        <Link href="/dashboard" className="text-xl font-bold text-orange-600">
          Corra 5KM Sem Dor
        </Link>
      </div>
      <div className="flex items-center gap-4">
        <span className="text-sm text-gray-600">Área do Aluno</span>
        <button className="rounded-full bg-gray-100 p-2 hover:bg-gray-200">
          <svg className="h-5 w-5 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
          </svg>
        </button>
      </div>
    </header>
  );
}
