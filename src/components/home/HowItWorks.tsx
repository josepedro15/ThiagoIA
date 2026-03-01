export const HowItWorks = () => {
    return (
        <section className="py-24 px-6 md:px-10 lg:px-20 bg-[#151b26]">
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-16">
                    <h2 className="text-4xl md:text-5xl font-black text-white uppercase mb-4">Como Funciona</h2>
                    <p className="text-slate-400 text-lg">Três passos simples para nunca mais ficar na mão.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
                    {/* Connecting Line (Hidden on Mobile) */}
                    <div className="hidden md:block absolute top-12 left-[15%] right-[15%] h-0.5 bg-slate-700 z-0"></div>

                    {/* Step 1 */}
                    <div className="relative z-10 flex flex-col items-center text-center group">
                        <div className="w-24 h-24 rounded-full border-4 border-[#101622] bg-primary flex items-center justify-center mb-6 shadow-[0px_0px_20px_rgba(13,89,242,0.4)] group-hover:scale-110 transition-transform">
                            <span className="material-symbols-outlined text-white text-4xl">person_add</span>
                        </div>
                        <h4 className="text-2xl font-bold text-white mb-2 uppercase tracking-wide">1. Assine</h4>
                        <p className="text-slate-400 max-w-xs">Escolha o seu plano e faça a assinatura segura pelo Stripe em menos de 1 minuto.</p>
                    </div>

                    {/* Step 2 */}
                    <div className="relative z-10 flex flex-col items-center text-center group">
                        <div className="w-24 h-24 rounded-full border-4 border-[#101622] bg-[#ccfb4b] flex items-center justify-center mb-6 shadow-[0px_0px_20px_rgba(204,251,75,0.2)] group-hover:scale-110 transition-transform">
                            <span className="material-symbols-outlined text-black text-4xl">forum</span>
                        </div>
                        <h4 className="text-2xl font-bold text-white mb-2 uppercase tracking-wide">2. Chame no Whats</h4>
                        <p className="text-slate-400 max-w-xs">Você receberá o número exclusivo do Thiago IA. É só salvar e chamar quando precisar.</p>
                    </div>

                    {/* Step 3 */}
                    <div className="relative z-10 flex flex-col items-center text-center group">
                        <div className="w-24 h-24 rounded-full border-4 border-[#101622] bg-white flex items-center justify-center mb-6 shadow-[0px_0px_20px_rgba(255,255,255,0.2)] group-hover:scale-110 transition-transform">
                            <span className="material-symbols-outlined text-black text-4xl">build_circle</span>
                        </div>
                        <h4 className="text-2xl font-bold text-white mb-2 uppercase tracking-wide">3. Resolva</h4>
                        <p className="text-slate-400 max-w-xs">Envie a foto do erro ou descreva o problema. Receba o passo-a-passo e volte a trabalhar.</p>
                    </div>
                </div>
            </div>
        </section>
    );
};
