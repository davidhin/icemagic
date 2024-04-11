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
    this.stage.eventMode = "static";
    this.stage.on("pointerdown", () => {
      this.eventManager.notify("deselect");
    });

    // Initialize entities
    this.entities = [];
    this.entities.push(this.createEntity(100, 100));
    this.entities.push(this.createEntity(100, 200));
    this.entities.push(this.createEntity(100, 300));

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
