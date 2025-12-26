import { useState } from 'react';

const options = [
  { text: 'transaction_id', correct: true },
  { text: 'user_email', correct: false },
  { text: 'page_url', correct: false },
  { text: 'click_text', correct: false },
];

function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

export default function VariableSelector() {
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
        <div className="text-4xl mb-4">✅</div>
        <h3 className="text-xl font-bold text-green-400 mb-2">¡Correcto!</h3>
        <p className="text-slate-300">Ahora puedes crear una variable Data Layer con el nombre "transaction_id"</p>
      </div>
    );
  }

  return (
    <div className="bg-slate-800/50 rounded-xl p-6">
      <h3 className="text-xl font-bold mb-2 text-center">🎯 Selector de Variables</h3>
      <p className="text-slate-400 text-center mb-6">
        Tienes este dataLayer. ¿Qué variable necesitas extraer para enviar el ID de transacción a GA4?
      </p>

      {/* Code block */}
      <div className="bg-black rounded-lg p-6 font-mono text-green-400 mb-6">
        <div>dataLayer.push({'{'}</div>
        <div className="ml-4">event: 'purchase',</div>
        <div className="ml-4">transaction_id: 'TXN-12345',</div>
        <div className="ml-4">revenue: 299.99,</div>
        <div className="ml-4">currency: 'EUR'</div>
        <div>{'})'}</div>
      </div>

      {/* Options */}
      <h4 className="font-bold mb-4">Selecciona la variable correcta:</h4>
      <div className="space-y-2">
        {shuffledOptions.map((option, index) => (
          <button
            key={index}
            onClick={() => handleSelect(index, option.correct)}
            disabled={selected !== null}
            className={`w-full text-left p-4 rounded-lg border-2 font-mono transition-all ${
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
          <p className="text-red-400">❌ No es esa. Busca el parámetro que contiene el ID de la transacción.</p>
        </div>
      )}
    </div>
  );
}

