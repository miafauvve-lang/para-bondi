// Simulación de dificultad de ¡PARÁ, BONDI!
// Juega miles de partidas "de mentira" con distintos tipos de jugador
// y mide cuántas gana en cada nivel. Sirve para comprobar que:
//   - la dificultad sube de verdad de un nivel a otro,
//   - no se puede ganar sin saltar ni apretando el botón sin parar,
//   - con buena puntería, cada nivel se puede ganar.
// Uso: node scripts/simular-dificultad.mjs
import { crearEstadoInicial, actualizarNivel, puedeSaltar, calcularResumen, TICK, DURACION_SALTO, JUGADOR_X } from "../src/game/reglas.js"
import { NIVELES, PRACTICA } from "../src/game/niveles.js"

function gauss() {
  let u = 0, v = 0
  while (u === 0) u = Math.random()
  while (v === 0) v = Math.random()
  return Math.sqrt(-2 * Math.log(u)) * Math.cos(2 * Math.PI * v)
}

// Ventana para saltar el patrón: [lo más temprano, lo más tarde] en ms absolutos
function ventana(estado, patronId) {
  const piezas = estado.obstaculos.filter((o) => o.patronId === patronId)
  const v = estado.ficha.velocidad
  let entra = Infinity, sale = -Infinity
  for (const o of piezas) {
    const vel = v * o.factor
    entra = Math.min(entra, estado.tiempo + ((o.x - (JUGADOR_X + o.alcance)) / vel) * TICK)
    sale = Math.max(sale, estado.tiempo + ((o.x - (JUGADOR_X - o.alcance)) / vel) * TICK)
  }
  return { temprano: sale - DURACION_SALTO + TICK, tarde: entra - TICK }
}

function jugar(ficha, tipo, sigma = 0) {
  let estado = crearEstadoInicial(ficha)
  let atendido = 0 // último patrón para el que ya se decidió el salto
  let objetivo = null
  if (ficha.practica) estado = actualizarNivel(estado, { tipo: "saltar" })
  while (!estado.resultado && estado.tiempo < 120000) {
    if (tipo === "spam") {
      estado = actualizarNivel(estado, { tipo: "saltar" })
    } else if (tipo === "machaca") {
      // Una persona que aprieta sin mirar, más o menos cada 0,15 a 0,35 s
      if (objetivo === null) objetivo = { t: estado.tiempo + 150 + Math.random() * 200 }
      if (estado.tiempo >= objetivo.t) {
        estado = actualizarNivel(estado, { tipo: "saltar" })
        objetivo = null
      }
    } else if (tipo === "humano") {
      const pendientes = estado.obstaculos.filter((o) => o.patronId > atendido && !o.pasado)
      if (objetivo === null && pendientes.length > 0) {
        const id = Math.min(...pendientes.map((o) => o.patronId))
        const w = ventana(estado, id)
        objetivo = { id, t: (w.temprano + w.tarde) / 2 + gauss() * sigma }
      }
      if (objetivo && estado.tiempo >= objetivo.t && puedeSaltar(estado)) {
        estado = actualizarNivel(estado, { tipo: "saltar" })
        atendido = objetivo.id
        objetivo = null
      }
    }
    estado = actualizarNivel(estado, { tipo: "tick" })
  }
  return calcularResumen(estado)
}

const N = Number(process.argv[2] ?? 2000)
const jugadores = [
  ["nunca salta", "nunca", 0],
  ["bot que aprieta sin parar", "spam", 0],
  ["persona que machaca sin mirar", "machaca", 0],
  ["humano con buena puntería (±60 ms)", "humano", 60],
  ["humano promedio (±110 ms)", "humano", 110],
  ["humano novato (±160 ms)", "humano", 160],
  ["humano muy novato (±220 ms)", "humano", 220],
]

for (const ficha of [PRACTICA, ...NIVELES]) {
  console.log(`\n== ${ficha.nombre} ==`)
  for (const [nombre, tipo, sigma] of jugadores) {
    let ganadas = 0, puntos = 0, choques = 0, obst = 0
    for (let i = 0; i < N; i++) {
      const r = jugar(ficha, tipo, sigma)
      if (r.resultado === "ganaste") ganadas++
      puntos += r.total
      choques += r.choques
      obst += r.totalObstaculos
    }
    console.log(
      `${nombre.padEnd(38)} gana ${String(Math.round((ganadas / N) * 100)).padStart(3)} %` +
        ` · choques ${(choques / N).toFixed(1)} · obstáculos ${(obst / N).toFixed(1)} · puntaje ${Math.round(puntos / N)}`,
    )
  }
}
