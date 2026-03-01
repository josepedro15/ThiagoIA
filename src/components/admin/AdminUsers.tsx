import React from 'react';
import {
    Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useAdminUsers } from '@/hooks/useAdmin';

interface AdminUsersProps {
    enabled: boolean;
}

export const AdminUsers: React.FC<AdminUsersProps> = ({ enabled }) => {
    const { usersQuery, updateRoleMutation } = useAdminUsers(enabled);
    const { data: users, isLoading: usersLoading } = usersQuery;

    return (
        <div>
            <h2 className="text-2xl font-bold uppercase mb-4">Gerenciar Usuários</h2>
            <div className="border-2 border-black bg-white">
                <Table>
                    <TableHeader className="bg-zinc-100">
                        <TableRow className="border-b-2 border-black">
                            <TableHead className="font-bold text-black uppercase">Nome</TableHead>
                            <TableHead className="font-bold text-black uppercase">Email</TableHead>
                            <TableHead className="font-bold text-black uppercase">Data de Criação</TableHead>
                            <TableHead className="font-bold text-black uppercase">Permissão</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {usersLoading ? (
                            <TableRow>
                                <TableCell colSpan={4} className="text-center py-8">Carregando usuários...</TableCell>
                            </TableRow>
                        ) : users?.length === 0 ? (
                            <TableRow>
                                <TableCell colSpan={4} className="text-center py-8">Nenhum usuário encontrado.</TableCell>
                            </TableRow>
                        ) : (
                            users?.map((u: any) => (
                                <TableRow key={u.id} className="border-b border-zinc-200">
                                    <TableCell className="font-bold">{u.name || 'Sem nome'}</TableCell>
                                    <TableCell>{u.email || 'Sem email'}</TableCell>
                                    <TableCell>{new Date(u.created_at).toLocaleDateString('pt-BR')}</TableCell>
                                    <TableCell>
                                        <Select
                                            defaultValue={u.role}
                                            onValueChange={(val) => updateRoleMutation.mutate({ id: u.id, role: val })}
                                        >
                                            <SelectTrigger className="w-[140px] border-2 border-black rounded-none h-8 text-xs font-bold uppercase">
                                                <SelectValue />
                                            </SelectTrigger>
                                            <SelectContent className="border-2 border-black rounded-none">
                                                <SelectItem value="user" className="uppercase font-bold text-xs">Usuário comum</SelectItem>
                                                <SelectItem value="admin" className="uppercase font-bold text-xs text-[#00f3ff] bg-black focus:bg-zinc-800 focus:text-[#00f3ff]">Admin</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </TableCell>
                                </TableRow>
                            ))
                        )}
                    </TableBody>
                </Table>
            </div>
        </div>
    );
};
