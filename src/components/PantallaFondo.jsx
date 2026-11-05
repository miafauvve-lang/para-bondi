import portada from "../assets/portada.jpg"

// El fondo de todas las pantallas que no son el juego: la ilustración de la
// portada, desenfocada y oscurecida (así se mantiene la identidad visual).
function PantallaFondo({ children, className = "" }) {
  return (
    <div className={`pantalla-resultado ${className}`} style={{ backgroundImage: `url(${portada})` }}>
      {children}
    </div>
  )
}

export default PantallaFondo
