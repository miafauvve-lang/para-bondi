// La "ficha" de cada nivel: qué lo diferencia del otro.
// Las reglas (saltar, chocar, mates, ganar o perder) son las mismas para todos
// y están en game/nivel1.js. Acá solo cambian el barrio y la dificultad.
// El orden de la lista NIVELES es el orden en que se juegan.
import { VELOCIDAD, ESPERA_MINIMA, ESPERA_EXTRA } from "./nivel1"

export const PALERMO = {
  numero: 1,
  nombre: "PALERMO",
  barrio: "Palermo",
  ruta: "/juego",
  // Los mismos valores de siempre: Palermo no cambia
  velocidad: VELOCIDAD, // 0.6
  esperaMinima: ESPERA_MINIMA, // 1800 ms
  esperaExtra: ESPERA_EXTRA, // 800 ms
}

export const RECOLETA = {
  numero: 2,
  nombre: "RECOLETA",
  barrio: "Recoleta",
  ruta: "/recoleta",
  // 13 % más rápido que Palermo (0.6 → 0.68)
  velocidad: 0.68,
  // El mínimo entre obstáculos queda igual (1,8 s): siempre hay tiempo
  // de aterrizar y prepararse. Solo se achica la parte al azar
  // (800 → 600 ms), así aparecen algunos obstáculos más.
  esperaMinima: ESPERA_MINIMA, // 1800 ms
  esperaExtra: 600,
}

export const RETIRO = {
  numero: 3,
  nombre: "RETIRO",
  barrio: "Retiro",
  ruta: "/retiro",
  // Misma velocidad que Recoleta. En este juego ir más rápido NO hace más
  // difícil el salto: el obstáculo pasa antes por debajo y la ventana para
  // saltar hasta se agranda. Por eso acá lo que sube es la FRECUENCIA.
  velocidad: 0.68,
  // 1,65 s de mínimo entre obstáculos: el salto dura 1,15 s, así que
  // siempre quedan al menos 0,5 s en el piso para el próximo.
  // Resultado: alrededor de un 10 % más de obstáculos que en Recoleta.
  esperaMinima: 1650,
  esperaExtra: 500,
  // Ojo: con obstáculos más seguidos, varios llegan durante los 2 s de
  // inmunidad después de un choque y no hacen daño. Con un mate cada 2
  // obstáculos, alguien que NUNCA salta llegaba a ganar. Con uno cada 3
  // los mates siguen ayudando, pero hay que saltar para ganar.
  obstaculosPorMate: 3,
}

export const NIVELES = [PALERMO, RECOLETA, RETIRO]
