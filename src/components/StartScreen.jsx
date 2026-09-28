import { useState } from "react"
import GameButton from "./GameButton"
import GameHeader from "./GameHeader"
import portada from "../assets/portada.jpg"

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
    // La ilustración del mockup de fondo, con un degradé azul a la izquierda
    <div className="portada" style={{ backgroundImage: `url(${portada})` }}>
      <div className="portada-contenido">
        <span className="barrita" />
        <GameHeader />

        <p className="bajada">Corré, saltá y esquivá el caos antes de que se vaya.</p>
        <p className="pildora">Un día normal. Un bondi imposible.</p>

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
          <GameButton texto="¡A CORRER!  →" type="submit" disabled={!nombreValido} />
          {!nombreValido && (
            <p className="hint">Escribí tu nombre para poder arrancar.</p>
          )}
        </form>
      </div>
    </div>
  )
}

export default StartScreen
