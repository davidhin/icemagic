class IceMagic {
  constructor(app) {
    this.stage = app.stage;
    this.stage.hitArea = app.screen;

    // UI Element Settings
    this.stageHeight = app.screen.height;
    this.stageWidth = app.screen.width;
    this.sliderWidth = this.stageWidth * 0.8;
    this.pathPoints = 0;

    // Path Travelling Settings
    this.pathTime = 1000; // Milliseconds to travel between 2 points
    this.pathSpeed = 1 / this.pathTime; // Distance between 2 points is 1
    this.movement = new PIXI.Ticker();

    // Initialize eventManager
    this.eventManager = new EventManager();
    this.eventManager.subscribe("increment", this.updatePathPoints.bind(this));

    // Initialize entities list
    this.entities = [];
    this.init();
  }

  init() {
    this.slider = new Slider(
      (this.stageWidth - this.sliderWidth) / 2,
      this.stageHeight * 0.9,
      this.sliderWidth,
      this.stage,
      this.moveEntities.bind(this)
    );

    this.movement.add((ticker) => {
      this.movement_accum += ticker.deltaMS * this.pathSpeed;
      this.entities.forEach((e) => {
        if (!e.atEnd()) {
          e.pathPosition(this.movement_accum);
        }
      });

      if (this.entities.every((e) => e.atEnd())) {
        this.movement.stop();
      }
    });

    this.startButton = new PIXI.Graphics()
      .circle(this.stageWidth / 2, this.stageHeight * 0.94, 20)
      .fill(0xe76f51);
    this.startButton.eventMode = "static";
    this.startButton.on("pointerdown", () => {
      console.log("start");
      this.movement_accum = 0;
      this.entities.forEach((e) => {
        e.pathPosition(0);
      });
      this.movement.start();
    });
    this.stage.addChild(this.startButton);

    this.addEntityButton = new PIXI.Graphics()
      .circle(this.stageWidth / 2 - 150, this.stageHeight * 0.94, 20)
      .fill(0xe76f51);
    this.addEntityButton.eventMode = "static";
    this.addEntityButton.on("pointerdown", () => {
      this.entities.push(
        this.createEntity(this.stageWidth / 2, this.stageHeight / 2)
      );
    });
    this.stage.addChild(this.addEntityButton);

    this.clearStageButton = new PIXI.Graphics()
      .circle(this.stageWidth / 2 + 150, this.stageHeight * 0.94, 20)
      .fill(0xe76f51);
    this.clearStageButton.eventMode = "static";
    this.clearStageButton.on("pointerdown", () => {
      this.entities.forEach((e) => {
        e.path.points.forEach((p) => {
          this.stage.removeChild(p);
        });
        this.stage.removeChild(e.path.curve);
        this.stage.removeChild(e.circle);
      });
    });
    this.stage.addChild(this.clearStageButton);
  }

  createEntity(x, y) {
    return new Entity(x, y, this.stage, this.pathTime, this.eventManager);
  }

  moveEntities(t) {
    let norm_t = t * this.pathPoints;
    this.entities.forEach((e) => {
      e.pathPosition(norm_t);
    });

    console.log(norm_t);
  }

  updatePathPoints(p) {
    this.pathPoints = Math.max(this.pathPoints, p - 1);
    console.log(this.pathPoints);
  }
}
