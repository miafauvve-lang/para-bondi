// Fondo del nivel 3: Retiro.
// A diferencia de las cuadras de Palermo y Recoleta, acá el paisaje se abre:
// una plaza con pasto, caminos, bancos y jacarandás violetas, la Torre Monumental
// de ladrillo con su reloj y su cúpula verde, y la estación de tren, larga y baja,
// con la gran nave de hierro y vidrio asomando atrás.
// Mismo trazo y paleta que los otros barrios, y empalma consigo mismo
// (los dos bordes son plaza) para poder repetirlo sin cortes.
import { AZUL_OSCURO, CREMA } from "./colores"

const trazo = { stroke: AZUL_OSCURO, strokeWidth: 3, strokeLinejoin: "round" }

const PASTO = "#8CC46A"
const LADRILLO = "#C0643E"
const PIEDRA = "#EFE3C8"
const COBRE = "#4FA58C" // el verde de las cúpulas de cobre viejo
const PIZARRA = "#5E7690"
const VIDRIO = "#BFE3F2"
const HIERRO = "#8FA6B8"

// Un tramo de plaza: lomita de pasto con un caminito de tierra
function Pasto({ x, ancho }) {
  return (
    <g>
      <path d={`M${x} 262 V238 Q${x + ancho / 2} 226 ${x + ancho} 238 V262 Z`} fill={PASTO} {...trazo} />
      {ancho > 100 && (
        <path
          d={`M${x + ancho * 0.2} 262 Q${x + ancho * 0.35} 246 ${x + ancho * 0.55} 244 Q${x + ancho * 0.75} 242 ${x + ancho * 0.8} 262 Z`}
          fill="#E8D5B0"
          stroke={AZUL_OSCURO}
          strokeWidth="2"
        />
      )}
    </g>
  )
}

// Jacarandá en flor: copa violeta, el árbol de la primavera porteña
function Jacaranda({ x, alto = 1 }) {
  const copa = 262 - 112 * alto
  return (
    <g>
      <path d={`M${x} 262 V${copa + 24}`} stroke={AZUL_OSCURO} strokeWidth="12" strokeLinecap="round" />
      <path d={`M${x} 262 V${copa + 24}`} stroke="#8B5A2B" strokeWidth="7" strokeLinecap="round" />
      <path d={`M${x} ${copa + 40} L${x - 16} ${copa + 22} M${x} ${copa + 34} L${x + 18} ${copa + 18}`} stroke="#8B5A2B" strokeWidth="5" strokeLinecap="round" />
      <g fill="#9B72CF" stroke={AZUL_OSCURO} strokeWidth="3">
        <ellipse cx={x - 30} cy={copa + 12} rx="30" ry="22" />
        <ellipse cx={x + 30} cy={copa + 10} rx="32" ry="23" />
        <ellipse cx={x} cy={copa - 6} rx="36" ry="26" />
      </g>
      <g fill="#C3A3EE">
        <circle cx={x - 12} cy={copa - 14} r="9" />
        <circle cx={x + 26} cy={copa + 2} r="7" />
        <circle cx={x - 34} cy={copa + 8} r="6" />
      </g>
    </g>
  )
}

// Banco de plaza, de madera verde
function Banco({ x }) {
  return (
    <g stroke={AZUL_OSCURO} strokeWidth="2.5" strokeLinecap="round">
      <rect x={x - 22} y="236" width="44" height="6" rx="2" fill="#3F7D63" />
      <rect x={x - 22} y="226" width="44" height="6" rx="2" fill="#3F7D63" />
      <path d={`M${x - 18} 242 V252 M${x + 18} 242 V252`} fill="none" />
    </g>
  )
}

// Farol de plaza de tres luces
function FarolDePlaza({ x }) {
  return (
    <g>
      <path d={`M${x - 8} 262 h16 l-3 -10 h-10 z`} fill={AZUL_OSCURO} />
      <path d={`M${x} 254 V160 M${x - 16} 168 Q${x} 156 ${x + 16} 168`} fill="none" stroke={AZUL_OSCURO} strokeWidth="4" />
      {[-16, 0, 16].map((dx) => (
        <circle key={dx} cx={x + dx} cy={dx === 0 ? 150 : 162} r="7" fill="#FFE8AF" stroke={AZUL_OSCURO} strokeWidth="2.5" />
      ))}
    </g>
  )
}

