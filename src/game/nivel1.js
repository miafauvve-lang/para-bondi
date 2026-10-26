// Lógica de los niveles de ¡PARÁ, BONDI! (Palermo y Recoleta usan las mismas reglas).
// Acá no hay nada visual: solo las reglas del juego.
// Lo que cambia de un nivel a otro (velocidad y separación de obstáculos)
// viene en la "ficha" de cada nivel, en game/niveles.js.
// Las posiciones están en % del ancho de la vereda (0 = izquierda, 100 = derecha).

export const TICK = 30 // cada cuántos milisegundos avanza el juego
export const DURACION_NIVEL = 25000 // el nivel dura 25 segundos
export const VIDAS_INICIALES = 3
export const VIDAS_MAXIMAS = 3 // los mates no pueden pasar de este número
export const JUGADOR_X = 12 // dónde está parada la corredora
export const VELOCIDAD = 0.6 // cuánto se mueven los obstáculos en cada tick (Palermo)
// Cuánto tiempo queda en el aire (ms). Como el escenario sigue corriendo,
// más tiempo en el aire = más distancia recorrida por arriba de los obstáculos.
export const DURACION_SALTO = 1150
export const DURACION_INMUNIDAD = 2000 // después de chocar, 2 s sin perder vidas
export const DURACION_MENSAJE = 1200 // cuánto se ve el cartelito "¡+1 vida!" (ms)

// Tiempo entre un obstáculo y el siguiente: entre 1,8 y 2,6 segundos,
// así hay tiempo de aterrizar y prepararse para el próximo salto.
export const ESPERA_MINIMA = 1800
export const ESPERA_EXTRA = 800

// Cada cuántos obstáculos aparece un mate, en el hueco hasta el siguiente
// (Palermo y Recoleta; cada nivel lo puede cambiar en su ficha)
export const OBSTACULOS_POR_MATE = 2

// Cada tipo tiene su dibujo en components/ilustraciones/Obstaculo.jsx
const TIPOS_OBSTACULO = ["baldosa", "perro", "basura", "cono"]

export const estadoInicial = {
  tiempo: 0,
  progreso: 0,
  vidas: VIDAS_INICIALES,
  obstaculos: [],
  mates: [],
  proximoObstaculo: 1500, // el primero aparece al segundo y medio
  proximoMate: null, // cuándo aparece el próximo mate (null = ninguno en camino)
  obstaculosCreados: 0,
  siguienteId: 1,
  saltoHasta: 0,
  golpeHasta: 0,
  mensajeHasta: 0,
  resultado: null, // null mientras se juega, después "ganaste" o "perdiste"
}

// Arma el estado del comienzo de un nivel a partir de su ficha.
// Siempre parte de estadoInicial: tiempo 0, vidas completas, sin obstáculos.
// Así un nivel nuevo nunca arrastra nada de la partida anterior.
export function crearEstadoInicial(nivel) {
  return {
    ...estadoInicial,
    velocidad: nivel.velocidad,
    esperaMinima: nivel.esperaMinima,
    esperaExtra: nivel.esperaExtra,
    obstaculosPorMate: nivel.obstaculosPorMate ?? OBSTACULOS_POR_MATE,
  }
}

export function estaEnElAire(estado) {
  return estado.tiempo < estado.saltoHasta
}

export function esInmune(estado) {
  return estado.tiempo < estado.golpeHasta
}

// ¿Este objeto está a la altura de la corredora?
function tocaALaCorredora(x) {
  return x > JUGADOR_X - 5 && x < JUGADOR_X + 5
}

// El "reducer": recibe el estado actual y una acción, y devuelve el estado nuevo.
export function actualizarNivel(estado, accion) {
  // Si el nivel ya terminó, no cambia nada más
  if (estado.resultado) return estado

  if (accion.tipo === "saltar") {
    // No se puede saltar si ya está en el aire
    if (estaEnElAire(estado)) return estado
    return { ...estado, saltoHasta: estado.tiempo + DURACION_SALTO }
  }

  if (accion.tipo === "tick") {
    const tiempo = estado.tiempo + TICK
    const enElAire = tiempo < estado.saltoHasta
    let vidas = estado.vidas
    let golpeHasta = estado.golpeHasta
    let mensajeHasta = estado.mensajeHasta
    const obstaculos = []
    const mates = []

    // 1. Mover los obstáculos hacia la izquierda y revisar choques
    for (const obstaculo of estado.obstaculos) {
      const x = obstaculo.x - estado.velocidad
      const toca = tocaALaCorredora(x) && !enElAire
      const inmune = tiempo < golpeHasta

      if (toca && !inmune && !obstaculo.inofensivo) {
        vidas = vidas - 1 // ¡chocó! pierde UNA vida y el obstáculo desaparece
        golpeHasta = tiempo + DURACION_INMUNIDAD
      } else if (x > -10) {
        // Si la atraviesa mientras es inmune, ese obstáculo ya no le hace nada
        // (así no le saca una vida justo cuando se termina la inmunidad)
        const inofensivo = obstaculo.inofensivo || (toca && inmune)
        obstaculos.push({ ...obstaculo, x, inofensivo }) // sigue en pantalla
      }
    }

    // 2. Mover los mates y ver si agarró alguno (en el piso o saltando)
    for (const mate of estado.mates) {
      const x = mate.x - estado.velocidad
      if (tocaALaCorredora(x) && vidas > 0) {
        if (vidas < VIDAS_MAXIMAS) {
          vidas = vidas + 1
          mensajeHasta = tiempo + DURACION_MENSAJE
        }
        // El mate desaparece al agarrarlo, aunque tenga las vidas completas
      } else if (x > -10) {
        mates.push({ ...mate, x })
      }
    }

    // 3. Crear obstáculos y mates nuevos (menos al final, cerca de la parada)
    const progreso = Math.min(100, (tiempo / DURACION_NIVEL) * 100)
    let proximoObstaculo = estado.proximoObstaculo
    let proximoMate = estado.proximoMate
    let obstaculosCreados = estado.obstaculosCreados
    let siguienteId = estado.siguienteId

    if (tiempo >= proximoObstaculo && progreso < 88) {
      const tipo = TIPOS_OBSTACULO[Math.floor(Math.random() * TIPOS_OBSTACULO.length)]
      obstaculos.push({ id: siguienteId, x: 100, tipo })
      siguienteId = siguienteId + 1
      obstaculosCreados = obstaculosCreados + 1
      proximoObstaculo = tiempo + estado.esperaMinima + Math.random() * estado.esperaExtra

      // El mate sale justo en la mitad del hueco entre dos obstáculos:
      // lejos de los dos, así se agarra corriendo sin chocar nada
      if (obstaculosCreados % estado.obstaculosPorMate === 0) {
        proximoMate = tiempo + (proximoObstaculo - tiempo) / 2
      }
    }

    if (proximoMate !== null && tiempo >= proximoMate) {
      mates.push({ id: siguienteId, x: 100 })
      siguienteId = siguienteId + 1
      proximoMate = null
    }

    // 4. ¿Ganó o perdió?
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
      proximoObstaculo,
      proximoMate,
      obstaculosCreados,
      siguienteId,
      golpeHasta,
      mensajeHasta,
      resultado,
    }
  }

  return estado
}
