# Proceso de trabajo con IA — ¡PARÁ, BONDI!

Registro de cómo fui iterando el juego con un agente de IA (Claude) para el Proyecto Integrador de Contenidos y Creatividad III.
La IA propone y escribe código; yo describo lo que necesito, pruebo el resultado en el navegador (`npm run dev`) y pido correcciones cuando algo no funciona o no se parece al mockup.

Cada iteración quedó guardada en GitHub como un commit (y en varias, como una rama aparte que después uní a `main`).

## Iteraciones

| # | Qué pedí | Qué hizo la IA | Qué revisé yo | Commit / rama |
|---|----------|----------------|---------------|---------------|
| 1 | Armar la base del juego en React + Vite: pantalla de inicio con nombre, nivel 1 y pantalla de resultado. | Creó los componentes `StartScreen`, `Level1`, `ResultScreen`, `GameButton` y `GameHeader`. | Que el input del nombre funcionara y que se pudiera jugar de principio a fin. | `Proyecto inicial ¡PARÁ, BONDI!` |
| 2 | Que el README explique el juego y cómo correrlo. | Reescribió el README con reglas, controles y estructura de carpetas. | Que los comandos (`npm install`, `npm run dev`) fueran los correctos. | `Reescribir el README con la info del juego` · rama `mejorar-readme` |
| 3 | Recuperar la estética argentina, acercar el diseño a mi mockup de alta fidelidad y corregir la corredora, que parecía correr para el lado equivocado. | Rehízo las ilustraciones (corredora, colectivo, barrio, parada, obstáculos) con la paleta del mockup. | Compararlo pantalla por pantalla contra el mockup y chequear que la corredora mire hacia el colectivo. | `Rediseñar el juego según el mockup de alta fidelidad` · rama `diseno-mockup` |
| 4 | El salto se perdía muy rápido y el nivel era muy difícil. Sumar algo que devuelva vidas (mate). | Salto de 0,8 s → 1,15 s, más espacio entre obstáculos, 2 s de inmunidad después de un choque y mates que dan +1 vida (máx. 3). | Jugar varias veces para ver que se pudiera ganar sin que fuera regalado. | `Hacer el nivel 1 más fácil: salto más largo, inmunidad y mates` · rama `nivel1-mas-facil` |
| 5 | Cumplir la consigna del Momento 2: navegación entre pantallas con React Router. | Cambió la navegación por estado (`pantalla === "juego"`) por rutas reales: `/`, `/juego` y `/resultado`, con `BrowserRouter`, `Routes`, `Route`, `Link`, `useNavigate` y `Navigate`. | Probar el recorrido completo, el botón "atrás" del navegador y entrar directo a `/juego` sin nombre (vuelve al inicio). | `Agregar React Router: rutas para Inicio, Juego y Resultado` |

## Decisiones que tomé (y por qué)

- **Pantallas = rutas; lo que pasa adentro del nivel = estado.** Inicio, Juego y Resultado son lugares distintos de la app, entonces tienen su propia dirección. Saltar, perder una vida o agarrar un mate no cambian de pantalla, así que son estado interno de `Level1` (con `useReducer` y `useEffect` para el reloj del juego).
- **Las reglas del juego separadas del dibujo.** `src/game/nivel1.js` no tiene nada visual: solo números y reglas. Así puedo ajustar la dificultad cambiando una constante sin tocar las ilustraciones.
- **Facilitar el nivel 1.** Es el primer contacto con el juego: tiene que poder ganarse para que den ganas de seguir.
- **Mate como objeto que da vidas.** Es el objeto más reconocible de la vida cotidiana argentina y se entiende sin explicación.

## Cómo supervisé a la IA

- Corría el juego después de cada cambio, no daba nada por hecho solo porque la IA dijera que estaba listo.
- Comparaba con el mockup y pedía correcciones concretas ("corre para el lado equivocado", "el salto dura muy poco").
- Trabajé en ramas para poder probar cada cambio antes de unirlo a `main`.

## Próximas iteraciones (Momento 3)

<!-- Completá esta lista con tu plan real -->
- Más obstáculos del concepto original (motos de delivery, gente mirando el celular, autos saliendo del garage).
- Otros objetos argentinos: alfajor (velocidad), SUBE (puntos), zapatillas (salto más alto).
- Diseño responsive y accesibilidad.
- Publicar el juego en Vercel.
