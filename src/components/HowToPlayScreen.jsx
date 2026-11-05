import { Link } from "react-router-dom"
import GameHeader from "./GameHeader"
import PantallaFondo from "./PantallaFondo"
import Obstaculo from "./ilustraciones/Obstaculo"
import Mate from "./ilustraciones/Mate"
import Parada from "./ilustraciones/Parada"
import { VIDAS_INICIALES, PUNTOS_MATE, BONUS_POR_VIDA } from "../game/reglas"

// Pantalla "¿Cómo se juega?" (ruta /como-jugar). Es una ficha de consulta:
// para aprender jugando está el tutorial. Los números salen de reglas.js,
// así si cambia algo el texto se actualiza solo.

const OBSTACULOS = [
  { tipo: "baldosa", nombre: "Baldosa floja", donde: "Desde Palermo" },
  { tipo: "perro", nombre: "Perro", donde: "Desde Palermo" },
  { tipo: "basura", nombre: "Basura", donde: "Desde Palermo" },
  { tipo: "cono", nombre: "Cono", donde: "Desde Palermo" },
  { tipo: "paseador", nombre: "Paseador", donde: "Desde Recoleta" },
  { tipo: "moto", nombre: "Moto delivery", donde: "En Retiro" },
]

function HowToPlayScreen({ volverA = "/" }) {
  return (
    <PantallaFondo>
      <div className="tarjeta-resultado tarjeta-como-jugar">
        <GameHeader tamano="chico" />
        <h2>¿CÓMO SE JUEGA?</h2>

        <ol className="pasos">
          <li>
            <span className="paso-numero">1</span>
            <div>
              <strong>Saltá</strong>
              <p>Con la barra espaciadora, la flecha ↑, el botón ¡SALTÁ! o tocando la calle. Pausa: P o Esc.</p>
            </div>
          </li>

          <li>
            <span className="paso-numero">2</span>
            <div>
              <strong>Esquivá el caos de la vereda</strong>
              <p>Cada choque te saca una vida. Arrancás con {VIDAS_INICIALES} ♥. Cada barrio suma obstáculos nuevos.</p>
              <div className="fila-dibujos">
                {OBSTACULOS.map((obstaculo) => (
                  <figure key={obstaculo.tipo}>
                    <Obstaculo tipo={obstaculo.tipo} />
                    <figcaption>
                      {obstaculo.nombre}
                      <small>{obstaculo.donde}</small>
                    </figcaption>
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
                <p>Cada mate te devuelve una vida (hasta {VIDAS_INICIALES}) y suma {PUNTOS_MATE} puntos.</p>
              </div>
              <span className="dibujo-chico"><Mate /></span>
            </div>
          </li>

          <li>
            <span className="paso-numero">4</span>
            <div className="paso-con-dibujo">
              <div>
                <strong>Sumá puntos y llegá a la parada</strong>
                <p>
                  Cada obstáculo esquivado suma. Con 5 seguidos sin chocar, valen el doble; con 10, el triple.
                  Al llegar, cada vida que te quede suma {BONUS_POR_VIDA} y te da una estrella.
                </p>
              </div>
              <span className="dibujo-chico"><Parada /></span>
            </div>
          </li>
        </ol>

        <Link to={volverA} className="game-button game-button-principal">
          ¡ENTENDIDO!  →
        </Link>
      </div>
    </PantallaFondo>
  )
}

export default HowToPlayScreen
