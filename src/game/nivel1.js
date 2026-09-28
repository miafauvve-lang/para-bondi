// Lógica del Nivel 1 de ¡PARÁ, BONDI!
// Acá no hay nada visual: solo las reglas del juego.
// Las posiciones están en % del ancho de la vereda (0 = izquierda, 100 = derecha).

export const TICK = 30 // cada cuántos milisegundos avanza el juego
export const DURACION_NIVEL = 25000 // el nivel dura 25 segundos
export const VIDAS_INICIALES = 3
export const JUGADOR_X = 12 // dónde está parada la corredora
export const VELOCIDAD = 0.6 // cuánto se mueven los obstáculos en cada tick
export const DURACION_SALTO = 800 // cuánto tiempo queda en el aire (ms)
export const DURACION_GOLPE = 700 // cuánto parpadea después de chocar (ms)

const TIPOS_OBSTACULO = ["🧉", "🐕", "🚧", "🛴"]

export const estadoInicial = {
  tiempo: 0,
  progreso: 0,
  vidas: VIDAS_INICIALES,
  obstaculos: [],
  proximoObstaculo: 1500, // el primero aparece al segundo y medio
  siguienteId: 1,
  saltoHasta: 0,
  golpeHasta: 0,
  resultado: null, // null mientras se juega, después "ganaste" o "perdiste"
}

export function estaEnElAire(estado) {
  return estado.tiempo < estado.saltoHasta
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
    const obstaculos = []

    // 1. Mover los obstáculos hacia la izquierda y revisar choques
    for (const obstaculo of estado.obstaculos) {
      const x = obstaculo.x - VELOCIDAD
      const estaEncima = x > JUGADOR_X - 5 && x < JUGADOR_X + 5

      if (estaEncima && !enElAire) {
        vidas = vidas - 1 // ¡chocó! pierde una vida y el obstáculo desaparece
        golpeHasta = tiempo + DURACION_GOLPE
      } else if (x > -10) {
        obstaculos.push({ ...obstaculo, x }) // sigue en pantalla
      }
    }

    // 2. Crear un obstáculo nuevo cada tanto (menos al final, cerca de la parada)
    const progreso = Math.min(100, (tiempo / DURACION_NIVEL) * 100)
    let proximoObstaculo = estado.proximoObstaculo
    let siguienteId = estado.siguienteId

    if (tiempo >= proximoObstaculo && progreso < 88) {
      const emoji = TIPOS_OBSTACULO[Math.floor(Math.random() * TIPOS_OBSTACULO.length)]
      obstaculos.push({ id: siguienteId, x: 100, emoji })
      siguienteId = siguienteId + 1
      // El próximo aparece entre 1,1 y 2 segundos después
      proximoObstaculo = tiempo + 1100 + Math.random() * 900
    }

    // 3. ¿Ganó o perdió?
    let resultado = null
    if (vidas <= 0) resultado = "perdiste"
    else if (progreso >= 100) resultado = "ganaste"

    return {
      ...estado,
      tiempo,
      progreso,
      vidas,
      obstaculos,
      proximoObstaculo,
      siguienteId,
      golpeHasta,
      resultado,
    }
  }

  return estado
}
