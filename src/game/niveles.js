// La "ficha" de cada nivel: qué lo diferencia de los otros.
// Las reglas (saltar, chocar, mates, puntos, ganar o perder) son las mismas
// para todos y están en game/reglas.js. Acá solo se ajusta la dificultad.
//
// Qué significa cada dato:
//   duracion        → cuánto dura el recorrido hasta la parada (ms)
//   velocidad       → qué tan rápido viene todo (Palermo = 0.6)
//   pisoMinimo/Extra→ tiempo "en el piso" entre un obstáculo y el siguiente:
//                     entre pisoMinimo y pisoMinimo + pisoExtra (ms)
//   rampa           → cuánto se achica ese tiempo hacia el final del nivel
//                     (0.2 = al llegar a la parada hay un 20 % menos de respiro)
//   patrones        → qué cosas pueden venir y con qué frecuencia (pesos)
//   presentar       → los primeros patrones del nivel, en orden (para mostrar lo nuevo)
//   patronesPorMate → cada cuántos obstáculos aparece un mate
//   inmunidad       → cuánto parpadea (sin perder vidas) después de un choque
//
// El orden de la lista NIVELES es el orden en que se juegan.
// Los números se ajustaron con la simulación de scripts/simular-dificultad.mjs.

import { VELOCIDAD_BASE } from "./reglas.js"

export const PALERMO = {
  numero: 1,
  id: "palermo",
  nombre: "PALERMO",
  barrio: "Palermo",
  // El nivel que el profe ya probó: mismo ritmo de siempre
  duracion: 25000,
  velocidad: VELOCIDAD_BASE,
  primeraLlegada: 5650,
  pisoMinimo: 1300,
  pisoExtra: 800,
  rampa: 0,
  patrones: { simple: 1 },
  patronesPorMate: 2,
  inmunidad: 2000,
  // Textos para el selector de niveles y las transiciones
  lema: "Plazas, perros sueltos y baldosas flojas.",
  novedad: "Los obstáculos de siempre de la vereda porteña.",
  consejo: "Saltá cuando el obstáculo esté a un par de pasos.",
  dificultad: 1,
}

export const RECOLETA = {
  numero: 2,
  id: "recoleta",
  nombre: "RECOLETA",
  barrio: "Recoleta",
  duracion: 30000,
  velocidad: 0.66,
  primeraLlegada: 4300,
  pisoMinimo: 1050,
  pisoExtra: 650,
  rampa: 0.2,
  // 2 de cada 5 cosas que vienen es un paseador de perros
  patrones: { simple: 3, paseador: 2 },
  // El 2º obstáculo del nivel es un paseador: lo nuevo se presenta enseguida
  presentar: ["simple", "paseador"],
  patronesPorMate: 4,
  inmunidad: 1600,
  lema: "Veredas anchas... llenas de paseadores de perros.",
  novedad: "Paseadores con seis perros: ocupan más vereda, hay que saltar justo.",
  consejo: "Con los paseadores saltá apenas lleguen: son más largos.",
  dificultad: 2,
}

export const RETIRO = {
  numero: 3,
  id: "retiro",
  nombre: "RETIRO",
  barrio: "Retiro",
  duracion: 35000,
  velocidad: 0.72,
  primeraLlegada: 4000,
  pisoMinimo: 950,
  pisoExtra: 550,
  rampa: 0.25,
  patrones: { simple: 3, paseador: 1, doble: 2, moto: 2 },
  // Se presentan la moto (2º) y el doble (4º) antes de mezclar todo
  presentar: ["simple", "moto", "simple", "doble"],
  patronesPorMate: 5,
  inmunidad: 1200,
  lema: "Hora pico en la terminal: todo el mundo corre.",
  novedad: "Motos de delivery que vienen más rápido y obstáculos dobles.",
  consejo: "Cuando suene la bocina, preparate: la moto llega en un segundo.",
  dificultad: 3,
}

export const NIVELES = [PALERMO, RECOLETA, RETIRO]

export function nivelPorId(id) {
  return NIVELES.find((nivel) => nivel.id === id) ?? null
}

// La práctica del tutorial: más lenta, sin perder vidas y siempre igual.
// "en" = cuándo llega cada cosa a la corredora, contando desde el primer salto.
export const PRACTICA = {
  numero: 0,
  id: "practica",
  nombre: "PRÁCTICA",
  barrio: "Palermo",
  practica: true,
  duracion: 19000,
  velocidad: 0.55,
  inmunidad: 1200,
  guion: [
    { en: 5200, patron: "simple", tipo: "cono" },
    { en: 8200, patron: "simple", tipo: "baldosa" },
    { en: 10400, mate: true },
    { en: 12600, patron: "simple", tipo: "perro" },
    { en: 15200, patron: "simple", tipo: "basura" },
  ],
}
