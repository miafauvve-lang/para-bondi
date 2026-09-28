function GameButton({ texto, onClick, type = "button", disabled = false }) {
  return (
    <button className="game-button" type={type} onClick={onClick} disabled={disabled}>
      {texto}
    </button>
  )
}

export default GameButton
