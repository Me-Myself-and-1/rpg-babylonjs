import { Game } from "../game";
import { KeyHelper } from "../keys";
import { Menu } from "./menu";
import { Settings } from "./settings";

export class PauseMenu extends Menu {
	constructor(game: Game, keyHelper: KeyHelper) {
		super("pause", game);

		const buttons = [
			this.addButton("settings", new Settings(keyHelper, game)),
			this.addButton("inventory"),
			this.addButton("save"),
			this.addButton("load"),
		]
		/*buttons[0].onPointerUpObservable.add((_, ev) => {
			//this.hide(game);
			console.log(ev.userInfo.event);
		});*/
		keyHelper.addListener("pause", () => this.show())
	}
}