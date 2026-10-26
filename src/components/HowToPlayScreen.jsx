import { Link } from "react-router-dom"
import GameHeader from "./GameHeader"
import Obstaculo from "./ilustraciones/Obstaculo"
import Mate from "./ilustraciones/Mate"
import Parada from "./ilustraciones/Parada"
import portada from "../assets/portada.jpg"
import { DURACION_NIVEL, VIDAS_INICIALES } from "../game/nivel1"

// Pantalla "¿Cómo se juega?" (ruta /como-jugar).
// Solo muestra información: no cambia nada del juego.
// Los números salen de nivel1.js, así si cambia la dificultad el texto se actualiza solo.

const OBSTACULOS = [
  { tipo: "baldosa", nombre: "Baldosa floja" },
  { tipo: "perro", nombre: "Perro" },
  { tipo: "basura", nombre: "Bolsa de basura" },
  { tipo: "cono", nombre: "Cono" },
]

function HowToPlayScreen() {
  const segundos = DURACION_NIVEL / 1000

  return (
    <div className="pantalla-resultado" style={{ backgroundImage: `url(${portada})` }}>
      <div className="tarjeta-resultado tarjeta-como-jugar">
        <GameHeader tamano="chico" />
        <h2>¿CÓMO SE JUEGA?</h2>

        <ol className="pasos">
          <li>
            <span className="paso-numero">1</span>
            <div>
              <strong>Saltá</strong>
              <p>Con la barra espaciadora, la flecha ↑, el botón ¡SALTÁ! o tocando la calle.</p>
            </div>
          </li>

          <li>
            <span className="paso-numero">2</span>
            <div>
              <strong>Esquivá el caos de la vereda</strong>
              <p>Cada choque te saca una vida. Arrancás con {VIDAS_INICIALES} ♥.</p>
              <div className="fila-dibujos">
                {OBSTACULOS.map((obstaculo) => (
                  <figure key={obstaculo.tipo}>
                    <Obstaculo tipo={obstaculo.tipo} />
                    <figcaption>{obstaculo.nombre}</figcaption>
                  </figure>
                ))}
              </div>
            </div>
          </li>

          <li>
            <span className="paso-numero">3</span>
            <div className="paso-con-dibujo">
              <div>
                <strong>Agarrá mates</strong>
                <p>Cada mate te devuelve una vida (hasta {VIDAS_INICIALES}).</p>
              </div>
              <span className="dibujo-chico"><Mate /></span>
            </div>
          </li>

          <li>
            <span className="paso-numero">4</span>
            <div className="paso-con-dibujo">
              <div>
                <strong>Llegá a la parada</strong>
                <p>Aguantá {segundos} segundos y alcanzás el bondi.</p>
              </div>
              <span className="dibujo-chico"><Parada /></span>
            </div>
          </li>
        </ol>

        {/* Vuelve al inicio, donde se escribe el nombre para arrancar */}
        <Link to="/" className="game-button game-button-principal">
          ¡ENTENDIDO!  →
        </Link>
      </div>
    </div>
  )
}

export default HowToPlayScreen
