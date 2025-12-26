import { useState } from 'react';

interface CodeError {
  id: number;
  found: boolean;
  hint: string;
  explanation: string;
}

export default function BossFightBloque2() {
  const [errors, setErrors] = useState<CodeError[]>([
    { id: 1, found: false, hint: 'purchse', explanation: 'Typo! Debería ser "purchase"' },
    { id: 2, found: false, hint: 'transaction_id duplicado', explanation: 'Borra esta línea duplicada' },
    { id: 3, found: false, hint: 'revenue > 100', explanation: 'Debería ser ">=" para incluir 100' },
  ]);
  
  const foundCount = errors.filter(e => e.found).length;
  const completed = foundCount === 3;

  const handleClick = (errorId: number) => {
    setErrors(prev => prev.map(e => 
      e.id === errorId ? { ...e, found: true } : e
    ));
  };

  if (completed) {
    return (
      <div className="bg-green-500/20 border-2 border-green-500 rounded-xl p-8">
        <div className="text-4xl mb-4 text-center">🏅</div>
        <h3 className="text-xl font-bold text-green-400 mb-4 text-center">¡Has domado el lenguaje secreto de los eventos!</h3>
        
        <div className="bg-slate-800/50 rounded-lg p-4">
          <h4 className="font-bold mb-3">Errores encontrados:</h4>
          <ul className="space-y-2 text-slate-300">
            <li>✅ Typo en "purchse" (debería ser "purchase")</li>
            <li>✅ transaction_id duplicado</li>
            <li>✅ Condición incorrecta ({'>'} debería ser {'>='})</li>
          </ul>
        </div>
        
        <p className="text-center mt-6 text-emerald-400 font-bold">🎓 Has completado el Boss Fight</p>
      </div>
    );
  }

  return (
    <div className="bg-slate-800/50 rounded-xl p-6">
      <h3 className="text-xl font-bold mb-2 text-center">👻 Boss Fight: El Evento Fantasma</h3>
      <p className="text-slate-400 text-center mb-6">
        Encuentra los 3 errores en esta implementación. <strong className="text-amber-400">Haz clic en las líneas sospechosas.</strong>
      </p>

      {/* Progress */}
      <div className="text-center mb-4">
        <span className="inline-block px-4 py-2 bg-amber-500/20 border-2 border-amber-500 rounded-lg">
          <strong className="text-amber-400">Errores: {foundCount}/3</strong>
        </span>
      </div>

      {/* Code block */}
      <div className="bg-black rounded-lg p-6 font-mono text-green-400 text-sm overflow-x-auto">
        <div className="mb-4">dataLayer.push({'{'}</div>
        
        {/* Error 1: Typo in event name */}
        <div 
          onClick={() => handleClick(1)}
          className={`ml-4 py-1 px-2 -mx-2 rounded cursor-pointer transition-colors ${
            errors[0].found 
              ? 'bg-green-500/30' 
              : 'hover:bg-amber-500/20'
          }`}
        >
          event: '<span className={errors[0].found ? 'bg-green-500 text-black px-1 rounded' : ''}>purchse</span>',
          {errors[0].found && <span className="text-green-400 ml-2">// ❌ {errors[0].explanation}</span>}
        </div>
        
        <div className="ml-4">transaction_id: 'TXN-001',</div>
        
        {/* Error 2: Duplicate transaction_id */}
        <div 
          onClick={() => handleClick(2)}
          className={`ml-4 py-1 px-2 -mx-2 rounded cursor-pointer transition-colors ${
            errors[1].found 
              ? 'bg-green-500/30' 
              : 'hover:bg-amber-500/20'
          }`}
        >
          <span className={errors[1].found ? 'bg-green-500 text-black px-1 rounded' : ''}>transaction_id: 'TXN-002'</span>,
          {errors[1].found && <span className="text-green-400 ml-2">// ❌ {errors[1].explanation}</span>}
        </div>
        
        <div className="ml-4">revenue: 299.99</div>
        <div className="mb-4">{'})'}</div>
        
        <div className="text-gray-500 mt-4">// Trigger configurado:</div>
        <div className="text-gray-500">// Event: purchase</div>
        
        {/* Error 3: Condition */}
        <div 
          onClick={() => handleClick(3)}
          className={`py-1 px-2 -mx-2 rounded cursor-pointer transition-colors text-gray-500 ${
            errors[2].found 
              ? 'bg-amber-500/30' 
              : 'hover:bg-amber-500/20'
          }`}
        >
          // Condition: revenue <span className={errors[2].found ? 'bg-amber-500 text-black px-1 rounded' : ''}>{'>'}</span> 100
          {errors[2].found && <span className="text-amber-400 ml-2">// ⚠️ {errors[2].explanation}</span>}
        </div>
      </div>

      {/* Hints */}
      {foundCount < 3 && (
        <div className="mt-4 text-center text-slate-500 text-sm">
          💡 Pista: Busca typos, duplicados y condiciones incorrectas
        </div>
      )}
    </div>
  );
}

