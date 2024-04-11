class IceMagic {
  constructor(app) {
    this.stage = app.stage;

    this.frequency = 0.5;
    this.smoothness = 0.0125;
    this.speed = 1;

    this.movement = new IntervalTicker(this.smoothness);

    this.init();
  }

  init() {
    let e1 = new Entity(100, 100, this.stage, this.frequency);
    let e2 = new Entity(100, 200, this.stage, this.frequency);
    let e3 = new Entity(100, 300, this.stage, this.frequency);

    this.movement.add((ticker) => {
      this.movement_accum += (this.smoothness / this.frequency) * this.speed;
      if (!e1.atEnd()) {
        e1.pathPosition(this.movement_accum);
      }
      if (!e2.atEnd()) {
        e2.pathPosition(this.movement_accum);
      }
    });

    this.startButton = new PIXI.Graphics().circle(300, 300, 25).fill(0x8bb0ac);
    this.startButton.eventMode = "static";
    this.startButton.on("pointerdown", () => {
      console.log("start");
      this.movement_accum = 0;
      e1.pathPosition(0);
      e2.pathPosition(0);
      this.movement.start();
    });
    this.stage.addChild(this.startButton);
  }
}
