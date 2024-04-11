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

  controlPoints(p0, p1, p2, p3) {
    const c1x = p1.x + ((p2.x - p0.x) * this.tension) / 6;
    const c1y = p1.y + ((p2.y - p0.y) * this.tension) / 6;
    const c2x = p2.x - ((p3.x - p1.x) * this.tension) / 6;
    const c2y = p2.y - ((p3.y - p1.y) * this.tension) / 6;
    return { c1x, c1y, c2x, c2y };
  }

  drawCurve() {
    this.curve.clear();
    this.curve.moveTo(this.points[0].x, this.points[0].y);

    for (let i = 0; i < this.points.length - 1; i++) {
      const p0 = i > 0 ? this.points[i - 1] : this.points[0];
      const p1 = this.points[i];
      const p2 = this.points[i + 1];
      const p3 = i !== this.points.length - 2 ? this.points[i + 2] : p2;
      const { c1x, c1y, c2x, c2y } = this.controlPoints(p0, p1, p2, p3);
      this.curve.bezierCurveTo(c1x, c1y, c2x, c2y, p2.x, p2.y);
    }
    this.curve.stroke({ color: "#ffffff" });
  }

  position(step) {
    if (this.points.length === 0 || this.points.length === 1) {
      return { x: 0, y: 0 };
    }

    let numSegments = this.points.length - 1;
    let segmentIndex = Math.floor(step);
    if (segmentIndex >= numSegments) {
      return {
        x: this.points[this.points.length - 1].x,
        y: this.points[this.points.length - 1].y,
      };
    }

    let localStep = step - segmentIndex;
    let startPoint = this.points[segmentIndex];
    let endPoint = this.points[segmentIndex + 1];
    let p0 = segmentIndex > 0 ? this.points[segmentIndex - 1] : this.points[0];
    let p1 = startPoint;
    let p2 = endPoint;
    let p3 =
      segmentIndex !== this.points.length - 2
        ? this.points[segmentIndex + 2]
        : p2;

    const { c1x, c1y, c2x, c2y } = this.controlPoints(p0, p1, p2, p3);

    let t = localStep;
    let px =
      (1 - t) ** 3 * p1.x +
      3 * (1 - t) ** 2 * t * c1x +
      3 * (1 - t) * t ** 2 * c2x +
      t ** 3 * p2.x;
    let py =
      (1 - t) ** 3 * p1.y +
      3 * (1 - t) ** 2 * t * c1y +
      3 * (1 - t) * t ** 2 * c2y +
      t ** 3 * p2.y;

    return { x: px, y: py };
  }

  lastPoint() {
    return this.points[this.points.length - 1];
  }
}
