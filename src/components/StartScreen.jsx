import { useState } from "react"
import { Link } from "react-router-dom"
import GameButton from "./GameButton"
import GameHeader from "./GameHeader"
import portada from "../assets/portada.jpg"

// Portada (ruta /): la ilustración del mockup y el nombre del jugador.
// Si ya jugaste antes en este navegador, te ofrece seguir con tu avance.
function StartScreen({ onStart, jugadorGuardado = "", onSeguir }) {
  // Lo que la persona va escribiendo en el campo
  const [nombre, setNombre] = useState("")

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

        {jugadorGuardado && (
          <div className="seguir-como">
            <GameButton texto={`SEGUIR COMO ${jugadorGuardado.toUpperCase()}  →`} onClick={onSeguir} />
            <p className="hint">¿Sos otra persona? Escribí tu nombre abajo.</p>
          </div>
        )}

        <form className="name-form" onSubmit={alEnviar}>
          <label htmlFor="nombre">¿Cómo te llamás?</label>
          <input
            id="nombre"
            type="text"
            value={nombre}
            onChange={(evento) => setNombre(evento.target.value)}
            placeholder="Escribí tu nombre"
            maxLength={20}
            autoFocus={!jugadorGuardado}
            autoComplete="off"
          />
          <GameButton
            texto="¡A CORRER!  →"
            type="submit"
            disabled={!nombreValido}
            variante={jugadorGuardado ? "claro" : "principal"}
          />
          {!nombreValido && !jugadorGuardado && (
            <p className="hint">Escribí tu nombre para poder arrancar.</p>
          )}
        </form>

        <Link to="/como-jugar" className="game-button game-button-secundario-claro">
          ¿Cómo se juega?
        </Link>
      </div>
    </div>
  )
}

export default StartScreen
