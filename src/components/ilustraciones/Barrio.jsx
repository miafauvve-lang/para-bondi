// Fondo del nivel: una cuadra de Palermo con casas chorizo, balcones de
// hierro, toldos, plantas y árboles. El dibujo empalma consigo mismo
// para poder repetirlo y que el barrio "pase" sin cortes.
import { AZUL_OSCURO, CREMA, ROJO, VERDE_AGUA } from "./colores"

const trazo = { stroke: AZUL_OSCURO, strokeWidth: 3, strokeLinejoin: "round" }

function Ventana({ x, y, persiana = "#3F7D63" }) {
  return (
    <g>
      <rect x={x - 7} y={y} width="7" height="34" fill={persiana} stroke={AZUL_OSCURO} strokeWidth="2" />
      <rect x={x + 22} y={y} width="7" height="34" fill={persiana} stroke={AZUL_OSCURO} strokeWidth="2" />
      <rect x={x} y={y} width="22" height="34" rx="2" fill="#BFE3F2" stroke={AZUL_OSCURO} strokeWidth="2.5" />
      <path d={`M${x + 11} ${y} V${y + 34}`} stroke={AZUL_OSCURO} strokeWidth="1.5" />
      <path d={`M${x - 9} ${y - 5} H${x + 31}`} stroke={AZUL_OSCURO} strokeWidth="3" strokeLinecap="round" />
    </g>
  )
}

function Balcon({ x, y, ancho }) {
  const barrotes = []
  for (let bx = x + 6; bx < x + ancho; bx += 7) barrotes.push(bx)
  return (
    <g>
      <rect x={x} y={y} width={ancho} height="5" fill="#D8CDB6" stroke={AZUL_OSCURO} strokeWidth="2" />
      <path d={`M${x} ${y - 18} H${x + ancho}`} stroke={AZUL_OSCURO} strokeWidth="2.5" />
      {barrotes.map((bx) => (
        <path key={bx} d={`M${bx} ${y - 18} V${y}`} stroke={AZUL_OSCURO} strokeWidth="1.5" />
      ))}
      {/* Macetas con plantas */}
      <rect x={x + 6} y={y - 10} width="9" height="8" fill="#C0643E" stroke={AZUL_OSCURO} strokeWidth="1.5" />
      <circle cx={x + 10} cy={y - 16} r="7" fill="#6FA83F" stroke={AZUL_OSCURO} strokeWidth="1.5" />
      <rect x={x + ancho - 16} y={y - 10} width="9" height="8" fill="#C0643E" stroke={AZUL_OSCURO} strokeWidth="1.5" />
      <circle cx={x + ancho - 11} cy={y - 16} r="6" fill="#86BC4B" stroke={AZUL_OSCURO} strokeWidth="1.5" />
    </g>
  )
}

function Toldo({ x, y, ancho, color }) {
  const franjas = []
  for (let fx = x; fx < x + ancho; fx += 16) franjas.push(fx)
  return (
    <g>
      {franjas.map((fx, i) => (
        <path
          key={fx}
          d={`M${fx} ${y} H${fx + 16} L${fx + 16} ${y + 18} Q${fx + 8} ${y + 24} ${fx} ${y + 18} Z`}
          fill={i % 2 === 0 ? color : CREMA}
        />
      ))}
      <path
        d={`M${x} ${y} H${x + ancho} V${y + 18} M${x} ${y} V${y + 18}`}
        fill="none"
        stroke={AZUL_OSCURO}
        strokeWidth="2.5"
      />
    </g>
  )
}

