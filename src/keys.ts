// keyhelper class to help manage keys
export class KeyHelper {
	private keys: { [key: string]: boolean } = {};
	private listeners: { key: string, listener: () => void }[] = [];
	keyNames = {
		moveForward: ["ArrowUp"],
		moveBack: ["ArrowDown"],
		moveLeft: ["ArrowLeft"],
		moveRight: ["ArrowRight"],
		jump: ["Space"],
		pause: ["Escape"],
	}

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
	anyState(keys: string[]) {
		for (let key of keys) if (this.getState(key)) return true;
		return false;
	}
	addListener(key: string, listener: () => void) {
		this.listeners.push({ key: key, listener: listener });
	}
	addListeners(...values: [string, (() => void)][]) {
		for (let value of values) this.addListener(value[0], value[1]);
	}
	update() {
		for (let listener of this.listeners) if (this.anyState(this.keyNames[listener.key])) listener.listener();
	}
}