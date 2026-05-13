// keyhelper class to help manage keys
export class KeyHelper {
	private keys: { [key: string]: boolean } = {};
	private listeners: { key: string, listener: () => void }[] = [];

	constructor() {
		window.addEventListener("blur", () => {
			this.keys = {};
		});
	}
	setState(key: string, to: boolean) {
		this.keys[key] = to;
	}
	getState(key: string) {
		return this.keys[key];
	}
	addListener(key: string, listener: () => void) {
		this.listeners.push({ key: key, listener: listener });
	}
	addListeners(...values: [string, (() => void)][]) {
		for (let value of values) this.addListener(value[0], value[1]);
	}
	update() {
		for (let listener of this.listeners) {
			if (this.getState(listener.key)) listener.listener();
		}
	}
}