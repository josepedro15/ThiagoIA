import React, { useState } from 'react';
import { X, Activity, Monitor, Plus, Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { supabase } from '@/integrations/supabase/client';
import { useNavigate } from 'react-router-dom';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from 'sonner';

interface AppSidebarProps {
    isOpen: boolean;
    setIsOpen: (isOpen: boolean) => void;
    onSelectEquipment?: (equipmentName: string) => void;
}

export function AppSidebar({ isOpen, setIsOpen, onSelectEquipment }: AppSidebarProps) {
    const navigate = useNavigate();
    const queryClient = useQueryClient();
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [newEquipment, setNewEquipment] = useState({ name: '', room: '' });

    const handleLogout = async () => {
        await supabase.auth.signOut();
        navigate('/auth');
    };

    // Obter sessão atual
    const { data: sessionData } = useQuery({
        queryKey: ['session'],
        queryFn: async () => {
            const { data } = await supabase.auth.getSession();
            return data.session;
        }
    });

    // Buscar equipamentos do usuário
    const { data: equipments, isLoading } = useQuery({
        queryKey: ['user-equipments', sessionData?.user?.id],
        queryFn: async () => {
            if (!sessionData?.user?.id) return [];
            const { data, error } = await supabase
                .from('user_equipments')
                .select('*')
                .eq('user_id', sessionData.user.id)
                .order('created_at', { ascending: false });

            if (error) throw error;
            return data;
        },
        enabled: !!sessionData?.user?.id
    });

    // Mutation para adicionar equipamento
    const addEquipmentMutation = useMutation({
        mutationFn: async (equipment: { name: string; room: string }) => {
            if (!sessionData?.user?.id) throw new Error("Usuário não autenticado");
            const { data, error } = await supabase
                .from('user_equipments')
                .insert([
                    {
                        user_id: sessionData.user.id,
                        name: equipment.name,
                        room: equipment.room
                    }
                ])
                .select();

            if (error) throw error;
            return data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['user-equipments'] });
            toast.success('Equipamento cadastrado sucesso!');
            setIsAddModalOpen(false);
            setNewEquipment({ name: '', room: '' });
        },
        onError: (error) => {
            toast.error(`Erro ao cadastrar equipamento: ${error.message}`);
        }
    });

    const handleAddSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!newEquipment.name.trim() || !newEquipment.room.trim()) {
            toast.error("Preencha todos os campos.");
            return;
        }
        addEquipmentMutation.mutate(newEquipment);
    };

    return (
        <>
            {/* Mobile Overlay */}
            {isOpen && (
                <div
                    className="md:hidden fixed inset-0 bg-black/50 z-40 backdrop-blur-sm"
                    onClick={() => setIsOpen(false)}
                />
            )}

            {/* Sidebar Core */}
            <aside className={cn(
                "fixed md:static inset-y-0 left-0 z-50 w-72 bg-white border-r-4 border-black transition-transform duration-300 ease-in-out flex flex-col h-full print:hidden",
                isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
            )}>
                {/* Header */}
                <div className="px-6 py-4 border-b-4 border-black flex justify-between items-center bg-white h-16 shrink-0">
                    <h2 className="text-xl font-black uppercase tracking-widest text-black">
                        Thiago<span className="text-[#00f3ff] drop-shadow-[1px_1px_0px_rgba(0,0,0,1)]">IA</span>
                    </h2>
                    <button
                        onClick={() => setIsOpen(false)}
                        className="md:hidden p-2 hover:bg-black hover:text-white border-2 border-transparent hover:border-black transition-colors"
                    >
                        <X size={20} />
                    </button>
                </div>

                {/* List */}
                <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-4">
                    <Button
                        onClick={() => {
                            setIsOpen(false);
                            navigate('/loja');
                        }}
                        variant="outline"
                        className="w-full font-bold uppercase tracking-wider border-2 border-black rounded-none shadow-brutalist hover:shadow-brutalist-sm hover:-translate-y-px transition-all bg-[#00f3ff] text-black hover:bg-[#00d0db] mb-4"
                    >
                        Loja de Produtos
                    </Button>

                    <div className="flex items-center justify-between mb-2">
                        <div className="text-sm font-bold uppercase tracking-widest text-zinc-500">
                            Meus Equipamentos
                        </div>

                        <Dialog open={isAddModalOpen} onOpenChange={setIsAddModalOpen}>
                            <DialogTrigger asChild>
                                <Button variant="outline" size="icon" className="h-6 w-6 border-2 border-black rounded-none hover:bg-[#00f3ff] hover:text-black transition-colors">
                                    <Plus size={14} />
                                </Button>
                            </DialogTrigger>
                            <DialogContent className="border-4 border-black rounded-none sm:max-w-[425px]">
                                <DialogHeader>
                                    <DialogTitle className="text-xl font-bold uppercase border-b-2 border-black pb-2">Cadastrar Equipamento</DialogTitle>
                                </DialogHeader>
                                <form onSubmit={handleAddSubmit} className="space-y-4 pt-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="name" className="font-bold uppercase text-xs">Modelo do Equipamento</Label>
                                        <Input
                                            id="name"
                                            placeholder="Ex: Logiq E9, Vivid T8..."
                                            required
                                            value={newEquipment.name}
                                            onChange={e => setNewEquipment({ ...newEquipment, name: e.target.value })}
                                            className="border-2 border-black rounded-none"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="room" className="font-bold uppercase text-xs">Sala / Identificação</Label>
                                        <Input
                                            id="room"
                                            placeholder="Ex: Sala 1, Cardio..."
                                            required
                                            value={newEquipment.room}
                                            onChange={e => setNewEquipment({ ...newEquipment, room: e.target.value })}
                                            className="border-2 border-black rounded-none"
                                        />
                                    </div>
                                    <Button
                                        type="submit"
                                        disabled={addEquipmentMutation.isPending}
                                        className="w-full bg-[#00f3ff] text-black hover:bg-[#00d0db] border-2 border-black font-bold uppercase rounded-none mt-4 shadow-brutalist-sm hover:translate-y-px transition-all"
                                    >
                                        {addEquipmentMutation.isPending ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : 'Salvar Equipamento'}
                                    </Button>
                                </form>
                            </DialogContent>
                        </Dialog>
                    </div>

                    {isLoading ? (
                        <div className="flex justify-center p-4">
                            <Loader2 className="h-6 w-6 animate-spin text-zinc-400" />
                        </div>
                    ) : equipments?.length === 0 ? (
                        <div className="text-xs text-center p-4 border-2 border-dashed border-zinc-300 text-zinc-500 font-semibold">
                            Nenhum equipamento cadastrado.<br />Clique no (+) para adicionar.
                        </div>
                    ) : (
                        equipments?.map((eq: any) => {
                            // Simulando os status visualmente por eq.id para ter variedade igual antes se desejar, mas focarei em healthy por padrão se n/a.
                            const statusColor = "bg-green-400"; // Aqui poderia ser logica real de ping

                            return (
                                <button
                                    key={eq.id}
                                    onClick={() => {
                                        if (onSelectEquipment) onSelectEquipment(eq.name);
                                        setIsOpen(false);
                                    }}
                                    className={cn(
                                        "w-full text-left p-4 border-2 border-black hover:bg-[#00f3ff]/10 hover:shadow-brutalist-sm transition-all flex items-center gap-3 relative overflow-hidden group bg-white"
                                    )}
                                >
                                    <div className="bg-black text-white p-2 shrink-0">
                                        <Monitor size={20} />
                                    </div>
                                    <div className="flex-1 truncate">
                                        <div className="font-bold text-black truncate">{eq.name}</div>
                                        <div className="text-xs font-semibold text-zinc-500 uppercase">{eq.room}</div>
                                    </div>
                                    <div className={cn(
                                        "w-3 h-3 rounded-full border-2 border-black shrink-0",
                                        statusColor
                                    )} />
                                </button>
                            );
                        })
                    )}
                </div>

                {/* Footer */}
                <div className="p-4 border-t-4 border-black flex flex-col justify-end gap-4 shrink-0 h-36 w-full">
                    <Button
                        onClick={() => {
                            setIsOpen(false);
                            navigate('/admin');
                        }}
                        variant="outline"
                        className="w-full font-bold uppercase tracking-wider border-2 border-black rounded-none shadow-brutalist hover:shadow-brutalist-sm hover:-translate-y-px transition-all bg-[#00f3ff]/10 hover:bg-[#00f3ff]/20 text-black"
                    >
                        Painel Admin
                    </Button>
                    <Button
                        onClick={handleLogout}
                        variant="outline"
                        className="w-full font-bold uppercase tracking-wider border-2 border-black rounded-none shadow-brutalist hover:shadow-brutalist-sm hover:-translate-y-px transition-all"
                    >
                        Sair da Conta
                    </Button>
                </div>
            </aside>
        </>
    );
}

