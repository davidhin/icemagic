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

  position(step) {
    if (this.points.length == 0) {
      return { x: 0, y: 0 };
    }

    if (this.points.length == 1) {
      return { x: 0, y: 0 };
    }

    let numSegments = this.points.length - 1;
    let segmentIndex = Math.floor(step * numSegments);
    if (step === 1) {
      return {
        x: this.points[this.points.length - 1].x,
        y: this.points[this.points.length - 1].y,
      };
    }
    let localStep = step * numSegments - segmentIndex;
    let startPoint = this.points[segmentIndex];
    let endPoint = this.points[segmentIndex + 1];
    let deltaX = endPoint.x - startPoint.x;
    let deltaY = endPoint.y - startPoint.y;
    return {
      x: startPoint.x + deltaX * localStep,
      y: startPoint.y + deltaY * localStep,
    };
  }
}
