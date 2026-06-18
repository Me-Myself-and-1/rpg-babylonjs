import { Grid, Image, Rectangle } from "@babylonjs/gui";
import { Game } from "../game";
import { Menu } from "./menu";
import { Item } from "../items/item";

export class Inventory extends Menu {
	static itemSize = 40;
	static gridSize = 8;
	private inventoryGrid: Grid;
	items: Item[] = [];

	constructor(game: Game) {
		super("inventory", game);
		this.panel.isVertical = false;

		this.inventoryGrid = new Grid("inventoryGrid");

		this.inventoryGrid.width = Inventory.itemSize * Inventory.gridSize + "px";
		this.inventoryGrid.height = Inventory.itemSize * Inventory.gridSize + "px";
		
		for (let _ = 0; _ < Inventory.gridSize; _++)
			this.inventoryGrid.addColumnDefinition(Inventory.itemSize, true).addRowDefinition(Inventory.itemSize, true);
		for (let i = 0; i < Inventory.gridSize * Inventory.gridSize; i++) {
			const box = new Rectangle();
			box.background = "#333";
			box.color = "#fff";
			this.inventoryGrid.addControl(box, Math.floor(i / Inventory.gridSize), i % Inventory.gridSize);
		}
		this.panel.addControl(this.inventoryGrid);
		this.addItem("dagger");
	}
	addItem(item: string) {
		const box = this.inventoryGrid.getChildrenAt(Math.floor(this.items.length / Inventory.gridSize), this.items.length % Inventory.gridSize)?.filter(val => val instanceof Rectangle)[0];
		if (box) {
			const image = new Image(item, `./items/${item}.png`);
			image.width = image.height = "32px";
			box.addControl(image);
			this.items.push(new Item(item));
		}
	}
	removeItem(idx: number) {
		const box = this.inventoryGrid.getChildrenAt(Math.floor(idx / Inventory.gridSize), idx % Inventory.gridSize)?.filter(val => val instanceof Rectangle)[0];
		for (let child of box?.children || []) child.dispose();
		return this.items.splice(idx, 1)[0];
	}
}