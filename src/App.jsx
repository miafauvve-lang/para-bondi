import { useCallback, useState } from "react"
import { Navigate, Route, Routes, useNavigate, useParams } from "react-router-dom"
import "./App.css"
import StartScreen from "./components/StartScreen"
import BienvenidaScreen from "./components/BienvenidaScreen"
import MenuScreen from "./components/MenuScreen"
import TutorialScreen from "./components/TutorialScreen"
import NivelesScreen from "./components/NivelesScreen"
import PantallaNivel from "./components/PantallaNivel"
import VictoriaScreen from "./components/VictoriaScreen"
import DerrotaScreen from "./components/DerrotaScreen"
import HowToPlayScreen from "./components/HowToPlayScreen"
import { NIVELES, PALERMO, nivelPorId } from "./game/niveles"
import { leerJugadorActual, leerPerfil, guardarPerfil, totales } from "./game/progreso"

// Las PANTALLAS del juego son rutas de React Router (cada una tiene su dirección):
//   /                → Portada: escribir el nombre (o seguir con el guardado)
//   /bienvenida      → La historia y el objetivo
//   /menu            → Menú principal
//   /tutorial        → Práctica guiada (no saca vidas)
//   /niveles         → Elegir barrio (bloqueados / desbloqueados / récords)
//   /nivel/:barrio   → El juego: /nivel/palermo, /nivel/recoleta, /nivel/retiro
//   /victoria        → Ganaste: puntaje + anticipo del barrio siguiente
//   /derrota         → Perdiste: puntaje + consejo + reintentar
//   /como-jugar      → Reglas de consulta
// Lo que pasa ADENTRO del nivel (saltar, pausar, la cuenta regresiva) no cambia
// la ruta: es estado interno de PantallaNivel.

