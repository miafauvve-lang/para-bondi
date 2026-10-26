import { useCallback, useState } from "react"
import { Navigate, Route, Routes, useNavigate } from "react-router-dom"
import "./App.css"
import StartScreen from "./components/StartScreen"
import Level1 from "./components/Level1"
import ResultScreen from "./components/ResultScreen"
import HowToPlayScreen from "./components/HowToPlayScreen"
import { NIVELES, PALERMO } from "./game/niveles"

// Las PANTALLAS del juego son rutas de React Router (cada una tiene su dirección):
//   /           → Inicio (escribir el nombre)
//   /juego      → Nivel 1 · Palermo
//   /recoleta   → Nivel 2 · Recoleta (se habilita al ganar Palermo)
//   /retiro     → Nivel 3 · Retiro (se habilita al ganar Recoleta)
//   /resultado  → Ganaste o perdiste
//   /como-jugar → Instrucciones (se llega desde el inicio)
// Lo que pasa ADENTRO de una pantalla (saltar, perder una vida, agarrar un mate)
// no cambia la ruta: es estado interno de esa pantalla (ver Level1.jsx).

function App() {
  // El nombre del jugador (se guarda al apretar "¡A correr!")
  const [nombre, setNombre] = useState("")
  // "ganaste" o "perdiste"
  const [resultado, setResultado] = useState(null)
  // En qué nivel terminó la última partida (1 = Palermo, 2 = Recoleta, 3 = Retiro)
  const [nivelTerminado, setNivelTerminado] = useState(1)
  // Hasta qué nivel llegó el jugador: al ganar uno se desbloquea el siguiente
  const [nivelMaximo, setNivelMaximo] = useState(1)
  // Cambiar este número hace que el nivel arranque de cero
  const [partida, setPartida] = useState(0)

  // useNavigate nos da una función para cambiar de ruta desde el código
  // (por ejemplo, cuando termina el nivel, sin que nadie haga clic en un link)
  const navegar = useNavigate()

  function empezarJuego(nombreIngresado) {
    setNombre(nombreIngresado)
    setNivelMaximo(1) // jugador nuevo: arranca en Palermo
    setPartida((n) => n + 1)
    navegar(PALERMO.ruta)
  }

  // useCallback evita que la función cambie en cada render del nivel
  const terminarNivel = useCallback(
    (resultadoFinal, numeroNivel) => {
      setResultado(resultadoFinal)
      setNivelTerminado(numeroNivel)
      // Ganaste y hay un nivel después: queda desbloqueado
      if (resultadoFinal === "ganaste" && numeroNivel < NIVELES.length) {
        setNivelMaximo((maximo) => Math.max(maximo, numeroNivel + 1))
      }
      navegar("/resultado")
    },
    [navegar],
  )

  // La ficha del nivel que se acaba de jugar y la del siguiente (null si era el último).
  // Como NIVELES empieza en 0 y los números en 1: el nivel 2 está en NIVELES[1].
  const nivelActual = NIVELES[nivelTerminado - 1]
  const nivelSiguiente = NIVELES[nivelTerminado] ?? null

  // Reintentar repite el MISMO nivel en el que perdiste
  function reintentar() {
    setPartida((n) => n + 1)
    navegar(nivelActual.ruta)
  }

  // Ganaste: el mismo jugador pasa al barrio siguiente
  function seguir() {
    setPartida((n) => n + 1)
    navegar(nivelSiguiente.ruta)
  }

  // Ganaste los tres niveles: volvés a empezar desde Palermo
  function jugarDeNuevo() {
    setPartida((n) => n + 1)
    navegar(PALERMO.ruta)
  }

  return (
    <Routes>
      <Route
        path="/"
        element={<StartScreen onStart={empezarJuego} nombreInicial={nombre} />}
      />

      <Route path="/como-jugar" element={<HowToPlayScreen />} />

      {/* Una ruta por nivel (/juego, /recoleta, /retiro), todas con el mismo componente.
          Si alguien entra directo sin nombre, o a un nivel que todavía no desbloqueó
          (o recarga la página), lo mandamos de vuelta al inicio. */}
      {NIVELES.map((nivel) => (
        <Route
          key={nivel.numero}
          path={nivel.ruta}
          element={
            nombre && nivel.numero <= nivelMaximo ? (
              <Level1 key={partida} nombre={nombre} nivel={nivel} onTerminar={terminarNivel} />
            ) : (
              <Navigate to="/" replace />
            )
          }
        />
      ))}

      <Route
        path="/resultado"
        element={
          resultado ? (
            <ResultScreen
              nombre={nombre}
              resultado={resultado}
              nivel={nivelActual}
              siguiente={nivelSiguiente}
              onReintentar={reintentar}
              onSeguir={seguir}
              onJugarDeNuevo={jugarDeNuevo}
            />
          ) : (
            <Navigate to="/" replace />
          )
        }
      />

      {/* Cualquier otra dirección (por ejemplo /hola) vuelve al inicio */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}

export default App
