import { useState, useEffect } from "react";
import { NumberCell } from "./components/NumberCell";
import { useAlgorithm } from "./hooks/useAlgorithm";
import { Play, RotateCcw, Github, Linkedin, Cpu, ChevronRight, BookOpen, CheckCircle2 } from "lucide-react";

function App() {
    const [n] = useState(240);
    const [speed, setSpeed] = useState(500);
    const [isAuto, setIsAuto] = useState(false);
    const { currentStep, status, start, next, reset } = useAlgorithm();
    
    const displayNumbers = currentStep 
        ? currentStep.state.numbers 
        : Array.from({ length: n - 1 }, (_, i) => ({
            val: i + 2,
            isPrime: true,
            isCurrent: false,
            isEliminated: false
        }));

    useEffect(() => {
        let timer: NodeJS.Timeout;
        if (isAuto && status === "running") {
            timer = setInterval(() => {
                next();
            }, speed);
        }
        if (status === "finished") setIsAuto(false);
        return () => clearInterval(timer);
    }, [isAuto, status, next, speed]);

    return (
        <div className="min-h-screen bg-[#0a0a0a] text-slate-400 font-mono selection:bg-orange-500/30 flex flex-col">
            <header className="w-full border-b border-slate-900 px-6 xl:px-12 py-12 bg-[#0a0a0a]/80 backdrop-blur-md sticky top-0 z-50">
                <div className="w-full flex flex-col md:flex-row justify-between items-baseline gap-8">
                    <div className="space-y-1">
                        <h1 className="text-3xl font-light text-slate-100 tracking-[0.15em] italic uppercase">
                            ArithmoFlow
                        </h1>
                        <p className="text-[10px] text-slate-600 tracking-[0.4em] uppercase font-bold">
                            Interactive Algorithm Execution Engine // Real-time Analysis
                        </p>
                    </div>

                    <div className="flex items-center gap-10">
                        <div className="flex gap-8 items-center border-r border-slate-900 pr-10">
                            <div className="flex flex-col gap-1">
                                <span className="text-[8px] text-slate-700 uppercase tracking-tighter">Clock_Speed</span>
                                <select 
                                    className="bg-transparent text-[10px] text-slate-400 focus:outline-none cursor-pointer hover:text-orange-500 transition-colors"
                                    value={speed}
                                    onChange={(e) => setSpeed(Number(e.target.value))}
                                >
                                    <option value="1000">0.5x</option>
                                    <option value="500">1.0x</option>
                                    <option value="150">2.5x</option>
                                </select>
                            </div>
                            <button 
                                onClick={() => setIsAuto(!isAuto)}
                                className={`text-[10px] uppercase tracking-[0.2em] font-bold transition-all ${isAuto ? 'text-blue-400 animate-pulse' : 'text-slate-600 hover:text-slate-400'}`}
                            >
                                {isAuto ? '[ AUTO_RUNNING ]' : 'Manual_Step'}
                            </button>
                        </div>

                        <div className="flex gap-10">
                            <button 
                                onClick={() => { reset(); setIsAuto(false); }}
                                className="text-slate-600 hover:text-slate-200 transition-all uppercase text-[10px] tracking-[0.2em] flex items-center gap-2 group"
                            >
                                <RotateCcw size={12} className="group-hover:-rotate-180 transition-transform duration-500" /> 
                                <span className="border-b border-transparent group-hover:border-slate-200">Reset_Memory</span>
                            </button>
                            
                            {status === "idle" ? (
                                <button 
                                    onClick={() => start(n)}
                                    className="text-orange-500 hover:text-orange-400 transition-all uppercase text-[10px] font-black tracking-[0.2em] flex items-center gap-3 group"
                                >
                                    <Play size={12} fill="currentColor" className="group-hover:scale-125 transition-transform" /> 
                                    <span className="border-b border-orange-500/50 group-hover:border-orange-400">Execute_Logic</span>
                                </button>
                            ) : (
                                <button 
                                    onClick={next}
                                    disabled={status === "finished" || isAuto}
                                    className={`uppercase text-[10px] font-black tracking-[0.2em] flex items-center gap-3 group transition-all ${status === "finished" || isAuto ? "text-slate-800" : "text-blue-400 hover:text-blue-300"}`}
                                >
                                    <ChevronRight size={14} className="group-hover:translate-x-1 transition-transform" />
                                    <span className={`border-b ${status === "finished" || isAuto ? "border-transparent" : "border-blue-400/50"}`}>Next_Batch</span>
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            </header>

            <main className="w-full px-6 xl:px-12 py-20 grid grid-cols-1 lg:grid-cols-12 gap-16 flex-grow">
                <div className="lg:col-span-9 xl:col-span-10">
                    <div className="grid grid-cols-6 sm:grid-cols-10 md:grid-cols-12 lg:grid-cols-16 xl:grid-cols-20 2xl:grid-cols-24 gap-x-1 gap-y-8">
                        {displayNumbers.map((num) => (
                            <NumberCell 
                                key={num.val}
                                value={num.val}
                                isPrime={num.isPrime}
                                isCurrent={num.isCurrent}
                                isEliminated={num.isEliminated}
                                isFinalPrime={status === "finished" && num.isPrime}
                            />
                        ))}
                    </div>
                </div>

                <aside className="lg:col-span-3 xl:col-span-2 space-y-16 border-l border-slate-900/50 pl-12 hidden lg:block">
                    <div className="space-y-8">
                        <div className="flex items-center gap-2">
                            <div className={`w-1.5 h-1.5 rounded-full ${status === "running" ? 'bg-orange-500 animate-pulse' : (status === "finished" ? 'bg-emerald-500' : 'bg-slate-800')}`} />
                            <h2 className="text-[10px] text-slate-500 uppercase tracking-[0.4em]">Live_Stream</h2>
                        </div>
                        <div className="space-y-6 min-h-[120px]">
                            {currentStep ? (
                                <>
                                    <p className="text-2xl text-slate-200 leading-tight font-serif italic animate-in fade-in duration-500">
                                        "{currentStep.description}"
                                    </p>
                                    <p className="text-xs text-slate-500 leading-relaxed font-light">
                                        Processando o escalar {currentStep.state.currentP === -1 ? "final" : currentStep.state.currentP} no kernel aritmético.
                                    </p>
                                </>
                            ) : (
                                <p className="text-xs text-slate-700 italic font-serif">
                                    Aguardando sinal para inicialização do kernel...
                                </p>
                            )}

                            {status === "finished" && (
                                <div className="p-3 border border-emerald-900/30 bg-emerald-500/5 rounded animate-in slide-in-from-bottom-2 duration-700">
                                    <p className="text-[9px] text-emerald-500 uppercase tracking-[0.2em] flex items-center gap-2 font-bold">
                                        <CheckCircle2 size={12} /> Primos Identificados com Sucesso
                                    </p>
                                </div>
                            )}
                        </div>
                    </div>

                    <div className="space-y-6 pt-8 border-t border-slate-900/30">
                        <div className="flex items-center gap-2">
                            <BookOpen size={12} className="text-slate-700" />
                            <h2 className="text-[10px] text-slate-700 uppercase tracking-[0.4em]">Teoria Fundamental</h2>
                        </div>
                        <div className="flex gap-4 items-start border-b border-slate-900 pb-8">
                            <div className="w-20 h-24 bg-slate-900 border border-slate-800 flex items-center justify-center overflow-hidden grayscale opacity-75 flex-shrink-0 p-0.5 shadow-2xl">
                                <img 
                                    src="https://upload.wikimedia.org/wikipedia/commons/a/a2/Portrait_of_Eratosthenes.png" 
                                    alt="Retrato de Eratóstenes" 
                                    className="w-full h-full object-cover contrast-125 brightness-90"
                                />
                            </div>
                            <p className="text-[11px] text-slate-500 leading-relaxed font-light italic">
                                "O Crivo elimina múltiplos compostos, reduzindo drasticamente o esforço computacional."
                            </p>
                        </div>
                    </div>

                    <div className="space-y-6 pt-8">
                        <h2 className="text-[10px] text-slate-700 uppercase tracking-[0.4em]">Analysis_Metric</h2>
                        <div className="space-y-1">
                            <span className="text-4xl font-light text-slate-300 tracking-tighter block font-serif italic">
                                O(n log log n)
                            </span>
                            <span className="text-[9px] text-slate-600 uppercase tracking-widest italic">Complexidade Assintótica</span>
                        </div>
                    </div>

                    <div className="pt-16 space-y-4 border-t border-slate-900/50">
                        <div className="text-[9px] text-slate-800 space-y-2 font-mono uppercase tracking-[0.2em]">
                            <div className="flex justify-between">
                                <span>Build_State</span>
                                <span className={status === "running" ? "text-orange-500" : (status === "finished" ? "text-emerald-500" : "text-slate-600")}>
                                    {status.toUpperCase()}
                                </span>
                            </div>
                            <div className="flex justify-between">
                                <span>Environment</span>
                                <span className="text-slate-600">Pure_Arithmetic</span>
                            </div>
                            <div className="flex justify-between">
                                <span>Architect</span>
                                <span className="text-slate-300 underline decoration-orange-500/50 italic text-[11px]">LETICIA_CELESTINO</span>
                            </div>
                        </div>
                    </div>
                </aside>
            </main>

            <footer className="w-full border-t border-slate-900 px-6 xl:px-12 py-10 bg-[#0a0a0a]">
                <div className="w-full flex flex-col md:flex-row justify-between items-center gap-8 text-[10px] tracking-[0.3em] uppercase font-bold text-slate-600">
                    <div className="flex items-center gap-3">
                        <Cpu size={12} className="text-slate-800" />
                        <span className="text-slate-800">Authored_by</span>
                        <span className="text-slate-300 italic tracking-normal">LETICIA CELESTINO</span>
                    </div>
                    <div className="flex items-center gap-10">
                        <a href="https://github.com" target="_blank" rel="noreferrer" className="hover:text-orange-500 transition-colors flex items-center gap-2 group">
                            <Github size={12} /> <span className="group-hover:underline">GitHub</span>
                        </a>
                        <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="hover:text-orange-500 transition-colors flex items-center gap-2 group">
                            <Linkedin size={12} /> <span className="group-hover:underline">LinkedIn</span>
                        </a>
                        <span className="text-slate-700 tracking-widest text-[9px]">© 2026</span>
                    </div>
                </div>
            </footer>
        </div>
    );
}

export default App;