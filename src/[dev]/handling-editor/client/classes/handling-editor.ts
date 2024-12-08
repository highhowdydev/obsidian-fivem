import { HANDLING_FIELDS } from "../../data/handling-fields";

export type HandlingField = {
	name: string;
	description: string;
	value: HandlingFieldValue;
};

export type VectorValue = [number, number, number];

export type HandlingFieldValue =
	| { type: "float"; value: number }
	| { type: "vector"; value: VectorValue }
	| { type: "integer"; value: number };

export class HandlingEditor {
	vehicle: number = -1;

	public SetVehicle(vehicle: number) {
		this.vehicle = vehicle;
	}

	public GetVehicle() {
		return this.vehicle;
	}

	public GetHandlingFloat(fieldName: string, type: string) {
		return GetVehicleHandlingFloat(this.vehicle, type, fieldName);
	}

	public SetHandlingFloat(fieldName: string, value: number, type: string) {
		value = parseFloat(value.toFixed(6));
		console.log(`Setting ${fieldName} to ${value}`);
		SetVehicleHandlingFloat(this.vehicle, type, fieldName, value + 0.0);
	}

	public GetHandlingInt(fieldName: string, type: string) {
		return GetVehicleHandlingInt(this.vehicle, type, fieldName);
	}

	public SetHandlingInt(fieldName: string, value: number, type: string) {
		SetVehicleHandlingInt(this.vehicle, type, fieldName, value);
	}

	public GetHandlingVector(fieldName: string, type: string) {
		return GetVehicleHandlingVector(this.vehicle, type, fieldName) as VectorValue;
	}

	public SetHandlingVector(fieldName: string, value: VectorValue, type: string) {
		for (let i = 0; i < value.length; i++) value[i] = parseFloat(value[i].toFixed(6));
		// @ts-expect-error
		SetVehicleHandlingVector(this.vehicle, type, fieldName, value);
	}

	public GetVehicleHandlingData() {
		const handlingData: HandlingField[] = [];

		for (const field of HANDLING_FIELDS) {
			const { type, name, description } = field;

			switch (type) {
				case "float":
					handlingData.push({
						name,
						description: description ?? "No description provided",
						value: { type: "float", value: this.GetHandlingFloat(name, "CHandlingData") },
					});
					break;
				case "integer":
					handlingData.push({
						name,
						description: description ?? "No description provided",
						value: { type: "integer", value: this.GetHandlingInt(name, "CHandlingData") },
					});
					break;
				case "vector":
					handlingData.push({
						name,
						description: description ?? "No description provided",
						value: { type: "vector", value: this.GetHandlingVector(name, "CHandlingData") },
					});
					break;
			}
		}

		return handlingData;
	}
}

export default HandlingEditor;
