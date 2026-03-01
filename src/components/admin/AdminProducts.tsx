import React, { useState } from 'react';
import {
    Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
    Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { getOptimizedImageUrl } from '@/lib/utils';
import { useAdminProducts } from '@/hooks/useAdmin';

interface AdminProductsProps {
    enabled: boolean;
}

export const AdminProducts: React.FC<AdminProductsProps> = ({ enabled }) => {
    const { productsQuery, addProductMutation, updateProductMutation, deleteProductMutation } = useAdminProducts(enabled);
    const { data: products, isLoading: productsLoading } = productsQuery;

    const [isProductModalOpen, setIsProductModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [editingProduct, setEditingProduct] = useState<any>(null);
    const [productForm, setProductForm] = useState({
        name: '',
        description: '',
        price: '',
        image_url: '',
        payment_link: ''
    });

    const handleCreateProduct = (e: React.FormEvent) => {
        e.preventDefault();
        addProductMutation.mutate({
            ...productForm,
            price: parseFloat(productForm.price)
        });
        setProductForm({ name: '', description: '', price: '', image_url: '', payment_link: '' });
        setIsProductModalOpen(false);
    };

    const handleUpdateProduct = (e: React.FormEvent) => {
        e.preventDefault();
        if (!editingProduct) return;
        updateProductMutation.mutate({
            ...editingProduct,
            price: parseFloat(editingProduct.price)
        });
        setIsEditModalOpen(false);
        setEditingProduct(null);
    };

    return (
        <div>
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-bold uppercase">Gerenciar Produtos</h2>
                <Dialog open={isProductModalOpen} onOpenChange={setIsProductModalOpen}>
                    <DialogTrigger asChild>
                        <Button className="bg-[#00f3ff] hover:bg-[#00d0db] text-black font-bold border-2 border-black rounded-none shadow-brutalist-sm hover:translate-y-px transition-all uppercase">
                            Novo Produto
                        </Button>
                    </DialogTrigger>
                    <DialogContent className="border-4 border-black rounded-none sm:max-w-[425px]">
                        <DialogHeader>
                            <DialogTitle className="text-xl font-bold uppercase border-b-2 border-black pb-2">Adicionar Produto</DialogTitle>
                        </DialogHeader>
                        <form onSubmit={handleCreateProduct} className="space-y-4 pt-4">
                            <div className="space-y-2">
                                <Label htmlFor="name" className="font-bold uppercase text-xs">Nome do Produto</Label>
                                <Input id="name" required value={productForm.name} onChange={e => setProductForm({ ...productForm, name: e.target.value })} className="border-2 border-black rounded-none" />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="description" className="font-bold uppercase text-xs">Descrição</Label>
                                <Textarea id="description" value={productForm.description} onChange={e => setProductForm({ ...productForm, description: e.target.value })} className="border-2 border-black rounded-none" />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="price" className="font-bold uppercase text-xs">Valor (R$)</Label>
                                <Input id="price" type="number" step="0.01" required value={productForm.price} onChange={e => setProductForm({ ...productForm, price: e.target.value })} className="border-2 border-black rounded-none" />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="image" className="font-bold uppercase text-xs">URL da Imagem</Label>
                                <Input id="image" type="url" value={productForm.image_url} onChange={e => setProductForm({ ...productForm, image_url: e.target.value })} className="border-2 border-black rounded-none" />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="link" className="font-bold uppercase text-xs">Link de Pagamento / Compra</Label>
                                <Input id="link" type="url" value={productForm.payment_link} onChange={e => setProductForm({ ...productForm, payment_link: e.target.value })} className="border-2 border-black rounded-none" />
                            </div>
                            <Button type="submit" disabled={addProductMutation.isPending} className="w-full bg-black text-white hover:bg-zinc-800 font-bold uppercase rounded-none mt-4">
                                {addProductMutation.isPending ? 'Salvando...' : 'Salvar Produto'}
                            </Button>
                        </form>
                    </DialogContent>
                </Dialog>

                <Dialog open={isEditModalOpen} onOpenChange={setIsEditModalOpen}>
                    <DialogContent className="border-4 border-black rounded-none sm:max-w-[425px]">
                        <DialogHeader>
                            <DialogTitle className="text-xl font-bold uppercase border-b-2 border-black pb-2">Editar Produto</DialogTitle>
                        </DialogHeader>
                        {editingProduct && (
                            <form onSubmit={handleUpdateProduct} className="space-y-4 pt-4">
                                <div className="space-y-2">
                                    <Label htmlFor="edit-name" className="font-bold uppercase text-xs">Nome do Produto</Label>
                                    <Input id="edit-name" required value={editingProduct.name} onChange={e => setEditingProduct({ ...editingProduct, name: e.target.value })} className="border-2 border-black rounded-none" />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="edit-description" className="font-bold uppercase text-xs">Descrição</Label>
                                    <Textarea id="edit-description" value={editingProduct.description || ''} onChange={e => setEditingProduct({ ...editingProduct, description: e.target.value })} className="border-2 border-black rounded-none" />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="edit-price" className="font-bold uppercase text-xs">Valor (R$)</Label>
                                    <Input id="edit-price" type="number" step="0.01" required value={editingProduct.price} onChange={e => setEditingProduct({ ...editingProduct, price: e.target.value })} className="border-2 border-black rounded-none" />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="edit-image" className="font-bold uppercase text-xs">URL da Imagem</Label>
                                    <Input id="edit-image" type="url" value={editingProduct.image_url || ''} onChange={e => setEditingProduct({ ...editingProduct, image_url: e.target.value })} className="border-2 border-black rounded-none" />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="edit-link" className="font-bold uppercase text-xs">Link de Pagamento / Compra</Label>
                                    <Input id="edit-link" type="url" value={editingProduct.payment_link || ''} onChange={e => setEditingProduct({ ...editingProduct, payment_link: e.target.value })} className="border-2 border-black rounded-none" />
                                </div>
                                <Button type="submit" disabled={updateProductMutation.isPending} className="w-full bg-black text-white hover:bg-zinc-800 font-bold uppercase rounded-none mt-4">
                                    {updateProductMutation.isPending ? 'Salvando...' : 'Atualizar Produto'}
                                </Button>
                            </form>
                        )}
                    </DialogContent>
                </Dialog>
            </div>

            <div className="border-2 border-black bg-white">
                <Table>
                    <TableHeader className="bg-zinc-100">
                        <TableRow className="border-b-2 border-black">
                            <TableHead className="font-bold text-black uppercase">Foto</TableHead>
                            <TableHead className="font-bold text-black uppercase">Nome</TableHead>
                            <TableHead className="font-bold text-black uppercase hidden md:table-cell">Descrição</TableHead>
                            <TableHead className="font-bold text-black uppercase">Preço</TableHead>
                            <TableHead className="font-bold text-black uppercase text-right">Ações</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {productsLoading ? (
                            <TableRow>
                                <TableCell colSpan={5} className="text-center py-8">Carregando produtos...</TableCell>
                            </TableRow>
                        ) : products?.length === 0 ? (
                            <TableRow>
                                <TableCell colSpan={5} className="text-center py-8">Nenhum produto cadastrado.</TableCell>
                            </TableRow>
                        ) : (
                            products?.map((product: any) => (
                                <TableRow key={product.id} className="border-b border-zinc-200">
                                    <TableCell>
                                        {product.image_url ? (
                                            <img src={getOptimizedImageUrl(product.image_url)} alt={product.name} className="w-12 h-12 object-cover border border-black" referrerPolicy="no-referrer" />
                                        ) : (
                                            <div className="w-12 h-12 bg-zinc-200 border border-black flex items-center justify-center text-xs">Sem foto</div>
                                        )}
                                    </TableCell>
                                    <TableCell className="font-bold">{product.name}</TableCell>
                                    <TableCell className="hidden md:table-cell max-w-xs truncate">{product.description}</TableCell>
                                    <TableCell>R$ {product.price}</TableCell>
                                    <TableCell className="text-right flex items-center justify-end gap-2">
                                        <Button
                                            variant="outline"
                                            size="sm"
                                            className="rounded-none uppercase font-bold text-xs border-2 border-black"
                                            onClick={() => {
                                                setEditingProduct(product);
                                                setIsEditModalOpen(true);
                                            }}
                                        >
                                            Editar
                                        </Button>
                                        <Button
                                            variant="destructive"
                                            size="sm"
                                            className="rounded-none uppercase font-bold text-xs"
                                            onClick={() => {
                                                if (confirm('Tem certeza que deseja excluir este produto?')) {
                                                    deleteProductMutation.mutate(product.id);
                                                }
                                            }}
                                        >
                                            Excluir
                                        </Button>
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
