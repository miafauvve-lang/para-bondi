// Las estrellas de un barrio: una por cada vida con la que llegaste a la parada
function Estrellas({ cantidad = 0, maximo = 3, tamano = "normal" }) {
  return (
    <span className={`estrellas estrellas-${tamano}`} aria-label={`${cantidad} de ${maximo} estrellas`}>
      {Array.from({ length: maximo }, (_, i) => (
        <span key={i} className={i < cantidad ? "llena" : "vacia"}>
          ★
        </span>
      ))}
    </span>
  )
}

export default Estrellas
