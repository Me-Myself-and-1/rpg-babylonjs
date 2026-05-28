import { AdvancedDynamicTexture, Button, ScrollViewer, StackPanel } from "@babylonjs/gui";
import { Game } from "../game";

export class Menu {
	protected gui: AdvancedDynamicTexture;
	protected scrollViewer: ScrollViewer;
	protected panel: StackPanel;

	constructor(name: string) {
		this.gui = AdvancedDynamicTexture.CreateFullscreenUI(name);
		this.gui.rootContainer.background = "#00000099";
		this.gui.rootContainer.isVisible = false;

		this.scrollViewer = new ScrollViewer(name + "ScrollViewer");
		this.scrollViewer.color = "#00000000";
		this.scrollViewer.paddingTop = 15;
		this.scrollViewer.paddingBottom = 15;
		this.gui.addControl(this.scrollViewer);

		this.panel = new StackPanel("pause");
		this.panel.spacing = 15;
		this.scrollViewer.addControl(this.panel);
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
	addButton(name: string) {
		const button = Button.CreateSimpleButton(name.toLowerCase(), name);
		button.width = 0.25;
		button.height = "40px";
		button.cornerRadius = 15;
		button.background = "black";
		button.color = "white";
		button.hoverCursor = "pointer";
		button.fontFamily = "georgia";

		this.panel.addControl(button);
		return button;
	}
}