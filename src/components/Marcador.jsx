// El marcador de arriba del nivel: NIVEL, TIEMPO, VIDAS y PUNTOS.
// No tiene estado propio: solo muestra lo que le pasa PantallaNivel por props.
//   nivel         → texto del nivel, por ejemplo "1 · PALERMO"
//   tiempo        → lo que falta, ya escrito como reloj ("00:25")
//   vidas         → cuántas vidas quedan ahora
//   vidasMaximas  → cuántos corazones dibujar en total
//   puntos        → puntaje de esta partida
//   multiplicador → x1, x2 o x3 según la racha de obstáculos esquivados
//   sumaVida      → true mientras se ve "¡+1 vida!" (los corazones laten)
//   pierdeVida    → true mientras dura la inmunidad (el chip tiembla)
//   practica      → en la práctica las vidas no se pierden (se muestra ∞)
function Marcador({ nivel, tiempo, vidas, vidasMaximas, puntos, multiplicador, sumaVida, pierdeVida, practica }) {
  // Una carita según cuántas vidas quedan (solo visual, no cambia las reglas)
  const carita = vidas >= 3 ? "😎" : vidas === 2 ? "😅" : "😰"

  return (
    <div className="chips">
      <div className="chip">
        <span className="chip-titulo">NIVEL</span>
        <span className="chip-valor">{nivel}</span>
      </div>
      <div className="chip chip-verde">
        <span className="chip-titulo">TIEMPO</span>
        <span className="chip-valor">{tiempo}</span>
      </div>
      <div className={`chip chip-vidas ${sumaVida ? "suma" : ""} ${pierdeVida ? "resta" : ""}`}>
        <span className="chip-titulo">
          VIDAS <span className="carita" aria-hidden="true">{practica ? "🧉" : carita}</span>
        </span>
        {practica ? (
          <span className="chip-valor">∞</span>
        ) : (
          <span className="chip-valor corazones" aria-label={`${vidas} de ${vidasMaximas} vidas`}>
            {Array.from({ length: vidasMaximas }, (_, i) => (
              <span key={i} className={i < vidas ? "llena" : "vacia"}>
                {i < vidas ? "♥" : "♡"}
              </span>
            ))}
          </span>
        )}
      </div>
      <div className="chip chip-puntos">
        <span className="chip-titulo">
          PUNTOS
          {multiplicador > 1 && <span className="chip-racha">RACHA x{multiplicador}</span>}
        </span>
        <span className="chip-valor numeros">{puntos.toLocaleString("es-AR")}</span>
      </div>
    </div>
  )
}

export default Marcador
