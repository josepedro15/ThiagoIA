import React, { useState } from 'react';
import { Menu, FileText, ChevronRight } from 'lucide-react';

const equipmentModels = [
  { name: 'Logiq E9', type: 'Ultrasound' },
  { name: 'Logiq S8', type: 'Ultrasound' },
  { name: 'Vivid E9', type: 'Cardiovascular' },
  { name: 'Vivid T8', type: 'Cardiovascular' },
  { name: 'Voluson E10', type: 'Women\'s Health' },
  { name: 'Voluson S10', type: 'Women\'s Health' },
];

interface SidebarProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ isOpen, setIsOpen }) => {
  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/80 z-40 md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar Content */}
      <div
        className={`fixed top-0 left-0 h-full w-72 bg-white border-r-4 border-black z-50 transform transition-transform duration-300 ease-in-out md:translate-x-0 ${isOpen ? 'translate-x-0 shadow-brutalist-lg' : '-translate-x-full'}`}
      >
        <div className="p-4 border-b-4 border-black flex justify-between items-center bg-black text-white">
          <h2 className="font-bold uppercase tracking-widest text-lg flex items-center gap-2">
            <FileText className="text-[#00f3ff]" />
            Equipamentos
          </h2>
          <button
            onClick={() => setIsOpen(false)}
            className="md:hidden text-white hover:text-[#00f3ff]"
          >
            ✕
          </button>
        </div>

        <div className="overflow-y-auto h-[calc(100vh-68px)] p-4 bg-gray-50">
          <p className="text-xs font-bold uppercase text-gray-500 mb-4 tracking-wider">Manuais Suportados</p>

          <ul className="space-y-3">
            {equipmentModels.map((model, idx) => (
              <li key={idx} className="group">
                <button className="w-full text-left p-3 border-2 border-black bg-white shadow-brutalist hover:shadow-brutalist-neon hover:-translate-y-1 transition-all flex justify-between items-center text-black font-bold uppercase tracking-wide text-sm">
                  <span>{model.name}</span>
                  <ChevronRight size={16} className="text-gray-400 group-hover:text-black" />
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
};
