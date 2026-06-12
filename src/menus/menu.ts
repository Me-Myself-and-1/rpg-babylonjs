import { AdvancedDynamicTexture, Button, Control, ScrollViewer, StackPanel, TextBlock } from "@babylonjs/gui";
import { Game } from "../game";

export class Menu {
	protected gui: AdvancedDynamicTexture;
	protected scrollViewer: ScrollViewer;
	protected panel: StackPanel;

	constructor(name: string, protected game: Game) {
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

		const button = Menu.makeButton("x");
		button.width = "25px";
		button.height = "25px";
		button.cornerRadius = 10;
		button.top = "10px";
		button.left = "10px";
		button.background = "#800";
		button.verticalAlignment = Control.VERTICAL_ALIGNMENT_TOP;
		button.horizontalAlignment = Control.HORIZONTAL_ALIGNMENT_LEFT;
		button.onPointerClickObservable.add(() => {
			this.hide();
		});

		this.gui.addControl(button);
	}
	show() {
		this.game.scene.activeCamera?.detachControl();
		this.game.scene.physicsEnabled = false;
		this.game.paused = true;
		this.gui.rootContainer.isVisible = true;
	}
	hide() {
		this.game.scene.activeCamera?.attachControl(true);
		this.game.scene.physicsEnabled = true;
		this.game.paused = false;
		this.gui.rootContainer.isVisible = false;
	}
	addButton(name: string, menu?: Menu): Button {
		const button = Menu.makeButton(name);
		this.panel.addControl(button);
		if (menu) this.buttonOpenMenu(button, menu);
		return button;
	}
	addText(name: string): TextBlock {
		const textBlock = Menu.makeText(name);
		this.panel.addControl(textBlock);
		return textBlock;
	}
	static makeButton(name: string): Button {
		const button = Button.CreateSimpleButton(name, name[0].toUpperCase() + name.replace(/([A-Z])/g, " $1").trim().slice(1));
		button.width = 0.25;
		button.height = "40px";
		button.cornerRadius = 15;
		button.background = "black";
		button.color = "white";
		button.hoverCursor = "pointer";
		button.fontFamily = "georgia";
		return button;
	}
	static makeText(name: string): TextBlock {
		const textBlock = new TextBlock(name, name[0].toUpperCase() + name.replace(/([A-Z])/g, " $1").trim().slice(1));
		textBlock.width = 0.25;
		textBlock.height = "40px";
		textBlock.color = "white";
		textBlock.fontFamily = "georgia";
		return textBlock;
	}
	buttonOpenMenu(button: Button, menu: Menu) {
		button.onPointerClickObservable.add(() => {
			this.hide();
			menu.show();
		});
	}
}