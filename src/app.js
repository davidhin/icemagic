import { Application } from "pixi.js";

const app = new Application();

await app.init({
  width: window.innerWidth,
  height: window.innerHeight,
  backgroundColor: 0x264653,
  antialias: true,
});

document.body.appendChild(app.canvas);
