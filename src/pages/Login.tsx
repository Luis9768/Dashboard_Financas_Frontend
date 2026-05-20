import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { WalletCards, Loader2, ArrowRight, TrendingUp, Shield, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';
import { AuthService } from '../services/api';

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
    <div className="min-h-screen flex bg-background">
      {/* Left panel - Branding */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden">
        {/* Background gradient */}
        <div className="absolute inset-0 bg-surface" />
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[150px] pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-receita/8 rounded-full blur-[120px] pointer-events-none" />

        <div className="relative z-10 flex flex-col justify-between p-12 w-full">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2.5 group">
            <div className="relative">
              <div className="absolute inset-0 bg-primary/30 rounded-lg blur-md opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="relative bg-primary/15 p-1.5 rounded-lg border border-primary/30">
                <WalletCards className="w-5 h-5 text-primary" />
              </div>
            </div>
            <span className="text-[15px] font-semibold tracking-tight text-white">FinanceApp</span>
          </Link>

          {/* Center content */}
          <div className="flex-1 flex flex-col justify-center max-w-md">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <h2 className="text-3xl xl:text-4xl font-bold tracking-tight text-white leading-tight mb-4">
                Suas finanças sob controle,
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-blue-400"> sempre.</span>
              </h2>
              <p className="text-zinc-400 text-[15px] leading-relaxed mb-10">
                Acesse seu painel e tenha uma visão completa de receitas, despesas, metas e investimentos em tempo real.
              </p>
            </motion.div>

            {/* Feature highlights */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="space-y-4"
            >
              {[
                { icon: <TrendingUp className="w-4 h-4 text-receita" />, text: "Acompanhe seu crescimento financeiro mês a mês" },
                { icon: <Shield className="w-4 h-4 text-blue-400" />, text: "Dados criptografados e 100% seguros" },
                { icon: <Sparkles className="w-4 h-4 text-amber-400" />, text: "Insights personalizados com Inteligência Artificial" },
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-3 text-[13px] text-zinc-400">
                  <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-white/[0.04] border border-white/[0.06] flex items-center justify-center">
                    {item.icon}
                  </div>
                  {item.text}
                </div>
              ))}
            </motion.div>
          </div>

          {/* Bottom quote */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="border-t border-white/[0.06] pt-6"
          >
            <p className="text-[13px] text-zinc-500 italic">
              "Quem controla o dinheiro, controla o futuro."
            </p>
          </motion.div>
        </div>
      </div>

      {/* Right panel - Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6 relative">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-primary/[0.06] rounded-full blur-[100px] pointer-events-none lg:hidden" />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-[400px] relative z-10"
        >
          {/* Mobile logo */}
          <div className="flex lg:hidden items-center justify-center gap-2 mb-10">
            <div className="bg-primary/15 p-1.5 rounded-lg border border-primary/30">
              <WalletCards className="w-5 h-5 text-primary" />
            </div>
            <span className="text-[15px] font-semibold tracking-tight">FinanceApp</span>
          </div>

          <div className="mb-8">
            <h1 className="text-2xl font-bold tracking-tight text-white mb-2">Bem-vindo de volta</h1>
            <p className="text-[14px] text-zinc-500">Entre com suas credenciais para acessar o painel.</p>
          </div>

          {error && (
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-despesa/[0.08] border border-despesa/20 text-despesa px-4 py-3 rounded-xl mb-6 text-[13px]"
            >
              {error}
            </motion.div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-[13px] font-medium text-zinc-400 mb-2">
                E-mail
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-surface border border-white/[0.08] rounded-xl px-4 py-3 text-[14px] text-zinc-100 placeholder:text-zinc-600 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary/50 transition-all"
                placeholder="seu@email.com"
              />
            </div>

            <div>
              <label className="block text-[13px] font-medium text-zinc-400 mb-2">
                Senha
              </label>
              <input
                type="password"
                required
                value={senha}
                onChange={(e) => setSenha(e.target.value)}
                className="w-full bg-surface border border-white/[0.08] rounded-xl px-4 py-3 text-[14px] text-zinc-100 placeholder:text-zinc-600 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary/50 transition-all"
                placeholder="••••••••"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="group w-full bg-white text-background font-semibold py-3 rounded-xl transition-all flex items-center justify-center gap-2 mt-2 disabled:opacity-50 hover:shadow-[0_0_40px_-10px_rgba(139,92,246,0.5)] hover:scale-[1.01] active:scale-[0.99] text-[14px]"
            >
              {loading ? (
                <Loader2 className="animate-spin" size={18} />
              ) : (
                <>
                  Entrar
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                </>
              )}
            </button>
          </form>

          <div className="mt-8 text-center">
            <span className="text-[13px] text-zinc-500">
              Não tem uma conta?{' '}
              <Link to="/register" className="text-primary hover:text-white transition-colors font-medium">
                Criar conta grátis
              </Link>
            </span>
          </div>

          <div className="mt-10 flex items-center gap-2 justify-center">
            <Shield className="w-3.5 h-3.5 text-zinc-600" />
            <span className="text-[11px] text-zinc-600">Conexão segura e criptografada</span>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
