import { Engine } from "@babylonjs/core/Engines/engine.js";
import { Scene } from "@babylonjs/core/scene.js";
import { Vector3 } from "@babylonjs/core/Maths/math.vector.js";
import { HemisphericLight } from "@babylonjs/core/Lights/hemisphericLight.js";
import { CreateGround } from "@babylonjs/core/Meshes/Builders/groundBuilder.js";
import { CannonJSPlugin} from "@babylonjs/core/Physics/v1/Plugins/cannonJSPlugin.js";
import { PhysicsImpostor } from "babylonjs/core/Physics/v1/physicsImpostor.js";
import { movePlayerRelative, setupPlayer } from "./player";
import * as CANNON from "cannon";

var canvas = document.querySelector("canvas");

// initialize babylon scene and engine
var engine = new Engine(canvas, true);
var scene = new Scene(engine);
scene.enablePhysics(new Vector3(0, -9.81, 0), new CannonJSPlugin(true, 10, CANNON))

var light1: HemisphericLight = new HemisphericLight("light1", new Vector3(1, 1, 0), scene);
var ground = CreateGround("ground", { height: 10, width: 10 }, scene);
ground.physicsImpostor = new PhysicsImpostor(ground, PhysicsImpostor.BoxImpostor, { mass: 0 }, scene);

setupPlayer(scene)

window.addEventListener("resize", () => {
	engine.resize();
})

// hide/show the Inspector
window.addEventListener("keydown", ev => {
	// Shift+Ctrl+Alt+I
	if (ev.shiftKey && ev.ctrlKey && ev.altKey && ev.keyCode === 73) {
		if (scene.debugLayer.isVisible()) {
			scene.debugLayer.hide();
		} else {
			scene.debugLayer.show();
		}
	}
	switch (ev.key) {
		case "ArrowUp":
			movePlayerRelative(Vector3.Forward(), 1);
			break
		case "ArrowDown":
			movePlayerRelative(Vector3.Backward(), 1);
			break
		case "ArrowLeft":
			movePlayerRelative(Vector3.Left(), 1);
			break
		case "ArrowRight":
			movePlayerRelative(Vector3.Right(), 1);
			break
	}
});

// run the main render loop
engine.runRenderLoop(() => {
	scene.render();
});