import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { getOptimizedImageUrl } from '@/lib/utils';
import { ShoppingCart, Package } from 'lucide-react';

export const ProductsSection = () => {
    const { data: products, isLoading: productsLoading } = useQuery({
        queryKey: ['landing-products'],
        queryFn: async () => {
            const { data, error } = await supabase
                .from('products')
                .select('*')
                .order('created_at', { ascending: false });
            if (error) throw error;
            return data;
        },
    });

    if (productsLoading) {
        return (
            <section className="py-24 px-6 md:px-10 lg:px-20 bg-[#f5f6f8] dark:bg-[#0b0f17] border-b-2 border-slate-800" id="produtos">
                <div className="max-w-7xl mx-auto flex justify-center items-center h-48">
                    <div className="text-xl font-bold uppercase animate-pulse dark:text-white">Carregando produtos...</div>
                </div>
            </section>
        );
    }

    if (!products || products.length === 0) {
        return null; // Don't show the section if there are no products
    }

    return (
        <section className="py-24 px-6 md:px-10 lg:px-20 bg-[#f5f6f8] dark:bg-[#0b0f17] border-b-2 border-slate-800" id="produtos">
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-16">
                    <h2 className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white uppercase mb-4 tracking-tight">Produtos Oficiais</h2>
                    <p className="text-slate-600 dark:text-slate-400 text-lg max-w-2xl mx-auto">Soluções, licenças e equipamentos complementares selecionados pelo Med IA OS para otimizar sua clínica.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                    {products.map((product: { id: string; name: string; description?: string; price: number; image_url?: string; payment_link?: string }) => (
                        <div key={product.id} className="bg-white dark:bg-[#101622] border-2 md:border-4 border-slate-900 dark:border-slate-700 flex flex-col shadow-brutalist dark:shadow-[8px_8px_0px_0px_rgba(204,251,75,1)] hover:translate-x-[-4px] hover:translate-y-[-4px] hover:shadow-[12px_12px_0px_0px_rgba(204,251,75,1)] transition-all group">
                            <div className="aspect-[4/3] w-full border-b-2 md:border-b-4 border-slate-900 dark:border-slate-700 overflow-hidden bg-slate-100 dark:bg-zinc-800 relative">
                                {product.image_url ? (
                                    <img
                                        src={getOptimizedImageUrl(product.image_url)}
                                        alt={product.name}
                                        referrerPolicy="no-referrer"
                                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 mix-blend-multiply dark:mix-blend-normal"
                                    />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center">
                                        <Package size={48} className="text-slate-300 dark:text-zinc-600" />
                                    </div>
                                )}
                                <div className="absolute top-4 right-4 bg-[#ccfb4b] border-2 border-slate-900 px-3 py-1 shadow-[4px_4px_0px_0px_rgba(15,20,28,1)] text-slate-900">
                                    <span className="font-black text-sm md:text-base">
                                        R$ {Number(product.price).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                                    </span>
                                </div>
                            </div>

                            <div className="p-5 md:p-6 flex-1 flex flex-col">
                                <h3 className="text-xl md:text-2xl font-black uppercase leading-tight mb-3 line-clamp-2 text-slate-900 dark:text-white" title={product.name}>
                                    {product.name}
                                </h3>
                                <p className="text-slate-600 dark:text-slate-400 text-sm md:text-base mb-6 line-clamp-3 flex-1 font-medium">
                                    {product.description || "Nenhuma descrição fornecida."}
                                </p>
                                <a
                                    href={product.payment_link || '#'}
                                    target={product.payment_link ? "_blank" : "_self"}
                                    rel="noopener noreferrer"
                                    className={`w-full h-12 flex justify-center items-center font-bold uppercase tracking-wider text-sm transition-colors border-2 ${product.payment_link
                                        ? "bg-slate-900 dark:bg-primary text-white border-transparent hover:bg-slate-800 dark:hover:bg-blue-600 dark:shadow-[4px_4px_0px_0px_#ffffff] dark:hover:translate-x-[2px] dark:hover:translate-y-[2px]"
                                        : "bg-slate-200 dark:bg-slate-800 text-slate-500 dark:text-slate-400 border-slate-300 dark:border-slate-700 cursor-not-allowed"
                                        }`}
                                    onClick={(e) => !product.payment_link && e.preventDefault()}
                                >
                                    {product.payment_link ? <><ShoppingCart size={18} className="mr-2" /> Comprar Agora</> : "Indisponível"}
                                </a>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};
