import GameButton from "./GameButton"
import GameHeader from "./GameHeader"
import PantallaFondo from "./PantallaFondo"
import Obstaculo from "./ilustraciones/Obstaculo"
import Mate from "./ilustraciones/Mate"
import Parada from "./ilustraciones/Parada"

// Bienvenida (ruta /bienvenida): presenta la historia y el objetivo en una sola pantalla.
// Se ve justo después de escribir el nombre. Desde acá se va a practicar o al menú.
function BienvenidaScreen({ nombre, onPracticar, onMenu }) {
  return (
    <PantallaFondo>
      <div className="panel-vidrio panel-bienvenida">
        <GameHeader tamano="chico" />
        <span className="pildora-verde">BUENOS AIRES · 8:52 AM</span>

        <h2>¡Hola, {nombre}!</h2>
        <p className="texto-grande">
          Entrás a las 9 y el 60 ya está doblando la esquina. Corré por la vereda de
          <strong> Palermo, Recoleta y Retiro</strong> y llegá a la parada antes de que el
          bondi arranque sin vos.
        </p>

        <ul className="claves">
          <li>
            <span className="clave-dibujo"><Obstaculo tipo="perro" /></span>
            <span><strong>Saltá</strong> el caos de la vereda</span>
          </li>
          <li>
            <span className="clave-dibujo"><Mate /></span>
            <span><strong>Tomá mate</strong>: te devuelve una vida</span>
          </li>
          <li>
            <span className="clave-dibujo"><Parada /></span>
            <span><strong>Llegá a la parada</strong> con vidas y sumá puntos</span>
          </li>
        </ul>

        <div className="result-buttons">
          <GameButton texto="PRACTICAR PRIMERO  →" onClick={onPracticar} />
          <GameButton texto="Ya sé jugar: ir al menú" variante="secundario-claro" onClick={onMenu} />
        </div>
      </div>
    </PantallaFondo>
  )
}

export default BienvenidaScreen
