import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Wallet, Loader2 } from 'lucide-react';
import { AuthService } from '../services/api';
import { cn } from '../utils/cn';

export function Login() {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await AuthService.login({ email, senha });
      localStorage.setItem('@FinanceApp:token', response.token);
      navigate('/dashboard');
    } catch (err: any) {
      console.error("Erro no login:", err);
      if (err.code === 'ERR_NETWORK') {
        setError('Erro de conexão: O backend não está respondendo. Verifique o Docker/Porta.');
      } else if (err.response?.status === 403 || err.response?.status === 401 || err.response?.status === 400) {
        setError('E-mail ou senha incorretos. Tente novamente.');
      } else {
        setError(err.response?.data?.message || 'Ocorreu um erro inesperado ao fazer login.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4 relative overflow-hidden">
      {/* Decoração de fundo sutil */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/20 rounded-full blur-[120px] pointer-events-none" />

      <div className={cn("glass w-full max-w-md p-8 rounded-2xl z-10")}>
        <div className="flex flex-col items-center mb-8">
          <div className="w-12 h-12 bg-primary/20 text-primary rounded-xl flex items-center justify-center mb-4">
            <Wallet size={28} />
          </div>
          <h1 className="text-2xl font-bold text-white">Bem-vindo de volta</h1>
          <p className="text-zinc-400 mt-1">Acesse seu dashboard financeiro</p>
        </div>

        {error && (
          <div className="bg-despesa/10 border border-despesa/20 text-despesa px-4 py-3 rounded-lg mb-6 text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-zinc-400 mb-1.5">
              E-mail
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-surfaceHighlight border border-white/10 rounded-lg px-4 py-2.5 text-zinc-100 placeholder:text-zinc-600 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all"
              placeholder="seu@email.com"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-zinc-400 mb-1.5">
              Senha
            </label>
            <input
              type="password"
              required
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              className="w-full bg-surfaceHighlight border border-white/10 rounded-lg px-4 py-2.5 text-zinc-100 placeholder:text-zinc-600 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all"
              placeholder="••••••••"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-primary hover:bg-primaryDark text-white font-medium py-2.5 rounded-lg transition-all shadow-neon-primary flex items-center justify-center gap-2 mt-2 disabled:opacity-70"
          >
            {loading ? <Loader2 className="animate-spin" size={20} /> : 'Entrar'}
          </button>
        </form>
        
        <div className="mt-6 text-center text-sm text-zinc-400">
          Não tem uma conta? <a href="/register" className="text-primary hover:text-white transition-colors">Cadastre-se</a>
        </div>
      </div>
    </div>
  );
}
