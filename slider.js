class Slider {
  constructor(x, y, width, stage) {
    this.width = width;
    this.stage = stage;

    this.slider = new PIXI.Graphics()
      .rect(0, 0, this.width, 4)
      .fill({ color: 0x272d37 });
    this.slider.x = x;
    this.slider.y = y;

    this.handle = new PIXI.Graphics().circle(0, 0, 8).fill({ color: 0xffffff });
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
    const halfHandleWidth = this.handle.width / 2;

    this.handle.x = Math.max(
      halfHandleWidth,
      Math.min(this.slider.toLocal(e.global).x, this.width - halfHandleWidth)
    );
  }
}
