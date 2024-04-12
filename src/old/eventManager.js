class EventManager {
  constructor() {
    this.listeners = {};
  }

  subscribe(eventType, listener) {
    if (!this.listeners[eventType]) {
      this.listeners[eventType] = [];
    }
    this.listeners[eventType].push(listener);
  }

  notify(eventType, data) {
    if (this.listeners[eventType]) {
      this.listeners[eventType].forEach((listener) => listener(data));
    }
  }
}
