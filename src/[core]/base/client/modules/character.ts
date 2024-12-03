import { Delay } from "@/utils/shared";

LocalPlayer.state.set(
	"CharacterStats",
	{
		health: 100,
		armor: 100,
		thirst: 100,
		hunger: 100,
	},
	true,
);

export function hasResourceStarted(resourceName: string) {
	return GetResourceState(resourceName) === "started";
}

export async function WaitForResourceStart(resourceName: string, timeout = 10000) {
	const startTime = Date.now();

	while (!hasResourceStarted(resourceName)) {
		await Delay(100);

		if (Date.now() - startTime > timeout) {
			console.warn(`Resource ${resourceName} failed to start within ${timeout} ms`);
			return false;
		}
	}

	if (!hasResourceStarted(resourceName)) return false;

	return true;
}

global.exports("WaitForResourceStart", WaitForResourceStart);
