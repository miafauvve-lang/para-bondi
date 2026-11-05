// Las REGLAS de ¡PARÁ, BONDI! (sirven para la práctica y para los tres barrios).
// Acá no hay nada visual: solo números y reglas. Lo que cambia de un nivel a otro
// viene en la "ficha" de cada nivel (game/niveles.js).
// Las posiciones están en % del ancho de la vereda (0 = izquierda, 100 = derecha).

export const TICK = 30 // cada cuántos milisegundos avanza el juego
export const VIDAS_INICIALES = 3
export const VIDAS_MAXIMAS = 3 // los mates no pueden pasar de este número
export const JUGADOR_X = 12 // dónde está parada la corredora
export const VELOCIDAD_BASE = 0.6 // velocidad de Palermo (cuánto avanza todo en cada tick)
// Cuánto tiempo queda en el aire (ms). Como el escenario sigue corriendo,
// más tiempo en el aire = más distancia recorrida por arriba de los obstáculos.
export const DURACION_SALTO = 1150
export const DURACION_MENSAJE = 1200 // cuánto se ven los cartelitos ("¡+1 vida!", "+100")
const X_APARICION = 100 // los obstáculos nacen en el borde derecho
const FIN_DE_OBSTACULOS = 88 // después del 88 % del recorrido ya no aparecen más (se ve la parada)

// ---------- Puntaje ----------
export const PUNTOS_MATE = 50
export const BONUS_POR_VIDA = 500 // al ganar, cada vida que te queda suma esto

// La racha: cuantos más obstáculos esquivás SIN chocar, más vale cada uno.
// 1 a 4 seguidos → x1 · 5 a 9 → x2 · 10 o más → x3. Un choque la vuelve a cero.
export function multiplicador(racha) {
  return Math.min(3, 1 + Math.floor(racha / 5))
}

// ---------- Obstáculos ----------
// "alcance" = cuánto ocupa a cada lado (en %). Si el obstáculo está a menos de
// esa distancia de la corredora y ella está en el piso, choca.
// Los básicos ocupan 5 (como siempre). Más alcance = hay que saltar con más precisión.
const BASICOS = ["baldosa", "perro", "basura", "cono"]

function basicoAlAzar() {
  return BASICOS[Math.floor(Math.random() * BASICOS.length)]
}

// Un "patrón" es lo que viene por la vereda de una vez: uno o más obstáculos.
//   simple   → un obstáculo de los de siempre
//   paseador → un paseador con varios perros: ocupa más vereda (Recoleta en adelante)
//   doble    → dos obstáculos pegados que se saltan de UN salto, bien medido (Retiro)
//   moto     → una moto de delivery que viene más rápido que todo lo demás (Retiro)
// "desfase" = cuánto más atrás viene la segunda pieza del patrón.
// "factor"  = qué tan rápido viene comparado con la vereda (1 = igual).
export const PATRONES = {
  simple: () => [{ tipo: basicoAlAzar(), alcance: 5, puntos: 100, desfase: 0, factor: 1 }],
  paseador: () => [{ tipo: "paseador", alcance: 8, puntos: 200, desfase: 0, factor: 1 }],
  doble: () => [
    { tipo: basicoAlAzar(), alcance: 5, puntos: 100, desfase: 0, factor: 1 },
    { tipo: "cono", alcance: 5, puntos: 100, desfase: 10, factor: 1 },
  ],
  moto: () => [{ tipo: "moto", alcance: 5, puntos: 200, desfase: 0, factor: 1.8 }],
}

// Cuántos ticks tarda una pieza desde que nace hasta llegar a cierta posición
function ticksHasta(pieza, velocidad, xDestino) {
  return (X_APARICION + pieza.desfase - xDestino) / (velocidad * pieza.factor)
}

// Arma el próximo patrón y calcula CUÁNDO tiene que aparecer para llegar
// a la corredora en el momento "llegada". Programar por llegada (y no por
// aparición) hace que la moto, que es más rápida, nunca se "encime" con
// el obstáculo anterior: siempre queda tiempo de piso entre uno y otro.
function planificar(nombrePatron, llegada, velocidad, tipoForzado) {
  const piezas = PATRONES[nombrePatron]()
  if (tipoForzado) piezas[0].tipo = tipoForzado
  const primera = piezas[0]
  const aparece = llegada - ticksHasta(primera, velocidad, JUGADOR_X + primera.alcance) * TICK
  return { patron: nombrePatron, piezas, llegada, aparece }
}

