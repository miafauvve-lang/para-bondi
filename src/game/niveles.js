// La "ficha" de cada nivel: qué lo diferencia del otro.
// Las reglas (saltar, chocar, mates, ganar o perder) son las mismas para los dos
// y están en game/nivel1.js. Acá solo cambian el barrio y la dificultad.
import { VELOCIDAD, ESPERA_MINIMA, ESPERA_EXTRA } from "./nivel1"

export const PALERMO = {
  numero: 1,
  nombre: "PALERMO",
  ruta: "/juego",
  // Los mismos valores de siempre: Palermo no cambia
  velocidad: VELOCIDAD, // 0.6
  esperaMinima: ESPERA_MINIMA, // 1800 ms
  esperaExtra: ESPERA_EXTRA, // 800 ms
}

export const RECOLETA = {
  numero: 2,
  nombre: "RECOLETA",
  ruta: "/recoleta",
  // 13 % más rápido que Palermo (0.6 → 0.68)
  velocidad: 0.68,
  // El mínimo entre obstáculos queda igual (1,8 s): siempre hay tiempo
  // de aterrizar y prepararse. Solo se achica la parte al azar
  // (800 → 600 ms), así aparecen algunos obstáculos más.
  esperaMinima: ESPERA_MINIMA, // 1800 ms
  esperaExtra: 600,
}

export const NIVELES = [PALERMO, RECOLETA]
