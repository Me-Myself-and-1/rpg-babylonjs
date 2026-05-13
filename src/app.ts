import "@babylonjs/core/Debug/debugLayer";
import "@babylonjs/inspector";
import "@babylonjs/core/Physics/physicsEngineComponent";
import { Vector3 } from "@babylonjs/core/Maths/math.vector";
import { Engine } from "@babylonjs/core/Engines/engine";
import { Scene } from "@babylonjs/core/scene";
import { HemisphericLight } from "@babylonjs/core/Lights/hemisphericLight";
import { CreateGround } from "@babylonjs/core/Meshes/Builders/groundBuilder";
import { PhysicsImpostor } from "@babylonjs/core/Physics/physicsImpostor";
import { CannonJSPlugin } from "@babylonjs/core/Physics/Plugins/cannonJSPlugin";
import { Player } from "./player";
import CANNON from "cannon";
import { KeyHelper } from "./keys";

// Setup keyhelper class and get the canvas
const keyHelper = new KeyHelper();
const canvas = document.querySelector("canvas");
// initialize babylon scene and engine
const engine = new Engine(canvas, true);
const scene = new Scene(engine);
scene.enablePhysics(new Vector3(0, -9.81, 0), new CannonJSPlugin(undefined, 10, CANNON));

const light1: HemisphericLight = new HemisphericLight("light1", new Vector3(1, 1, 0), scene);
const ground = CreateGround("ground", { height: 50, width: 50 }, scene);
ground.physicsImpostor = new PhysicsImpostor(ground, PhysicsImpostor.BoxImpostor, { mass: 0, restitution: 0 }, scene);

const player = new Player(scene, keyHelper);

window.addEventListener("resize", () => {
	engine.resize();
});

// hide/show the Inspector
window.addEventListener("keydown", ev => {
	// Shift+Ctrl+Alt+I
	if (ev.shiftKey && ev.ctrlKey && ev.altKey && ev.keyCode === 73) {
		if (scene.debugLayer.isVisible())
			scene.debugLayer.hide();
		else scene.debugLayer.show();
	}
	keyHelper.setState(ev.key, true);
});
window.addEventListener("keyup", ev => {
	keyHelper.setState(ev.key, false);
})

// run the main render loop
engine.runRenderLoop(() => {
	keyHelper.update();
	player.updateCamera();
	scene.render();
});