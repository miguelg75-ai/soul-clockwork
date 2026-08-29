# 🧛‍♂️ Soul Survivor: Dark Fantasy (v1.0)

![HTML5](https://img.shields.io/badge/HTML5-Canvas-f59e0b?style=for-the-badge&logo=html5)
![JavaScript](https://img.shields.io/badge/JavaScript-Vanilla-fcd34d?style=for-the-badge&logo=javascript)
![PWA](https://img.shields.io/badge/PWA-Ready-38bdf8?style=for-the-badge)

**Soul Survivor: Dark Fantasy** es un *Auto-Battler / Survival Roguelite* desarrollado enteramente con Vanilla JavaScript y la API de HTML5 Canvas.

## 🎮 Juega ahora
👉 **[JUGAR EN EL NAVEGADOR](https://miguelg75-ai.github.io/soul-clockwork/)**

*(Soporte nativo para PC, Móvil y Gamepads Bluetooth. Instalable como App PWA Offline).*

## ✨ Arquitectura de Software
Este proyecto es un ejercicio de optimización extrema en Canvas 2D sin frameworks:
* **Motor Custom a 60 FPS:** *Object Pooling* y *Spatial Hashing* para renderizar hordas masivas sin activar el *Garbage Collector* de JS.
* **Asset Loader Custom:** Sistema de carga asíncrona de Spritesheets con máquinas de estado animadas (`ctx.drawImage`).
* **Game Feel (Juice):** Físicas inerciales, *Hit-Stop* en golpes críticos y un sistema procedural de iluminación dinámica.
* **Progresión Persistente:** Sistema de logros y desbloqueos guardados en `localStorage` con soporte Cross-Save por texto.
* **Integración de Hardware:** *Gamepad API* para detectar controles de consola y *Service Workers* para funcionar sin conexión a internet.

---
**Desarrollado por:** Miguel Angel Gonzalez Gutierrez
