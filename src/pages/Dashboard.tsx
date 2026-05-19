import { useEffect, useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import { Plus } from 'lucide-react';
import { SummaryCards } from '../components/SummaryCards';
import { DashboardCharts } from '../components/DashboardCharts';
import { TransactionTable } from '../components/TransactionTable';
import { TransactionModal } from '../components/TransactionModal';
import { SplashScreen } from '../components/SplashScreen';
import { LancamentoService, ListarLancamentosDto, ResumoFinanceiroDto } from '../services/api';
import { CategoryBudgets } from '../components/CategoryBudgets';
import { Vaults } from '../components/Vaults';
import { AiConsultantCard } from '../components/AiConsultantCard';
import { AlertBanner } from '../components/AlertBanner';
import { Download } from 'lucide-react';

interface DashboardContext {
  month: number;
  year: number;
}

export function Dashboard() {
  const { month, year } = useOutletContext<DashboardContext>();
  const [isInitialLoad, setIsInitialLoad] = useState(true);
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  const [resumo, setResumo] = useState<ResumoFinanceiroDto>({ totalReceitas: 0, totalDespesas: 0, saldo: 0 });
  const [history, setHistory] = useState<any[]>([]); // Histórico de meses para o gráfico de barras
  const [loadingResumo, setLoadingResumo] = useState(false);
  
  const [transactions, setTransactions] = useState<ListarLancamentosDto[]>([]);
  const [loadingTx, setLoadingTx] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(1);

  const [allTransactions, setAllTransactions] = useState<ListarLancamentosDto[]>([]);

  const fetchDashboardData = async () => {
    setLoadingResumo(true);
    try {
      const data = await LancamentoService.getResumo(month, year);
      setResumo(data);

      // Busca o histórico dos últimos 4 meses
      const monthNames = ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'];
      const historyPromises = [];
      for (let i = 3; i >= 0; i--) {
        let m = month - i;
        let y = year;
        if (m < 1) { m += 12; y -= 1; }
        historyPromises.push(
          LancamentoService.getResumo(m, y).then(res => ({
            name: monthNames[m - 1],
            receita: res.totalReceitas,
            despesa: res.totalDespesas
          })).catch(() => ({ name: monthNames[m - 1], receita: 0, despesa: 0 }))
        );
      }
      const historyData = await Promise.all(historyPromises);
      setHistory(historyData);
    } catch (err) {
      console.error("Erro ao buscar resumo", err);
    } finally {
      setLoadingResumo(false);
      setTimeout(() => setIsInitialLoad(false), 800); // Dá um tempinho extra para a animação brilhar
    }
  };

  const fetchTransactions = async () => {
    setLoadingTx(true);
    try {
      const resp = await LancamentoService.listar(month, year, currentPage, 10);
      setTransactions(resp.conteudo);
      setTotalPages(resp.totalPaginas);
      
      const allResp = await LancamentoService.listar(month, year, 0, 1000);
      setAllTransactions(allResp.conteudo);
    } catch (err) {
      console.error("Erro ao buscar transações", err);
    } finally {
      setLoadingTx(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();
    fetchTransactions(0);
  }, [month, year]); // Atualiza quando os filtros do Header mudam

  const handleTransactionSuccess = () => {
    fetchDashboardData();
    setCurrentPage(0);
    fetchTransactions();
  };

  const handleDownloadPdf = async () => {
    try {
      const blob = await LancamentoService.exportarPdf(month, year);
      const url = window.URL.createObjectURL(new Blob([blob]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `relatorio-${month}-${year}.pdf`);
      document.body.appendChild(link);
      link.click();
      link.parentNode?.removeChild(link);
    } catch (e) {
      alert("Erro ao baixar PDF");
    }
  };

  return (
    <>
      {isInitialLoad && <SplashScreen />}
      <AlertBanner month={month} year={year} />
      
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-2xl font-bold text-white tracking-tight">Visão Geral</h2>
          <p className="text-zinc-400 mt-1">Acompanhe suas finanças deste mês.</p>
        </div>
        <div className="flex gap-3">
          <button 
            onClick={handleDownloadPdf}
            className="bg-surfaceHighlight hover:bg-white/10 text-white px-4 py-2.5 rounded-lg font-medium transition-all flex items-center gap-2 border border-white/10"
          >
            <Download size={20} />
            <span className="hidden sm:inline">Exportar PDF</span>
          </button>
          <button 
            onClick={() => setIsModalOpen(true)}
            className="bg-primary hover:bg-primaryDark text-white px-4 py-2.5 rounded-lg font-medium transition-all shadow-neon-primary flex items-center gap-2"
          >
            <Plus size={20} />
            <span className="hidden sm:inline">Novo Lançamento</span>
          </button>
        </div>
      </div>

      <AiConsultantCard month={month} year={year} />

      <SummaryCards 
        receitas={resumo.totalReceitas} 
        despesas={resumo.totalDespesas} 
        saldo={resumo.saldoLivre || resumo.saldo} 
        loading={loadingResumo} 
      />

      <Vaults />

      <CategoryBudgets month={month} year={year} />

      <DashboardCharts transactions={allTransactions} history={history} />

      <TransactionTable 
        transactions={transactions} 
        loading={loadingTx} 
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
        onUpdate={handleTransactionSuccess}
      />

      <TransactionModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        onSuccess={handleTransactionSuccess}
      />
    </>
  );
}
