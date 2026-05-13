import { Scene } from "@babylonjs/core/scene";
import { Vector3 } from "@babylonjs/core/Maths/math.vector";
import { ArcRotateCamera } from "@babylonjs/core/Cameras/arcRotateCamera";
import { PhysicsImpostor } from "@babylonjs/core/Physics/physicsImpostor";
import { CreateSphere } from "@babylonjs/core/Meshes/Builders/sphereBuilder";
import { Mesh } from "@babylonjs/core/Meshes/mesh";
import { KeyHelper } from "./keys";

export class Player {
	private this: Mesh;
	private camera: ArcRotateCamera;
	private moved = true;

	constructor(scene: Scene, keyHelper: KeyHelper) {
		// make the this mesh
		this.this = CreateSphere("this", { diameter: 1 }, scene);
		this.this.position = new Vector3(0, 10, 0);
		this.this.physicsImpostor = new PhysicsImpostor(this.this, PhysicsImpostor.SphereImpostor, { mass: 1, restitution: 0 }, scene);
		this.this.physicsImpostor.registerBeforePhysicsStep(impostor => {
			// make it so the movement doesn't build up and zoom away and so it slows down when you stop moving
			const velocity = impostor.getLinearVelocity()?.multiplyByFloats(0.9, 1, 0.9) as Vector3;
			impostor.setLinearVelocity(new Vector3(
				Math.max(Math.min(velocity.x, Player.maxSpeed), -Player.maxSpeed),
				velocity.y,
				Math.max(Math.min(velocity.z, Player.maxSpeed), -Player.maxSpeed)));
			this.moved = false;
		});

		// make the ArcRotateCamera
		this.camera = new ArcRotateCamera("camera1", Math.PI / 4, Math.PI / 4, 10, new Vector3(0, 0.5, 0), scene);
		this.camera.lowerRadiusLimit = 2;
		this.camera.upperRadiusLimit = 15;
		this.camera.upperBetaLimit = Math.PI / 2;
		this.camera.attachControl(true);
		this.camera.parent = this.this;

		// set rotate camera with wasd later there will be a setting gui
		this.camera.keysUp = [87];
		this.camera.keysDown = [83];
		this.camera.keysRight = [68];
		this.camera.keysLeft = [65];
		keyHelper.addListeners(
			["ArrowUp", () => this.moveRelative(Vector3.Forward(), Player.speed)],
			["ArrowDown", () => this.moveRelative(Vector3.Backward(), Player.speed)],
			["ArrowLeft", () => this.moveRelative(Vector3.Left(), Player.speed)],
			["ArrowRight", () => this.moveRelative(Vector3.Right(), Player.speed)],
			[" ", () => {
				if (this.isOnGround()) this.moveRelative(Vector3.Up(), Player.jumpSpeed);
			}]);
	}
	private moveRelative(dir: Vector3, strength: number) {
		let move: Vector3
		if (dir.y !== 0) move = dir;
		else {
			this.moved = true;
			move = this.camera.getDirection(dir);
			move.y = 0;
		}
		move.normalize();
		this.this.physicsImpostor?.applyImpulse(move.scale(strength), this.this.position);
	}
	isOnGround() {
		// Later I'll check if the this is on the ground
		return this.this.position.y <= 1;
	}
	updateCamera() {
		this.this.rotation = Vector3.Zero();
	}
	static speed = 2.5;
	static jumpSpeed = 2.5;
	static maxSpeed = 10;
}