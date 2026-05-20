import { ArrowDownCircle, ArrowUpCircle, Wallet, TrendingUp, TrendingDown } from 'lucide-react';
import { motion } from 'framer-motion';

interface SummaryCardsProps {
  receitas: number;
  despesas: number;
  saldo: number;
  loading: boolean;
}

export function SummaryCards({ receitas, despesas, saldo, loading }: SummaryCardsProps) {
  const formatCurrency = (val: number) => 
    new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(val);

  const cards = [
    {
      title: "Receitas",
      amount: receitas,
      icon: ArrowUpCircle,
      trendIcon: TrendingUp,
      color: "text-receita",
      borderHover: "hover:border-receita/20",
      glowBg: "bg-receita",
      iconBg: "bg-receita/10 border-receita/20",
    },
    {
      title: "Despesas",
      amount: despesas,
      icon: ArrowDownCircle,
      trendIcon: TrendingDown,
      color: "text-despesa",
      borderHover: "hover:border-despesa/20",
      glowBg: "bg-despesa",
      iconBg: "bg-despesa/10 border-despesa/20",
    },
    {
      title: "Saldo Livre",
      amount: saldo,
      icon: Wallet,
      trendIcon: TrendingUp,
      color: "text-primary",
      borderHover: "hover:border-primary/20",
      glowBg: "bg-primary",
      iconBg: "bg-primary/10 border-primary/20",
      highlight: true,
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
      {cards.map((card, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: i * 0.1 }}
          className={`relative overflow-hidden rounded-2xl bg-surface border border-white/[0.06] ${card.borderHover} p-6 transition-all duration-300 group cursor-default`}
        >
          {/* Subtle glow */}
          <div className={`absolute -top-12 -right-12 w-32 h-32 ${card.glowBg} rounded-full blur-[60px] opacity-[0.06] group-hover:opacity-[0.12] transition-opacity duration-500 pointer-events-none`} />
          
          <div className="relative z-10 flex items-start justify-between">
            <div>
              <p className="text-[11px] text-zinc-500 font-medium uppercase tracking-[0.15em] mb-2">{card.title}</p>
              {loading ? (
                <div className="h-8 w-28 bg-white/[0.06] animate-pulse rounded-lg mt-1" />
              ) : (
                <h3 className={`text-2xl lg:text-[28px] font-bold tracking-tight ${card.highlight ? card.color : 'text-white'}`}>
                  {formatCurrency(card.amount)}
                </h3>
              )}
            </div>
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center border ${card.iconBg} ${card.color}`}>
              <card.icon size={20} />
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
}
