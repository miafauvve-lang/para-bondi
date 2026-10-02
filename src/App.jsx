import { useCallback, useState } from "react"
import { Navigate, Route, Routes, useNavigate } from "react-router-dom"
import "./App.css"
import StartScreen from "./components/StartScreen"
import Level1 from "./components/Level1"
import ResultScreen from "./components/ResultScreen"

// Las PANTALLAS del juego son rutas de React Router (cada una tiene su dirección):
//   /           → Inicio (escribir el nombre)
//   /juego      → Nivel 1
//   /resultado  → Ganaste o perdiste
// Lo que pasa ADENTRO de una pantalla (saltar, perder una vida, agarrar un mate)
// no cambia la ruta: es estado interno de esa pantalla (ver Level1.jsx).

function App() {
  // El nombre del jugador (se guarda al apretar "¡A correr!")
  const [nombre, setNombre] = useState("")
  // "ganaste" o "perdiste"
  const [resultado, setResultado] = useState(null)
  // Cambiar este número hace que el nivel arranque de cero
  const [partida, setPartida] = useState(0)

  // useNavigate nos da una función para cambiar de ruta desde el código
  // (por ejemplo, cuando termina el nivel, sin que nadie haga clic en un link)
  const navegar = useNavigate()

  function empezarJuego(nombreIngresado) {
    setNombre(nombreIngresado)
    setPartida((n) => n + 1)
    navegar("/juego")
  }

  // useCallback evita que la función cambie en cada render del nivel
  const terminarNivel = useCallback(
    (resultadoFinal) => {
      setResultado(resultadoFinal)
      navegar("/resultado")
    },
    [navegar],
  )

  function reintentar() {
    setPartida((n) => n + 1)
    navegar("/juego")
  }

  return (
    <Routes>
      <Route
        path="/"
        element={<StartScreen onStart={empezarJuego} nombreInicial={nombre} />}
      />

      <Route
        path="/juego"
        element={
          // Si alguien entra directo a /juego sin haber puesto su nombre
          // (o recarga la página), lo mandamos de vuelta al inicio.
          nombre ? (
            <Level1 key={partida} nombre={nombre} onTerminar={terminarNivel} />
          ) : (
            <Navigate to="/" replace />
          )
        }
      />

      <Route
        path="/resultado"
        element={
          resultado ? (
            <ResultScreen nombre={nombre} resultado={resultado} onReintentar={reintentar} />
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
