import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Wallet, Loader2 } from 'lucide-react';
import { UsuarioService } from '../services/api';
import { cn } from '../utils/cn';

export function Register() {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      await UsuarioService.criar({ nome, email, senha });
      alert('Cadastro realizado com sucesso! Faça login.');
      navigate('/login');
    } catch (err: any) {
      setError(err.response?.data?.message || 'Erro ao realizar cadastro.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4 relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/10 rounded-full blur-[120px] pointer-events-none" />

      <div className={cn("glass w-full max-w-md p-8 rounded-2xl z-10 border border-white/5")}>
        <div className="flex flex-col items-center mb-8">
          <div className="w-12 h-12 bg-primary/20 text-primary rounded-xl flex items-center justify-center mb-4 shadow-neon-primary">
            <Wallet size={28} />
          </div>
          <h1 className="text-2xl font-bold text-white">Criar Conta</h1>
          <p className="text-zinc-400 mt-1">Comece a gerenciar suas finanças</p>
        </div>

        {error && (
          <div className="bg-despesa/10 border border-despesa/30 text-despesa px-4 py-3 rounded-lg mb-6 text-sm shadow-neon-despesa">
            {error}
          </div>
        )}

        <form onSubmit={handleRegister} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-zinc-400 mb-1.5">Nome Completo</label>
            <input required value={nome} onChange={(e) => setNome(e.target.value)} className="w-full bg-surfaceHighlight border border-white/10 rounded-lg px-4 py-2.5 text-zinc-100 focus:outline-none focus:border-primary transition-all" placeholder="Seu nome" />
          </div>
          <div>
            <label className="block text-sm font-medium text-zinc-400 mb-1.5">E-mail</label>
            <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} className="w-full bg-surfaceHighlight border border-white/10 rounded-lg px-4 py-2.5 text-zinc-100 focus:outline-none focus:border-primary transition-all" placeholder="seu@email.com" />
          </div>
          <div>
            <label className="block text-sm font-medium text-zinc-400 mb-1.5">Senha</label>
            <input type="password" required value={senha} onChange={(e) => setSenha(e.target.value)} className="w-full bg-surfaceHighlight border border-white/10 rounded-lg px-4 py-2.5 text-zinc-100 focus:outline-none focus:border-primary transition-all" placeholder="Mínimo 6 caracteres" />
          </div>

          <button type="submit" disabled={loading} className="w-full bg-primary hover:bg-primaryDark text-white font-medium py-2.5 rounded-lg transition-all shadow-neon-primary flex items-center justify-center gap-2 mt-2 disabled:opacity-70">
            {loading ? <Loader2 className="animate-spin" size={20} /> : 'Cadastrar'}
          </button>
        </form>
        
        <div className="mt-6 text-center text-sm text-zinc-400">
          Já tem uma conta? <Link to="/login" className="text-primary hover:text-white transition-colors">Entrar</Link>
        </div>
      </div>
    </div>
  );
}
