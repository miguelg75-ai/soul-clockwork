# ⚙️ Soul Clockwork: Eclipse

![HTML5](https://img.shields.io/badge/HTML5-Canvas-f59e0b?style=for-the-badge&logo=html5)
![JavaScript](https://img.shields.io/badge/JavaScript-Vanilla-fcd34d?style=for-the-badge&logo=javascript)
![PWA](https://img.shields.io/badge/PWA-Ready-38bdf8?style=for-the-badge)

**Soul Clockwork: Eclipse** es un *Auto-Battler / Survival Roguelite* desarrollado enteramente en un solo archivo HTML utilizando Vanilla JavaScript y la API de HTML5 Canvas. Sobrevive a hordas de autómatas corruptos, recolecta éter, sube de nivel y evoluciona tu arsenal antes de enfrentarte al Archimago Mecánico.

## 🎮 Juega ahora
👉 **[JUGAR EN EL NAVEGADOR](https://miguelg75-ai.github.io/soul-clockwork/)**

*(Soporte nativo para PC y dispositivos móviles. Instalable como App PWA).*

## ✨ Características Principales
* **Motor Personalizado a 60 FPS:** Renderizado ultra-rápido en Canvas 2D con un sistema propio de *Object Pooling* y *Spatial Hashing* para manejar miles de partículas y enemigos sin caída de frames.
* **Sistema de Evoluciones:** 10 armas y pasivas distintas que pueden fusionarse para crear arsenales destructivos masivos.
* **Audio Procedural (Web Audio API):** Sin archivos de sonido externos. Toda la música (escalas Phrygian/Minor) y los efectos de sonido son sintetizados en tiempo real mediante matemáticas.
* **Cross-Save (Datos en la Nube):** Exporta e importa el código de tu partida para conservar tu progreso entre PC y móvil.
* **Diseño AAA & Neón:** Estética retro-moderna inspirada en *Geometry Wars*, con *motion blur*, partículas reactivas y daño crítico flotante.

## 🕹️ Controles
* **PC:** Teclas `W A S D` o Flechas Direccionales para moverte. El disparo es automático.
* **Móvil:** Toca y arrastra en cualquier parte de la pantalla para activar el Joystick virtual.

## 🚀 Arquitectura Técnica
El proyecto nació como un desafío técnico de optimización extrema:
- **Cero dependencias:** Ni React, ni Phaser, ni librerías externas.
- **Service Workers:** Soporte completo Offline (PWA).
- **Gestión de Memoria:** Reciclaje de entidades para evitar el *Garbage Collection* de JavaScript durante el combate.
