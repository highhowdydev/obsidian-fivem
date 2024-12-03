import { Quaternion } from "./quaternion";

export interface Vector3 {
	x: number;
	y: number;
	z: number;
}

export class vector3 implements Vector3 {
	x: number;
	y: number;
	z: number;
	constructor(valueXorVec3: number | number[] | Quaternion, y?: number, z?: number) {
		if (valueXorVec3 instanceof Quaternion) {
			this.x = valueXorVec3.x;
			this.y = valueXorVec3.y;
			this.z = valueXorVec3.z;
		} else if (valueXorVec3 instanceof Array) {
			this.x = valueXorVec3[0];
			this.y = valueXorVec3[1];
			this.z = valueXorVec3[2];
		} else {
			this.x = valueXorVec3;
			this.y = y!;
			this.z = z!;
		}
	}
	static create(v1: number | Vector3) {
		if (typeof v1 === "number") {
			return new vector3(v1, v1, v1);
		}
		return new vector3(v1.x, v1.y, v1.z);
	}
	static clone(v1: Vector3) {
		return vector3.create(v1);
	}
	static add(v1: Vector3, v2: number | Vector3) {
		if (typeof v2 === "number") {
			return new vector3(v1.x + v2, v1.y + v2, v1.z + v2);
		}
		return new vector3(v1.x + v2.x, v1.y + v2.y, v1.z + v2.z);
	}
	static subtract(v1: Vector3, v2: Vector3) {
		return new vector3(v1.x - v2.x, v1.y - v2.y, v1.z - v2.z);
	}
	static multiply(v1: Vector3, v2: Vector3 | number) {
		if (typeof v2 === "number") {
			return new vector3(v1.x * v2, v1.y * v2, v1.z * v2);
		}
		return new vector3(v1.x * v2.x, v1.y * v2.y, v1.z * v2.z);
	}
	static divide(v1: Vector3, v2: Vector3 | number) {
		if (typeof v2 === "number") {
			return new vector3(v1.x / v2, v1.y / v2, v1.z / v2);
		}
		return new vector3(v1.x / v2.x, v1.y / v2.y, v1.z / v2.z);
	}
	static dotProduct(v1: Vector3, v2: Vector3) {
		return v1.x * v2.x + v1.y * v2.y + v1.z * v2.z;
	}
	static crossProduct(v1: Vector3, v2: Vector3) {
		const x = v1.y * v2.z - v1.z * v2.y;
		const y = v1.z * v2.x - v1.z * v2.z;
		const z = v1.x * v2.y - v1.z * v2.x;
		return new vector3(x, y, z);
	}
	static normalize(v: vector3) {
		return vector3.divide(v, v.Length);
	}

	static valid(v: Vector3) {
		if (
			typeof v == "object" &&
			v.x != undefined &&
			v.y != undefined &&
			v.z != undefined &&
			new vector3(0.0, 0.0, 0.0).distance(v) > 0
		)
			return true;
		return false;
	}
	clone() {
		return new vector3(this.x, this.y, this.z);
	}
	/**
	 * The product of the Euclidean magnitudes of this and another Vector3.
	 *
	 * @param v Vector3 to find Euclidean magnitude between.
	 * @returns Euclidean magnitude with another vector.
	 */
	distanceSquared(v: Vector3) {
		const w = this.subtract(v);
		return vector3.dotProduct(w, w);
	}
	/**
	 * The distance between two Vectors.
	 *
	 * @param v Vector3 to find distance between.
	 * @returns Distance between this and another vector.
	 */
	distance(v: Vector3) {
		return Math.sqrt(this.distanceSquared(v));
	}
	get normalize() {
		return vector3.normalize(this);
	}
	crossProduct(v: Vector3) {
		return vector3.crossProduct(this, v);
	}
	dotProduct(v: Vector3) {
		return vector3.dotProduct(this, v);
	}
	add(v: number | Vector3) {
		return vector3.add(this, v);
	}
	subtract(v: Vector3) {
		return vector3.subtract(this, v);
	}
	multiply(v: number | Vector3) {
		return vector3.multiply(this, v);
	}
	divide(v: number | Vector3) {
		return vector3.divide(this, v);
	}
	replace(v: Vector3) {
		this.x = v.x;
		this.y = v.y;
		this.z = v.z;
	}
	get Length() {
		return Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z);
	}
}

export default vector3;
