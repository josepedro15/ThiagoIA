import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
    Tabs, TabsContent, TabsList, TabsTrigger
} from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { useAdminProfile } from '@/hooks/useAdmin';
import { AdminProducts } from '@/components/admin/AdminProducts';
import { AdminUsers } from '@/components/admin/AdminUsers';
import { AdminPrompt } from '@/components/admin/AdminPrompt';

export default function Admin() {
    const navigate = useNavigate();

    // Check auth and admin role
    const { data: profile, isLoading: isProfileLoading } = useAdminProfile();

    if (isProfileLoading) return <div className="p-8 flex items-center justify-center text-black">Carregando...</div>;

    // We only enable fetching if profile is loaded. 
    // In a real scenario we might redirect if not admin.
    const isProfileLoaded = !!profile;

    return (
        <div className="min-h-screen bg-gray-100 p-4 md:p-8 font-sans text-black">
            <div className="max-w-6xl mx-auto bg-white border-4 border-black shadow-brutalist p-4 md:p-8">
                <div className="flex justify-between items-center mb-8 border-b-4 border-black pb-4">
                    <h1 className="text-2xl md:text-3xl font-black uppercase tracking-widest text-black">
                        Painel <span className="text-[#00f3ff] drop-shadow-[1px_1px_0px_rgba(0,0,0,1)]">Admin</span>
                    </h1>
                    <Button
                        variant="outline"
                        onClick={() => navigate('/dashboard')}
                        className="border-2 border-black font-bold uppercase rounded-none hover:bg-black hover:text-white transition-colors"
                    >
                        Voltar ao Dashboard
                    </Button>
                </div>

                {profile && profile.role !== 'admin' && (
                    <div className="bg-yellow-100 border-l-4 border-yellow-500 p-4 mb-8">
                        <p className="font-bold">Aviso: Você não está como admin.</p>
                        <p>Seus dados estão como '{profile.role}'. Você pode não ter permissão para salvar alterações se o frontend não bloquear primeiro, a RLS no banco de dados bloqueará as modificações se você não for admin real.</p>
                    </div>
                )}

                <Tabs defaultValue="products" className="w-full">
                    <TabsList className="grid w-full grid-cols-3 mb-8 bg-zinc-100 border-2 border-black rounded-none p-1">
                        <TabsTrigger value="products" className="data-[state=active]:bg-black data-[state=active]:text-white data-[state=active]:font-bold rounded-none uppercase tracking-wider">
                            Produtos
                        </TabsTrigger>
                        <TabsTrigger value="users" className="data-[state=active]:bg-black data-[state=active]:text-white data-[state=active]:font-bold rounded-none uppercase tracking-wider">
                            Usuários
                        </TabsTrigger>
                        <TabsTrigger value="prompt" className="data-[state=active]:bg-black data-[state=active]:text-white data-[state=active]:font-bold rounded-none uppercase tracking-wider">
                            Prompt da IA
                        </TabsTrigger>
                    </TabsList>

                    <TabsContent value="products">
                        <AdminProducts enabled={isProfileLoaded} />
                    </TabsContent>

                    <TabsContent value="users">
                        <AdminUsers enabled={isProfileLoaded} />
                    </TabsContent>

                    <TabsContent value="prompt">
                        <AdminPrompt enabled={isProfileLoaded} />
                    </TabsContent>
                </Tabs>
            </div>
        </div>
    );
}
