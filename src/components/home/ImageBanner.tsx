export const ImageBanner = () => {
    return (
        <section className="w-full h-[400px] border-y-2 border-slate-800 relative overflow-hidden flex items-center justify-center">
            <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-fixed bg-center"></div>
            <div className="absolute inset-0 bg-black/70"></div>
            <div className="relative z-10 text-center px-4">
                <h2 className="text-5xl md:text-7xl font-black text-white tracking-tight uppercase border-4 border-white p-6 inline-block backdrop-blur-sm">
                    Dominância Total
                </h2>
            </div>
        </section>
    );
};
