import { useEffect } from 'react';
import { sieveGenerator } from './logic/sieve';

function App() {
  useEffect(() => {
    console.log("--- Iniciando Teste do ArithmoFlow ---");
    const engine = sieveGenerator(20); // Testando com números até 20

    let step = engine.next();
    while (!step.done) {
      console.log(`[PASSO]: ${step.value.description}`);
      step = engine.next();
    }
    console.log("--- Teste Finalizado com Sucesso ---");
  }, []);

  return (
    <div className="bg-slate-900 min-h-screen text-white flex items-center justify-center">
      <h1 className="text-2xl font-mono">ArithmoFlow em funcionamento </h1>
      <p className="ml-4">(Abra o console do navegador F12)</p>
    </div>
  );
}

export default App;