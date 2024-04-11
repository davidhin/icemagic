class Entity {
  constructor(x, y, stage, pathTime, eventManager) {
    this.circle = new PIXI.Graphics()
      .circle(0, 0, 25)
      .fill(0x454545)
      .on("pointerdown", this.pointerDown.bind(this))
      .on("pointerup", this.pointerUp.bind(this))
      .on("pointerupoutside", this.pointerUp.bind(this))
      .on("globalpointermove", this.pointerMove.bind(this));
    this.circle.eventMode = "static";
    this.circlePosition(x, y);
    stage.addChild(this.circle);

    this.path = new Path(stage, eventManager);
    this.pathTime = pathTime;
    this.accumulator = 0;
    this.ticker = new PIXI.Ticker().add((t) => this.addPoint(t));
    this.selected = false;
  }

  addPoint(t) {
    if (this.selected == true) {
      this.accumulator += t.deltaMS * (1 / this.pathTime);
      if (this.accumulator >= 1) {
        this.accumulator = 0;
        this.path.addPoint(this.circle.x, this.circle.y);
      }
    }
  }

  pointerDown() {
    this.selected = true;
    this.ticker.start();
  }

  pointerUp() {
    this.selected = false;
    this.ticker.stop();
  }

  pointerMove(e) {
    if (this.selected == true) {
      this.circlePosition(e.global.x, e.global.y);
    }
  }

  circlePosition(x, y) {
    this.circle.x = x;
    this.circle.y = y;
  }

  pathPosition(t) {
    if (this.path.points.length > 0) {
      this.circle.x = this.path.position(t).x;
      this.circle.y = this.path.position(t).y;
    }
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
