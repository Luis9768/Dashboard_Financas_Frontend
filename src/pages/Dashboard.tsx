import { useEffect, useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import { Plus, Download, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';
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

interface DashboardContext {
  month: number;
  year: number;
}

const MONTH_NAMES = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'];

export function Dashboard() {
  const { month, year } = useOutletContext<DashboardContext>();
  const [isInitialLoad, setIsInitialLoad] = useState(true);
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  const [resumo, setResumo] = useState<ResumoFinanceiroDto>({ totalReceitas: 0, totalDespesas: 0, saldo: 0 });
  const [history, setHistory] = useState<any[]>([]);
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
      setTimeout(() => setIsInitialLoad(false), 800);
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
  }, [month, year]);

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
      
      {/* Page Header */}
      <motion.div 
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-8 gap-4"
      >
        <div>
          <div className="flex items-center gap-2 mb-1">
            <h2 className="text-2xl font-bold text-white tracking-tight">Visão Geral</h2>
            <span className="text-[11px] font-medium text-zinc-500 bg-white/[0.04] border border-white/[0.06] rounded-lg px-2 py-0.5">
              {MONTH_NAMES[month - 1]} {year}
            </span>
          </div>
          <p className="text-[14px] text-zinc-500">Acompanhe suas finanças e tome decisões inteligentes.</p>
        </div>
        <div className="flex gap-2">
          <button 
            onClick={handleDownloadPdf}
            className="flex items-center gap-2 bg-white/[0.04] border border-white/[0.06] hover:bg-white/[0.08] text-zinc-300 px-4 py-2.5 rounded-xl text-[13px] font-medium transition-all"
          >
            <Download size={15} />
            <span className="hidden sm:inline">Exportar</span>
          </button>
          <button 
            onClick={() => setIsModalOpen(true)}
            className="group flex items-center gap-2 bg-white text-background px-4 py-2.5 rounded-xl text-[13px] font-semibold transition-all hover:shadow-[0_0_30px_-8px_rgba(139,92,246,0.4)] hover:scale-[1.02] active:scale-[0.98]"
          >
            <Plus size={15} />
            <span className="hidden sm:inline">Novo Lançamento</span>
          </button>
        </div>
      </motion.div>

      {/* AI Card */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.05 }}
      >
        <AiConsultantCard month={month} year={year} />
      </motion.div>

      {/* Summary Cards */}
      <SummaryCards 
        receitas={resumo.totalReceitas} 
        despesas={resumo.totalDespesas} 
        saldo={resumo.saldoLivre || resumo.saldo} 
        loading={loadingResumo} 
      />

      {/* Vaults */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.2 }}
      >
        <Vaults />
      </motion.div>

      {/* Category Budgets */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.25 }}
      >
        <CategoryBudgets month={month} year={year} />
      </motion.div>

      {/* Charts */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.3 }}
      >
        <DashboardCharts transactions={allTransactions} history={history} />
      </motion.div>

      {/* Transaction Table */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.35 }}
      >
        <TransactionTable 
          transactions={transactions} 
          loading={loadingTx} 
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
          onUpdate={handleTransactionSuccess}
        />
      </motion.div>

      <TransactionModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        onSuccess={handleTransactionSuccess}
      />
    </>
  );
}
