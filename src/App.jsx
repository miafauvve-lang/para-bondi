import { useCallback, useState } from "react"
import "./App.css"
import StartScreen from "./components/StartScreen"
import Level1 from "./components/Level1"
import ResultScreen from "./components/ResultScreen"

function App() {
  // En qué pantalla estamos: "inicio", "juego" o "resultado"
  const [pantalla, setPantalla] = useState("inicio")
  // El nombre del jugador (se guarda al apretar "¡A correr!")
  const [nombre, setNombre] = useState("")
  // "ganaste" o "perdiste"
  const [resultado, setResultado] = useState(null)
  // Cambiar este número hace que el nivel arranque de cero
  const [partida, setPartida] = useState(0)

  function empezarJuego(nombreIngresado) {
    setNombre(nombreIngresado)
    setPartida((n) => n + 1)
    setPantalla("juego")
  }

  // useCallback evita que la función cambie en cada render del nivel
  const terminarNivel = useCallback((resultadoFinal) => {
    setResultado(resultadoFinal)
    setPantalla("resultado")
  }, [])

  function reintentar() {
    setPartida((n) => n + 1)
    setPantalla("juego")
  }

  return (
    <div>
      {pantalla === "inicio" && (
        <StartScreen onStart={empezarJuego} nombreInicial={nombre} />
      )}

      {pantalla === "juego" && (
        <Level1 key={partida} nombre={nombre} onTerminar={terminarNivel} />
      )}

      {pantalla === "resultado" && (
        <ResultScreen
          nombre={nombre}
          resultado={resultado}
          onReintentar={reintentar}
          onCambiarNombre={() => setPantalla("inicio")}
        />
      )}
    </div>
  )
}

export default App
