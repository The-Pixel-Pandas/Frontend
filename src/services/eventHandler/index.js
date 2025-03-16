import { Events } from "phaser";
class EventHandler {
	constructor() {
		this.events = new Events.EventEmitter();
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
