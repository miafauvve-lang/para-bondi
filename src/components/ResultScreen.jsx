import { Link } from "react-router-dom"
import GameButton from "./GameButton"
import Colectivo from "./ilustraciones/Colectivo"
import portada from "../assets/portada.jpg"

// Muestra cómo terminó el nivel. Hay tres casos:
//   1. Ganaste Palermo   → botón "Seguir a Recoleta"
//   2. Ganaste Recoleta  → victoria final (completaste los dos niveles)
//   3. Perdiste          → "Reintentar" repite el mismo nivel
function ResultScreen({ nombre, resultado, nivel, onReintentar, onSeguir, onJugarDeNuevo }) {
  const gano = resultado === "ganaste"
  const esElUltimoNivel = nivel.numero === 2
  const ganoTodo = gano && esElUltimoNivel

  let pildora = `NIVEL ${nivel.numero} · ${nivel.nombre}`
  let titulo = "¡SE TE FUE EL BONDI!"
  let mensaje = `Te quedaste sin vidas, ${nombre}. Tranqui, en 20 minutos pasa otro... o no.`

  if (ganoTodo) {
    pildora = "PALERMO ✓ · RECOLETA ✓"
    titulo = "¡DOS DE DOS!"
    mensaje = `¡Sos un fenómeno, ${nombre}! Alcanzaste el bondi en Palermo y en Recoleta. Ni el chofer lo puede creer.`
  } else if (gano) {
    pildora = `NIVEL ${nivel.numero} COMPLETADO ✓`
    titulo = "¡LO ALCANZASTE!"
    mensaje = `¡Bien, ${nombre}! El chofer estaba de buen humor. Próxima parada: Recoleta, donde los bondis no esperan a nadie.`
  }

  return (
    <div className="pantalla-resultado" style={{ backgroundImage: `url(${portada})` }}>
      <div className="tarjeta-resultado">
        <span className="pildora-verde">{pildora}</span>

        <h2>{titulo}</h2>

        <p>{mensaje}</p>

        <div className={`resultado-colectivo ${gano ? "" : "se-va"}`}>
          <Colectivo />
        </div>

        <div className="result-buttons">
          {ganoTodo && <GameButton texto="JUGAR DE NUEVO  →" onClick={onJugarDeNuevo} />}
          {gano && !esElUltimoNivel && <GameButton texto="SEGUIR A RECOLETA  →" onClick={onSeguir} />}
          {!gano && <GameButton texto="REINTENTAR  →" onClick={onReintentar} />}

          {/* Link navega a otra ruta sin recargar la página (como un <a>, pero de React Router) */}
          <Link to="/" className="game-button game-button-secundario">
            CAMBIAR NOMBRE
          </Link>
        </div>
      </div>
    </div>
  )
}

export default ResultScreen
