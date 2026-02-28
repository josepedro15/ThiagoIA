import React, { useState } from 'react';
import { Sidebar } from '../components/ui/Sidebar';
import { ReferencePanel } from '../components/ui/ReferencePanel';
import { Menu, BookOpen, MessageSquare } from 'lucide-react';
import { ChatInterface } from '../components/chat/ChatInterface';

export default function Dashboard() {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [isReferenceOpen, setReferenceOpen] = useState(false);

  // Mock snippet for demonstration
  const [activeSnippet, setActiveSnippet] = useState<{
    title: string;
    content: string;
    page: number;
    manual: string;
  } | undefined>(undefined);

  return (
    <div className="flex h-screen overflow-hidden bg-gray-100 font-sans">
      {/* Mobile Topbar */}
      <div className="md:hidden fixed top-0 left-0 right-0 h-16 bg-black text-white border-b-4 border-black z-30 flex items-center justify-between px-4 shadow-brutalist">
        <button onClick={() => setSidebarOpen(true)} className="p-2 hover:text-[#00f3ff]">
          <Menu size={24} />
        </button>
        <h1 className="text-xl font-black uppercase tracking-widest text-white">
          Thiago<span className="text-[#00f3ff]">IA</span>
        </h1>
        <button onClick={() => setReferenceOpen(true)} className="p-2 hover:text-[#00f3ff]">
          <BookOpen size={24} />
        </button>
      </div>

      <Sidebar isOpen={isSidebarOpen} setIsOpen={setSidebarOpen} />

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col pt-16 md:pt-0 md:ml-72 lg:mr-80 transition-all duration-300">
        <div className="flex-1 flex flex-col w-full max-w-4xl mx-auto h-full p-4 md:p-6 lg:p-8">
          <ChatInterface
            onReferenceSelect={(snippet) => {
              setActiveSnippet(snippet);
              setReferenceOpen(true);
            }}
          />
        </div>
      </main>

      <ReferencePanel isOpen={isReferenceOpen} setIsOpen={setReferenceOpen} snippet={activeSnippet} />
    </div>
  );
}
