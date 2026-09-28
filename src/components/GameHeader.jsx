// El logo del juego, como en el mockup: "¡PARÁ," en blanco y "BONDI!" en amarillo
function GameHeader({ tamano = "grande" }) {
  const Etiqueta = tamano === "grande" ? "h1" : "p"
  return (
    <Etiqueta className={`logo logo-${tamano}`}>
      <span>¡PARÁ,</span>
      <span className="logo-bondi">BONDI!</span>
    </Etiqueta>
  )
}

export default GameHeader
