export default function BackgroundBlobs() {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
      {/* 1. Top Left - Lemon Rectangle */}
      <div className="absolute top-[-10%] left-[-5%] w-[40%] h-[30%] bg-[#DFFF00]/20 blur-[120px] rotate-12" />

      {/* 2. Middle Right - Soft White/Silver */}
      <div className="absolute top-[25%] right-[-10%] w-[35%] h-[40%] bg-slate-200/10 blur-[100px] -rotate-12" />

      {/* 3. Bottom Left - Deep Lemon/Yellow */}
      <div className="absolute bottom-[5%] left-[-10%] w-[45%] h-[35%] bg-[#EAFF00]/15 blur-[150px]" />

      {/* 4. Bottom Right - Accent Glow */}
      <div className="absolute bottom-[-5%] right-[10%] w-[30%] h-[25%] bg-[#DFFF00]/10 blur-[90px] rotate-45" />
    </div>
  );
}
