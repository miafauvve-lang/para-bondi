// La pantalla de juego. Se usa para la PRÁCTICA y para los TRES barrios:
// lo que cambia entre uno y otro llega en la prop "ficha" (ver game/niveles.js).
//
// Tiene tres "momentos" que NO son rutas, sino estado de esta pantalla:
//   1. la cuenta regresiva (3, 2, 1, ¡YA!) que presenta el barrio y lo nuevo
//   2. el juego en sí (el reloj corre)
//   3. la pausa (el reloj se frena; se puede seguir, reiniciar o salir)
// Cuando el nivel termina, le avisa a App con onTerminar y App cambia de ruta.
import { useEffect, useReducer, useState } from "react"
import GameHeader from "./GameHeader"
import GameButton from "./GameButton"
import Marcador from "./Marcador"
import Corredora from "./ilustraciones/Corredora"
import Colectivo from "./ilustraciones/Colectivo"
import Parada from "./ilustraciones/Parada"
import Obstaculo from "./ilustraciones/Obstaculo"
import Mate from "./ilustraciones/Mate"
import Barrio from "./ilustraciones/Barrio"
import BarrioRecoleta from "./ilustraciones/BarrioRecoleta"
import BarrioRetiro from "./ilustraciones/BarrioRetiro"
import Skyline from "./ilustraciones/Skyline"
import HorizonteRetiro from "./ilustraciones/HorizonteRetiro"
import {
  TICK,
  DURACION_SALTO,
  VIDAS_MAXIMAS,
  JUGADOR_X,
  VELOCIDAD_BASE,
  crearEstadoInicial,
  actualizarNivel,
  estaEnElAire,
  esInmune,
  multiplicador,
  saltoSeguroAhora,
  proximoPatron,
  calcularResumen,
} from "../game/reglas"

// El paisaje de cada barrio (según el número de nivel; la práctica es en Palermo):
//   Fondo     → la capa de edificios / plaza que pasa detrás de la vereda
//   Horizonte → la capa lejana, que se mueve más despacio
//   cielo     → clase de App.css que cambia el color del cielo
const ESCENARIOS = {
  0: { Fondo: Barrio, Horizonte: Skyline, cielo: "" },
  1: { Fondo: Barrio, Horizonte: Skyline, cielo: "" },
  2: { Fondo: BarrioRecoleta, Horizonte: Skyline, cielo: "cielo-recoleta" },
  3: { Fondo: BarrioRetiro, Horizonte: HorizonteRetiro, cielo: "cielo-retiro" },
}

const SEGUNDOS_CUENTA = 3

