class IntervalTicker {
  constructor(seconds) {
    this.ticker = new PIXI.Ticker();
    this.interval = 60 * seconds;
    this.accumulator = 0;
  }

  add(callback) {
    this.ticker.add((ticker) => {
      this.accumulator += ticker.deltaTime;
      if (this.accumulator >= this.interval) {
        callback();
        this.accumulator = 0;
      }
    });
  }

  start = () => {
    this.ticker.start();
  };

  stop = () => {
    this.ticker.stop();
  };
}
