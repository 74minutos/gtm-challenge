import { useState } from 'react';

interface Step {
  title: string;
  options: { text: string; icon?: string; correct: boolean }[];
}

const steps: Step[] = [
  {
    title: 'Paso 1: Tipo de trigger',
    options: [
      { text: 'Custom Event', icon: '🟢', correct: true },
      { text: 'All Elements Click', icon: '🟡', correct: false },
      { text: 'Page View', icon: '🔵', correct: false },
    ],
  },
  {
    title: 'Paso 2: Nombre del evento',
    options: [
      { text: 'add_to_cart', correct: true },
      { text: 'click_button', correct: false },
      { text: 'purchase', correct: false },
    ],
  },
  {
    title: 'Paso 3: Condición adicional',
    options: [
      { text: 'price > 50', correct: true },
      { text: 'price == 50', correct: false },
      { text: 'product_id != null', correct: false },
    ],
  },
];

export default function TriggerQuiz() {
  const [currentStep, setCurrentStep] = useState(0);
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);
  const [selectedWrong, setSelectedWrong] = useState<number | null>(null);
  const [completed, setCompleted] = useState(false);

  const handleSelect = (optionIndex: number, isCorrect: boolean) => {
    if (isCorrect) {
      setCompletedSteps([...completedSteps, currentStep]);
      
      if (currentStep < steps.length - 1) {
        setTimeout(() => {
          setCurrentStep(currentStep + 1);
          setSelectedWrong(null);
        }, 500);
      } else {
        setCompleted(true);
      }
    } else {
      setSelectedWrong(optionIndex);
      setTimeout(() => setSelectedWrong(null), 1000);
    }
  };

  if (completed) {
    return (
      <div className="bg-green-500/20 border-2 border-green-500 rounded-xl p-8 text-center">
        <div className="text-4xl mb-4">🎯</div>
        <h3 className="text-xl font-bold text-green-400 mb-2">¡Trigger configurado perfectamente!</h3>
        <p className="text-slate-300">GTM solo disparará cuando sea "add_to_cart" con precio {'>'} 50€</p>
      </div>
    );
  }

  return (
    <div className="bg-slate-800/50 rounded-xl p-6">
      <h3 className="text-xl font-bold mb-2 text-center">🎯 Configurador de Triggers</h3>
      <p className="text-slate-400 text-center mb-6">
        Situación: Quieres disparar una etiqueta cuando alguien añade un producto al carrito <strong className="text-white">y el precio es mayor a 50€</strong>
      </p>

      {/* Progress indicators */}
      <div className="flex justify-center gap-2 mb-6">
        {steps.map((_, index) => (
          <div
            key={index}
            className={`w-3 h-3 rounded-full transition-colors ${
              completedSteps.includes(index)
                ? 'bg-green-500'
                : index === currentStep
                ? 'bg-emerald-400'
                : 'bg-slate-600'
            }`}
          />
        ))}
      </div>

      {/* Current step */}
      <div className="bg-emerald-500/10 p-6 rounded-xl">
        <h4 className="font-bold mb-4">{steps[currentStep].title}</h4>
        <div className="space-y-2">
          {steps[currentStep].options.map((option, index) => (
            <button
              key={index}
              onClick={() => handleSelect(index, option.correct)}
              disabled={completedSteps.includes(currentStep)}
              className={`w-full text-left p-4 rounded-lg border-2 transition-all ${
                completedSteps.includes(currentStep) && option.correct
                  ? 'border-green-500 bg-green-500/20'
                  : selectedWrong === index
                  ? 'border-red-500 bg-red-500/20 animate-shake'
                  : 'border-slate-600 hover:border-emerald-400 hover:bg-slate-700/50'
              }`}
            >
              {option.icon && <span className="mr-2">{option.icon}</span>}
              {option.text}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

