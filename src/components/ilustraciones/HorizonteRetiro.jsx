// Lo que se ve a lo lejos desde Retiro: las torres de vidrio de Catalinas
// y las grúas del puerto (en vez del Obelisco de los otros barrios).
// Igual que Skyline.jsx, empalma consigo mismo.
function HorizonteRetiro() {
  const torres = [
    [40, 50], [90, 70], [150, 45], [520, 96], [570, 112], [624, 88], [676, 104], [730, 80],
  ]

  return (
    <svg viewBox="0 0 1000 120" preserveAspectRatio="none" className="skyline-dibujo" aria-hidden="true">
      <g fill="#B4C3DD">
        {torres.map(([x, alto]) => (
          <rect key={x} x={x} y={120 - alto} width="40" height={alto} />
        ))}
      </g>
      {/* Grúas del puerto */}
      <g stroke="#B4C3DD" strokeWidth="6" strokeLinecap="round" fill="none">
        <path d="M840 120 V40 H900 M840 40 L800 58 M870 40 V52" />
        <path d="M940 120 V56 H990 M940 56 L912 70 M968 56 V68" />
        <path d="M260 120 V62 H310 M260 62 L232 76" />
      </g>
    </svg>
  )
}

export default HorizonteRetiro
