class Path {
  constructor(stage) {
    this.stage = stage;
    this.points = [];
    this.curve = new PIXI.Graphics();
    this.stage.addChild(this.curve);
    this.tension = 1.3;
    this.color = "red";
  }

  addPoint(x, y) {
    let point = new PIXI.Graphics().circle(0, 0, 5).fill(this.color);
    point.x = x;
    point.y = y;
    this.stage.addChild(point);
    this.points.push(point);
    this.drawCurve();
  }

  drawCurve() {
    this.curve.clear();
    this.curve.moveTo(this.points[0].x, this.points[0].y);

    for (let i = 0; i < this.points.length - 1; i++) {
      const p0 = i > 0 ? this.points[i - 1] : this.points[0];
      const p1 = this.points[i];
      const p2 = this.points[i + 1];
      const p3 = i !== this.points.length - 2 ? this.points[i + 2] : p2;

      // Calculate control points for a smoother transition
      const cp1x = p1.x + ((p2.x - p0.x) * this.tension) / 6;
      const cp1y = p1.y + ((p2.y - p0.y) * this.tension) / 6;
      const cp2x = p2.x - ((p3.x - p1.x) * this.tension) / 6;
      const cp2y = p2.y - ((p3.y - p1.y) * this.tension) / 6;

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

    // Calculate the position along the Bezier curve
    let t = localStep; // Assuming localStep is normalized between 0 and 1 for Bezier curves
    let p0 = segmentIndex > 0 ? this.points[segmentIndex - 1] : this.points[0];
    let p1 = startPoint;
    let p2 = endPoint;
    let p3 =
      segmentIndex !== this.points.length - 2
        ? this.points[segmentIndex + 2]
        : p2;

    // Calculate control points for a smoother transition
    let cp1x = p1.x + ((p2.x - p0.x) * this.tension) / 6;
    let cp1y = p1.y + ((p2.y - p0.y) * this.tension) / 6;
    let cp2x = p2.x - ((p3.x - p1.x) * this.tension) / 6;
    let cp2y = p2.y - ((p3.y - p1.y) * this.tension) / 6;

    // Calculate the position on the Bezier curve using the calculated control points
    let px =
      (1 - t) ** 3 * p1.x +
      3 * (1 - t) ** 2 * t * cp1x +
      3 * (1 - t) * t ** 2 * cp2x +
      t ** 3 * p2.x;
    let py =
      (1 - t) ** 3 * p1.y +
      3 * (1 - t) ** 2 * t * cp1y +
      3 * (1 - t) * t ** 2 * cp2y +
      t ** 3 * p2.y;

    return { x: px, y: py };
  }

  lastPosition() {
    return this.points.length - 1;
  }
}
