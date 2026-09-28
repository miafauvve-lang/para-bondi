import { useState } from "react"
import GameButton from "./GameButton"
import GameHeader from "./GameHeader"

function StartScreen({ onStart, nombreInicial = "" }) {
  // Lo que la persona va escribiendo en el campo
  const [nombre, setNombre] = useState(nombreInicial)

  // trim() saca los espacios del principio y del final: "   " queda ""
  const nombreLimpio = nombre.trim()
  const nombreValido = nombreLimpio !== ""

  function alEnviar(evento) {
    evento.preventDefault() // evita que el formulario recargue la página
    if (!nombreValido) return
    onStart(nombreLimpio)
  }

  return (
    <div className="start-screen">

      <GameHeader />

      <p className="subtitle">
        El bondi está llegando. ¿Llegás o lo perdés?
      </p>

      <form className="name-form" onSubmit={alEnviar}>
        <label htmlFor="nombre">¿Cómo te llamás?</label>
        <input
          id="nombre"
          type="text"
          value={nombre}
          onChange={(evento) => setNombre(evento.target.value)}
          placeholder="Escribí tu nombre"
          maxLength={20}
          autoFocus
          autoComplete="off"
        />
        <GameButton texto="¡A correr!" type="submit" disabled={!nombreValido} />
        {!nombreValido && (
          <p className="hint">Escribí tu nombre para poder arrancar.</p>
        )}
      </form>

      <div className="city">
        <div className="buildings">
          <span>🏢</span>
          <span>🏠</span>
          <span>🏬</span>
          <span>🏢</span>
          <span>🏠</span>
        </div>

        <div className="sidewalk">
          <span className="player">🏃‍♀️</span>
          <span className="mate">🧉</span>
          <span className="bus-stop">🚏</span>
        </div>

        <div className="street">
          <div className="street-line"></div>
          <span className="bus">🚌</span>
        </div>
      </div>

    </div>
  )
}

export default StartScreen
