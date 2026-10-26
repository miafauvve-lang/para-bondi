// Fondo del nivel 2: Recoleta.
// Una cuadra "afrancesada" y pareja: fachadas de piedra clara, techos de pizarra
// (mansardas), un edificio de esquina con cúpula, la torre blanca de la Basílica
// del Pilar, un café con mesitas, faroles antiguos y un gomero gigante.
// Mismo trazo y paleta que Barrio.jsx (Palermo), y también empalma consigo mismo
// para poder repetirlo sin cortes.
import { AZUL_OSCURO, CREMA, VERDE_AGUA } from "./colores"
import { Balcon, Negocio } from "./Barrio"

const trazo = { stroke: AZUL_OSCURO, strokeWidth: 3, strokeLinejoin: "round" }

const PIZARRA = "#5E7690" // el gris azulado de los techos franceses
const VIDRIO = "#BFE3F2"
const BLANCO_IGLESIA = "#F7F3EA"
const AZULEJO = "#2A5CAA"

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

// La cúpula de esquina, tan porteña: tambor con ventanitas ovaladas,
// cúpula de pizarra, linterna y aguja. Va arriba de un Edificio.
function Cupula({ x, techo }) {
  return (
    <g>
      <rect x={x - 28} y={techo - 44} width="56" height="40" fill={CREMA} {...trazo} />
      {[-14, 0, 14].map((dx) => (
        <ellipse key={dx} cx={x + dx} cy={techo - 24} rx="4" ry="8" fill={VIDRIO} stroke={AZUL_OSCURO} strokeWidth="2" />
      ))}
      <path d={`M${x - 32} ${techo - 44} Q${x - 30} ${techo - 92} ${x} ${techo - 92} Q${x + 30} ${techo - 92} ${x + 32} ${techo - 44} Z`} fill={PIZARRA} {...trazo} />
      <path d={`M${x - 12} ${techo - 50} Q${x - 12} ${techo - 80} ${x} ${techo - 86}`} fill="none" stroke="#8FA3B8" strokeWidth="3" strokeLinecap="round" />
      <rect x={x - 7} y={techo - 104} width="14" height="13" fill={CREMA} {...trazo} />
      <path d={`M${x} ${techo - 104} V${techo - 116}`} stroke={AZUL_OSCURO} strokeWidth="3" strokeLinecap="round" />
    </g>
  )
}

// La Basílica del Pilar: blanca, con portada de curvas y la torre del
// campanario coronada por una cupulita de azulejos azules
function BasilicaDelPilar({ x }) {
  const torre = x + 140
  return (
    <g>
      {/* Portada de la iglesia */}
      <path
        d={`M${x} 262 V150 H${x + 30} Q${x + 34} 128 ${x + 52} 124 Q${x + 70} 104 ${x + 88} 124 Q${x + 106} 128 ${x + 110} 150 H${x + 140} V262 Z`}
        fill={BLANCO_IGLESIA}
        {...trazo}
      />
      <circle cx={x + 70} cy="140" r="9" fill={VIDRIO} stroke={AZUL_OSCURO} strokeWidth="2.5" />
      <path d={`M${x + 50} 262 V206 Q${x + 70} 182 ${x + 90} 206 V262 Z`} fill="#8B5A2B" stroke={AZUL_OSCURO} strokeWidth="2.5" />
      <path d={`M${x + 70} 192 V262`} stroke={AZUL_OSCURO} strokeWidth="1.5" />
      <path d={`M${x + 16} 166 V250 M${x + 124} 166 V250`} stroke={AZUL_OSCURO} strokeWidth="2" opacity="0.4" />

      {/* Torre del campanario */}
      <rect x={torre} y="96" width="56" height="166" fill={BLANCO_IGLESIA} {...trazo} />
      <rect x={torre - 4} y="92" width="64" height="8" fill={BLANCO_IGLESIA} {...trazo} />
      <path d={`M${torre + 16} 150 V128 Q${torre + 28} 112 ${torre + 40} 128 V150 Z`} fill="#3F5F7A" stroke={AZUL_OSCURO} strokeWidth="2.5" />
      <rect x={torre + 8} y="58" width="40" height="34" fill={BLANCO_IGLESIA} {...trazo} />
      <path d={`M${torre + 18} 90 V74 Q${torre + 28} 62 ${torre + 38} 74 V90 Z`} fill="#3F5F7A" stroke={AZUL_OSCURO} strokeWidth="2.5" />
      {/* Cupulita de azulejos y la cruz */}
      <path d={`M${torre + 6} 58 Q${torre + 8} 26 ${torre + 28} 24 Q${torre + 48} 26 ${torre + 50} 58 Z`} fill={AZULEJO} {...trazo} />
      {[[16, 48], [28, 40], [40, 48], [22, 34], [34, 34]].map(([dx, dy]) => (
        <circle key={`${dx}-${dy}`} cx={torre + dx} cy={dy} r="2" fill="#FFFFFF" />
      ))}
      <path d={`M${torre + 28} 24 V6 M${torre + 22} 12 H${torre + 34}`} stroke={AZUL_OSCURO} strokeWidth="3" strokeLinecap="round" />
    </g>
  )
}

