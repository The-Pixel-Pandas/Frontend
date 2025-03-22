import { Events } from "phaser";
class EventHandler {
	constructor() {
		if (this.instance) {
			return;
		}
		this.events = new Events.EventEmitter();
		this.coin = 0;
		this.instance = this;
	}
	setCoin(amount) {
		this.coin = amount;
	}
	getCoin() {
		return this.coin;
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
