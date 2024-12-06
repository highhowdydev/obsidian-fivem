import { HANDLING_FIELDS } from "../../data/handling-fields";

export class Vehicle {
	vehicle: number;

	constructor(vehicle: number) {
		this.vehicle = vehicle;
	}

	public GetHandlingFloat(fieldName: string, type: string) {
		return GetVehicleHandlingFloat(this.vehicle, type, fieldName);
	}

	public SetHandlingFloat(fieldName: string, value: number, type: string) {
		SetVehicleHandlingFloat(this.vehicle, type, fieldName, value + 0.0);
	}

	public GetHandlingInt(fieldName: string, type: string) {
		return GetVehicleHandlingInt(this.vehicle, type, fieldName);
	}

	public SetHandlingInt(fieldName: string, value: number, type: string) {
		SetVehicleHandlingInt(this.vehicle, type, fieldName, value);
	}

	public GetHandlingVector(fieldName: string, type: string) {
		return GetVehicleHandlingVector(this.vehicle, type, fieldName);
	}

	public SetHandlingVector(fieldName: string, value: [number, number, number], type: string) {
		// @ts-expect-error
		SetVehicleHandlingVector(this.vehicle, type, fieldName, value);
	}

	public GetVehicleHandlingData() {
        const handlingData: Record<string, any> = {};

		for (const field of HANDLING_FIELDS) {
			const { type, name } = field;
            let value: any;

            switch (type) {
                case "float":
                    value = this.GetHandlingFloat(name, "CHandlingData");
                    break;
                case "integer":
                    value = this.GetHandlingInt(name, "CHandlingData");
                    break;
                case "vector":
                    value = this.GetHandlingVector(name, "CHandlingData");
                    break;
            }
    
            handlingData[name] = value;
		}

        return handlingData;
	}
}

export default Vehicle;
