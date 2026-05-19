import { useMemo } from 'react';
import { PieChart, Pie, Cell, Tooltip as RechartsTooltip, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, AreaChart, Area, CartesianGrid } from 'recharts';
import { ListarLancamentosDto } from '../services/api';

const COLORS = ['#10b981', '#3b82f6', '#f59e0b', '#8b5cf6', '#ec4899', '#06b6d4', '#f43f5e'];

interface DashboardChartsProps {
  transactions: ListarLancamentosDto[];
  history?: any[];
}

export function DashboardCharts({ transactions, history = [] }: DashboardChartsProps) {
  
  // 1. Agrupar Despesas por Categoria (Gráfico de Rosca)
  const categoryData = useMemo(() => {
    const despesas = transactions.filter(t => t.tipoLancamento === 'DESPESA');
    const grouped = despesas.reduce((acc, curr) => {
      acc[curr.categoria] = (acc[curr.categoria] || 0) + curr.valor;
      return acc;
    }, {} as Record<string, number>);

    return Object.entries(grouped)
      .map(([name, value], index) => ({
        name,
        value,
        color: COLORS[index % COLORS.length]
      }))
      .sort((a, b) => b.value - a.value);
  }, [transactions]);

  // 2. Evolução do Saldo no mês (Gráfico de Área)
  const dailyData = useMemo(() => {
    if (!transactions.length) return [];
    
    // Pega o último dia do mês baseando-se nas datas (ou 31 fixo)
    const sorted = [...transactions].sort((a, b) => a.dataLancamento.localeCompare(b.dataLancamento));
    const daysInMonth = 31; 
    const daysArray = Array.from({ length: daysInMonth }, (_, i) => ({
      dia: `${i + 1}`,
      saldoDia: 0
    }));

    // Acumular o valor dia a dia
    let runningBalance = 0;
    
    // Se quiséssemos apenas o saldo do dia:
    const txByDay = transactions.reduce((acc, curr) => {
      const day = parseInt(curr.dataLancamento.split('-')[2], 10);
      const val = curr.tipoLancamento === 'RECEITA' ? curr.valor : -curr.valor;
      acc[day] = (acc[day] || 0) + val;
      return acc;
    }, {} as Record<number, number>);

    return daysArray.map(dayObj => {
      const dayNum = parseInt(dayObj.dia, 10);
      if (txByDay[dayNum]) {
        runningBalance += txByDay[dayNum];
      }
      return {
        dia: dayObj.dia,
        saldo: runningBalance
      };
    });
  }, [transactions]);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
      
      {/* Gráfico de Rosca */}
      <div className="glass rounded-2xl p-6 lg:col-span-1 border border-white/5">
        <h3 className="text-zinc-100 font-medium mb-4">Despesas por Categoria</h3>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={categoryData}
                innerRadius={60}
                outerRadius={80}
                paddingAngle={5}
                dataKey="value"
                stroke="none"
              >
                {categoryData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <RechartsTooltip 
                contentStyle={{ backgroundColor: '#171717', borderColor: '#27272a', borderRadius: '8px', color: '#fff' }}
                itemStyle={{ color: '#fff' }}
                formatter={(value: number) => new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value)}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
        <div className="flex flex-wrap gap-3 mt-4">
          {categoryData.length === 0 && <span className="text-zinc-500 text-sm">Sem despesas no período.</span>}
          {categoryData.map(cat => (
            <div key={cat.name} className="flex items-center gap-2 text-xs text-zinc-400">
              <div className="w-3 h-3 rounded-full shadow-[0_0_8px_rgba(255,255,255,0.2)]" style={{ backgroundColor: cat.color }} />
              {cat.name}
            </div>
          ))}
        </div>
      </div>

      {/* Gráfico de Barras e Área */}
      <div className="lg:col-span-2 space-y-6">
        
        {/* Gráfico de Barras */}
        <div className="glass rounded-2xl p-6 border border-white/5">
          <h3 className="text-zinc-100 font-medium mb-4">Receitas vs Despesas (Últimos Meses)</h3>
          <div className="h-60">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={history} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#171717" vertical={false} />
                <XAxis dataKey="name" stroke="#52525b" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="#52525b" fontSize={12} tickLine={false} axisLine={false} />
                <RechartsTooltip 
                  cursor={{fill: '#171717', opacity: 0.4}}
                  contentStyle={{ backgroundColor: '#171717', borderColor: '#27272a', borderRadius: '8px' }}
                />
                <Bar dataKey="receita" fill="#10b981" radius={[4, 4, 0, 0]} barSize={24} name="Receita" />
                <Bar dataKey="despesa" fill="#f43f5e" radius={[4, 4, 0, 0]} barSize={24} name="Despesa" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Gráfico de Área */}
        <div className="glass rounded-2xl p-6 border border-white/5">
          <h3 className="text-zinc-100 font-medium mb-4">Evolução do Saldo (Mês Atual)</h3>
          <div className="h-60">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={dailyData} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorSaldo" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#171717" vertical={false} />
                <XAxis dataKey="dia" stroke="#52525b" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="#52525b" fontSize={12} tickLine={false} axisLine={false} />
                <RechartsTooltip 
                  contentStyle={{ backgroundColor: '#171717', borderColor: '#27272a', borderRadius: '8px' }}
                  formatter={(value: number) => new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value)}
                />
                <Area type="monotone" dataKey="saldo" stroke="#8b5cf6" strokeWidth={2} fillOpacity={1} fill="url(#colorSaldo)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

      </div>
    </div>
  );
}
