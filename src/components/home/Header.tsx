import { Link } from 'react-router-dom';

export const Header = () => {
    return (
        <header className="sticky top-0 z-50 flex items-center justify-between border-b-2 border-slate-800 bg-[#101622]/95 backdrop-blur-md px-6 py-4 md:px-10 lg:px-20">
            <div className="flex items-center gap-4 text-white">
                <div className="flex items-center justify-center size-10 bg-primary text-white border-2 border-white">
                    <span className="material-symbols-outlined text-2xl font-bold">rocket_launch</span>
                </div>
                <h2 className="text-white text-2xl font-bold uppercase tracking-widest">ThiagoIA</h2>
            </div>
            <nav className="hidden md:flex items-center gap-8">
                <a className="text-slate-300 hover:text-primary hover:underline decoration-2 underline-offset-4 text-sm font-bold uppercase tracking-wide transition-colors" href="#features">Recursos</a>
                <a className="text-slate-300 hover:text-primary hover:underline decoration-2 underline-offset-4 text-sm font-bold uppercase tracking-wide transition-colors" href="#pricing">Preços</a>
                <a className="text-slate-300 hover:text-primary hover:underline decoration-2 underline-offset-4 text-sm font-bold uppercase tracking-wide transition-colors" href="#faq">FAQ</a>
            </nav>
            <div className="flex gap-4">
                <Link to="/auth" className="hidden sm:flex cursor-pointer items-center justify-center border-2 border-slate-700 bg-transparent hover:bg-slate-800 text-white h-10 px-6 text-sm font-bold uppercase tracking-wide transition-all">
                    Login
                </Link>
                <Link to="/dashboard" className="flex cursor-pointer items-center justify-center border-2 border-primary bg-primary text-white h-10 px-6 text-sm font-bold uppercase tracking-wide shadow-brutalist-white hover:translate-x-[2px] hover:translate-y-[2px] transition-all">
                    Dashboard
                </Link>
            </div>
        </header>
    );
};
