class Path {
  constructor(stage) {
    this.stage = stage;
    this.points = [];
    this.line = new PIXI.Graphics();
    this.stage.addChild(this.line);
  }

  addPoint(x, y) {
    let point = new PIXI.Graphics().circle(0, 0, 5).fill("red");
    point.x = x;
    point.y = y;
    this.points.push(point);
    this.stage.addChild(point);
    this.drawLine();
  }

  drawLine() {
    this.line.clear();
    this.line.moveTo(this.points[0].x, this.points[0].y);
    this.points.forEach((point) => {
      this.line
        .lineStyle(5, 0x733935, 1)
        .lineTo(point.x, point.y)
        .moveTo(point.x, point.y);
    });
    this.line.endFill();
  }
}
