import { CharacterWithData, UserWithCharacters } from "@/types/base";
import { CreateCharacter } from "@/types/spawn";
import { onClientCallback } from "@overextended/ox_lib/server";
import lib from "@overextended/ox_lib/server";

lib.addAce("group.admin", "command", true);
lib.addAce("group.admin", "adminmenu", true);
lib.addAce("group.admin", "command.quit", false);

setTimeout(() => {
    lib.addCommand(
    	"getuser",
    	async function (_source, args, _raw) {
    		const user = await global.exports.base.GetCharacter(String(args.source));
    		console.log(user);
    	},
    	{
    		help: "Get the user",
    		restricted: "group.admin",
    		params: [
    			{
    				name: "source",
    				paramType: "playerId",
    				help: "The player to get the user for",
    			},
    		],
    	},
    );
    
    lib.addCommand(
    	"sv",
    	async function (source, args, raw) {
    		const ped = GetPlayerPed(source);
    		const model = args[0] as string;
    		emitNet("testlol", -1, `Trying to spawn ${model} (${GetHashKey(model)})`);
    		if (!ped) return;
    		const [x, y, z] = GetEntityCoords(ped);
    		RequestModel(model);
    		const vehicle = CreateVehicle(model, x, y, z, 0.0, true, true);
    		SetPedIntoVehicle(ped, vehicle, -1);
    	},
    	{
    		restricted: false,
    		params: [
    			{
    				name: "model",
    				paramType: "string",
    				help: "The model of the vehicle",
    			},
    		],
    	},
    );
}, 1000);

onClientCallback("spawn:fetchUserWithCharacters", async (playerId): Promise<UserWithCharacters> => {
	const user = await global.exports.base.GetUser(playerId, true);
	return user;
});

onClientCallback(
	"spawn:createCharacter",
	async (playerId: number, data: CreateCharacter): Promise<CharacterWithData[]> => {
		await global.exports.base.CreateCharacter(playerId, data);
		const user = await global.exports.base.GetUser(playerId, true);
		return user.characters;
	},
);

onClientCallback("spawn:selectCharacter", async (playerId: number, data: CharacterWithData) => {
	const character = global.exports.base.SetCharacter(String(playerId), data);
	console.log(data);

	if (!character) {
		return {
			success: false,
			message: "An error occured while selecting a character",
		};
	}

	return {
		success: true,
		character: data,
	};
});
