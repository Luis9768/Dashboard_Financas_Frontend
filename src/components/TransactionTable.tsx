import { format, parseISO } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { ListarLancamentosDto } from '../services/api';
import { useState } from 'react';
import { TransactionDetailsModal } from './TransactionDetailsModal';

interface TransactionTableProps {
  transactions: ListarLancamentosDto[];
  loading: boolean;
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  onUpdate: () => void;
}

export function TransactionTable({ transactions, loading, currentPage, totalPages, onPageChange, onUpdate }: TransactionTableProps) {
  const [selectedTx, setSelectedTx] = useState<ListarLancamentosDto | null>(null);

  const formatCurrency = (val: number) => 
    new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(val);

  return (
    <>
      <div className="glass rounded-2xl overflow-hidden border border-white/5">
        <div className="p-6 border-b border-white/10 flex items-center justify-between">
          <h3 className="text-zinc-100 font-medium">Últimos Lançamentos</h3>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-surfaceHighlight/30 text-zinc-400 text-xs uppercase tracking-wider">
                <th className="px-6 py-4 font-medium">Descrição</th>
                <th className="px-6 py-4 font-medium">Categoria</th>
                <th className="px-6 py-4 font-medium">Data</th>
                <th className="px-6 py-4 font-medium">Tipo</th>
                <th className="px-6 py-4 font-medium text-right">Valor</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {loading ? (
                <tr><td colSpan={5} className="px-6 py-8 text-center text-zinc-500">Carregando lançamentos...</td></tr>
              ) : transactions.length === 0 ? (
                <tr><td colSpan={5} className="px-6 py-8 text-center text-zinc-500">Nenhum lançamento encontrado neste mês.</td></tr>
              ) : (
                transactions.map((tx) => (
                  <tr 
                    key={tx.id} 
                    onClick={() => setSelectedTx(tx)}
                    className="hover:bg-surfaceHighlight/50 transition-colors cursor-pointer group"
                  >
                    <td className="px-6 py-4 text-sm font-semibold text-white group-hover:text-primary transition-colors">{tx.descricao}</td>
                    <td className="px-6 py-4 text-sm text-zinc-400">{tx.categoria}</td>
                    <td className="px-6 py-4 text-sm text-zinc-400">
                      {format(parseISO(tx.dataLancamento), "dd 'de' MMM, yyyy", { locale: ptBR })}
                    </td>
                    <td className="px-6 py-4 text-sm">
                      <span className={`px-2.5 py-1 rounded-full text-xs font-medium border ${
                        tx.tipoLancamento === 'RECEITA' 
                          ? 'bg-receita/10 text-receita border-receita/20 shadow-[0_0_10px_rgba(16,185,129,0.2)]' 
                          : 'bg-despesa/10 text-despesa border-despesa/20 shadow-[0_0_10px_rgba(244,63,94,0.2)]'
                      }`}>
                        {tx.tipoLancamento}
                      </span>
                    </td>
                    <td className={`px-6 py-4 text-sm font-bold text-right ${
                      tx.tipoLancamento === 'RECEITA' ? 'text-receita' : 'text-despesa'
                    }`}>
                      {tx.tipoLancamento === 'RECEITA' ? '+' : '-'} {formatCurrency(tx.valor)}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {totalPages > 1 && (
          <div className="p-4 border-t border-white/10 flex items-center justify-between text-sm text-zinc-400 bg-surfaceHighlight/10">
            <div>
              Página {currentPage + 1} de {totalPages}
            </div>
            <div className="flex gap-2">
              <button 
                onClick={() => onPageChange(currentPage - 1)}
                disabled={currentPage === 0}
                className="p-1 rounded hover:bg-surfaceHighlight disabled:opacity-50 transition-colors"
              >
                <ChevronLeft size={20} />
              </button>
              <button 
                onClick={() => onPageChange(currentPage + 1)}
                disabled={currentPage >= totalPages - 1}
                className="p-1 rounded hover:bg-surfaceHighlight disabled:opacity-50 transition-colors"
              >
                <ChevronRight size={20} />
              </button>
            </div>
          </div>
        )}
      </div>

      <TransactionDetailsModal 
        isOpen={!!selectedTx} 
        onClose={() => setSelectedTx(null)} 
        transaction={selectedTx} 
        onUpdate={onUpdate}
      />
    </>
  );
}
