// El cartel de la parada del mockup: poste gris y círculo azul con un bondi blanco
import { AZUL_OSCURO, AMARILLO } from "./colores"

function Parada({ linea = "60" }) {
  return (
    <svg viewBox="0 0 60 200" className="parada-dibujo" aria-hidden="true">
      <rect x="27" y="50" width="6" height="146" fill="#6A7B88" stroke={AZUL_OSCURO} strokeWidth="2.5" />
      <ellipse cx="30" cy="196" rx="12" ry="3" fill={AZUL_OSCURO} opacity="0.25" />

      <circle cx="30" cy="30" r="27" fill="#2A5CAA" stroke={AZUL_OSCURO} strokeWidth="3.5" />
      <circle cx="30" cy="30" r="20" fill="none" stroke="#FFFFFF" strokeWidth="2.5" />
      {/* Bondi blanco de frente */}
      <rect x="20" y="18" width="20" height="21" rx="4" fill="#FFFFFF" />
      <rect x="23" y="21" width="14" height="8" rx="1.5" fill="#2A5CAA" />
      <circle cx="24.5" cy="34" r="1.8" fill="#2A5CAA" />
      <circle cx="35.5" cy="34" r="1.8" fill="#2A5CAA" />
      <rect x="21" y="39" width="4" height="4" rx="1" fill="#FFFFFF" />
      <rect x="35" y="39" width="4" height="4" rx="1" fill="#FFFFFF" />

      {/* Chapita con la línea */}
      <rect x="16" y="62" width="28" height="15" rx="3" fill={AMARILLO} stroke={AZUL_OSCURO} strokeWidth="2.5" />
      <text x="30" y="73.5" textAnchor="middle" fontSize="10" fontWeight="800" fill={AZUL_OSCURO} fontFamily="Verdana, sans-serif">
        {linea}
      </text>
    </svg>
  )
}

export default Parada