function PantallaNivel({ nombre, ficha, onTerminar, onReiniciar, onSalir, ayuda = null }) {
  // El estado arranca SIEMPRE de cero, armado con la ficha del nivel
  const [estado, dispatch] = useReducer(actualizarNivel, ficha, crearEstadoInicial)
  // Cuenta regresiva antes de arrancar (la práctica no tiene: arranca con el primer salto)
  const [cuenta, setCuenta] = useState(ficha.practica ? 0 : SEGUNDOS_CUENTA)
  const [pausado, setPausado] = useState(false)

  const jugando = cuenta === 0 && !pausado && !estado.resultado

  // 1. Cuenta regresiva: baja un número por segundo hasta llegar a 0
  useEffect(() => {
    if (cuenta === 0 || pausado) return
    const espera = setTimeout(() => setCuenta((c) => c - 1), 1000)
    return () => clearTimeout(espera)
  }, [cuenta, pausado])

  // 2. El "reloj" del juego: cada TICK ms avanza todo un poquito.
  //    Solo corre mientras se juega; al pausar, terminar o salir de la pantalla
  //    el return lo apaga (así nunca quedan relojes viejos andando).
  useEffect(() => {
    if (!jugando) return
    const reloj = setInterval(() => dispatch({ tipo: "tick" }), TICK)
    return () => clearInterval(reloj)
  }, [jugando])

  // 3. Teclado: saltar (espacio / ↑) y pausar (P / Esc)
  useEffect(() => {
    function alApretarTecla(evento) {
      if (evento.code === "Space" || evento.code === "ArrowUp") {
        evento.preventDefault() // para que la página no haga scroll
        // Dejar la tecla apretada no cuenta: hay que apretar en el momento justo
        if (!evento.repeat && jugando) dispatch({ tipo: "saltar" })
      }
      if ((evento.code === "KeyP" || evento.code === "Escape") && !estado.resultado) {
        setPausado((p) => !p)
      }
    }
    window.addEventListener("keydown", alApretarTecla)
    return () => window.removeEventListener("keydown", alApretarTecla)
  }, [jugando, estado.resultado])

  // 4. Si cambiás de pestaña o minimizás, el juego se pausa solo
  useEffect(() => {
    function alCambiarVisibilidad() {
      if (document.hidden) setPausado(true)
    }
    document.addEventListener("visibilitychange", alCambiarVisibilidad)
    return () => document.removeEventListener("visibilitychange", alCambiarVisibilidad)
  }, [])

  // 5. Cuando termina el nivel, le pasamos el resumen a App (con una pausita para ver el final)
  useEffect(() => {
    if (!estado.resultado) return
    const resumen = calcularResumen(estado)
    const espera = setTimeout(() => onTerminar(resumen), 900)
    return () => clearTimeout(espera)
    // Solo cuando aparece el resultado; el resto del estado ya no cambia después
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [estado.resultado, onTerminar])

  function saltar() {
    if (jugando) dispatch({ tipo: "saltar" })
  }

  const enElAire = estaEnElAire(estado)
  const golpeado = esInmune(estado) // parpadea mientras dura la inmunidad
  const mensaje = estado.mensaje

  // Los segundos que faltan, como en el mockup (00:25)
  const transcurrido = estado.inicio === null ? 0 : estado.tiempo - estado.inicio
  const segundosRestantes = Math.max(0, Math.ceil((ficha.duracion - transcurrido) / 1000))
  const reloj = `00:${String(segundosRestantes).padStart(2, "0")}`

  // La parada aparece desde la derecha en el último tramo y frena delante de la corredora
  const tramoFinal = Math.max(0, (estado.progreso - 85) / 15)
  const paradaX = 108 - tramoFinal * (108 - (JUGADOR_X + 10))

  // El colectivo va adelante, a la derecha. En el tramo final frena con la puerta
  // justo en la parada; si perdiste, arranca y se va.
  const bondiX = 74 - tramoFinal * (74 - (paradaX - 6))
  const bondiSeVa = estado.resultado === "perdiste"

  // ¿Viene una moto? Se avisa un segundo antes de que aparezca, con un cartel a la derecha
  const proximo = proximoPatron(estado)
  const avisoMoto =
    (proximo?.patron === "moto" && estado.tiempo >= proximo.aparece - 1000) ||
    estado.obstaculos.some((o) => o.tipo === "moto" && o.x > 60)

  // Cartel "¡AHORA!" del tutorial: aparece cuando saltar en ese momento es seguro
  const mostrarAhora = ayuda?.mostrarAhora?.(estado) && saltoSeguroAhora(estado) && !enElAire

  const { Fondo, Horizonte, cielo } = ESCENARIOS[ficha.numero]
  // Qué tan rápido va este nivel comparado con Palermo (1 = igual).
  // App.css lo usa para que la vereda y el barrio se muevan al ritmo de los obstáculos.
  const ritmo = ficha.velocidad / VELOCIDAD_BASE
  const etiquetaNivel = ficha.practica ? "PRÁCTICA" : `${ficha.numero} · ${ficha.nombre}`

  return (
    <div className={`pantalla-juego ${jugando ? "" : "quieto"}`}>
      <header className="barra-juego">
        <GameHeader tamano="chico" />

        <Marcador
          nivel={etiquetaNivel}
          tiempo={reloj}
          vidas={estado.vidas}
          vidasMaximas={VIDAS_MAXIMAS}
          puntos={estado.puntos}
          multiplicador={multiplicador(estado.racha)}
          sumaVida={mensaje?.tipo === "vida"}
          pierdeVida={golpeado && !ficha.practica}
          practica={ficha.practica}
        />

        <button
          type="button"
          className="boton-pausa"
          onClick={() => setPausado(true)}
          aria-label="Pausar"
          disabled={!!estado.resultado}
        >
          II
        </button>
      </header>

      {/* Tocar la escena también sirve para saltar (útil en celular) */}
      <div className="escena-marco">
        <div
          className={`escena ${cielo}`}
          onPointerDown={saltar}
          style={{ "--duracion-salto": `${DURACION_SALTO}ms`, "--ritmo": ritmo }}
        >
          <div className="capa nubes" />
          <div className="capa pista skyline">
            <Horizonte />
            <Horizonte />
          </div>
          <div className="capa pista barrio">
            <Fondo />
            <Fondo />
          </div>
          <div className="capa vereda" />
          <div className="capa cordon" />
          <div className="capa calle">
            <div className="linea-calle" />
          </div>

          <div className="sprite parada" style={{ left: `${paradaX}%` }}>
            <Parada />
          </div>

          {estado.obstaculos.map((obstaculo) => (
            <div
              key={obstaculo.id}
              className={`sprite obstaculo obstaculo-${obstaculo.tipo}`}
              style={{ left: `${obstaculo.x}%` }}
            >
              <Obstaculo tipo={obstaculo.tipo} />
            </div>
          ))}

          {estado.mates.map((mate) => (
            <div key={mate.id} className="sprite mate" style={{ left: `${mate.x}%` }}>
              <Mate />
            </div>
          ))}

          <div
            className={`sprite corredora ${enElAire ? "jumping" : ""} ${golpeado ? "hit" : ""}`}
            style={{ left: `${JUGADOR_X}%` }}
          >
            <Corredora />
          </div>

          {mensaje && (
            <p
              key={mensaje.hasta}
              className={`cartel-flotante cartel-${mensaje.tipo}`}
              style={{ left: `${JUGADOR_X + 2}%` }}
            >
              {mensaje.texto}
            </p>
          )}

          {mostrarAhora && <p className="cartel-ahora">¡AHORA!</p>}

          {avisoMoto && (
            <p className="aviso-moto" role="status">
              🛵 ¡MOTO!
            </p>
          )}

          <div
            className={`sprite colectivo ${bondiSeVa ? "se-va" : ""}`}
            style={{ left: `${bondiX}%` }}
          >
            <Colectivo />
          </div>

          {ayuda ? (
            <p className="aliento instruccion">{ayuda.texto(estado)}</p>
          ) : (
            <p className="aliento">¡Dale, {nombre}!</p>
          )}
        </div>
      </div>

      <footer className="barra-inferior">
        <GameButton texto="¡SALTÁ!  ↑" variante="saltar" onClick={saltar} />

        <div className="recorrido">
          <span>SALIDA</span>
          <div className="progress" aria-label="Distancia hasta la parada">
            <div className="progress-fill" style={{ width: `${estado.progreso}%` }} />
            <div className="progress-marca" style={{ left: `${estado.progreso}%` }} />
          </div>
          <span>PARADA</span>
        </div>

        <p className="hint">
          Saltá con la barra espaciadora, la flecha ↑ o tocando la calle · Pausa: P o Esc.
          <span className="hint-girar"> Tip: girá el celular para ver la vereda más grande.</span>
        </p>
      </footer>

      {/* Presentación del barrio + cuenta regresiva */}
      {cuenta > 0 && (
        <div className="capa-overlay">
          <div className="panel-vidrio panel-cuenta">
            <span className="pildora-verde">NIVEL {ficha.numero} · {ficha.nombre}</span>
            <p className="cuenta-lema">{ficha.lema}</p>
            <p className="cuenta-meta">
              META: llegá a la parada en {ficha.duracion / 1000} segundos
            </p>
            {ficha.numero > 1 && (
              <p className="cuenta-novedad">
                <strong>NUEVO:</strong> {ficha.novedad}
              </p>
            )}
            <p className="cuenta-numero" key={cuenta}>
              {cuenta}
            </p>
          </div>
        </div>
      )}

      {/* Pausa */}
      {pausado && !estado.resultado && (
        <div className="capa-overlay">
          <div className="panel-vidrio panel-pausa" role="dialog" aria-label="Pausa">
            <h2>PAUSA</h2>
            <p>El bondi te espera... por ahora.</p>
            <div className="result-buttons">
              <GameButton texto="SEGUIR  ▶" onClick={() => setPausado(false)} />
              <GameButton texto="REINICIAR NIVEL" variante="claro" onClick={onReiniciar} />
              <GameButton texto="Salir al menú" variante="secundario-claro" onClick={onSalir} />
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default PantallaNivel
