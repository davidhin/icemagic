class PathPoint {
  constructor(x, y, stage) {
    this.stage = stage;
    this.circle = new PIXI.Graphics().circle(0, 0, 10).fill("red");
    this.circle.x = x;
    this.circle.y = y;
    this.x = x;
    this.y = y;
    this.stage.addChild(this.circle);
  }
}

class Entity {
  constructor(x, y, stage) {
    this.circle = new PIXI.Graphics().circle(0, 0, 50).fill("black");
    this.circle.x = x;
    this.circle.y = y;
    this.circle.roundPixels = true;
    this.stage = stage;
    this.path = [];
    this.stage.addChild(this.circle);
    this.selected = false;
    this.ticker = new PIXI.Ticker();

    this.init();

    this.pathLine = new PIXI.Graphics();
    this.stage.addChild(this.pathLine);
  }

  drawPath() {
    this.pathLine.clear();
    console.log(this.path[0].x, this.path[0].y);
    this.pathLine.moveTo(this.path[0].x, this.path[0].y);
    this.path.forEach((point) => {
      this.pathLine
        .lineStyle(5, 0x733935, 1)
        .lineTo(point.x, point.y)
        .moveTo(point.x, point.y);
    });
    this.pathLine.endFill();
  }

  distance(x1, y1, x2, y2) {
    return Math.sqrt(Math.pow(x1 - x2, 2) + Math.pow(y1 - y2, 2));
  }

  init() {
    this.ticker.start();

    this.accumulator = 0.0;
    this.ticker.add((ticker) => {
      this.accumulator += ticker.deltaTime;
      if (this.accumulator >= 1) {
        if (this.selected == true) {
          if (this.path.length > 0) {
            let distanceFromLast = this.distance(
              this.path[this.path.length - 1].x,
              this.path[this.path.length - 1].y,
              this.circle.x,
              this.circle.y
            );
            if (distanceFromLast > 50) {
              this.path.push(
                new PathPoint(this.circle.x, this.circle.y, this.stage)
              );
              console.log(this.path);
              this.drawPath();
            }
          } else {
            this.path.push(
              new PathPoint(this.circle.x, this.circle.y, this.stage)
            );
            console.log(this.path);
            this.drawPath();
          }
        }
        this.accumulator = 0;
      }
    });

    this.circle.on("pointerdown", () => {
      this.selected = true;
      this.circle.lineStyle(20, 0x0000ff, 20);
      console.log(this.path);
    });
    ["pointerup", "pointerupoutside"].forEach((event_type) => {
      this.circle.on(event_type, () => {
        this.selected = false;
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
