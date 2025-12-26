import { useState } from 'react';

const options = [
  { 
    text: 'El evento se llama "addToCart" pero el trigger escucha "add_to_cart" (naming inconsistente)', 
    correct: true 
  },
  { text: 'Falta la variable "currency"', correct: false },
  { text: 'El precio está mal formateado', correct: false },
  { text: 'El trigger está pausado', correct: false },
];

function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

export default function DebuggingChallenge() {
  const [shuffledOptions] = useState(() => shuffleArray(options));
  const [selected, setSelected] = useState<number | null>(null);
  const [result, setResult] = useState<'success' | 'error' | null>(null);
  const [completed, setCompleted] = useState(false);

  const handleSelect = (index: number, isCorrect: boolean) => {
    setSelected(index);
    
    if (isCorrect) {
      setResult('success');
      setCompleted(true);
    } else {
      setResult('error');
      setTimeout(() => {
        setSelected(null);
        setResult(null);
      }, 2000);
    }
  };

  if (completed) {
    return (
      <div className="bg-green-500/20 border-2 border-green-500 rounded-xl p-8 text-center">
        <div className="text-4xl mb-4">📡</div>
        <h3 className="text-xl font-bold text-green-400 mb-2">¡Correcto! El radar no miente</h3>
        <p className="text-slate-300">El naming debe ser consistente: "addToCart" vs "add_to_cart". Siempre usa la misma convención (snake_case recomendado).</p>
      </div>
    );
  }

  return (
    <div className="bg-slate-800/50 rounded-xl p-6">
      <h3 className="text-xl font-bold mb-2 text-center">🔍 Detective de Bugs</h3>
      <p className="text-slate-400 text-center mb-6">
        Observa este código y el resultado en GTM Debugger. ¿Cuál es el problema?
      </p>

      {/* Code block */}
      <div className="bg-black rounded-lg p-6 font-mono text-green-400 mb-4">
        <div className="text-gray-500 mb-2">// Código implementado:</div>
        <div>dataLayer.push({'{'}</div>
        <div className="ml-4">event: 'addToCart',  <span className="text-yellow-400">// ← Nota este nombre</span></div>
        <div className="ml-4">product_id: 'XYZ789',</div>
        <div className="ml-4">price: 99.99</div>
        <div>{'})'}</div>
      </div>

      {/* Debugger message */}
      <div className="bg-red-500/10 border-2 border-red-500 rounded-lg p-4 mb-6">
        <h4 className="text-red-400 font-bold mb-2">🚨 GTM Debugger dice:</h4>
        <p className="text-slate-300">Trigger "Add to Cart" configurado para escuchar: <code className="bg-slate-700 px-2 py-1 rounded">add_to_cart</code></p>
        <p className="text-slate-300 mt-1"><strong>Estado:</strong> No se disparó ❌</p>
      </div>

      {/* Options */}
      <h4 className="font-bold mb-4">¿Cuál es el problema?</h4>
      <div className="space-y-2">
        {shuffledOptions.map((option, index) => (
          <button
            key={index}
            onClick={() => handleSelect(index, option.correct)}
            disabled={selected !== null}
            className={`w-full text-left p-4 rounded-lg border-2 transition-all text-sm ${
              selected === index && result === 'success'
                ? 'border-green-500 bg-green-500/20'
                : selected === index && result === 'error'
                ? 'border-red-500 bg-red-500/20'
                : 'border-slate-600 hover:border-emerald-400 hover:bg-slate-700/50'
            }`}
          >
            {option.text}
          </button>
        ))}
      </div>

      {/* Error message */}
      {result === 'error' && (
        <div className="mt-4 p-4 bg-red-500/20 border-2 border-red-500 rounded-lg text-center">
          <p className="text-red-400">❌ No es eso...<br/><small>Pista: Fíjate en el NOMBRE del evento en el código vs el nombre que escucha el trigger</small></p>
        </div>
      )}
    </div>
  );
}

