import React, { useState, useRef, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { Send, Cpu, Power, Filter, User, Bot, AlertTriangle, Monitor, Activity } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { supabase } from '@/integrations/supabase/client';

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
  initialSystemMessage?: string | null;
}

export const ChatInterface: React.FC<ChatInterfaceProps> = ({ onReferenceSelect, initialSystemMessage }) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      role: 'assistant',
      content: 'Olá. Sou o Assistente Técnico Thiago IA. Qual equipamento você está reparando hoje e qual o problema?',
      timestamp: new Date()
    }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [chatSession, setChatSession] = useState<any>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const quickActions = [
    { id: 'q1', label: 'Transdutor', icon: <Cpu size={16} />, text: 'Como realizo a calibração do transdutor no Logiq E9?' },
    { id: 'q2', label: 'Erro de Boot', icon: <Power size={16} />, text: 'Meu equipamento está apresentando erro de boot. Quais os passos?' },
    { id: 'q3', label: 'Filtros', icon: <Filter size={16} />, text: 'Qual o procedimento padrão para limpeza de filtros no Vivid T8?' },
    { id: 'q4', label: 'Phantom Test', icon: <Activity size={16} />, text: 'Como executar o Phantom Test corretamente?' },
    { id: 'q5', label: 'Touchscreen', icon: <Monitor size={16} />, text: 'O painel de toque está falhando. O que verificar primeiro?' },
    { id: 'q6', label: 'Logs', icon: <AlertTriangle size={16} />, text: 'Como extrair logs de erro do sistema?' },
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const [systemPrompt, setSystemPrompt] = useState<string>('');

  useEffect(() => {
    const fetchPrompt = async () => {
      const { data, error } = await supabase.from('system_settings').select('value').eq('key', 'ai_system_prompt').single();
      if (!error && data) {
        setSystemPrompt(data.value);
      } else {
        // Fallback
        setSystemPrompt("Você é o 'Técnico Thiago IA'. Você fornece suporte técnico 24/7 sobre equipamentos médicos da marca GE. Responda APENAS de forma exata, extremamente CONCISA e CURTA. Forneça instruções passo a passo diretas, sem longos textos introdutórios ou conclusões. Vá direto ao ponto. Use o idioma Português (Brasil) formatado em Markdown.");
      }
    };
    fetchPrompt();
  }, []);

  useEffect(() => {
    if (!systemPrompt) return;

    try {
      const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY || '');
      const model = genAI.getGenerativeModel({
        model: "gemini-2.5-flash",
        systemInstruction: systemPrompt
      });
      const chat = model.startChat({
        history: [],
      });
      setChatSession(chat);
    } catch (e) {
      console.error("Falha ao inicializar o Gemini", e);
    }
  }, [systemPrompt]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (initialSystemMessage && chatSession) {
      handleSend(initialSystemMessage);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialSystemMessage]);

  const handleSend = async (text: string) => {
    if (!text.trim()) return;

    const newUserMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: text,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, newUserMessage]);
    setInput('');

    if (!chatSession) {
      const errorMsg: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: "Erro: API do Gemini não configurada ou chat não inicializado.",
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, errorMsg]);
      return;
    }

    setIsTyping(true);

    try {
      const result = await chatSession.sendMessageStream(text);

      const responseId = (Date.now() + 1).toString();
      const aiResponse: Message = {
        id: responseId,
        role: 'assistant',
        content: '',
        timestamp: new Date(),
      };

      setMessages(prev => [...prev, aiResponse]);
      setIsTyping(false); // Inicia stream, esconde indicativo

      let fullText = '';
      for await (const chunk of result.stream) {
        const chunkText = chunk.text();
        // Typewriter Effect Simples por palavra/char
        for (let i = 0; i < chunkText.length; i++) {
          fullText += chunkText[i];
          setMessages(prev => prev.map(msg =>
            msg.id === responseId ? { ...msg, content: fullText } : msg
          ));
          await new Promise(resolve => setTimeout(resolve, 5)); // Atraso de 5ms por char
        }
      }
    } catch (error) {
      setIsTyping(false);
      console.error("Erro no chat", error);
      const aiError: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: "Oops! Tive um problema ao processar sua solicitação no Gemini. Verifique as credenciais no arquivo .env.",
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, aiError]);
    }
  };

  return (
    <div className="flex flex-col h-full bg-white font-sans w-full relative">

      {/* Quick Actions Bar */}
      <div className="bg-zinc-100 px-4 border-b-4 border-black flex items-center gap-3 overflow-x-auto h-16 shrink-0 custom-scrollbar">
        {quickActions.map(action => (
          <button
            key={action.id}
            onClick={() => handleSend(action.text)}
            className="flex-shrink-0 flex items-center gap-2 bg-[#00f3ff] text-black border-2 border-black px-3 py-1.5 font-bold uppercase tracking-wider text-[10px] md:text-sm hover:-translate-y-0.5 hover:shadow-brutalist transition-all active:translate-y-0 active:shadow-none whitespace-nowrap"
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
                  className={`p-4 border-2 border-black shadow-brutalist ${msg.role === 'user'
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
          {isTyping && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="flex w-full justify-start"
            >
              <div className="flex gap-3 max-w-[85%] md:max-w-[75%] flex-row">
                <div className="w-10 h-10 flex-shrink-0 flex items-center justify-center border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] bg-[#00f3ff] text-black">
                  <Bot size={20} />
                </div>
                <div className="px-6 py-4 border-2 border-black shadow-brutalist bg-white flex items-center gap-2 h-[60px]">
                  <span className="w-2.5 h-2.5 bg-black rounded-full animate-bounce [animation-delay:-0.3s]"></span>
                  <span className="w-2.5 h-2.5 bg-black rounded-full animate-bounce [animation-delay:-0.15s]"></span>
                  <span className="w-2.5 h-2.5 bg-black rounded-full animate-bounce"></span>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
        <div ref={messagesEndRef} className="h-4" />
      </div>

      {/* Input Area */}
      <div className="bg-white border-t-4 border-black p-4 shrink-0 h-36 flex flex-col justify-center shadow-[0_-4px_10px_rgba(0,0,0,0.05)] w-full">
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
