import { Button, ScrollViewer, StackPanel } from "@babylonjs/gui";
import { KeyHelper } from "../keys";
import { Menu } from "./menu";
import { Game } from "../game";

export class Settings extends Menu {
	private listener: (ev: KeyboardEvent) => void;

	constructor(keyHelper: KeyHelper, game: Game) {
		super("settings", game);
		this.listener = () => { };
		this.addText("keyBinding");
		for (let key of Object.keys(keyHelper.keyNames)) {
			const button = this.addButton(key);
			const keys = new StackPanel(key + "Buttons");
			keys.adaptHeightToChildren = true;
			keys.adaptWidthToChildren = true;
			keys.isVertical = false;
			keys.spacing = 15;
			for (let keyName of keyHelper.keyNames[key]) {
				const button = Menu.makeButton(keyName);
				button.onPointerUpObservable.add(() => {
					button.dispose();
					keyHelper.keyNames[key] = keyHelper.keyNames[key].filter(v => v !== keyName);
				});
				keys.addControl(button);
			}
			this.panel.addControl(keys);
			button.onPointerUpObservable.add(() => {
				window.removeEventListener("keyup", this.listener);
				this.listener = ev => {
					if (keyHelper.keyNames[key].indexOf(ev.code) === -1) {
						keyHelper.keyNames[key].push(ev.code);
						const button = Menu.makeButton(ev.code);
						button.onPointerUpObservable.add(() => {
							button.dispose();
							keyHelper.keyNames[key] = keyHelper.keyNames[key].filter(v => v !== ev.code);
						});
						keys.addControl(button);
					}
					window.removeEventListener("keyup", this.listener);
				};
				window.addEventListener("keyup", this.listener);
			});
		}
	}
}