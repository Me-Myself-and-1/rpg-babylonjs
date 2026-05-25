import { AdvancedDynamicTexture } from "@babylonjs/gui";
import { Game } from "../game";

export class Menu {
	protected gui: AdvancedDynamicTexture;

	constructor(name: string) {
		this.gui = AdvancedDynamicTexture.CreateFullscreenUI(name);
		this.gui.rootContainer.background = "#00000099";
		this.gui.rootContainer.isVisible = false;
	}
	show(game: Game) {
		game.scene.activeCamera?.detachControl();
		game.scene.physicsEnabled = false;
		game.paused = true;
		this.gui.rootContainer.isVisible = true;
	}
	hide(game: Game) {
		game.scene.activeCamera?.attachControl(true);
		game.scene.physicsEnabled = true;
		game.paused = false;
		this.gui.rootContainer.isVisible = false;
	}
}