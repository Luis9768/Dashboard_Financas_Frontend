import { useState, useEffect } from 'react';
import { MetaService, CategoriaService } from '../services/api';
import { Target, Plus } from 'lucide-react';

interface CategoryBudgetsProps {
  month: number;
  year: number;
}

export function CategoryBudgets({ month, year }: CategoryBudgetsProps) {
  const [metas, setMetas] = useState<any[]>([]);
  const [categorias, setCategorias] = useState<any[]>([]);
  const [isDefining, setIsDefining] = useState(false);
  const [selectedCat, setSelectedCat] = useState('');
  const [valorLimite, setValorLimite] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchMetas();
    CategoriaService.listar().then(setCategorias);
  }, [month, year]);

  const fetchMetas = async () => {
    try {
      const data = await MetaService.listarProgresso(month, year);
      setMetas(data);
    } catch (e) {
      console.error(e);
    }
  };

  const handleDefinir = async () => {
    if (!selectedCat || !valorLimite) return;
    setLoading(true);
    try {
      await MetaService.definirMeta({
        categoriaId: Number(selectedCat),
        mes: month,
        ano: year,
        valorLimite: Number(valorLimite)
      });
      setIsDefining(false);
      setValorLimite('');
      fetchMetas();
    } catch (e) {
      alert("Erro ao definir meta");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="glass rounded-2xl p-6 border border-white/5 mb-8">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-purple-500/20 text-purple-400 flex items-center justify-center">
            <Target size={20} />
          </div>
          <div>
            <h3 className="text-lg font-bold text-white">Metas de Gastos</h3>
            <p className="text-sm text-zinc-400">Progresso do orçamento por categoria</p>
          </div>
        </div>
        <button 
          onClick={() => setIsDefining(!isDefining)}
          className="text-sm text-primary hover:text-white transition-colors flex items-center gap-1 bg-surfaceHighlight px-3 py-1.5 rounded-lg"
        >
          <Plus size={16} /> Definir Meta
        </button>
      </div>

      {isDefining && (
        <div className="flex gap-3 mb-6 p-4 bg-surfaceHighlight/30 rounded-xl border border-white/5">
          <select 
            value={selectedCat} onChange={e => setSelectedCat(e.target.value)}
            className="flex-1 bg-surfaceHighlight border border-white/10 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-primary"
          >
            <option value="">Selecione a Categoria</option>
            {categorias.map(c => <option key={c.id} value={c.id}>{c.nome}</option>)}
          </select>
          <input 
            type="number" placeholder="Limite (R$)" value={valorLimite} onChange={e => setValorLimite(e.target.value)}
            className="w-32 bg-surfaceHighlight border border-white/10 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-primary"
          />
          <button onClick={handleDefinir} disabled={loading} className="bg-primary text-white px-4 py-2 rounded-lg text-sm font-medium">
            Salvar
          </button>
        </div>
      )}

      <div className="space-y-5">
        {metas.length === 0 && !isDefining && (
          <p className="text-center text-zinc-500 text-sm py-4">Nenhuma meta definida para este mês.</p>
        )}
        {metas.map(meta => {
          const pct = Math.min(meta.percentualGasto, 100);
          let barColor = 'bg-emerald-500';
          if (meta.percentualGasto > 80) barColor = 'bg-amber-500';
          if (meta.percentualGasto > 100) barColor = 'bg-rose-500';

          return (
            <div key={meta.categoriaId}>
              <div className="flex justify-between text-sm mb-1.5">
                <span className="text-zinc-300 font-medium">{meta.categoriaNome}</span>
                <span className="text-zinc-400">
                  <span className={meta.percentualGasto > 100 ? 'text-rose-400 font-bold' : 'text-white'}>
                    R$ {meta.valorGasto.toFixed(2)}
                  </span>
                  {' '} / R$ {meta.valorLimite.toFixed(2)}
                </span>
              </div>
              <div className="h-2 w-full bg-surfaceHighlight rounded-full overflow-hidden">
                <div 
                  className={`h-full ${barColor} transition-all duration-1000 ease-out`}
                  style={{ width: `${pct}%` }}
                />
              </div>
              {meta.percentualGasto > 100 && (
                <p className="text-xs text-rose-400 mt-1">Limite excedido em R$ {(meta.valorGasto - meta.valorLimite).toFixed(2)}</p>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
