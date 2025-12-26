import { useState } from 'react';

interface Event {
  name: string;
  icon: string;
  correctTools: string[];
}

const events: Event[] = [
  { name: 'page_view', icon: '📄', correctTools: ['preview', 'debugview', 'omnibug'] },
  { name: 'add_to_cart', icon: '🛒', correctTools: ['preview', 'debugview', 'omnibug'] },
  { name: 'purchase', icon: '💳', correctTools: ['preview', 'debugview', 'omnibug'] },
];

const tools = [
  { id: 'preview', label: '🟡 Preview Mode GTM' },
  { id: 'debugview', label: '🔵 GA4 DebugView' },
  { id: 'omnibug', label: '🟢 Omnibug / Tag Assistant' },
  { id: 'nothing', label: '🔴 Nada (fe ciega 😅)' },
];

export default function QAToolSelector() {
  const [currentEventIndex, setCurrentEventIndex] = useState(0);
  const [selectedTools, setSelectedTools] = useState<string[]>([]);
  const [result, setResult] = useState<'success' | 'error' | null>(null);
  const [completed, setCompleted] = useState(false);

  const currentEvent = events[currentEventIndex];

  const toggleTool = (toolId: string) => {
    if (selectedTools.includes(toolId)) {
      setSelectedTools(prev => prev.filter(t => t !== toolId));
    } else {
      setSelectedTools(prev => [...prev, toolId]);
    }
  };

  const handleVerify = () => {
    // Check if "nothing" was selected
    if (selectedTools.includes('nothing')) {
      setResult('error');
      setTimeout(() => {
        setSelectedTools([]);
        setResult(null);
      }, 2000);
      return;
    }

    // Check if all correct tools were selected (and no extras)
    const allCorrect = currentEvent.correctTools.every(tool => selectedTools.includes(tool));
    const noExtras = selectedTools.every(tool => currentEvent.correctTools.includes(tool));

    if (allCorrect && noExtras) {
      setResult('success');
      
      setTimeout(() => {
        if (currentEventIndex < events.length - 1) {
          setCurrentEventIndex(prev => prev + 1);
          setSelectedTools([]);
          setResult(null);
        } else {
          setCompleted(true);
        }
      }, 1500);
    } else {
      setResult('error');
      setTimeout(() => {
        setSelectedTools([]);
        setResult(null);
      }, 2000);
    }
  };

  if (completed) {
    return (
      <div className="bg-green-500/20 border-2 border-green-500 rounded-xl p-8 text-center">
        <div className="text-4xl mb-4">🏆</div>
        <h3 className="text-xl font-bold text-green-400 mb-2">¡Radar desbloqueado!</h3>
        <p className="text-slate-300">Has aprendido a verificar eventos con las herramientas correctas.</p>
      </div>
    );
  }

  return (
    <div className="bg-slate-800/50 rounded-xl p-6">
      <h3 className="text-xl font-bold mb-2 text-center">
        🎯 Evento {currentEventIndex + 1}/{events.length}: {currentEvent.icon} {currentEvent.name}
      </h3>
      <p className="text-slate-400 text-center mb-6">
        <strong>Selecciona TODAS las herramientas</strong> que te permiten verificar si este evento existe.
        <br/><small>(Puedes seleccionar múltiples opciones)</small>
      </p>

      {/* Progress */}
      <div className="flex justify-center gap-2 mb-6">
        {events.map((_, index) => (
          <div
            key={index}
            className={`w-3 h-3 rounded-full transition-colors ${
              index < currentEventIndex
                ? 'bg-green-500'
                : index === currentEventIndex
                ? 'bg-emerald-400'
                : 'bg-slate-600'
            }`}
          />
        ))}
      </div>

      {/* Tool options */}
      <div className="space-y-2 mb-6">
        {tools.map(tool => (
          <button
            key={tool.id}
            onClick={() => toggleTool(tool.id)}
            disabled={result !== null}
            className={`w-full text-left p-4 rounded-lg border-2 transition-all ${
              selectedTools.includes(tool.id)
                ? 'border-emerald-400 bg-emerald-500/20'
                : 'border-slate-600 hover:border-slate-400 hover:bg-slate-700/50'
            }`}
          >
            {tool.label}
          </button>
        ))}
      </div>

      {/* Verify button */}
      <button
        onClick={handleVerify}
        disabled={selectedTools.length === 0 || result !== null}
        className={`w-full py-4 rounded-lg font-bold transition-all ${
          selectedTools.length > 0 && result === null
            ? 'bg-emerald-500 hover:bg-emerald-600 text-white'
            : 'bg-slate-700 text-slate-400 cursor-not-allowed'
        }`}
      >
        Verificar selección →
      </button>

      {/* Result messages */}
      {result === 'success' && (
        <div className="mt-4 p-4 bg-green-500/20 border-2 border-green-500 rounded-lg text-center">
          <p className="text-green-400">✅ ¡Evento iluminado! Has verificado correctamente.</p>
        </div>
      )}
      
      {result === 'error' && (
        <div className="mt-4 p-4 bg-red-500/20 border-2 border-red-500 rounded-lg text-center">
          <p className="text-red-400">
            {selectedTools.includes('nothing') 
              ? '❌ Pantalla en negro. La fe ciega no es una estrategia de QA.'
              : '❌ No del todo. Te faltan herramientas o has seleccionado alguna incorrecta.'}
          </p>
        </div>
      )}
    </div>
  );
}

