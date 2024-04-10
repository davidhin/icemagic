class Path {
  constructor(stage) {
    this.stage = stage;
    this.points = [];
    this.line = new PIXI.Graphics();
    this.curve = new PIXI.Graphics();
    this.stage.addChild(this.line);
    this.stage.addChild(this.curve);
  }

  addPoint(x, y) {
    let point = new PIXI.Graphics().circle(0, 0, 5).fill("red");
    point.x = x;
    point.y = y;
    this.points.push(point);
    this.stage.addChild(point);
    this.drawLine();
    this.drawCurve();
  }

  drawLine() {
    this.line.clear();
    this.line.moveTo(this.points[0].x, this.points[0].y);
    this.points.forEach((point) => {
      this.line.lineTo(point.x, point.y).moveTo(point.x, point.y);
    });
    this.line.stroke({ color: "#ff0000" });
  }

  drawCurve() {
    if (this.points.length < 3) {
      // Not enough points for a smooth curve; draw straight lines instead
      this.drawLine(); // Assuming drawLine is adapted for simple line drawing
      return;
    }

    this.curve.clear();
    this.curve.lineStyle(5, 0x733935, 1);
    this.curve.moveTo(this.points[0].x, this.points[0].y);

    for (let i = 0; i < this.points.length - 1; i++) {
      const p0 = i > 0 ? this.points[i - 1] : this.points[0];
      const p1 = this.points[i];
      const p2 = this.points[i + 1];
      const p3 = i !== this.points.length - 2 ? this.points[i + 2] : p2;

      // Calculate control points for a smoother transition
      const cp1x = p1.x + (p2.x - p0.x) / 6;
      const cp1y = p1.y + (p2.y - p0.y) / 6;

      const cp2x = p2.x - (p3.x - p1.x) / 6;
      const cp2y = p2.y - (p3.y - p1.y) / 6;

      // Draw the Bézier curve using the calculated control points
      this.curve.bezierCurveTo(cp1x, cp1y, cp2x, cp2y, p2.x, p2.y);
    }
    this.curve.stroke({ color: "#ffffff" });
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
