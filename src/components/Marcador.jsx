// El marcador de arriba del nivel: NIVEL, TIEMPO y VIDAS.
// No tiene estado propio: solo muestra lo que le pasa Level1 por props.
//   nivel        → texto del nivel, por ejemplo "1 · PALERMO"
//   tiempo       → lo que falta, ya escrito como reloj ("00:25")
//   vidas        → cuántas vidas quedan ahora
//   vidasMaximas → cuántos corazones dibujar en total
//   sumaVida     → true mientras se ve "¡+1 vida!" (los corazones laten)
//   pierdeVida   → true mientras dura la inmunidad (el chip tiembla)
function Marcador({ nivel, tiempo, vidas, vidasMaximas, sumaVida, pierdeVida }) {
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
          VIDAS <span className="carita" aria-hidden="true">{carita}</span>
        </span>
        <span className="chip-valor corazones" aria-label={`${vidas} de ${vidasMaximas} vidas`}>
          {Array.from({ length: vidasMaximas }, (_, i) => (
            <span key={i} className={i < vidas ? "llena" : "vacia"}>
              {i < vidas ? "♥" : "♡"}
            </span>
          ))}
        </span>
      </div>
    </div>
  )
}

export default Marcador
