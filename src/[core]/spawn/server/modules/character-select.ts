import { CharacterWithData, UserWithCharacters } from "@/types/base";
import { CreateCharacter } from "@/types/spawn";
import { onClientCallback } from "@overextended/ox_lib/server";

onClientCallback("spawn:fetchUserWithCharacters", async (playerId): Promise<UserWithCharacters> => {
    const user = await global.exports.base.GetUser(playerId, true);
    return user;
});

onClientCallback("spawn:createCharacter", async (playerId: number, data: CreateCharacter): Promise<CharacterWithData[]> => {
    await global.exports.base.CreateCharacter(playerId, data);
    const user = await global.exports.base.GetUser(playerId, true);
    return user.characters;
});

onClientCallback("spawn:selectCharacter", async (playerId: number, data: CharacterWithData) => {
    const character = global.exports.base.SetCharacter(String(playerId), data);
    
    if (!character) {
        return {
            success: false,
            message: "An error occured while selecting a character"
        }
    }

    return {
        success: true,
        character: data,
    }
});
