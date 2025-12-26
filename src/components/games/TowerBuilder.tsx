import { useState } from 'react'

interface Block {
  id: string
  type: 'tag' | 'trigger' | 'variable'
  name: string
  placed: boolean
}

const initialBlocks: Block[] = [
  { id: '1', type: 'variable', name: 'Page URL', placed: false },
  { id: '2', type: 'trigger', name: 'Page View', placed: false },
  { id: '3', type: 'tag', name: 'GA4 Config', placed: false },
]

const correctOrder = ['variable', 'trigger', 'tag']

export default function TowerBuilder() {
  const [blocks, setBlocks] = useState<Block[]>(initialBlocks)
  const [tower, setTower] = useState<Block[]>([])
  const [message, setMessage] = useState<string>('')
  const [completed, setCompleted] = useState(false)

  const handleDragStart = (e: React.DragEvent, block: Block) => {
    e.dataTransfer.setData('blockId', block.id)
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    const blockId = e.dataTransfer.getData('blockId')
    const block = blocks.find(b => b.id === blockId)
    
    if (block && !block.placed) {
      const expectedType = correctOrder[tower.length]
      
      if (block.type === expectedType) {
        setTower([...tower, block])
        setBlocks(blocks.map(b => b.id === blockId ? { ...b, placed: true } : b))
        setMessage('✅ ¡Correcto!')
        
        if (tower.length === 2) {
          setCompleted(true)
          setMessage('🎉 ¡Torre completada! Has construido tu primera estructura GTM.')
        }
      } else {
        setMessage(`❌ Ese no es el orden correcto. Piensa: ¿qué necesita existir primero?`)
      }
    }
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
  }

  const reset = () => {
    setBlocks(initialBlocks)
    setTower([])
    setMessage('')
    setCompleted(false)
  }

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'tag': return 'bg-blue-100 border-blue-300 text-blue-700'
      case 'trigger': return 'bg-amber-100 border-amber-300 text-amber-700'
      case 'variable': return 'bg-emerald-100 border-emerald-300 text-emerald-700'
      default: return 'bg-gray-100'
    }
  }

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'tag': return '🏷️'
      case 'trigger': return '🎯'
      case 'variable': return '📦'
      default: return '❓'
    }
  }

  return (
    <div className="bg-white rounded-2xl border border-gray-200 p-6">
      <h3 className="text-xl font-semibold mb-2">🏗️ Construye la torre</h3>
      <p className="text-gray-600 text-sm mb-6">
        Arrastra los bloques en el orden correcto. Pista: piensa en qué depende de qué.
      </p>

      <div className="grid md:grid-cols-2 gap-8">
        {/* Bloques disponibles */}
        <div>
          <p className="text-sm font-medium text-gray-500 mb-3">Bloques disponibles:</p>
          <div className="space-y-3">
            {blocks.filter(b => !b.placed).map((block) => (
              <div
                key={block.id}
                draggable
                onDragStart={(e) => handleDragStart(e, block)}
                className={`p-4 rounded-lg border-2 cursor-grab active:cursor-grabbing transition-all hover:shadow-md ${getTypeColor(block.type)}`}
              >
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{getTypeIcon(block.type)}</span>
                  <div>
                    <p className="font-medium">{block.name}</p>
                    <p className="text-xs opacity-70 capitalize">{block.type}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Zona de construcción */}
        <div>
          <p className="text-sm font-medium text-gray-500 mb-3">Tu torre:</p>
          <div
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            className="min-h-[200px] border-2 border-dashed border-gray-300 rounded-lg p-4 bg-gray-50 flex flex-col-reverse gap-2"
          >
            {tower.length === 0 && (
              <p className="text-gray-400 text-sm text-center m-auto">
                Arrastra bloques aquí
              </p>
            )}
            {tower.map((block, index) => (
              <div
                key={block.id}
                className={`p-3 rounded-lg border-2 ${getTypeColor(block.type)}`}
                style={{ marginLeft: `${index * 8}px` }}
              >
                <div className="flex items-center gap-2">
                  <span>{getTypeIcon(block.type)}</span>
                  <span className="font-medium text-sm">{block.name}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Mensaje */}
      {message && (
        <div className={`mt-6 p-4 rounded-lg text-center ${
          completed ? 'bg-green-100 text-green-700' : 
          message.includes('❌') ? 'bg-red-100 text-red-700' : 
          'bg-blue-100 text-blue-700'
        }`}>
          {message}
        </div>
      )}

      {/* Botón reset */}
      {(tower.length > 0 || message) && (
        <button
          onClick={reset}
          className="mt-4 text-sm text-gray-500 hover:text-gray-700 underline"
        >
          Reiniciar
        </button>
      )}
    </div>
  )
}

