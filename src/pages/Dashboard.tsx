import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { AppSidebar } from '../components/layout/AppSidebar';
import { ReferencePanel } from '../components/ui/ReferencePanel';
import { ChecklistPanel } from '../components/ui/ChecklistPanel';
import { Menu, BookOpen, MessageSquare, CheckSquare } from 'lucide-react';
import { ChatInterface } from '../components/chat/ChatInterface';
import { Session } from '@supabase/supabase-js';

export default function Dashboard() {
  const navigate = useNavigate();
  const [session, setSession] = useState<Session | null>(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (!session) {
        navigate('/auth');
      } else {
        setSession(session);
      }
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      if (!session) {
        navigate('/auth');
      } else {
        setSession(session);
      }
    });

    return () => subscription.unsubscribe();
  }, [navigate]);

  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [isReferenceOpen, setReferenceOpen] = useState(false);
  const [isChecklistOpen, setChecklistOpen] = useState(false);
  const [selectedEquipmentMsg, setSelectedEquipmentMsg] = useState<string | null>(null);

  // Mock snippet for demonstration
  const [activeSnippet, setActiveSnippet] = useState<{
    title: string;
    content: string;
    page: number;
    manual: string;
  } | undefined>(undefined);

  if (!session) return null;

  return (
    <div className="flex h-screen overflow-hidden bg-gray-100 font-sans">
      {/* Mobile Topbar */}
      <div className="md:hidden fixed top-0 left-0 right-0 h-16 bg-black text-white border-b-4 border-black z-30 flex items-center justify-between px-4 shadow-brutalist print:hidden">
        <button onClick={() => setSidebarOpen(true)} className="p-2 hover:text-[#00f3ff]">
          <Menu size={24} />
        </button>
        <h1 className="text-xl font-black uppercase tracking-widest text-white">
          Thiago<span className="text-[#00f3ff]">IA</span>
        </h1>
        <div className="flex gap-2">
          <button onClick={() => setChecklistOpen(true)} className="p-2 hover:text-[#00f3ff]">
            <CheckSquare size={24} />
          </button>
          <button onClick={() => setReferenceOpen(true)} className="p-2 hover:text-[#00f3ff]">
            <BookOpen size={24} />
          </button>
        </div>
      </div>

      <AppSidebar
        isOpen={isSidebarOpen}
        setIsOpen={setSidebarOpen}
        onSelectEquipment={(name) => {
          setSelectedEquipmentMsg(`Estou iniciando a manutenção do equipamento ${name}. Quais os principais passos de segurança devo verificar primeiro?`);
        }}
      />

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col pt-16 md:pt-0 transition-all duration-300 relative h-full overflow-hidden print:pt-0 print:h-auto print:overflow-visible">

        {/* Desktop Top Header (Hidden on Mobile) */}
        <div className="hidden md:flex h-16 bg-white border-b-4 border-black shrink-0 items-center px-6 sticky top-0 z-20 print:hidden">
          <h2 className="text-lg font-black uppercase tracking-widest text-black flex items-center gap-2">
            Painel de Diagnóstico
          </h2>
        </div>

        <div className="flex flex-1 h-full overflow-hidden print:h-auto print:overflow-visible print:block">
          {/* Main Chat Area */}
          <div className="flex-1 flex flex-col w-full h-full overflow-hidden print:hidden">
            <ChatInterface
              initialSystemMessage={selectedEquipmentMsg}
              onReferenceSelect={(snippet) => {
                setActiveSnippet(snippet);
                setReferenceOpen(true);
              }}
            />
          </div>

          {/* Desktop Inline Right Panel */}
          <div className="hidden md:block w-80 lg:w-96 shrink-0 h-full border-l-4 border-black bg-white z-10 transition-all print:block print:w-full print:border-none print:h-auto print:static">
            <div className="h-16 border-b-4 border-black bg-white flex items-center px-6 shrink-0 print:hidden">
              <h3 className="font-black uppercase tracking-widest flex items-center gap-2">Checklist</h3>
            </div>
            <div className="h-[calc(100%-4rem)] overflow-hidden print:h-auto print:overflow-visible">
              <ChecklistPanel isOpen={true} setIsOpen={setChecklistOpen} />
            </div>
          </div>
        </div>
      </main>

      {/* Overlays / Mobile Panels */}
      <ReferencePanel isOpen={isReferenceOpen} setIsOpen={setReferenceOpen} snippet={activeSnippet} />

      {/* Mobile only checklist, since desktop is now inline */}
      <div className="md:hidden">
        <ChecklistPanel isOpen={isChecklistOpen} setIsOpen={setChecklistOpen} />
      </div>
    </div>
  );
}
