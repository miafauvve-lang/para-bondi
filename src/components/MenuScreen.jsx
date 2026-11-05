import { Link } from "react-router-dom"
import GameButton from "./GameButton"
import GameHeader from "./GameHeader"
import PantallaFondo from "./PantallaFondo"
import Estrellas from "./Estrellas"
import { NIVELES } from "../game/niveles"
import { totales } from "../game/progreso"

// Menú principal (ruta /menu): el "centro" desde donde se va a todos lados.
// El botón grande siempre lleva al próximo barrio que te falta ganar.
function MenuScreen({ nombre, perfil, onJugar, onCambiarJugador }) {
  // El primer barrio desbloqueado que todavía no ganaste (o el último, si ganaste todos)
  const disponibles = NIVELES.filter((nivel) => nivel.numero <= perfil.nivelMaximo)
  const proximo = disponibles.find((nivel) => !perfil.records[nivel.id]) ?? disponibles.at(-1)
  const { puntos, estrellas } = totales(perfil)

  return (
    <PantallaFondo>
      <div className="panel-vidrio panel-menu">
        <GameHeader tamano="mediano" />
        <p className="saludo">¡Hola, {nombre}! ¿A dónde corremos hoy?</p>

        <div className="resumen-progreso">
          <Estrellas cantidad={estrellas} maximo={NIVELES.length * 3} tamano="chico" />
          <span className="numeros">{puntos.toLocaleString("es-AR")} pts</span>
        </div>

        <nav className="menu-opciones" aria-label="Menú principal">
          <GameButton texto={`JUGAR · ${proximo.nombre}  →`} onClick={() => onJugar(proximo.id)} />
          <Link to="/niveles" className="game-button game-button-claro">
            ELEGIR BARRIO
          </Link>
          <Link to="/tutorial" className="game-button game-button-claro">
            TUTORIAL Y PRÁCTICA
          </Link>
          <Link to="/como-jugar" className="game-button game-button-secundario-claro">
            ¿Cómo se juega?
          </Link>
          <GameButton texto="Cambiar de jugador" variante="secundario-claro" onClick={onCambiarJugador} />
        </nav>
      </div>
    </PantallaFondo>
  )
}

export default MenuScreen
