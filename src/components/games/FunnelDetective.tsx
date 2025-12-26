import { useState } from 'react';

interface FunnelStep {
  name: string;
  status: 'ok' | 'broken';
  tool: string;
}

const funnel: FunnelStep[] = [
  { name: 'page_view', status: 'ok', tool: 'GTM Preview' },
  { name: 'add_to_cart', status: 'broken', tool: 'DebugView' },
  { name: 'purchase', status: 'ok', tool: 'Omnibug' },
];

const tools = [
  { id: 'preview', label: '🟡 Usar GTM Preview' },
  { id: 'debugview', label: '🔵 Usar DebugView' },
  { id: 'omnibug', label: '🟢 Usar Omnibug' },
];

export default function FunnelDetective() {
  const [selectedStep, setSelectedStep] = useState<number | null>(null);
  const [result, setResult] = useState<'success' | 'error' | null>(null);
  const [completed, setCompleted] = useState(false);

  const handleToolSelect = (toolId: string) => {
    if (selectedStep === null) {
      alert('Primero selecciona un paso del embudo');
      return;
    }

    // Check if correct step (add_to_cart = index 1) and correct tool (debugview)
    if (selectedStep === 1 && toolId === 'debugview') {
      setResult('success');
      setTimeout(() => setCompleted(true), 1500);
    } else {
      setResult('error');
      setTimeout(() => {
        setResult(null);
        setSelectedStep(null);
      }, 2000);
    }
  };

  if (completed) {
    return (
      <div className="bg-green-500/20 border-2 border-green-500 rounded-xl p-8 text-center">
        <div className="text-4xl mb-4">🏆</div>
        <h3 className="text-xl font-bold text-green-400 mb-2">¡Cazador de errores nivel 1!</h3>
        <p className="text-slate-300 mb-2">Has identificado correctamente que el evento <code className="bg-slate-700 px-2 py-1 rounded">add_to_cart</code> no llega a GA4.</p>
        <p className="text-slate-400 text-sm">El problema: parámetro <code className="bg-slate-700 px-1 rounded">item_id</code> faltante.</p>
      </div>
    );
  }

  return (
    <div className="bg-slate-800/50 rounded-xl p-6">
      <h3 className="text-xl font-bold mb-2 text-center">🔎 Embudo de conversión</h3>
      <p className="text-slate-400 text-center mb-6">
        Uno de estos pasos está roto. <strong>Selecciona el paso</strong> y luego <strong>usa la herramienta correcta</strong> para identificarlo.
      </p>

      {/* Funnel steps */}
      <div className="space-y-3 mb-6">
        {funnel.map((step, index) => (
          <button
            key={index}
            onClick={() => setSelectedStep(index)}
            disabled={result !== null}
            className={`w-full p-4 rounded-lg border-2 text-left transition-all ${
              selectedStep === index
                ? 'border-emerald-400 bg-emerald-500/20 scale-[1.02]'
                : step.status === 'broken'
                ? 'border-red-500/50 hover:border-red-400'
                : 'border-emerald-500/50 hover:border-emerald-400'
            }`}
          >
            <div className="flex items-center justify-between">
              <span className="font-mono font-bold">{step.name}</span>
              <span>{step.status === 'ok' ? '✅' : '❌'}</span>
            </div>
          </button>
        ))}
      </div>

      {/* Tool selection */}
      <h4 className="font-bold mb-3">Selecciona la herramienta:</h4>
      <div className="space-y-2">
        {tools.map(tool => (
          <button
            key={tool.id}
            onClick={() => handleToolSelect(tool.id)}
            disabled={result !== null}
            className="w-full text-left p-4 rounded-lg border-2 border-slate-600 hover:border-slate-400 hover:bg-slate-700/50 transition-all"
          >
            {tool.label}
          </button>
        ))}
      </div>

      {/* Result messages */}
      {result === 'success' && (
        <div className="mt-4 p-4 bg-green-500/20 border-2 border-green-500 rounded-lg text-center">
          <p className="text-green-400">✅ ¡Correcto! Has encontrado el paso roto.</p>
        </div>
      )}
      
      {result === 'error' && (
        <div className="mt-4 p-4 bg-red-500/20 border-2 border-red-500 rounded-lg text-center">
          <p className="text-red-400">❌ No es el paso correcto o la herramienta adecuada.<br/><small>Pista: busca el paso que está ❌ y usa la herramienta que permite ver si llega a GA4.</small></p>
        </div>
      )}
    </div>
  );
}

