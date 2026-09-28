// variante: "principal" (rojo), "saltar" (amarillo) o "secundario" (solo texto)
function GameButton({ texto, onClick, type = "button", disabled = false, variante = "principal" }) {
  return (
    <button
      className={`game-button game-button-${variante}`}
      type={type}
      onClick={onClick}
      disabled={disabled}
    >
      {texto}
    </button>
  )
}

export default GameButton
