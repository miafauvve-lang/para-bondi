# ¡PARÁ, BONDI! 🚌

Un juego web chiquito: el bondi está llegando a la parada y tenés que correr por la vereda esquivando obstáculos para no perderlo.

## Cómo se juega

1. Escribí tu nombre y apretá **¡A CORRER!**
2. Saltá los obstáculos que vienen por la vereda: baldosas flojas, perros, bolsas de basura y conos.
3. Tenés **3 vidas**: cada choque te saca una.
4. Si aguantás hasta llegar a la parada 🚏 (unos 25 segundos), ¡ganaste!

**Controles:** barra espaciadora, flecha ⬆️, el botón **¡SALTÁ!** o tocando la calle (en celular).

## Cómo correrlo en tu compu

Necesitás tener [Node.js](https://nodejs.org) instalado.

```bash
npm install      # instala las dependencias (solo la primera vez)
npm run dev      # abre el juego en modo desarrollo
```

Otros comandos útiles:

| Comando           | Qué hace                                      |
| ----------------- | --------------------------------------------- |
| `npm run build`   | arma la versión final en la carpeta `dist/`   |
| `npm run preview` | muestra esa versión final en el navegador     |
| `npm run lint`    | revisa el código con [Oxlint](https://oxc.rs) |

## Cómo está organizado

```
src/
├── App.jsx              # decide qué pantalla mostrar (inicio, juego, resultado)
├── components/
│   ├── StartScreen.jsx  # pantalla de inicio: pide el nombre
│   ├── Level1.jsx       # el nivel: dibuja la vereda, el bondi y los obstáculos
│   ├── ResultScreen.jsx # pantalla final: ganaste o perdiste
│   ├── ilustraciones/   # dibujos del juego (corredora, colectivo, barrio...) con los colores del mockup
│   ├── GameHeader.jsx   # el título del juego
│   └── GameButton.jsx   # botón reutilizable
└── game/
    └── nivel1.js        # las reglas del nivel (sin nada visual)
```

¿Querés cambiar la dificultad? Las constantes al principio de `src/game/nivel1.js` controlan la duración del nivel, las vidas, la velocidad de los obstáculos y el tiempo de salto.

## Hecho con

[React](https://react.dev) + [Vite](https://vite.dev)
