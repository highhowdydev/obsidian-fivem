import { Delay } from "@/utils/shared";

async function Main() {
	while (!NetworkIsSessionStarted()) await Delay(100);

	if (IsPlayerSwitchInProgress()) StopPlayerSwitch();

	if (GetIsLoadingScreenActive()) {
		SendLoadingScreenMessage('{"fullyLoaded": true}');
		ShutdownLoadingScreenNui();
	}

	NetworkStartSoloTutorialSession();
	ShutdownLoadingScreen();
    
    NetworkSetFriendlyFireOption(true);

	LocalPlayer.state.set("loggedIn", false, true);
	LocalPlayer.state.set("stateId", false, true);
	LocalPlayer.state.set("characterId", false, true);

    const ped = PlayerPedId();
    SetEntityCoordsNoOffset(ped, 449.194, -651.431, 28.486, true, false, false);
	SetEntityCoordsNoOffset(ped, 449.194, -651.431, 28.486, true, false, false);
	FreezeEntityPosition(ped, false);
}

Main();
