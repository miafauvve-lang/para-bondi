import GameButton from "./GameButton"
import Colectivo from "./ilustraciones/Colectivo"
import portada from "../assets/portada.jpg"

function ResultScreen({ nombre, resultado, onReintentar, onCambiarNombre }) {
  const gano = resultado === "ganaste"

  return (
    <div className="pantalla-resultado" style={{ backgroundImage: `url(${portada})` }}>
      <div className="tarjeta-resultado">
        <span className="pildora-verde">
          {gano ? "NIVEL 1 COMPLETADO ✓" : "NIVEL 1 · PALERMO"}
        </span>

        <h2>{gano ? "¡LO ALCANZASTE!" : "¡SE TE FUE EL BONDI!"}</h2>

        <p>
          {gano
            ? `¡Bien, ${nombre}! El chofer estaba de buen humor. Milagro porteño desbloqueado.`
            : `Te quedaste sin vidas, ${nombre}. Tranqui, en 20 minutos pasa otro... o no.`}
        </p>

        <div className={`resultado-colectivo ${gano ? "" : "se-va"}`}>
          <Colectivo />
        </div>

        <div className="result-buttons">
          <GameButton texto={gano ? "JUGAR DE NUEVO  →" : "REINTENTAR  →"} onClick={onReintentar} />
          <GameButton texto="CAMBIAR NOMBRE" variante="secundario" onClick={onCambiarNombre} />
        </div>
      </div>
    </div>
  )
}

export default ResultScreen
