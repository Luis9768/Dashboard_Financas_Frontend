import { useState, useEffect } from 'react';
import { MetaService } from '../services/api';
import { AlertTriangle, AlertCircle, X } from 'lucide-react';

interface AlertBannerProps {
  month: number;
  year: number;
}

export function AlertBanner({ month, year }: AlertBannerProps) {
  const [alerts, setAlerts] = useState<{ id: number, type: 'WARNING' | 'CRITICAL', msg: string }[]>([]);

  useEffect(() => {
    const fetchMetasAndAnalyze = async () => {
      try {
        const metas = await MetaService.listarProgresso(month, year);
        const newAlerts: { id: number, type: 'WARNING' | 'CRITICAL', msg: string }[] = [];
        
        metas.forEach(meta => {
          if (meta.percentualGasto >= 100) {
            newAlerts.push({
              id: meta.categoriaId,
              type: 'CRITICAL',
              msg: `Você ultrapassou sua meta de gastos em ${meta.categoriaNome}! (Estourou em R$ ${(meta.valorGasto - meta.valorLimite).toFixed(2)})`
            });
          } else if (meta.percentualGasto >= 80) {
            newAlerts.push({
              id: meta.categoriaId,
              type: 'WARNING',
              msg: `Atenção: Você já gastou ${meta.percentualGasto.toFixed(1)}% da sua meta em ${meta.categoriaNome}.`
            });
          }
        });

        setAlerts(newAlerts);
      } catch (e) {
        console.error("Erro ao analisar metas", e);
      }
    };

    fetchMetasAndAnalyze();
  }, [month, year]);

  if (alerts.length === 0) return null;

  return (
    <div className="mb-8 space-y-3">
      {alerts.map(alert => (
        <div 
          key={alert.id} 
          className={`flex items-start justify-between p-4 rounded-xl border animate-in fade-in slide-in-from-top-4 ${
            alert.type === 'CRITICAL' 
              ? 'bg-rose-500/10 border-rose-500/30 text-rose-400' 
              : 'bg-amber-500/10 border-amber-500/30 text-amber-400'
          }`}
        >
          <div className="flex items-center gap-3">
            {alert.type === 'CRITICAL' ? <AlertCircle size={20} /> : <AlertTriangle size={20} />}
            <span className="text-sm font-medium">{alert.msg}</span>
          </div>
          <button 
            onClick={() => setAlerts(alerts.filter(a => a.id !== alert.id))}
            className="opacity-70 hover:opacity-100 transition-opacity"
          >
            <X size={16} />
          </button>
        </div>
      ))}
    </div>
  );
}
