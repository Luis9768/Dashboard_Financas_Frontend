import { ArrowDownCircle, ArrowUpCircle, DollarSign } from 'lucide-react';
import { cn } from '../utils/cn';

interface SummaryCardsProps {
  receitas: number;
  despesas: number;
  saldo: number;
  loading: boolean;
}

export function SummaryCards({ receitas, despesas, saldo, loading }: SummaryCardsProps) {
  const formatCurrency = (val: number) => 
    new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(val);

  const Card = ({ title, amount, icon: Icon, colorClass, isBalance = false, shadowClass }: any) => (
    <div className={cn("glass rounded-2xl p-6 flex items-start justify-between relative overflow-hidden", isBalance && "bg-primary/10 border-primary/20", shadowClass)}>
      {/* Subtle glow in the background of the card */}
      <div className={cn("absolute -top-10 -right-10 w-32 h-32 rounded-full blur-[50px] opacity-20 pointer-events-none", colorClass.split(' ')[0])} />
      
      <div className="relative z-10">
        <p className="text-zinc-400 font-medium text-sm mb-1 uppercase tracking-wider">{title}</p>
        {loading ? (
          <div className="h-8 w-32 bg-white/10 animate-pulse rounded mt-1" />
        ) : (
          <h3 className={cn("text-3xl font-bold", isBalance ? "text-primary" : "text-white")}>
            {formatCurrency(amount)}
          </h3>
        )}
      </div>
      <div className={cn("w-12 h-12 rounded-xl flex items-center justify-center relative z-10", colorClass)}>
        <Icon size={24} />
      </div>
    </div>
  );

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      <Card 
        title="Total de Receitas" 
        amount={receitas} 
        icon={ArrowUpCircle} 
        colorClass="bg-receita/20 text-receita"
        shadowClass="hover:shadow-neon-receita transition-shadow" 
      />
      <Card 
        title="Total de Despesas" 
        amount={despesas} 
        icon={ArrowDownCircle} 
        colorClass="bg-despesa/20 text-despesa"
        shadowClass="hover:shadow-neon-despesa transition-shadow" 
      />
      <Card 
        title="Saldo Atual" 
        amount={saldo} 
        icon={DollarSign} 
        colorClass="bg-primary/20 text-primary" 
        isBalance
        shadowClass="shadow-neon-primary" 
      />
    </div>
  );
}
