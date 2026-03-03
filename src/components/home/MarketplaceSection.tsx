import { ShoppingBag, ArrowRight, Wrench, RefreshCw } from "lucide-react";
import { Link } from "react-router-dom";

export const MarketplaceSection = () => {
    return (
        <section className="py-24 px-6 md:px-10 lg:px-20 bg-[#151b26] border-b-2 border-slate-800" id="marketplace">
            <div className="max-w-7xl mx-auto">
                <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-16 gap-6 md:gap-10">
                    <div className="border-l-8 border-[#ccfb4b] pl-6 max-w-2xl">
                        <div className="flex items-center gap-3 mb-4">
                            <ShoppingBag className="text-[#ccfb4b]" size={32} />
                            <h2 className="text-4xl md:text-5xl font-black text-white uppercase tracking-tight">
                                Marketplace Médico
                            </h2>
                        </div>
                        <p className="text-slate-400 text-lg leading-relaxed">
                            Renove sua clínica ou encontre as peças certas para manutenção. Anuncie equipamentos que
                            não usa mais ou compre a máquina ideal com o melhor custo-benefício, direto com outros médicos ou fornecedores oficiais.
                        </p>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {/* Feature 1: Buy */}
                    <div className="group border-2 border-slate-700 bg-[#101622] p-8 hover:border-primary transition-colors hover:shadow-[8px_8px_0px_0px_#0d59f2] flex flex-col justify-between h-full">
                        <div>
                            <div className="size-14 border-2 border-white flex items-center justify-center mb-6 bg-black text-primary group-hover:bg-primary group-hover:text-white transition-colors">
                                <ShoppingBag size={28} />
                            </div>
                            <h3 className="text-2xl font-black text-white mb-3 uppercase tracking-tight">Comprar Máquinas</h3>
                            <p className="text-slate-400 leading-relaxed mb-8">
                                Encontre equipamentos novos e seminovos com preços acessíveis. De ultrassons a mamógrafos, com
                                garantia de procedência.
                            </p>
                        </div>
                        <Link
                            to="/auth"
                            className="inline-flex items-center text-primary font-bold uppercase tracking-wider group-hover:underline mt-auto"
                        >
                            Ver Ofertas <ArrowRight size={18} className="ml-2 group-hover:translate-x-1 transition-transform" />
                        </Link>
                    </div>

                    {/* Feature 2: Sell */}
                    <div className="group border-2 border-slate-700 bg-[#101622] p-8 hover:border-[#ccfb4b] transition-colors hover:shadow-[8px_8px_0px_0px_#ccfb4b] flex flex-col justify-between h-full">
                        <div>
                            <div className="size-14 border-2 border-white flex items-center justify-center mb-6 bg-black text-[#ccfb4b] group-hover:bg-[#ccfb4b] group-hover:text-black transition-colors">
                                <RefreshCw size={28} />
                            </div>
                            <h3 className="text-2xl font-black text-white mb-3 uppercase tracking-tight">Vender Equipamentos</h3>
                            <p className="text-slate-400 leading-relaxed mb-8">
                                Anuncie máquinas que você não utiliza mais. Conecte-se diretamente com uma rede de médicos
                                focados e interessados na sua oferta.
                            </p>
                        </div>
                        <Link
                            to="/auth"
                            className="inline-flex items-center text-[#ccfb4b] font-bold uppercase tracking-wider group-hover:underline mt-auto"
                        >
                            Criar Anúncio <ArrowRight size={18} className="ml-2 group-hover:translate-x-1 transition-transform" />
                        </Link>
                    </div>

                    {/* Feature 3: Maintenance & Parts */}
                    <div className="group border-2 border-slate-700 bg-[#101622] p-8 hover:border-primary transition-colors hover:shadow-[8px_8px_0px_0px_#0d59f2] flex flex-col justify-between h-full">
                        <div>
                            <div className="size-14 border-2 border-white flex items-center justify-center mb-6 bg-black text-primary group-hover:bg-primary group-hover:text-white transition-colors">
                                <Wrench size={28} />
                            </div>
                            <h3 className="text-2xl font-black text-white mb-3 uppercase tracking-tight">Peças & Serviço</h3>
                            <p className="text-slate-400 leading-relaxed mb-8">
                                Encontre produtos, cabos e peças essenciais para a manutenção preventiva e corretiva,
                                além de contatar especialistas homologados.
                            </p>
                        </div>
                        <Link
                            to="/auth"
                            className="inline-flex items-center text-primary font-bold uppercase tracking-wider group-hover:underline mt-auto"
                        >
                            Acessar Serviços <ArrowRight size={18} className="ml-2 group-hover:translate-x-1 transition-transform" />
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    );
};
