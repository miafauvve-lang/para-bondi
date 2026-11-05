# ¡PARÁ, BONDI! 🚌

**Jugalo acá:** https://para-bondi.vercel.app/

Un juego web corto sobre una situación que cualquiera que vive en Buenos Aires conoce: el colectivo ya está llegando a la parada y vos todavía estás a media cuadra. Tenés que correr por la vereda, saltar el caos porteño (baldosas flojas, perros, bolsas de basura, conos, paseadores, motos de delivery) y subirte antes de que arranque.

Proyecto Integrador de **Contenidos y Creatividad III** (Lic. en Comunicación Digital, Universidad de Palermo).

## Concepto y público

La idea es convertir algo cotidiano y un poco frustrante (perder el bondi) en un juego rápido y con humor. La estética está inspirada en la vida diaria de la ciudad: veredas de baldosas, el cordón amarillo, el colectivo rojo y crema con fileteado, el mate y tres barrios reconocibles (Palermo, Recoleta y Retiro).

Está pensado para jóvenes y adultos que viven en Buenos Aires o la conocen, y que buscan partidas cortas (de 25 a 35 segundos por nivel) para jugar desde la compu o el celular, sin instalar nada.

## Cómo se juega

**Objetivo:** llegar a la parada en cada barrio antes de quedarte sin vidas.

**Controles:**

- Saltar: barra espaciadora, flecha ⬆️, el botón **¡SALTÁ!** o tocando la calle (en celular).
- Pausa: tecla **P** o **Esc**, o el botón **II**. El juego también se pausa solo si cambiás de pestaña.

**Reglas:**

- Arrancás con **3 vidas**. Cada choque con un obstáculo te saca una y después parpadeás unos segundos sin poder perder otra (inmunidad).
- Los **mates** 🧉 que aparecen en la vereda te devuelven una vida (hasta 3).
- Antes de cada nivel hay una cuenta regresiva que presenta el barrio y lo nuevo que trae.

**Puntuación:**

| Qué hacés | Puntos |
| --- | --- |
| Esquivar un obstáculo común | 100 |
| Esquivar un paseador o una moto | 200 |
| Racha: 5 obstáculos seguidos sin chocar | cada uno vale x2 |
| Racha: 10 o más seguidos | cada uno vale x3 |
| Agarrar un mate | 50 |
| Llegar a la parada | 500 por cada vida que te quede |

Al ganar un barrio sumás **una estrella por cada vida** con la que llegaste (máximo 3 por barrio, 9 en total). El juego guarda tu mejor puntaje y tus estrellas en cada barrio.

**Victoria y derrota:**

- **Ganás** el nivel si llegás a la parada (se termina el tiempo del recorrido) con al menos una vida. Se desbloquea el barrio siguiente.
- **Perdés** si te quedás sin vidas: el bondi arranca y se va. Podés reintentar el mismo barrio y la pantalla te da un consejo según con qué chocaste.
- Si ganás los tres barrios, aparece la victoria final: **¡TRES DE TRES!**

## Los tres barrios

La dificultad sube de un barrio a otro, y cada uno suma algo nuevo que aparece al principio del nivel para que lo puedas aprender antes de que se mezcle con lo demás. Además, dentro de Recoleta y Retiro el ritmo se acelera a medida que te acercás a la parada.

| | Palermo | Recoleta | Retiro |
| --- | --- | --- | --- |
| Duración | 25 s | 30 s | 35 s |
| Lo nuevo | Los obstáculos de siempre: baldosa floja, perro, basura y cono | **Paseadores de perros**: ocupan más vereda, hay que saltar con más precisión | **Motos de delivery** que vienen más rápido (con aviso ¡MOTO!) y **obstáculos dobles** que se pasan de un solo salto |
| Respiro entre obstáculos | Siempre igual | Se achica hasta un 20 % hacia el final | Se achica hasta un 25 % hacia el final |
| Mates | Cada 2 obstáculos | Cada 4 | Cada 5 |
| Inmunidad después de chocar | 2 s | 1,6 s | 1,2 s |

Los números de cada nivel están en `src/game/niveles.js`. Para ajustarlos usé una simulación (`scripts/simular-dificultad.mjs`) que juega miles de partidas con jugadores "robot" de distinta puntería y mide cuántas ganan en cada barrio. Así comprobé que la dificultad sube de verdad, que no se puede ganar Recoleta ni Retiro apretando el botón sin mirar, y que con buena puntería los tres se pueden ganar.

```bash
node scripts/simular-dificultad.mjs
```

## Pantallas (React Router)

