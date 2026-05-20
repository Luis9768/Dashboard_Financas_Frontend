import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { WalletCards, Loader2, ArrowRight, Target, PieChart, Brain, Shield } from 'lucide-react';
import { motion } from 'framer-motion';
import { UsuarioService } from '../services/api';

export function Register() {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      await UsuarioService.criar({ nome, email, senha });
      setSuccess(true);
      setTimeout(() => navigate('/login'), 2000);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Erro ao realizar cadastro.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex bg-background">
      {/* Left panel - Form */}
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
            <h1 className="text-2xl font-bold tracking-tight text-white mb-2">Criar sua conta</h1>
            <p className="text-[14px] text-zinc-500">Comece a transformar suas finanças em menos de 1 minuto.</p>
          </div>

          {/* Success message */}
          {success && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-receita/[0.08] border border-receita/20 text-receita px-4 py-3 rounded-xl mb-6 text-[13px] flex items-center gap-2"
            >
              <svg className="w-4 h-4 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
              Conta criada com sucesso! Redirecionando para o login...
            </motion.div>
          )}

          {error && (
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-despesa/[0.08] border border-despesa/20 text-despesa px-4 py-3 rounded-xl mb-6 text-[13px]"
            >
              {error}
            </motion.div>
          )}

          <form onSubmit={handleRegister} className="space-y-4">
            <div>
              <label className="block text-[13px] font-medium text-zinc-400 mb-2">
                Nome completo
              </label>
              <input
                required
                value={nome}
                onChange={(e) => setNome(e.target.value)}
                className="w-full bg-surface border border-white/[0.08] rounded-xl px-4 py-3 text-[14px] text-zinc-100 placeholder:text-zinc-600 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary/50 transition-all"
                placeholder="Seu nome"
              />
            </div>

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
                placeholder="Mínimo 6 caracteres"
              />
            </div>

            <button
              type="submit"
              disabled={loading || success}
              className="group w-full bg-white text-background font-semibold py-3 rounded-xl transition-all flex items-center justify-center gap-2 mt-2 disabled:opacity-50 hover:shadow-[0_0_40px_-10px_rgba(139,92,246,0.5)] hover:scale-[1.01] active:scale-[0.99] text-[14px]"
            >
              {loading ? (
                <Loader2 className="animate-spin" size={18} />
              ) : (
                <>
                  Criar minha conta
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                </>
              )}
            </button>
          </form>

          <div className="mt-8 text-center">
            <span className="text-[13px] text-zinc-500">
              Já tem uma conta?{' '}
              <Link to="/login" className="text-primary hover:text-white transition-colors font-medium">
                Entrar
              </Link>
            </span>
          </div>

          <div className="mt-10 flex items-center gap-2 justify-center">
            <Shield className="w-3.5 h-3.5 text-zinc-600" />
            <span className="text-[11px] text-zinc-600">Conexão segura e criptografada</span>
          </div>
        </motion.div>
      </div>

      {/* Right panel - Branding */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden">
        <div className="absolute inset-0 bg-surface" />
        <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[150px] pointer-events-none" />
        <div className="absolute top-0 left-0 w-[400px] h-[400px] bg-blue-500/8 rounded-full blur-[120px] pointer-events-none" />

        <div className="relative z-10 flex flex-col justify-between p-12 w-full">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2.5 group self-end">
            <span className="text-[13px] text-zinc-500 hover:text-white transition-colors">← Voltar ao início</span>
          </Link>

          {/* Center content */}
          <div className="flex-1 flex flex-col justify-center max-w-md mx-auto">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <h2 className="text-3xl xl:text-4xl font-bold tracking-tight text-white leading-tight mb-4">
                Tudo pronto para o seu
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-receita to-blue-400"> novo começo.</span>
              </h2>
              <p className="text-zinc-400 text-[15px] leading-relaxed mb-10">
                Em poucos segundos você terá acesso ao painel mais completo para organizar suas finanças pessoais.
              </p>
            </motion.div>

            {/* What you get */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="space-y-4"
            >
              <p className="text-[11px] text-zinc-500 uppercase tracking-[0.2em] font-semibold mb-3">O que você ganha</p>
              {[
                { icon: <Target className="w-4 h-4 text-receita" />, title: "Metas de Gastos", desc: "Defina limites por categoria" },
                { icon: <PieChart className="w-4 h-4 text-blue-400" />, title: "Caixinhas", desc: "Guarde dinheiro para seus sonhos" },
                { icon: <Brain className="w-4 h-4 text-amber-400" />, title: "IA Financeira", desc: "Dicas personalizadas todo mês" },
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-3">
                  <div className="flex-shrink-0 w-9 h-9 rounded-xl bg-white/[0.04] border border-white/[0.06] flex items-center justify-center">
                    {item.icon}
                  </div>
                  <div>
                    <p className="text-[13px] font-medium text-zinc-200">{item.title}</p>
                    <p className="text-[12px] text-zinc-500">{item.desc}</p>
                  </div>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Bottom */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="border-t border-white/[0.06] pt-6"
          >
            <p className="text-[13px] text-zinc-500 italic">
              "O primeiro passo para a liberdade financeira é o controle."
            </p>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
