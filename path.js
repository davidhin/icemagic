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
    if (this.points.length === 0 || this.points.length === 1) {
      return { x: 0, y: 0 };
    }

    // Adjust for the scale of step being between 0 and N
    let numSegments = this.points.length - 1;
    let segmentIndex = Math.floor(step); // Direct mapping of step to index

    // Special case handling when step is exactly at the last point
    if (segmentIndex >= numSegments) {
      return {
        x: this.points[this.points.length - 1].x,
        y: this.points[this.points.length - 1].y,
      };
    }

    // Calculate the local step for interpolation within the current segment
    let localStep = step - segmentIndex;
    let startPoint = this.points[segmentIndex];
    let endPoint = this.points[segmentIndex + 1];
    let deltaX = endPoint.x - startPoint.x;
    let deltaY = endPoint.y - startPoint.y;

    return {
      x: startPoint.x + deltaX * localStep,
      y: startPoint.y + deltaY * localStep,
    };
  }

  lastPosition() {
    return this.points.length - 1;
  }
}
