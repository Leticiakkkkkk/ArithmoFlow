import { useState } from "react";
import { NumberCell } from "./components/NumberCell";
import { useAlgorithm } from "./hooks/useAlgorithm";
import { Play, RotateCcw, Github, Linkedin, Cpu, ChevronRight, BookOpen } from "lucide-react";

function App() {
    const [n] = useState(240);
    const { currentStep, status, start, next, reset } = useAlgorithm();
    
    const displayNumbers = currentStep 
        ? currentStep.state.numbers 
        : Array.from({ length: n - 1 }, (_, i) => ({
            val: i + 2,
            isPrime: true,
            isCurrent: false,
            isEliminated: false
        }));

    return (
        <div className="min-h-screen bg-[#0a0a0a] text-slate-400 font-mono selection:bg-orange-500/30 flex flex-col">
            <header className="w-full border-b border-slate-900 px-6 xl:px-12 py-12 bg-[#0a0a0a]/80 backdrop-blur-md sticky top-0 z-50">
                <div className="w-full flex flex-col md:flex-row justify-between items-baseline gap-8">
                    <div className="space-y-1">
                        <h1 className="text-3xl font-light text-slate-100 tracking-[0.15em] italic uppercase">
                            ArithmoFlow
                        </h1>
                        <p className="text-[10px] text-slate-600 tracking-[0.4em] uppercase font-bold">
                            Visual analysis of classical algorithms
                        </p>
                    </div>

                    <div className="flex items-center gap-12">
                        <div className="text-right hidden sm:block">
                            <p className="text-[9px] text-slate-700 uppercase tracking-widest mb-1">Active_Core</p>
                            <p className="text-xs text-slate-400 font-serif italic">Sieve of Eratosthenes</p>
                        </div>
                        <div className="w-[1px] h-10 bg-slate-900" />
                        <div className="flex gap-10">
                            <button 
                                onClick={reset}
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
                                    disabled={status === "finished"}
                                    className={`uppercase text-[10px] font-black tracking-[0.2em] flex items-center gap-3 group transition-all ${status === "finished" ? "text-slate-800" : "text-blue-400 hover:text-blue-300"}`}
                                >
                                    <ChevronRight size={14} className="group-hover:translate-x-1 transition-transform" />
                                    <span className={`border-b ${status === "finished" ? "border-transparent" : "border-blue-400/50"}`}>Next_Step</span>
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
                            />
                        ))}
                    </div>
                </div>

                <aside className="lg:col-span-3 xl:col-span-2 space-y-16 border-l border-slate-900/50 pl-12 hidden lg:block">
                    <div className="space-y-8">
                        <div className="flex items-center gap-2">
                            <div className={`w-1.5 h-1.5 rounded-full ${status === "running" ? 'bg-orange-500 animate-pulse' : 'bg-slate-800'}`} />
                            <h2 className="text-[10px] text-slate-500 uppercase tracking-[0.4em]">Live_Stream</h2>
                        </div>
                        <div className="space-y-6 min-h-[120px]">
                            {currentStep ? (
                                <>
                                    <p className="text-xl text-slate-200 leading-tight font-serif italic animate-in fade-in duration-500">
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
                        </div>
                    </div>

                    <div className="space-y-6 pt-8 border-t border-slate-900/30">
                        <div className="flex items-center gap-2">
                            <BookOpen size={12} className="text-slate-700" />
                            <h2 className="text-[10px] text-slate-700 uppercase tracking-[0.4em]">Teoria Fundamental</h2>
                        </div>
                        <div className="flex gap-4 items-start">
                            <div className="w-20 h-24 bg-slate-900 border border-slate-800 flex items-center justify-center overflow-hidden grayscale opacity-75 flex-shrink-0 p-0.5">
                                <img 
                                    src="https://upload.wikimedia.org/wikipedia/commons/a/a2/Portrait_of_Eratosthenes.png" 
                                    alt="Retrato de Eratóstenes de Cirene" 
                                    className="w-full h-full object-cover contrast-125 brightness-90"
                                />
                            </div>
                            <div className="space-y-3">
                                <p className="text-xs text-slate-400 leading-relaxed font-light">
                                    <strong className="text-slate-300 font-normal">Eratóstenes de Cirene</strong> (c. 276 a.C.) desenvolveu este método antigo e eficiente para encontrar números primos.
                                </p>
                                <p className="text-[10px] text-slate-500 leading-relaxed font-light italic border-l-2 border-slate-800 pl-3">
                                    "O algoritmo funciona marcando iterativamente os múltiplos compostos de cada primo encontrado, começando pelo 2."
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="space-y-6 pt-8 border-t border-slate-900/30">
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
                                <span className="text-slate-600">{status.toUpperCase()}</span>
                            </div>
                            <div className="flex justify-between">
                                <span>Environment</span>
                                <span className="text-slate-600">Pure_Arithmetic</span>
                            </div>
                            <div className="flex justify-between">
                                <span>Architect</span>
                                <span className="text-slate-300 underline decoration-orange-500/50 italic text-[11px]">Leticia_Celestino</span>
                            </div>
                        </div>
                    </div>
                </aside>
            </main>

            <footer className="w-full border-t border-slate-900 px-6 xl:px-12 py-10 bg-[#0a0a0a]">
                <div className="w-full flex flex-col md:flex-row justify-between items-center gap-8 text-[10px] tracking-[0.3em] uppercase font-bold text-slate-600">
                    <div className="flex flex-col md:flex-row items-center gap-10">
                        <div className="flex items-center gap-3">
                            <Cpu size={12} className="text-slate-800" />
                            <span className="text-slate-800">Authored_by</span>
                            <span className="text-slate-300 italic tracking-normal">Leticia Celestino</span>
                        </div>
                        <div className="hidden md:block w-[1px] h-3 bg-slate-900" />
                        <div className="flex items-center gap-3">
                            <span className="text-slate-800">Concept</span>
                            <span className="text-slate-500 italic tracking-normal">Visual Analysis of Classical Algorithms</span>
                        </div>
                    </div>

                    <div className="flex items-center gap-10">
                        <a href="https://github.com" target="_blank" rel="noreferrer" className="hover:text-orange-500 transition-colors flex items-center gap-2">
                            <Github size={12} /> GitHub
                        </a>
                        <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="hover:text-orange-500 transition-colors flex items-center gap-2">
                            <Linkedin size={12} /> LinkedIn
                        </a>
                        <div className="hidden md:block w-[1px] h-3 bg-slate-900" />
                        <span className="text-slate-700 tracking-widest text-[9px]">© 2026</span>
                    </div>
                </div>
            </footer>
        </div>
    );
}

export default App;