import { useCallback, useState } from "react"
import { Link } from "react-router-dom"
import GameButton from "./GameButton"
import PantallaFondo from "./PantallaFondo"
import PantallaNivel from "./PantallaNivel"
import { PRACTICA } from "../game/niveles"

// Tutorial (ruta /tutorial): una práctica corta en Palermo que NO saca vidas.
// Primero te muestra cuándo saltar (cartel ¡AHORA!), después te deja solo.
// Los textos cambian según cuánto avanzaste desde el primer salto.
const AYUDA_HASTA = 9700 // ms: hasta acá aparece el cartel ¡AHORA!
const MATE_HASTA = 11400

const ayuda = {
  texto(estado) {
    if (estado.inicio === null) return "Apretá ESPACIO, ↑ o tocá la calle para saltar y arrancar"
    const t = estado.tiempo - estado.inicio
    if (t < AYUDA_HASTA) return "Saltá cuando aparezca ¡AHORA!"
    if (t < MATE_HASTA) return "¡Un mate! Pasá por encima: suma una vida y 50 puntos"
    return "Ahora sin ayuda: los dos últimos los saltás vos"
  },
  mostrarAhora(estado) {
    return estado.inicio !== null && estado.tiempo - estado.inicio < AYUDA_HASTA
  },
}

function TutorialScreen({ nombre, onTerminarTutorial, onIrAPalermo, onSalir }) {
  // Cambiar "intento" reinicia la práctica de cero (React arma un PantallaNivel nuevo)
  const [intento, setIntento] = useState(0)
  const [resumen, setResumen] = useState(null)

  const terminar = useCallback(
    (resultado) => {
      setResumen(resultado)
      onTerminarTutorial()
    },
    [onTerminarTutorial],
  )

  function repetir() {
    setResumen(null)
    setIntento((n) => n + 1)
  }

  if (resumen) {
    const perfecto = resumen.choques === 0
    return (
      <PantallaFondo>
        <div className="tarjeta-resultado">
          <span className="pildora-verde">PRÁCTICA COMPLETADA ✓</span>
          <h2>{perfecto ? "¡IMPECABLE!" : "¡YA LE AGARRASTE LA MANO!"}</h2>
          <p>
            Esquivaste {resumen.esquivados} de {resumen.totalObstaculos} obstáculos
            {resumen.matesJuntados > 0 ? " y te tomaste un mate" : ""}.{" "}
            {perfecto
              ? `Estás para Palermo, ${nombre}.`
              : "Si chocaste, probá saltar un toque antes. Podés repetir cuantas veces quieras."}
          </p>
          <p className="dato-chico">
            En los niveles de verdad cada choque te saca una vida, y esquivar varios seguidos
            multiplica tus puntos (x2, x3).
          </p>
          <div className="result-buttons">
            <GameButton texto="IR A PALERMO  →" onClick={onIrAPalermo} />
            <GameButton texto="Repetir práctica" variante="claro" onClick={repetir} />
            <Link to="/menu" className="game-button game-button-secundario">
              Volver al menú
            </Link>
          </div>
        </div>
      </PantallaFondo>
    )
  }

  return (
    <PantallaNivel
      key={intento}
      nombre={nombre}
      ficha={PRACTICA}
      ayuda={ayuda}
      onTerminar={terminar}
      onReiniciar={repetir}
      onSalir={onSalir}
    />
  )
}

export default TutorialScreen
