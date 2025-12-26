import { useState } from 'react';

interface Question {
  scenario: string;
  data: { channel: string; conversions: number; revenue: number }[];
  question: string;
  options: { text: string; correct: boolean }[];
}

const questions: Question[] = [
  {
    scenario: 'Una campaña de e-commerce tiene estos datos de atribución:',
    data: [
      { channel: 'Organic Search', conversions: 150, revenue: 15000 },
      { channel: 'Paid Search', conversions: 80, revenue: 12000 },
      { channel: 'Social', conversions: 200, revenue: 5000 },
    ],
    question: '¿Qué canal tiene el mejor valor por conversión?',
    options: [
      { text: 'Organic Search (€100/conv)', correct: false },
      { text: 'Paid Search (€150/conv)', correct: true },
      { text: 'Social (€25/conv)', correct: false },
    ],
  },
];

export default function AttributionQuiz() {
  const [currentQuestion] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [result, setResult] = useState<'success' | 'error' | null>(null);
  const [completed, setCompleted] = useState(false);

  const q = questions[currentQuestion];

  const handleSelect = (index: number, isCorrect: boolean) => {
    setSelected(index);
    
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
    return (
      <div className="bg-green-500/20 border-2 border-green-500 rounded-xl p-8 text-center">
        <div className="text-4xl mb-4">📊</div>
        <h3 className="text-xl font-bold text-green-400 mb-2">¡Análisis correcto!</h3>
        <p className="text-slate-300">Paid Search tiene el mejor valor por conversión (€150), aunque Social tiene más volumen.</p>
        <p className="text-slate-400 text-sm mt-2">Este es el tipo de insight que diferencia a un marketer de datos de uno que solo ve números.</p>
      </div>
    );
  }

  return (
    <div className="bg-slate-800/50 rounded-xl p-6">
      <h3 className="text-xl font-bold mb-2 text-center">📊 Análisis de Atribución</h3>
      <p className="text-slate-400 text-center mb-6">{q.scenario}</p>

      {/* Data table */}
      <div className="overflow-x-auto mb-6">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-slate-600">
              <th className="text-left py-2 px-4">Canal</th>
              <th className="text-right py-2 px-4">Conversiones</th>
              <th className="text-right py-2 px-4">Revenue</th>
            </tr>
          </thead>
          <tbody>
            {q.data.map((row, index) => (
              <tr key={index} className="border-b border-slate-700">
                <td className="py-2 px-4">{row.channel}</td>
                <td className="text-right py-2 px-4">{row.conversions}</td>
                <td className="text-right py-2 px-4">€{row.revenue.toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Question */}
      <h4 className="font-bold mb-4">{q.question}</h4>
      
      <div className="space-y-2">
        {q.options.map((option, index) => (
          <button
            key={index}
            onClick={() => handleSelect(index, option.correct)}
            disabled={selected !== null}
            className={`w-full text-left p-4 rounded-lg border-2 transition-all ${
              selected === index && result === 'success'
                ? 'border-green-500 bg-green-500/20'
                : selected === index && result === 'error'
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
          <p className="text-red-400">❌ No es correcto. Calcula: Revenue / Conversiones para cada canal.</p>
        </div>
      )}
    </div>
  );
}

