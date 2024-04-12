class Slider {
  constructor(x, y, width, stage, callback) {
    this.width = width;
    this.stage = stage;
    this.callback = callback;

    this.slider = new PIXI.Graphics()
      .rect(0, 0, this.width, 4)
      .fill({ color: 0x2a9d8f });
    this.slider.x = x;
    this.slider.y = y;

    this.handle = new PIXI.Graphics()
      .circle(0, 0, 20)
      .fill({ color: 0xf4a261 });
    this.handle.y = this.slider.height / 2;
    this.handle.eventMode = "static";
    this.handle.cursor = "pointer";

    this.handle
      .on("pointerdown", (e) => this.onDragStart(e))
      .on("pointerup", (e) => this.onDragEnd(e))
      .on("pointerupoutside", (e) => this.onDragEnd(e));

    this.stage.addChild(this.slider);
    this.slider.addChild(this.handle);
  }

  // Listen to pointermove on stage once handle is pressed.
  onDragStart() {
    this.stage.eventMode = "static";
    this.stage.addEventListener("pointermove", (e) => this.onDrag(e));
  }

  // Stop dragging feedback once the handle is released.
  onDragEnd(e) {
    this.stage.eventMode = "auto";
    this.stage.removeEventListener("pointermove", (e) => this.onDrag(e));
  }

  onDrag(e) {
    this.handle.x = Math.max(
      0,
      Math.min(this.slider.toLocal(e.global).x, this.width)
    );

    this.callback(this.handle.x / this.width);
  }
}