// La Torre Monumental: base de piedra, cuerpo de ladrillo con esquinas blancas,
// el reloj, una galería con arcos y la cúpula de cobre verde
function TorreMonumental({ x }) {
  const esquinas = []
  for (let y = 104; y < 210; y += 14) esquinas.push(y)
  return (
    <g>
      {/* Base de piedra con la puerta */}
      <rect x={x - 42} y="214" width="84" height="48" fill={PIEDRA} {...trazo} />
      <path d={`M${x - 12} 262 V238 Q${x} 224 ${x + 12} 238 V262 Z`} fill="#3F5F7A" stroke={AZUL_OSCURO} strokeWidth="2.5" />

      {/* Cuerpo de ladrillo */}
      <rect x={x - 30} y="100" width="60" height="114" fill={LADRILLO} {...trazo} />
      {esquinas.map((y) => (
        <g key={y} fill={PIEDRA} stroke={AZUL_OSCURO} strokeWidth="1.5">
          <rect x={x - 30} y={y} width="9" height="7" />
          <rect x={x + 21} y={y} width="9" height="7" />
        </g>
      ))}
      <rect x={x - 32} y="160" width="64" height="6" fill={PIEDRA} stroke={AZUL_OSCURO} strokeWidth="2" />
      <rect x={x - 8} y="122" width="16" height="30" rx="6" fill={VIDRIO} stroke={AZUL_OSCURO} strokeWidth="2" />
      <rect x={x - 8} y="176" width="16" height="26" rx="6" fill={VIDRIO} stroke={AZUL_OSCURO} strokeWidth="2" />

      {/* Piso del reloj */}
      <rect x={x - 36} y="62" width="72" height="40" fill={PIEDRA} {...trazo} />
      <circle cx={x} cy="82" r="15" fill="#FFFFFF" stroke={AZUL_OSCURO} strokeWidth="3" />
      <path d={`M${x} 82 V72 M${x} 82 L${x + 7} 86`} stroke={AZUL_OSCURO} strokeWidth="2.5" strokeLinecap="round" />

      {/* Galería con arcos */}
      <rect x={x - 26} y="36" width="52" height="28" fill={LADRILLO} {...trazo} />
      {[-12, 12].map((dx) => (
        <path
          key={dx}
          d={`M${x + dx - 7} 62 V48 Q${x + dx} 40 ${x + dx + 7} 48 V62 Z`}
          fill="#3F5F7A"
          stroke={AZUL_OSCURO}
          strokeWidth="2"
        />
      ))}
      <rect x={x - 30} y="32" width="60" height="7" fill={PIEDRA} stroke={AZUL_OSCURO} strokeWidth="2" />

      {/* Cúpula de cobre, linterna y veleta */}
      <path d={`M${x - 24} 33 Q${x - 22} 10 ${x} 10 Q${x + 22} 10 ${x + 24} 33 Z`} fill={COBRE} {...trazo} />
      <path d={`M${x - 10} 30 Q${x - 10} 16 ${x - 2} 14`} fill="none" stroke="#7CC7AE" strokeWidth="3" strokeLinecap="round" />
      <path d={`M${x} 10 V1`} stroke={AZUL_OSCURO} strokeWidth="3" strokeLinecap="round" />
    </g>
  )
}

// Ventanal en arco de la estación
function Arco({ x, y, ancho, alto, color = VIDRIO }) {
  return (
    <path
      d={`M${x} ${y + alto} V${y + ancho / 2} Q${x + ancho / 2} ${y - ancho / 6} ${x + ancho} ${y + ancho / 2} V${y + alto} Z`}
      fill={color}
      stroke={AZUL_OSCURO}
      strokeWidth="2.5"
    />
  )
}

