import { KeyHelper } from "../keys";
import { Menu } from "./menu";
import { Game } from "../game";

export class Settings extends Menu {
	constructor(keyHelper: KeyHelper, game: Game) {
		super("settings", game);
		//const button = this.addButton("test");
		this.addText("keyBinding")
		for (let key of Object.keys(keyHelper.keyNames)) {
			this.addButton(key)
		}
	}
}