import { Delay, vector3 } from "@/utils/shared";

const SUPPRESSED_VEHICLES = [
	"police",
	"police2",
	"police3",
	"police4",
	"policeb",
	"policet",
	"sheriff",
	"sheriff2",
	"firetruck",
	"blimp",
	"turismor",
	"zentorno",
	"voltic",
	"infernus",
	"bullet",
	"rhino",
	"polmav",
	"buzzard2",
	"cargobob",
	"barracks",
	"barracks2",
	"crusader",
	"shamal",
	"luxor",
	"luxor2",
	"jet",
	"lazer",
	"titan",
	"cargoplane",
	"rhino",
	"hydra",
	"outlaw",
	"vagrant",
	"bf400",
	"jester",
];

const SCENARIO_GROUPS = [
	2017590552, // LSIA planes
	2141866469, // Sandy Shores planes
	1409640232, // Grapeseed planes
	"ng_planes", // Far up in the skies jets
];

const SCENARIO_TYPES = [
	"WORLD_VEHICLE_MILITARY_PLANES_SMALL", // Zancudo Small Planes
	"WORLD_VEHICLE_MILITARY_PLANES_BIG", // Zancudo Big Planes
];

const POLICE_STATIONS: vector3[] = [
	new vector3(448.11700439453, -989.46789550781, 36.872337341309),
	new vector3(408.29452514648, -1010.8471069336, 29.40022277832),
	new vector3(389.33413696289, -1617.9036865234, 29.292037963867),
	new vector3(607.42175292969, 32.037746429443, 89.872505187988),
	new vector3(-563.53424072266, -148.22227478027, 38.021312713623),
	new vector3(-1084.1278076172, -869.61065673828, 4.8677096366882),
	new vector3(1850.9304199219, 3673.8796386719, 33.76496887207),
	new vector3(-454.33511352539, 6026.9291992188, 31.340545654297),
	new vector3(831.046875, -1265.5634765625, 26.282810211182),
	new vector3(-903.61413574219, -2399.2900390625, 14.02402973175),
	new vector3(577.630859375, 39.161876678467, 92.883888244629),
	new vector3(647.72991943359, -30.919246673584, 80.535133361816),
	new vector3(505.38928222656, 20.472354888916, 90.528076171875),
	new vector3(837.36755371094, -1342.7598876953, 26.353876113892),
	new vector3(381.22305297852, 796.85235595703, 187.51217651367),
	new vector3(-1626.5748291016, -1014.4693989258, 12.7056016922),
	new vector3(-2999.2607421875, 712.9892578125, 28.496892929077),
	new vector3(-1190.0573730469, -889.47595214844, 13.990588188171),
	new vector3(-1234.2989501953, -275.5940246582, 37.764163970947),
	new vector3(852.74029541016, -1393.3537597656, 26.134502410889),
	new vector3(431.6842956543, -531.0166015625, 28.848300933838),
	new vector3(385.68316650391, -603.31665039063, 29.457193374634),
	new vector3(132.68, -1074.754, 29.192),
	new vector3(900.503, -16.19, 78.764),
];

(async () => {
	while (true) {
		await Delay(100);
		const ped = PlayerPedId();
		const [x, y, z] = GetEntityCoords(ped);
		const pos = new vector3(x, y, z);

		for (const station of POLICE_STATIONS) {
			if (pos.distance(station) < 300) {
				RemoveVehiclesFromGeneratorsInArea(
					station.x - 50.0,
					station.y - 50.0,
					station.z - 50.0,
					station.x + 50.0,
					station.y + 50.0,
					station.z + 50.0,
					1,
				);
			}
		}
	}
})();

(async () => {
	while (true) {
		await Delay(5000);

		for (const model in SUPPRESSED_VEHICLES) SetVehicleModelIsSuppressed(GetHashKey(model), true);
		for (const scgrp in SCENARIO_GROUPS) SetScenarioGroupEnabled(scgrp, false);
		for (const sctype in SCENARIO_TYPES) SetScenarioTypeEnabled(sctype, false);
	}
})();
