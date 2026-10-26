import { useCallback, useState } from "react"
import { Navigate, Route, Routes, useNavigate } from "react-router-dom"
import "./App.css"
import StartScreen from "./components/StartScreen"
import Level1 from "./components/Level1"
import ResultScreen from "./components/ResultScreen"
import HowToPlayScreen from "./components/HowToPlayScreen"
import { PALERMO, RECOLETA } from "./game/niveles"

// Las PANTALLAS del juego son rutas de React Router (cada una tiene su dirección):
//   /           → Inicio (escribir el nombre)
//   /juego      → Nivel 1 · Palermo
//   /recoleta   → Nivel 2 · Recoleta (se habilita al ganar Palermo)
//   /resultado  → Ganaste o perdiste
//   /como-jugar → Instrucciones (se llega desde el inicio)
// Lo que pasa ADENTRO de una pantalla (saltar, perder una vida, agarrar un mate)
// no cambia la ruta: es estado interno de esa pantalla (ver Level1.jsx).

function App() {
  // El nombre del jugador (se guarda al apretar "¡A correr!")
  const [nombre, setNombre] = useState("")
  // "ganaste" o "perdiste"
  const [resultado, setResultado] = useState(null)
  // En qué nivel terminó la última partida (1 = Palermo, 2 = Recoleta)
  const [nivelTerminado, setNivelTerminado] = useState(1)
  // Recoleta se desbloquea recién cuando ganás Palermo
  const [recoletaHabilitada, setRecoletaHabilitada] = useState(false)
  // Cambiar este número hace que el nivel arranque de cero
  const [partida, setPartida] = useState(0)

  // useNavigate nos da una función para cambiar de ruta desde el código
  // (por ejemplo, cuando termina el nivel, sin que nadie haga clic en un link)
  const navegar = useNavigate()

  function empezarJuego(nombreIngresado) {
    setNombre(nombreIngresado)
    setRecoletaHabilitada(false) // jugador nuevo: arranca en Palermo
    setPartida((n) => n + 1)
    navegar(PALERMO.ruta)
  }

  // useCallback evita que la función cambie en cada render del nivel
  const terminarNivel = useCallback(
    (resultadoFinal, numeroNivel) => {
      setResultado(resultadoFinal)
      setNivelTerminado(numeroNivel)
      if (resultadoFinal === "ganaste" && numeroNivel === 1) {
        setRecoletaHabilitada(true)
      }
      navegar("/resultado")
    },
    [navegar],
  )

  // Reintentar repite el MISMO nivel en el que perdiste
  function reintentar() {
    setPartida((n) => n + 1)
    navegar(nivelTerminado === 2 ? RECOLETA.ruta : PALERMO.ruta)
  }

  // Ganaste Palermo: el mismo jugador pasa a Recoleta
  function seguirARecoleta() {
    setPartida((n) => n + 1)
    navegar(RECOLETA.ruta)
  }

  // Ganaste los dos niveles: volvés a empezar desde Palermo
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

      <Route
        path={PALERMO.ruta}
        element={
          // Si alguien entra directo a /juego sin haber puesto su nombre
          // (o recarga la página), lo mandamos de vuelta al inicio.
          nombre ? (
            <Level1 key={partida} nombre={nombre} nivel={PALERMO} onTerminar={terminarNivel} />
          ) : (
            <Navigate to="/" replace />
          )
        }
      />

      <Route
        path={RECOLETA.ruta}
        element={
          // A Recoleta solo se entra después de ganar Palermo
          nombre && recoletaHabilitada ? (
            <Level1 key={partida} nombre={nombre} nivel={RECOLETA} onTerminar={terminarNivel} />
          ) : (
            <Navigate to="/" replace />
          )
        }
      />

      <Route
        path="/resultado"
        element={
          resultado ? (
            <ResultScreen
              nombre={nombre}
              resultado={resultado}
              nivel={nivelTerminado === 2 ? RECOLETA : PALERMO}
              onReintentar={reintentar}
              onSeguir={seguirARecoleta}
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
