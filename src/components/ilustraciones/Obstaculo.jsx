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

const DIBUJOS = { baldosa: Baldosa, perro: Perro, basura: Basura, cono: Cono }

function Obstaculo({ tipo }) {
  const Dibujo = DIBUJOS[tipo] ?? Cono
  return (
    <svg viewBox="0 0 70 70" className={`obstaculo-dibujo obstaculo-${tipo}`} aria-hidden="true">
      <ellipse cx="35" cy="66" rx="26" ry="3" fill={AZUL_OSCURO} opacity="0.18" />
      <Dibujo />
    </svg>
  )
}

export default Obstaculo
