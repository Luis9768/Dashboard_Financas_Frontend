import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { TrendingUp, ShieldCheck, Target, PieChart, ArrowRight, WalletCards, Zap, Heart, Award } from 'lucide-react';

export function Landing() {
  const services = [
    {
      title: "Gestão Descomplicada",
      description: "Acompanhe todas as suas receitas e despesas em uma interface fluida, rápida e livre de distrações.",
      icon: <Zap className="w-8 h-8 text-primary" />,
    },
    {
      title: "Metas e Caixinhas",
      description: "Transforme grandes sonhos em pequenas metas alcançáveis, guardando dinheiro de forma organizada.",
      icon: <Target className="w-8 h-8 text-receita" />,
    },
    {
      title: "IA Financeira",
      description: "Consultoria contínua da nossa Inteligência Artificial para avaliar seus gastos e sugerir melhorias.",
      icon: <TrendingUp className="w-8 h-8 text-blue-500" />,
    },
    {
      title: "Segurança de Dados",
      description: "Seus dados estão protegidos com os melhores padrões de criptografia. A sua privacidade é a nossa prioridade.",
      icon: <ShieldCheck className="w-8 h-8 text-orange-500" />,
    }
  ];

  return (
    <div className="min-h-screen bg-background font-sans text-white overflow-hidden">
      {/* Header */}
      <header className="fixed w-full top-0 z-50 bg-background/80 backdrop-blur-md border-b border-surfaceHighlight">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="bg-primary/20 p-2 rounded-xl border border-primary/50 shadow-neon-primary">
              <WalletCards className="w-6 h-6 text-primary" />
            </div>
            <span className="text-xl font-bold tracking-tight text-white">
              FinanceApp
            </span>
          </div>
          <div className="flex items-center gap-4">
            <Link to="/login" className="text-zinc-400 font-medium hover:text-white transition-colors">
              Entrar
            </Link>
            <Link to="/register" className="bg-primary hover:bg-primaryDark text-white px-6 py-2.5 rounded-full font-medium transition-all shadow-neon-primary hover:scale-105 active:scale-95">
              Começar Agora
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] opacity-20 pointer-events-none">
          <div className="absolute inset-0 bg-primary rounded-full blur-[120px]" />
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-5xl lg:text-7xl font-extrabold tracking-tight text-white mb-8 leading-tight"
          >
            Assuma o controle do seu <br className="hidden md:block"/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-blue-400">
              Futuro Financeiro
            </span>
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-xl text-zinc-400 max-w-2xl mx-auto mb-12"
          >
            Deixe as planilhas complexas no passado. Nossa plataforma inteligente e automatizada te ajuda a multiplicar seu patrimônio com foco no que realmente importa.
          </motion.p>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Link to="/register" className="group flex items-center justify-center gap-2 bg-white text-background hover:bg-zinc-200 px-8 py-4 rounded-full text-lg font-bold transition-all hover:scale-105 active:scale-95">
              Vamos Começar
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Serviços / Qualidade */}
      <section className="py-24 bg-surface border-y border-surfaceHighlight relative">
        <div className="absolute top-1/2 left-0 w-[500px] h-[500px] bg-receita/5 rounded-full blur-[100px] -translate-y-1/2 pointer-events-none" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">
              Qualidade de nível corporativo,<br/>feita para você.
            </h2>
            <p className="text-zinc-400 max-w-2xl mx-auto">
              Nossos serviços foram desenhados com a mais alta tecnologia para oferecer uma experiência fluida, sem travamentos e com visual premium.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {services.map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-background p-8 rounded-3xl border border-surfaceHighlight hover:border-primary/50 transition-all cursor-pointer group hover:shadow-neon-primary"
              >
                <div className="bg-surfaceHighlight w-16 h-16 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  {service.icon}
                </div>
                <h3 className="text-xl font-bold text-white mb-3">{service.title}</h3>
                <p className="text-zinc-400 leading-relaxed text-sm">{service.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Impacto / Educacional */}
      <section className="py-24 bg-background relative overflow-hidden">
        <div className="absolute right-0 bottom-0 w-[600px] h-[600px] bg-primary/10 rounded-full blur-[120px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex flex-col lg:flex-row items-center gap-16">
            <div className="lg:w-1/2">
              <motion.div 
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
              >
                <div className="flex items-center gap-2 mb-6">
                  <Heart className="w-5 h-5 text-despesa" />
                  <span className="text-despesa font-medium tracking-wider uppercase text-sm">Nosso Impacto</span>
                </div>
                <h2 className="text-3xl lg:text-5xl font-bold mb-6 text-white leading-tight">
                  Nós transformamos a forma como você enxerga o seu dinheiro.
                </h2>
                <p className="text-zinc-400 text-lg mb-8 leading-relaxed">
                  Sabemos que o mercado financeiro pode parecer assustador. Taxas de juros, inflação, boletos acumulando... isso gera estresse e afeta a sua qualidade de vida.
                  <br/><br/>
                  Nosso impacto real vai muito além de gráficos. Nós entregamos <strong className="text-white">paz de espírito</strong>. Quando você sabe exatamente quanto ganha, quanto gasta e onde investir, as noites mal dormidas desaparecem.
                </p>
                <Link to="/register" className="inline-flex items-center gap-2 text-primary hover:text-primaryDark font-semibold text-lg transition-colors">
                  Mude sua vida financeira hoje <ArrowRight className="w-5 h-5" />
                </Link>
              </motion.div>
            </div>
            
            <div className="lg:w-1/2 w-full">
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                className="relative bg-surface rounded-3xl p-8 border border-surfaceHighlight shadow-2xl"
              >
                {/* Mockup Dashboard Visual */}
                <div className="flex justify-between items-center mb-8 border-b border-surfaceHighlight pb-4">
                  <div className="flex gap-2">
                    <div className="w-3 h-3 rounded-full bg-despesa"></div>
                    <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                    <div className="w-3 h-3 rounded-full bg-receita"></div>
                  </div>
                  <div className="flex gap-2">
                    <Award className="w-5 h-5 text-primary" />
                    <span className="text-zinc-400 text-sm font-medium">Top 1% Investidores</span>
                  </div>
                </div>

                <div className="space-y-6">
                  <div className="flex justify-between items-end">
                    <div>
                      <p className="text-zinc-400 text-sm mb-1">Patrimônio Líquido</p>
                      <p className="text-3xl font-bold text-white">R$ 142.500,00</p>
                    </div>
                    <div className="flex items-center gap-1 text-receita bg-receita/10 px-3 py-1 rounded-full">
                      <TrendingUp className="w-4 h-4" />
                      <span className="text-sm font-bold">+12% a.a.</span>
                    </div>
                  </div>
                  
                  <div className="h-4 bg-surfaceHighlight rounded-full w-full overflow-hidden flex">
                    <div className="h-full bg-primary w-1/2"></div>
                    <div className="h-full bg-receita w-1/4"></div>
                  </div>

                  <div className="grid grid-cols-2 gap-4 mt-6">
                    <div className="bg-background p-4 rounded-xl border border-surfaceHighlight">
                      <p className="text-zinc-400 text-xs mb-1">Meta: Reserva</p>
                      <p className="text-white font-bold">100% Concluída</p>
                    </div>
                    <div className="bg-background p-4 rounded-xl border border-surfaceHighlight">
                      <p className="text-zinc-400 text-xs mb-1">Saúde Financeira</p>
                      <p className="text-receita font-bold">Excelente</p>
                    </div>
                  </div>
                </div>
                
                {/* Floating card */}
                <motion.div 
                  animate={{ y: [-10, 10, -10] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute -bottom-10 -right-6 lg:-right-10 bg-surface p-6 rounded-2xl shadow-xl shadow-black/50 border border-primary/30"
                >
                  <div className="flex items-center gap-4 mb-2">
                    <div className="bg-receita/20 p-2 rounded-lg">
                      <PieChart className="w-6 h-6 text-receita" />
                    </div>
                    <div>
                      <p className="text-sm text-zinc-400 font-medium">Metas Batidas</p>
                      <p className="text-lg font-bold text-white">3 no último mês</p>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-surface py-12 border-t border-surfaceHighlight">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center flex flex-col items-center">
          <div className="flex items-center gap-2 mb-4">
            <WalletCards className="w-6 h-6 text-primary" />
            <span className="text-lg font-bold text-white">FinanceApp</span>
          </div>
          <p className="text-zinc-500 text-sm">© 2026 Dashboard Finanças. Focado no seu sucesso absoluto.</p>
        </div>
      </footer>
    </div>
  );
}
