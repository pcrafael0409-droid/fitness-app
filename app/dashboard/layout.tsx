import BottomNav from '@/components/BottomNav';
import { DashboardProvider } from '@/components/DashboardProvider';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-black flex justify-center">
      {/* Mobile container - restricts width on desktop to look like an app */}
      <div className="w-full max-w-[500px] bg-[#121212] min-h-screen relative shadow-2xl overflow-x-hidden flex flex-col">
        <DashboardProvider>
          {/* Main Content Area */}
          <main className="flex-1 overflow-y-auto pb-20 pt-6 px-6 no-scrollbar">
            {children}
          </main>
          
          {/* Fixed Bottom Navigation */}
          <BottomNav />
        </DashboardProvider>
      </div>
    </div>
  );
}
