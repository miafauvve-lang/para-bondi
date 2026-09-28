import GameButton from "./GameButton"
import GameHeader from "./GameHeader"

function ResultScreen({ nombre, resultado, onReintentar, onCambiarNombre }) {
  const gano = resultado === "ganaste"

  return (
    <div className="start-screen result">
      <GameHeader />

      <p className="result-emoji">{gano ? "🚌🙋‍♀️" : "🚌💨"}</p>

      <h2>{gano ? `¡Llegaste, ${nombre}!` : `¡Se te fue el bondi, ${nombre}!`}</h2>

      <p>
        {gano
          ? "Le hiciste señas al chofer y frenó. ¡Hoy no llegás tarde!"
          : "Te quedaste sin vidas. Tranqui, en 20 minutos pasa otro... o no."}
      </p>

      <div className="result-buttons">
        <GameButton texto="Jugar de nuevo" onClick={onReintentar} />
        <GameButton texto="Cambiar nombre" onClick={onCambiarNombre} />
      </div>
    </div>
  )
}

export default ResultScreen
