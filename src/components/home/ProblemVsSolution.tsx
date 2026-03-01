export const ProblemVsSolution = () => {
    return (
        <section className="py-24 px-6 md:px-10 lg:px-20 bg-[#0b0f17] border-y-2 border-slate-800">
            <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-12 lg:gap-20">
                <div className="flex-1 border-2 border-red-500/30 bg-red-500/5 p-8 md:p-12 relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-full h-1 bg-red-500"></div>
                    <h3 className="text-3xl font-black text-white uppercase mb-8 flex items-center gap-3">
                        <span className="material-symbols-outlined text-red-500 text-4xl">cancel</span>
                        Sem o Thiago IA
                    </h3>
                    <ul className="flex flex-col gap-6">
                        <li className="flex gap-4 text-slate-300">
                            <span className="material-symbols-outlined text-red-500 shrink-0">close</span>
                            <div>
                                <strong className="block text-white mb-1">Máquinas paradas por horas</strong>
                                <p className="text-sm text-slate-400">Pacientes esperando e agenda atrasada porque o técnico presencial demora para chegar.</p>
                            </div>
                        </li>
                        <li className="flex gap-4 text-slate-300">
                            <span className="material-symbols-outlined text-red-500 shrink-0">close</span>
                            <div>
                                <strong className="block text-white mb-1">Custos altíssimos (R$ 400 - R$ 1200)</strong>
                                <p className="text-sm text-slate-400">Pagamento de taxas core, deslocamento e horas de visita para problemas que eram apenas de configuração.</p>
                            </div>
                        </li>
                        <li className="flex gap-4 text-slate-300">
                            <span className="material-symbols-outlined text-red-500 shrink-0">close</span>
                            <div>
                                <strong className="block text-white mb-1">Falta de Suporte Direto</strong>
                                <p className="text-sm text-slate-400">Ligar para 0800, cair em atendentes genéricos que não entendem a urgência da sua clínica.</p>
                            </div>
                        </li>
                    </ul>
                </div>

                <div className="flex-1 border-2 border-primary/30 bg-primary/5 p-8 md:p-12 relative overflow-hidden shadow-[0px_0px_40px_rgba(13,89,242,0.1)]">
                    <div className="absolute top-0 left-0 w-full h-1 bg-primary"></div>
                    <div className="absolute -right-10 -bottom-10 opacity-5 pointer-events-none">
                        <span className="material-symbols-outlined" style={{ fontSize: '200px' }}>rocket_launch</span>
                    </div>
                    <h3 className="text-3xl font-black text-white uppercase mb-8 flex items-center gap-3">
                        <span className="material-symbols-outlined text-primary text-4xl">check_circle</span>
                        Com o Thiago IA
                    </h3>
                    <ul className="flex flex-col gap-6 relative z-10">
                        <li className="flex gap-4 text-slate-300">
                            <span className="material-symbols-outlined text-primary shrink-0">check</span>
                            <div>
                                <strong className="block text-white mb-1">Solução em Segundos</strong>
                                <p className="text-sm text-slate-400">Receba o passo a passo exato para resolver o problema na hora, direto pelo WhatsApp.</p>
                            </div>
                        </li>
                        <li className="flex gap-4 text-slate-300">
                            <span className="material-symbols-outlined text-primary shrink-0">check</span>
                            <div>
                                <strong className="block text-white mb-1">Economia Garantida</strong>
                                <p className="text-sm text-slate-400">Por uma fração do valor de uma visita técnica, você tem suporte ilimitado o mês inteiro.</p>
                            </div>
                        </li>
                        <li className="flex gap-4 text-slate-300">
                            <span className="material-symbols-outlined text-primary shrink-0">check</span>
                            <div>
                                <strong className="block text-white mb-1">Especialista no Bolso</strong>
                                <p className="text-sm text-slate-400">Treinado com os principais manuais e guias de serviço das maiores marcas do mercado.</p>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
        </section>
    );
};
