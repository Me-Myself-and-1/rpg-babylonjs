import { SolidParticleSystem } from "@babylonjs/core";
import { Game } from "../game";

class Level {
	private sps: SolidParticleSystem;

	constructor(name: string, game: Game) {
		this.sps = new SolidParticleSystem(name, game.scene);
	}
}