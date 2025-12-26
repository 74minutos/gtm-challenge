import { useState } from 'react';

interface Scenario {
  insight: string;
  context: string;
  options: { text: string; actionable: boolean; explanation: string }[];
}

const scenarios: Scenario[] = [
  {
    insight: 'El 70% de los usuarios abandonan el checkout en el paso de pago.',
    context: 'E-commerce de moda con ticket medio de €80.',
    options: [
      { 
        text: 'Añadir más métodos de pago (PayPal, Klarna)', 
        actionable: true, 
        explanation: '¡Correcto! Una acción concreta que puede reducir la fricción en el paso de pago.' 
      },
      { 
        text: 'Hacer más marketing', 
        actionable: false, 
        explanation: 'No es accionable. "Más marketing" no soluciona el problema de checkout.' 
      },
      { 
        text: 'Esperar a ver si mejora solo', 
        actionable: false, 
        explanation: 'Los problemas de UX no se arreglan solos.' 
      },
    ],
  },
  {
    insight: 'Los usuarios de móvil convierten 3x menos que los de desktop.',
    context: 'SaaS B2B con formulario de demo.',
    options: [
      { 
        text: 'Simplificar el formulario en móvil (menos campos)', 
        actionable: true, 
        explanation: '¡Correcto! Reducir fricción en móvil es una acción directa basada en el dato.' 
      },
      { 
        text: 'Dejar de invertir en mobile', 
        actionable: false, 
        explanation: 'Eliminar un canal no es la solución; optimizarlo sí.' 
      },
      { 
        text: 'Analizar más datos', 
        actionable: false, 
        explanation: 'Análisis paralítico. Ya tienes un insight claro para actuar.' 
      },
    ],
  },
];

export default function InsightToAction() {
  const [currentScenario, setCurrentScenario] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [completed, setCompleted] = useState(false);

  const scenario = scenarios[currentScenario];

  const handleSelect = (index: number) => {
    setSelected(index);
    setShowExplanation(true);
  };

  const handleNext = () => {
    if (currentScenario < scenarios.length - 1) {
      setCurrentScenario(prev => prev + 1);
      setSelected(null);
      setShowExplanation(false);
    } else {
      setCompleted(true);
    }
  };

  if (completed) {
    return (
      <div className="bg-green-500/20 border-2 border-green-500 rounded-xl p-8 text-center">
        <div className="text-4xl mb-4">💡</div>
        <h3 className="text-xl font-bold text-green-400 mb-2">¡Pensamiento estratégico desbloqueado!</h3>
        <p className="text-slate-300">Ya sabes distinguir entre datos que informan y datos que transforman.</p>
      </div>
    );
  }

  return (
    <div className="bg-slate-800/50 rounded-xl p-6">
      <h3 className="text-xl font-bold mb-2 text-center">💡 Del dato a la acción</h3>
      <p className="text-slate-400 text-center mb-2">Escenario {currentScenario + 1}/{scenarios.length}</p>

      {/* Progress */}
      <div className="flex justify-center gap-2 mb-6">
        {scenarios.map((_, index) => (
          <div
            key={index}
            className={`w-3 h-3 rounded-full transition-colors ${
              index < currentScenario
                ? 'bg-green-500'
                : index === currentScenario
                ? 'bg-emerald-400'
                : 'bg-slate-600'
            }`}
          />
        ))}
      </div>

      {/* Scenario */}
      <div className="bg-slate-700/50 p-4 rounded-lg mb-6">
        <p className="text-lg font-bold text-amber-400 mb-2">📊 Insight:</p>
        <p className="text-slate-200 mb-4">{scenario.insight}</p>
        <p className="text-sm text-slate-400"><strong>Contexto:</strong> {scenario.context}</p>
      </div>

      {/* Options */}
      <h4 className="font-bold mb-4">¿Qué acción es más apropiada?</h4>
      <div className="space-y-2">
        {scenario.options.map((option, index) => (
          <button
            key={index}
            onClick={() => handleSelect(index)}
            disabled={showExplanation}
            className={`w-full text-left p-4 rounded-lg border-2 transition-all ${
              selected === index
                ? option.actionable
                  ? 'border-green-500 bg-green-500/20'
                  : 'border-red-500 bg-red-500/20'
                : 'border-slate-600 hover:border-slate-400 hover:bg-slate-700/50'
            }`}
          >
            {option.text}
          </button>
        ))}
      </div>

      {/* Explanation */}
      {showExplanation && selected !== null && (
        <div className={`mt-4 p-4 rounded-lg border-2 ${
          scenario.options[selected].actionable
            ? 'bg-green-500/20 border-green-500'
            : 'bg-amber-500/20 border-amber-500'
        }`}>
          <p className={scenario.options[selected].actionable ? 'text-green-400' : 'text-amber-400'}>
            {scenario.options[selected].actionable ? '✅' : '⚠️'} {scenario.options[selected].explanation}
          </p>
          <button
            onClick={handleNext}
            className="mt-4 px-6 py-2 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600 transition-colors"
          >
            {currentScenario < scenarios.length - 1 ? 'Siguiente escenario →' : 'Completar →'}
          </button>
        </div>
      )}
    </div>
  );
}