function Negocio({ x, ancho, cartel, colorToldo }) {
  return (
    <g>
      <rect x={x + 12} y="180" width={ancho - 24} height="22" rx="3" fill={CREMA} {...trazo} />
      <text
        x={x + ancho / 2}
        y="196"
        textAnchor="middle"
        fontSize="13"
        fontWeight="800"
        fill={AZUL_OSCURO}
        fontFamily="Verdana, sans-serif"
      >
        {cartel}
      </text>
      <Toldo x={x + 8} y="204" ancho={ancho - 16} color={colorToldo} />
      <rect x={x + 16} y="228" width={ancho - 60} height="32" fill="#2B4A66" stroke={AZUL_OSCURO} strokeWidth="2.5" />
      <rect x={x + ancho - 38} y="222" width="22" height="38" fill="#3F7D63" stroke={AZUL_OSCURO} strokeWidth="2.5" />
    </g>
  )
}

function Casa({ x, ancho, alto, color, puerta = "#3F7D63", persiana, children }) {
  const techo = 260 - alto
  return (
    <g>
      <rect x={x} y={techo} width={ancho} height={alto} fill={color} {...trazo} />
      {/* Cornisa */}
      <rect x={x - 4} y={techo - 6} width={ancho + 8} height="10" fill={CREMA} {...trazo} />
      <Ventana x={x + 22} y={techo + 24} persiana={persiana} />
      <Ventana x={x + ancho - 44} y={techo + 24} persiana={persiana} />
      {alto > 150 && <Balcon x={x + 10} y={techo + 66} ancho={ancho - 20} />}
      {children ?? (
        <g>
          <rect x={x + ancho / 2 - 14} y="214" width="28" height="46" rx="10" fill={puerta} stroke={AZUL_OSCURO} strokeWidth="2.5" />
          <Ventana x={x + 16} y="220" persiana={persiana} />
        </g>
      )}
    </g>
  )
}

function Arbol({ x }) {
  return (
    <g>
      <path d={`M${x} 262 V170`} stroke={AZUL_OSCURO} strokeWidth="13" strokeLinecap="round" />
      <path d={`M${x} 262 V170`} stroke="#8B5A2B" strokeWidth="8" strokeLinecap="round" />
      <path d={`M${x} 190 L${x - 18} 168 M${x} 184 L${x + 16} 164`} stroke="#8B5A2B" strokeWidth="5" strokeLinecap="round" />
      <g fill="#6FA83F" stroke={AZUL_OSCURO} strokeWidth="3">
        <circle cx={x - 30} cy="150" r="26" />
        <circle cx={x + 28} cy="146" r="28" />
        <circle cx={x} cy="126" r="34" />
      </g>
      <g fill="#86BC4B">
        <circle cx={x - 8} cy="116" r="14" />
        <circle cx={x + 24} cy="138" r="10" />
      </g>
    </g>
  )
}

function Farol({ x }) {
  return (
    <g>
      <path d={`M${x} 262 V150 Q${x} 138 ${x + 14} 138`} fill="none" stroke={AZUL_OSCURO} strokeWidth="4" />
      <path d={`M${x + 8} 138 h14 l-3 10 h-8 z`} fill="#FFE8AF" stroke={AZUL_OSCURO} strokeWidth="2.5" strokeLinejoin="round" />
    </g>
  )
}

function Barrio() {
  return (
    <svg viewBox="0 0 1000 262" preserveAspectRatio="none" className="barrio-dibujo" aria-hidden="true">
      <Casa x={0} ancho={190} alto={220} color="#D9785B" />
      <Casa x={190} ancho={190} alto={196} color="#8FCFB5" persiana="#2F6B8A">
        <Negocio x={190} ancho={190} cartel="KIOSCO" colorToldo={VERDE_AGUA} />
      </Casa>
      <Casa x={380} ancho={180} alto={238} color="#F2E2C0" />
      <Casa x={560} ancho={210} alto={176} color="#F4C76B" persiana="#B5523B">
        <Negocio x={560} ancho={210} cartel="PIZZERÍA" colorToldo={ROJO} />
      </Casa>
      <Casa x={770} ancho={230} alto={226} color="#E9A38F" />

      <Arbol x={186} />
      <Farol x={470} />
      <Arbol x={690} />
    </svg>
  )
}

export default Barrio
