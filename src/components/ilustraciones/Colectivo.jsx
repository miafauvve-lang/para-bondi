// El colectivo porteño del mockup (rojo y crema), visto de costado
// con el frente hacia la DERECHA, igual que la corredora.
import { AZUL_OSCURO, CREMA, ROJO, AMARILLO } from "./colores"

function Rueda({ x }) {
  return (
    <g className="rueda" style={{ transformOrigin: `${x}px 112px` }}>
      <circle cx={x} cy="112" r="16" fill="#2B2F36" stroke={AZUL_OSCURO} strokeWidth="3" />
      <circle cx={x} cy="112" r="7" fill="#C9CED6" stroke={AZUL_OSCURO} strokeWidth="2" />
      <path d={`M${x - 7} 112 H${x + 7} M${x} 105 V119`} stroke={AZUL_OSCURO} strokeWidth="2" />
    </g>
  )
}

function Colectivo({ linea = "60" }) {
  const ventanas = [30, 72, 114, 156]

  return (
    <svg viewBox="0 0 320 132" className="colectivo-dibujo" aria-hidden="true">
      {/* Carrocería: crema arriba, roja abajo */}
      <path
        d="M14 16 Q14 8 24 8 H286 Q304 8 308 24 L312 100 Q312 110 302 110 H20 Q12 110 12 100 Z"
        fill={CREMA}
        stroke={AZUL_OSCURO}
        strokeWidth="3.5"
        strokeLinejoin="round"
      />
      <path d="M13 66 H311 L312 100 Q312 110 302 110 H20 Q12 110 12 100 Z" fill={ROJO} stroke={AZUL_OSCURO} strokeWidth="3.5" strokeLinejoin="round" />
      <path d="M13 60 H310" stroke={ROJO} strokeWidth="4" />
      {/* Filete dorado, un guiño al fileteado porteño */}
      <path d="M30 86 Q60 76 90 86 T150 86" fill="none" stroke={AMARILLO} strokeWidth="2.5" strokeLinecap="round" />
      <circle cx="152" cy="86" r="3" fill={AMARILLO} />

      {/* Ventanillas */}
      {ventanas.map((x) => (
        <g key={x}>
          <rect x={x} y="20" width="36" height="32" rx="4" fill="#2B4A66" stroke={AZUL_OSCURO} strokeWidth="2.5" />
          <path d={`M${x + 6} 46 L${x + 20} 24`} stroke="#9FC6E0" strokeWidth="3" opacity="0.6" />
        </g>
      ))}

      {/* Puerta de adelante */}
      <rect x="206" y="20" width="36" height="84" rx="3" fill="#2B4A66" stroke={AZUL_OSCURO} strokeWidth="2.5" />
      <path d="M224 20 V104" stroke={AMARILLO} strokeWidth="2.5" />

      {/* Parabrisas y cartel con el número de línea */}
      <path d="M254 22 H292 Q300 22 302 32 L306 62 H254 Z" fill="#2B4A66" stroke={AZUL_OSCURO} strokeWidth="2.5" strokeLinejoin="round" />
      <rect x="256" y="10" width="40" height="11" rx="2" fill={AZUL_OSCURO} />
      <text x="276" y="19" textAnchor="middle" fontSize="10" fontWeight="800" fill={AMARILLO} fontFamily="Verdana, sans-serif">
        {linea}
      </text>
      <path d="M306 40 h6 v12 h-4" fill="none" stroke={AZUL_OSCURO} strokeWidth="2.5" />

      {/* Faro y paragolpes */}
      <circle cx="302" cy="82" r="5" fill={AMARILLO} stroke={AZUL_OSCURO} strokeWidth="2" />
      <rect x="8" y="100" width="308" height="8" rx="4" fill="#6A7B88" stroke={AZUL_OSCURO} strokeWidth="2.5" />

      <Rueda x={66} />
      <Rueda x={254} />
    </svg>
  )
}

export default Colectivo
