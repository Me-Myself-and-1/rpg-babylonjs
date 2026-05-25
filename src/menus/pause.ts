import { Button, StackPanel } from "@babylonjs/gui";
import { Game } from "../game";
import { Menu } from "./menu";

export class PauseMenu extends Menu {
	constructor(game: Game) {
		super("pause");

		const panel = new StackPanel("pauseMenu");
		panel.spacing = 10;
		this.gui.addControl(panel);

		const buttons = [
			Button.CreateSimpleButton("unpause", "Unpause"),
			Button.CreateSimpleButton("settings", "Settings")
		]
		buttons[0].onPointerUpObservable.add(() => {
			this.hide(game);
		});

		for (let button of buttons) {
			button.width = "150px"
			button.height = "40px";
			button.color = "white";
			button.cornerRadius = 20;
			button.background = "black";

			panel.addControl(button);
		}
		this.show(game);
	}
}