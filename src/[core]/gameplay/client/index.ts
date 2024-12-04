import { Delay } from "@/utils/shared";
import "./modules/calm-ai";
import "./modules/disable-keys";
import "./modules/scenarios";
import "./modules/weapons";
import lib from "@overextended/ox_lib/client";

LocalPlayer.state.set("dead", false, false);
LocalPlayer.state.set("cuffed", 0, true);

(async () => {
    if (!IsPedInAnyVehicle(PlayerPedId(), false)) DisplayRadar(false);

    while (!LocalPlayer.state.loggedIn) {
        DisplayRadar(false);
        await Delay(1000);
    }
})();

onNet("command:sv", async (model: string) => {
    const hash = GetHashKey(model);
    if (!IsModelValid(hash)) return;

    const ped = PlayerPedId();
    const [x, y, z] = GetEntityCoords(ped);
    const heading = GetEntityHeading(ped);

    await lib.requestModel(hash);

    const vehicle = CreateVehicle(hash, x, y, z, heading, true, true);

    SetEntityAsMissionEntity(vehicle, true, true);
    TaskWarpPedIntoVehicle(ped, vehicle, -1);
    
    SetModelAsNoLongerNeeded(hash);
});
