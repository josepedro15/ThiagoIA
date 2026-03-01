export const BenefitsSection = () => {
    return (
        <section className="py-24 px-6 md:px-10 lg:px-20 bg-[#101622]" id="features">
            <div className="max-w-7xl mx-auto">
                <div className="mb-16 border-l-8 border-primary pl-6">
                    <h2 className="text-4xl md:text-5xl font-black text-white uppercase mb-4">Seu Técnico Pessoal</h2>
                    <p className="text-slate-400 text-lg max-w-2xl">Não pare seus exames por problemas técnicos. Resolução imediata com respostas exatas e precisas.</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {/* Feature 1 */}
                    <div className="group border-2 border-slate-700 bg-[#151b26] p-8 hover:border-primary transition-colors hover:shadow-[8px_8px_0px_0px_#0d59f2] relative overflow-hidden">
                        <div className="absolute -right-4 -top-4 text-9xl text-slate-800/20 font-black group-hover:text-primary/10 transition-colors select-none">01</div>
                        <div className="relative z-10">
                            <div className="size-14 border-2 border-white flex items-center justify-center mb-6 bg-black text-primary group-hover:bg-primary group-hover:text-white transition-colors">
                                <span className="material-symbols-outlined text-3xl">schedule</span>
                            </div>
                            <h3 className="text-2xl font-bold text-white mb-3 uppercase">Atendimento 24h</h3>
                            <p className="text-slate-400 leading-relaxed">Deu erro no equipamento 3 da manhã? O Thiago IA te responde via WhatsApp em menos de 30 segundos.</p>
                        </div>
                    </div>
                    {/* Feature 2 */}
                    <div className="group border-2 border-slate-700 bg-[#151b26] p-8 hover:border-[#ccfb4b] transition-colors hover:shadow-[8px_8px_0px_0px_#ccfb4b] relative overflow-hidden">
                        <div className="absolute -right-4 -top-4 text-9xl text-slate-800/20 font-black group-hover:text-[#ccfb4b]/10 transition-colors select-none">02</div>
                        <div className="relative z-10">
                            <div className="size-14 border-2 border-white flex items-center justify-center mb-6 bg-black text-[#ccfb4b] group-hover:bg-[#ccfb4b] group-hover:text-black transition-colors">
                                <span className="material-symbols-outlined text-3xl">medical_services</span>
                            </div>
                            <h3 className="text-2xl font-bold text-white mb-3 uppercase">Especialista Completo</h3>
                            <p className="text-slate-400 leading-relaxed">Conhecimento avançado em Ecocardiógrafos, Mamógrafos, Densitometria e Ultrassom de diversas marcas.</p>
                        </div>
                    </div>
                    {/* Feature 3 */}
                    <div className="group border-2 border-slate-700 bg-[#151b26] p-8 hover:border-primary transition-colors hover:shadow-[8px_8px_0px_0px_#0d59f2] relative overflow-hidden">
                        <div className="absolute -right-4 -top-4 text-9xl text-slate-800/20 font-black group-hover:text-primary/10 transition-colors select-none">03</div>
                        <div className="relative z-10">
                            <div className="size-14 border-2 border-white flex items-center justify-center mb-6 bg-black text-primary group-hover:bg-primary group-hover:text-white transition-colors">
                                <span className="material-symbols-outlined text-3xl">savings</span>
                            </div>
                            <h3 className="text-2xl font-bold text-white mb-3 uppercase">Economia Real</h3>
                            <p className="text-slate-400 leading-relaxed">Evite gastar R$ 400+ em uma visita técnica presencial. Resolva 80% dos problemas simples via chat.</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};
