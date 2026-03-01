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
      {/* Overlay - Active for both mobile and desktop now to serve as backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/60 z-[60] backdrop-blur-sm"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Panel Content - Changed behavior to a centered Modal on md/lg, keep right-drawer on mobile */}
      <div
        className={`fixed z-[70] bg-white border-4 border-black transition-all duration-300 ease-in-out shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]
        /* Mobile: Drawer from Right */
        top-0 right-0 h-full w-80 transform ${isOpen ? 'translate-x-0' : 'translate-x-full'}
        /* Desktop: Centered Modal */
        md:top-1/2 md:left-1/2 md:h-auto md:max-h-[85vh] md:w-[600px] md:transform md:-translate-x-1/2 ${isOpen ? 'md:-translate-y-1/2 md:opacity-100 md:scale-100' : 'md:-translate-y-[40%] md:opacity-0 md:scale-95 md:pointer-events-none'}`}
      >
        <div className="p-4 border-b-4 border-black flex justify-between items-center bg-[#00f3ff] text-black">
          <h2 className="font-bold uppercase tracking-widest text-lg flex items-center gap-2">
            <BookOpen size={20} className="text-black" />
            Referência (RAG)
          </h2>
          <button
            onClick={() => setIsOpen(false)}
            className="text-black hover:text-white font-black text-xl"
          >
            ✕
          </button>
        </div>

        <div className="overflow-y-auto h-[calc(100vh-68px)] md:h-auto md:max-h-[calc(85vh-68px)] p-6 bg-gray-50 flex flex-col">
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
