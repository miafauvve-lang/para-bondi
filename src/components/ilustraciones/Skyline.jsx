// Siluetas lejanas de la ciudad, con el Obelisco. También empalma consigo misma.
function Skyline() {
  const torres = [
    [20, 60], [70, 90], [110, 50], [160, 100], [230, 70], [290, 85], [350, 55],
    [420, 95], [480, 65], [540, 80], [700, 70], [760, 100], [830, 60], [880, 88], [940, 72],
  ]

  return (
    <svg viewBox="0 0 1000 120" preserveAspectRatio="none" className="skyline-dibujo" aria-hidden="true">
      <g fill="#A9D3EC">
        {torres.map(([x, alto]) => (
          <rect key={x} x={x} y={120 - alto} width="44" height={alto} />
        ))}
        {/* El Obelisco */}
        <path d="M622 120 L626 20 L632 6 L638 20 L642 120 Z" />
      </g>
    </svg>
  )
}

export default Skyline