| Ruta | Pantalla | Qué pasa |
| --- | --- | --- |
| `/` | Portada | escribís tu nombre (o seguís con el jugador guardado) |
| `/bienvenida` | Bienvenida | la historia y el objetivo del juego |
| `/menu` | Menú principal | jugar el próximo barrio, elegir barrio, tutorial, reglas |
| `/tutorial` | Tutorial | práctica corta que no saca vidas, con un cartel ¡AHORA! que marca cuándo saltar |
| `/niveles` | Elegir barrio | barrios disponibles y bloqueados, estrellas y récords |
| `/nivel/palermo`, `/nivel/recoleta`, `/nivel/retiro` | Nivel | el juego |
| `/victoria` | Victoria | puntaje, estrellas y anticipo del barrio siguiente |
| `/derrota` | Derrota | puntaje, consejo y reintentar |
| `/como-jugar` | ¿Cómo se juega? | las reglas para consultar |

Si entrás a una pantalla sin haber puesto tu nombre, o a un barrio que todavía no desbloqueaste, el juego te lleva a donde corresponde. El avance se guarda en el navegador (`localStorage`), así que recargar la página no borra los barrios desbloqueados.

## Tecnologías

- [React](https://react.dev) 19
- [React Router](https://reactrouter.com) 7 (navegación entre pantallas)
- [Vite](https://vite.dev) (servidor de desarrollo y armado del proyecto)
- [Oxlint](https://oxc.rs) (revisión del código)
- CSS propio (glassmorfismo en los paneles, animaciones) e ilustraciones SVG hechas como componentes de React
- Publicado en [Vercel](https://vercel.com)

## Cómo correrlo en tu compu

Necesitás tener [Node.js](https://nodejs.org) instalado.

```bash
npm install      # instala las dependencias (solo la primera vez)
npm run dev      # abre el juego en modo desarrollo (http://localhost:5173)
```

Otros comandos útiles:

| Comando | Qué hace |
| --- | --- |
| `npm run build` | arma la versión final en la carpeta `dist/` |
| `npm run preview` | muestra esa versión final en el navegador |
| `npm run lint` | revisa el código con Oxlint |

## Cómo está organizado

```
src/
├── main.jsx                 # arranca React y envuelve todo en BrowserRouter
├── App.jsx                  # define las rutas y guarda el avance del jugador
├── components/
│   ├── StartScreen.jsx      # portada: pide el nombre
│   ├── BienvenidaScreen.jsx # historia y objetivo
│   ├── MenuScreen.jsx       # menú principal
│   ├── TutorialScreen.jsx   # práctica guiada
│   ├── NivelesScreen.jsx    # elegir barrio
│   ├── PantallaNivel.jsx    # el juego: escena, cuenta regresiva y pausa
│   ├── VictoriaScreen.jsx   # ganaste (y transición al barrio siguiente)
│   ├── DerrotaScreen.jsx    # perdiste
│   ├── HowToPlayScreen.jsx  # reglas
│   ├── Marcador.jsx         # nivel, tiempo, vidas y puntos
│   ├── TablaPuntaje.jsx     # desglose del puntaje al terminar
│   └── ilustraciones/       # dibujos SVG: corredora, colectivo, barrios, obstáculos, mate...
└── game/
    ├── reglas.js            # las reglas del juego (sin nada visual)
    ├── niveles.js           # la "ficha" de cada barrio: qué cambia en cada uno
    └── progreso.js          # guarda el avance en el navegador
```

## Proceso de desarrollo con IA

Desarrollé el juego con asistencia de un agente de IA (Claude) para programar y corregir. Yo definí la temática, la estética y el mockup del juego; la IA proponía y escribía el código, y yo probaba cada versión en el navegador y pedía correcciones cuando algo no funcionaba o no se parecía a lo que quería.

Para la entrega final incorporé la devolución del profesor sobre el avance: el juego tenía buena jugabilidad, pero faltaban pantallas intermedias (bienvenida, menú de niveles, tutorial) y la dificultad era repetitiva entre niveles. Con esa devolución le pedí a la IA los cambios, y después probé personalmente el resultado completo.

El registro detallado de las iteraciones está en [PROCESO-IA.md](PROCESO-IA.md).

## Mejoras realizadas para la entrega final

- **Bienvenida:** una pantalla que presenta la historia y el objetivo después de escribir el nombre.
- **Tutorial:** una práctica guiada que no saca vidas y enseña cuándo saltar.
- **Menú y selector de niveles:** menú principal y pantalla para elegir barrio, con niveles bloqueados, estrellas y récords.
- **Pantallas entre niveles:** cuenta regresiva que presenta cada barrio, victoria con anticipo del barrio siguiente y derrota con consejo y reintento.
- **Dificultad progresiva:** cada barrio suma obstáculos nuevos (paseadores, motos, dobles), menos mates, menos inmunidad y un ritmo que se acelera hacia el final.
- **Puntuación:** puntos por obstáculo, rachas, bonus por vidas y estrellas.
- **Pausa** y guardado del avance en el navegador.
- Se mantuvieron los fondos, las ilustraciones y la jugabilidad del nivel de Palermo.
