// La pantalla de juego. Se usa para los DOS niveles (Palermo y Recoleta):
// lo que cambia entre uno y otro llega en la prop "nivel" (ver game/niveles.js).
import { useEffect, useReducer } from "react"
import GameHeader from "./GameHeader"
import GameButton from "./GameButton"
import Marcador from "./Marcador"
import Corredora from "./ilustraciones/Corredora"
import Colectivo from "./ilustraciones/Colectivo"
import Parada from "./ilustraciones/Parada"
import Obstaculo from "./ilustraciones/Obstaculo"
import Mate from "./ilustraciones/Mate"
import Barrio from "./ilustraciones/Barrio"
import BarrioRecoleta from "./ilustraciones/BarrioRecoleta"
import Skyline from "./ilustraciones/Skyline"
import {
  TICK,
  DURACION_NIVEL,
  DURACION_SALTO,
  VIDAS_MAXIMAS,
  JUGADOR_X,
  VELOCIDAD,
  crearEstadoInicial,
  actualizarNivel,
  estaEnElAire,
  esInmune,
} from "../game/nivel1"

function Level1({ nombre, nivel, onTerminar }) {
  // El estado arranca SIEMPRE de cero, armado con la ficha del nivel
  // (tiempo 0, 3 vidas, sin obstáculos, con la velocidad de ese barrio)
  const [estado, dispatch] = useReducer(actualizarNivel, nivel, crearEstadoInicial)

  // El "reloj" del juego: cada TICK ms avanza todo un poquito
  useEffect(() => {
    if (estado.resultado) return
    const reloj = setInterval(() => dispatch({ tipo: "tick" }), TICK)
    return () => clearInterval(reloj)
  }, [estado.resultado])

  // Saltar con la barra espaciadora o la flecha para arriba
  useEffect(() => {
    function alApretarTecla(evento) {
      if (evento.code === "Space" || evento.code === "ArrowUp") {
        evento.preventDefault() // para que la página no haga scroll
        dispatch({ tipo: "saltar" })
      }
    }
    window.addEventListener("keydown", alApretarTecla)
    return () => window.removeEventListener("keydown", alApretarTecla)
  }, [])

  // Cuando termina el nivel, avisamos a App (con una pausita para ver el final)
  useEffect(() => {
    if (!estado.resultado) return
    // Le contamos a App cómo terminó y en qué nivel
    const espera = setTimeout(() => onTerminar(estado.resultado, nivel.numero), 800)
    return () => clearTimeout(espera)
  }, [estado.resultado, onTerminar, nivel.numero])

  function saltar() {
    dispatch({ tipo: "saltar" })
  }

  const enElAire = estaEnElAire(estado)
  const golpeado = esInmune(estado) // parpadea mientras dura la inmunidad
  const mostrarMensaje = estado.tiempo < estado.mensajeHasta

  // Los segundos que faltan, para mostrarlos como en el mockup (00:25)
  const segundosRestantes = Math.max(0, Math.ceil((DURACION_NIVEL - estado.tiempo) / 1000))
  const reloj = `00:${String(segundosRestantes).padStart(2, "0")}`

  // La parada aparece desde la derecha en el último tramo y frena delante de la corredora
  const tramoFinal = Math.max(0, (estado.progreso - 85) / 15)
  const paradaX = 108 - tramoFinal * (108 - (JUGADOR_X + 10))

  // El colectivo va adelante, a la derecha. En el tramo final frena con la puerta
  // justo en la parada; si perdiste, arranca y se va.
  const bondiX = 74 - tramoFinal * (74 - (paradaX - 6))
  const bondiSeVa = estado.resultado === "perdiste"

  // Cada barrio tiene su fondo; todo lo demás es igual
  const Fondo = nivel.numero === 2 ? BarrioRecoleta : Barrio
  // Qué tan rápido va este nivel comparado con Palermo (1 = igual, 1.13 = 13 % más rápido).
  // App.css lo usa para que la vereda y el barrio se muevan al mismo ritmo que los obstáculos.
  const ritmo = nivel.velocidad / VELOCIDAD

  return (
    <div className={`pantalla-juego ${estado.resultado ? "terminado" : ""}`}>
      <header className="barra-juego">
        <GameHeader tamano="chico" />

        <Marcador
          nivel={`${nivel.numero} · ${nivel.nombre}`}
          tiempo={reloj}
          vidas={estado.vidas}
          vidasMaximas={VIDAS_MAXIMAS}
          sumaVida={mostrarMensaje}
          pierdeVida={golpeado}
        />

        <div className="chip-meta">META: LLEGÁ A LA PARADA</div>
      </header>

      {/* Tocar la escena también sirve para saltar (útil en celular) */}
      <div className="escena-marco">
        <div
          className="escena"
          onPointerDown={saltar}
          style={{ "--duracion-salto": `${DURACION_SALTO}ms`, "--ritmo": ritmo }}
        >
          <div className="capa nubes" />
          <div className="capa pista skyline">
            <Skyline />
            <Skyline />
          </div>
          <div className="capa pista barrio">
            <Fondo />
            <Fondo />
          </div>
          <div className="capa vereda" />
          <div className="capa cordon" />
          <div className="capa calle">
            <div className="linea-calle" />
          </div>

          <div className="sprite parada" style={{ left: `${paradaX}%` }}>
            <Parada />
          </div>

          {estado.obstaculos.map((obstaculo) => (
            <div key={obstaculo.id} className="sprite obstaculo" style={{ left: `${obstaculo.x}%` }}>
              <Obstaculo tipo={obstaculo.tipo} />
            </div>
          ))}

          {estado.mates.map((mate) => (
            <div key={mate.id} className="sprite mate" style={{ left: `${mate.x}%` }}>
              <Mate />
            </div>
          ))}

          <div
            className={`sprite corredora ${enElAire ? "jumping" : ""} ${golpeado ? "hit" : ""}`}
            style={{ left: `${JUGADOR_X}%` }}
          >
            <Corredora />
          </div>

          {mostrarMensaje && (
            <p className="mas-una-vida" style={{ left: `${JUGADOR_X}%` }}>
              ¡+1 vida!
            </p>
          )}

          <div
            className={`sprite colectivo ${bondiSeVa ? "se-va" : ""}`}
            style={{ left: `${bondiX}%` }}
          >
            <Colectivo />
          </div>

          <p className="aliento">¡Dale, {nombre}!</p>
        </div>
      </div>

      <footer className="barra-inferior">
        <GameButton texto="¡SALTÁ!  ↑" variante="saltar" onClick={saltar} />

        <div className="recorrido">
          <span>SALIDA</span>
          <div className="progress" aria-label="Distancia hasta la parada">
            <div className="progress-fill" style={{ width: `${estado.progreso}%` }} />
            <div className="progress-marca" style={{ left: `${estado.progreso}%` }} />
          </div>
          <span>PARADA</span>
        </div>

        <p className="hint">Saltá con la barra espaciadora, la flecha ↑ o tocando la calle.</p>
      </footer>
    </div>
  )
}

export default Level1
