import { useState, useEffect } from 'react';
import { CategoriaService, ListarCategoriaDto } from '../services/api';
import { X, Edit2, Trash2, Check, Plus } from 'lucide-react';

interface CategoryManagerProps {
  isOpen: boolean;
  onClose: () => void;
}

export function CategoryManager({ isOpen, onClose }: CategoryManagerProps) {
  const [categorias, setCategorias] = useState<ListarCategoriaDto[]>([]);
  const [loading, setLoading] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editNome, setEditNome] = useState('');
  
  const [isCreating, setIsCreating] = useState(false);
  const [novoNome, setNovoNome] = useState('');

  useEffect(() => {
    if (isOpen) carregarCategorias();
  }, [isOpen]);

  const carregarCategorias = async () => {
    setLoading(true);
    try {
      const data = await CategoriaService.listar();
      setCategorias(data);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Tem certeza que deseja excluir esta categoria?")) return;
    try {
      await CategoriaService.deletar(id);
      setCategorias(categorias.filter(c => c.id !== id));
    } catch (e) {
      alert("Erro ao excluir categoria (pode estar em uso).");
    }
  };

  const handleUpdate = async (id: number) => {
    if (!editNome.trim()) return;
    try {
      await CategoriaService.atualizar(id, { nome: editNome });
      setCategorias(categorias.map(c => c.id === id ? { ...c, nome: editNome } : c));
      setEditingId(null);
    } catch (e) {
      alert("Erro ao atualizar.");
    }
  };

  const handleCreate = async () => {
    if (!novoNome.trim()) return;
    try {
      await CategoriaService.criar({ nome: novoNome });
      await carregarCategorias();
      setIsCreating(false);
      setNovoNome('');
    } catch (e) {
      alert("Erro ao criar.");
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={onClose} />
      
      <div className="glass w-full max-w-lg rounded-2xl relative z-10 animate-in fade-in zoom-in-95 duration-200 border border-white/5 flex flex-col max-h-[80vh]">
        <div className="flex items-center justify-between p-6 border-b border-white/10 shrink-0">
          <h2 className="text-xl font-semibold text-white">Gerenciar Categorias</h2>
          <button onClick={onClose} className="p-2 hover:bg-surfaceHighlight rounded-lg text-zinc-400 hover:text-white transition-colors">
            <X size={20} />
          </button>
        </div>

        <div className="p-6 overflow-y-auto flex-1">
          <div className="mb-4">
            {!isCreating ? (
              <button 
                onClick={() => setIsCreating(true)}
                className="w-full flex items-center justify-center gap-2 py-3 border border-dashed border-white/20 rounded-lg text-zinc-400 hover:text-white hover:bg-white/5 transition-colors"
              >
                <Plus size={18} /> Nova Categoria
              </button>
            ) : (
              <div className="flex gap-2">
                <input
                  value={novoNome}
                  onChange={e => setNovoNome(e.target.value)}
                  className="flex-1 bg-surfaceHighlight border border-white/10 rounded-lg px-4 py-2 text-zinc-100 focus:outline-none focus:border-primary"
                  placeholder="Nome da categoria"
                  autoFocus
                />
                <button onClick={handleCreate} className="bg-primary hover:bg-primaryDark text-white px-4 rounded-lg shadow-neon-primary">
                  <Check size={18} />
                </button>
                <button onClick={() => setIsCreating(false)} className="bg-surfaceHighlight hover:bg-white/10 text-zinc-400 px-4 rounded-lg border border-white/10">
                  <X size={18} />
                </button>
              </div>
            )}
          </div>

          {loading ? (
            <div className="text-center py-8 text-zinc-500">Carregando...</div>
          ) : (
            <div className="space-y-2">
              {categorias.map(cat => (
                <div key={cat.id} className="flex items-center justify-between bg-surfaceHighlight/50 border border-white/5 p-3 rounded-lg hover:bg-surfaceHighlight transition-colors">
                  {editingId === cat.id ? (
                    <div className="flex items-center gap-2 w-full">
                      <input
                        value={editNome}
                        onChange={e => setEditNome(e.target.value)}
                        className="flex-1 bg-surface border border-white/10 rounded px-3 py-1.5 text-zinc-100 focus:outline-none focus:border-primary text-sm"
                        autoFocus
                      />
                      <button onClick={() => handleUpdate(cat.id)} className="text-primary hover:text-primaryDark p-1.5"><Check size={16} /></button>
                      <button onClick={() => setEditingId(null)} className="text-zinc-400 hover:text-white p-1.5"><X size={16} /></button>
                    </div>
                  ) : (
                    <>
                      <span className="text-zinc-100 font-medium">{cat.nome}</span>
                      <div className="flex items-center gap-1">
                        <button 
                          onClick={() => { setEditingId(cat.id); setEditNome(cat.nome); }}
                          className="p-1.5 text-zinc-400 hover:text-primary transition-colors"
                        >
                          <Edit2 size={16} />
                        </button>
                        <button 
                          onClick={() => handleDelete(cat.id)}
                          className="p-1.5 text-zinc-400 hover:text-despesa transition-colors"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </>
                  )}
                </div>
              ))}
              {categorias.length === 0 && !isCreating && (
                <p className="text-center py-8 text-zinc-500">Nenhuma categoria encontrada.</p>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
