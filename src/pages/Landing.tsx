import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import {
  TrendingUp, ShieldCheck, Target, PieChart, ArrowRight,
  WalletCards, Zap, BarChart3, Brain, CheckCircle2, Sparkles,
  ArrowUpRight, Users, Clock, LineChart
} from 'lucide-react';

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i: number) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.6, delay: i * 0.1, ease: [0.25, 0.46, 0.45, 0.94] }
  })
};

const scaleIn = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] } }
};

export function Landing() {
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroOpacity = useTransform(scrollYProgress, [0, 1], [1, 0]);
  const heroScale = useTransform(scrollYProgress, [0, 1], [1, 0.95]);

  const stats = [
    { value: "12.4K+", label: "Usuários ativos", icon: <Users className="w-4 h-4" /> },
    { value: "R$ 2.1M", label: "Já economizados", icon: <TrendingUp className="w-4 h-4" /> },
    { value: "98.7%", label: "Satisfação", icon: <Sparkles className="w-4 h-4" /> },
    { value: "< 200ms", label: "Tempo de resposta", icon: <Clock className="w-4 h-4" /> }
  ];

  const services = [
    {
      title: "Controle Total de Gastos",
      description: "Categorize automaticamente seus lançamentos e visualize para onde cada centavo está indo em tempo real.",
      icon: <BarChart3 className="w-6 h-6" />,
      color: "text-primary",
      borderColor: "border-primary/20",
      bgGlow: "bg-primary/5",
    },
    {
      title: "Metas Inteligentes",
      description: "Defina limites de gastos por categoria. Receba alertas antes de estourar o orçamento e mantenha o foco.",
      icon: <Target className="w-6 h-6" />,
      color: "text-receita",
      borderColor: "border-receita/20",
      bgGlow: "bg-receita/5",
    },
    {
      title: "Caixinhas de Reserva",
      description: "Separe dinheiro do seu saldo principal para objetivos específicos: viagens, emergências ou investimentos.",
      icon: <PieChart className="w-6 h-6" />,
      color: "text-blue-400",
      borderColor: "border-blue-400/20",
      bgGlow: "bg-blue-400/5",
    },
    {
      title: "Consultoria com IA",
      description: "Análise mensal do seu perfil financeiro com dicas personalizadas geradas pelo Google Gemini 3.1 Flash.",
      icon: <Brain className="w-6 h-6" />,
      color: "text-amber-400",
      borderColor: "border-amber-400/20",
      bgGlow: "bg-amber-400/5",
    },
  ];

  const impacts = [
    {
      title: "Visão clara do seu patrimônio",
      description: "Chega de abrir 5 apps diferentes. Aqui você vê receitas, despesas, saldo livre e investimentos em uma única tela.",
    },
    {
      title: "Decisões baseadas em dados",
      description: "Com gráficos inteligentes e a análise da IA, você para de chutar e começa a decidir com precisão.",
    },
    {
      title: "Tranquilidade financeira",
      description: "Saber exatamente quanto entra e quanto sai elimina a ansiedade e te dá controle real sobre a sua vida.",
    },
  ];

  return (
    <div className="min-h-screen bg-background font-sans text-white selection:bg-primary/30 selection:text-white">
      {/* Header */}
      <header className="fixed w-full top-0 z-50 bg-background/60 backdrop-blur-xl border-b border-white/[0.06]">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2.5 group">
            <div className="relative">
              <div className="absolute inset-0 bg-primary/30 rounded-lg blur-md opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="relative bg-primary/15 p-1.5 rounded-lg border border-primary/30">
                <WalletCards className="w-5 h-5 text-primary" />
              </div>
            </div>
            <span className="text-[15px] font-semibold tracking-tight">FinanceApp</span>
          </Link>
          <div className="flex items-center gap-3">
            <Link to="/login" className="text-[13px] text-zinc-400 hover:text-white px-4 py-2 rounded-lg hover:bg-white/[0.06] transition-all">
              Entrar
            </Link>
            <Link to="/register" className="text-[13px] font-medium bg-white text-background px-4 py-2 rounded-lg hover:bg-zinc-200 transition-all active:scale-[0.98]">
              Começar grátis
            </Link>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section ref={heroRef} className="relative pt-32 pb-24 lg:pt-44 lg:pb-36 overflow-hidden">
        {/* Gradient orbs */}
        <div className="absolute top-20 left-1/2 -translate-x-1/2 w-[600px] h-[300px] opacity-[0.15] pointer-events-none">
          <div className="absolute inset-0 bg-gradient-to-b from-primary via-blue-500 to-transparent rounded-full blur-[100px]" />
        </div>
        <div className="absolute top-60 -left-40 w-[400px] h-[400px] opacity-[0.08] pointer-events-none">
          <div className="absolute inset-0 bg-receita rounded-full blur-[120px]" />
        </div>

        <motion.div style={{ opacity: heroOpacity, scale: heroScale }} className="max-w-4xl mx-auto px-6 relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 bg-white/[0.06] border border-white/[0.08] rounded-full px-4 py-1.5 mb-8"
          >
            <Sparkles className="w-3.5 h-3.5 text-primary" />
            <span className="text-[12px] text-zinc-400 font-medium tracking-wide">Agora com Inteligência Artificial integrada</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl sm:text-5xl lg:text-[64px] font-bold tracking-[-0.03em] leading-[1.1] mb-6"
          >
            Suas finanças no
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-blue-400 to-receita">
              piloto automático.
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-base sm:text-lg text-zinc-400 max-w-xl mx-auto mb-10 leading-relaxed"
          >
            Organize gastos, crie metas, monte reservas e receba insights financeiros personalizados — tudo em uma plataforma que funciona por você.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-3 justify-center"
          >
            <Link to="/register" className="group inline-flex items-center justify-center gap-2 bg-white text-background px-7 py-3.5 rounded-xl text-[15px] font-semibold transition-all hover:shadow-[0_0_40px_-10px_rgba(139,92,246,0.5)] hover:scale-[1.02] active:scale-[0.98]">
              Vamos Começar
              <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
            </Link>
            <Link to="/login" className="inline-flex items-center justify-center gap-2 bg-white/[0.06] border border-white/[0.08] text-zinc-300 px-7 py-3.5 rounded-xl text-[15px] font-medium hover:bg-white/[0.1] hover:text-white transition-all">
              Já tenho conta
            </Link>
          </motion.div>
        </motion.div>
      </section>

      {/* Social proof / Stats */}
      <section className="border-y border-white/[0.06] bg-surface/50">
        <div className="max-w-6xl mx-auto px-6 py-10">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-0 lg:divide-x lg:divide-white/[0.06]">
            {stats.map((stat, i) => (
              <motion.div
                key={i}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                custom={i}
                variants={fadeUp}
                className="flex flex-col items-center lg:px-8"
              >
                <div className="flex items-center gap-1.5 text-zinc-500 mb-1.5">
                  {stat.icon}
                  <span className="text-[11px] font-medium uppercase tracking-widest">{stat.label}</span>
                </div>
                <span className="text-2xl lg:text-3xl font-bold tracking-tight">{stat.value}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="py-24 lg:py-32 relative">
        <div className="max-w-6xl mx-auto px-6">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={0} className="text-center mb-16">
            <span className="text-[12px] font-semibold text-primary uppercase tracking-[0.2em] mb-3 block">Serviços</span>
            <h2 className="text-3xl lg:text-4xl font-bold tracking-tight mb-4">
              Ferramentas que trabalham por você.
            </h2>
            <p className="text-zinc-400 max-w-lg mx-auto text-[15px]">
              Cada funcionalidade foi projetada para eliminar complexidade e te dar clareza financeira absoluta.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-4">
            {services.map((service, i) => (
              <motion.div
                key={i}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                custom={i}
                variants={fadeUp}
                className={`group relative p-7 rounded-2xl border border-white/[0.06] bg-surface/50 hover:bg-surface transition-all duration-300 cursor-default overflow-hidden`}
              >
                <div className={`absolute inset-0 ${service.bgGlow} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
                <div className="relative z-10">
                  <div className={`inline-flex p-2.5 rounded-xl ${service.borderColor} border bg-white/[0.03] mb-5 ${service.color}`}>
                    {service.icon}
                  </div>
                  <h3 className="text-lg font-semibold mb-2 tracking-tight">{service.title}</h3>
                  <p className="text-zinc-400 text-[14px] leading-relaxed">{service.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Quality / Dashboard Preview */}
      <section className="py-24 lg:py-32 border-t border-white/[0.06] relative overflow-hidden">
        <div className="absolute right-0 top-0 w-[500px] h-[500px] opacity-[0.06] pointer-events-none">
          <div className="absolute inset-0 bg-primary rounded-full blur-[150px]" />
        </div>

        <div className="max-w-6xl mx-auto px-6">
          <div className="flex flex-col lg:flex-row items-center gap-16">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={scaleIn} className="lg:w-1/2 order-2 lg:order-1">
              <div className="relative bg-surface rounded-2xl border border-white/[0.06] p-6 shadow-2xl shadow-black/20">
                {/* Window bar */}
                <div className="flex items-center justify-between mb-6 pb-4 border-b border-white/[0.06]">
                  <div className="flex gap-1.5">
                    <div className="w-2.5 h-2.5 rounded-full bg-despesa/80"></div>
                    <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/80"></div>
                    <div className="w-2.5 h-2.5 rounded-full bg-receita/80"></div>
                  </div>
                  <span className="text-[11px] text-zinc-500 font-mono">dashboard — financas.app</span>
                </div>

                {/* Dashboard mockup */}
                <div className="space-y-5">
                  <div className="flex items-end justify-between">
                    <div>
                      <p className="text-[11px] text-zinc-500 uppercase tracking-widest mb-1">Patrimônio Líquido</p>
                      <p className="text-3xl font-bold tracking-tight">R$ 47.830<span className="text-zinc-500">,62</span></p>
                    </div>
                    <div className="flex items-center gap-1 text-receita text-[13px] font-semibold">
                      <ArrowUpRight className="w-3.5 h-3.5" />
                      +8.2% este mês
                    </div>
                  </div>

                  {/* Mini chart bars */}
                  <div className="flex items-end gap-1 h-16">
                    {[40, 55, 45, 70, 65, 80, 75, 90, 85, 95, 88, 100].map((h, i) => (
                      <motion.div
                        key={i}
                        initial={{ height: 0 }}
                        whileInView={{ height: `${h}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: i * 0.05 }}
                        className={`flex-1 rounded-sm ${i >= 10 ? 'bg-primary' : 'bg-white/[0.08]'}`}
                      />
                    ))}
                  </div>

                  <div className="grid grid-cols-3 gap-3">
                    <div className="bg-background rounded-xl p-3 border border-white/[0.06]">
                      <p className="text-[10px] text-zinc-500 uppercase tracking-wider mb-0.5">Receitas</p>
                      <p className="text-sm font-bold text-receita">R$ 8.420</p>
                    </div>
                    <div className="bg-background rounded-xl p-3 border border-white/[0.06]">
                      <p className="text-[10px] text-zinc-500 uppercase tracking-wider mb-0.5">Despesas</p>
                      <p className="text-sm font-bold text-despesa">R$ 5.130</p>
                    </div>
                    <div className="bg-background rounded-xl p-3 border border-white/[0.06]">
                      <p className="text-[10px] text-zinc-500 uppercase tracking-wider mb-0.5">Caixinhas</p>
                      <p className="text-sm font-bold text-primary">R$ 12.500</p>
                    </div>
                  </div>
                </div>

                {/* Floating AI card */}
                <motion.div
                  animate={{ y: [-6, 6, -6] }}
                  transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute -bottom-8 -right-4 lg:-right-8 bg-surface p-4 rounded-xl shadow-xl shadow-black/40 border border-primary/20 max-w-[200px]"
                >
                  <div className="flex items-center gap-2 mb-2">
                    <Brain className="w-4 h-4 text-primary" />
                    <span className="text-[11px] font-semibold text-zinc-300">IA Financeira</span>
                  </div>
                  <p className="text-[11px] text-zinc-400 leading-relaxed">
                    "Seus gastos com alimentação caíram 15%. Continue assim!"
                  </p>
                </motion.div>
              </div>
            </motion.div>

            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={0} className="lg:w-1/2 order-1 lg:order-2">
              <span className="text-[12px] font-semibold text-receita uppercase tracking-[0.2em] mb-3 block">Qualidade Premium</span>
              <h2 className="text-3xl lg:text-4xl font-bold tracking-tight mb-6 leading-tight">
                Interface de nível profissional. Performance de nível enterprise.
              </h2>
              <p className="text-zinc-400 text-[15px] leading-relaxed mb-8">
                Nada de telas lentas ou interfaces poluídas. Cada pixel foi pensado para te entregar a informação certa, no momento certo, com velocidade e elegância.
              </p>

              <div className="space-y-4">
                {[
                  "Dashboard com atualização em tempo real",
                  "Design responsivo para mobile e desktop",
                  "Dados criptografados e 100% seguros",
                ].map((item, i) => (
                  <motion.div key={i} initial="hidden" whileInView="visible" viewport={{ once: true }} custom={i + 1} variants={fadeUp} className="flex items-center gap-3">
                    <CheckCircle2 className="w-4 h-4 text-receita flex-shrink-0" />
                    <span className="text-[14px] text-zinc-300">{item}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Impact */}
      <section className="py-24 lg:py-32 border-t border-white/[0.06] bg-surface/30">
        <div className="max-w-6xl mx-auto px-6">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={0} className="text-center mb-16">
            <span className="text-[12px] font-semibold text-amber-400 uppercase tracking-[0.2em] mb-3 block">Nosso Impacto</span>
            <h2 className="text-3xl lg:text-4xl font-bold tracking-tight mb-4">
              Não é sobre números.<br />É sobre a sua tranquilidade.
            </h2>
            <p className="text-zinc-400 max-w-lg mx-auto text-[15px]">
              O verdadeiro objetivo do controle financeiro é te devolver tempo, paz e liberdade para viver melhor.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-4">
            {impacts.map((impact, i) => (
              <motion.div
                key={i}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                custom={i}
                variants={fadeUp}
                className="group relative p-7 rounded-2xl border border-white/[0.06] bg-background/50 hover:border-amber-400/20 transition-all duration-300"
              >
                <span className="text-[48px] font-black text-white/[0.03] absolute top-4 right-6 group-hover:text-white/[0.06] transition-colors">
                  0{i + 1}
                </span>
                <h3 className="text-lg font-semibold mb-3 tracking-tight">{impact.title}</h3>
                <p className="text-zinc-400 text-[14px] leading-relaxed">{impact.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Final */}
      <section className="py-24 lg:py-32 border-t border-white/[0.06] relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.06] pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-primary rounded-full blur-[150px]" />
        </div>
        <div className="max-w-3xl mx-auto px-6 text-center relative z-10">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={scaleIn}>
            <h2 className="text-3xl lg:text-5xl font-bold tracking-tight mb-6">
              Pronto para transformar suas finanças?
            </h2>
            <p className="text-zinc-400 text-[15px] mb-10 max-w-md mx-auto">
              Crie sua conta em menos de 30 segundos. Sem cartão de crédito. Sem compromisso.
            </p>
            <Link to="/register" className="group inline-flex items-center gap-2 bg-white text-background px-8 py-4 rounded-xl text-[15px] font-semibold transition-all hover:shadow-[0_0_60px_-15px_rgba(139,92,246,0.6)] hover:scale-[1.02] active:scale-[0.98]">
              Criar minha conta grátis
              <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/[0.06] py-8">
        <div className="max-w-6xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <WalletCards className="w-4 h-4 text-primary" />
            <span className="text-[13px] font-semibold">FinanceApp</span>
          </div>
          <p className="text-[12px] text-zinc-500">© 2026 Dashboard Finanças — Feito para o seu sucesso financeiro.</p>
        </div>
      </footer>
    </div>
  );
}
