import { useEffect, useState } from 'react';
import { UsuarioService, ListarUsuariosDto } from '../services/api';
import { User, Mail, Shield, Edit2, Trash2, X, Check, Tags } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { CategoryManager } from '../components/CategoryManager';

export function Profile() {
  const [user, setUser] = useState<ListarUsuariosDto | null>(null);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [isCategoryManagerOpen, setIsCategoryManagerOpen] = useState(false);
  
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [saving, setSaving] = useState(false);
  
  const navigate = useNavigate();

  useEffect(() => {
    fetchUser();
  }, []);

  async function fetchUser() {
    setLoading(true);
    try {
      const data = await UsuarioService.getMe();
      if (data) {
        setUser(data);
        setNome(data.nome);
        setEmail(data.email);
      }
    } catch (e) {
      console.error("Erro ao buscar perfil", e);
    } finally {
      setLoading(false);
    }
  }

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      await UsuarioService.atualizar({ nome, email, senha: senha ? senha : undefined });
      await fetchUser();
      setIsEditing(false);
      setSenha('');
      alert("Perfil atualizado com sucesso!");
    } catch (e) {
      console.error("Erro ao atualizar", e);
      alert("Erro ao atualizar o perfil");
    } finally {
      setSaving(false);
    }
  };

  const handleInactivate = async () => {
    if (!confirm("Tem certeza que deseja inativar sua conta? Você será deslogado.")) return;
    try {
      await UsuarioService.inativar();
      localStorage.removeItem('@FinanceApp:token');
      navigate('/login');
    } catch (e) {
      console.error("Erro ao inativar", e);
      alert("Erro ao inativar conta");
    }
  };

  return (
    <div className="max-w-3xl mx-auto w-full">
      <div className="flex items-center gap-4 mb-6">
        <button 
          onClick={() => navigate('/')} 
          className="p-2 rounded-full hover:bg-surfaceHighlight text-zinc-400 hover:text-white transition-colors"
          title="Voltar ao Dashboard"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6"/></svg>
        </button>
        <h2 className="text-2xl font-bold text-white tracking-tight">Configurações da Conta</h2>
      </div>
      
      <div className="glass rounded-2xl p-8 border border-white/5 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-[80px] pointer-events-none" />

        {loading ? (
          <div className="animate-pulse space-y-6">
            <div className="h-16 w-16 bg-white/10 rounded-full" />
            <div className="h-6 w-48 bg-white/10 rounded" />
            <div className="h-6 w-64 bg-white/10 rounded" />
          </div>
        ) : user ? (
          <div className="flex flex-col md:flex-row gap-8 items-start relative z-10">
            <div className="w-24 h-24 rounded-full bg-surfaceHighlight border-2 border-primary shadow-neon-primary flex items-center justify-center text-primary shrink-0">
              <User size={40} />
            </div>
            
            <div className="flex-1 w-full">
              {!isEditing ? (
                <div className="space-y-6">
                  <div>
                    <label className="text-xs text-zinc-500 font-medium uppercase tracking-wider">Nome</label>
                    <div className="flex items-center gap-3 mt-1">
                      <User size={18} className="text-zinc-400" />
                      <span className="text-lg text-white font-medium">{user.nome}</span>
                    </div>
                  </div>

                  <div>
                    <label className="text-xs text-zinc-500 font-medium uppercase tracking-wider">E-mail</label>
                    <div className="flex items-center gap-3 mt-1">
                      <Mail size={18} className="text-zinc-400" />
                      <span className="text-lg text-white font-medium">{user.email}</span>
                    </div>
                  </div>

                  <div>
                    <label className="text-xs text-zinc-500 font-medium uppercase tracking-wider">Status</label>
                    <div className="flex items-center gap-3 mt-1">
                      <Shield size={18} className="text-receita" />
                      <span className="text-sm font-medium text-receita bg-receita/10 px-3 py-1 rounded-full border border-receita/20 shadow-neon-receita">Ativo</span>
                    </div>
                  </div>

                  <div className="pt-6 border-t border-white/5 flex flex-wrap gap-4">
                    <button onClick={() => setIsEditing(true)} className="flex items-center gap-2 bg-surfaceHighlight hover:bg-white/10 text-white px-4 py-2 rounded-lg transition-colors border border-white/10">
                      <Edit2 size={16} /> Editar Perfil
                    </button>
                    <button onClick={() => setIsCategoryManagerOpen(true)} className="flex items-center gap-2 bg-primary/10 hover:bg-primary/20 text-primary px-4 py-2 rounded-lg transition-colors border border-primary/20">
                      <Tags size={16} /> Categorias
                    </button>
                    <button onClick={handleInactivate} className="flex items-center gap-2 bg-despesa/10 hover:bg-despesa/20 text-despesa px-4 py-2 rounded-lg transition-colors border border-despesa/20 ml-auto">
                      <Trash2 size={16} /> Inativar Conta
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleUpdate} className="space-y-5">
                  <div>
                    <label className="block text-sm font-medium text-zinc-400 mb-1.5">Nome</label>
                    <input required value={nome} onChange={e => setNome(e.target.value)} className="w-full bg-surfaceHighlight border border-white/10 rounded-lg px-4 py-2.5 text-zinc-100 focus:outline-none focus:border-primary" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-zinc-400 mb-1.5">E-mail</label>
                    <input type="email" required value={email} onChange={e => setEmail(e.target.value)} className="w-full bg-surfaceHighlight border border-white/10 rounded-lg px-4 py-2.5 text-zinc-100 focus:outline-none focus:border-primary" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-zinc-400 mb-1.5">Nova Senha (opcional)</label>
                    <input type="password" value={senha} onChange={e => setSenha(e.target.value)} className="w-full bg-surfaceHighlight border border-white/10 rounded-lg px-4 py-2.5 text-zinc-100 focus:outline-none focus:border-primary" placeholder="Deixe em branco para não alterar" />
                  </div>

                  <div className="pt-4 flex gap-3">
                    <button type="button" onClick={() => setIsEditing(false)} className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg border border-white/10 text-zinc-300 font-medium hover:bg-surfaceHighlight transition-colors">
                      <X size={18} /> Cancelar
                    </button>
                    <button type="submit" disabled={saving} className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-primary hover:bg-primaryDark text-white font-medium transition-all shadow-neon-primary disabled:opacity-50">
                      <Check size={18} /> {saving ? 'Salvando...' : 'Salvar'}
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        ) : (
          <p className="text-zinc-400">Não foi possível carregar os dados do perfil.</p>
        )}
      </div>
      
      <CategoryManager 
        isOpen={isCategoryManagerOpen} 
        onClose={() => setIsCategoryManagerOpen(false)} 
      />
    </div>
  );
}
