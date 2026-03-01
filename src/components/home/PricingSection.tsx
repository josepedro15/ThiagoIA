export const PricingSection = () => {
    return (
        <section className="py-24 px-6 md:px-10 lg:px-20 bg-[#101622] relative" id="pricing">
            <div className="absolute top-20 right-0 w-1/2 h-full bg-primary/5 -skew-x-12 pointer-events-none"></div>
            <div className="max-w-7xl mx-auto relative z-10">
                <div className="text-center mb-16">
                    <h2 className="text-4xl md:text-5xl font-black text-white uppercase mb-4">Investimento</h2>
                    <p className="text-slate-400 text-lg">Pare de gastar milhares com manutenções básicas que você mesmo pode resolver.</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 max-w-4xl mx-auto gap-8 justify-center">
                    {/* Monthly Plan */}
                    <div className="w-full border-2 border-slate-700 bg-[#151b26] p-8 flex flex-col h-full relative group hover:border-[#ccfb4b] transition-colors">
                        <h3 className="text-xl font-bold text-slate-300 uppercase tracking-widest mb-2 group-hover:text-[#ccfb4b] transition-colors">Mensal</h3>
                        <div className="text-5xl font-black text-white mb-6">R$ 47<span className="text-lg font-medium text-slate-500">/mês</span></div>
                        <p className="text-slate-300 text-sm mb-8 border-b border-slate-700 pb-8">Compromisso leve. Teste e comprove a eficiência do Thiago IA na sua clínica.</p>
                        <ul className="flex flex-col gap-4 mb-8 flex-1">
                            <li className="flex items-center gap-3 text-sm text-slate-300">
                                <span className="material-symbols-outlined text-[#ccfb4b] text-lg">check_circle</span>
                                Acesso completo 24h no WhatsApp
                            </li>
                            <li className="flex items-center gap-3 text-sm text-slate-300">
                                <span className="material-symbols-outlined text-[#ccfb4b] text-lg">check_circle</span>
                                Consultas técnicas ilimitadas
                            </li>
                            <li className="flex items-center gap-3 text-sm text-slate-300">
                                <span className="material-symbols-outlined text-[#ccfb4b] text-lg">check_circle</span>
                                Diagnóstico de falhas via chat
                            </li>
                            <li className="flex items-center gap-3 text-sm text-slate-300">
                                <span className="material-symbols-outlined text-[#ccfb4b] text-lg">check_circle</span>
                                Garantia Incondicional de 7 dias
                            </li>
                        </ul>
                        <a href="https://buy.stripe.com/dRmfZh5vH4RF1tdeu028800" target="_blank" rel="noopener noreferrer" className="flex justify-center items-center w-full py-4 border-2 border-slate-600 text-white font-bold uppercase tracking-wider hover:bg-slate-700 transition-colors shadow-brutalist hover:shadow-none focus:translate-y-1 focus:translate-x-1">
                            Assinar Mensal
                        </a>
                    </div>

                    {/* Yearly Plan */}
                    <div className="w-full border-4 border-primary bg-[#151b26] p-8 flex flex-col h-full relative shadow-[0px_0px_40px_rgba(13,89,242,0.15)] transform md:-translate-y-4">
                        <div className="absolute top-0 right-0 bg-primary text-white text-xs font-bold uppercase py-1 px-3">2 Meses Grátis</div>
                        <h3 className="text-xl font-bold text-primary uppercase tracking-widest mb-2">Anual</h3>
                        <div className="text-5xl font-black text-white mb-6">R$ 470<span className="text-lg font-medium text-slate-500">/ano</span></div>
                        <p className="text-slate-200 text-sm mb-8 border-b border-primary/30 pb-8">Para clínicas que querem tranquilidade o ano inteiro, com a melhor economia.</p>
                        <ul className="flex flex-col gap-4 mb-8 flex-1">
                            <li className="flex items-center gap-3 text-sm text-white font-bold">
                                <span className="material-symbols-outlined text-primary text-lg">check_circle</span>
                                Tudo do plano Mensal
                            </li>
                            <li className="flex items-center gap-3 text-sm text-white font-bold">
                                <span className="material-symbols-outlined text-primary text-lg">workspace_premium</span>
                                Prioridade no Atendimento Base
                            </li>
                            <li className="flex items-center gap-3 text-sm text-white font-bold">
                                <span className="material-symbols-outlined text-primary text-lg">savings</span>
                                Economia de R$ 94,00 no ano
                            </li>
                            <li className="flex items-center gap-3 text-sm text-white font-bold">
                                <span className="material-symbols-outlined text-primary text-lg">check_circle</span>
                                Garantia Incondicional de 7 dias
                            </li>
                        </ul>
                        <a href="https://buy.stripe.com/dRmaEX6zL2Jx0p94Tq28801" target="_blank" rel="noopener noreferrer" className="flex justify-center items-center w-full py-4 bg-primary text-white font-bold uppercase tracking-wider hover:bg-blue-600 transition-colors shadow-[4px_4px_0px_0px_#ffffff] hover:translate-x-[2px] hover:translate-y-[2px]">
                            Assinar Anual
                        </a>
                    </div>
                </div>
            </div>
        </section>
    );
};
