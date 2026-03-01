export const SocialProof = () => {
    return (
        <section className="py-12 border-b-2 border-slate-800 bg-[#0b0f17]">
            <div className="max-w-7xl mx-auto px-6 md:px-10 lg:px-20">
                <p className="text-center text-slate-500 text-sm font-bold uppercase tracking-[0.2em] mb-8">Clínicas e Hospitais que confiam em ThiagoIA</p>
                <div className="flex flex-wrap justify-center items-center gap-12 md:gap-20 opacity-60 grayscale hover:grayscale-0 transition-all duration-500">
                    <h3 className="text-xl font-black text-white tracking-tighter">CLÍNICA<span className="text-primary">SÃO JOSÉ</span></h3>
                    <h3 className="text-xl font-black text-white tracking-tighter">MED<span className="text-slate-500">DIAG</span></h3>
                    <h3 className="text-xl font-black text-white tracking-tighter">TOTAL<span className="text-[#ccfb4b]">IMAGEM</span></h3>
                    <h3 className="text-xl font-black text-white tracking-tighter">POLI<span className="text-red-500">CLÍNICA</span></h3>
                    <h3 className="text-xl font-black text-white tracking-tighter">SAÚDE<span className="text-blue-400">PLUS</span></h3>
                </div>
            </div>
        </section>
    );
};
