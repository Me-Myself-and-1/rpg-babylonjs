import { CannonJSPlugin, CreateGround, Engine, HemisphericLight, PhysicsImpostor, Scene, Vector3 } from "@babylonjs/core";
import "@babylonjs/core/Debug/debugLayer";
import "@babylonjs/core/Physics/physicsEngineComponent";
import "@babylonjs/inspector";
import CANNON from "cannon";
import { Player } from "./characters/player";
import { KeyHelper } from "./keys";
import { PauseMenu } from "./menus/pause";

export class Game {
	keyHelper = new KeyHelper();
	paused = false;
	canvas = document.querySelector("canvas");
	engine = new Engine(this.canvas, true);
	scene = new Scene(this.engine);

	constructor() {
		this.scene.enablePhysics(new Vector3(0, -9.81, 0), new CannonJSPlugin(undefined, 10, CANNON));

		const light1: HemisphericLight = new HemisphericLight("light1", new Vector3(1, 1, 0), this.scene);
		const ground = CreateGround("ground", { height: 50, width: 50 }, this.scene);
		ground.physicsImpostor = new PhysicsImpostor(ground, PhysicsImpostor.BoxImpostor, { mass: 0, restitution: 0 }, this.scene);

		const player = new Player(this.scene, this.keyHelper);

		window.addEventListener("resize", () => {
			this.engine.resize();
		});

		// hide/show the Inspector
		window.addEventListener("keydown", ev => {
			// Shift+Ctrl+Alt+I
			if (ev.shiftKey && ev.ctrlKey && ev.altKey && ev.keyCode === 73) {
				if (this.scene.debugLayer.isVisible()) this.scene.debugLayer.hide();
				else this.scene.debugLayer.show();
				
			}
			this.keyHelper.setState(ev.code, true);
		});
		window.addEventListener("keyup", ev => {
			this.keyHelper.setState(ev.code, false);
		})
		// run the main render loop
		this.engine.runRenderLoop(() => {
			if (!this.paused) this.keyHelper.update();
			this.scene.render();
		});
		new PauseMenu(this, this.keyHelper);
	}
}
new Game();