export default function ParticleBackground() {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-blue-600/10 blur-[100px] animate-float" style={{ animationDelay: '0s' }} />
      <div className="absolute top-[20%] right-[-5%] w-[30%] h-[50%] rounded-full bg-cyan-600/10 blur-[120px] animate-float" style={{ animationDelay: '2s' }} />
      <div className="absolute bottom-[-10%] left-[20%] w-[50%] h-[40%] rounded-full bg-emerald-600/10 blur-[100px] animate-float" style={{ animationDelay: '4s' }} />
      
      {/* Drifting particles */}
      <div className="absolute top-[30%] left-[10%] w-[300px] h-[300px] rounded-full bg-blue-500/5 blur-[80px]" style={{ animation: 'particle-drift 20s infinite alternate ease-in-out' }} />
      <div className="absolute bottom-[20%] right-[10%] w-[250px] h-[250px] rounded-full bg-cyan-500/5 blur-[60px]" style={{ animation: 'particle-drift 25s infinite alternate-reverse ease-in-out', animationDelay: '5s' }} />
    </div>
  );
}
