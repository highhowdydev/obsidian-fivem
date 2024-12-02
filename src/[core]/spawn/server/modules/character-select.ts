import { UserWithCharacters } from "@/types/base";
import { onClientCallback } from "@overextended/ox_lib/server";

onClientCallback("spawn:fetchUserWithCharacters", async (playerId): Promise<UserWithCharacters> => {
    const user = await global.exports.base.GetUser(playerId, true);
    return user;
});
