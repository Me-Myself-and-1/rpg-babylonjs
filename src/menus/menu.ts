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
		// @ts-expect-error
		this.gui.getContext().imageSmoothingEnabled = false;
		// @ts-expect-error
		game.engine.onResizeObservable.add(() => this.gui.getContext().imageSmoothingEnabled = false);

		this.scrollViewer = new ScrollViewer(name + "ScrollViewer");
		this.scrollViewer.color = "#00000000";
		this.scrollViewer.paddingTop = this.scrollViewer.paddingBottom = this.scrollViewer.paddingLeft = this.scrollViewer.paddingRight = 15;
		this.gui.addControl(this.scrollViewer);

		this.panel = new StackPanel(name + "Panel");
		this.panel.spacing = 15;
		this.panel.adaptHeightToChildren = true;
		this.scrollViewer.addControl(this.panel);

		const button = Menu.makeButton("x");
		button.cornerRadius = 10;
		button.top = "10px";
		button.left = "-10px";
		button.background = "#800";
		button.verticalAlignment = Control.VERTICAL_ALIGNMENT_TOP;
		button.horizontalAlignment = Control.HORIZONTAL_ALIGNMENT_RIGHT;
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
	isVisible(): boolean {
		return this.gui.rootContainer.isVisible;
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
		button.cornerRadius = 15;
		button.background = "black";
		button.color = "white";
		button.hoverCursor = "pointer";
		button.fontFamily = "georgia";

		button.adaptWidthToChildren = true;
		button.adaptHeightToChildren = true;
		if (button.textBlock) {
			button.textBlock.resizeToFit = true;
			button.textBlock.textWrapping = false;
			button.textBlock.paddingTop = button.textBlock.paddingBottom = 10;
			button.textBlock.paddingLeft = button.textBlock.paddingRight = 15;
		}
		return button;
	}
	static makeText(name: string): TextBlock {
		const textBlock = new TextBlock(name, name[0].toUpperCase() + name.replace(/([A-Z])/g, " $1").trim().slice(1));
		textBlock.resizeToFit = true;
		textBlock.textWrapping = false;
		textBlock.paddingTop = textBlock.paddingBottom = 10;
		textBlock.paddingLeft = textBlock.paddingRight = 15;
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