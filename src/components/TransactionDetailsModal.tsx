import { useState, useEffect } from 'react';
import { X, ArrowDownCircle, ArrowUpCircle, Calendar, Clock, Tag, FileText, Trash2, Edit2, Loader2, Save } from 'lucide-react';
import { ListarLancamentosDto, LancamentoService, CategoriaService, ListarCategoriaDto } from '../services/api';
import { format, parseISO } from 'date-fns';
import { ptBR } from 'date-fns/locale';

interface TransactionDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  transaction: ListarLancamentosDto | null;
  onUpdate: () => void;
}

export function TransactionDetailsModal({ isOpen, onClose, transaction, onUpdate }: TransactionDetailsModalProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [categorias, setCategorias] = useState<ListarCategoriaDto[]>([]);
  const [loading, setLoading] = useState(false);
  
  // Form State
  const [descricao, setDescricao] = useState('');
  const [valor, setValor] = useState(0);
  const [dataLancamento, setDataLancamento] = useState('');
  const [categoriaId, setCategoriaId] = useState<number>(0);

  useEffect(() => {
    if (isOpen && transaction) {
      setIsEditing(false);
      setDescricao(transaction.descricao);
      setValor(transaction.valor);
      setDataLancamento(transaction.dataLancamento);
      // We only have categoria string in transaction, so we need to fetch categories to map to ID
      CategoriaService.listar().then(res => {
        setCategorias(res);
        const cat = res.find(c => c.nome === transaction.categoria);
        if (cat) setCategoriaId(cat.id);
      });
    }
  }, [isOpen, transaction]);

  if (!isOpen || !transaction) return null;

  const isReceita = transaction.tipoLancamento === 'RECEITA';

  const handleDelete = async () => {
    if (window.confirm("Tem certeza que deseja excluir este lançamento? Esta ação não pode ser desfeita.")) {
      setLoading(true);
      try {
        await LancamentoService.deletar(transaction.id);
        onUpdate();
        onClose();
      } catch (err) {
        alert("Erro ao excluir lançamento.");
      } finally {
        setLoading(false);
      }
    }
  };

  const handleSave = async () => {
    if (!descricao || !valor || !dataLancamento || !categoriaId) {
      alert("Preencha todos os campos!");
      return;
    }
    setLoading(true);
    try {
      await LancamentoService.atualizar(transaction.id, {
        descricao,
        valor,
        dataLancamento,
        categoriaId
      });
      onUpdate();
      onClose(); // Fechar para forçar refresh da interface
    } catch (err) {
      alert("Erro ao atualizar lançamento.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={onClose} />
      
      <div className="glass w-full max-w-md rounded-2xl relative z-10 animate-in fade-in zoom-in-95 duration-200 border border-white/5 overflow-hidden">
        
        {/* Header com cor dinâmica */}
        <div className={`p-6 border-b border-white/10 relative overflow-hidden`}>
          <div className={`absolute top-0 right-0 w-32 h-32 blur-[60px] opacity-30 rounded-full pointer-events-none ${isReceita ? 'bg-receita' : 'bg-despesa'}`} />
          
          <div className="flex items-start justify-between relative z-10">
            <div className="flex items-center gap-4">
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center shadow-lg ${isReceita ? 'bg-receita/20 text-receita shadow-neon-receita' : 'bg-despesa/20 text-despesa shadow-neon-despesa'}`}>
                {isReceita ? <ArrowUpCircle size={28} /> : <ArrowDownCircle size={28} />}
              </div>
              <div>
                <span className={`text-xs font-bold uppercase tracking-wider ${isReceita ? 'text-receita' : 'text-despesa'}`}>
                  {isReceita ? 'Entrada' : 'Saída'} {isEditing && ' - Editando'}
                </span>
                {!isEditing ? (
                  <h2 className="text-2xl font-bold text-white mt-1 break-all">
                    {isReceita ? '+' : '-'} {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(transaction.valor)}
                  </h2>
                ) : (
                  <div className="mt-1">
                    <input 
                      type="number" 
                      value={valor}
                      onChange={e => setValor(Number(e.target.value))}
                      className="w-full bg-surfaceHighlight/50 border border-white/10 rounded-lg px-3 py-1.5 text-lg font-bold text-white focus:outline-none focus:border-primary"
                    />
                  </div>
                )}
              </div>
            </div>
            <button onClick={onClose} className="p-2 hover:bg-white/10 rounded-lg transition-colors text-zinc-400 hover:text-white">
              <X size={20} />
            </button>
          </div>
        </div>

        <div className="p-6 space-y-6">
          <div className="space-y-4">
            
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-lg bg-surfaceHighlight flex items-center justify-center text-zinc-400 shrink-0">
                <FileText size={16} />
              </div>
              <div className="w-full">
                <p className="text-xs text-zinc-500 uppercase tracking-wider font-medium">Descrição</p>
                {!isEditing ? (
                  <p className="text-zinc-100 font-medium mt-0.5">{transaction.descricao}</p>
                ) : (
                  <input 
                    type="text" 
                    value={descricao}
                    onChange={e => setDescricao(e.target.value)}
                    className="w-full bg-surfaceHighlight/50 border border-white/10 rounded-lg px-3 py-1.5 mt-1 text-sm text-zinc-100 focus:outline-none focus:border-primary"
                  />
                )}
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-lg bg-surfaceHighlight flex items-center justify-center text-zinc-400 shrink-0">
                <Tag size={16} />
              </div>
              <div className="w-full">
                <p className="text-xs text-zinc-500 uppercase tracking-wider font-medium">Categoria</p>
                {!isEditing ? (
                  <p className="text-zinc-100 mt-0.5">{transaction.categoria}</p>
                ) : (
                  <select 
                    value={categoriaId}
                    onChange={e => setCategoriaId(Number(e.target.value))}
                    className="w-full bg-surfaceHighlight/50 border border-white/10 rounded-lg px-3 py-1.5 mt-1 text-sm text-zinc-100 focus:outline-none focus:border-primary"
                  >
                    <option value={0}>Selecione...</option>
                    {categorias.map(c => (
                      <option key={c.id} value={c.id}>{c.nome}</option>
                    ))}
                  </select>
                )}
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-lg bg-surfaceHighlight flex items-center justify-center text-zinc-400 shrink-0">
                <Calendar size={16} />
              </div>
              <div className="w-full">
                <p className="text-xs text-zinc-500 uppercase tracking-wider font-medium">Data</p>
                {!isEditing ? (
                  <p className="text-zinc-100 mt-0.5">
                    {format(parseISO(transaction.dataLancamento), "dd 'de' MMMM 'de' yyyy", { locale: ptBR })}
                  </p>
                ) : (
                  <input 
                    type="date" 
                    value={dataLancamento}
                    onChange={e => setDataLancamento(e.target.value)}
                    className="w-full bg-surfaceHighlight/50 border border-white/10 rounded-lg px-3 py-1.5 mt-1 text-sm text-zinc-100 focus:outline-none focus:border-primary"
                  />
                )}
              </div>
            </div>
          </div>

          <div className="pt-6 border-t border-white/5 flex flex-col gap-4">
            
            {!isEditing && (
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-xs text-zinc-500">
                  <Clock size={14} />
                  <span>Criado em: {transaction.horaCriacao ? transaction.horaCriacao : 'Desconhecido'}</span>
                </div>
                {transaction.horaAlteracao && transaction.horaAlteracao !== transaction.horaCriacao && (
                  <div className="flex items-center gap-2 text-xs text-zinc-500">
                    <Clock size={14} />
                    <span>Última alteração: {transaction.horaAlteracao}</span>
                  </div>
                )}
              </div>
            )}

            <div className="flex items-center gap-2">
              {!isEditing ? (
                <>
                  <button 
                    onClick={() => setIsEditing(true)}
                    className="flex-1 flex items-center justify-center gap-2 bg-surfaceHighlight hover:bg-white/10 text-white font-medium py-2 rounded-lg transition-colors"
                  >
                    <Edit2 size={16} /> Editar
                  </button>
                  <button 
                    onClick={handleDelete}
                    disabled={loading}
                    className="flex-1 flex items-center justify-center gap-2 bg-despesa/10 hover:bg-despesa/20 text-despesa font-medium py-2 rounded-lg transition-colors"
                  >
                    {loading ? <Loader2 className="animate-spin" size={16} /> : <><Trash2 size={16} /> Excluir</>}
                  </button>
                </>
              ) : (
                <>
                  <button 
                    onClick={() => setIsEditing(false)}
                    className="flex-1 bg-surfaceHighlight hover:bg-white/10 text-white font-medium py-2 rounded-lg transition-colors"
                  >
                    Cancelar
                  </button>
                  <button 
                    onClick={handleSave}
                    disabled={loading}
                    className="flex-1 flex items-center justify-center gap-2 bg-primary hover:bg-primaryDark text-white font-medium py-2 rounded-lg transition-colors shadow-neon-primary"
                  >
                    {loading ? <Loader2 className="animate-spin" size={16} /> : <><Save size={16} /> Salvar</>}
                  </button>
                </>
              )}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
