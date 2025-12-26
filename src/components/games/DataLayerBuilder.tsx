import { useState } from 'react';

interface DragItem {
  id: string;
  label: string;
}

const correctOrder = ['event', 'product_id', 'price', 'currency'];

const initialItems: DragItem[] = [
  { id: 'event', label: "event: 'add_to_cart'" },
  { id: 'product_id', label: "product_id: 'XYZ789'" },
  { id: 'price', label: 'price: 99.99' },
  { id: 'currency', label: "currency: 'EUR'" },
];

function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

export default function DataLayerBuilder() {
  const [availableItems, setAvailableItems] = useState(() => shuffleArray(initialItems));
  const [slots, setSlots] = useState<(DragItem | null)[]>([null, null, null, null]);
  const [draggedItem, setDraggedItem] = useState<DragItem | null>(null);
  const [result, setResult] = useState<'success' | 'error' | null>(null);
  const [completed, setCompleted] = useState(false);

  const handleDragStart = (item: DragItem) => {
    setDraggedItem(item);
  };

  const handleDrop = (slotIndex: number) => {
    if (!draggedItem || slots[slotIndex]) return;

    // Remove from available items
    setAvailableItems(prev => prev.filter(item => item.id !== draggedItem.id));
    
    // Add to slot
    const newSlots = [...slots];
    newSlots[slotIndex] = draggedItem;
    setSlots(newSlots);
    setDraggedItem(null);

    // Check if complete
    const filledSlots = newSlots.filter(Boolean);
    if (filledSlots.length === 4) {
      const userOrder = newSlots.map(item => item?.id);
      const isCorrect = JSON.stringify(userOrder) === JSON.stringify(correctOrder);
      
      if (isCorrect) {
        setResult('success');
        setCompleted(true);
      } else {
        setResult('error');
        // Reset after delay
        setTimeout(() => {
          setSlots([null, null, null, null]);
          setAvailableItems(shuffleArray(initialItems));
          setResult(null);
        }, 2000);
      }
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  if (completed) {
    return (
      <div className="bg-green-500/20 border-2 border-green-500 rounded-xl p-8 text-center">
        <div className="text-4xl mb-4">✅</div>
        <h3 className="text-xl font-bold text-green-400 mb-2">¡Mensaje traducido correctamente!</h3>
        <p className="text-slate-300">El evento está listo para ser escuchado por GTM.</p>
      </div>
    );
  }

  return (
    <div className="bg-slate-800/50 rounded-xl p-6">
      <h3 className="text-xl font-bold mb-2 text-center">🧩 Construye el dataLayer.push</h3>
      <p className="text-slate-400 text-center mb-6">Arrastra los componentes en el orden correcto para formar un evento válido.</p>
      
      {/* Draggable items */}
      <div className="flex flex-wrap gap-2 justify-center mb-6">
        {availableItems.map(item => (
          <div
            key={item.id}
            draggable
            onDragStart={() => handleDragStart(item)}
            className="px-4 py-2 bg-emerald-500/20 border-2 border-emerald-500 rounded-lg cursor-move hover:bg-emerald-500/30 transition-colors font-mono text-sm"
          >
            {item.label}
          </div>
        ))}
      </div>

      {/* Code block with drop zones */}
      <div className="bg-black rounded-lg p-6 font-mono text-green-400">
        <div className="mb-2">dataLayer.push({'{'}</div>
        
        {slots.map((slot, index) => (
          <div
            key={index}
            onDragOver={handleDragOver}
            onDrop={() => handleDrop(index)}
            className={`ml-4 my-2 p-3 border-2 border-dashed rounded min-h-[40px] transition-colors ${
              slot 
                ? 'border-green-500 bg-green-500/10' 
                : 'border-green-500/50 hover:border-green-400 hover:bg-green-500/5'
            }`}
          >
            {slot ? (
              <span>{slot.label},</span>
            ) : (
              <span className="text-gray-600">// {index + 1}. Arrastra aquí</span>
            )}
          </div>
        ))}
        
        <div>{'})'}</div>
      </div>

      {/* Result message */}
      {result === 'error' && (
        <div className="mt-4 p-4 bg-red-500/20 border-2 border-red-500 rounded-lg text-center">
          <p className="text-red-400">❌ El orden no es correcto. Recuerda: primero 'event', luego los parámetros.</p>
        </div>
      )}
    </div>
  );
}

