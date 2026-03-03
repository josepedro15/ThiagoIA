import { Header } from "@/components/home/Header";
import { Footer } from "@/components/home/Footer";
import { MoveLeft } from "lucide-react";
import { Link } from "react-router-dom";

const Privacy = () => {
    return (
        <div className="min-h-screen bg-[#101622] text-slate-300 font-sans selection:bg-[#ccfb4b] selection:text-black">
            <Header />

            <main className="pt-32 pb-24 px-6 md:px-10 lg:px-20 max-w-4xl mx-auto">
                <div className="mb-12">
                    <Link to="/" className="inline-flex items-center text-primary font-bold hover:underline mb-8">
                        <MoveLeft className="mr-2" size={20} /> Voltar para a Home
                    </Link>
                    <h1 className="text-4xl md:text-5xl font-black text-white uppercase tracking-tighter mb-4">Política de Privacidade</h1>
                    <p className="text-slate-400">Última atualização: Outubro 2024</p>
                </div>

                <div className="space-y-8 text-lg">
                    <section>
                        <h2 className="text-2xl font-bold text-white mb-4">1. Coleta e Uso de Informações</h2>
                        <p>Solicitamos informações pessoais, como nome, e-mail e dados de contato (WhatsApp) apenas quando realmente precisamos delas para lhe fornecer um serviço técnico. Fazemo-lo por meios justos e legais, com o seu conhecimento e consentimento (via cadastro de onboarding e pagamento pela Stripe).</p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-white mb-4">2. Segurança dos Dados</h2>
                        <p>O Med IA OS armazena dados em infraestrutura segura gerida pelo Supabase e provedores de pagamentos (Stripe). Não alugamos, vendemos nem compartilhamos dados de diagnóstico de equipamentos (metas, imagens de falhas) vinculados a informações de pacientes enviadas indevidamente.</p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-white mb-4">3. Integração com IA e WhatsApp</h2>
                        <p>As mensagens técnicas enviadas aos números de suporte via WhatsApp são armazenadas e lidas por engines de Inteligência Artificial para gerar as respostas. Estes logs também são utilizados para retreino e evolução do motor clínico (Thiago IA) da plataforma.</p>
                    </section>
                </div>
            </main>

            <Footer />
        </div>
    );
};

export default Privacy;
