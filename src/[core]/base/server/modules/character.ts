import { type CharacterWithData } from "@/types/base";
import { type CharacterStats, db } from "../db";

export class Character {
	public data: CharacterWithData;

	constructor(data: CharacterWithData) {
		this.data = data;
	}

	public async updateName(firstName: string, lastName: string) {
		await db.character.update({
			where: {
				id: this.data.id,
			},
			data: {
				firstName,
				lastName,
			},
		});

		this.data.firstName = firstName;
		this.data.lastName = lastName;
	}

	public async updatePosition(x: number, y: number, z: number, heading: number) {
		await db.characterPosition.update({
			where: {
				id: this.data.position!.id,
			},
			data: {
				x,
				y,
				z,
				heading,
			},
		});

		this.data.position!.x = x;
		this.data.position!.y = y;
		this.data.position!.z = z;
		this.data.position!.heading = heading;
	}

	public async updateStats(stats: Partial<CharacterStats>) {
		const result = await db.characterStats.update({
			where: {
				id: this.data.stats!.id,
			},
			data: {
				...stats,
			},
		});

		this.data.stats = result;
	}
}