// Cuándo termina de pasar el patrón (la última pieza sale de la zona de la corredora)
function salidaDe(plan, velocidad) {
  return Math.max(
    ...plan.piezas.map(
      (p) => plan.aparece + ticksHasta(p, velocidad, JUGADOR_X - p.alcance) * TICK,
    ),
  )
}

// Elige un patrón al azar según los "pesos" de la ficha del nivel
function patronAlAzar(pesos) {
  const total = Object.values(pesos).reduce((a, b) => a + b, 0)
  let r = Math.random() * total
  for (const [nombre, peso] of Object.entries(pesos)) {
    r -= peso
    if (r < 0) return nombre
  }
  return "simple"
}

// Tiempo de piso entre un patrón y el siguiente. Se achica a medida que
// avanzás DENTRO del nivel ("rampa"): el final de cada barrio es más intenso.
function tiempoDePiso(estado, progreso) {
  const { pisoMinimo, pisoExtra, rampa } = estado.ficha
  const base = pisoMinimo + Math.random() * pisoExtra
  return base * (1 - (rampa * progreso) / 100)
}

// ---------- Estado inicial ----------
// Siempre parte de cero: tiempo 0, vidas completas, sin obstáculos, 0 puntos.
// Así un nivel nuevo (o un reintento) nunca arrastra nada de la partida anterior.
export function crearEstadoInicial(ficha) {
  const estado = {
    ficha,
    tiempo: 0,
    // En la práctica el reloj del recorrido arranca recién con el primer salto
    inicio: ficha.practica ? null : 0,
    progreso: 0,
    vidas: VIDAS_INICIALES,
    obstaculos: [],
    mates: [],
    agenda: [], // los próximos patrones planificados (con cuándo aparecen)
    matesPendientes: [], // cuándo nace cada mate planificado
    patronesCreados: 0,
    guionCargado: false,
    siguienteId: 1,
    saltoHasta: 0,
    golpeHasta: 0,
    mensaje: null, // { texto, hasta, tipo }
    // Puntaje y estadísticas de la partida
    puntos: 0,
    racha: 0,
    mejorRacha: 0,
    esquivados: 0,
    totalObstaculos: 0,
    choques: 0,
    matesJuntados: 0,
    ultimoChoque: null, // con qué chocaste por última vez (para el consejo al perder)
    resultado: null, // null mientras se juega, después "ganaste" o "perdiste"
  }
  if (!ficha.practica) {
    estado.agenda = [planificar("simple", ficha.primeraLlegada, ficha.velocidad)]
  }
  return estado
}

export function estaEnElAire(estado) {
  return estado.tiempo < estado.saltoHasta
}

export function puedeSaltar(estado) {
  return !estaEnElAire(estado)
}

export function esInmune(estado) {
  return estado.tiempo < estado.golpeHasta
}

function tocaALaCorredora(x, alcance) {
  return Math.abs(x - JUGADOR_X) < alcance
}

// ¿Si saltara JUSTO AHORA pasaría por arriba del próximo obstáculo?
// La usa el tutorial para mostrar el cartel "¡AHORA!" (y la simulación de pruebas).
export function saltoSeguroAhora(estado) {
  const v = estado.ficha.velocidad
  const proximas = estado.obstaculos.filter((o) => !o.pasado && !o.golpeo)
  if (proximas.length === 0) return false
  // Las piezas del patrón más cercano (el de menor "patronId" pendiente)
  const patronId = Math.min(...proximas.map((o) => o.patronId))
  const piezas = proximas.filter((o) => o.patronId === patronId)
  return piezas.every((o) => {
    const vel = v * o.factor
    const entra = (o.x - (JUGADOR_X + o.alcance)) / vel // ticks hasta que entra en la zona
    const sale = (o.x - (JUGADOR_X - o.alcance)) / vel // ticks hasta que sale
    return entra >= 0 && (sale + 1) * TICK <= DURACION_SALTO
  })
}

