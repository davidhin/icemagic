class IceMagic {
  constructor(app) {
    this.stage = app.stage;
    new Entity(100, 100, this.stage);
    new Entity(100, 200, this.stage);
    new Entity(100, 300, this.stage);
  }
}
