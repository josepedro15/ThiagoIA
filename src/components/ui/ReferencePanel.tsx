import React from 'react';
import { BookOpen, ExternalLink, Info } from 'lucide-react';

interface ReferencePanelProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  snippet?: {
    title: string;
    content: string;
    page: number;
    manual: string;
  };
}

export const ReferencePanel: React.FC<ReferencePanelProps> = ({ isOpen, setIsOpen, snippet }) => {
  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/80 z-40 md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Panel Content */}
      <div
        className={`fixed top-0 right-0 h-full w-80 bg-white border-l-4 border-black z-50 transform transition-transform duration-300 ease-in-out md:translate-x-full lg:translate-x-0 ${isOpen ? 'translate-x-0 shadow-brutalist-lg' : 'translate-x-full'}`}
      >
        <div className="p-4 border-b-4 border-black flex justify-between items-center bg-[#00f3ff] text-black">
          <h2 className="font-bold uppercase tracking-widest text-lg flex items-center gap-2">
            <BookOpen size={20} className="text-black" />
            Referência
          </h2>
          <button
            onClick={() => setIsOpen(false)}
            className="lg:hidden text-black hover:text-white"
          >
            ✕
          </button>
        </div>

        <div className="overflow-y-auto h-[calc(100vh-68px)] p-4 bg-gray-50 flex flex-col">
          {!snippet ? (
            <div className="flex flex-col items-center justify-center h-full text-center p-6 text-gray-500">
              <Info size={48} className="mb-4 text-gray-300" />
              <p className="font-bold uppercase tracking-wider text-sm">
                Nenhum snippet de referência ativo. A IA exibirá detalhes do manual RAG aqui.
              </p>
            </div>
          ) : (
            <div>
              <div className="mb-6">
                <p className="text-xs font-bold uppercase text-gray-500 mb-1 tracking-wider">Origem</p>
                <div className="border-2 border-black bg-white p-3 shadow-brutalist flex justify-between items-start">
                  <div>
                    <h3 className="font-black text-black uppercase">{snippet.manual}</h3>
                    <p className="text-xs font-bold text-gray-600 mt-1 uppercase">Pág. {snippet.page}</p>
                  </div>
                  <ExternalLink size={16} className="text-black hover:text-[#00f3ff] cursor-pointer" />
                </div>
              </div>

              <div>
                <p className="text-xs font-bold uppercase text-gray-500 mb-1 tracking-wider">Snippet: {snippet.title}</p>
                <div className="border-2 border-black bg-[#ffffea] p-4 font-mono text-sm text-black whitespace-pre-wrap leading-relaxed shadow-brutalist">
                  {snippet.content}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};
