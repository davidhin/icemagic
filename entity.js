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

class Entity {
  constructor(x, y, stage) {
    this.circle = new PIXI.Graphics().circle(0, 0, 25).fill(0x454545);
    this.circle.x = x;
    this.circle.y = y;
    this.circle.roundPixels = true;
    this.stage = stage;
    this.stage.addChild(this.circle);
    this.path = new Path(stage);
    this.selected = false;
    this.ticker = new PIXI.Ticker();

    this.init();

    this.pathLine = new PIXI.Graphics();
    this.stage.addChild(this.pathLine);
  }

  init() {
    this.accumulator = 0.0;
    this.ticker.add((ticker) => {
      this.accumulator += ticker.deltaTime;
      if (this.accumulator >= 15) {
        if (this.selected == true) {
          this.path.addPoint(this.circle.x, this.circle.y);
        }
        this.accumulator = 0;
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
