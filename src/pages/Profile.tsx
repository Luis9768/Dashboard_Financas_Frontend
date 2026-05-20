import { useEffect, useState } from 'react';
import { UsuarioService, ListarUsuariosDto } from '../services/api';
import { User, Mail, Shield, Edit2, Trash2, X, Check, Tags, Lock, ChevronLeft, Palette, AlertTriangle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { CategoryManager } from '../components/CategoryManager';
import { motion, AnimatePresence } from 'framer-motion';

const fadeUp = {
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
};

function stagger(index: number) {
  return { ...fadeUp, transition: { ...fadeUp.transition, delay: index * 0.08 } };
}

function getInitials(name: string) {
  return name
    .split(' ')
    .map((w) => w[0])
    .filter(Boolean)
    .slice(0, 2)
    .join('')
    .toUpperCase();
}

export function Profile() {
  const [user, setUser] = useState<ListarUsuariosDto | null>(null);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [isCategoryManagerOpen, setIsCategoryManagerOpen] = useState(false);

  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [saving, setSaving] = useState(false);

  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [toastType, setToastType] = useState<'success' | 'error'>('success');

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

  function triggerToast(message: string, type: 'success' | 'error' = 'success') {
    setToastMessage(message);
    setToastType(type);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3500);
  }

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      await UsuarioService.atualizar({ nome, email, senha: senha ? senha : undefined });
      await fetchUser();
      setIsEditing(false);
      setSenha('');
      triggerToast('Perfil atualizado com sucesso!', 'success');
    } catch (e) {
      console.error("Erro ao atualizar", e);
      triggerToast('Erro ao atualizar o perfil', 'error');
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
      triggerToast('Erro ao inativar conta', 'error');
    }
  };

  return (
    <div className="max-w-2xl mx-auto w-full pb-12">
      {/* ── Toast ── */}
      <AnimatePresence>
        {showToast && (
          <motion.div
            initial={{ opacity: 0, y: -32, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="fixed top-6 left-1/2 -translate-x-1/2 z-[100]"
          >
            <div
              className={`flex items-center gap-3 px-5 py-3 rounded-xl border shadow-2xl backdrop-blur-md text-[14px] font-medium ${
                toastType === 'success'
                  ? 'bg-[#10b981]/10 border-[#10b981]/20 text-[#10b981]'
                  : 'bg-[#f43f5e]/10 border-[#f43f5e]/20 text-[#f43f5e]'
              }`}
            >
              {toastType === 'success' ? <Check size={18} /> : <AlertTriangle size={18} />}
              {toastMessage}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Back Button ── */}
      <motion.button
        {...stagger(0)}
        onClick={() => navigate('/dashboard')}
        className="flex items-center gap-2 text-[13px] text-zinc-500 hover:text-white mb-8 transition-colors group"
      >
        <ChevronLeft size={16} className="group-hover:-translate-x-0.5 transition-transform" />
        Voltar ao Dashboard
      </motion.button>

      {loading ? (
        <div className="space-y-6">
          <div className="flex flex-col items-center gap-4 py-12">
            <div className="w-24 h-24 rounded-full bg-white/[0.04] animate-pulse" />
            <div className="h-5 w-40 rounded-lg bg-white/[0.04] animate-pulse" />
            <div className="h-4 w-56 rounded-lg bg-white/[0.04] animate-pulse" />
          </div>
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-40 rounded-2xl bg-white/[0.02] animate-pulse" />
          ))}
        </div>
      ) : user ? (
        <>
          {/* ── Header Avatar Area ── */}
          <motion.div
            {...stagger(0)}
            className="relative flex flex-col items-center mb-10"
          >
            {/* Gradient glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-56 h-56 bg-[#8b5cf6]/20 rounded-full blur-[100px] pointer-events-none" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-[40%] w-32 h-32 bg-[#6d28d9]/30 rounded-full blur-[60px] pointer-events-none" />

            {/* Avatar */}
            <div className="relative z-10 w-[88px] h-[88px] rounded-full bg-gradient-to-br from-[#8b5cf6] to-[#6d28d9] flex items-center justify-center shadow-[0_0_40px_rgba(139,92,246,0.25)]">
              <span className="text-[28px] font-bold text-white tracking-wide select-none">
                {getInitials(user.nome)}
              </span>
            </div>

            {/* Name + Email */}
            <h1 className="relative z-10 mt-5 text-[22px] font-semibold text-white tracking-tight">
              {user.nome}
            </h1>
            <p className="relative z-10 mt-1 text-[14px] text-zinc-500">
              {user.email}
            </p>
          </motion.div>

          {/* ── Informações Pessoais ── */}
          <motion.div
            {...stagger(1)}
            className="rounded-2xl bg-[#0a0a0a] border border-white/[0.06] p-6 mb-4"
          >
            <h3 className="text-[15px] font-semibold text-white mb-5 flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-[#8b5cf6]/10 flex items-center justify-center">
                <User size={16} className="text-[#8b5cf6]" />
              </div>
              Informações Pessoais
            </h3>

            {!isEditing ? (
              <div className="space-y-4">
                <div className="flex items-center justify-between py-3 border-b border-white/[0.04]">
                  <div className="flex items-center gap-3">
                    <User size={15} className="text-zinc-600" />
                    <span className="text-[13px] text-zinc-500">Nome</span>
                  </div>
                  <span className="text-[14px] text-white font-medium">{user.nome}</span>
                </div>

                <div className="flex items-center justify-between py-3 border-b border-white/[0.04]">
                  <div className="flex items-center gap-3">
                    <Mail size={15} className="text-zinc-600" />
                    <span className="text-[13px] text-zinc-500">E-mail</span>
                  </div>
                  <span className="text-[14px] text-white font-medium">{user.email}</span>
                </div>

                <div className="flex items-center justify-between py-3">
                  <div className="flex items-center gap-3">
                    <Shield size={15} className="text-zinc-600" />
                    <span className="text-[13px] text-zinc-500">Status</span>
                  </div>
                  <span className="text-[13px] font-medium text-[#10b981] bg-[#10b981]/10 px-3 py-1 rounded-full border border-[#10b981]/20">
                    Ativo
                  </span>
                </div>

                <div className="pt-3">
                  <button
                    onClick={() => setIsEditing(true)}
                    className="flex items-center gap-2 bg-white/[0.06] border border-white/[0.08] hover:bg-white/[0.1] text-white text-[13px] font-medium px-4 py-2.5 rounded-xl transition-colors"
                  >
                    <Edit2 size={14} />
                    Editar Informações
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleUpdate} className="space-y-4">
                <div>
                  <label className="block text-[13px] font-medium text-zinc-500 mb-1.5">Nome</label>
                  <input
                    required
                    value={nome}
                    onChange={(e) => setNome(e.target.value)}
                    className="w-full bg-[#050505] border border-white/[0.08] rounded-xl px-4 py-3 text-[14px] text-zinc-100 focus:outline-none focus:border-[#8b5cf6]/50 transition-colors placeholder:text-zinc-700"
                  />
                </div>
                <div>
                  <label className="block text-[13px] font-medium text-zinc-500 mb-1.5">E-mail</label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-[#050505] border border-white/[0.08] rounded-xl px-4 py-3 text-[14px] text-zinc-100 focus:outline-none focus:border-[#8b5cf6]/50 transition-colors placeholder:text-zinc-700"
                  />
                </div>
                <div>
                  <label className="block text-[13px] font-medium text-zinc-500 mb-1.5">Nova Senha (opcional)</label>
                  <input
                    type="password"
                    value={senha}
                    onChange={(e) => setSenha(e.target.value)}
                    className="w-full bg-[#050505] border border-white/[0.08] rounded-xl px-4 py-3 text-[14px] text-zinc-100 focus:outline-none focus:border-[#8b5cf6]/50 transition-colors placeholder:text-zinc-700"
                    placeholder="Deixe em branco para não alterar"
                  />
                </div>

                <div className="pt-2 flex gap-3">
                  <button
                    type="button"
                    onClick={() => { setIsEditing(false); if (user) { setNome(user.nome); setEmail(user.email); } setSenha(''); }}
                    className="flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-white/[0.06] border border-white/[0.08] text-[14px] text-zinc-300 font-medium hover:bg-white/[0.1] transition-colors"
                  >
                    <X size={16} />
                    Cancelar
                  </button>
                  <button
                    type="submit"
                    disabled={saving}
                    className="flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-white text-[#050505] text-[14px] font-semibold hover:bg-zinc-200 transition-all disabled:opacity-50"
                  >
                    <Check size={16} />
                    {saving ? 'Salvando...' : 'Salvar'}
                  </button>
                </div>
              </form>
            )}
          </motion.div>

          {/* ── Segurança ── */}
          <motion.div
            {...stagger(2)}
            className="rounded-2xl bg-[#0a0a0a] border border-white/[0.06] p-6 mb-4"
          >
            <h3 className="text-[15px] font-semibold text-white mb-4 flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-[#8b5cf6]/10 flex items-center justify-center">
                <Lock size={16} className="text-[#8b5cf6]" />
              </div>
              Segurança
            </h3>

            <div className="flex items-center justify-between">
              <div>
                <p className="text-[14px] text-zinc-300">Senha da conta</p>
                <p className="text-[13px] text-zinc-600 mt-0.5">Altere sua senha periodicamente para maior segurança</p>
              </div>
              <button
                onClick={() => setIsEditing(true)}
                className="flex items-center gap-2 bg-white/[0.06] border border-white/[0.08] hover:bg-white/[0.1] text-white text-[13px] font-medium px-4 py-2.5 rounded-xl transition-colors"
              >
                <Lock size={14} />
                Alterar
              </button>
            </div>
          </motion.div>

          {/* ── Personalização ── */}
          <motion.div
            {...stagger(3)}
            className="rounded-2xl bg-[#0a0a0a] border border-white/[0.06] p-6 mb-4"
          >
            <h3 className="text-[15px] font-semibold text-white mb-4 flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-[#8b5cf6]/10 flex items-center justify-center">
                <Palette size={16} className="text-[#8b5cf6]" />
              </div>
              Personalização
            </h3>

            <div className="flex items-center justify-between">
              <div>
                <p className="text-[14px] text-zinc-300">Gerenciar Categorias</p>
                <p className="text-[13px] text-zinc-600 mt-0.5">Crie, edite e organize suas categorias de lançamentos</p>
              </div>
              <button
                onClick={() => setIsCategoryManagerOpen(true)}
                className="flex items-center gap-2 bg-white text-[#050505] text-[13px] font-semibold px-4 py-2.5 rounded-xl hover:bg-zinc-200 transition-colors"
              >
                <Tags size={14} />
                Categorias
              </button>
            </div>
          </motion.div>

          {/* ── Zona de Perigo ── */}
          <motion.div
            {...stagger(4)}
            className="rounded-2xl bg-[#0a0a0a] border border-[#f43f5e]/10 p-6"
          >
            <h3 className="text-[15px] font-semibold text-[#f43f5e] mb-4 flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-[#f43f5e]/10 flex items-center justify-center">
                <AlertTriangle size={16} className="text-[#f43f5e]" />
              </div>
              Zona de Perigo
            </h3>

            <div className="flex items-center justify-between">
              <div>
                <p className="text-[14px] text-zinc-300">Inativar conta</p>
                <p className="text-[13px] text-zinc-600 mt-0.5">Esta ação desativará sua conta e você será desconectado</p>
              </div>
              <button
                onClick={handleInactivate}
                className="flex items-center gap-2 bg-[#f43f5e]/10 border border-[#f43f5e]/20 hover:bg-[#f43f5e]/20 text-[#f43f5e] text-[13px] font-medium px-4 py-2.5 rounded-xl transition-colors"
              >
                <Trash2 size={14} />
                Inativar
              </button>
            </div>
          </motion.div>
        </>
      ) : (
        <motion.p {...fadeUp} className="text-[14px] text-zinc-500 text-center py-12">
          Não foi possível carregar os dados do perfil.
        </motion.p>
      )}

      <CategoryManager
        isOpen={isCategoryManagerOpen}
        onClose={() => setIsCategoryManagerOpen(false)}
      />
    </div>
  );
}
