import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useAdminPrompt } from '@/hooks/useAdmin';

interface AdminPromptProps {
    enabled: boolean;
}

export const AdminPrompt: React.FC<AdminPromptProps> = ({ enabled }) => {
    const { promptQuery, updatePromptMutation } = useAdminPrompt(enabled);
    const { data: systemPromptData, isLoading: promptLoading } = promptQuery;
    const [promptText, setPromptText] = useState('');

    useEffect(() => {
        if (systemPromptData) setPromptText(systemPromptData);
    }, [systemPromptData]);

    return (
        <div>
            <h2 className="text-2xl font-bold uppercase mb-4">Configuração do Assistente IA</h2>
            <div className="bg-white border-4 border-black p-6 shadow-brutalist flex flex-col gap-4">
                <Label htmlFor="system-prompt" className="font-bold uppercase text-sm">
                    Prompt de Sistema Principal
                </Label>
                <p className="text-sm text-gray-600 mb-2">
                    Este texto dita o comportamento, as regras e a personalidade do ThiagoIA. As alterações aqui refletem universalmente em todos os chats (que abrirem após o salvamento).
                </p>
                {promptLoading ? (
                    <div className="animate-pulse h-64 bg-zinc-200 border-2 border-black"></div>
                ) : (
                    <Textarea
                        id="system-prompt"
                        value={promptText}
                        onChange={(e) => setPromptText(e.target.value)}
                        className="min-h-[300px] border-2 border-black rounded-none font-mono text-sm shadow-[inset_0_2px_4px_rgba(0,0,0,0.1)] focus-visible:ring-black focus-visible:ring-offset-2 focus-visible:ring-2"
                        placeholder="Digite o prompt do sistema aqui..."
                    />
                )}
                <div className="flex justify-end mt-4">
                    <Button
                        onClick={() => updatePromptMutation.mutate(promptText)}
                        disabled={updatePromptMutation.isPending || promptLoading}
                        className="bg-black hover:bg-[#00f3ff] hover:text-black hover:border-black text-white px-8 py-6 font-black uppercase text-lg border-4 border-transparent rounded-none transition-all shadow-brutalist transform hover:-translate-y-1 active:translate-y-0 active:shadow-none"
                    >
                        {updatePromptMutation.isPending ? 'Salvando...' : 'Salvar Prompt'}
                    </Button>
                </div>
            </div>
        </div>
    );
};
