import { useEffect, useReducer } from "react"
import GameHeader from "./GameHeader"
import GameButton from "./GameButton"
import {
  TICK,
  JUGADOR_X,
  estadoInicial,
  actualizarNivel,
  estaEnElAire,
} from "../game/nivel1"

function Level1({ nombre, onTerminar }) {
  const [estado, dispatch] = useReducer(actualizarNivel, estadoInicial)

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
    const espera = setTimeout(() => onTerminar(estado.resultado), 800)
    return () => clearTimeout(espera)
  }, [estado.resultado, onTerminar])

  function saltar() {
    dispatch({ tipo: "saltar" })
  }

  const enElAire = estaEnElAire(estado)
  const golpeado = estado.tiempo < estado.golpeHasta

  // La parada aparece desde la derecha en el último tramo y frena al lado de la corredora
  const tramoFinal = Math.max(0, (estado.progreso - 85) / 15)
  const paradaX = 105 - tramoFinal * (105 - JUGADOR_X - 6)

  // El bondi avanza por la calle a medida que corrés
  const bondiX = 70 - estado.progreso * 0.45

  return (
    <div className="start-screen level">
      <GameHeader />

      <p className="cheer">¡Dale, {nombre}! 🏃‍♀️</p>

      <div className="hud">
        <span className="lives">
          {"❤️".repeat(estado.vidas)}
          {"🤍".repeat(Math.max(0, 3 - estado.vidas))}
        </span>
        <div className="progress" aria-label="Distancia hasta la parada">
          <div className="progress-fill" style={{ width: `${estado.progreso}%` }} />
        </div>
        <span>🚏</span>
      </div>

      {/* Tocar la calle también sirve para saltar (útil en celular) */}
      <div className="city" onPointerDown={saltar}>
        <div className="buildings">
          <div className="buildings-track">
            <span>🏢</span><span>🏠</span><span>🏬</span><span>🏢</span><span>🏠</span>
            <span>🏢</span><span>🏠</span><span>🏬</span><span>🏢</span><span>🏠</span>
          </div>
        </div>

        <div className="sidewalk">
          <span
            className={`player ${enElAire ? "jumping" : ""} ${golpeado ? "hit" : ""}`}
            style={{ left: `${JUGADOR_X}%` }}
          >
            🏃‍♀️
          </span>

          {estado.obstaculos.map((obstaculo) => (
            <span key={obstaculo.id} className="obstacle" style={{ left: `${obstaculo.x}%` }}>
              {obstaculo.emoji}
            </span>
          ))}

          <span className="bus-stop" style={{ left: `${paradaX}%`, right: "auto" }}>
            🚏
          </span>
        </div>

        <div className="street">
          <div className="street-line moving"></div>
          <span className="bus" style={{ left: `${bondiX}%`, right: "auto" }}>
            🚌
          </span>
        </div>
      </div>

      <div className="controls">
        <GameButton texto="⬆️ Saltar" onClick={saltar} />
        <p className="hint">Saltá con la barra espaciadora, la flecha ⬆️ o tocando la calle.</p>
      </div>
    </div>
  )
}

export default Level1
