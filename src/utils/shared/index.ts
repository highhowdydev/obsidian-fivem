export * from "./streaming";
export * from "./vector3";
export * from "./quaternion";

export const Delay = async (ms: number) => new Promise(resolve => setTimeout(resolve, ms));
export const Clamp = (value: number, min: number, max: number) => Math.min(Math.max(value, min), max);

/**
 * Creates a promise that will be resolved once any value is returned by the function (including null).
 * @param {number?} timeout Error out after `~x` ms. Defaults to 1000, unless set to `false`.
 * https://github.com/overextended/ox_lib/blob/master/package/shared/index.ts
 */
export async function waitFor<T>(cb: () => T, errMessage?: string, timeout?: number | false): Promise<T> {
	let value = await cb();

	if (value !== undefined) return value;

	if (timeout || timeout == null) {
		if (typeof timeout !== "number") timeout = 1000;
	}

	const start = GetGameTimer();
	let id: number;

	const p = new Promise<T>((resolve, reject) => {
		id = setTick(async () => {
			const elapsed = timeout && GetGameTimer() - start;

			if (elapsed && elapsed > (timeout as number)) {
				return reject(`${errMessage || "failed to resolve callback"} (waited ${elapsed}ms)`);
			}

			value = await cb();

			if (value !== undefined) resolve(value);
		});
	}).finally(() => clearTick(id));

	return p;
}

// Arrays
export const UniqueArray = <T>(arr: T[]) => [...new Set(arr)];
export const ShuffleArray = <T>(arr: T[]) => arr.sort(() => Math.random() - 0.5);
export const GetRandomElement = <T>(arr: T[]) => arr[~~(Math.random() * arr.length)];

// Objects
export const ActiveObject = (obj: any) => Object.keys(obj).length > 0 && obj !== undefined;

// Misc
export const GetRandomInt = (min = 0, max = 9) => Math.floor(Math.random() * (max - min + 1)) + min;
export const GetRandomChar = (lowercase?: boolean) => {
	const str = String.fromCharCode(GetRandomInt(65, 90));
	return lowercase ? str.toLowerCase() : str;
};
export const GetRandomAlphaNumeric = (lowercase?: boolean) =>
	Math.random() > 0.5 ? GetRandomChar(lowercase) : GetRandomInt();
export const GetRandomFloat = (min: number, max: number) => Math.random() * (max - min) + min;
export const GetRandomIntBetween = (min: number, max: number) => ~~(Math.random() * (max - min + 1)) + min;
export const GetAverageNumbers = (...numbers: number[]) => numbers.reduce((a, b) => a + b, 0) / numbers.length;
export const GetRandomHexColor = () => `#${Math.floor(Math.random() * 0xffffff).toString(16)}`;
