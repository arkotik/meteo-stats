import { id2method } from '../../lib/utils';

class BaseController {
	constructor({ action, data, socket }) {
		this._action = action;
		this._data = data;
		this._socket = socket;
	}

	get data() {
		return this._data || {};
	}

	get action() {
		return this._action;
	}

	get io() {
		return BaseController.io;
	}

	get socket() {
		return this._socket;
	}

	static manager = null;
	static io = null;
}

BaseController.prototype.runAction = async function () {
	const action = id2method(`action-${this.action}`);
	if (action in this) {
		return this[action]();
	} else {
		throw Error(`Action "${this.action}" does not exists`)
	}
};

BaseController.prototype.emit = function (...args) {
	if (this.io !== null && 'emit' in this.io && typeof this.io.emit === 'function') {
		return this.io.emit(...args);
	}
	return false;
};

export default BaseController;
