import { Events } from "phaser";
class EventHandler {
	constructor() {
		if (this.instance) {
			return;
		}
		this.events = new Events.EventEmitter();
		this.instance = this;
	}
	addEventListener(eventName, callback) {
		this.events.on(eventName, callback);
	}
	removeEventListener(eventName, callback) {
		this.events.off(eventName, callback);
	}
	dispatchEvent(eventName, data) {
		this.events.emit(eventName, data);
	}
}

const eventHandler = new EventHandler();
export default eventHandler;
