// "La Picante", la corredora del mockup, dibujada mirando a la DERECHA
// (hacia el colectivo y la parada). Las piernas y los brazos son grupos
// separados para poder animarlos con CSS (ver .corredora en App.css).
import { AZUL_OSCURO } from "./colores"

const PIEL = "#C98B5E"
const PELO = "#3B2418"

// Una pierna doblada: muslo + canilla (calza negra) y la zapatilla blanca
function Pierna({ clase }) {
  return (
    <g className={clase}>
      <path d="M54 84 L60 106 L54 128" fill="none" stroke={AZUL_OSCURO} strokeWidth="15" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M54 84 L60 106 L54 128" fill="none" stroke="#1E2230" strokeWidth="10" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M55 88 L60 106" stroke="#FFF4D6" strokeWidth="2" />
      <path d="M50 124 h4 v4 h-4 z" fill="#FFF4D6" stroke={AZUL_OSCURO} strokeWidth="2" />
      <path d="M47 129 Q47 124 55 125 L66 128 Q70 130 68 134 L48 134 Q45 134 47 129 Z" fill="#FFFFFF" stroke={AZUL_OSCURO} strokeWidth="2.5" strokeLinejoin="round" />
      <path d="M52 131 h12" stroke="#E6403A" strokeWidth="2" />
    </g>
  )
}

// Un brazo doblado: manga de campera y puño
function Brazo({ clase, manga }) {
  return (
    <g className={clase}>
      <path d="M57 50 L64 64 L75 60" fill="none" stroke={AZUL_OSCURO} strokeWidth="13" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M57 50 L64 64 L75 60" fill="none" stroke={manga} strokeWidth="8.5" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="77" cy="59" r="4.5" fill={PIEL} stroke={AZUL_OSCURO} strokeWidth="2.5" />
    </g>
  )
}

function Corredora() {
  return (
    <svg viewBox="0 0 100 140" className="corredora-dibujo" aria-hidden="true">
      {/* Rayitas de velocidad detrás, como en el mockup */}
      <g className="rayas-velocidad" stroke="#27A7E7" strokeWidth="2.5" strokeLinecap="round">
        <path d="M6 58 H24" />
        <path d="M2 72 H22" />
        <path d="M8 86 H26" />
      </g>

      {/* Sombra en el piso */}
      <ellipse className="sombra" cx="56" cy="135" rx="20" ry="3.5" fill={AZUL_OSCURO} opacity="0.2" />

      <Brazo clase="brazo brazo-atras" manga="#C7352F" />
      <Pierna clase="pierna pierna-atras" />

      {/* Torso: campera azul, roja y blanca, inclinada hacia adelante */}
      <path
        d="M46 46 Q56 40 67 45 L68 82 Q56 88 44 83 Z"
        fill="#3E8ED0"
        stroke={AZUL_OSCURO}
        strokeWidth="3"
        strokeLinejoin="round"
      />
      <path d="M45 66 L67 60 L68 82 Q56 88 44 83 Z" fill="#E6403A" stroke={AZUL_OSCURO} strokeWidth="3" strokeLinejoin="round" />
      <path d="M45 66 L67 60" stroke="#FFF4D6" strokeWidth="3.5" />
      <path d="M60 44 L62 83" stroke={AZUL_OSCURO} strokeWidth="1.5" />

      <Pierna clase="pierna pierna-adelante" />

      {/* Cabeza, de perfil mirando a la derecha */}
      <path d="M54 40 L56 32" stroke={PIEL} strokeWidth="7" />
      <circle cx="58" cy="25" r="12.5" fill={PIEL} stroke={AZUL_OSCURO} strokeWidth="3" />
      <path d="M69 26 L73 29 L69 30" fill={PIEL} stroke={AZUL_OSCURO} strokeWidth="2" strokeLinejoin="round" />
      {/* Pelo con colita que vuela hacia atrás */}
      <path
        className="colita"
        d="M47 19 Q34 12 20 22 Q30 22 26 30 Q36 26 46 27 Z"
        fill={PELO}
        stroke={AZUL_OSCURO}
        strokeWidth="2.5"
        strokeLinejoin="round"
      />
      <path
        d="M46 26 Q44 10 60 11 Q71 13 70 22 Q62 18 55 21 Q52 25 50 29 Z"
        fill={PELO}
        stroke={AZUL_OSCURO}
        strokeWidth="2.5"
        strokeLinejoin="round"
      />
      <circle cx="47" cy="20" r="3" fill="#E6403A" stroke={AZUL_OSCURO} strokeWidth="1.5" />
      <circle cx="64" cy="24" r="1.8" fill={AZUL_OSCURO} />
      <path d="M64 32 Q67 34 69 31" fill="none" stroke={AZUL_OSCURO} strokeWidth="2" strokeLinecap="round" />
      <circle cx="54" cy="29" r="2" fill="none" stroke="#FFC53D" strokeWidth="1.5" />

      <Brazo clase="brazo brazo-adelante" manga="#3E8ED0" />
    </svg>
  )
}

export default Corredora
