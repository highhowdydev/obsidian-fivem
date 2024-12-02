import { Delay } from ".";

export async function loadModel(model: number) {
	if (!IsModelInCdimage(model)) return false;

	const options = {
		async retry() {
			await loadModel(model);
		},
		clean() {
			if (IsModelInCdimage(model)) {
				SetModelAsNoLongerNeeded(model);
			}
		},
	};

	do {
		RequestModel(model);
		await Delay(50);
	} while (!HasModelLoaded(model));

	return options;
}

export async function loadAnimDict(dict: string) {
	if (!DoesAnimDictExist(dict)) return false;

	const options = {
		async retry() {
			await loadAnimDict(dict);
		},
		clean() {
			if (DoesAnimDictExist(dict)) {
				RemoveAnimDict(dict);
			}
		},
	};

	do {
		RequestAnimDict(dict);
		await Delay(50);
	} while (!HasAnimDictLoaded(dict));

	return options;
}

export async function loadAnimSet(set: string) {
	const date = Date.now();

	do {
		RequestAnimSet(set);
		if (Date.now() - date > 10000) break;
		await Delay(50);
	} while (!HasAnimSetLoaded(set));
}
