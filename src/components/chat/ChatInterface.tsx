import React, { useState, useRef, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import { Send, Cpu, Power, Filter, User, Bot, AlertTriangle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  snippet?: {
    title: string;
    content: string;
    page: number;
    manual: string;
  };
}

interface ChatInterfaceProps {
  onReferenceSelect?: (snippet: { title: string; content: string; page: number; manual: string }) => void;
}

export const ChatInterface: React.FC<ChatInterfaceProps> = ({ onReferenceSelect }) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      role: 'assistant',
      content: 'Olá. Sou o Assistente Técnico Thiago IA. Qual equipamento você está reparando hoje e qual o problema?',
      timestamp: new Date()
    }
  ]);
  const [input, setInput] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const quickActions = [
    { id: 'q1', label: 'Calibração de Transdutor', icon: <Cpu size={16} />, text: 'Como realizo a calibração do transdutor no Logiq E9?' },
    { id: 'q2', label: 'Erro de Boot', icon: <Power size={16} />, text: 'Meu equipamento está apresentando erro de boot. Quais os passos?' },
    { id: 'q3', label: 'Limpeza de Filtros', icon: <Filter size={16} />, text: 'Qual o procedimento padrão para limpeza de filtros no Vivid T8?' },
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = (text: string) => {
    if (!text.trim()) return;

    const newUserMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: text,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, newUserMessage]);
    setInput('');

    // Simulate AI response
    setTimeout(() => {
      const isRAG = Math.random() > 0.5;
      const snippet = isRAG ? {
        title: 'Seção 4.2 - Resolução de Erro Code 404',
        content: '1. Desligue a máquina puxando a tomada.\n2. Remova os painéis laterais.\n3. Verifique a placa TX.\n4. Reconecte e faça o boot de segurança.',
        page: 142,
        manual: 'Logiq E9 Service Manual'
      } : undefined;

      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: `*Aqui está a resposta sugerida:*\n\nPara resolver este problema, siga os passos descritos abaixo.\n\n${isRAG ? '> Consultei o manual de serviço para esta resposta.' : 'Esta é uma solução comum baseada na base de conhecimento.'}`,
        timestamp: new Date(),
        snippet: snippet
      };

      setMessages(prev => [...prev, aiResponse]);
      if (snippet && onReferenceSelect) {
         onReferenceSelect(snippet);
      }
    }, 1500);
  };

  return (
    <div className="flex flex-col h-full bg-white border-4 border-black shadow-brutalist overflow-hidden font-sans">

      {/* Quick Actions Bar */}
      <div className="bg-black p-3 md:p-4 border-b-4 border-black overflow-x-auto flex gap-3 whitespace-nowrap">
        {quickActions.map(action => (
          <button
            key={action.id}
            onClick={() => handleSend(action.text)}
            className="flex-shrink-0 flex items-center gap-2 bg-[#00f3ff] text-black border-2 border-black px-4 py-2 font-bold uppercase tracking-wider text-xs md:text-sm hover:-translate-y-1 hover:shadow-brutalist transition-all active:translate-y-0 active:shadow-none"
          >
            {action.icon}
            {action.label}
          </button>
        ))}
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-4 md:p-6 space-y-6 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGNpcmNsZSBjeD0iMSIgY3k9IjEiIHI9IjEiIGZpbGw9IiNlNWU3ZWIiLz48L3N2Zz4=')]">
        <AnimatePresence>
          {messages.map((msg) => (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              key={msg.id}
              className={`flex w-full ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`flex gap-3 max-w-[85%] md:max-w-[75%] ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}
              >
                <div className={`w-10 h-10 flex-shrink-0 flex items-center justify-center border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] ${msg.role === 'user' ? 'bg-black text-white' : 'bg-[#00f3ff] text-black'}`}>
                  {msg.role === 'user' ? <User size={20} /> : <Bot size={20} />}
                </div>

                <div
                  className={`p-4 border-2 border-black shadow-brutalist ${
                    msg.role === 'user'
                      ? 'bg-black text-white'
                      : 'bg-white text-black'
                  }`}
                >
                  {msg.role === 'assistant' && (
                    <div className="flex items-center gap-2 mb-2 pb-2 border-b-2 border-dashed border-gray-300">
                      <span className="font-bold uppercase tracking-widest text-xs text-[#00f3ff] bg-black px-2 py-0.5">Sistema</span>
                      <span className="text-[10px] text-gray-500 font-mono">
                        {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </span>
                    </div>
                  )}

                  <div className={`prose prose-sm md:prose-base max-w-none ${msg.role === 'user' ? 'prose-invert' : ''}`}>
                    <ReactMarkdown>{msg.content}</ReactMarkdown>
                  </div>

                  {msg.snippet && (
                    <button
                      onClick={() => onReferenceSelect && onReferenceSelect(msg.snippet)}
                      className="mt-4 flex items-center gap-2 text-xs font-bold uppercase tracking-wide bg-[#ffffea] border-2 border-black p-2 text-black hover:bg-[#00f3ff] transition-colors w-full justify-between group"
                    >
                      <span className="flex items-center gap-2"><AlertTriangle size={14} className="text-orange-500 group-hover:text-black" /> Ver Fonte (RAG)</span>
                      <span>{msg.snippet.manual}</span>
                    </button>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="p-4 bg-white border-t-4 border-black">
        <div className="flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend(input)}
            placeholder="Descreva o problema ou código de erro..."
            className="flex-1 bg-white border-4 border-black p-4 text-black font-bold uppercase tracking-wide text-sm placeholder:text-gray-400 focus:outline-none focus:shadow-brutalist-neon transition-shadow"
          />
          <button
            onClick={() => handleSend(input)}
            disabled={!input.trim()}
            className="bg-black text-white border-4 border-black p-4 flex items-center justify-center hover:bg-[#00f3ff] hover:text-black transition-colors disabled:opacity-50 disabled:hover:bg-black disabled:hover:text-white"
          >
            <Send size={24} />
          </button>
        </div>
      </div>
    </div>
  );
};
