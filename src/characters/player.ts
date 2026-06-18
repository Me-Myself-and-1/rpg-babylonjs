import { ArcRotateCamera, Scene, Vector3 } from "@babylonjs/core";
import { KeyHelper } from "../keys";
import { Character } from "./character";

export class Player extends Character {
	private camera: ArcRotateCamera;

	constructor(scene: Scene, keyHelper: KeyHelper) {
		// setup the basics for the player character
		super(scene, "player", new Vector3(0, 10, 0));

		// make the ArcRotateCamera
		this.camera = new ArcRotateCamera("camera1", Math.PI / 4, Math.PI / 4, 10, Vector3.Zero(), scene);
		this.camera.lowerRadiusLimit = 2;
		this.camera.upperRadiusLimit = 15;
		this.camera.upperBetaLimit = Math.PI / 2;
		this.camera.attachControl(true);
		this.camera.targetHost = this.physicsMesh;

		// set rotate camera with wasd later there will be a setting gui
		this.camera.keysUp = [87];
		this.camera.keysDown = [83];
		this.camera.keysRight = [68];
		this.camera.keysLeft = [65];
		// add movement
		keyHelper.addListeners(
			["moveForward", () => this.moveRelative(Vector3.Forward(), Player.speed)],
			["moveBack", () => this.moveRelative(Vector3.Backward(), Player.speed)],
			["moveLeft", () => this.moveRelative(Vector3.Left(), Player.speed)],
			["moveRight", () => this.moveRelative(Vector3.Right(), Player.speed)],
			["jump", () => {
				if (this.isOnGround()) this.moveRelative(Vector3.Up(), Player.jumpSpeed);
			}]);
	}
	private moveRelative(dir: Vector3, strength: number) {
		let move: Vector3;
		if (dir.y !== 0) move = dir;
		else {
			move = this.camera.getDirection(dir);
			move.y = 0;
		}
		move.normalize();
		this.physicsMesh.physicsImpostor?.applyImpulse(move.scale(strength), this.physicsMesh.position);
	}
	static speed = 2.5;
	static jumpSpeed = 2.5;
}