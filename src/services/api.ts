import axios from 'axios';

export const api = axios.create({
  baseURL: 'http://localhost:8081',
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('@FinanceApp:token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// --- DTOs Baseados no Backend ---

export interface DadosAutenticacao { email: string; senha: string; }
export interface DadosTokenJWT { token: string; }
export interface CriarUsuarioDto { nome: string; email: string; senha: string; }
export interface ListarUsuariosDto { id: number; nome: string; email: string; }

export interface ResumoFinanceiroDto { totalReceitas: number; totalDespesas: number; saldo: number; }
export interface ListarLancamentosDto {
  id: number; descricao: string; valor: number; dataLancamento: string;
  categoria: string; tipoLancamento: 'RECEITA' | 'DESPESA'; horaCriacao: string; horaAlteracao: string;
}
export interface PaginacaoResponseDto<T> {
  conteudo: T[]; paginaAtual: number; tamanhoPagina: number; totalElementos: number; totalPaginas: number;
}
export interface CriarLancamentoDto { descricao: string; valor: number; dataLancamento: string; categoriaId: number; }

export interface ListarCategoriaDto { id: number; nome: string; }
export interface CriarCategoriaDto { nome: string; }

export interface AtualizarUsuarioDto { nome?: string; email?: string; senha?: string; }
export interface AtualizarCategoriaDto { nome: string; }

// Utils para JWT
function parseJwt(token: string) {
  try {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));
    return JSON.parse(jsonPayload);
  } catch (e) {
    return null;
  }
}

export const AuthService = {
  login: async (dados: DadosAutenticacao) => {
    const response = await api.post<DadosTokenJWT>('/login', dados);
    return response.data;
  }
};

export const UsuarioService = {
  criar: async (dados: CriarUsuarioDto) => {
    const response = await api.post<CriarUsuarioDto>('/usuarios', dados);
    return response.data;
  },
  getMe: async () => {
    try {
      const token = localStorage.getItem('@FinanceApp:token');
      if (!token) throw new Error("No token");
      const decoded = parseJwt(token);
      // Assuming decoded.sub is the email in standard spring security
      const email = decoded?.sub;
      
      const response = await api.get<ListarUsuariosDto[]>('/usuarios');
      return response.data.find(u => u.email === email) || response.data[0];
    } catch {
      return null;
    }
  },
  atualizar: async (dados: AtualizarUsuarioDto) => {
    const response = await api.put('/usuarios', dados);
    return response.data;
  },
  inativar: async () => {
    await api.delete('/usuarios');
  }
};

export const CategoriaService = {
  listar: async () => {
    const response = await api.get<ListarCategoriaDto[]>('/categoria');
    return response.data;
  },
  criar: async (dados: CriarCategoriaDto) => {
    const response = await api.post<CriarCategoriaDto>('/categoria', dados);
    return response.data;
  },
  atualizar: async (id: number, dados: AtualizarCategoriaDto) => {
    const response = await api.put(`/categoria/${id}`, dados);
    return response.data;
  },
  deletar: async (id: number) => {
    await api.delete(`/categoria/${id}`);
  }
};

export const LancamentoService = {
  getResumo: async (mes?: number, ano?: number) => {
    const response = await api.get<ResumoFinanceiroDto>('/lancamentos/relatorio', { params: { mes, ano } });
    return response.data;
  },
  listar: async (mes?: number, ano?: number, page = 0, size = 10) => {
    const response = await api.get<PaginacaoResponseDto<ListarLancamentosDto>>('/lancamentos/listar', { params: { mes, ano, page, size } });
    return response.data;
  },
  criarReceita: async (dados: CriarLancamentoDto) => {
    const response = await api.post('/lancamentos/receita', dados);
    return response.data;
  },
  criarDespesa: async (dados: CriarLancamentoDto) => {
    const response = await api.post('/lancamentos/despesa', dados);
    return response.data;
  },
  atualizar: async (id: number, dados: Partial<CriarLancamentoDto>) => {
    const response = await api.put(`/lancamentos/${id}`, dados);
    return response.data;
  },
  deletar: async (id: number) => {
    await api.delete(`/lancamentos/${id}`);
  },
  exportarPdf: async (mes: number, ano: number) => {
    const response = await api.get(`/lancamentos/exportar-pdf`, {
      params: { mes, ano },
      responseType: 'blob'
    });
    return response.data;
  }
};

export const MetaService = {
  definirMeta: async (dados: { categoriaId: number, mes: number, ano: number, valorLimite: number }) => {
    const response = await api.post('/metas', dados);
    return response.data;
  },
  listarProgresso: async (mes: number, ano: number) => {
    const response = await api.get<any[]>('/metas/progresso', { params: { mes, ano } });
    return response.data;
  }
};

export const CaixinhaService = {
  criar: async (dados: { nome: string, objetivo: string }) => {
    const response = await api.post('/caixinhas', dados);
    return response.data;
  },
  listar: async () => {
    const response = await api.get('/caixinhas');
    return response.data;
  },
  depositar: async (id: number, valor: number) => {
    const response = await api.post(`/caixinhas/${id}/depositar`, { valor });
    return response.data;
  },
  resgatar: async (id: number, valor: number) => {
    const response = await api.post(`/caixinhas/${id}/resgatar`, { valor });
    return response.data;
  }
};

export const AiService = {
  obterDicas: async (mes: number, ano: number) => {
    const response = await api.get<{ dicas: string }>('/ai/dicas', { params: { mes, ano } });
    return response.data;
  }
};

