import { Button } from "@babylonjs/gui";
import { KeyHelper } from "../keys";
import { Menu } from "./menu";
import { Game } from "../game";

export class Settings extends Menu {
	protected focus: Button | undefined;

	constructor(keyHelper: KeyHelper, game: Game) {
		super("settings", game);
		this.addText("keyBinding")
		for (let key of Object.keys(keyHelper.keyNames)) {
			const button = this.addButton(key);
			button.onPointerUpObservable.add(() => {
				this.focus = button;
			});
		}
	}
}