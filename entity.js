class Entity {
  constructor(x, y, stage, freq, eventManager) {
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
    this.ticker = new IntervalTicker(freq);
    this.selected = false;
    this.ticker.add(this.addPoint.bind(this));
  }

  addPoint() {
    if (this.selected == true) {
      this.path.addPoint(this.circle.x, this.circle.y);
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
