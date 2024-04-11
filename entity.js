class Entity {
  constructor(x, y, stage, freq) {
    this.circle = new PIXI.Graphics().circle(0, 0, 25).fill(0x454545);
    this.circlePosition(x, y);
    this.stage = stage;
    this.stage.addChild(this.circle);
    this.path = new Path(stage);
    this.ticker = new IntervalTicker(freq);
    this.selected = false;
    this.init();
  }

  init() {
    this.ticker.add(() => {
      if (this.selected == true) {
        this.path.addPoint(this.circle.x, this.circle.y);
      }
    });

    this.circle.on("pointerdown", () => {
      this.selected = true;
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
        this.circlePosition(event.global.x, event.global.y);
      }
    });

    this.circle.eventMode = "static";
  }

  circlePosition(x, y) {
    this.circle.x = x;
    this.circle.y = y;
  }

  pathPosition(t) {
    this.circle.x = this.path.position(t).x;
    this.circle.y = this.path.position(t).y;
  }

  atEnd() {
    if (this.path.points.length == 0) {
      return true;
    }

    return (
      this.circle.x == this.path.lastPoint().x &&
      this.circle.y == this.path.lastPoint().y
    );
  }
}
