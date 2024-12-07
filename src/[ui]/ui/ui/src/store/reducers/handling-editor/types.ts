export const HANDLING_FIELD_TYPES = ["float", "vector", "integer"] as const;

export type HandlingFieldType = (typeof HANDLING_FIELD_TYPES)[number];

export type HandlingField = {
	name: string;
	description?: string;
	value: HandlingFieldValue;
};

type HandlingFieldValue =
	| { type: "float"; value: number }
	| { type: "vector"; value: VectorValue }
	| { type: "integer"; value: number };

export type HandlingEditorState = {
	search: string;
	vehicle: string;
	fields: HandlingField[];
};

export type VectorValue = [number, number, number];
