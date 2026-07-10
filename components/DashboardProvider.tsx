'use client';
import { createContext, useContext, useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { getUserStats, getTreinosFeitos, toggleTreinoFeito } from '../app/dashboard/actions';
import { planoCompleto } from '@/lib/planoData';

type DashboardContextType = {
  userName: string;
  userInitial: string;
  totalTreinos: number;
  treinosFeitos: string[];
  loading: boolean;
  toggleTreino: (id: string) => Promise<void>;
};

const DashboardContext = createContext<DashboardContextType | null>(null);

export function DashboardProvider({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [userName, setUserName] = useState('Corredor');
  const [userInitial, setUserInitial] = useState('C');
  const [totalTreinos, setTotalTreinos] = useState(0);
  const [treinosFeitos, setTreinosFeitos] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    async function fetchData() {
      try {
        const stats = await getUserStats();
        if (!stats.success) {
          router.push('/auth/login');
          return;
        }

        const treinos = await getTreinosFeitos();

        if (isMounted) {
          setUserName(stats.nome || 'Corredor');
          setUserInitial((stats.nome || 'C').charAt(0).toUpperCase());
          
          // Filtra apenas os treinos que pertencem ao plano atual (ignora IDs antigos do mockup)
          const validIds = new Set();
          planoCompleto.forEach(s => s.treinos.forEach(t => validIds.add(t.id)));
          
          const treinosValidos = (treinos.feitos || []).filter(id => validIds.has(id));
          
          setTreinosFeitos(treinosValidos);
          setTotalTreinos(treinosValidos.length);
          setLoading(false);
        }
      } catch (err) {
        console.error("Erro ao carregar dados", err);
        router.push('/auth/login');
      }
    }

    fetchData();

    return () => {
      isMounted = false;
    };
  }, [router]);

  const toggleTreino = async (treinoId: string) => {
    const isAtualmenteFeito = treinosFeitos.includes(treinoId);
    const novoStatus = !isAtualmenteFeito;

    // Atualiza estado local (optimistic UI)
    if (novoStatus) {
      setTreinosFeitos((prev) => [...prev, treinoId]);
      setTotalTreinos((prev) => prev + 1);
    } else {
      setTreinosFeitos((prev) => prev.filter(id => id !== treinoId));
      setTotalTreinos((prev) => prev - 1);
    }

    // Atualiza DB
    await toggleTreinoFeito(treinoId, novoStatus);
  };

  return (
    <DashboardContext.Provider value={{
      userName, userInitial, totalTreinos, treinosFeitos, loading, toggleTreino
    }}>
      {children}
    </DashboardContext.Provider>
  );
}

export function useDashboard() {
  const context = useContext(DashboardContext);
  if (!context) throw new Error("useDashboard deve ser usado dentro de um DashboardProvider");
  return context;
}