function crearPiezas(plan, patronId, siguienteId) {
  const nuevos = plan.piezas.map((p, i) => ({
    ...p,
    id: siguienteId + i,
    patronId,
    patron: plan.patron,
    x: X_APARICION + p.desfase,
    pasado: false,
    golpeo: false,
    inofensivo: false,
  }))
  return nuevos
}

// El próximo patrón que va a aparecer (lo usa la pantalla para avisar que viene una moto)
export function proximoPatron(estado) {
  return estado.agenda[0] ?? null
}

// ---------- El "reducer" ----------
// Recibe el estado actual y una acción, y devuelve el estado nuevo.
export function actualizarNivel(estado, accion) {
  // Si el nivel ya terminó, no cambia nada más
  if (estado.resultado) return estado

  if (accion.tipo === "saltar") {
    // No se puede saltar si ya está en el aire
    if (!puedeSaltar(estado)) return estado
    const inicio = estado.inicio ?? estado.tiempo // en la práctica, el 1er salto arranca el recorrido
    return { ...estado, inicio, saltoHasta: estado.tiempo + DURACION_SALTO }
  }

  if (accion.tipo !== "tick") return estado

  const ficha = estado.ficha
  const v = ficha.velocidad
  const tiempo = estado.tiempo + TICK
  const enElAire = tiempo < estado.saltoHasta
  let { vidas, golpeHasta, mensaje, puntos, racha, mejorRacha, esquivados, choques, matesJuntados, ultimoChoque } = estado
  const obstaculos = []
  const mates = []

  // 1. Mover los obstáculos hacia la izquierda, revisar choques y sumar puntos
  for (const obstaculo of estado.obstaculos) {
    const x = obstaculo.x - v * obstaculo.factor
    const o = { ...obstaculo, x }
    const toca = tocaALaCorredora(x, o.alcance) && !enElAire
    const inmune = tiempo < golpeHasta

    if (toca && !o.golpeo && !o.inofensivo) {
      if (inmune) {
        // Lo atraviesa mientras parpadea: no hace daño, pero tampoco da puntos
        o.inofensivo = true
      } else {
        // ¡Chocó! Pierde UNA vida (en la práctica no) y la racha vuelve a cero
        if (!ficha.practica) vidas = vidas - 1
        golpeHasta = tiempo + ficha.inmunidad
        choques = choques + 1
        racha = 0
        ultimoChoque = o.patron === "doble" ? "doble" : o.tipo
        o.golpeo = true
        mensaje = ficha.practica
          ? { texto: "¡Uy! Probá saltar un toque antes", hasta: tiempo + 1600, tipo: "error" }
          : mensaje
      }
    }

    // ¿Ya lo dejó atrás sin chocarlo? Suma puntos (multiplicados por la racha)
    if (!o.pasado && x < JUGADOR_X - o.alcance) {
      o.pasado = true
      if (!o.golpeo && !o.inofensivo) {
        racha = racha + 1
        mejorRacha = Math.max(mejorRacha, racha)
        esquivados = esquivados + 1
        const mult = multiplicador(racha)
        puntos = puntos + o.puntos * mult
        mensaje = {
          texto: mult > 1 ? `+${o.puntos * mult}  x${mult}` : `+${o.puntos}`,
          hasta: tiempo + 700,
          tipo: "puntos",
        }
      }
    }

    // El obstáculo que chocó desaparece; los demás siguen hasta salir de pantalla
    if (!o.golpeo && x > -15) obstaculos.push(o)
  }

  // 2. Mover los mates y ver si agarró alguno (en el piso o saltando)
  for (const mate of estado.mates) {
    const x = mate.x - v
    if (tocaALaCorredora(x, 5) && vidas > 0) {
      matesJuntados = matesJuntados + 1
      puntos = puntos + PUNTOS_MATE
      if (vidas < VIDAS_MAXIMAS && !ficha.practica) {
        vidas = vidas + 1
        mensaje = { texto: "¡+1 vida!", hasta: tiempo + DURACION_MENSAJE, tipo: "vida" }
      } else {
        mensaje = { texto: `+${PUNTOS_MATE}`, hasta: tiempo + 700, tipo: "puntos" }
      }
    } else if (x > -10) {
      mates.push({ ...mate, x })
    }
  }

  // 3. Avance del recorrido
  const inicio = estado.inicio
  const progreso = inicio === null ? 0 : Math.min(100, ((tiempo - inicio) / ficha.duracion) * 100)

  // 4. Crear obstáculos y mates nuevos
  let { agenda, matesPendientes, patronesCreados, guionCargado, siguienteId } = estado
  let totalObstaculos = estado.totalObstaculos

  // En la práctica los obstáculos siguen un guion fijo (siempre el mismo orden).
  // Se carga entero apenas la jugadora hace su primer salto.
  if (ficha.practica && inicio !== null && !guionCargado) {
    guionCargado = true
    agenda = []
    for (const paso of ficha.guion) {
      if (paso.mate) {
        matesPendientes = [...matesPendientes, inicio + paso.en - ((X_APARICION - JUGADOR_X) / v) * TICK]
      } else {
        agenda.push(planificar(paso.patron, inicio + paso.en, v, paso.tipo))
      }
    }
  }

  while (agenda.length > 0 && tiempo >= agenda[0].aparece && (ficha.practica || progreso < FIN_DE_OBSTACULOS)) {
    const plan = agenda[0]
    agenda = agenda.slice(1)
    const nuevos = crearPiezas(plan, patronesCreados + 1, siguienteId)
    obstaculos.push(...nuevos)
    siguienteId = siguienteId + nuevos.length
    totalObstaculos = totalObstaculos + nuevos.length
    patronesCreados = patronesCreados + 1

    if (!ficha.practica) {
      // El próximo patrón llega después de un "tiempo de piso" para aterrizar y prepararse
      const salida = salidaDe(plan, v)
      // Al principio de cada barrio, lo nuevo aparece enseguida (ficha.presentar),
      // así se aprende antes de que se mezcle con todo lo demás. Después, al azar.
      const nombre = ficha.presentar?.[patronesCreados] ?? patronAlAzar(ficha.patrones)
      const proximo = planificar(nombre, salida + tiempoDePiso(estado, progreso), v)
      agenda = [proximo]

      // Cada tantos patrones, un mate justo en el medio del hueco: se agarra corriendo
      if (patronesCreados % ficha.patronesPorMate === 0) {
        const medio = (salida + proximo.llegada) / 2
        matesPendientes = [...matesPendientes, medio - ((X_APARICION - JUGADOR_X) / v) * TICK]
      }
    }
  }

  const quedan = []
  for (const nace of matesPendientes) {
    if (tiempo >= nace) {
      mates.push({ id: siguienteId, x: X_APARICION })
      siguienteId = siguienteId + 1
    } else {
      quedan.push(nace)
    }
  }
  matesPendientes = quedan

  if (mensaje && tiempo >= mensaje.hasta) mensaje = null

  // 5. ¿Ganó o perdió?
  let resultado = null
  if (vidas <= 0) resultado = "perdiste"
  else if (progreso >= 100) resultado = "ganaste"

  return {
    ...estado,
    tiempo,
    progreso,
    vidas,
    obstaculos,
    mates,
    agenda,
    matesPendientes,
    patronesCreados,
    guionCargado,
    siguienteId,
    golpeHasta,
    mensaje,
    puntos,
    racha,
    mejorRacha,
    esquivados,
    totalObstaculos,
    choques,
    matesJuntados,
    ultimoChoque,
    resultado,
  }
}

// ---------- Puntaje final ----------
// Al ganar se suma un bonus por cada vida que te quedó, y las estrellas
// son las vidas con las que llegaste (1, 2 o 3). Al perder: 0 estrellas.
export function calcularResumen(estado) {
  const gano = estado.resultado === "ganaste"
  const bonusVidas = gano ? estado.vidas * BONUS_POR_VIDA : 0
  return {
    resultado: estado.resultado,
    puntos: estado.puntos,
    bonusVidas,
    total: estado.puntos + bonusVidas,
    estrellas: gano ? estado.vidas : 0,
    vidas: estado.vidas,
    esquivados: estado.esquivados,
    totalObstaculos: estado.totalObstaculos,
    matesJuntados: estado.matesJuntados,
    mejorRacha: estado.mejorRacha,
    choques: estado.choques,
    progreso: Math.round(estado.progreso),
    ultimoChoque: estado.ultimoChoque,
  }
}
