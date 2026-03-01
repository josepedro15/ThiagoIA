import React, { useState } from 'react';
import { CheckSquare, FileText, CheckCircle2, Circle, X } from 'lucide-react';
import { Button } from './button';
import { toast } from 'sonner';

interface ChecklistItem {
    id: string;
    task: string;
    is_checked: boolean;
    completed_at?: string;
}

interface ChecklistPanelProps {
    isOpen: boolean;
    setIsOpen: (open: boolean) => void;
    title?: string;
    items?: ChecklistItem[];
}

export const ChecklistPanel: React.FC<ChecklistPanelProps> = ({ isOpen, setIsOpen, title = "Manutenção Preventiva", items: initialItems = [] }) => {
    const [items, setItems] = useState<ChecklistItem[]>(
        initialItems.length > 0 ? initialItems : [
            { id: '1', task: 'Verificar integridade dos cabos do transdutor', is_checked: false },
            { id: '2', task: 'Limpar filtro de ar principal', is_checked: false },
            { id: '3', task: 'Executar teste de fantasmas (Phantom Test)', is_checked: false },
            { id: '4', task: 'Calibrar painel de toque (Touchscreen)', is_checked: false },
            { id: '5', task: 'Verificar logs de erro do sistema', is_checked: false },
        ]
    );

    const toggleItem = (id: string) => {
        setItems(items.map(item => {
            if (item.id === id) {
                const nowChecked = !item.is_checked;
                return {
                    ...item,
                    is_checked: nowChecked,
                    completed_at: nowChecked ? new Date().toLocaleString('pt-BR') : undefined
                };
            }
            return item;
        }));
    };

    const progress = Math.round((items.filter(i => i.is_checked).length / items.length) * 100) || 0;

    const handleGeneratePDF = () => {
        toast.success('Gerando PDF de Compliance...');
        // Simple way to trigger print dialog focused on this checklist
        setTimeout(() => {
            window.print();
        }, 500);
    };

    return (
        <>
            {/* Mobile overlay */}
            {isOpen && (
                <div
                    className="fixed inset-0 bg-black/80 z-40 md:hidden print:hidden"
                    onClick={() => setIsOpen(false)}
                />
            )}

            <div
                className={`fixed top-0 right-0 h-full w-80 md:w-96 bg-white border-l-4 border-black z-50 transform transition-transform duration-300 ease-in-out md:static md:translate-x-0 md:shadow-none md:border-t-0 md:h-full flex flex-col ${!isOpen ? 'translate-x-full md:translate-x-0 hidden md:flex' : 'translate-x-0 shadow-brutalist-lg'} print:static print:transform-none print:w-full print:border-none print:shadow-none print:bg-white print:h-auto print:block`}
            >
                <div className="md:hidden p-4 border-b-4 border-black flex justify-between items-center bg-[#00f3ff] text-black shrink-0 print:hidden">
                    <h2 className="font-bold uppercase tracking-widest text-lg flex items-center gap-2">
                        <CheckSquare size={20} className="text-black" />
                        Checklist
                    </h2>
                    <button
                        onClick={() => setIsOpen(false)}
                        className="text-black hover:text-white print:hidden"
                    >
                        <X size={20} />
                    </button>
                </div>

                <div className="flex-1 overflow-y-auto w-full p-4 flex flex-col bg-gray-50 print:bg-white print:h-auto print:overflow-visible print:block">

                    <div className="hidden print:block mb-8 border-b-2 border-black pb-4">
                        <h1 className="text-2xl font-black uppercase tracking-widest text-black">Relatório de Compliance Técnico</h1>
                        <p className="text-sm font-semibold text-gray-600 mt-2">Equipamento/Manutenção: {title}</p>
                        <p className="text-sm font-semibold text-gray-600">Data de Emissão: {new Date().toLocaleDateString('pt-BR')} às {new Date().toLocaleTimeString('pt-BR')}</p>
                        <p className="text-sm font-semibold text-gray-600">Técnico/Responsável: Thiago IA</p>
                    </div>

                    <div className="mb-6 print:hidden">
                        <h3 className="font-black text-lg uppercase text-black mb-2">{title}</h3>

                        {/* Progress Bar */}
                        <div className="flex items-center gap-3 mb-2 print:hidden">
                            <div className="flex-1 border-2 border-black h-4 bg-white relative">
                                <div
                                    className="absolute top-0 left-0 h-full bg-[#00f3ff] transition-all duration-300 ease-out"
                                    style={{ width: `${progress}%` }}
                                />
                            </div>
                            <span className="font-bold text-sm tracking-widest">{progress}%</span>
                        </div>

                        <p className="text-[10px] font-bold uppercase text-gray-500 tracking-wider">
                            {items.filter(i => i.is_checked).length} DE {items.length} CONCLUÍDOS
                        </p>
                    </div>

                    <div className="space-y-3 mb-4">
                        {items.map((item) => (
                            <button
                                key={item.id}
                                onClick={() => toggleItem(item.id)}
                                className={`w-full text-left p-3 border-2 border-black shadow-brutalist flex items-start gap-3 transition-colors ${item.is_checked ? 'bg-[#00f3ff]/10' : 'bg-white hover:bg-gray-100'} print:shadow-none print:border print:border-gray-200`}
                            >
                                <div className="mt-0.5 shrink-0">
                                    {item.is_checked ? (
                                        <CheckCircle2 size={20} className="text-green-600 fill-green-100" />
                                    ) : (
                                        <Circle size={20} className="text-gray-400" />
                                    )}
                                </div>
                                <div className="flex flex-col flex-1">
                                    <span className={`font-semibold text-sm ${item.is_checked ? 'line-through text-gray-500' : 'text-black'}`}>
                                        {item.task}
                                    </span>
                                    {item.is_checked && item.completed_at && (
                                        <span className="text-[10px] text-gray-400 mt-1 font-mono text-left">
                                            Concluído em: {item.completed_at}
                                        </span>
                                    )}
                                </div>
                            </button>
                        ))}
                    </div>
                </div>

                {/* Edge-to-edge Footer */}
                <div className="p-4 bg-white border-t-4 border-black shrink-0 print:hidden h-36 flex flex-col justify-center gap-2 w-full">
                    <Button
                        onClick={handleGeneratePDF}
                        className="w-full font-black uppercase tracking-widest text-white bg-black hover:bg-[#00f3ff] hover:text-black border-4 border-black rounded-none shadow-brutalist transition-all h-14 flex items-center gap-2"
                    >
                        <FileText size={20} />
                        <span className="mt-1">Extrair Compliance</span>
                    </Button>
                    <p className="text-center text-[10px] text-gray-500 font-bold uppercase px-2 leading-tight">
                        A assinatura digital deste relatório possui validade de auditoria técnica.
                    </p>
                </div>
            </div>
        </>
    );
};