function App() {
  // El nombre del jugador. Arranca vacío: hay que entrar por la portada
  // (o por "Seguir como...", que recupera el último jugador guardado).
  const [nombre, setNombre] = useState(() => leerJugadorActual())
  // El avance de ese jugador (barrios desbloqueados, récords), guardado en el navegador
  const [perfil, setPerfil] = useState(() => leerPerfil(leerJugadorActual()))
  // Cómo terminó la última partida (solo en memoria: si recargás /victoria, vas al menú)
  const [ultima, setUltima] = useState(null)
  // Cambiar este número hace que el nivel arranque de cero (reintentar / reiniciar)
  const [partida, setPartida] = useState(0)

  // useNavigate nos da una función para cambiar de ruta desde el código
  const navegar = useNavigate()

  // Cada cambio de avance se guarda al toque en el navegador
  const actualizarPerfil = useCallback(
    (cambio) => {
      setPerfil((anterior) => {
        const nuevo = { ...anterior, ...cambio(anterior) }
        guardarPerfil(nombre, nuevo)
        return nuevo
      })
    },
    [nombre],
  )

  function entrarConNombre(nombreIngresado) {
    setNombre(nombreIngresado)
    const perfilGuardado = leerPerfil(nombreIngresado)
    setPerfil(perfilGuardado)
    guardarPerfil(nombreIngresado, perfilGuardado)
    setUltima(null)
    navegar("/bienvenida")
  }

  function jugarNivel(id) {
    setPartida((n) => n + 1)
    navegar(`/nivel/${id}`)
  }

  const marcarTutorialVisto = useCallback(() => {
    actualizarPerfil(() => ({ tutorialVisto: true }))
  }, [actualizarPerfil])

  // Cuando termina un nivel: guardamos récord y desbloqueos y vamos a la pantalla que corresponde
  const terminarNivel = useCallback(
    (ficha, resumen) => {
      const gano = resumen.resultado === "ganaste"
      const recordAnterior = perfil.records[ficha.id]
      const nuevoRecord = gano && (!recordAnterior || resumen.total > recordAnterior.total)

      if (gano) {
        actualizarPerfil((anterior) => ({
          nivelMaximo: Math.min(NIVELES.length, Math.max(anterior.nivelMaximo, ficha.numero + 1)),
          // El récord guarda tu mejor puntaje y tus mejores estrellas en ese barrio
          records: {
            ...anterior.records,
            [ficha.id]: {
              total: Math.max(resumen.total, recordAnterior?.total ?? 0),
              estrellas: Math.max(resumen.estrellas, recordAnterior?.estrellas ?? 0),
            },
          },
        }))
      }

      setUltima({ nivelId: ficha.id, resumen, nuevoRecord })
      navegar(gano ? "/victoria" : "/derrota", { replace: true })
    },
    [perfil.records, actualizarPerfil, navegar],
  )

  const fichaUltima = ultima ? nivelPorId(ultima.nivelId) : null
  const siguiente = fichaUltima ? (NIVELES[fichaUltima.numero] ?? null) : null

  // Si no hay nombre, las pantallas "de adentro" mandan a la portada
  const conNombre = (pantalla) => (nombre ? pantalla : <Navigate to="/" replace />)

  return (
    <Routes>
      <Route
        path="/"
        element={
          <StartScreen
            onStart={entrarConNombre}
            jugadorGuardado={nombre}
            onSeguir={() => navegar("/menu")}
          />
        }
      />

      <Route
        path="/bienvenida"
        element={conNombre(
          <BienvenidaScreen
            nombre={nombre}
            onPracticar={() => navegar("/tutorial")}
            onMenu={() => navegar("/menu")}
          />,
        )}
      />

      <Route
        path="/menu"
        element={conNombre(
          <MenuScreen
            nombre={nombre}
            perfil={perfil}
            onJugar={jugarNivel}
            onCambiarJugador={() => navegar("/")}
          />,
        )}
      />

      <Route
        path="/tutorial"
        element={conNombre(
          <TutorialScreen
            nombre={nombre}
            onTerminarTutorial={marcarTutorialVisto}
            onIrAPalermo={() => jugarNivel(PALERMO.id)}
            onSalir={() => navegar("/menu")}
          />,
        )}
      />

      <Route path="/niveles" element={conNombre(<NivelesScreen perfil={perfil} onJugar={jugarNivel} />)} />

      <Route
        path="/nivel/:barrio"
        element={conNombre(
          <RutaNivel
            nombre={nombre}
            perfil={perfil}
            partida={partida}
            onTerminar={terminarNivel}
            onReiniciar={() => setPartida((n) => n + 1)}
            onSalir={() => navegar("/menu")}
          />,
        )}
      />

      <Route
        path="/victoria"
        element={conNombre(
          ultima?.resumen.resultado === "ganaste" ? (
            <VictoriaScreen
              nombre={nombre}
              ficha={fichaUltima}
              siguiente={siguiente}
              resumen={ultima.resumen}
              nuevoRecord={ultima.nuevoRecord}
              totalGeneral={totales(perfil).puntos}
              onSeguir={() => jugarNivel(siguiente.id)}
              onRepetir={() => jugarNivel(fichaUltima.id)}
            />
          ) : (
            <Navigate to="/menu" replace />
          ),
        )}
      />

      <Route
        path="/derrota"
        element={conNombre(
          ultima?.resumen.resultado === "perdiste" ? (
            <DerrotaScreen
              nombre={nombre}
              ficha={fichaUltima}
              resumen={ultima.resumen}
              onReintentar={() => jugarNivel(fichaUltima.id)}
            />
          ) : (
            <Navigate to="/menu" replace />
          ),
        )}
      />

      <Route path="/como-jugar" element={<HowToPlayScreen volverA={nombre ? "/menu" : "/"} />} />

      {/* Cualquier otra dirección (por ejemplo /hola o la vieja /juego) vuelve al inicio */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}

// La ruta /nivel/:barrio lee el barrio de la dirección con useParams.
// Si el barrio no existe vuelve a /niveles; si está bloqueado, también.
function RutaNivel({ nombre, perfil, partida, onTerminar, onReiniciar, onSalir }) {
  const { barrio } = useParams()
  const ficha = nivelPorId(barrio)

  // onTerminar de App necesita saber QUÉ nivel terminó
  const terminar = useCallback((resumen) => onTerminar(ficha, resumen), [onTerminar, ficha])

  if (!ficha || ficha.numero > perfil.nivelMaximo) return <Navigate to="/niveles" replace />

  return (
    <PantallaNivel
      // La key cambia al reintentar o cambiar de barrio: React arma el nivel de cero
      key={`${ficha.id}-${partida}`}
      nombre={nombre}
      ficha={ficha}
      onTerminar={terminar}
      onReiniciar={onReiniciar}
      onSalir={onSalir}
    />
  )
}

export default App
