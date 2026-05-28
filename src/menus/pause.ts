import { Button, Control } from "@babylonjs/gui";
import { Game } from "../game";
import { Menu } from "./menu";

export class PauseMenu extends Menu {
	constructor(game: Game) {
		super("pause");

		const buttons = [
			this.addButton("Unpause"),
			this.addButton("Settings"),
			this.addButton("Inventory"),
			this.addButton("Save"),
			this.addButton("Load"),
		]
		buttons[0].onPointerUpObservable.add(() => {
			this.hide(game);
		});

		this.show(game);
	}
}