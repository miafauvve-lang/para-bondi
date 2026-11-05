// Los obstáculos de la vereda porteña, todos con el mismo trazo del mockup
import { AZUL_OSCURO, CELESTE } from "./colores"

const trazo = { stroke: AZUL_OSCURO, strokeWidth: 3, strokeLinejoin: "round", strokeLinecap: "round" }

// Baldosa floja que salpica agua
function Baldosa() {
  return (
    <>
      <g className="salpicon" fill={CELESTE} stroke={AZUL_OSCURO} strokeWidth="1.5">
        <path d="M22 38 Q18 22 26 12 Q27 26 30 36 Z" />
        <path d="M36 34 Q36 16 44 8 Q42 24 40 34 Z" />
        <path d="M48 38 Q54 24 62 20 Q56 30 52 40 Z" />
      </g>
      <path d="M10 52 L50 38 L64 50 L22 64 Z" fill="#B5523B" {...trazo} />
      <path d="M20 49 L57 44 M16 56 L43 42 M32 60 L50 39" stroke="#8C3A28" strokeWidth="2" />
      <path d="M6 64 Q30 70 66 60" fill="none" stroke="#6A7B88" strokeWidth="3" />
    </>
  )
}

// Perro callejero que viene caminando hacia la corredora
function Perro() {
  return (
    <>
      <path className="cola" d="M54 36 Q64 26 62 18" fill="none" stroke={AZUL_OSCURO} strokeWidth="7" strokeLinecap="round" />
      <path className="cola" d="M54 36 Q64 26 62 18" fill="none" stroke="#C98A4B" strokeWidth="3.5" strokeLinecap="round" />
      <path d="M20 52 V64 M28 54 V64 M44 54 V64 M52 52 V64" stroke={AZUL_OSCURO} strokeWidth="7" strokeLinecap="round" />
      <path d="M20 52 V64 M28 54 V64 M44 54 V64 M52 52 V64" stroke="#C98A4B" strokeWidth="3.5" strokeLinecap="round" />
      <ellipse cx="38" cy="44" rx="20" ry="12" fill="#C98A4B" {...trazo} />
      <path d="M32 36 Q40 32 48 38 Q46 48 36 48 Z" fill="#FFF4D6" />
      <path d="M8 36 Q8 22 20 22 Q30 22 30 34 Q30 44 20 44 L10 44 Q4 44 8 36 Z" fill="#C98A4B" {...trazo} />
      <path d="M20 22 Q26 12 30 26" fill="#8B5A2B" {...trazo} />
      <circle cx="6" cy="36" r="3" fill={AZUL_OSCURO} />
      <circle cx="15" cy="31" r="2" fill={AZUL_OSCURO} />
      <path d="M8 42 Q6 50 11 48" fill="#E6403A" stroke={AZUL_OSCURO} strokeWidth="1.5" />
      <path d="M24 42 L30 46" stroke="#E6403A" strokeWidth="4" />
    </>
  )
}

// Bolsas de basura en el cordón
function Basura() {
  return (
    <>
      <path d="M36 64 Q30 36 44 30 L46 24 L52 24 L54 30 Q68 36 64 64 Z" fill="#2B2F36" {...trazo} />
      <path d="M6 64 Q2 34 20 26 L22 18 L30 18 L32 26 Q48 34 44 64 Z" fill="#363B44" {...trazo} />
      <path d="M20 18 Q26 10 32 18" fill="none" {...trazo} />
      <path d="M14 40 Q16 32 22 30" stroke="#8A93A0" strokeWidth="3" fill="none" strokeLinecap="round" />
      <path d="M44 44 Q46 38 50 36" stroke="#8A93A0" strokeWidth="3" fill="none" strokeLinecap="round" />
    </>
  )
}

// Cono de obra
function Cono() {
  return (
    <>
      <path d="M26 12 H44 L56 58 H14 Z" fill="#F28C28" {...trazo} />
      <path d="M22 28 H48 L51 40 H19 Z" fill="#FFFFFF" stroke={AZUL_OSCURO} strokeWidth="2" />
      <rect x="6" y="58" width="58" height="8" rx="3" fill="#F28C28" {...trazo} />
    </>
  )
}

// Un perrito chico (para la jauría del paseador), mirando a la izquierda
function Perrito({ x, color, oreja }) {
  return (
    <g transform={`translate(${x} 0)`}>
      <path d="M22 54 V64 M30 55 V64" stroke={AZUL_OSCURO} strokeWidth="6" strokeLinecap="round" />
      <path d="M22 54 V64 M30 55 V64" stroke={color} strokeWidth="3" strokeLinecap="round" />
      <path className="cola" d="M34 48 Q42 42 40 36" fill="none" stroke={AZUL_OSCURO} strokeWidth="5" strokeLinecap="round" />
      <path className="cola" d="M34 48 Q42 42 40 36" fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round" />
      <ellipse cx="27" cy="50" rx="10" ry="7" fill={color} {...trazo} strokeWidth="2.5" />
      <path d="M8 46 Q8 36 16 36 Q23 36 23 44 Q23 50 16 50 L10 50 Q5 50 8 46 Z" fill={color} {...trazo} strokeWidth="2.5" />
      <path d="M16 36 Q20 30 22 40" fill={oreja} {...trazo} strokeWidth="2" />
      <circle cx="7" cy="45" r="2" fill={AZUL_OSCURO} />
      <circle cx="13" cy="42" r="1.5" fill={AZUL_OSCURO} />
      <path d="M17 46 L22 49" stroke="#E6403A" strokeWidth="3" />
    </g>
  )
}