// El gomero de la Recoleta: tronco grueso y retorcido, con muletas,
// y una copa enorme, ancha y achatada (bien distinta a los arbolitos de Palermo)
function Gomero({ x }) {
  return (
    <g>
      <path d={`M${x - 40} 262 L${x - 28} 198 M${x + 42} 262 L${x + 30} 196`} stroke={AZUL_OSCURO} strokeWidth="6" strokeLinecap="round" />
      <path
        d={`M${x - 22} 262 Q${x - 10} 220 ${x - 26} 182 L${x - 6} 176 Q${x} 196 ${x + 8} 176 L${x + 28} 182 Q${x + 12} 220 ${x + 24} 262 Z`}
        fill="#7A5C45"
        {...trazo}
      />
      <g fill="#3F7D4F" stroke={AZUL_OSCURO} strokeWidth="3">
        <ellipse cx={x - 50} cy="168" rx="38" ry="20" />
        <ellipse cx={x + 52} cy="166" rx="40" ry="21" />
        <ellipse cx={x} cy="144" rx="58" ry="30" />
      </g>
      <g fill="#5C9A5A">
        <ellipse cx={x - 16} cy="132" rx="22" ry="9" />
        <ellipse cx={x + 44} cy="158" rx="15" ry="7" />
        <ellipse cx={x - 56} cy="162" rx="13" ry="6" />
      </g>
    </g>
  )
}

// El atrio abierto frente a la iglesia: un murito blanco con reja de hierro
function Atrio({ x, ancho }) {
  const barrotes = []
  for (let bx = x + 6; bx < x + ancho; bx += 9) barrotes.push(bx)
  return (
    <g>
      <rect x={x} y="236" width={ancho} height="26" fill={BLANCO_IGLESIA} {...trazo} />
      <path d={`M${x} 212 H${x + ancho}`} stroke={AZUL_OSCURO} strokeWidth="2.5" />
      {barrotes.map((bx) => (
        <path key={bx} d={`M${bx} 212 V236`} stroke={AZUL_OSCURO} strokeWidth="1.5" />
      ))}
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

// Mesita redonda de café con dos sillas, en la vereda
function MesaDeCafe({ x }) {
  return (
    <g stroke={AZUL_OSCURO} strokeWidth="2.5" strokeLinecap="round">
      <path d={`M${x - 16} 262 V246 M${x - 22} 246 H${x - 12} M${x + 16} 262 V246 M${x + 12} 246 H${x + 22}`} fill="none" />
      <path d={`M${x} 262 V244`} />
      <ellipse cx={x} cy="243" rx="12" ry="3.5" fill={CREMA} />
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
      {/* Una pared continua de fachadas de piedra, todas de la misma familia de colores */}
      <Edificio x={0} ancho={170} alto={182} color="#EFE3C8" />
      <Edificio x={170} ancho={160} alto={168} color="#E6DCCB" balcon={false}>
        <Negocio x={170} ancho={160} cartel="CAFÉ" colorToldo={VERDE_AGUA} />
      </Edificio>
      <Edificio x={330} ancho={140} alto={160} color="#F1E9DA" />
      <Cupula x={400} techo={100} />
      {/* Hueco abierto: el atrio de la iglesia con el gomero */}
      <Atrio x={470} ancho={96} />
      <BasilicaDelPilar x={566} />
      <Edificio x={762} ancho={118} alto={184} color="#D9D0C1" />
      <Edificio x={880} ancho={120} alto={176} color="#EFE3C8" />

      <MesaDeCafe x={208} />
      <MesaDeCafe x={292} />
      <Gomero x={516} />
      <FarolClasico x={166} />
      <FarolClasico x={758} />
      <CartelRecoleta x={940} />
    </svg>
  )
}

export default BarrioRecoleta
