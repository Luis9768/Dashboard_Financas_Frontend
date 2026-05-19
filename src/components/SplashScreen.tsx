import { Loader2, Wallet } from 'lucide-react';

export function SplashScreen() {
  return (
    <div className="fixed inset-0 z-[999] flex flex-col items-center justify-center bg-background overflow-hidden">
      
      {/* Luzes de fundo neon pulsantes */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60vw] h-[60vw] bg-primary/20 rounded-full blur-[100px] animate-pulse pointer-events-none" />
      <div className="absolute top-1/3 left-1/3 -translate-x-1/2 -translate-y-1/2 w-[40vw] h-[40vw] bg-purple-500/10 rounded-full blur-[100px] animate-pulse pointer-events-none delay-700" />
      
      <div className="relative z-10 flex flex-col items-center animate-in fade-in zoom-in duration-700">
        <div className="relative">
          {/* Círculos giratórios */}
          <div className="absolute inset-0 rounded-full border-t-2 border-primary w-24 h-24 animate-spin" />
          <div className="absolute inset-2 rounded-full border-b-2 border-purple-500 w-20 h-20 animate-spin-reverse" style={{ animationDirection: 'reverse', animationDuration: '1.5s' }} />
          
          {/* Ícone central */}
          <div className="w-24 h-24 bg-surfaceHighlight/50 backdrop-blur-md rounded-full flex items-center justify-center shadow-[0_0_50px_rgba(139,92,246,0.2)] border border-white/5">
            <Wallet size={40} className="text-white animate-pulse" />
          </div>
        </div>
        
        <h1 className="mt-8 text-2xl font-bold text-white tracking-widest uppercase flex items-center gap-2">
          Carregando
          <span className="flex gap-1">
            <span className="w-1.5 h-1.5 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
            <span className="w-1.5 h-1.5 bg-primary rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
            <span className="w-1.5 h-1.5 bg-primary rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
          </span>
        </h1>
        <p className="text-zinc-500 mt-2 text-sm tracking-wide">Sincronizando seus dados financeiros...</p>
      </div>
    </div>
  );
}