// La estación de tren: nave de hierro y vidrio atrás, fachada larga de piedra
// con arcos, pabellones en las puntas y el reloj en el centro
function Estacion({ x, ancho }) {
  const centro = x + ancho / 2
  const costillas = []
  for (let cx = x + 50; cx < x + ancho - 40; cx += 34) costillas.push(cx)
  const arcosAla = []
  for (let ax = x + 74; ax < x + ancho - 74; ax += 42) {
    if (Math.abs(ax + 13 - centro) > 70) arcosAla.push(ax)
  }

  return (
    <g>
      {/* La gran nave de los andenes, con techo de bóveda */}
      <path d={`M${x + 30} 170 V130 Q${centro} 30 ${x + ancho - 30} 130 V170 Z`} fill={HIERRO} {...trazo} />
      {costillas.map((cx) => (
        <path key={cx} d={`M${cx} 170 V100`} stroke={AZUL_OSCURO} strokeWidth="1.5" opacity="0.5" />
      ))}
      <path d={`M${x + 60} 118 Q${centro} 52 ${x + ancho - 60} 118`} fill="none" stroke={VIDRIO} strokeWidth="6" />

      {/* Fachada larga */}
      <rect x={x} y="150" width={ancho} height="112" fill={PIEDRA} {...trazo} />
      <rect x={x - 4} y="146" width={ancho + 8} height="9" fill={CREMA} {...trazo} />
      {arcosAla.map((ax) => (
        <g key={ax}>
          <Arco x={ax} y={168} ancho={26} alto={34} />
          <Arco x={ax} y={222} ancho={26} alto={40} color="#3F5F7A" />
        </g>
      ))}

      {/* Pabellones de las puntas, con techo de pizarra */}
      {[x, x + ancho - 64].map((px) => (
        <g key={px}>
          <path d={`M${px - 2} 120 L${px + 10} 96 H${px + 54} L${px + 66} 120 Z`} fill={PIZARRA} {...trazo} />
          <rect x={px} y="120" width="64" height="142" fill="#E6DCCB" {...trazo} />
          <Arco x={px + 19} y={140} ancho={26} alto={40} />
          <Arco x={px + 19} y={214} ancho={26} alto={48} color="#3F5F7A" />
        </g>
      ))}

      {/* Cuerpo central con el reloj y el gran ventanal */}
      <path d={`M${centro - 64} 128 L${centro} 104 L${centro + 64} 128 Z`} fill={PIEDRA} {...trazo} />
      <rect x={centro - 60} y="128" width="120" height="134" fill="#E6DCCB" {...trazo} />
      <circle cx={centro} cy="118" r="9" fill="#FFFFFF" stroke={AZUL_OSCURO} strokeWidth="2.5" />
      <path d={`M${centro} 118 V112 M${centro} 118 L${centro + 4} 121`} stroke={AZUL_OSCURO} strokeWidth="2" strokeLinecap="round" />
      <rect x={centro - 52} y="136" width="104" height="18" rx="3" fill={AZUL_OSCURO} />
      <text
        x={centro}
        y="149.5"
        textAnchor="middle"
        fontSize="11"
        fontWeight="800"
        fill={CREMA}
        fontFamily="Verdana, sans-serif"
        letterSpacing="1"
      >
        RETIRO
      </text>
      <Arco x={centro - 34} y={164} ancho={68} alto={98} />
      <path d={`M${centro} 166 V262 M${centro - 34} 214 H${centro + 34}`} stroke={AZUL_OSCURO} strokeWidth="2" />
    </g>
  )
}

function BarrioRetiro() {
  return (
    <svg viewBox="0 0 1000 262" preserveAspectRatio="none" className="barrio-dibujo" aria-hidden="true">
      {/* La plaza: de x=0 a 440 y de 960 a 1000 (empalma con el principio) */}
      <Pasto x={-4} ancho={448} />
      <Pasto x={956} ancho={48} />

      <Jacaranda x={62} />
      <Banco x={140} />
      <TorreMonumental x={252} />
      <FarolDePlaza x={178} />
      <Jacaranda x={372} alto={0.9} />

      <Estacion x={450} ancho={500} />
    </svg>
  )
}

export default BarrioRetiro
