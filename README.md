# 🧛‍♂️ Soul Survivor: Dark Fantasy

![HTML5](https://img.shields.io/badge/HTML5-Canvas-f59e0b?style=for-the-badge&logo=html5)
![JavaScript](https://img.shields.io/badge/JavaScript-Vanilla-fcd34d?style=for-the-badge&logo=javascript)
![PWA](https://img.shields.io/badge/PWA-Ready-38bdf8?style=for-the-badge)

**Soul Survivor: Dark Fantasy** es un *Auto-Battler / Survival Roguelite* desarrollado enteramente en un solo archivo HTML utilizando Vanilla JavaScript y la API de HTML5 Canvas. 

## 🎮 Juega ahora
👉 **[JUGAR EN EL NAVEGADOR](https://miguelg75-ai.github.io/soul-clockwork/)**

*(Soporte nativo para PC, Móvil y Gamepads Bluetooth. Instalable como App PWA Offline).*

## ✨ Ingeniería y Arquitectura
Este proyecto nació como un desafío de optimización extrema para navegadores sin usar ningún framework (ni React, ni Phaser):
* **Motor Custom a 60 FPS:** Sistema propio de *Object Pooling* y *Spatial Hashing* para renderizar hordas de enemigos y cientos de proyectiles sin activar el *Garbage Collector*.
* **Asset Loader & State Machine:** Sistema de carga asíncrona de Spritesheets con máquinas de estado (Idle/Run) renderizados mediante `ctx.drawImage`.
* **Game Feel (Juice):** Físicas de inercia para partículas de sangre, iluminación dinámica (*Vignette*) calculada en tiempo real y *Hit-Stop* (micro-congelamiento de pantalla) en impactos críticos.
* **Audio Procedural (Web Audio API):** Cero archivos `.mp3`. Toda la música (escala menor y líneas de bajo) y los SFX son sintetizados matemáticamente con osciladores.
* **Integraciones Nativas:** *Gamepad API* para detectar controles de consola y *Service Workers* para funcionar sin conexión a internet.

---
**Desarrollado por:** Miguel Angel Gonzalez Gutierrez
