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
      .on("pointerdown", this.pointerDown.bind(this))
      .on("pointerup", () => (this.selected = false))
      .on("pointerupoutside", () => (this.selected = false))
      .on("globalpointermove", this.onDrag.bind(this));

    this.stage.addChild(this.slider);
    this.slider.addChild(this.handle);
  }

  pointerDown(e) {
    e.stopPropagation();
    this.selected = true;
  }

  onDrag(e) {
    if (!this.selected) return;

    this.handle.x = Math.max(
      0,
      Math.min(this.slider.toLocal(e.global).x, this.width)
    );

    this.callback(this.handle.x / this.width);
  }
}
