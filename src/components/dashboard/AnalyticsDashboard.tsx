import React from 'react';
import { Activity, AlertTriangle, Calendar, Settings, TrendingUp, Search } from 'lucide-react';

export const AnalyticsDashboard = () => {
    return (
        <div className="flex-1 overflow-y-auto bg-gray-50 h-full w-full p-4 md:p-6 lg:p-8 font-sans">
            <div className="max-w-7xl mx-auto space-y-8">

                {/* Header */}
                <div>
                    <h1 className="text-3xl font-black uppercase tracking-widest text-black mb-2">
                        Saúde da <span className="text-[#00f3ff] drop-shadow-[1px_1px_0px_rgba(0,0,0,1)]">Frota</span>
                    </h1>
                    <p className="text-gray-600 font-semibold">Monitoramento preditivo e agendamentos de manutenção preventiva.</p>
                </div>

                {/* Top KPIs */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
                    <div className="bg-white border-4 border-black p-6 shadow-brutalist flex flex-col justify-between">
                        <div className="flex justify-between items-start mb-4">
                            <div className="bg-green-400 p-3 border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                                <Activity size={24} className="text-black" />
                            </div>
                            <span className="text-4xl font-black">6</span>
                        </div>
                        <h3 className="font-bold uppercase tracking-wider text-sm text-gray-500">Equipamentos Ativos</h3>
                        <p className="text-green-600 font-bold text-xs mt-2 flex items-center gap-1"><TrendingUp size={14} /> +1 desde mês passado</p>
                    </div>

                    <div className="bg-[#ffffea] border-4 border-black p-6 shadow-brutalist flex flex-col justify-between">
                        <div className="flex justify-between items-start mb-4">
                            <div className="bg-yellow-400 p-3 border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                                <Calendar size={24} className="text-black" />
                            </div>
                            <span className="text-4xl font-black">2</span>
                        </div>
                        <h3 className="font-bold uppercase tracking-wider text-sm text-gray-500">PMs Pendentes (30 Dias)</h3>
                        <p className="text-yellow-600 font-bold text-xs mt-2">Vivid T8 e Lunar Prodigy</p>
                    </div>

                    <div className="bg-[#ffea] bg-red-50 border-4 border-black p-6 shadow-brutalist flex flex-col justify-between">
                        <div className="flex justify-between items-start mb-4">
                            <div className="bg-red-400 p-3 border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                                <AlertTriangle size={24} className="text-white" />
                            </div>
                            <span className="text-4xl font-black text-red-600">1</span>
                        </div>
                        <h3 className="font-bold uppercase tracking-wider text-sm text-gray-500">Risco Crítico (Falhas Recorrentes)</h3>
                        <p className="text-red-600 font-bold text-xs mt-2">Senographe Pristina: Erro X (3x/mês)</p>
                    </div>
                </div>

                {/* Preditive Tracking and Spare parts RAG mock */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

                    {/* Manutenção Preventiva */}
                    <div className="bg-white border-4 border-black flex flex-col shadow-brutalist h-[400px]">
                        <div className="bg-[#00f3ff] border-b-4 border-black p-4 flex items-center gap-2">
                            <Settings size={20} className="text-black" />
                            <h2 className="font-black uppercase tracking-widest text-black text-lg">Cronograma PM</h2>
                        </div>
                        <div className="p-4 flex-1 overflow-y-auto space-y-4">
                            {[
                                { name: 'Vivid T8', room: 'Cardio', days: 12, status: 'warning' },
                                { name: 'Lunar Prodigy', room: 'Densitometria', days: 28, status: 'warning' },
                                { name: 'Logiq E9', room: 'Sala 1', days: 145, status: 'healthy' },
                                { name: 'Voluson E8', room: 'GO', days: 210, status: 'healthy' }
                            ].map((item, idx) => (
                                <div key={idx} className="flex items-center justify-between border-2 border-black p-3 hover:bg-gray-50">
                                    <div>
                                        <h3 className="font-bold text-black">{item.name} <span className="text-xs text-gray-500 font-semibold ml-2">{item.room}</span></h3>
                                    </div>
                                    <div className={`px-3 py-1 border-2 border-black font-bold text-xs uppercase tracking-widest ${item.status === 'warning' ? 'bg-yellow-400 text-black' : 'bg-green-400 text-black'}`}>
                                        Faltam {item.days} d
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Catálogo de Peças RAG */}
                    <div className="bg-black border-4 border-black flex flex-col shadow-brutalist h-[400px] text-white">
                        <div className="border-b-4 border-[#00f3ff] p-4 flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                <Search size={20} className="text-[#00f3ff]" />
                                <h2 className="font-black uppercase tracking-widest text-[#00f3ff] text-lg">Consulta Rápida de Peça</h2>
                            </div>
                            <span className="text-xs bg-[#00f3ff] text-black px-2 py-0.5 font-bold uppercase">Beta</span>
                        </div>
                        <div className="p-4 flex flex-col h-full justify-between">
                            <p className="text-sm text-gray-400 font-mono mb-4">Insira o Código de Erro de Fábrica ou a descrição sintomática para buscar o Part Number e Fornecedor sugerido pela IA.</p>

                            <div className="flex-1 bg-zinc-900 border-2 border-zinc-700 p-4 font-mono text-sm text-green-400 overflow-y-auto mb-4 relative">
                                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-zinc-900 pointer-events-none opacity-50" />
                                &gt; system_ready<br />
                                &gt; query_catalog(&quot;Error Code: 0x48A Vivid T8&quot;)<br />
                                &gt; processing...<br />
                                <br />
                                <span className="text-white">DIAGNÓSTICO:</span> Falha na fonte de alimentação ATX do Front-End.<br />
                                <span className="text-white">PART NUMBER (GE):</span> 2432924-2<br />
                                <span className="text-white">FORNECEDOR RECOMENDADO:</span> TechMed Brasil (Em estoque)<br />
                                <button className="mt-3 bg-[#00f3ff] text-black px-4 py-1 text-xs font-bold uppercase border-none hover:bg-white transition-colors cursor-not-allowed">
                                    Solicitar Cotação
                                </button>
                            </div>

                            <div className="flex gap-2">
                                <input
                                    type="text"
                                    placeholder="Ex: Erro 0x48A Vivid T8"
                                    className="flex-1 bg-white border-2 border-white text-black px-3 py-2 font-mono text-sm focus:outline-none"
                                    disabled
                                />
                                <button disabled className="bg-zinc-700 p-2 border-2 border-zinc-700 hover:bg-white hover:text-black transition-colors">
                                    <Search size={20} />
                                </button>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
};
