import { CreateBox, CreateSphere, Mesh, PhysicsImpostor, Scene, Vector3 } from "@babylonjs/core";

// The parent class for the player or enemy or any other character
export class Character {
	protected physicsMesh: Mesh;

	constructor(scene: Scene, name: String, position: Vector3) {
		// make the physics mesh
		this.physicsMesh = CreateSphere("physicsmesh " + name, { diameter: 1 }, scene);
		this.physicsMesh.physicsImpostor = new PhysicsImpostor(this.physicsMesh, PhysicsImpostor.SphereImpostor, { mass: 1, restitution: 0 }, scene);
		this.physicsMesh.position = position;
		CreateBox("test", {width: 0.1}).parent = this.physicsMesh;

		this.physicsMesh.physicsImpostor.registerAfterPhysicsStep(impostor => {
			const velocity = impostor.getLinearVelocity()?.multiplyByFloats(this.drag, 1, this.drag) as Vector3;
			if (velocity.x || velocity.z)
				this.physicsMesh.rotation = this.physicsMesh.lookAt(velocity.multiplyByFloats(1, 0, 1).add(this.physicsMesh.position) as Vector3).rotation;
			impostor.setLinearVelocity(new Vector3(
				Math.max(Math.min(velocity.x, this.maxSpeed), -this.maxSpeed),
				velocity.y,
				Math.max(Math.min(velocity.z, this.maxSpeed), -this.maxSpeed)));
		});
	}
	isOnGround() {
		// Later I'll check if the character is on the ground
		return this.physicsMesh.position.y <= 1;
	}
	protected maxSpeed = 10;
	protected drag = 0.9;
}