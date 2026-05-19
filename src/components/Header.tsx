import { LogOut, User, Wallet } from 'lucide-react';
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
    <header className="sticky top-0 z-40 w-full border-b border-white/10 bg-surface/80 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        
        {/* Logo */}
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center text-white">
            <Wallet size={18} />
          </div>
          <span className="font-semibold text-lg text-white hidden sm:block">FinanceDash</span>
        </div>

        {/* Filtros */}
        <div className="flex items-center gap-3">
          <select 
            value={month}
            onChange={(e) => onMonthChange(Number(e.target.value))}
            className="bg-surfaceHighlight border border-white/10 rounded-lg px-3 py-1.5 text-sm text-zinc-100 focus:outline-none focus:ring-2 focus:ring-primary/50"
          >
            {MONTHS.map((m, idx) => (
              <option key={idx} value={idx + 1}>{m}</option>
            ))}
          </select>

          <select 
            value={year}
            onChange={(e) => onYearChange(Number(e.target.value))}
            className="bg-surfaceHighlight border border-white/10 rounded-lg px-3 py-1.5 text-sm text-zinc-100 focus:outline-none focus:ring-2 focus:ring-primary/50"
          >
            {[2024, 2025, 2026].map(y => (
              <option key={y} value={y}>{y}</option>
            ))}
          </select>
        </div>

        {/* Perfil & Logout */}
        <div className="flex items-center gap-4">
          <button 
            onClick={() => navigate('/profile')}
            className="hidden sm:flex items-center gap-2 text-zinc-400 hover:text-white transition-colors"
            title="Meu Perfil"
          >
            <div className="w-8 h-8 rounded-full bg-surfaceHighlight flex items-center justify-center border border-white/5 hover:border-primary/50 hover:shadow-neon-primary transition-all">
              <User size={16} />
            </div>
          </button>
          <button 
            onClick={handleLogout}
            className="text-zinc-400 hover:text-despesa transition-colors"
            title="Sair"
          >
            <LogOut size={20} />
          </button>
        </div>

      </div>
    </header>
  );
}
