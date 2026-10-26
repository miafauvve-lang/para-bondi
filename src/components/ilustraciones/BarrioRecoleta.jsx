// Fondo del nivel 2: una cuadra de Recoleta con edificios de estilo francés,
// techos de pizarra (mansardas), ventanas altas con arco, balcones de hierro,
// faroles antiguos, árboles y el cartel del barrio.
// Mismo trazo y paleta que Barrio.jsx (Palermo), y también empalma consigo mismo
// para poder repetirlo sin cortes.
import { AZUL_OSCURO, CREMA, VERDE_AGUA } from "./colores"
import { Arbol, Balcon, Negocio } from "./Barrio"

const trazo = { stroke: AZUL_OSCURO, strokeWidth: 3, strokeLinejoin: "round" }

const PIZARRA = "#5E7690" // el gris azulado de los techos franceses
const VIDRIO = "#BFE3F2"

// Ventana alta con arco arriba y una "piedra" clave en el centro
function VentanaClasica({ x, y }) {
  return (
    <g>
      <path
        d={`M${x - 4} ${y + 38} V${y + 8} Q${x + 10} ${y - 8} ${x + 24} ${y + 8} V${y + 38} Z`}
        fill={CREMA}
        stroke={AZUL_OSCURO}
        strokeWidth="2"
      />
      <path
        d={`M${x} ${y + 36} V${y + 10} Q${x + 10} ${y - 2} ${x + 20} ${y + 10} V${y + 36} Z`}
        fill={VIDRIO}
        stroke={AZUL_OSCURO}
        strokeWidth="2.5"
      />
      <path d={`M${x + 10} ${y + 2} V${y + 36} M${x} ${y + 20} H${x + 20}`} stroke={AZUL_OSCURO} strokeWidth="1.5" />
      <rect x={x + 7} y={y - 6} width="6" height="7" fill={CREMA} stroke={AZUL_OSCURO} strokeWidth="1.5" />
    </g>
  )
}

// Ventanita del techo (lucarna) que asoma de la mansarda
function Lucarna({ x, y }) {
  return (
    <g>
      <path d={`M${x - 3} ${y + 22} V${y + 6} Q${x + 8} ${y - 6} ${x + 19} ${y + 6} V${y + 22} Z`} fill={CREMA} {...trazo} />
      <rect x={x + 2} y={y + 7} width="12" height="14" rx="5" fill={VIDRIO} stroke={AZUL_OSCURO} strokeWidth="2" />
    </g>
  )
}

// Un edificio "petit hôtel": planta baja de piedra, pisos con ventanas en arco,
// cornisa crema y techo de pizarra con lucarnas
function Edificio({ x, ancho, alto, color, balcon = true, children }) {
  const techo = 260 - alto

  // Cuántas columnas de ventanas entran en el ancho
  const columnas = Math.max(2, Math.floor((ancho - 20) / 46))
  const paso = (ancho - 20) / columnas
  const xsVentanas = Array.from({ length: columnas }, (_, i) => x + 10 + paso * i + paso / 2 - 10)

  // Pisos de ventanas: uno cada 54 px, hasta llegar a la planta baja
  const pisos = []
  for (let y = techo + 20; y + 38 <= 204; y += 54) pisos.push(y)

  return (
    <g>
      {/* Techo de pizarra (mansarda) */}
      <path d={`M${x - 2} ${techo - 6} L${x + 16} ${techo - 36} H${x + ancho - 16} L${x + ancho + 2} ${techo - 6} Z`} fill={PIZARRA} {...trazo} />
      {[0, 1, 2].map((i) => (
        <Lucarna key={i} x={x + 22 + i * ((ancho - 60) / 2)} y={techo - 32} />
      ))}

      {/* Fachada */}
      <rect x={x} y={techo} width={ancho} height={alto} fill={color} {...trazo} />
      {/* Cornisa */}
      <rect x={x - 6} y={techo - 8} width={ancho + 12} height="12" fill={CREMA} {...trazo} />

      {pisos.map((py) => (
        <g key={py}>
          {xsVentanas.map((vx) => (
            <VentanaClasica key={vx} x={vx} y={py} />
          ))}
          {/* Moldura entre pisos */}
          <path d={`M${x} ${py + 46} H${x + ancho}`} stroke={AZUL_OSCURO} strokeWidth="1.5" opacity="0.35" />
        </g>
      ))}

      {/* Balcón corrido de hierro en el primer piso */}
      {balcon && pisos.length > 0 && <Balcon x={x + 8} y={pisos[0] + 40} ancho={ancho - 16} />}

      {/* Planta baja de piedra, con una puerta grande en arco */}
      {children ?? (
        <g>
          <rect x={x} y="204" width={ancho} height="56" fill="#D8C7A8" {...trazo} />
          <path d={`M${x} 222 H${x + ancho} M${x} 240 H${x + ancho}`} stroke={AZUL_OSCURO} strokeWidth="1.5" opacity="0.35" />
          <path
            d={`M${x + ancho / 2 - 18} 260 V226 Q${x + ancho / 2} 206 ${x + ancho / 2 + 18} 226 V260 Z`}
            fill="#3F5F7A"
            stroke={AZUL_OSCURO}
            strokeWidth="2.5"
          />
          <path d={`M${x + ancho / 2} 214 V260`} stroke={AZUL_OSCURO} strokeWidth="1.5" />
        </g>
      )}
    </g>
  )
}

