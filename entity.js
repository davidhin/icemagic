class Entity {
  constructor(x, y, stage) {
    this.circle = new PIXI.Graphics().circle(0, 0, 25).fill(0x454545);
    this.circle.x = x;
    this.circle.y = y;
    this.stage = stage;
    this.stage.addChild(this.circle);
    this.path = new Path(stage);
    this.ticker = new IntervalTicker(0.25);
    this.selected = false;

    this.init();

    this.pathLine = new PIXI.Graphics();
    this.stage.addChild(this.pathLine);
  }

  init() {
    this.ticker.add(() => {
      if (this.selected == true) {
        this.path.addPoint(this.circle.x, this.circle.y);
      }
    });

    this.circle.on("pointerdown", () => {
      this.selected = true;
      this.circle.lineStyle(20, 0x0000ff, 20);
      this.ticker.start();
    });
    ["pointerup", "pointerupoutside"].forEach((event_type) => {
      this.circle.on(event_type, () => {
        this.selected = false;
        this.ticker.stop();
      });
    });

    this.circle.on("globalpointermove", (event) => {
      if (this.selected == true) {
        this.circle.x = event.global.x;
        this.circle.y = event.global.y;
      }
    });

    this.circle.eventMode = "static";
  }
}
