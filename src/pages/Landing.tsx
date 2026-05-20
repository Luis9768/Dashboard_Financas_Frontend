import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { TrendingUp, ShieldCheck, Target, PieChart, ArrowRight, WalletCards } from 'lucide-react';

export function Landing() {
  const features = [
    {
      title: "Controle Inteligente",
      description: "Saiba exatamente para onde vai o seu dinheiro e mantenha suas finanças sob controle com relatórios visuais.",
      icon: <PieChart className="w-8 h-8 text-blue-500" />,
    },
    {
      title: "Metas e Caixinhas",
      description: "Crie metas de gastos para o mês e guarde seu dinheiro em caixinhas separadas para os seus maiores sonhos.",
      icon: <Target className="w-8 h-8 text-green-500" />,
    },
    {
      title: "Insights do Mercado",
      description: "Nossa IA analisa o mercado financeiro e o seu padrão de gastos para sugerir as melhores estratégias de reserva.",
      icon: <TrendingUp className="w-8 h-8 text-purple-500" />,
    },
    {
      title: "Segurança de Dados",
      description: "Suas informações estão protegidas com os mais altos padrões de segurança, criptografia e privacidade.",
      icon: <ShieldCheck className="w-8 h-8 text-orange-500" />,
    }
  ];

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-800">
      {/* Header */}
      <header className="fixed w-full top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="bg-blue-600 p-2 rounded-xl">
              <WalletCards className="w-6 h-6 text-white" />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-blue-700 to-indigo-600 bg-clip-text text-transparent">
              FinanceApp
            </span>
          </div>
          <div className="flex items-center gap-4">
            <Link to="/login" className="text-slate-600 font-medium hover:text-blue-600 transition-colors">
              Entrar
            </Link>
            <Link to="/register" className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-full font-medium transition-all shadow-lg shadow-blue-200">
              Cadastrar
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] opacity-20 pointer-events-none">
          <div className="absolute inset-0 bg-gradient-to-b from-blue-400 to-purple-500 rounded-full blur-[100px]" />
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-5xl lg:text-7xl font-extrabold tracking-tight text-slate-900 mb-8"
          >
            Domine o seu <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">Futuro Financeiro</span>
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-xl text-slate-600 max-w-2xl mx-auto mb-12"
          >
            A plataforma definitiva para organizar seus gastos, poupar para o que importa e investir melhor com a ajuda de Inteligência Artificial.
          </motion.p>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Link to="/register" className="group flex items-center justify-center gap-2 bg-slate-900 hover:bg-slate-800 text-white px-8 py-4 rounded-full text-lg font-semibold transition-all hover:scale-105 active:scale-95 shadow-xl shadow-slate-300">
              Vamos Começar
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Features / Mercados Financeiros */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-slate-900 mb-4">
              Tudo que você precisa em um só lugar
            </h2>
            <p className="text-slate-600 max-w-2xl mx-auto">
              Seja para organizar as contas do mês ou entender melhor como proteger o seu patrimônio da inflação, nós temos as ferramentas certas.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-slate-50 p-8 rounded-3xl border border-slate-100 hover:border-blue-200 hover:shadow-xl hover:shadow-blue-50 transition-all cursor-pointer group"
              >
                <div className="bg-white w-16 h-16 rounded-2xl flex items-center justify-center mb-6 shadow-sm group-hover:scale-110 transition-transform">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">{feature.title}</h3>
                <p className="text-slate-600 leading-relaxed">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Educacional / Dica */}
      <section className="py-20 bg-slate-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row items-center gap-16">
            <div className="lg:w-1/2">
              <motion.div 
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
              >
                <h2 className="text-3xl lg:text-5xl font-bold mb-6">
                  Inteligência que trabalha pelo seu bolso.
                </h2>
                <p className="text-slate-400 text-lg mb-8 leading-relaxed">
                  O mercado financeiro muda todos os dias. Com a inflação e as taxas de juros oscilando, ter um planejamento claro deixou de ser um luxo para ser uma necessidade. 
                  <br/><br/>
                  Nossa plataforma ajuda você a criar metas e alocar o seu orçamento para que o seu dinheiro pare de perder valor.
                </p>
                <Link to="/register" className="inline-flex items-center gap-2 text-blue-400 hover:text-blue-300 font-semibold text-lg transition-colors">
                  Crie sua conta gratuitamente <ArrowRight className="w-5 h-5" />
                </Link>
              </motion.div>
            </div>
            
            <div className="lg:w-1/2 w-full">
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                className="relative bg-slate-800 rounded-3xl p-8 border border-slate-700 shadow-2xl"
              >
                <div className="flex gap-4 mb-8">
                  <div className="w-3 h-3 rounded-full bg-red-500"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                  <div className="w-3 h-3 rounded-full bg-green-500"></div>
                </div>
                <div className="space-y-6">
                  <div className="h-4 bg-slate-700 rounded-full w-3/4"></div>
                  <div className="h-4 bg-slate-700 rounded-full w-full"></div>
                  <div className="h-4 bg-slate-700 rounded-full w-5/6"></div>
                  <div className="h-4 bg-slate-700 rounded-full w-2/3"></div>
                </div>
                
                {/* Floating card */}
                <motion.div 
                  animate={{ y: [-10, 10, -10] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute -bottom-10 -right-6 lg:-right-10 bg-white p-6 rounded-2xl shadow-xl max-w-xs border border-slate-100"
                >
                  <div className="flex items-center gap-4 mb-3">
                    <div className="bg-green-100 p-2 rounded-lg">
                      <TrendingUp className="w-6 h-6 text-green-600" />
                    </div>
                    <div>
                      <p className="text-sm text-slate-500 font-medium">Rentabilidade</p>
                      <p className="text-lg font-bold text-slate-900">+12,5% a.a.</p>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white py-12 border-t border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-slate-500">
          <p>© 2026 Dashboard Finanças. Desenvolvido para transformar sua relação com o dinheiro.</p>
        </div>
      </footer>
    </div>
  );
}
