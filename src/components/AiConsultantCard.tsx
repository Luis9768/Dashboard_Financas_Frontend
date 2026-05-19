import { useState } from 'react';
import { AiService } from '../services/api';
import { Sparkles } from 'lucide-react';

interface AiConsultantCardProps {
  month: number;
  year: number;
}

export function AiConsultantCard({ month, year }: AiConsultantCardProps) {
  const [dicas, setDicas] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const fetchDicas = async () => {
    setLoading(true);
    try {
      const data = await AiService.obterDicas(month, year);
      setDicas(data.dicas);
    } catch (e) {
      setDicas("Não foi possível carregar as dicas no momento. Verifique se sua chave da API está configurada no backend.");
    } finally {
      setLoading(false);
    }
  };

  // Função simples para formatar o negrito (**) que o Gemini retorna
  const formatText = (text: string) => {
    const parts = text.split(/(\*\*.*?\*\*)/g);
    return parts.map((part, i) => {
      if (part.startsWith('**') && part.endsWith('**')) {
        return <strong key={i} className="text-indigo-300">{part.slice(2, -2)}</strong>;
      }
      return <span key={i}>{part}</span>;
    });
  };

  return (
    <div className="glass rounded-2xl p-6 border border-indigo-500/30 shadow-[0_0_15px_rgba(99,102,241,0.15)] mb-8 relative overflow-hidden group">
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500" />
      
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-indigo-500/20 text-indigo-400 flex items-center justify-center">
            <Sparkles size={20} className={loading ? "animate-pulse" : ""} />
          </div>
          <div>
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              Gemini AI
              <span className="text-[10px] bg-indigo-500 text-white px-2 py-0.5 rounded-full uppercase tracking-wider">Beta</span>
            </h3>
            <p className="text-sm text-zinc-400">Seu consultor financeiro inteligente</p>
          </div>
        </div>
        
        {!dicas && !loading && (
          <button 
            onClick={fetchDicas}
            className="text-sm bg-indigo-500 hover:bg-indigo-600 text-white px-4 py-2 rounded-lg font-medium transition-colors shadow-neon-primary"
          >
            Analisar Minhas Finanças
          </button>
        )}
      </div>

      {loading && (
        <div className="py-6 flex flex-col items-center justify-center text-indigo-400">
          <div className="flex gap-1 mb-3">
            <div className="w-2 h-2 rounded-full bg-indigo-500 animate-bounce" style={{ animationDelay: '0ms' }} />
            <div className="w-2 h-2 rounded-full bg-indigo-500 animate-bounce" style={{ animationDelay: '150ms' }} />
            <div className="w-2 h-2 rounded-full bg-indigo-500 animate-bounce" style={{ animationDelay: '300ms' }} />
          </div>
          <p className="text-sm animate-pulse">A IA está analisando seus gastos deste mês...</p>
        </div>
      )}

      {dicas && !loading && (
        <div className="mt-4 p-4 bg-indigo-950/30 rounded-xl border border-indigo-500/20 text-sm text-zinc-300 leading-relaxed whitespace-pre-wrap">
          {formatText(dicas)}
          <div className="mt-4 flex justify-end">
             <button onClick={fetchDicas} className="text-xs text-indigo-400 hover:text-indigo-300 flex items-center gap-1">
               <Sparkles size={12}/> Gerar nova análise
             </button>
          </div>
        </div>
      )}
    </div>
  );
}
