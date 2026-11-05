import { BONUS_POR_VIDA } from "../game/reglas"

// El desglose del puntaje que se ve al terminar un nivel
function TablaPuntaje({ resumen, nuevoRecord = false }) {
  return (
    <div className="tabla-puntaje">
      {nuevoRecord && <span className="sello-record">¡NUEVO RÉCORD!</span>}
      <dl>
        <div>
          <dt>Obstáculos esquivados</dt>
          <dd className="numeros">
            {resumen.esquivados} / {resumen.totalObstaculos}
          </dd>
        </div>
        <div>
          <dt>Mejor racha</dt>
          <dd className="numeros">{resumen.mejorRacha} seguidos</dd>
        </div>
        <div>
          <dt>Mates</dt>
          <dd className="numeros">{resumen.matesJuntados}</dd>
        </div>
        <div>
          <dt>Puntos de la carrera</dt>
          <dd className="numeros">{resumen.puntos.toLocaleString("es-AR")}</dd>
        </div>
        {resumen.bonusVidas > 0 && (
          <div>
            <dt>Bonus por vidas ({resumen.vidas} × {BONUS_POR_VIDA})</dt>
            <dd className="numeros">+{resumen.bonusVidas.toLocaleString("es-AR")}</dd>
          </div>
        )}
        <div className="fila-total">
          <dt>TOTAL</dt>
          <dd className="numeros">{resumen.total.toLocaleString("es-AR")}</dd>
        </div>
      </dl>
    </div>
  )
}

export default TablaPuntaje
