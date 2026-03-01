export const FaqSection = () => {
    return (
        <section className="py-24 px-6 md:px-10 lg:px-20 border-t-2 border-slate-800 bg-[#0b0f17]" id="faq">
            <div className="max-w-4xl mx-auto">
                <h2 className="text-4xl font-black text-white uppercase mb-12 text-center">Perguntas Frequentes</h2>
                <div className="flex flex-col gap-4">
                    <details className="group border-2 border-slate-700 bg-[#151b26] open:border-primary transition-colors">
                        <summary className="flex cursor-pointer items-center justify-between p-6 font-bold text-lg text-white uppercase select-none list-none">
                            <span>O Thiago IA atende quais equipamentos?</span>
                            <span className="material-symbols-outlined transition-transform group-open:rotate-180">expand_more</span>
                        </summary>
                        <div className="px-6 pb-6 text-slate-400 border-t border-slate-700 pt-4">
                            Sou especialista em Ecocardiógrafos, Mamógrafos, Densitometria Óssea e Aparelhos de Ultrassom. Posso ajudar com configurações de software, do doppler, otimização de imagem e troubleshooting focado em resolver problemas sem necessidade de visitas técnicas.
                        </div>
                    </details>
                    <details className="group border-2 border-slate-700 bg-[#151b26] open:border-primary transition-colors">
                        <summary className="flex cursor-pointer items-center justify-between p-6 font-bold text-lg text-white uppercase select-none list-none">
                            <span>Posso cancelar a qualquer momento?</span>
                            <span className="material-symbols-outlined transition-transform group-open:rotate-180">expand_more</span>
                        </summary>
                        <div className="px-6 pb-6 text-slate-400 border-t border-slate-700 pt-4">
                            Sim! O seu acesso é mensal e você tem total liberdade para cancelar a assinatura quando quiser, sem nenhuma multa ou complicação.
                        </div>
                    </details>
                    <details className="group border-2 border-slate-700 bg-[#151b26] open:border-primary transition-colors">
                        <summary className="flex cursor-pointer items-center justify-between p-6 font-bold text-lg text-white uppercase select-none list-none">
                            <span>E se eu não gostar do serviço?</span>
                            <span className="material-symbols-outlined transition-transform group-open:rotate-180">expand_more</span>
                        </summary>
                        <div className="px-6 pb-6 text-slate-400 border-t border-slate-700 pt-4">
                            Temos a Garantia Incondicional de 7 dias! Se durante a primeira semana você não curtir o atendimento ou achar que não ajudou, devolvemos 100% do seu dinheiro.
                        </div>
                    </details>
                    <details className="group border-2 border-slate-700 bg-[#151b26] open:border-primary transition-colors">
                        <summary className="flex cursor-pointer items-center justify-between p-6 font-bold text-lg text-white uppercase select-none list-none">
                            <span>Vocês resolvem defeitos físicos nas peças?</span>
                            <span className="material-symbols-outlined transition-transform group-open:rotate-180">expand_more</span>
                        </summary>
                        <div className="px-6 pb-6 text-slate-400 border-t border-slate-700 pt-4">
                            Meu foco é te ajudar a configurar e resolver erros de software/sistêmicos e ajustes rápidos que podem ser solucionados remotamente. Para defeitos de hardware severos que exigem troca de peças, eu te direciono sem custo para um técnico especialista de confiança ou ajudo a cotar a peça real!
                        </div>
                    </details>
                </div>
            </div>
        </section>
    );
};
