import { X, Plus } from 'lucide-react';
import { useState, useEffect } from 'react';
import { LancamentoService, CategoriaService, ListarCategoriaDto } from '../services/api';
import { format } from 'date-fns';

interface TransactionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export function TransactionModal({ isOpen, onClose, onSuccess }: TransactionModalProps) {
  const [tipo, setTipo] = useState<'RECEITA' | 'DESPESA'>('DESPESA');
  const [descricao, setDescricao] = useState('');
  const [valor, setValor] = useState('');
  const [data, setData] = useState(format(new Date(), 'yyyy-MM-dd'));
  const [categoriaId, setCategoriaId] = useState('');
  const [recorrente, setRecorrente] = useState(false);
  
  const [categorias, setCategorias] = useState<ListarCategoriaDto[]>([]);
  const [novaCategoria, setNovaCategoria] = useState('');
  const [isCriandoCategoria, setIsCriandoCategoria] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isOpen) {
      carregarCategorias();
    }
  }, [isOpen]);

  const carregarCategorias = async () => {
    try {
      const data = await CategoriaService.listar();
      setCategorias(data);
      if (data.length > 0) setCategoriaId(data[0].id.toString());
    } catch (e) {
      console.error("Erro ao listar categorias", e);
    }
  };

  const handleCriarCategoria = async () => {
    if (!novaCategoria.trim()) return;
    try {
      const cat = await CategoriaService.criar({ nome: novaCategoria });
      await carregarCategorias(); // Recarrega lista
      // Em teoria o backend retorna o ID ou podemos buscar novamente. A API atual não retorna o ID completo no CriarCategoriaDto se o backend não retornar. 
      // Mas o carregarCategorias vai buscar.
      setIsCriandoCategoria(false);
      setNovaCategoria('');
    } catch (e) {
      console.error("Erro ao criar categoria", e);
    }
  };

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const payload = {
        descricao,
        valor: Number(valor),
        dataLancamento: data,
        categoriaId: Number(categoriaId),
        recorrente
      };

      if (tipo === 'RECEITA') {
        await LancamentoService.criarReceita(payload);
      } else {
        await LancamentoService.criarDespesa(payload);
      }

      onSuccess();
      onClose();
    } catch (error) {
      console.error("Erro ao salvar lançamento", error);
      alert("Erro ao salvar lançamento. Verifique o console.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={onClose} />
      
      <div className="glass w-full max-w-md rounded-2xl relative z-10 animate-in fade-in zoom-in-95 duration-200 border border-white/5">
        <div className="flex items-center justify-between p-6 border-b border-white/10">
          <h2 className="text-xl font-semibold text-white">Novo Lançamento</h2>
          <button onClick={onClose} className="p-2 hover:bg-surfaceHighlight rounded-lg transition-colors text-zinc-400 hover:text-white">
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-5">
          <div className="flex gap-4 p-1 bg-surfaceHighlight/50 rounded-lg">
            <button
              type="button"
              onClick={() => setTipo('DESPESA')}
              className={`flex-1 py-2 text-sm font-medium rounded-md transition-all ${
                tipo === 'DESPESA' ? 'bg-despesa text-white shadow-neon-despesa' : 'text-zinc-400 hover:text-white'
              }`}
            >
              Despesa
            </button>
            <button
              type="button"
              onClick={() => setTipo('RECEITA')}
              className={`flex-1 py-2 text-sm font-medium rounded-md transition-all ${
                tipo === 'RECEITA' ? 'bg-receita text-white shadow-neon-receita' : 'text-zinc-400 hover:text-white'
              }`}
            >
              Receita
            </button>
          </div>

          <div>
            <label className="block text-sm font-medium text-zinc-400 mb-1.5">Descrição</label>
            <input
              required
              value={descricao}
              onChange={e => setDescricao(e.target.value)}
              className="w-full bg-surfaceHighlight border border-white/10 rounded-lg px-4 py-2.5 text-zinc-100 focus:outline-none focus:border-primary transition-colors"
              placeholder="Ex: Supermercado"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-zinc-400 mb-1.5">Valor (R$)</label>
              <input
                type="number"
                step="0.01"
                required
                value={valor}
                onChange={e => setValor(e.target.value)}
                className="w-full bg-surfaceHighlight border border-white/10 rounded-lg px-4 py-2.5 text-zinc-100 focus:outline-none focus:border-primary transition-colors"
                placeholder="0.00"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-zinc-400 mb-1.5">Data</label>
              <input
                type="date"
                required
                value={data}
                onChange={e => setData(e.target.value)}
                className="w-full bg-surfaceHighlight border border-white/10 rounded-lg px-4 py-2.5 text-zinc-100 focus:outline-none focus:border-primary transition-colors [color-scheme:dark]"
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="block text-sm font-medium text-zinc-400">Categoria</label>
              <button 
                type="button" 
                onClick={() => setIsCriandoCategoria(!isCriandoCategoria)}
                className="text-xs text-primary hover:text-white transition-colors flex items-center gap-1"
              >
                <Plus size={12}/> Nova
              </button>
            </div>
            
            {isCriandoCategoria ? (
              <div className="flex gap-2">
                <input
                  value={novaCategoria}
                  onChange={e => setNovaCategoria(e.target.value)}
                  className="flex-1 bg-surfaceHighlight border border-white/10 rounded-lg px-4 py-2.5 text-zinc-100 focus:outline-none focus:border-primary transition-colors text-sm"
                  placeholder="Nome da categoria"
                />
                <button type="button" onClick={handleCriarCategoria} className="bg-primary hover:bg-primaryDark text-white px-4 rounded-lg font-medium shadow-neon-primary text-sm">
                  Criar
                </button>
              </div>
            ) : (
              <select
                required
                value={categoriaId}
                onChange={e => setCategoriaId(e.target.value)}
                className="w-full bg-surfaceHighlight border border-white/10 rounded-lg px-4 py-2.5 text-zinc-100 focus:outline-none focus:border-primary transition-colors appearance-none"
              >
                {categorias.map(cat => (
                  <option key={cat.id} value={cat.id}>{cat.nome}</option>
                ))}
              </select>
            )}
          </div>

          <label className="flex items-center gap-2 text-sm text-zinc-300 cursor-pointer hover:text-white transition-colors">
            <input 
              type="checkbox" 
              checked={recorrente}
              onChange={(e) => setRecorrente(e.target.checked)}
              className="rounded border-white/10 bg-surfaceHighlight text-primary focus:ring-primary focus:ring-offset-0 focus:ring-offset-background"
            />
            Repetir mensalmente por 1 ano
          </label>

          <div className="pt-4 flex gap-3">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-2.5 rounded-lg border border-white/10 text-zinc-300 font-medium hover:bg-surfaceHighlight transition-colors"
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={loading || (!categoriaId && !isCriandoCategoria)}
              className="flex-1 px-4 py-2.5 rounded-lg bg-primary hover:bg-primaryDark text-white font-medium transition-all shadow-neon-primary disabled:opacity-50"
            >
              {loading ? 'Salvando...' : 'Salvar'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
