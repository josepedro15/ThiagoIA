export const HeroSection = () => {
    return (
        <section className="relative px-6 py-20 md:px-10 lg:px-20 border-b-2 border-slate-800">
            {/* Grid Background Pattern */}
            <div className="absolute inset-0 z-0 opacity-10" style={{ backgroundImage: 'radial-gradient(#334155 1px, transparent 1px)', backgroundSize: '32px 32px' }}></div>
            <div className="relative z-10 mx-auto max-w-7xl grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                <div className="flex flex-col gap-8">
                    <div className="inline-flex w-fit items-center gap-2 border border-primary/50 bg-primary/10 px-3 py-1 text-xs font-bold text-primary uppercase tracking-wider">
                        <span className="size-2 bg-[#ccfb4b] rounded-full animate-pulse"></span>
                        Atendimento 24h Disponível
                    </div>
                    <h1 className="text-5xl md:text-7xl lg:text-8xl font-black leading-[0.9] tracking-tighter text-white uppercase">
                        Técnico <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-blue-400">Expert</span> de Bolso.
                    </h1>
                    <p className="text-lg md:text-xl text-slate-400 font-medium max-w-lg border-l-4 border-primary pl-6">
                        Especialista em Ecocardiógrafos, Mamógrafos, Densitometria Óssea e Ultrassom. Resolva problemas na hora via WhatsApp, por uma fração do custo de uma visita técnica.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 pt-4">
                        <a href="https://buy.stripe.com/dRmfZh5vH4RF1tdeu028800" target="_blank" rel="noopener noreferrer" className="flex items-center justify-center h-14 px-8 bg-white text-black border-2 border-white text-base font-black uppercase tracking-wide hover:bg-slate-200 transition-colors shadow-[6px_6px_0px_0px_#0d59f2] hover:translate-x-[2px] hover:translate-y-[2px]">
                            Assinar Agora (R$ 47/m)
                            <span className="material-symbols-outlined ml-2">arrow_forward</span>
                        </a>
                        <a href="https://wa.me/5511999999999?text=Oi%20ThiagoIA!%20Tenho%20uma%20d%C3%BAvida%20sobre%20meu%20equipamento." target="_blank" rel="noopener noreferrer" className="flex items-center justify-center h-14 px-8 bg-transparent text-white border-2 border-slate-600 text-base font-bold uppercase tracking-wide hover:border-white transition-colors">
                            Testar Grátis
                            <span className="material-symbols-outlined ml-2">chat</span>
                        </a>
                    </div>
                </div>
                <div className="relative w-full aspect-square lg:aspect-auto lg:h-[600px] border-2 border-slate-700 bg-[#0f141c] overflow-hidden group">
                    <div className="absolute flex flex-col items-center justify-center inset-0 bg-[#0b0f17] z-0 p-8">
                        <div className="w-full max-w-sm rounded-[2rem] border-4 border-slate-700 bg-[#101622] p-4 shadow-brutalist flex flex-col gap-4 relative">
                            <div className="absolute top-4 right-1/2 translate-x-1/2 w-16 h-2 bg-slate-800 rounded-full"></div>
                            <div className="flex items-center gap-3 border-b-2 border-slate-800 pb-3 mt-4">
                                <div className="size-10 rounded-full bg-primary flex items-center justify-center text-white"><span className="material-symbols-outlined">support_agent</span></div>
                                <div>
                                    <p className="text-white font-bold text-sm">Técnico Thiago IA</p>
                                    <p className="text-[#ccfb4b] text-xs">Online agora</p>
                                </div>
                            </div>
                            <div className="flex flex-col gap-3 font-sans">
                                <div className="self-end bg-slate-800 text-slate-200 text-sm p-3 rounded-l-xl rounded-tr-xl max-w-[85%]">
                                    A imagem do meu ecocardiógrafo tá granulada, o que eu faço?
                                </div>
                                <div className="self-start bg-primary text-white text-sm p-3 rounded-r-xl rounded-tl-xl max-w-[85%] shadow-[2px_2px_0px_0px_#ccfb4b]">
                                    Vamos resolver isso agora! Tenta diminuir o "Gain" e ajustar a frequência para uma mais alta. Me diz se melhorou!
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};