// Farol antiguo de plaza, de hierro negro con cuatro vidrios
function FarolClasico({ x }) {
  return (
    <g>
      <path d={`M${x - 7} 262 h14 l-3 -10 h-8 z`} fill={AZUL_OSCURO} />
      <path d={`M${x} 254 V150`} stroke={AZUL_OSCURO} strokeWidth="5" />
      <path d={`M${x - 10} 150 h20 l-4 -24 h-12 z`} fill="#FFE8AF" stroke={AZUL_OSCURO} strokeWidth="2.5" strokeLinejoin="round" />
      <path d={`M${x} 150 V126`} stroke={AZUL_OSCURO} strokeWidth="1.5" />
      <path d={`M${x - 9} 126 h18 l-9 -9 z`} fill={AZUL_OSCURO} />
    </g>
  )
}

// El cartel del barrio, como los de las esquinas porteñas
function CartelRecoleta({ x }) {
  return (
    <g>
      <path d={`M${x} 262 V160`} stroke={AZUL_OSCURO} strokeWidth="5" strokeLinecap="round" />
      <rect x={x - 52} y="136" width="104" height="26" rx="4" fill={AZUL_OSCURO} stroke={AZUL_OSCURO} strokeWidth="3" />
      <rect x={x - 48} y="140" width="96" height="18" rx="2" fill="none" stroke={CREMA} strokeWidth="1.5" />
      <text
        x={x}
        y="154"
        textAnchor="middle"
        fontSize="13"
        fontWeight="800"
        fill={CREMA}
        fontFamily="Verdana, sans-serif"
        letterSpacing="1"
      >
        RECOLETA
      </text>
    </g>
  )
}

function BarrioRecoleta() {
  return (
    <svg viewBox="0 0 1000 262" preserveAspectRatio="none" className="barrio-dibujo" aria-hidden="true">
      <Edificio x={0} ancho={200} alto={186} color="#EFE3C8" />
      <Edificio x={200} ancho={180} alto={160} color="#E7C9B5" balcon={false}>
        <Negocio x={200} ancho={180} cartel="CAFÉ" colorToldo={VERDE_AGUA} />
      </Edificio>
      <Edificio x={380} ancho={220} alto={196} color="#C9D3D9" />
      <Edificio x={600} ancho={190} alto={170} color="#F2E2C0" />
      <Edificio x={790} ancho={210} alto={190} color="#E2D3B8" />

      <Arbol x={196} />
      <FarolClasico x={480} />
      <CartelRecoleta x={640} />
      <Arbol x={790} />
    </svg>
  )
}

export default BarrioRecoleta
