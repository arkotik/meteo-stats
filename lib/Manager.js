class Manager {
  constructor(socket) {
    this._socket = socket;
    this.events = new Map();
  }

  get io() {
    return this._socket;
  }
}

Manager.prototype.addEvent = function (event, callback) {
  if (!this.events.has(event) && typeof callback === 'function') {
    this.io.on(event, callback);
    this.events.set(event, callback);
  }
  return this;
};

export default Manager;
