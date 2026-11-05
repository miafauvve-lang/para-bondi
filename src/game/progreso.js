// Guarda el avance en el navegador (localStorage), así si recargás la página
// o volvés otro día no perdés los barrios desbloqueados ni tus récords.
// Cada jugador (nombre) tiene su propio avance.
// Todo va dentro de try/catch: si el navegador no deja guardar (modo incógnito
// estricto, por ejemplo) el juego sigue funcionando igual, solo que sin memoria.

const CLAVE = "para-bondi-progreso"

export const PERFIL_VACIO = {
  nivelMaximo: 1, // hasta qué nivel está desbloqueado
  records: {}, // { palermo: { total, estrellas }, ... }
  tutorialVisto: false,
}

function leerTodo() {
  try {
    const guardado = JSON.parse(localStorage.getItem(CLAVE))
    if (guardado && typeof guardado === "object" && guardado.jugadores) return guardado
  } catch {
    // dato roto o sin acceso: arrancamos de cero
  }
  return { jugadorActual: "", jugadores: {} }
}

function guardarTodo(datos) {
  try {
    localStorage.setItem(CLAVE, JSON.stringify(datos))
  } catch {
    // sin acceso al almacenamiento: no pasa nada, solo no se guarda
  }
}

// El último jugador que entró (para el botón "Seguir como...")
export function leerJugadorActual() {
  return leerTodo().jugadorActual
}

export function leerPerfil(nombre) {
  if (!nombre) return PERFIL_VACIO
  return { ...PERFIL_VACIO, ...leerTodo().jugadores[nombre] }
}

export function guardarPerfil(nombre, perfil) {
  if (!nombre) return
  const datos = leerTodo()
  datos.jugadorActual = nombre
  datos.jugadores[nombre] = perfil
  guardarTodo(datos)
}

// Suma de los mejores puntajes y estrellas de todos los barrios
export function totales(perfil) {
  const records = Object.values(perfil.records)
  return {
    puntos: records.reduce((suma, r) => suma + r.total, 0),
    estrellas: records.reduce((suma, r) => suma + r.estrellas, 0),
  }
}
