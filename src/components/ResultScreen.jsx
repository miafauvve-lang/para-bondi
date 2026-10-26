import { Link } from "react-router-dom"
import GameButton from "./GameButton"
import Colectivo from "./ilustraciones/Colectivo"
import portada from "../assets/portada.jpg"

// Muestra cómo terminó el nivel. Hay tres casos:
//   1. Ganaste y hay otro barrio  → "Seguir a Recoleta" / "Seguir a Retiro"
//   2. Ganaste el último (Retiro) → victoria final: ¡TRES DE TRES!
//   3. Perdiste                   → "Reintentar" repite el mismo nivel
// Props: "nivel" es la ficha del nivel que se jugó y "siguiente" la del próximo
// (null si no hay más). Las funciones on... las maneja App.
function ResultScreen({ nombre, resultado, nivel, siguiente, onReintentar, onSeguir, onJugarDeNuevo }) {
  const gano = resultado === "ganaste"
  const ganoTodo = gano && siguiente === null

  let pildora = `NIVEL ${nivel.numero} · ${nivel.nombre}`
  let titulo = "¡SE TE FUE EL BONDI!"
  let mensaje = `Te quedaste sin vidas, ${nombre}. Tranqui, en 20 minutos pasa otro... o no.`

  if (ganoTodo) {
    pildora = "PALERMO ✓ · RECOLETA ✓ · RETIRO ✓"
    titulo = "¡TRES DE TRES!"
    mensaje = `¡Sos leyenda, ${nombre}! Alcanzaste el bondi en Palermo, en Recoleta y en Retiro. Ni el chofer lo puede creer.`
  } else if (gano) {
    pildora = `NIVEL ${nivel.numero} COMPLETADO ✓`
    titulo = "¡LO ALCANZASTE!"
    mensaje =
      siguiente.numero === 3
        ? `¡Bien, ${nombre}! Último tramo: Retiro, donde todo el mundo corre para alcanzar algo.`
        : `¡Bien, ${nombre}! El chofer estaba de buen humor. Próxima parada: ${siguiente.barrio}, donde los bondis no esperan a nadie.`
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
          {gano && !ganoTodo && <GameButton texto={`SEGUIR A ${siguiente.nombre}  →`} onClick={onSeguir} />}
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
