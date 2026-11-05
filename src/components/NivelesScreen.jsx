import { Link } from "react-router-dom"
import GameButton from "./GameButton"
import PantallaFondo from "./PantallaFondo"
import Estrellas from "./Estrellas"
import Barrio from "./ilustraciones/Barrio"
import BarrioRecoleta from "./ilustraciones/BarrioRecoleta"
import BarrioRetiro from "./ilustraciones/BarrioRetiro"
import { NIVELES } from "../game/niveles"

// Miniatura de cada barrio: el mismo dibujo que se ve de fondo en el nivel
const MINIATURAS = { palermo: Barrio, recoleta: BarrioRecoleta, retiro: BarrioRetiro }

// Selector de niveles (ruta /niveles): muestra los tres barrios,
// cuáles están desbloqueados, tus estrellas y tu récord en cada uno.
function NivelesScreen({ perfil, onJugar }) {
  return (
    <PantallaFondo className="pantalla-ancha">
      <div className="panel-vidrio panel-niveles">
        <h2>ELEGÍ TU BARRIO</h2>
        <p className="subtitulo">Cada barrio suma algo nuevo. Ganá uno para desbloquear el siguiente.</p>

        <ol className="tarjetas-niveles">
          {NIVELES.map((nivel, i) => {
            const bloqueado = nivel.numero > perfil.nivelMaximo
            const record = perfil.records[nivel.id]
            const Miniatura = MINIATURAS[nivel.id]
            return (
              <li key={nivel.id} className={`tarjeta-nivel ${bloqueado ? "bloqueado" : ""} cielo-mini-${nivel.id}`}>
                <div className="miniatura" aria-hidden="true">
                  <Miniatura />
                  {bloqueado && <span className="candado">🔒</span>}
                </div>
                <div className="tarjeta-nivel-texto">
                  <span className="nivel-numero">NIVEL {nivel.numero}</span>
                  <h3>{nivel.nombre}</h3>
                  <p>{nivel.lema}</p>
                  <p className="dificultad" aria-label={`Dificultad ${nivel.dificultad} de 3`}>
                    {"●".repeat(nivel.dificultad)}
                    <span className="apagado">{"●".repeat(3 - nivel.dificultad)}</span>
                  </p>
                  {bloqueado ? (
                    <p className="estado-nivel">Ganá {NIVELES[i - 1].barrio} para desbloquearlo</p>
                  ) : record ? (
                    <p className="estado-nivel">
                      <Estrellas cantidad={record.estrellas} tamano="chico" /> Récord{" "}
                      <span className="numeros">{record.total.toLocaleString("es-AR")}</span>
                    </p>
                  ) : (
                    <p className="estado-nivel">¡Disponible!</p>
                  )}
                </div>
                <GameButton
                  texto={bloqueado ? "BLOQUEADO" : record ? "REPETIR" : "JUGAR  →"}
                  variante={record ? "claro" : "principal"}
                  disabled={bloqueado}
                  onClick={() => onJugar(nivel.id)}
                />
              </li>
            )
          })}
        </ol>

        <Link to="/menu" className="game-button game-button-secundario-claro">
          ← Volver al menú
        </Link>
      </div>
    </PantallaFondo>
  )
}

export default NivelesScreen
