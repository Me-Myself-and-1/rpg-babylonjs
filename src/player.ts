import { ArcRotateCamera, Mesh, MeshBuilder, PhysicsImpostor, Scene, Vector3 } from "@babylonjs/core";

var player: Mesh
var camera: ArcRotateCamera

export function setupPlayer(scene: Scene) {
	player = MeshBuilder.CreateCapsule("player", { radius: 0.5, height: 2 }, scene)
	player.position.y = 10
	player.physicsImpostor = new PhysicsImpostor(player, PhysicsImpostor.CapsuleImpostor, { mass: 1 }, scene);

	camera = new ArcRotateCamera("camera1", Math.PI / 4, Math.PI / 4, 10, player.position, scene);
	camera.lowerRadiusLimit = 2;
	camera.upperRadiusLimit = 15;
	camera.upperBetaLimit = Math.PI / 2;
	camera.targetScreenOffset.y = -0.5
	camera.attachControl(true);

	camera.keysUp = [87];
	camera.keysDown = [83];
	camera.keysRight = [68];
	camera.keysLeft = [65];/*
	scene.onKeyboardObservable.add((kbInfo) => {
		switch (kbInfo.type) {
			case KeyboardEventTypes.KEYDOWN:
				console.log("KEY DOWN: ", kbInfo.event.key);
				break;
			case KeyboardEventTypes.KEYUP:
				console.log("KEY UP: ", kbInfo.event.code);
				break;
		}
	});*/
}
export function movePlayerRelative(dir: Vector3, strength: number) {
	var move: Vector3
	if (dir.y) move = dir
	else {
		move = camera.getDirection(dir);
		move.y = 0;
	}
	move.normalize();
	player.physicsImpostor?.applyImpulse(move.scale(strength), player.position)
}