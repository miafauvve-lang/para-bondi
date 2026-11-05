import { Link } from "react-router-dom"
import GameButton from "./GameButton"
import PantallaFondo from "./PantallaFondo"
import Estrellas from "./Estrellas"
import Colectivo from "./ilustraciones/Colectivo"
import TablaPuntaje from "./TablaPuntaje"

// Victoria (ruta /victoria). Funciona también como TRANSICIÓN entre niveles:
// muestra cómo te fue y anticipa qué trae el barrio siguiente.
// Si era el último barrio, es la victoria final (¡TRES DE TRES!).
function VictoriaScreen({ nombre, ficha, siguiente, resumen, nuevoRecord, totalGeneral, onSeguir, onRepetir }) {
  const final = siguiente === null

  return (
    <PantallaFondo>
      <div className={`tarjeta-resultado ${final ? "tarjeta-final" : ""}`}>
        <span className="pildora-verde">
          {final ? "PALERMO ✓ · RECOLETA ✓ · RETIRO ✓" : `NIVEL ${ficha.numero} · ${ficha.nombre} ✓`}
        </span>

        <h2>{final ? "¡TRES DE TRES!" : "¡LO ALCANZASTE!"}</h2>
        <Estrellas cantidad={resumen.estrellas} tamano="grande" />

        <p>
          {final
            ? `¡Sos leyenda, ${nombre}! Alcanzaste el bondi en los tres barrios. Ni el chofer lo puede creer.`
            : resumen.estrellas === 3
              ? `¡Sin un rasguño, ${nombre}! El chofer te abrió la puerta y todo.`
              : `¡Bien, ${nombre}! Subiste justo cuando cerraba la puerta.`}
        </p>

        <TablaPuntaje resumen={resumen} nuevoRecord={nuevoRecord} />

        {final ? (
          <p className="dato-chico">
            Puntaje total sumando tu mejor partida en cada barrio:{" "}
            <strong className="numeros">{totalGeneral.toLocaleString("es-AR")}</strong>. ¿Te animás a sacar las 9 estrellas?
          </p>
        ) : (
          // Anticipo del próximo desafío
          <div className="proximo-desafio">
            <span className="nivel-numero">PRÓXIMA PARADA · NIVEL {siguiente.numero}</span>
            <strong>{siguiente.nombre}</strong>
            <p>{siguiente.novedad}</p>
          </div>
        )}

        <div className="resultado-colectivo">
          <Colectivo />
        </div>

        <div className="result-buttons">
          {final ? (
            <Link to="/niveles" className="game-button game-button-principal">
              MEJORAR MIS ESTRELLAS  →
            </Link>
          ) : (
            <GameButton texto={`SEGUIR A ${siguiente.nombre}  →`} onClick={onSeguir} />
          )}
          <GameButton texto={`Repetir ${ficha.barrio}`} variante="claro" onClick={onRepetir} />
          <Link to="/menu" className="game-button game-button-secundario">
            Volver al menú
          </Link>
        </div>
      </div>
    </PantallaFondo>
  )
}

export default VictoriaScreen
