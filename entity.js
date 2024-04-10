class Entity {
  constructor(x, y, stage) {
    this.circle = new PIXI.Graphics().circle(0, 0, 25).fill(0x454545);
    this.circle.x = x;
    this.circle.y = y;
    this.stage = stage;
    this.stage.addChild(this.circle);
    this.path = new Path(stage);

    this.frequency = 0.3;
    this.smoothness = 0.0125;
    this.speed = 1;

    this.ticker = new IntervalTicker(this.frequency);
    this.movement = new IntervalTicker(this.smoothness);
    this.selected = false;
    this.init();
  }

  init() {
    this.ticker.add(() => {
      if (this.selected == true) {
        this.path.addPoint(this.circle.x, this.circle.y);
      }
    });

    this.movement.add((ticker) => {
      this.movement_accum += (this.smoothness / this.frequency) * this.speed;
      this.circle.x = this.path.position(this.movement_accum).x;
      this.circle.y = this.path.position(this.movement_accum).y;
      if (this.movement_accum > this.path.lastPosition()) {
        ticker.stop();
      }
    });

    this.circle.on("pointerdown", () => {
      this.selected = true;
      this.circle.lineStyle(20, 0x0000ff, 20);
      this.ticker.start();
    });

    this.circle.on("rightclick", () => {
      this.movement_accum = 0;
      this.movement.start();
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