// Paseador de perros (Recoleta): una jauría con correas que ocupa media vereda.
// Del paseador solo se ve la mano arriba a la derecha: lo que hay que saltar son los perros.
function Paseador() {
  return (
    <>
      {/* Correas: salen de cada collar y se juntan en la mano */}
      <path d="M20 48 Q60 10 112 8 M58 48 Q80 20 112 8 M96 48 Q104 24 112 8" fill="none" stroke="#E6403A" strokeWidth="2" />
      <Perrito x={0} color="#C98A4B" oreja="#8B5A2B" />
      <Perrito x={38} color="#FFF4D6" oreja="#C98A4B" />
      <Perrito x={76} color="#3A3F48" oreja="#1C2026" />
      {/* La mano del paseador, con la manga de la campera */}
      <rect x="106" y="0" width="16" height="10" rx="3" fill="#53C9AF" {...trazo} strokeWidth="2.5" />
      <circle cx="112" cy="11" r="5" fill="#E8B48A" {...trazo} strokeWidth="2.5" />
    </>
  )
}

// Moto de delivery (Retiro): viene de frente, más rápido que todo lo demás
function Moto() {
  return (
    <>
      {/* Rayas de velocidad atrás */}
      <path className="rayas-velocidad" d="M96 40 H108 M94 52 H110 M98 64 H106" stroke="#FFFFFF" strokeWidth="3" strokeLinecap="round" />
      {/* Ruedas */}
      <circle cx="18" cy="74" r="12" fill="#2B2F36" stroke={AZUL_OSCURO} strokeWidth="3" />
      <circle cx="18" cy="74" r="4" fill="#C9CED6" />
      <circle cx="76" cy="74" r="12" fill="#2B2F36" stroke={AZUL_OSCURO} strokeWidth="3" />
      <circle cx="76" cy="74" r="4" fill="#C9CED6" />
      {/* Cuerpo de la moto */}
      <path d="M14 60 Q20 50 40 52 L70 52 Q84 52 86 66 L30 70 Q20 70 14 60 Z" fill="#E6403A" {...trazo} />
      <path d="M18 74 L28 54 M10 46 L22 50" {...trazo} />
      <circle cx="12" cy="56" r="4" fill="#FFC53D" stroke={AZUL_OSCURO} strokeWidth="2" />
      {/* Caja de delivery */}
      <rect x="62" y="22" width="30" height="28" rx="4" fill="#FF8A3D" {...trazo} />
      <path d="M70 32 Q77 26 84 32 Q77 42 70 32 Z" fill="#FFF4D6" />
      {/* Repartidor: casco, cuerpo y brazo al manubrio */}
      <path d="M40 52 Q38 34 48 30 L58 32 Q62 44 60 52 Z" fill="#102A43" {...trazo} strokeWidth="2.5" />
      <path d="M44 36 Q32 40 22 48" fill="none" stroke={AZUL_OSCURO} strokeWidth="6" strokeLinecap="round" />
      <circle cx="50" cy="20" r="11" fill="#E6403A" {...trazo} />
      <path d="M40 20 Q42 14 50 14 L50 24 Q44 26 40 20 Z" fill="#2B4A66" stroke={AZUL_OSCURO} strokeWidth="2" />
    </>
  )
}

// Cada dibujo con su "lienzo": los nuevos son más anchos
const DIBUJOS = {
  baldosa: { Dibujo: Baldosa, ancho: 70, alto: 70 },
  perro: { Dibujo: Perro, ancho: 70, alto: 70 },
  basura: { Dibujo: Basura, ancho: 70, alto: 70 },
  cono: { Dibujo: Cono, ancho: 70, alto: 70 },
  paseador: { Dibujo: Paseador, ancho: 124, alto: 70 },
  moto: { Dibujo: Moto, ancho: 112, alto: 90 },
}

function Obstaculo({ tipo }) {
  const { Dibujo, ancho, alto } = DIBUJOS[tipo] ?? DIBUJOS.cono
  return (
    <svg viewBox={`0 0 ${ancho} ${alto}`} className={`obstaculo-dibujo obstaculo-${tipo}`} aria-hidden="true">
      <ellipse cx={ancho / 2} cy={alto - 4} rx={ancho * 0.38} ry="3" fill={AZUL_OSCURO} opacity="0.18" />
      <Dibujo />
    </svg>
  )
}

export default Obstaculo
