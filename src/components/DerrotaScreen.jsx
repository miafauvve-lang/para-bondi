import { Link } from "react-router-dom"
import GameButton from "./GameButton"
import PantallaFondo from "./PantallaFondo"
import Colectivo from "./ilustraciones/Colectivo"
import TablaPuntaje from "./TablaPuntaje"

// Un consejo según con qué chocaste la última vez
const CONSEJOS = {
  paseador: "Los paseadores ocupan más vereda: saltá apenas los tengas a un par de pasos.",
  moto: "Cuando aparece el cartel ¡MOTO!, preparate: llega en un segundo.",
  doble: "Los dobles se pasan de un solo salto: saltá justo antes de que llegue el primero.",
}
const CONSEJO_GENERAL = "Saltá cuando el obstáculo esté a un par de pasos: ni muy antes, ni muy encima."

// Derrota (ruta /derrota): te quedaste sin vidas. Reintentar repite el mismo barrio.
function DerrotaScreen({ nombre, ficha, resumen, onReintentar }) {
  const consejo = CONSEJOS[resumen.ultimoChoque] ?? CONSEJO_GENERAL

  return (
    <PantallaFondo>
      <div className="tarjeta-resultado tarjeta-derrota">
        <span className="pildora-roja">
          NIVEL {ficha.numero} · {ficha.nombre}
        </span>

        <h2>¡SE TE FUE EL BONDI!</h2>
        <p>
          Te quedaste sin vidas, {nombre}, al {resumen.progreso} % del recorrido. Tranqui, en 20 minutos pasa
          otro... o no.
        </p>

        <div className="consejo">
          <strong>CONSEJO</strong>
          <p>{consejo}</p>
        </div>

        <TablaPuntaje resumen={resumen} />

        <div className="resultado-colectivo se-va">
          <Colectivo />
        </div>

        <div className="result-buttons">
          <GameButton texto="REINTENTAR  →" onClick={onReintentar} />
          <Link to="/niveles" className="game-button game-button-claro">
            Elegir otro barrio
          </Link>
          <Link to="/menu" className="game-button game-button-secundario">
            Volver al menú
          </Link>
        </div>
      </div>
    </PantallaFondo>
  )
}

export default DerrotaScreen
