// ============================================
// CONTENIDO DEL CURSO - EDITAR AQUÍ
// ============================================

export interface Bloque {
  id: string
  numero: number
  titulo: string
  subtitulo: string
  icono: string
  duracion: string
  descripcion: string
  color: string
}

export const bloques: Bloque[] = [
  {
    id: "seccion-0",
    numero: 0,
    titulo: "¿Qué es GTM?",
    subtitulo: "Y por qué te importa",
    icono: "🎯",
    duracion: "15 min",
    descripcion: "Entiende qué es Google Tag Manager, por qué existe y cómo te da superpoderes como marketer.",
    color: "primary",
  },
  {
    id: "bloque-1",
    numero: 1,
    titulo: "La Torre de Control",
    subtitulo: "Tags, Triggers y Variables",
    icono: "🏗️",
    duracion: "30 min",
    descripcion: "Construye tu primera torre de control con los tres pilares fundamentales de GTM.",
    color: "secondary",
  },
  {
    id: "bloque-2",
    numero: 2,
    titulo: "El Lenguaje Secreto",
    subtitulo: "Eventos y DataLayer",
    icono: "🗣️",
    duracion: "35 min",
    descripcion: "Domina el idioma de los eventos y aprende a estructurar datos como un profesional.",
    color: "accent",
  },
  {
    id: "bloque-3",
    numero: 3,
    titulo: "El Ojo que Todo lo Ve",
    subtitulo: "Validación y QA",
    icono: "👁️",
    duracion: "25 min",
    descripcion: "Conviértete en detective de datos. Aprende a validar implementaciones sin depender de nadie.",
    color: "success",
  },
  {
    id: "demo-live",
    numero: 4,
    titulo: "Demo Live",
    subtitulo: "GTM en Acción",
    icono: "🎬",
    duracion: "45 min",
    descripcion: "Sesión guiada: Meta Pixel, GA4 E-commerce, y Meta CAPI con Server-side.",
    color: "warning",
  },
  {
    id: "bloque-4",
    numero: 5,
    titulo: "Arquitectos del Funnel",
    subtitulo: "Diseño de Medición",
    icono: "📊",
    duracion: "25 min",
    descripcion: "Diseña funnels de medición que realmente cuenten historias de negocio.",
    color: "primary",
  },
  {
    id: "bloque-5",
    numero: 6,
    titulo: "Escuchar al Dato",
    subtitulo: "De Métricas a Decisiones",
    icono: "🎧",
    duracion: "30 min",
    descripcion: "Transforma números en insights accionables. El paso final de novato a estratega.",
    color: "secondary",
  },
  {
    id: "bloque-6",
    numero: 7,
    titulo: "Server-side GTM",
    subtitulo: "El Futuro del Tracking",
    icono: "🔒",
    duracion: "45 min",
    descripcion: "Privacidad, CAPI, y por qué el tracking del futuro vive en el servidor.",
    color: "accent",
  },
]

export const seccion0Content = {
  definicion: {
    titulo: "¿Qué es GTM?",
    descripcion: "Google Tag Manager es una plataforma que centraliza la gestión de etiquetas (tags) y permite controlar cuándo se ejecuta cada una.",
    perspectivas: [
      {
        icono: "🔧",
        titulo: "Técnicamente",
        texto: "Es una plataforma que centraliza la gestión de etiquetas (tags) y permite controlar cuándo se ejecuta cada una.",
      },
      {
        icono: "💼",
        titulo: "Comercialmente",
        texto: "Es el intermediario entre tu web y las plataformas de marketing (GA4, Meta, Google Ads, etc.)",
      },
      {
        icono: "⚡",
        titulo: "Operacionalmente",
        texto: "Es lo que te permite lanzar campañas sin bloquear a desarrollo en cada cambio.",
      },
    ],
  },
  problema: {
    titulo: "El problema que resuelve",
    antes: {
      titulo: "Antes de GTM",
      puntos: [
        "Cada tag = ticket a desarrollo",
        "Semanas de espera por cambios simples",
        "Marketing bloqueado por ciclos de release",
        "Código duplicado y conflictos",
      ],
    },
    despues: {
      titulo: "Con GTM",
      puntos: [
        "Marketing autónomo para tags",
        "Cambios en minutos, no semanas",
        "Preview antes de publicar",
        "Historial de versiones completo",
      ],
    },
  },
  impacto: {
    titulo: "Por qué importa para el negocio",
    metricas: [
      { valor: "85%", descripcion: "reducción en tiempo de implementación" },
      { valor: "0", descripcion: "tickets a desarrollo para cambios de tags" },
      { valor: "∞", descripcion: "autonomía para marketing" },
    ],
  },
}

export const bloque1Content = {
  pilares: [
    {
      icono: "🏷️",
      nombre: "Tags",
      definicion: "Scripts que se activan para enviar información a herramientas como GA4, Meta Pixel, LinkedIn...",
      analogia: "Son los mensajeros. Llevan paquetes de información a su destino.",
      ejemplos: ["Google Analytics 4", "Meta Pixel", "Google Ads Conversion", "LinkedIn Insight Tag"],
    },
    {
      icono: "🎯",
      nombre: "Triggers",
      definicion: "Condiciones que determinan CUÁNDO se activa un tag.",
      analogia: "Son los semáforos. Dicen cuándo puede pasar el mensajero.",
      ejemplos: ["Page View", "Click en elemento", "Form Submit", "Custom Event"],
    },
    {
      icono: "📦",
      nombre: "Variables",
      definicion: "Contenedores de información que puedes reutilizar.",
      analogia: "Son las cajas etiquetadas. Guardan datos para usar en cualquier momento.",
      ejemplos: ["Page URL", "Click Text", "Data Layer Variable", "Custom JavaScript"],
    },
  ],
  ecosistema: [
    {
      icono: "🌐",
      titulo: "Web",
      descripcion: "Donde ocurren interacciones: clicks, scrolls, formularios, compras.",
    },
    {
      icono: "🖥️",
      titulo: "Servidor",
      descripcion: "Transformas datos, aplicas consent mode, envías server-side.",
    },
    {
      icono: "📊",
      titulo: "Plataformas",
      descripcion: "Analytics, ads, heatmaps… reciben la historia que GTM traduce.",
    },
  ],
}

