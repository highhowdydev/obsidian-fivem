import { Delay } from "@/utils/shared";

async function main() {
	while (!NetworkIsSessionStarted()) await Delay(100);

	if (IsPlayerSwitchInProgress()) StopPlayerSwitch();

	if (GetIsLoadingScreenActive()) {
		SendLoadingScreenMessage('{"fullyLoaded": true}');
		ShutdownLoadingScreenNui();
	}

	NetworkStartSoloTutorialSession();
	ShutdownLoadingScreen();
    
    NetworkSetFriendlyFireOption(true);

    const ped = PlayerPedId();
    SetEntityCoordsNoOffset(ped, 449.194, -651.431, 28.486, true, false, false);
	SetEntityCoordsNoOffset(ped, 449.194, -651.431, 28.486, true, false, false);
	FreezeEntityPosition(ped, false);
}

main();
