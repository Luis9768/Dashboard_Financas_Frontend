import { useState, useEffect } from 'react';
import { CaixinhaService } from '../services/api';
import { Package, Plus, ArrowUpRight, ArrowDownRight } from 'lucide-react';

export function Vaults() {
  const [caixinhas, setCaixinhas] = useState<any[]>([]);
  const [isCreating, setIsCreating] = useState(false);
  const [nome, setNome] = useState('');
  const [objetivo, setObjetivo] = useState('');
  
  const [activeVault, setActiveVault] = useState<number | null>(null);
  const [valorMovimentacao, setValorMovimentacao] = useState('');

  useEffect(() => {
    fetchCaixinhas();
  }, []);

  const fetchCaixinhas = async () => {
    try {
      const data = await CaixinhaService.listar();
      setCaixinhas(data);
    } catch (e) {
      console.error(e);
    }
  };

  const handleCriar = async () => {
    if (!nome) return;
    try {
      await CaixinhaService.criar({ nome, objetivo });
      setNome(''); setObjetivo(''); setIsCreating(false);
      fetchCaixinhas();
    } catch (e) {
      alert("Erro ao criar caixinha");
    }
  };

  const handleMovimentacao = async (id: number, tipo: 'DEPOSITAR' | 'RESGATAR') => {
    if (!valorMovimentacao || Number(valorMovimentacao) <= 0) return;
    try {
      if (tipo === 'DEPOSITAR') {
        await CaixinhaService.depositar(id, Number(valorMovimentacao));
      } else {
        await CaixinhaService.resgatar(id, Number(valorMovimentacao));
      }
      setValorMovimentacao('');
      setActiveVault(null);
      fetchCaixinhas();
      window.location.reload(); // Recarrega para atualizar o Saldo Global
    } catch (e: any) {
      alert(e.response?.data?.message || "Erro na movimentação");
    }
  };

  return (
    <div className="glass rounded-2xl p-6 border border-white/5 mb-8">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-orange-500/20 text-orange-400 flex items-center justify-center">
            <Package size={20} />
          </div>
          <div>
            <h3 className="text-lg font-bold text-white">Caixinhas</h3>
            <p className="text-sm text-zinc-400">Guarde dinheiro para objetivos específicos</p>
          </div>
        </div>
        <button 
          onClick={() => setIsCreating(!isCreating)}
          className="text-sm text-orange-400 hover:text-white transition-colors flex items-center gap-1 bg-surfaceHighlight px-3 py-1.5 rounded-lg border border-orange-500/20"
        >
          <Plus size={16} /> Nova Caixinha
        </button>
      </div>

      {isCreating && (
        <div className="flex gap-3 mb-6 p-4 bg-surfaceHighlight/30 rounded-xl border border-white/5">
          <input 
            placeholder="Nome (ex: Viagem)" value={nome} onChange={e => setNome(e.target.value)}
            className="flex-1 bg-surfaceHighlight border border-white/10 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-orange-500"
          />
          <input 
            placeholder="Objetivo" value={objetivo} onChange={e => setObjetivo(e.target.value)}
            className="flex-1 bg-surfaceHighlight border border-white/10 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-orange-500"
          />
          <button onClick={handleCriar} className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors">
            Criar
          </button>
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {caixinhas.map(c => (
          <div key={c.id} className="bg-surfaceHighlight/50 border border-white/5 rounded-xl p-4 flex flex-col justify-between group hover:border-orange-500/30 transition-colors">
            <div>
              <h4 className="text-white font-medium mb-1">{c.nome}</h4>
              <p className="text-xs text-zinc-400 mb-3">{c.objetivo || 'Sem objetivo definido'}</p>
              <p className="text-2xl font-bold text-orange-400 mb-4">R$ {c.saldoAtual.toFixed(2)}</p>
            </div>
            
            {activeVault === c.id ? (
              <div className="flex flex-col gap-2">
                <input 
                  type="number" placeholder="Valor R$" value={valorMovimentacao} onChange={e => setValorMovimentacao(e.target.value)}
                  className="w-full bg-background border border-white/10 rounded px-2 py-1.5 text-white text-sm"
                />
                <div className="flex gap-2">
                  <button onClick={() => handleMovimentacao(c.id, 'RESGATAR')} className="flex-1 text-xs bg-white/5 hover:bg-white/10 text-white py-1.5 rounded flex items-center justify-center gap-1">
                    <ArrowDownRight size={14}/> Resgatar
                  </button>
                  <button onClick={() => handleMovimentacao(c.id, 'DEPOSITAR')} className="flex-1 text-xs bg-orange-500/20 hover:bg-orange-500/30 text-orange-400 py-1.5 rounded flex items-center justify-center gap-1">
                    <ArrowUpRight size={14}/> Guardar
                  </button>
                </div>
              </div>
            ) : (
              <button onClick={() => setActiveVault(c.id)} className="w-full py-2 rounded-lg bg-white/5 hover:bg-white/10 text-sm text-zinc-300 font-medium transition-colors">
                Movimentar
              </button>
            )}
          </div>
        ))}
        {caixinhas.length === 0 && !isCreating && (
          <p className="text-zinc-500 text-sm col-span-3 text-center py-4">Você ainda não tem caixinhas.</p>
        )}
      </div>
    </div>
  );
}
