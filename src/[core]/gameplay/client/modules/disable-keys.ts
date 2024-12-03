import { Delay } from "@/utils/shared";

const DISABLED_KEYS: number[] = [];
let running = true;

on("setKeysDisabled", (keys: number[]) => {
	DISABLED_KEYS.push(...keys);
    if (!running) beginCheck();
});

on("clearDisabledKeys", async (keys: number[], wait?: number) => {
	if (wait) await Delay(wait);
	for (const key of keys) DISABLED_KEYS.splice(DISABLED_KEYS.indexOf(key), 1);
    if (!DISABLED_KEYS.length) running = false;
});

async function beginCheck() {
    running = true;

    while (running) {
        await Delay(1);

        for (const key of DISABLED_KEYS) {
            DisableControlAction(0, +key, true);
        }
    }
}
