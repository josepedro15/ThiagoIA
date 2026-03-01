import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

export const useAdminProfile = () => {
    return useQuery({
        queryKey: ['profile'],
        queryFn: async () => {
            const { data: { session } } = await supabase.auth.getSession();
            if (!session) {
                return null;
            }
            const { data, error } = await supabase
                .from('profiles')
                .select('*')
                .eq('id', session.user.id)
                .single();

            if (error) {
                console.error(error);
                return null;
            }
            return {
                ...data,
                session
            };
        },
    });
};

export const useAdminUsers = (enabled: boolean) => {
    const queryClient = useQueryClient();

    const usersQuery = useQuery({
        queryKey: ['admin-users'],
        queryFn: async () => {
            const { data, error } = await supabase.from('profiles').select('*').order('created_at', { ascending: false });
            if (error) throw error;
            return data;
        },
        enabled,
    });

    const updateRoleMutation = useMutation({
        mutationFn: async ({ id, role }: { id: string, role: string }) => {
            const { error } = await supabase.from('profiles').update({ role }).eq('id', id);
            if (error) throw error;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['admin-users'] });
            toast.success('Regra do usuário atualizada com sucesso');
        },
        onError: (error) => toast.error(`Erro ao atualizar usuário: ${error.message}`),
    });

    return { usersQuery, updateRoleMutation };
};

export const useAdminProducts = (enabled: boolean) => {
    const queryClient = useQueryClient();

    const productsQuery = useQuery({
        queryKey: ['admin-products'],
        queryFn: async () => {
            const { data, error } = await supabase.from('products').select('*').order('created_at', { ascending: false });
            if (error) throw error;
            return data;
        },
        enabled,
    });

    const addProductMutation = useMutation({
        mutationFn: async (newProduct: any) => {
            const { error } = await supabase.from('products').insert([newProduct]);
            if (error) throw error;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['admin-products'] });
            toast.success('Produto criado com sucesso');
        },
        onError: (error) => toast.error(`Erro ao criar produto: ${error.message}`),
    });

    const updateProductMutation = useMutation({
        mutationFn: async (updatedProduct: any) => {
            const { id, ...data } = updatedProduct;
            const { error } = await supabase.from('products').update(data).eq('id', id);
            if (error) throw error;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['admin-products'] });
            toast.success('Produto atualizado com sucesso');
        },
        onError: (error) => toast.error(`Erro ao atualizar produto: ${error.message}`),
    });

    const deleteProductMutation = useMutation({
        mutationFn: async (id: string) => {
            const { error } = await supabase.from('products').delete().eq('id', id);
            if (error) throw error;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['admin-products'] });
            toast.success('Produto removido com sucesso');
        },
        onError: (error) => toast.error(`Erro ao remover produto: ${error.message}`),
    });

    return { productsQuery, addProductMutation, updateProductMutation, deleteProductMutation };
};

export const useAdminPrompt = (enabled: boolean) => {
    const queryClient = useQueryClient();

    const promptQuery = useQuery({
        queryKey: ['admin-prompt'],
        queryFn: async () => {
            const { data, error } = await supabase.from('system_settings').select('value').eq('key', 'ai_system_prompt').single();
            if (error) throw error;
            return data?.value || '';
        },
        enabled,
    });

    const updatePromptMutation = useMutation({
        mutationFn: async (newPrompt: string) => {
            const { error } = await supabase.from('system_settings').update({ value: newPrompt, updated_at: new Date().toISOString() }).eq('key', 'ai_system_prompt');
            if (error) throw error;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['admin-prompt'] });
            toast.success('Prompt atualizado com sucesso');
        },
        onError: (error) => toast.error(`Erro ao atualizar prompt: ${error.message}`),
    });

    return { promptQuery, updatePromptMutation };
};
