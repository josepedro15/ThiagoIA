export const ProblemVsSolution = () => {
    return (
        <section className="py-24 px-6 md:px-10 lg:px-20 bg-[#0b0f17] border-y-2 border-slate-800">
            <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-12 lg:gap-20">
                <div className="flex-1 border-2 border-red-500/30 bg-red-500/5 p-8 md:p-12 relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-full h-1 bg-red-500"></div>
                    <h3 className="text-3xl font-black text-white uppercase mb-8 flex items-center gap-3">
                        <span className="material-symbols-outlined text-red-500 text-4xl">warning</span>
                        O Ralo Financeiro
                    </h3>
                    <ul className="flex flex-col gap-6">
                        <li className="flex gap-4 text-slate-300">
                            <span className="material-symbols-outlined text-red-500 shrink-0">close</span>
                            <div>
                                <strong className="block text-white mb-1">Máquinas Paradas = Dinheiro Perdido</strong>
                                <p className="text-sm text-slate-400">Pacientes remarcados e agenda travada porque o técnico presencial demora (ou não atende no fim de semana).</p>
                            </div>
                        </li>
                        <li className="flex gap-4 text-slate-300">
                            <span className="material-symbols-outlined text-red-500 shrink-0">close</span>
                            <div>
                                <strong className="block text-white mb-1">Extorsão em Visitas (R$ 400 - R$ 1500)</strong>
                                <p className="text-sm text-slate-400">Pagar taxas abusivas de deslocamento e hora técnica para resolver problemas idiotas de software e sensores.</p>
                            </div>
                        </li>
                        <li className="flex gap-4 text-slate-300">
                            <span className="material-symbols-outlined text-red-500 shrink-0">close</span>
                            <div>
                                <strong className="block text-white mb-1">Dependência e Cegueira</strong>
                                <p className="text-sm text-slate-400">Ficar à mercê do 0800 de fabricantes que cobram licenças absurdas e escondem os manuais em inglês.</p>
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
                        <span className="material-symbols-outlined text-primary text-4xl">verified</span>
                        A Revolução Med IA
                    </h3>
                    <ul className="flex flex-col gap-6 relative z-10">
                        <li className="flex gap-4 text-slate-300">
                            <span className="material-symbols-outlined text-primary shrink-0">bolt</span>
                            <div>
                                <strong className="block text-white mb-1">Diagnóstico Instantâneo</strong>
                                <p className="text-sm text-slate-400">Receba o passo a passo exato (como um engenheiro faria) para destravar a máquina na hora, no chat.</p>
                            </div>
                        </li>
                        <li className="flex gap-4 text-slate-300">
                            <span className="material-symbols-outlined text-primary shrink-0">savings</span>
                            <div>
                                <strong className="block text-white mb-1">Custo Fixo Ridículo</strong>
                                <p className="text-sm text-slate-400">Por uma fração invisível do seu faturamento mensal, você tem blindagem total contra surpresas da TI médica.</p>
                            </div>
                        </li>
                        <li className="flex gap-4 text-slate-300">
                            <span className="material-symbols-outlined text-primary shrink-0">key</span>
                            <div>
                                <strong className="block text-white mb-1">Autonomia e Escala</strong>
                                <p className="text-sm text-slate-400">Acesse toda a base de manuais traduzida e processada. Retome o controle da sua operação e escale com tranquilidade.</p>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
        </section>
    );
};
