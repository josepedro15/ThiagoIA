export const Footer = () => {
    return (
        <footer className="bg-black border-t-4 border-primary px-6 py-12 md:px-10 lg:px-20">
            <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start md:items-end gap-12">
                <div className="flex flex-col gap-4">
                    <div className="flex items-center gap-3 text-white">
                        <span className="material-symbols-outlined text-3xl text-primary font-black">support_agent</span>
                        <h2 className="text-3xl font-bold uppercase tracking-widest">ThiagoIA</h2>
                    </div>
                    <p className="text-slate-500 max-w-xs">
                        Criado por AtendSoft.<br />
                        Seu Especialista de Equipamentos Médicos.
                        <br />© 2024 ThiagoIA Inc.
                    </p>
                </div>
                <div className="flex flex-col md:flex-row gap-12">
                    <div className="flex flex-col gap-4">
                        <h4 className="text-white font-bold uppercase tracking-wider">Serviço</h4>
                        <a className="text-slate-400 hover:text-white transition-colors" href="#features">Recursos</a>
                        <a className="text-slate-400 hover:text-white transition-colors" href="#pricing">Preços</a>
                        <a className="text-slate-400 hover:text-white transition-colors" href="#faq">FAQ</a>
                    </div>
                    <div className="flex flex-col gap-4">
                        <h4 className="text-white font-bold uppercase tracking-wider">Suporte</h4>
                        <a className="text-slate-400 hover:text-white transition-colors" href="https://wa.me/5511999999999" target="_blank" rel="noopener noreferrer">Fale Conosco</a>
                        <a className="text-slate-400 hover:text-white transition-colors" href="#">Termos de Uso</a>
                        <a className="text-slate-400 hover:text-white transition-colors" href="#">Privacidade</a>
                    </div>
                    <div className="flex flex-col gap-4">
                        <h4 className="text-white font-bold uppercase tracking-wider">Social</h4>
                        <a className="text-slate-400 hover:text-white transition-colors" href="#">Instagram</a>
                        <a className="text-slate-400 hover:text-white transition-colors" href="#">LinkedIn</a>
                    </div>
                </div>
            </div>
        </footer>
    );
};
