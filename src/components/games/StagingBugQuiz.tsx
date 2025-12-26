import { useState } from 'react';

const options = [
  { id: 'dom', text: 'Cambio en el DOM', correct: false },
  { id: 'container', text: 'Container ID diferente', correct: true },
  { id: 'blocking', text: 'Adblocker activo', correct: false },
  { id: 'version', text: 'Versión antigua publicada', correct: true },
];

export default function StagingBugQuiz() {
  const [selected, setSelected] = useState<string | null>(null);
  const [result, setResult] = useState<'success' | 'error' | null>(null);
  const [completed, setCompleted] = useState(false);

  const handleSelect = (optionId: string, isCorrect: boolean) => {
    setSelected(optionId);
    
    if (isCorrect) {
      setResult('success');
      setTimeout(() => setCompleted(true), 1500);
    } else {
      setResult('error');
      setTimeout(() => {
        setSelected(null);
        setResult(null);
      }, 2000);
    }
  };

  if (completed) {
    const selectedOption = options.find(o => o.id === selected);
    return (
      <div className="bg-green-500/20 border-2 border-green-500 rounded-xl p-8 text-center">
        <div className="text-4xl mb-4">✅</div>
        <h3 className="text-xl font-bold text-green-400 mb-2">¡Has salvado una campaña millonaria!</h3>
        <p className="text-slate-300 mb-2">
          Causa detectada: {selected === 'container' 
            ? 'El container ID en producción es diferente al de staging' 
            : 'Se publicó una versión antigua del container'}.
        </p>
        <p className="text-slate-400 text-sm">Solución: verificar el snippet y/o publicar la versión correcta.</p>
      </div>
    );
  }

  return (
    <div className="bg-slate-800/50 rounded-xl p-6">
      <h3 className="text-xl font-bold mb-2 text-center">🐛 Diagnóstico</h3>
      <p className="text-slate-400 text-center mb-6">
        El evento funciona en staging pero no en producción. ¿Cuál es la causa más probable?
      </p>

      {/* Options */}
      <div className="space-y-2">
        {options.map(option => (
          <button
            key={option.id}
            onClick={() => handleSelect(option.id, option.correct)}
            disabled={selected !== null}
            className={`w-full text-left p-4 rounded-lg border-2 transition-all ${
              selected === option.id && result === 'success'
                ? 'border-green-500 bg-green-500/20'
                : selected === option.id && result === 'error'
                ? 'border-red-500 bg-red-500/20'
                : 'border-slate-600 hover:border-slate-400 hover:bg-slate-700/50'
            }`}
          >
            {option.text}
          </button>
        ))}
      </div>

      {/* Error message */}
      {result === 'error' && (
        <div className="mt-4 p-4 bg-red-500/20 border-2 border-red-500 rounded-lg text-center">
          <p className="text-red-400">❌ No es la causa principal.<br/><small>Pista: el problema está en la configuración del container, no en el entorno del usuario.</small></p>
        </div>
      )}
    </div>
  );
}

