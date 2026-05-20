import { LogOut, User, WalletCards, CalendarDays } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface HeaderProps {
  month: number;
  year: number;
  onMonthChange: (m: number) => void;
  onYearChange: (y: number) => void;
}

const MONTHS = [
  'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
  'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
];

export function Header({ month, year, onMonthChange, onYearChange }: HeaderProps) {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('@FinanceApp:token');
    navigate('/login');
  };

  return (
    <header className="sticky top-0 z-40 w-full border-b border-white/[0.06] bg-background/60 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        
        {/* Logo */}
        <div className="flex items-center gap-2.5">
          <div className="relative">
            <div className="bg-primary/15 p-1.5 rounded-lg border border-primary/30">
              <WalletCards className="w-4 h-4 text-primary" />
            </div>
          </div>
          <span className="text-[15px] font-semibold tracking-tight text-white hidden sm:block">FinanceApp</span>
        </div>

        {/* Filtros */}
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5 bg-surface border border-white/[0.06] rounded-xl px-3 py-1.5">
            <CalendarDays className="w-3.5 h-3.5 text-zinc-500" />
            <select 
              value={month}
              onChange={(e) => onMonthChange(Number(e.target.value))}
              className="bg-transparent text-[13px] text-zinc-200 focus:outline-none cursor-pointer appearance-none pr-1"
            >
              {MONTHS.map((m, idx) => (
                <option key={idx} value={idx + 1} className="bg-surface text-zinc-200">{m}</option>
              ))}
            </select>
          </div>

          <div className="bg-surface border border-white/[0.06] rounded-xl px-3 py-1.5">
            <select 
              value={year}
              onChange={(e) => onYearChange(Number(e.target.value))}
              className="bg-transparent text-[13px] text-zinc-200 focus:outline-none cursor-pointer appearance-none"
            >
              {[2024, 2025, 2026].map(y => (
                <option key={y} value={y} className="bg-surface text-zinc-200">{y}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Perfil & Logout */}
        <div className="flex items-center gap-2">
          <button 
            onClick={() => navigate('profile')}
            className="group flex items-center gap-2 text-zinc-400 hover:text-white transition-all px-3 py-1.5 rounded-xl hover:bg-white/[0.04]"
            title="Meu Perfil"
          >
            <div className="w-7 h-7 rounded-lg bg-white/[0.06] border border-white/[0.08] flex items-center justify-center group-hover:border-primary/30 transition-colors">
              <User size={14} className="text-zinc-400 group-hover:text-primary transition-colors" />
            </div>
            <span className="text-[13px] font-medium hidden sm:block">Perfil</span>
          </button>
          <button 
            onClick={handleLogout}
            className="flex items-center gap-2 text-zinc-500 hover:text-despesa transition-colors px-2 py-1.5 rounded-xl hover:bg-despesa/[0.06]"
            title="Sair"
          >
            <LogOut size={16} />
          </button>
        </div>

      </div>
    </header>
  );
}
