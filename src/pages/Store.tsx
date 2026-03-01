import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Button } from "@/components/ui/button";
import { AppSidebar } from '../components/layout/AppSidebar';
import { Menu, ShoppingCart, ExternalLink, PlusCircle, Tag, Store as StoreIcon, Package } from 'lucide-react';
import { Session } from '@supabase/supabase-js';
import { getOptimizedImageUrl } from '@/lib/utils';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

export default function Store() {
    const navigate = useNavigate();
    const queryClient = useQueryClient();
    const [session, setSession] = useState<Session | null>(null);
    const [isSidebarOpen, setSidebarOpen] = useState(false);

    // Ad form state
    const [isCreateAdOpen, setIsCreateAdOpen] = useState(false);
    const [newAd, setNewAd] = useState({ title: '', description: '', price: '', whatsapp: '', image_url: '' });

    useEffect(() => {
        supabase.auth.getSession().then(({ data: { session } }) => {
            if (!session) navigate('/auth');
            else setSession(session);
        });

        const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
            if (!session) navigate('/auth');
            else setSession(session);
        });

        return () => subscription.unsubscribe();
    }, [navigate]);

    // Fetch Products
    const { data: products, isLoading: productsLoading } = useQuery({
        queryKey: ['store-products'],
        queryFn: async () => {
            const { data, error } = await supabase
                .from('products')
                .select('*')
                .order('created_at', { ascending: false });
            if (error) throw error;
            return data;
        },
        enabled: !!session,
    });

    // Fetch Profile for Credits
    const { data: profile } = useQuery({
        queryKey: ['profile', session?.user?.id],
        queryFn: async () => {
            const { data, error } = await supabase
                .from('profiles')
                .select('*')
                .eq('id', session?.user?.id)
                .single();
            if (error) throw error;
            return data;
        },
        enabled: !!session?.user?.id,
    });

    // Fetch All Active Ads (Marketplace)
    const { data: allAds, isLoading: adsLoading } = useQuery({
        queryKey: ['marketplace-ads'],
        queryFn: async () => {
            const { data, error } = await supabase
                .from('ads')
                .select('*, profiles(full_name)')
                .eq('status', 'active')
                .order('created_at', { ascending: false });
            if (error) throw error;
            return data;
        },
        enabled: !!session,
    });

    // Fetch My Ads
    const { data: myAds, isLoading: myAdsLoading } = useQuery({
        queryKey: ['my-ads', session?.user?.id],
        queryFn: async () => {
            const { data, error } = await supabase
                .from('ads')
                .select('*')
                .eq('user_id', session?.user?.id)
                .order('created_at', { ascending: false });
            if (error) throw error;
            return data;
        },
        enabled: !!session?.user?.id,
    });

    const createAdMutation = useMutation({
        mutationFn: async (adData: any) => {
            const currentCredits = profile?.ads_credits || 0;
            if (currentCredits <= 0) throw new Error("Sem créditos disponíveis.");

            // Decrement credit & create ad
            const { error: profileError } = await supabase
                .from('profiles')
                .update({ ads_credits: currentCredits - 1 })
                .eq('id', session?.user?.id);
            if (profileError) throw profileError;

            const { data, error } = await supabase.from('ads').insert([
                { ...adData, user_id: session?.user?.id, price: parseFloat(adData.price) }
            ]).select();
            if (error) throw error;
            return data;
        },
        onSuccess: () => {
            toast.success("Anúncio criado com sucesso!");
            queryClient.invalidateQueries({ queryKey: ['marketplace-ads'] });
            queryClient.invalidateQueries({ queryKey: ['my-ads'] });
            queryClient.invalidateQueries({ queryKey: ['profile'] });
            setIsCreateAdOpen(false);
            setNewAd({ title: '', description: '', price: '', whatsapp: '', image_url: '' });
        },
        onError: (error: any) => {
            toast.error(error.message || "Erro ao criar anúncio.");
        }
    });

    const handleCreateAd = (e: React.FormEvent) => {
        e.preventDefault();
        createAdMutation.mutate(newAd);
    };

    const handleBuyCredits = () => {
        if (!session?.user?.id) return;
        // Stripe Payment Link params appended with client_reference_id
        const stripeUrl = `https://buy.stripe.com/3cIfZhbU583R3Bl71y28802?client_reference_id=${session.user.id}`;
        window.open(stripeUrl, '_blank');
    };

    if (!session) return null;

    return (
        <div className="flex h-screen overflow-hidden bg-gray-100 font-sans">
            <div className="md:hidden fixed top-0 left-0 right-0 h-16 bg-black text-white border-b-4 border-black z-30 flex items-center justify-between px-4 shadow-brutalist">
                <button onClick={() => setSidebarOpen(true)} className="p-2 hover:text-[#00f3ff]">
                    <Menu size={24} />
                </button>
                <h1 className="text-xl font-black uppercase tracking-widest text-white">
                    Loja <span className="text-[#00f3ff]">IA</span>
                </h1>
                <div className="w-10"></div>
            </div>

            <AppSidebar
                isOpen={isSidebarOpen}
                setIsOpen={setSidebarOpen}
            />

            <main className="flex-1 flex flex-col pt-16 md:pt-0 overflow-y-auto">
                <div className="p-4 md:p-8 max-w-7xl mx-auto w-full">
                    <div className="flex items-center gap-3 mb-8">
                        <div className="bg-black text-[#00f3ff] p-3 shadow-brutalist">
                            <StoreIcon size={28} />
                        </div>
                        <div>
                            <h1 className="text-3xl md:text-4xl font-black uppercase tracking-widest text-black">
                                Loja <span className="text-[#00f3ff] drop-shadow-[1px_1px_0px_rgba(0,0,0,1)]">Comunidade</span>
                            </h1>
                            <p className="text-zinc-600 font-medium uppercase text-sm tracking-wide mt-1">Produtos oficiais e equipamentos da comunidade</p>
                        </div>
                    </div>

                    <Tabs defaultValue="marketplace" className="w-full">
                        <TabsList className="bg-zinc-200 border-2 border-black rounded-none p-1 h-auto flex flex-wrap mb-8">
                            <TabsTrigger value="marketplace" className="flex-1 rounded-none font-bold uppercase tracking-wider data-[state=active]:bg-[#00f3ff] data-[state=active]:text-black text-black data-[state=active]:shadow-none !shadow-none border-2 border-transparent data-[state=active]:border-black text-xs sm:text-sm py-3 transition-colors hover:bg-zinc-300">
                                <ShoppingCart className="w-4 h-4 mr-2" /> Marketplace
                            </TabsTrigger>
                            <TabsTrigger value="my-ads" className="flex-1 rounded-none font-bold uppercase tracking-wider data-[state=active]:bg-black data-[state=active]:text-white text-black data-[state=active]:shadow-none !shadow-none border-2 border-transparent data-[state=active]:border-black text-xs sm:text-sm py-3 transition-colors hover:bg-zinc-300">
                                <Tag className="w-4 h-4 mr-2" /> Meus Anúncios
                            </TabsTrigger>
                        </TabsList>

                        {/* Marketplace (Produtos Oficiais + Anúncios da Comunidade) */}
                        <TabsContent value="marketplace">
                            <div className="flex justify-between items-center bg-[#00f3ff] border-4 border-black p-4 md:p-6 mb-8 shadow-brutalist">
                                <div>
                                    <h3 className="text-lg md:text-xl font-black uppercase tracking-wide text-black">Mercado de Soluções e Equipamentos</h3>
                                    <p className="text-black font-semibold mt-1">Adquira produtos oficiais da plataforma ou negocie diretamente com outros técnicos e clínicas.</p>
                                </div>
                            </div>

                            <div className="space-y-12">
                                {/* Seção: Produtos Oficiais */}
                                <div>
                                    <h4 className="text-xl font-black uppercase tracking-wide mb-6 border-l-8 border-black pl-3 text-black">Soluções Oficiais</h4>
                                    {productsLoading ? (
                                        <div className="flex justify-center items-center h-48">
                                            <div className="text-lg font-bold uppercase animate-pulse text-black">Carregando produtos...</div>
                                        </div>
                                    ) : products?.length === 0 ? (
                                        <div className="bg-white border-4 border-black p-6 text-center shadow-brutalist-sm">
                                            <p className="font-bold uppercase text-black">Nenhum produto oficial no momento.</p>
                                        </div>
                                    ) : (
                                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                                            {products?.map((product: any) => (
                                                <div key={product.id} className="bg-white border-4 border-black flex flex-col shadow-brutalist hover:shadow-brutalist-lg transition-all group">
                                                    <div className="aspect-[4/3] w-full border-b-4 border-black overflow-hidden bg-zinc-200 relative">
                                                        {product.image_url ? (
                                                            <img
                                                                src={getOptimizedImageUrl(product.image_url)}
                                                                alt={product.name}
                                                                referrerPolicy="no-referrer"
                                                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                                            />
                                                        ) : (
                                                            <div className="w-full h-full flex items-center justify-center">
                                                                <Package size={48} className="text-zinc-600" />
                                                            </div>
                                                        )}
                                                        <div className="absolute top-4 right-4 bg-black border-2 border-white px-3 py-1 shadow-brutalist-sm text-white">
                                                            <span className="font-black">
                                                                R$ {Number(product.price).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                                                            </span>
                                                        </div>
                                                    </div>

                                                    <div className="p-5 flex-1 flex flex-col">
                                                        <h3 className="text-xl font-black uppercase leading-tight mb-2 line-clamp-2 text-black" title={product.name}>
                                                            {product.name}
                                                        </h3>
                                                        <p className="text-zinc-800 text-sm mb-4 line-clamp-3 flex-1 font-medium">
                                                            {product.description || "Nenhuma descrição fornecida."}
                                                        </p>
                                                        <Button
                                                            onClick={() => product.payment_link && window.open(product.payment_link, '_blank')}
                                                            disabled={!product.payment_link}
                                                            className="w-full bg-black text-white hover:bg-zinc-800 font-bold uppercase rounded-none border-2 border-transparent hover:border-black flex items-center gap-2 mt-auto"
                                                        >
                                                            {product.payment_link ? <><ShoppingCart size={16} /> Comprar Agora</> : "Indisponível"}
                                                        </Button>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>

                                {/* Seção: Anúncios da Comunidade */}
                                <div>
                                    <h4 className="text-xl font-black uppercase tracking-wide mb-6 border-l-8 border-[#00f3ff] pl-3 text-black">Equipamentos da Comunidade</h4>
                                    {adsLoading ? (
                                        <div className="flex justify-center items-center h-48">
                                            <div className="text-lg font-bold uppercase animate-pulse">Carregando anúncios da comunidade...</div>
                                        </div>
                                    ) : allAds?.length === 0 ? (
                                        <div className="bg-white border-4 border-black p-6 text-center shadow-brutalist-sm">
                                            <p className="font-bold uppercase text-zinc-500">Nenhum equipamento da comunidade no momento.</p>
                                        </div>
                                    ) : (
                                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                                            {allAds?.map((ad: any) => (
                                                <div key={ad.id} className="bg-white border-4 border-black flex flex-col shadow-brutalist group relative overflow-hidden">
                                                    <div className="aspect-[4/3] w-full border-b-4 border-black overflow-hidden bg-zinc-200 relative">
                                                        {ad.image_url ? (
                                                            <img
                                                                src={getOptimizedImageUrl(ad.image_url)}
                                                                alt={ad.title}
                                                                referrerPolicy="no-referrer"
                                                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                                            />
                                                        ) : (
                                                            <div className="w-full h-full flex items-center justify-center">
                                                                <Tag size={48} className="text-zinc-400" />
                                                            </div>
                                                        )}
                                                        <div className="absolute top-4 right-4 bg-[#00f3ff] border-2 border-black px-3 py-1 shadow-brutalist-sm">
                                                            <span className="font-black text-black">
                                                                R$ {Number(ad.price).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                                                            </span>
                                                        </div>
                                                    </div>
                                                    <div className="p-5 flex-1 flex flex-col">
                                                        <div className="text-xs font-bold uppercase tracking-widest text-zinc-500 mb-2">
                                                            Vendido por: {ad.profiles?.full_name || 'Usuário'}
                                                        </div>
                                                        <h3 className="text-xl font-black uppercase leading-tight mb-2 line-clamp-2" title={ad.title}>
                                                            {ad.title}
                                                        </h3>
                                                        <p className="text-zinc-600 text-sm mb-6 line-clamp-3">
                                                            {ad.description}
                                                        </p>
                                                        <Button
                                                            onClick={() => window.open(`https://wa.me/${ad.whatsapp.replace(/\D/g, '')}?text=Olá! Tenho interesse no anúncio: ${ad.title}`, '_blank')}
                                                            className="w-full bg-[#25D366] text-black hover:bg-[#20BE5A] font-bold uppercase rounded-none border-2 border-black flex items-center gap-2 mt-auto"
                                                        >
                                                            WhatsApp
                                                        </Button>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            </div>
                        </TabsContent>

                        {/* Meus Anúncios */}
                        <TabsContent value="my-ads">
                            <div className="bg-white border-4 border-black p-6 mb-8 shadow-brutalist flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                                <div>
                                    <h3 className="text-xl font-black uppercase tracking-wide">Meus Anúncios</h3>
                                    <div className="flex items-center gap-2 mt-2">
                                        <span className="font-bold text-zinc-600 uppercase text-sm">Créditos de Anúncio:</span>
                                        <span className="bg-black text-[#00f3ff] px-2 py-1 font-black shadow-[2px_2px_0px_rgba(0,243,255,1)]">
                                            {profile?.ads_credits || 0}
                                        </span>
                                    </div>
                                    {(profile?.ads_credits || 0) <= 0 && (
                                        <p className="text-red-500 text-xs font-bold mt-2 uppercase">Adquira um pacote de anúncios para vender seus equipamentos.</p>
                                    )}
                                </div>
                                <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
                                    {(profile?.ads_credits || 0) > 0 ? (
                                        <Dialog open={isCreateAdOpen} onOpenChange={setIsCreateAdOpen}>
                                            <DialogTrigger asChild>
                                                <Button className="w-full sm:w-auto bg-[#00f3ff] text-black hover:bg-[#00d0db] font-bold uppercase rounded-none border-2 border-black flex items-center gap-2 shadow-brutalist">
                                                    <PlusCircle size={18} /> Criar Anúncio
                                                </Button>
                                            </DialogTrigger>
                                            <DialogContent className="sm:max-w-[600px] border-4 border-black rounded-none shadow-brutalist p-0 max-h-[90vh] overflow-y-auto">
                                                <div className="p-6 bg-yellow-100 border-b-4 border-black">
                                                    <DialogHeader>
                                                        <DialogTitle className="text-2xl font-black uppercase text-black flex items-center gap-2">
                                                            <Tag className="text-black" /> Novo Anúncio
                                                        </DialogTitle>
                                                    </DialogHeader>
                                                </div>
                                                <form onSubmit={handleCreateAd} className="p-6 space-y-6 bg-white">
                                                    <div className="space-y-2">
                                                        <Label className="font-bold uppercase tracking-wider">Título do Equipamento</Label>
                                                        <Input required value={newAd.title} onChange={e => setNewAd({ ...newAd, title: e.target.value })} className="border-2 border-black rounded-none h-12 font-medium" placeholder="Ex: Ecocardiógrafo GE Vivid T8" />
                                                    </div>
                                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                        <div className="space-y-2">
                                                            <Label className="font-bold uppercase tracking-wider">Preço (R$)</Label>
                                                            <Input required type="number" step="0.01" value={newAd.price} onChange={e => setNewAd({ ...newAd, price: e.target.value })} className="border-2 border-black rounded-none h-12 font-medium" placeholder="Ex: 85000.00" />
                                                        </div>
                                                        <div className="space-y-2">
                                                            <Label className="font-bold uppercase tracking-wider">Seu WhatsApp</Label>
                                                            <Input required value={newAd.whatsapp} onChange={e => setNewAd({ ...newAd, whatsapp: e.target.value })} className="border-2 border-black rounded-none h-12 font-medium" placeholder="Ex: +55 11 99999-9999" />
                                                        </div>
                                                    </div>
                                                    <div className="space-y-2">
                                                        <Label className="font-bold uppercase tracking-wider">URL da Imagem (Opcional)</Label>
                                                        <Input value={newAd.image_url} onChange={e => setNewAd({ ...newAd, image_url: e.target.value })} className="border-2 border-black rounded-none h-12 font-medium" placeholder="https://link-da-imagem.com/foto.jpg" />
                                                    </div>
                                                    <div className="space-y-2">
                                                        <Label className="font-bold uppercase tracking-wider">Descrição Detalhada</Label>
                                                        <Textarea required value={newAd.description} onChange={e => setNewAd({ ...newAd, description: e.target.value })} className="border-2 border-black rounded-none min-h-[120px] resize-none font-medium" placeholder="Descreva o estado do equipamento, ano, transdutores inclusos, etc." />
                                                    </div>
                                                    <div className="pt-4 flex justify-end gap-4">
                                                        <Button type="button" variant="outline" onClick={() => setIsCreateAdOpen(false)} className="border-2 border-black rounded-none font-bold uppercase">
                                                            Cancelar
                                                        </Button>
                                                        <Button type="submit" disabled={createAdMutation.isPending} className="bg-black text-[#00f3ff] hover:bg-zinc-800 rounded-none border-2 border-black font-bold uppercase px-8">
                                                            {createAdMutation.isPending ? 'Publicando...' : 'Publicar'}
                                                        </Button>
                                                    </div>
                                                </form>
                                            </DialogContent>
                                        </Dialog>
                                    ) : (
                                        <Button
                                            onClick={handleBuyCredits}
                                            className="w-full sm:w-auto bg-black text-white hover:bg-zinc-800 font-bold uppercase rounded-none border-2 border-black flex items-center gap-2 shadow-brutalist"
                                        >
                                            Pacote 5 Anúncios (R$ 20)
                                        </Button>
                                    )}
                                </div>
                            </div>

                            {myAdsLoading ? (
                                <div className="flex justify-center items-center h-32">
                                    <div className="text-xl font-bold uppercase animate-pulse">Carregando seus anúncios...</div>
                                </div>
                            ) : myAds?.length === 0 ? (
                                <div className="bg-white border-4 border-black p-8 text-center border-dashed">
                                    <p className="font-bold uppercase text-zinc-500 mb-2">Você ainda não tem anúncios ativos.</p>
                                    <p className="text-sm text-zinc-400">Clique no botão acima para criar o seu primeiro anúncio.</p>
                                </div>
                            ) : (
                                <div className="space-y-4">
                                    {myAds?.map((ad: any) => (
                                        <div key={ad.id} className="bg-white border-2 border-black p-4 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 group hover:bg-zinc-50 transition-colors">
                                            <div className="flex items-center gap-4 w-full md:w-auto">
                                                <div className="w-20 h-20 border-2 border-black shrink-0 bg-zinc-200">
                                                    {ad.image_url ? (
                                                        <img src={getOptimizedImageUrl(ad.image_url)} alt={ad.title} className="w-full h-full object-cover" />
                                                    ) : (
                                                        <div className="w-full h-full flex items-center justify-center"><Tag size={24} className="text-zinc-400" /></div>
                                                    )}
                                                </div>
                                                <div className="flex-1">
                                                    <h4 className="font-black uppercase line-clamp-1">{ad.title}</h4>
                                                    <div className="text-[#00f3ff] font-bold bg-black inline-block px-2 text-xs mt-1">R$ {Number(ad.price).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</div>
                                                    <div className="text-xs text-zinc-500 font-bold uppercase mt-2">
                                                        Status: <span className={ad.status === 'active' ? 'text-green-600' : 'text-red-600'}>{ad.status === 'active' ? 'Ativo' : ad.status}</span>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="flex gap-2 w-full md:w-auto pt-4 md:pt-0 border-t-2 border-zinc-200 md:border-none">
                                                <Button variant="outline" className="flex-1 md:flex-none border-2 border-black rounded-none font-bold uppercase text-xs">
                                                    Editar
                                                </Button>
                                                <Button variant="outline" className="flex-1 md:flex-none border-2 border-red-500 text-red-500 hover:bg-red-50 rounded-none font-bold uppercase text-xs">
                                                    Excluir
                                                </Button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </TabsContent>
                    </Tabs>
                </div>
            </main>
        </div>
    );
}
