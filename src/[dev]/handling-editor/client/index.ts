import { HandlingField, HandlingFieldType } from "../data/handling-fields";
import HandlingEditor from "./classes/handling-editor";
import { triggerServerCallback } from "@overextended/ox_lib/client";

const editor = new HandlingEditor();

RegisterCommand(
	"handling",
	() => {
		const UI = global.exports.ui;
		const vehicle = GetVehiclePedIsIn(PlayerPedId(), false);
		if (!vehicle) return;
		editor.SetVehicle(vehicle);
		const data = editor.GetVehicleHandlingData();
		UI.DispatchNuiEvent("handling/init", {
			vehicle: GetDisplayNameFromVehicleModel(GetEntityModel(vehicle)),
			fields: data,
		});
		UI.SetApplication("handling-editor", true);
	},
	false,
);

type SaveRequest = {
	name: string;
	vehicle: string;
	fields: {
		name: string;
		type: HandlingFieldType;
		description?: string;
		value: { value: string; type: HandlingFieldType };
	}[];
};

function handleNuiCallbacks() {
	const UI = global.exports.ui;

	UI.NuiCallback("handling/setField", (data: any) => {
		const { name, value, type } = data;

		switch (type) {
			case "float":
				editor.SetHandlingFloat(name, value, "CHandlingData");
				break;
			case "integer":
				editor.SetHandlingInt(name, value, "CHandlingData");
				break;
			case "vector":
				editor.SetHandlingVector(name, value, "CHandlingData");
				break;
		}
	});

	UI.NuiCallback("handling/save", async (data: SaveRequest, cb: Function) => {
		const fields = data.fields.map(field => ({
			name: field.name,
			value: field.value.value,
			type: field.value.type,
		}));

		const result = await triggerServerCallback("handling:saveJson", 0, {
			name: data.name,
			data: {
				vehicle: data.vehicle,
				fields,
			},
		});

		cb(result);
	});

	UI.NuiCallback("handling/mergeJson", async (cb: Function) => {
		const result = await triggerServerCallback("handling:generateMetaFile", 0);
		cb(result);
	})
}

setTimeout(handleNuiCallbacks, 1000);
