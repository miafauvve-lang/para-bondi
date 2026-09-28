// El mate del mockup: calabaza marrón, virola plateada, yerba y bombilla,
// con un brillo amarillo alrededor para que se note que se puede agarrar.
import { AZUL_OSCURO, AMARILLO } from "./colores"

const trazo = { stroke: AZUL_OSCURO, strokeWidth: 3, strokeLinejoin: "round", strokeLinecap: "round" }

function Mate() {
  return (
    <svg viewBox="0 0 70 80" className="mate-dibujo" aria-hidden="true">
      {/* Brillo */}
      <circle className="mate-brillo" cx="35" cy="44" r="31" fill={AMARILLO} opacity="0.35" />

      {/* Vapor */}
      <path className="mate-vapor" d="M26 20 Q20 12 26 6 Q30 2 27 -2" fill="none" stroke="#FFFFFF" strokeWidth="3" strokeLinecap="round" opacity="0.9" />

      {/* Bombilla */}
      <path d="M36 34 L50 6" {...trazo} strokeWidth="7" />
      <path d="M36 34 L50 6" stroke="#C9CED6" strokeWidth="3.5" strokeLinecap="round" />
      <path d="M42 23 L46 25" stroke={AMARILLO} strokeWidth="4" />
      <path d="M48 3 L55 6" {...trazo} strokeWidth="4" />

      {/* Calabaza */}
      <path d="M14 42 Q10 70 35 72 Q60 70 56 42 Z" fill="#8B4A26" {...trazo} />
      <path d="M20 50 Q20 62 28 66" fill="none" stroke="#B5703F" strokeWidth="4" strokeLinecap="round" />
      <path d="M26 70 H44 L42 76 H28 Z" fill="#6E3A1D" {...trazo} />

      {/* Virola plateada y yerba */}
      <ellipse cx="35" cy="38" rx="20" ry="6" fill="#6FA83F" {...trazo} />
      <path d="M15 38 Q15 46 35 46 Q55 46 55 38" fill="#C9CED6" {...trazo} />
      <path d="M22 42 Q35 45 48 42" fill="none" stroke="#8A93A0" strokeWidth="1.5" />
    </svg>
  )
}

export default Mate
