class IceMagic {
  constructor(app) {
    this.stage = app.stage;
    this.stage.hitArea = app.screen;

    // UI Element Settings
    this.stageHeight = app.screen.height;
    this.stageWidth = app.screen.width;
    this.sliderWidth = this.stageWidth * 0.8;

    // Path Travelling Settings
    this.frequency = 0.5;
    this.smoothness = 0.0125;
    this.speed = 1;

    this.movement = new IntervalTicker(this.smoothness);

    this.entities = [];
    this.entities.push(new Entity(100, 100, this.stage, this.frequency));
    this.entities.push(new Entity(100, 200, this.stage, this.frequency));
    this.entities.push(new Entity(100, 300, this.stage, this.frequency));

    this.init();
  }

  init() {
    this.movement.add(() => {
      console.log("moving...");
      this.movement_accum += (this.smoothness / this.frequency) * this.speed;
      this.entities.forEach((e) => {
        if (!e.atEnd()) {
          e.pathPosition(this.movement_accum);
        }
      });

      if (this.entities.every((e) => e.atEnd())) {
        this.movement.stop();
      }
    });

    this.startButton = new PIXI.Graphics().circle(300, 300, 25).fill(0x8bb0ac);
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

    new Slider(
      (this.stageWidth - this.sliderWidth) / 2,
      this.stageHeight * 0.9,
      this.sliderWidth,
      this.stage
    );
  }
}
