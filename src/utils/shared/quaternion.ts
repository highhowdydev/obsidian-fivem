import { vector3 } from "./vector3";

export class Quaternion {
	x: number;
	y: number;
	z: number;
	w: number;
	constructor(valueXOrVector: number | vector3 | number[], yOrW?: number, z?: number, w?: number) {
		if (valueXOrVector instanceof vector3) {
			this.x = valueXOrVector.x;
			this.y = valueXOrVector.y;
			this.z = valueXOrVector.z;
			this.w = yOrW!;
		} else if (valueXOrVector instanceof Array) {
			this.x = valueXOrVector[0];
			this.y = valueXOrVector[1];
			this.z = valueXOrVector[2];
			this.w = yOrW!;
		} else if (yOrW === undefined) {
			this.x = valueXOrVector;
			this.y = valueXOrVector;
			this.z = valueXOrVector;
			this.w = valueXOrVector;
		} else {
			this.x = valueXOrVector;
			this.y = yOrW;
			this.z = z!;
			this.w = w!;
		}
	}
}
