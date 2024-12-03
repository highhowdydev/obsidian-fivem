import { Delay } from "@/utils/shared";
import "./modules/calm-ai";
import "./modules/disable-keys";
import "./modules/scenarios";
import "./modules/weapons";

LocalPlayer.state.set("dead", false, false);
LocalPlayer.state.set("cuffed", 0, true);

(async () => {
    console.log("fuck you bitch");
    if (!IsPedInAnyVehicle(PlayerPedId(), false)) DisplayRadar(false);

    while (!LocalPlayer.state.loggedIn) {
        DisplayRadar(false);
        await Delay(1000);
    }
})();
