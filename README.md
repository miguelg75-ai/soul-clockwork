# 🧛‍♂️ Soul Survivor: Dark Fantasy

![HTML5](https://img.shields.io/badge/HTML5-Canvas-f59e0b?style=for-the-badge&logo=html5)
![JavaScript](https://img.shields.io/badge/JavaScript-Vanilla-fcd34d?style=for-the-badge&logo=javascript)
![PWA](https://img.shields.io/badge/PWA-Ready-38bdf8?style=for-the-badge)

**Soul Survivor: Dark Fantasy** es un *Auto-Battler / Survival Roguelite* desarrollado enteramente en un solo archivo HTML utilizando Vanilla JavaScript y la API de HTML5 Canvas. Sobrevive a hordas de criaturas de la noche, recolecta diamantes, sube de nivel y evoluciona tus reliquias antes de enfrentarte al Dragón de la Noche.

## 🎮 Juega ahora
👉 **[JUGAR EN EL NAVEGADOR](https://miguelg75-ai.github.io/soul-clockwork/)**

*(Soporte nativo para PC, dispositivos móviles y Controles Bluetooth. Instalable como App PWA).*

## ✨ Características Principales
* **Motor Personalizado a 60 FPS:** Renderizado ultra-rápido en Canvas 2D con un sistema propio de *Object Pooling* y *Spatial Hashing* para manejar miles de partículas y enemigos sin caída de frames.
* **Sistema de Evoluciones:** Múltiples armas y reliquias pasivas que pueden fusionarse para crear arsenales destructivos masivos.
* **Audio Procedural (Web Audio API):** Sin archivos de sonido externos. Toda la música (escalas oscuras de bajo) y los efectos de sonido son sintetizados en tiempo real mediante matemáticas.
* **Cross-Save (Datos en la Nube):** Exporta e importa el código de tu partida ("Pergamino de Almas") para conservar tu progreso entre PC y móvil.
* **Soporte de Gamepad:** Detecta automáticamente controles físicos para una experiencia de consola.
* **Monetización Preparada:** Simulador de Ads implementado de forma nativa para futuras integraciones.

## 🕹️ Controles
* **PC:** Teclas `W A S D` o Flechas Direccionales para moverte. El disparo es automático.
* **Móvil:** Toca y arrastra en cualquier parte de la pantalla para activar el Joystick virtual.
* **Gamepad:** Conecta por Bluetooth y usa el Joystick izquierdo/Cruceta para moverte. Botón `A`/`X` para aceptar y `Start` para pausar.

## 🚀 Arquitectura Técnica
El proyecto nació como un desafío técnico de optimización extrema:
- **Cero dependencias:** Ni React, ni Phaser, ni librerías externas.
- **Arte Dinámico:** Todo el arte está basado en Sprites de Emojis tipográficos y formas dinámicas, manteniendo el peso del juego en pocos kilobytes.
- **Gestión de Memoria:** Reciclaje de entidades para evitar interrupciones por el *Garbage Collection* de JavaScript durante el combate.

---
**Desarrollado por:** Miguel Angel Gonzalez Gutierrez
