import { Header } from "@/components/home/Header";
import { Footer } from "@/components/home/Footer";
import { MoveLeft } from "lucide-react";
import { Link } from "react-router-dom";

const Terms = () => {
    return (
        <div className="min-h-screen bg-[#101622] text-slate-300 font-sans selection:bg-[#ccfb4b] selection:text-black">
            <Header />

            <main className="pt-32 pb-24 px-6 md:px-10 lg:px-20 max-w-4xl mx-auto">
                <div className="mb-12">
                    <Link to="/" className="inline-flex items-center text-primary font-bold hover:underline mb-8">
                        <MoveLeft className="mr-2" size={20} /> Voltar para a Home
                    </Link>
                    <h1 className="text-4xl md:text-5xl font-black text-white uppercase tracking-tighter mb-4">Termos de Uso</h1>
                    <p className="text-slate-400">Última atualização: Outubro 2024</p>
                </div>

                <div className="space-y-8 text-lg">
                    <section>
                        <h2 className="text-2xl font-bold text-white mb-4">1. Aceitação dos Termos (Isenção de Responsabilidade)</h2>
                        <p>Ao acessar o Med IA OS, você reconhece que este sistema atua estritamente como um <strong>Assistente de Consulta Rápida</strong>. A execução de qualquer manobra física, calibração ou reparo nos equipamentos é de inteira responsabilidade do operador e/ou engenheiro clínico responsável.</p>
                        <p className="mt-2 text-slate-400">Se você não concordar com essa total isenção de responsabilidade da plataforma sobre danos físicos ou falhas no equipamento decorrentes de imperícia, interrompa o uso imediatamente.</p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-white mb-4">2. Uso da IA e Limitações Técnicas</h2>
                        <p>A inteligência artificial do Thiago IA fornece diretrizes baseadas em manuais e logs históricos. Nenhuma resposta gerada isenta a presença ou responsabilidade técnica de engenheiros clínicos credenciados exigidos por normas sanitárias vigentes (ex: ANVISA).</p>
                        <ul className="list-disc pl-6 mt-4 space-y-2 text-slate-400">
                            <li>Você não deve usar as orientações para reparar equipamentos onde não há treinamento ou capacitação mínima, especialmente em áreas de alta voltagem.</li>
                            <li>A exatidão da IA baseia-se nos dados fornecidos pelo usuário; laudos finais devem sempre ser confirmados pelo profissional em campo.</li>
                            <li>O Marketplace é um ambiente de conexão. A responsabilidade pelas transações e veracidade técnica dos produtos é exclusiva das partes negociantes.</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-white mb-4">3. Assinatura e Cancelamento</h2>
                        <p>Os serviços de suporte via webhook e inteligência artificial são prestados através de assinatura cobrada de forma recorrente via Stripe. O cancelamento pode ser feito a qualquer momento pelo painel, interrompendo as renovações seguintes.</p>
                    </section>
                </div>
            </main>

            <Footer />
        </div>
    );
};

export default Terms;
